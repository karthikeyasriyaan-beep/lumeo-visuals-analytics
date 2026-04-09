"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import {
  Plus, Mic, TrendingUp, TrendingDown, ChevronDown, ChevronUp, X, Wallet, ArrowRight, Sparkles
} from "lucide-react";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useNavigate } from "react-router-dom";
import { getGuestExpenses, getGuestIncome, type GuestExpense, type GuestIncome } from "@/lib/guest-storage";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

/* ——— Onboarding Popup ——— */
const POPUP_KEY = "trackora_dash_popups_done";
const popups = [
  { emoji: "👋", title: "Welcome", text: "Track your money in seconds." },
  { emoji: "🎤", title: "Try voice", text: "Say: Spent 200 on food" },
  { emoji: "💡", title: "Check this before spending", text: "Your safe-to-spend number tells you what's left today." },
  { emoji: "⚡", title: "Keep it simple", text: "No categories. No stress." },
];

function OnboardingPopups() {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => { if (localStorage.getItem(POPUP_KEY)) setDismissed(true); }, []);
  if (dismissed) return null;
  const current = popups[step];
  const isLast = step === popups.length - 1;
  const handleGotIt = () => {
    if (isLast) { localStorage.setItem(POPUP_KEY, "true"); setDismissed(true); }
    else setStep(step + 1);
  };
  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div key={step} initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-xs z-50">
          <div className="rounded-2xl bg-card border border-border/60 shadow-xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{current.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold mb-0.5">{current.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{current.text}</p>
              </div>
              <button onClick={() => { localStorage.setItem(POPUP_KEY, "true"); setDismissed(true); }} className="p-1 rounded-lg hover:bg-muted transition-colors flex-shrink-0">
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-1">
                {popups.map((_, i) => (<div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-muted-foreground/20"}`} />))}
              </div>
              <Button size="sm" onClick={handleGotIt} className="h-7 px-3 text-xs rounded-lg">{isLast ? "Let's go!" : "Got it"}</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
      const current = start + diff * eased;
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
      else ref.current = value;
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{format(display)}</>;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ——— Main Dashboard ——— */
export default function Dashboard() {
  const { user, isGuest } = useAuth();
  const { formatAmount } = useCurrency();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!localStorage.getItem("trackora_onboarded")) navigate("/onboarding", { replace: true });
  }, [navigate]);

  const [guestIncome, setGuestIncome] = useState<GuestIncome[]>([]);
  const [guestExpenses, setGuestExpenses] = useState<GuestExpense[]>([]);
  const [showLoans, setShowLoans] = useState(false);

  const refreshGuestData = () => { setGuestIncome(getGuestIncome()); setGuestExpenses(getGuestExpenses()); };
  useEffect(() => { if (isGuest) refreshGuestData(); }, [isGuest]);

  const { data: income = [] } = useQuery({
    queryKey: ["income", user?.id],
    queryFn: async () => { if (!user) return []; const { data } = await supabase.from("income").select("*").eq("user_id", user.id); return data || []; },
    enabled: !!user && !isGuest,
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => { if (!user) return []; const { data } = await supabase.from("expenses").select("*").eq("user_id", user.id); return data || []; },
    enabled: !!user && !isGuest,
  });

  const { data: loans = [] } = useQuery({
    queryKey: ["loans", user?.id],
    queryFn: async () => { if (!user) return []; const { data } = await supabase.from("loans").select("*").eq("user_id", user.id).eq("status", "active"); return data || []; },
    enabled: !!user && !isGuest,
  });

  const { data: monthlyBudget } = useQuery({
    queryKey: ["monthly_budgets", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const now = new Date();
      const { data } = await supabase.from("monthly_budgets").select("*").eq("user_id", user.id).eq("month", now.getMonth() + 1).eq("year", now.getFullYear()).single();
      return data;
    },
    enabled: !!user && !isGuest,
  });

  const refetchAll = () => {
    if (isGuest) { refreshGuestData(); return; }
    queryClient.invalidateQueries({ queryKey: ["income", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["expenses", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["loans", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["monthly_budgets", user?.id] });
  };

  const displayedExpenses = isGuest ? guestExpenses : (expenses as any[]);
  const displayedIncome = isGuest ? guestIncome : (income as any[]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthExpenses = displayedExpenses.filter((e: any) => { const d = new Date(e.date); return d.getMonth() === currentMonth && d.getFullYear() === currentYear; });
  const monthIncome = displayedIncome.filter((i: any) => { const d = new Date(i.date); return d.getMonth() === currentMonth && d.getFullYear() === currentYear; });

  const totalExpenses = monthExpenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
  const totalIncome = monthIncome.reduce((s: number, i: any) => s + Number(i.amount), 0);

  const budgetLimit = monthlyBudget?.total_limit || 0;
  const safeToSpend = budgetLimit > 0 ? Math.max(budgetLimit - totalExpenses, 0) : Math.max(totalIncome - totalExpenses, 0);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dayOfMonth = now.getDate();
  const daysLeft = daysInMonth - dayOfMonth;
  const dailySafe = daysLeft > 0 ? safeToSpend / daysLeft : safeToSpend;
  const budgetProgress = budgetLimit > 0 ? Math.min((totalExpenses / budgetLimit) * 100, 100) : 0;

  const totalOwed = (loans as any[]).reduce((s: number, l: any) => s + Number(l.current_balance || 0), 0);

  const todayStr = now.toISOString().split("T")[0];
  const allTransactions = useMemo(() => {
    return [
      ...displayedIncome.map((i: any) => ({ ...i, type: "income" as const })),
      ...displayedExpenses.map((e: any) => ({ ...e, type: "expense" as const })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [displayedIncome, displayedExpenses]);

  const recentTx = allTransactions.slice(0, 5);

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-6 pb-28 space-y-6">

          {/* ——— Top: Safe to Spend (full width, compact) ——— */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
            className="rounded-2xl bg-card border border-border/40 px-6 py-6 md:py-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-1 text-center md:text-left">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest mb-2">Safe to spend today</p>
              <div className="relative inline-block">
                <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl scale-150" />
                <p className="relative text-4xl sm:text-5xl font-extrabold tracking-tight">
                  <AnimatedNumber value={dailySafe} format={(n) => formatAmount(Math.round(n))} />
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                {formatAmount(safeToSpend)} left · {daysLeft} days remaining
              </p>
            </div>

            {/* Quick Actions inline on desktop */}
            <div className="flex gap-3 flex-shrink-0 flex-wrap">
              <Button variant="outline" className="h-12 rounded-xl border-2 border-primary/20 hover:border-primary/40 gap-2 text-sm font-bold px-5" onClick={() => navigate("/smart-import")}>
                <Sparkles className="h-4 w-4 text-primary" />
                Smart Import
              </Button>
              <AddExpenseDialog onSuccess={refetchAll} />
            </div>
          </motion.div>

          {/* ——— Grid: Summary + Budget ——— */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, ease }}
              className="px-5 py-5 rounded-2xl bg-card border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Income</p>
              </div>
              <p className="text-xl font-bold text-success">+{formatAmount(totalIncome)}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, ease }}
              className="px-5 py-5 rounded-2xl bg-card border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Spent</p>
              </div>
              <p className="text-xl font-bold text-destructive">-{formatAmount(totalExpenses)}</p>
            </motion.div>

            {budgetLimit > 0 ? (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, ease }}
                className="px-5 py-5 rounded-2xl bg-card border border-border/40 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Budget</p>
                  <p className="text-xs font-bold">{formatAmount(totalExpenses)} / {formatAmount(budgetLimit)}</p>
                </div>
                <Progress value={budgetProgress} className="h-2" indicatorClassName={budgetProgress >= 90 ? "bg-destructive" : budgetProgress >= 70 ? "bg-warning" : ""} />
                <p className="text-[10px] text-muted-foreground">
                  {budgetProgress >= 100 ? "Limit reached" : budgetProgress >= 80 ? "Getting close" : "On track"}
                </p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, ease }}
                className="px-5 py-5 rounded-2xl bg-card border border-border/40 flex flex-col justify-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Net</p>
                <p className={`text-xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-success" : "text-destructive"}`}>
                  {formatAmount(totalIncome - totalExpenses)}
                </p>
              </motion.div>
            )}
          </div>

          {/* ——— Bottom Grid: Transactions + Loans ——— */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Recent Transactions */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease }}
              className="rounded-2xl bg-card border border-border/40 overflow-hidden">
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <p className="text-sm font-bold">Recent Transactions</p>
                <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")} className="h-8 text-xs font-semibold text-muted-foreground gap-1 rounded-lg">
                  View all <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
              <div className="px-3 pb-3 space-y-1">
                {recentTx.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No transactions yet</p>
                  </div>
                )}
                {recentTx.map((t, idx) => {
                  const isIncome = t.type === "income";
                  const title = isIncome ? t.source : t.name;
                  const timeStr = new Date(t.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
                  return (
                    <motion.div key={`${t.type}-${t.id}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 + idx * 0.03, ease }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => navigate("/transactions")}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isIncome ? "bg-success/10" : "bg-destructive/10"}`}>
                        {isIncome ? <TrendingUp className="h-3.5 w-3.5 text-success" /> : <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{title}</p>
                        <p className="text-[11px] text-muted-foreground">{timeStr}</p>
                      </div>
                      <p className={`text-sm font-bold flex-shrink-0 ${isIncome ? "text-success" : "text-destructive"}`}>
                        {isIncome ? "+" : "-"}{formatAmount(t.amount)}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Loans & Debts */}
            {!isGuest && (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, ease }}
                className="rounded-2xl bg-card border border-border/40 overflow-hidden">
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-bold">Loans & Debts</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/loans")} className="h-8 text-xs font-semibold text-muted-foreground gap-1 rounded-lg">
                    View all <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
                <div className="px-5 pb-5">
                  <p className="text-2xl font-bold text-destructive mb-3">{formatAmount(totalOwed)}</p>
                  {(loans as any[]).length > 0 ? (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                      {(loans as any[]).slice(0, 4).map((loan: any) => (
                        <div key={loan.id} className="flex items-center justify-between px-3 py-3 rounded-xl bg-muted/20 border border-border/30">
                          <span className="text-sm font-medium truncate">{loan.name}</span>
                          <span className="text-sm font-bold text-destructive">{formatAmount(loan.current_balance)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No active loans</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <OnboardingPopups />
      </div>
    </>
  );
}
