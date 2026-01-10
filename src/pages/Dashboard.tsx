"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { PiggyBank, CreditCard, DollarSign, Wallet, AlertCircle, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useNavigate } from "react-router-dom";
import { getGuestExpenses, getGuestIncome, type GuestExpense, type GuestIncome } from "@/lib/guest-storage";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import { AddIncomeDialog } from "@/components/forms/AddIncomeDialog";

export default function Dashboard() {
  const { user, isGuest } = useAuth();
  const { formatAmount } = useCurrency();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    enabled: !!user && !isGuest
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("expenses").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user && !isGuest
  });

  const { data: loans = [] } = useQuery({
    queryKey: ["loans", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("loans").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user && !isGuest
  });

  const { data: savings = [] } = useQuery({
    queryKey: ["savings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("savings").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user && !isGuest
  });

  const { data: monthlyBudget } = useQuery({
    queryKey: ["monthly_budgets", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const { data } = await supabase
        .from("monthly_budgets")
        .select("*")
        .eq("user_id", user.id)
        .eq("month", currentMonth)
        .eq("year", currentYear)
        .single();
      return data;
    },
    enabled: !!user && !isGuest
  });

  const refetchAll = () => {
    if (isGuest) {
      refreshGuestData();
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["income", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["expenses", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["loans", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["savings", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["monthly_budgets", user?.id] });
  };

  const displayedIncome = isGuest ? guestIncome : (income as any[]);
  const displayedExpenses = isGuest ? guestExpenses : (expenses as any[]);

  const totalExpenses = displayedExpenses.reduce((sum, exp: any) => sum + Number(exp.amount), 0);
  const totalIncome = displayedIncome.reduce((sum, inc: any) => sum + Number(inc.amount), 0);
  const netBalance = totalIncome - totalExpenses;
  const budgetProgress = monthlyBudget ? Math.min(totalExpenses / monthlyBudget.total_limit * 100, 100) : 0;

  // Recent transactions (last 5)
  const recentTransactions = [
    ...displayedIncome.map((i: any) => ({ ...i, type: 'income' as const })),
    ...displayedExpenses.map((e: any) => ({ ...e, type: 'expense' as const }))
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <BackgroundBlobs />

        <div className="relative max-w-7xl mx-auto space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Header with Quick Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Track your finances with clarity
              </p>
            </div>
            <div className="flex gap-3">
              <AddIncomeDialog onSuccess={refetchAll} />
              <AddExpenseDialog onSuccess={refetchAll} />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Net Balance</p>
                    <p className={`text-2xl sm:text-3xl font-bold mt-1 ${netBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {netBalance >= 0 ? '+' : ''}{formatAmount(netBalance)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${netBalance >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                    <DollarSign className={`h-6 w-6 ${netBalance >= 0 ? 'text-success' : 'text-destructive'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Total Income</p>
                    <p className="text-2xl sm:text-3xl font-bold text-success mt-1">
                      +{formatAmount(totalIncome)}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-success/10">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Total Expenses</p>
                    <p className="text-2xl sm:text-3xl font-bold text-destructive mt-1">
                      -{formatAmount(totalExpenses)}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-destructive/10">
                    <TrendingDown className="h-6 w-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Overview Widget */}
          {monthlyBudget && (
            <Card className="border border-border/50 bg-card/95">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <Wallet className="h-4 w-4 text-primary" />
                    Monthly Budget
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/budget")} className="text-xs h-8">
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Spent</p>
                    <p className="text-xl font-bold">{formatAmount(totalExpenses)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Limit</p>
                    <p className="text-xl font-semibold text-muted-foreground">{formatAmount(monthlyBudget.total_limit)}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{budgetProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={budgetProgress} indicatorClassName={budgetProgress > 90 ? "bg-destructive" : budgetProgress > 75 ? "bg-warning" : "bg-success"} />
                </div>
                {budgetProgress > 80 && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-warning/10 border border-warning/20">
                    <AlertCircle className="h-3.5 w-3.5 text-warning flex-shrink-0" />
                    <p className="text-xs text-warning">
                      {budgetProgress >= 100 ? "Budget limit reached." : "Close to budget limit."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <Card className="border border-border/50 bg-card/95 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/transactions')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{displayedIncome.length + displayedExpenses.length}</p>
                    <p className="text-xs text-muted-foreground">Transactions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/95 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/savings')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-success/10">
                    <PiggyBank className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{savings.length}</p>
                    <p className="text-xs text-muted-foreground">Savings Goals</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/95 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/loans')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-destructive/10">
                    <CreditCard className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{loans.length}</p>
                    <p className="text-xs text-muted-foreground">Active Loans</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="border border-border/50 bg-card/95">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")} className="text-xs h-8 gap-1">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No transactions yet</p>
                  <p className="text-xs">Start by adding income or expenses above</p>
                </div>
              ) : (
                recentTransactions.map((t, idx) => (
                  <div key={`${t.type}-${t.id}-${idx}`} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-lg ${t.type === 'income' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                      {t.type === 'income' ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {t.type === 'income' ? t.source : t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(t.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className={`text-sm font-semibold ${t.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatAmount(t.amount)}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}