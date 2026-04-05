import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { DollarSign, TrendingUp, AlertCircle, Plus, Edit, ChevronDown, Sparkles } from "lucide-react";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useState, useMemo, useRef, useEffect } from "react";
import { SetBudgetDialog } from "@/components/forms/SetBudgetDialog";
import { SetMonthlyBudgetDialog } from "@/components/forms/SetMonthlyBudgetDialog";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ——— Animated Number ——— */
function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<number>(0);
  useEffect(() => {
    const start = ref.current;
    const diff = value - start;
    if (diff === 0) return;
    const duration = 600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + diff * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else ref.current = value;
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{format(display)}</>;
}

export default function Budget() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const [setBudgetOpen, setSetBudgetOpen] = useState(false);
  const [setMonthlyOpen, setSetMonthlyOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const now = new Date();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysLeft = daysInMonth - now.getDate();

  const { data: budgets = [] } = useQuery({
    queryKey: ["budgets", user?.id, currentMonth, currentYear],
    queryFn: async () => { if (!user) return []; const { data } = await supabase.from("budgets").select("*").eq("user_id", user.id).eq("month", currentMonth).eq("year", currentYear); return data || []; },
    enabled: !!user,
  });

  const { data: monthlyBudgets = [] } = useQuery({
    queryKey: ["monthly_budgets", user?.id, currentMonth, currentYear],
    queryFn: async () => { if (!user) return []; const { data } = await supabase.from("monthly_budgets").select("*").eq("user_id", user.id).eq("month", currentMonth).eq("year", currentYear); return data || []; },
    enabled: !!user,
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const startOfMonth = new Date(currentYear, currentMonth - 1, 1).toISOString();
      const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59).toISOString();
      const { data } = await supabase.from("expenses").select("*").eq("user_id", user.id).gte("date", startOfMonth).lte("date", endOfMonth);
      return data || [];
    },
    enabled: !!user,
  });

  const monthlyBudget = monthlyBudgets[0];
  const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalBudgetLimit = monthlyBudget?.total_limit || 0;
  const remainingBudget = totalBudgetLimit - totalSpending;
  const budgetProgress = totalBudgetLimit > 0 ? (totalSpending / totalBudgetLimit) * 100 : 0;
  const dailySafe = daysLeft > 0 && remainingBudget > 0 ? remainingBudget / daysLeft : 0;

  const categorySpending = expenses.reduce((acc: Record<string, number>, exp) => {
    const cat = exp.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + exp.amount;
    return acc;
  }, {});

  // Smart insight
  const insight = useMemo(() => {
    if (totalBudgetLimit === 0) return "Set a budget to get daily spending guidance";
    if (budgetProgress >= 100) return "You've exceeded your budget this month";
    if (budgetProgress >= 80) return "You're close to your budget limit — spend wisely";
    const topCat = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
    if (topCat) return `Most spending on ${topCat[0]} (${formatAmount(topCat[1])})`;
    return "Your spending is under control this month!";
  }, [totalBudgetLimit, budgetProgress, categorySpending, formatAmount]);

  const getProgressColor = (pct: number) => {
    if (pct >= 90) return "bg-destructive";
    if (pct >= 70) return "bg-warning";
    return "";
  };

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
        <div className="max-w-lg mx-auto px-5 pt-6 pb-28 space-y-7">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <h1 className="text-xl font-bold tracking-tight">Budget</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Control spending with gentle guidance</p>
          </motion.div>

          {/* Safe to Spend Today */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.06, ease }} className="text-center py-6">
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest mb-3">Safe to spend today</p>
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl scale-150" />
              <p className="relative text-5xl sm:text-6xl font-extrabold tracking-tight">
                <AnimatedNumber value={dailySafe} format={(n) => formatAmount(Math.round(n))} />
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-3 font-medium">
              Based on your balance and spending · {daysLeft} days left
            </p>
          </motion.div>

          {/* Monthly Budget Card */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, ease }}>
            <div className="rounded-2xl bg-card border border-border/40 overflow-hidden">
              <div className="px-5 py-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <p className="text-sm font-bold">Monthly Budget</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSetMonthlyOpen(true)} className="h-9 px-3 text-xs font-bold rounded-xl gap-1.5">
                    <Edit className="h-3.5 w-3.5" /> {monthlyBudget ? "Edit" : "Set"}
                  </Button>
                </div>

                {monthlyBudget ? (
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="flex-1 px-4 py-4 rounded-xl bg-muted/20 border border-border/30 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Spent</p>
                        <p className={`text-lg font-bold ${budgetProgress >= 90 ? "text-destructive" : budgetProgress >= 70 ? "text-warning" : "text-foreground"}`}>
                          {formatAmount(totalSpending)}
                        </p>
                      </div>
                      <div className="flex-1 px-4 py-4 rounded-xl bg-muted/20 border border-border/30 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Remaining</p>
                        <p className={`text-lg font-bold ${remainingBudget < 0 ? "text-destructive" : "text-success"}`}>
                          {formatAmount(remainingBudget)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{Math.min(budgetProgress, 100).toFixed(0)}% used</span>
                        <span>{formatAmount(totalBudgetLimit)} limit</span>
                      </div>
                      <Progress value={Math.min(budgetProgress, 100)} className="h-3" indicatorClassName={getProgressColor(budgetProgress)} />
                      <p className="text-[11px] text-center text-muted-foreground mt-1">
                        {budgetProgress >= 100 ? "Budget limit reached" : budgetProgress >= 80 ? "Getting close — spend wisely" : "You're doing great this month!"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm mb-4">No monthly budget set yet</p>
                    <Button onClick={() => setSetMonthlyOpen(true)} className="rounded-xl h-11 px-5">
                      <Plus className="h-4 w-4 mr-2" /> Set Monthly Budget
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Insight */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10">
            <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground font-medium">{insight}</p>
          </motion.div>

          {/* Category Budgets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Category Budgets</p>
              <Button variant="ghost" size="sm" onClick={() => { setEditingBudget(null); setSetBudgetOpen(true); }} className="h-9 px-3 text-xs font-bold rounded-xl gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            </div>

            {budgets.length === 0 ? (
              <div className="rounded-2xl bg-card border border-border/40 px-5 py-10 text-center">
                <p className="text-sm text-muted-foreground mb-4">No category budgets yet</p>
                <Button onClick={() => setSetBudgetOpen(true)} variant="outline" className="rounded-xl h-11 px-5">
                  <Plus className="h-4 w-4 mr-2" /> Create Category Budget
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {budgets.map((budget, index) => {
                  const spent = categorySpending[budget.category] || 0;
                  const limit = budget.monthly_limit;
                  const progress = (spent / limit) * 100;
                  const isExpanded = expandedCat === budget.id;

                  return (
                    <motion.div key={budget.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.05, ease }}
                      whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setExpandedCat(isExpanded ? null : budget.id)}
                      className="rounded-2xl bg-card border border-border/40 hover:border-border/60 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
                    >
                      <div className="px-5 py-5 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-base font-semibold">{budget.category}</p>
                            <div className="flex items-center gap-2">
                              {progress >= 80 && <AlertCircle className={`h-4 w-4 ${progress >= 100 ? "text-destructive" : "text-warning"}`} />}
                              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                            </div>
                          </div>
                          <Progress value={Math.min(progress, 100)} className="h-2" indicatorClassName={getProgressColor(progress)} />
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>{formatAmount(spent)} spent</span>
                            <span>{formatAmount(limit)} limit</span>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                            <div className="px-5 pb-5 pt-0 border-t border-border/30">
                              <div className="pt-4 flex items-center gap-3">
                                <div className="flex-1 px-4 py-3 rounded-xl bg-muted/20 border border-border/30 text-center">
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Remaining</p>
                                  <p className={`text-sm font-bold ${limit - spent < 0 ? "text-destructive" : "text-success"}`}>{formatAmount(limit - spent)}</p>
                                </div>
                                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setEditingBudget(budget); setSetBudgetOpen(true); }} className="h-11 px-5 rounded-xl text-xs font-bold gap-2">
                                  <Edit className="h-3.5 w-3.5" /> Edit
                                </Button>
                              </div>
                              <p className={`text-[11px] text-center mt-3 font-medium ${progress >= 100 ? "text-destructive" : progress >= 80 ? "text-warning" : "text-success"}`}>
                                {progress >= 100 ? "Limit reached" : progress >= 80 ? "Close to limit" : "On track"}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <SetBudgetDialog open={setBudgetOpen} onOpenChange={setSetBudgetOpen} editingBudget={editingBudget} />
      <SetMonthlyBudgetDialog open={setMonthlyOpen} onOpenChange={setSetMonthlyOpen} existingBudget={monthlyBudget} />
    </>
  );
}
