import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Plus, Edit } from "lucide-react";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useState } from "react";
import { SetBudgetDialog } from "@/components/forms/SetBudgetDialog";
import { SetMonthlyBudgetDialog } from "@/components/forms/SetMonthlyBudgetDialog";

export default function Budget() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const [setBudgetOpen, setSetBudgetOpen] = useState(false);
  const [setMonthlyOpen, setSetMonthlyOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any>(null);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Fetch category budgets
  const { data: budgets = [] } = useQuery({
    queryKey: ["budgets", user?.id, currentMonth, currentYear],
    queryFn: async () => {
      if (!user) return [];
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

  // Fetch monthly budget
  const { data: monthlyBudgets = [] } = useQuery({
    queryKey: ["monthly_budgets", user?.id, currentMonth, currentYear],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("monthly_budgets")
        .select("*")
        .eq("user_id", user.id)
        .eq("month", currentMonth)
        .eq("year", currentYear);
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch current month expenses
  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const startOfMonth = new Date(currentYear, currentMonth - 1, 1).toISOString();
      const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59).toISOString();
      const { data } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", startOfMonth)
        .lte("date", endOfMonth);
      return data || [];
    },
    enabled: !!user,
  });

  const monthlyBudget = monthlyBudgets[0];
  const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalBudgetLimit = monthlyBudget?.total_limit || 0;
  const remainingBudget = totalBudgetLimit - totalSpending;
  const budgetProgress = totalBudgetLimit > 0 ? (totalSpending / totalBudgetLimit) * 100 : 0;

  // Calculate category spending
  const categorySpending = expenses.reduce((acc: Record<string, number>, exp) => {
    const cat = exp.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + exp.amount;
    return acc;
  }, {});

  const getBudgetStatus = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return { color: "destructive", message: "Limit reached" };
    if (percentage >= 80) return { color: "warning", message: "Close to limit" };
    return { color: "success", message: "On track" };
  };

  const handleEditBudget = (budget: any) => {
    setEditingBudget(budget);
    setSetBudgetOpen(true);
  };

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full">
        <div className="relative max-w-7xl mx-auto space-y-6 p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text">
              Budget Planning
            </h1>
            <p className="text-muted-foreground text-lg">
              Take control of your spending with gentle guidance
            </p>
          </motion.div>

          {/* Overall Monthly Budget Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Monthly Budget Overview
                  </CardTitle>
                  <Button
                    variant="soft"
                    size="sm"
                    onClick={() => setSetMonthlyOpen(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {monthlyBudget ? "Edit" : "Set"} Budget
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {monthlyBudget ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget Limit</span>
                        <span className="font-medium">{formatAmount(totalBudgetLimit)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Spent</span>
                        <span className={`font-medium ${budgetProgress >= 100 ? 'text-destructive' : budgetProgress >= 80 ? 'text-warning' : 'text-success'}`}>
                          {formatAmount(totalSpending)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Remaining</span>
                        <span className={`font-semibold ${remainingBudget < 0 ? 'text-destructive' : 'text-success'}`}>
                          {formatAmount(remainingBudget)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Progress value={Math.min(budgetProgress, 100)} className="h-3" />
                      <p className="text-xs text-center text-muted-foreground">
                        {budgetProgress >= 100 ? "You've reached your budget limit" :
                         budgetProgress >= 80 ? "You're close to your limit. Spend wisely." :
                         "You're doing great this month!"}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-4">No monthly budget set yet</p>
                    <Button onClick={() => setSetMonthlyOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Set Monthly Budget
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Budgets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold font-display">Category Budgets</h2>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingBudget(null);
                  setSetBudgetOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category Budget
              </Button>
            </div>

            {budgets.length === 0 ? (
              <Card className="glass">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No category budgets set yet. Start by setting limits for your spending categories.
                  </p>
                  <Button onClick={() => setSetBudgetOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Category Budget
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {budgets.map((budget, index) => {
                  const spent = categorySpending[budget.category] || 0;
                  const limit = budget.monthly_limit;
                  const progress = (spent / limit) * 100;
                  const status = getBudgetStatus(spent, limit);

                  return (
                    <motion.div
                      key={budget.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <Card className="glass hover-lift cursor-pointer" onClick={() => handleEditBudget(budget)}>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center justify-between">
                            <span>{budget.category}</span>
                            {progress >= 80 && (
                              <AlertCircle className={`h-5 w-5 ${progress >= 100 ? 'text-destructive' : 'text-warning'}`} />
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Spent</span>
                              <span className="font-medium">{formatAmount(spent)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Limit</span>
                              <span className="font-medium">{formatAmount(limit)}</span>
                            </div>
                          </div>
                          <Progress value={Math.min(progress, 100)} className="h-2" />
                          <p className={`text-xs text-center font-medium text-${status.color}`}>
                            {status.message}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <SetBudgetDialog
        open={setBudgetOpen}
        onOpenChange={setSetBudgetOpen}
        editingBudget={editingBudget}
      />
      <SetMonthlyBudgetDialog
        open={setMonthlyOpen}
        onOpenChange={setSetMonthlyOpen}
        existingBudget={monthlyBudget}
      />
    </>
  );
}
