"use client";

import { useEffect, useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import {
  PiggyBank, CreditCard, DollarSign, Wallet, TrendingUp, TrendingDown,
  ArrowRight, Plus, Repeat, Target, BarChart3, Lightbulb
} from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useNavigate } from "react-router-dom";
import { getGuestExpenses, getGuestIncome, type GuestExpense, type GuestIncome } from "@/lib/guest-storage";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import { AddIncomeDialog } from "@/components/forms/AddIncomeDialog";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const CATEGORY_COLORS: Record<string, string> = {
  food: "hsl(var(--chart-1))",
  travel: "hsl(var(--chart-2))",
  shopping: "hsl(var(--chart-3))",
  bills: "hsl(var(--chart-4))",
  entertainment: "hsl(var(--chart-5))",
  health: "hsl(var(--primary))",
  education: "hsl(var(--accent))",
  other: "hsl(var(--muted-foreground))",
};

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

  const { data: subscriptions = [] } = useQuery({
    queryKey: ["subscriptions", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).eq("status", "active");
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
    queryClient.invalidateQueries({ queryKey: ["subscriptions", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["savings", user?.id] });
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

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const lastMonthExpenses = displayedExpenses.filter((e: any) => {
    const d = new Date(e.date);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  });

  const totalExpenses = monthExpenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
  const lastMonthTotal = lastMonthExpenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
  const budgetRemaining = monthlyBudget ? Math.max(monthlyBudget.total_limit - totalExpenses, 0) : 0;
  const budgetProgress = monthlyBudget ? Math.min((totalExpenses / monthlyBudget.total_limit) * 100, 100) : 0;

  const savingsProgress = (savings as any[]).reduce((s: number, g: any) => s + Number(g.current_amount || 0), 0);
  const activeSubscriptions = (subscriptions as any[]).length;

  // Category chart data
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    monthExpenses.forEach((e: any) => {
      const cat = (e.category || "other").toLowerCase();
      map[cat] = (map[cat] || 0) + Number(e.amount);
    });
    return Object.entries(map)
      .map(([name, amount]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [monthExpenses]);

  const highestCategory = categoryData.length > 0 ? categoryData[0] : null;

  // Recent transactions
  const recentTransactions = [
    ...displayedIncome.map((i: any) => ({ ...i, type: "income" as const })),
    ...displayedExpenses.map((e: any) => ({ ...e, type: "expense" as const })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <BackgroundBlobs />

        <div className="relative max-w-7xl mx-auto space-y-5 sm:space-y-6 p-3 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground text-[11px] sm:text-sm">Your financial overview</p>
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <AddIncomeDialog onSuccess={refetchAll} />
              <AddExpenseDialog onSuccess={refetchAll} />
            </div>
          </div>

          {/* 4 Summary Cards */}
          <div className="grid gap-2.5 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all">
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-destructive/10 flex-shrink-0">
                    <TrendingDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Total Expenses</p>
                    <p className="text-sm sm:text-xl font-bold truncate text-destructive">
                      {formatAmount(totalExpenses)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all">
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-success/10 flex-shrink-0">
                    <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Budget Left</p>
                    <p className="text-sm sm:text-xl font-bold truncate text-success">
                      {monthlyBudget ? formatAmount(budgetRemaining) : "—"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all">
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <PiggyBank className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Savings</p>
                    <p className="text-sm sm:text-xl font-bold truncate text-primary">
                      {formatAmount(savingsProgress)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all">
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-accent/20 flex-shrink-0">
                    <Repeat className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Subscriptions</p>
                    <p className="text-sm sm:text-xl font-bold truncate">{activeSubscriptions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart + Recent Transactions row */}
          <div className="grid gap-4 lg:grid-cols-5">
            {/* Expense Overview Chart */}
            <Card className="border border-border/50 bg-card/95 lg:col-span-3">
              <CardHeader className="pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm sm:text-base font-semibold">Expense Overview</CardTitle>
                </div>
                <CardDescription className="text-xs">Spending by category this month</CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-4 pb-4">
                {categoryData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                    <BarChart3 className="h-10 w-10 mb-2 opacity-20" />
                    <p className="text-sm font-medium">No expenses this month</p>
                    <p className="text-xs">Add expenses to see your spending breakdown</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={categoryData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={50} />
                      <Tooltip
                        formatter={(value: number) => [formatAmount(value), "Amount"]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid hsl(var(--border))",
                          background: "hsl(var(--card))",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                        {categoryData.map((entry, idx) => (
                          <Cell
                            key={entry.name}
                            fill={CATEGORY_COLORS[entry.name.toLowerCase()] || `hsl(var(--chart-${(idx % 5) + 1}))`}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="border border-border/50 bg-card/95 lg:col-span-2">
              <CardHeader className="pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm sm:text-base font-semibold">Recent Transactions</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")} className="text-xs h-7 gap-1 px-2">
                    View All <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 px-4 sm:px-6 pb-4">
                {recentTransactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <DollarSign className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p className="text-xs sm:text-sm font-medium">No transactions yet</p>
                  </div>
                ) : (
                  recentTransactions.map((t, idx) => (
                    <div
                      key={`${t.type}-${t.id}-${idx}`}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className={`p-1.5 rounded-lg flex-shrink-0 ${t.type === "income" ? "bg-success/10" : "bg-destructive/10"}`}>
                        {t.type === "income" ? (
                          <TrendingUp className="h-3.5 w-3.5 text-success" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium truncate">{t.type === "income" ? t.source : t.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {t.category && <span className="mr-1.5">{t.category}</span>}
                          {new Date(t.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className={`text-xs sm:text-sm font-semibold flex-shrink-0 ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                        {t.type === "income" ? "+" : "-"}{formatAmount(t.amount)}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions + Financial Insights row */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Quick Actions */}
            <Card className="border border-border/50 bg-card/95">
              <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="text-sm sm:text-base font-semibold">Quick Actions</CardTitle>
                <CardDescription className="text-xs">Common tasks at your fingertips</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2.5 px-4 sm:px-6 pb-4 sm:pb-6">
                <Button variant="outline" className="h-auto py-3 flex-col gap-1.5 text-xs sm:text-sm" onClick={() => navigate("/transactions")}>
                  <Plus className="h-4 w-4 text-primary" />
                  Add Expense
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-1.5 text-xs sm:text-sm" onClick={() => navigate("/budget")}>
                  <Wallet className="h-4 w-4 text-primary" />
                  Create Budget
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-1.5 text-xs sm:text-sm" onClick={() => navigate("/savings")}>
                  <Target className="h-4 w-4 text-primary" />
                  Add Savings Goal
                </Button>
                <Button variant="outline" className="h-auto py-3 flex-col gap-1.5 text-xs sm:text-sm" onClick={() => navigate("/subscriptions")}>
                  <Repeat className="h-4 w-4 text-primary" />
                  Track Subscription
                </Button>
              </CardContent>
            </Card>

            {/* Financial Insights */}
            <Card className="border border-border/50 bg-card/95">
              <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm sm:text-base font-semibold">Financial Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 px-4 sm:px-6 pb-4 sm:pb-6">
                {/* Highest category */}
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-0.5">Highest spending category</p>
                  <p className="text-sm font-semibold">
                    {highestCategory ? `${highestCategory.name} — ${formatAmount(highestCategory.amount)}` : "No data yet"}
                  </p>
                </div>

                {/* Compared to last month */}
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-0.5">Compared to last month</p>
                  {lastMonthTotal > 0 ? (
                    <p className={`text-sm font-semibold ${totalExpenses > lastMonthTotal ? "text-destructive" : "text-success"}`}>
                      {totalExpenses > lastMonthTotal
                        ? `↑ ${formatAmount(totalExpenses - lastMonthTotal)} more`
                        : totalExpenses < lastMonthTotal
                        ? `↓ ${formatAmount(lastMonthTotal - totalExpenses)} less`
                        : "Same as last month"}
                    </p>
                  ) : (
                    <p className="text-sm font-semibold text-muted-foreground">No previous data</p>
                  )}
                </div>

                {/* Budget progress */}
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1.5">Monthly budget progress</p>
                  {monthlyBudget ? (
                    <div className="space-y-1.5">
                      <Progress
                        value={budgetProgress}
                        className="h-2"
                        indicatorClassName={budgetProgress > 90 ? "bg-destructive" : budgetProgress > 75 ? "bg-warning" : "bg-success"}
                      />
                      <p className="text-xs font-medium">
                        {formatAmount(totalExpenses)} of {formatAmount(monthlyBudget.total_limit)} ({budgetProgress.toFixed(0)}%)
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-muted-foreground">No budget set</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
