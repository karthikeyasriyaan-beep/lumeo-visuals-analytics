import { useEffect, useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import {
  Plus, TrendingUp, TrendingDown, Wallet, PiggyBank, CreditCard, Target,
  ShoppingCart, Utensils, Plane, Home, MoreHorizontal, ArrowRight, Lightbulb
} from "lucide-react";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useNavigate } from "react-router-dom";
import { getGuestExpenses, getGuestIncome, type GuestExpense, type GuestIncome } from "@/lib/guest-storage";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const CATEGORY_ICONS: Record<string, any> = {
  food: Utensils,
  travel: Plane,
  shopping: ShoppingCart,
  bills: Home,
};

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function Dashboard() {
  const { user, isGuest } = useAuth();
  const { formatAmount } = useCurrency();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!localStorage.getItem("trackora_onboarded")) {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate]);

  const [guestIncome, setGuestIncome] = useState<GuestIncome[]>([]);
  const [guestExpenses, setGuestExpenses] = useState<GuestExpense[]>([]);

  const refreshGuestData = () => {
    setGuestIncome(getGuestIncome());
    setGuestExpenses(getGuestExpenses());
  };

  useEffect(() => {
    if (!isGuest) return;
    refreshGuestData();
  }, [isGuest]);

  const { data: income = [] } = useQuery({
    queryKey: ["income", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("income").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user && !isGuest,
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("expenses").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user && !isGuest,
  });

  const { data: savings = [] } = useQuery({
    queryKey: ["savings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("savings").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user && !isGuest,
  });

  const { data: subscriptions = [] } = useQuery({
    queryKey: ["subscriptions", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).eq("status", "active");
      return data || [];
    },
    enabled: !!user && !isGuest,
  });

  const { data: monthlyBudget } = useQuery({
    queryKey: ["monthly_budgets", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const now = new Date();
      const { data } = await supabase
        .from("monthly_budgets")
        .select("*")
        .eq("user_id", user.id)
        .eq("month", now.getMonth() + 1)
        .eq("year", now.getFullYear())
        .single();
      return data;
    },
    enabled: !!user && !isGuest,
  });

  const refetchAll = () => {
    if (isGuest) {
      refreshGuestData();
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["income", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["expenses", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["savings", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["subscriptions", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["monthly_budgets", user?.id] });
  };

  const displayedExpenses = isGuest ? guestExpenses : (expenses as any[]);
  const displayedIncome = isGuest ? guestIncome : (income as any[]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthExpenses = displayedExpenses.filter((e: any) => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalExpenses = monthExpenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
  const budgetLimit = monthlyBudget?.total_limit || 0;
  const budgetRemaining = budgetLimit > 0 ? Math.max(budgetLimit - totalExpenses, 0) : 0;
  const totalSaved = (savings as any[]).reduce((s: number, sv: any) => s + Number(sv.current_amount || 0), 0);
  const activeSubscriptions = (subscriptions as any[]).length;

  // Category breakdown
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    monthExpenses.forEach((e: any) => {
      const cat = (e.category || "other").toLowerCase();
      map[cat] = (map[cat] || 0) + Number(e.amount);
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [monthExpenses]);

  // Recent transactions
  const recentTransactions = useMemo(() => {
    return [
      ...displayedExpenses.map((e: any) => ({ ...e, type: "expense" as const })),
      ...displayedIncome.map((i: any) => ({ ...i, type: "income" as const })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [displayedExpenses, displayedIncome]);

  // Insights
  const highestCategory = categoryData.length > 0 ? categoryData[0] : null;
  const budgetUsagePercent = budgetLimit > 0 ? Math.round((totalExpenses / budgetLimit) * 100) : 0;

  const summaryCards = [
    {
      title: "Total Expenses",
      value: formatAmount(totalExpenses),
      icon: Wallet,
      description: "This month's spending",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Budget Remaining",
      value: budgetLimit > 0 ? formatAmount(budgetRemaining) : "Not set",
      icon: Target,
      description: budgetLimit > 0 ? `${budgetUsagePercent}% used` : "Set a budget to track",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Savings Progress",
      value: formatAmount(totalSaved),
      icon: PiggyBank,
      description: `${(savings as any[]).length} active goal${(savings as any[]).length !== 1 ? "s" : ""}`,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Active Subscriptions",
      value: String(activeSubscriptions),
      icon: CreditCard,
      description: "Recurring payments",
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
  ];

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-28 space-y-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              A quick overview of your financial activity.
            </p>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {summaryCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease }}
              >
                <Card className="h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${card.bgColor}`}>
                        <card.icon className={`h-3.5 w-3.5 ${card.color}`} />
                      </div>
                      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">{card.title}</p>
                    </div>
                    <p className="text-lg sm:text-xl font-bold tracking-tight">{card.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Expense Overview + Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Expense Chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
            >
              <Card>
                <CardHeader className="pb-2 p-4">
                  <CardTitle className="text-sm font-semibold">Expense Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={categoryData} barSize={28}>
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis hide />
                        <Tooltip
                          formatter={(value: number) => formatAmount(value)}
                          contentStyle={{
                            background: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "11px",
                          }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          {categoryData.map((_, index) => (
                            <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[180px] flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">No expenses this month</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease }}
            >
              <Card>
                <CardHeader className="pb-2 p-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Recent Transactions</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[10px] text-muted-foreground gap-1"
                    onClick={() => navigate("/transactions")}
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {recentTransactions.length > 0 ? (
                    <div className="space-y-1">
                      {recentTransactions.map((t, idx) => {
                        const isIncome = t.type === "income";
                        const dateStr = new Date(t.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        });
                        return (
                          <div
                            key={`${t.id}-${idx}`}
                            className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-muted/30 transition-colors"
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                isIncome ? "bg-success/10" : "bg-destructive/10"
                              }`}
                            >
                              {isIncome ? (
                                <TrendingUp className="h-3 w-3 text-success" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-destructive" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">
                                {isIncome ? (t as any).source : (t as any).name}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {(t as any).category || "General"} · {dateStr}
                              </p>
                            </div>
                            <p
                              className={`text-xs font-bold flex-shrink-0 ${
                                isIncome ? "text-success" : "text-destructive"
                              }`}
                            >
                              {isIncome ? "+" : "-"}
                              {formatAmount(t.amount)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-[180px] flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">No transactions yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
          >
            <Card>
              <CardHeader className="pb-2 p-4">
                <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <AddExpenseDialog onSuccess={refetchAll} />
                  <Button
                    variant="outline"
                    className="h-11 text-xs font-medium gap-2 rounded-xl"
                    onClick={() => navigate("/budget")}
                  >
                    <Target className="h-3.5 w-3.5" />
                    Create Budget
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 text-xs font-medium gap-2 rounded-xl"
                    onClick={() => navigate("/savings")}
                  >
                    <PiggyBank className="h-3.5 w-3.5" />
                    Add Savings Goal
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 text-xs font-medium gap-2 rounded-xl"
                    onClick={() => navigate("/subscriptions")}
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    Track Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Financial Insights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.58, ease }}
          >
            <Card>
              <CardHeader className="pb-2 p-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Lightbulb className="h-3.5 w-3.5 text-warning" />
                  Financial Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  {highestCategory && (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-3 w-3 text-destructive" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">Highest spending category</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          <span className="font-semibold text-foreground">{highestCategory.name}</span> at{" "}
                          {formatAmount(highestCategory.value)} this month
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Wallet className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Total expenses this month</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        You've spent <span className="font-semibold text-foreground">{formatAmount(totalExpenses)}</span>{" "}
                        across {monthExpenses.length} transaction{monthExpenses.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {budgetLimit > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="w-7 h-7 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Target className="h-3 w-3 text-success" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">Budget usage</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {budgetUsagePercent}% of your {formatAmount(budgetLimit)} budget used.{" "}
                          {budgetUsagePercent < 50
                            ? "Great job staying on track!"
                            : budgetUsagePercent < 80
                            ? "You're managing well."
                            : "Consider slowing down spending."}
                        </p>
                      </div>
                    </div>
                  )}

                  {monthExpenses.length === 0 && !highestCategory && (
                    <div className="text-center py-6">
                      <p className="text-xs text-muted-foreground">
                        Add expenses to see your financial insights
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
