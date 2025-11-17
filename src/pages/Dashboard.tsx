"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { 
  PiggyBank, 
  CreditCard, 
  DollarSign, 
  Camera,
  Wallet,
  Shield,
  AlertCircle,
  Zap,
  Plus
} from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import LiveSummaryBar from "@/components/LiveSummaryBar";
import { Calculator } from "@/components/Calculator";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import { AddIncomeDialog } from "@/components/forms/AddIncomeDialog";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const navigate = useNavigate();

  const { data: income = [] } = useQuery({
    queryKey: ["income", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("income")
        .select("*")
        .eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: loans = [] } = useQuery({
    queryKey: ["loans", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("loans")
        .select("*")
        .eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: savings = [] } = useQuery({
    queryKey: ["savings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("savings")
        .select("*")
        .eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: budgets = [] } = useQuery({
    queryKey: ["budgets", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const { data } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", user.id)
        .eq("month", currentMonth)
        .eq("year", currentYear);
      return data || [];
    },
    enabled: !!user,
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
    enabled: !!user,
  });

  const refetchAll = () => {
    // Trigger refetch for all queries
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const totalIncome = income.reduce((sum, inc) => sum + Number(inc.amount), 0);
  const budgetProgress = monthlyBudget 
    ? Math.min((totalExpenses / monthlyBudget.total_limit) * 100, 100)
    : 0;

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <BackgroundBlobs />

        <div className="relative max-w-7xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
          <LiveSummaryBar />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight gradient-text break-words">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg break-words">
              Track your finances with clarity and confidence
            </p>
            <Calculator />
          </motion.div>

          {/* Quick Add Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Add
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <AddExpenseDialog onSuccess={refetchAll} />
              <AddIncomeDialog onSuccess={refetchAll} />
              <Button 
                className="gap-2"
                onClick={() => navigate('/receipts')}
              >
                <Camera className="h-4 w-4" />
                Scan Receipt
              </Button>
            </div>
          </motion.div>

          {/* Budget Overview Widget */}
          {monthlyBudget && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass hover-glow border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg font-display">
                      <Wallet className="h-5 w-5 text-primary" />
                      Monthly Budget
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate("/budget")}
                      className="text-xs"
                    >
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Spent this month</p>
                      <p className="text-2xl font-bold">{formatAmount(totalExpenses)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Budget limit</p>
                      <p className="text-2xl font-bold text-muted-foreground/70">{formatAmount(monthlyBudget.total_limit)}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{budgetProgress.toFixed(0)}%</span>
                    </div>
                    <Progress 
                      value={budgetProgress} 
                      indicatorClassName={
                        budgetProgress > 90 
                          ? "from-destructive to-destructive/80" 
                          : budgetProgress > 75 
                          ? "from-warning to-warning/80"
                          : "from-success to-success/80"
                      }
                    />
                  </div>
                  {budgetProgress > 80 && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-warning/10 border border-warning/20">
                      <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-warning">
                        {budgetProgress >= 100 
                          ? "You've reached your budget limit this month."
                          : "You're close to your budget limit. Spend wisely!"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Stats Grid */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: DollarSign,
                color: "chart-2",
                label: "Transactions",
                value: income.length + expenses.length,
                subtitle: "This month",
              },
              {
                icon: PiggyBank,
                color: "success",
                label: "Goals",
                value: savings.length,
                subtitle: "Active goals",
              },
              {
                icon: CreditCard,
                color: "destructive",
                label: "Loans",
                value: loans.length,
                subtitle: "Active loans",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass hover-glow cursor-pointer group min-h-[140px]">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base font-display break-words">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-1.5 sm:p-2 rounded-xl bg-${item.color}/10 group-hover:bg-${item.color}/20 transition-colors flex-shrink-0`}
                      >
                        <item.icon
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-${item.color}`}
                        />
                      </motion.div>
                      <span className="break-words">{item.label}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <p className="text-2xl sm:text-3xl font-bold mb-1 animate-count-up">
                      {item.value}
                    </p>
                    <p className="text-xs text-muted-foreground break-words">
                      {item.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Security & Trust Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass border-success/20 cursor-pointer hover-glow" onClick={() => navigate("/security")}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-success/10">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Your data is secure</p>
                  <p className="text-xs text-muted-foreground">Bank-level encryption • Privacy-first • GDPR compliant</p>
                </div>
                <Badge variant="success" className="hidden sm:inline-flex">Protected</Badge>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}

