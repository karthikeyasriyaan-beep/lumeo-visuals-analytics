import { useEffect, useState, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import {
  TrendingUp, TrendingDown, Wallet, PiggyBank, CreditCard, Target,
  ArrowRight
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

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

/* ——— Animated Number ——— */
function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    const diff = value - start;
    if (diff === 0) return;
    const duration = 700;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
      else ref.current = value;
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <>{format(display)}</>;
}

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

  const monthIncome = displayedIncome.filter((i: any) => {
    const d = new Date(i.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalExpenses = monthExpenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
  const totalIncome = monthIncome.reduce((s: number, i: any) => s + Number(i.amount), 0);
  const budgetLimit = monthlyBudget?.total_limit || 0;
  const budgetRemaining = budgetLimit > 0 ? Math.max(budgetLimit - totalExpenses, 0) : 0;
  const totalSaved = (savings as any[]).reduce((s: number, sv: any) => s + Number(sv.current_amount || 0), 0);
  const activeSubscriptions = (subscriptions as any[]).length;

  // Safe to spend
  const safeToSpend = budgetLimit > 0
    ? Math.max(budgetLimit - totalExpenses, 0)
    : Math.max(totalIncome - totalExpenses, 0);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dayOfMonth = now.getDate();
  const daysLeft = daysInMonth - dayOfMonth;
  const dailySafe = daysLeft > 0 ? safeToSpend / daysLeft : safeToSpend;

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

  const budgetUsagePercent = budgetLimit > 0 ? Math.round((totalExpenses / budgetLimit) * 100) : 0;

  const summaryCards = [
    {
      title: "Total Expenses",
      value: formatAmount(totalExpenses),
      icon: Wallet,
      description: "This month",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Budget Left",
      value: budgetLimit > 0 ? formatAmount(budgetRemaining) : "—",
      icon: Target,
      description: budgetLimit > 0 ? `${budgetUsagePercent}% used` : "Not set",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Saved",
      value: formatAmount(totalSaved),
      icon: PiggyBank,
      description: `${(savings as any[]).length} goal${(savings as any[]).length !== 1 ? "s" : ""}`,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Subscriptions",
      value: String(activeSubscriptions),
      icon: CreditCard,
      description: "Active",
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
  ];

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full bg-background">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-32 space-y-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
              A quick overview of your financial activity.
            </p>
          </motion.div>

          {/* ——— HERO: Safe to Spend ——— */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="relative text-center py-10 sm:py-14"
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-primary/[0.04] blur-3xl" />
            </div>

            <p className="relative text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-[0.2em] mb-3">
              Safe to spend today
            </p>
            <motion.p
              className="relative text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
            >
              <AnimatedNumber value={dailySafe} format={(n) => formatAmount(Math.round(n))} />
            </motion.p>
            <motion.p
              className="relative text-[10px] sm:text-xs text-muted-foreground mt-3 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {formatAmount(safeToSpend)} left this month · {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
            </motion.p>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {summaryCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + 0.08 * i, ease }}
              >
                <Card className="h-full">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.bgColor}`}>
                        <card.icon className={`h-4 w-4 ${card.color}`} />
                      </div>
                      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">{card.title}</p>
                    </div>
                    <p className="text-lg sm:text-xl font-bold tracking-tight">{card.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Expense Overview + Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Expense Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
            >
              <Card>
                <CardHeader className="pb-2 p-4 sm:p-5">
                  <CardTitle className="text-xs sm:text-sm font-semibold">Expense Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 pt-0">
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={categoryData} barSize={32}>
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
                            borderRadius: "10px",
                            fontSize: "11px",
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {categoryData.map((_, index) => (
                            <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">No expenses this month</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease }}
            >
              <Card>
                <CardHeader className="pb-2 p-4 sm:p-5 flex flex-row items-center justify-between">
                  <CardTitle className="text-xs sm:text-sm font-semibold">Recent Transactions</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[10px] text-muted-foreground gap-1"
                    onClick={() => navigate("/transactions")}
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 pt-0">
                  {recentTransactions.length > 0 ? (
                    <div className="space-y-0.5">
                      {recentTransactions.map((t, idx) => {
                        const isIncome = t.type === "income";
                        const dateStr = new Date(t.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        });
                        return (
                          <motion.div
                            key={`${t.id}-${idx}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.55 + idx * 0.06, ease }}
                            className="flex items-center gap-3 py-3 px-2.5 rounded-xl hover:bg-muted/30 transition-all duration-200"
                          >
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                isIncome ? "bg-success/10" : "bg-destructive/10"
                              }`}
                            >
                              {isIncome ? (
                                <TrendingUp className="h-3.5 w-3.5 text-success" />
                              ) : (
                                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
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
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">No transactions yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            <Card>
              <CardHeader className="pb-2 p-4 sm:p-5">
                <CardTitle className="text-xs sm:text-sm font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <AddExpenseDialog onSuccess={refetchAll} />
                  <Button
                    variant="outline"
                    className="h-12 text-xs font-medium gap-2 rounded-xl"
                    onClick={() => navigate("/budget")}
                  >
                    <Target className="h-4 w-4" />
                    Create Budget
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 text-xs font-medium gap-2 rounded-xl"
                    onClick={() => navigate("/savings")}
                  >
                    <PiggyBank className="h-4 w-4" />
                    Add Savings Goal
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 text-xs font-medium gap-2 rounded-xl"
                    onClick={() => navigate("/subscriptions")}
                  >
                    <CreditCard className="h-4 w-4" />
                    Track Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </>
  );
}
