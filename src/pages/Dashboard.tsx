"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { PiggyBank, CreditCard, DollarSign, Wallet, Shield, AlertCircle, Zap, Mic } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import { AddIncomeDialog } from "@/components/forms/AddIncomeDialog";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const {
    user
  } = useAuth();
  const {
    formatAmount
  } = useCurrency();
  const navigate = useNavigate();
  const {
    data: income = []
  } = useQuery({
    queryKey: ["income", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const {
        data
      } = await supabase.from("income").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user
  });
  const {
    data: expenses = []
  } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const {
        data
      } = await supabase.from("expenses").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user
  });
  const {
    data: loans = []
  } = useQuery({
    queryKey: ["loans", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const {
        data
      } = await supabase.from("loans").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user
  });
  const {
    data: savings = []
  } = useQuery({
    queryKey: ["savings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const {
        data
      } = await supabase.from("savings").select("*").eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user
  });
  const {
    data: budgets = []
  } = useQuery({
    queryKey: ["budgets", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const {
        data
      } = await supabase.from("budgets").select("*").eq("user_id", user.id).eq("month", currentMonth).eq("year", currentYear);
      return data || [];
    },
    enabled: !!user
  });
  const {
    data: monthlyBudget
  } = useQuery({
    queryKey: ["monthly_budgets", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const {
        data
      } = await supabase.from("monthly_budgets").select("*").eq("user_id", user.id).eq("month", currentMonth).eq("year", currentYear).single();
      return data;
    },
    enabled: !!user
  });
  const refetchAll = () => {
    // Trigger refetch for all queries
  };
  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const totalIncome = income.reduce((sum, inc) => sum + Number(inc.amount), 0);
  const budgetProgress = monthlyBudget ? Math.min(totalExpenses / monthlyBudget.total_limit * 100, 100) : 0;
  return <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <BackgroundBlobs />

        <div className="relative max-w-7xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
          

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Track your finances with clarity
            </p>
          </div>

          {/* Quick Add Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Quick Add
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <AddExpenseDialog onSuccess={refetchAll} />
              <AddIncomeDialog onSuccess={refetchAll} />
            </div>
          </div>

          {/* Voice Assistant */}
          <Card className="border border-border/50 bg-card/95">
            <CardContent className="p-4 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-sm">Voice Assistant</h3>
              </div>
              <p className="text-xs text-muted-foreground text-center max-w-xs">
                Tap the mic and say "Add expense 50 dollars for groceries" or "Add income 1000 salary"
              </p>
              <VoiceAssistant onExpenseAdded={refetchAll} onIncomeAdded={refetchAll} />
            </CardContent>
          </Card>

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
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            {[
              { icon: DollarSign, label: "Transactions", value: income.length + expenses.length, subtitle: "This month", color: "text-primary" },
              { icon: PiggyBank, label: "Goals", value: savings.length, subtitle: "Active goals", color: "text-success" },
              { icon: CreditCard, label: "Loans", value: loans.length, subtitle: "Active loans", color: "text-destructive" },
            ].map((item, index) => (
              <Card key={index} className="border border-border/50 bg-card/95 hover:bg-card transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Banner */}
          <Card className="border border-success/20 bg-card/95 cursor-pointer hover:bg-card transition-colors" onClick={() => navigate("/security")}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Shield className="h-4 w-4 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Your data is secure</p>
                <p className="text-xs text-muted-foreground truncate">Bank-level encryption • Privacy-first</p>
              </div>
              <Badge variant="outline" className="hidden sm:inline-flex text-success border-success/30">Protected</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </>;
}