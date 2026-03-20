"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import {
  Plus, Mic, TrendingUp, TrendingDown, ChevronDown, ChevronUp, X
} from "lucide-react";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useNavigate } from "react-router-dom";
import { getGuestExpenses, getGuestIncome, type GuestExpense, type GuestIncome } from "@/lib/guest-storage";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    if (localStorage.getItem(POPUP_KEY)) setDismissed(true);
  }, []);

  if (dismissed) return null;

  const current = popups[step];
  const isLast = step === popups.length - 1;

  const handleGotIt = () => {
    if (isLast) {
      localStorage.setItem(POPUP_KEY, "true");
      setDismissed(true);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-xs z-50"
        >
          <div className="rounded-2xl bg-card border border-border/60 shadow-xl p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{current.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold mb-0.5">{current.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{current.text}</p>
              </div>
              <button
                onClick={() => { localStorage.setItem(POPUP_KEY, "true"); setDismissed(true); }}
                className="p-1 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-1">
                {popups.map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-muted-foreground/20"}`} />
                ))}
              </div>
              <Button size="sm" onClick={handleGotIt} className="h-7 px-3 text-xs rounded-lg">
                {isLast ? "Let's go!" : "Got it"}
              </Button>
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

/* ——— Main Dashboard ——— */
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
  const [showLoans, setShowLoans] = useState(false);

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

  const { data: loans = [] } = useQuery({
    queryKey: ["loans", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("loans").select("*").eq("user_id", user.id).eq("status", "active");
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
    queryClient.invalidateQueries({ queryKey: ["loans", user?.id] });
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

  // Safe to spend = budget remaining or income - expenses
  const budgetLimit = monthlyBudget?.total_limit || 0;
  const safeToSpend = budgetLimit > 0
    ? Math.max(budgetLimit - totalExpenses, 0)
    : Math.max(totalIncome - totalExpenses, 0);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dayOfMonth = now.getDate();
  const daysLeft = daysInMonth - dayOfMonth;
  const dailySafe = daysLeft > 0 ? safeToSpend / daysLeft : safeToSpend;

  // Loans summary
  const totalOwed = (loans as any[]).reduce((s: number, l: any) => s + Number(l.current_balance || 0), 0);

  // Group transactions: Today / Earlier
  const todayStr = now.toISOString().split("T")[0];

  const allTransactions = useMemo(() => {
    return [
      ...displayedIncome.map((i: any) => ({ ...i, type: "income" as const })),
      ...displayedExpenses.map((e: any) => ({ ...e, type: "expense" as const })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [displayedIncome, displayedExpenses]);

  const todayTx = allTransactions.filter((t) => t.date === todayStr);
  const earlierTx = allTransactions.filter((t) => t.date !== todayStr).slice(0, 6);

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-28 space-y-5">

          {/* ——— Safe to Spend ——— */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-center pt-4 pb-2"
          >
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest mb-2">
              Safe to spend today
            </p>
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-2xl scale-150" />
              <p className="relative text-4xl sm:text-5xl font-extrabold tracking-tight">
                <AnimatedNumber value={dailySafe} format={(n) => formatAmount(Math.round(n))} />
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">
              {formatAmount(safeToSpend)} left this month · {daysLeft} days remaining
            </p>
          </motion.div>

          {/* ——— Quick Actions ——— */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease }}
            className="flex gap-3"
          >
            <Button
              variant="outline"
              className="flex-1 h-14 rounded-2xl border-2 border-primary/20 hover:border-primary/40 gap-2 text-sm font-bold relative overflow-hidden group"
              onClick={() => navigate("/transactions")}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Mic className="h-4 w-4 text-primary" />
              </motion.div>
              Voice Add
            </Button>
            <AddExpenseDialog onSuccess={refetchAll} />
          </motion.div>

          {/* ——— Loans & Debts (compact) ——— */}
          {!isGuest && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <button
                onClick={() => setShowLoans(!showLoans)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border/50 hover:bg-muted/30 transition-colors"
              >
                <span className="text-xs font-semibold text-muted-foreground">
                  You owe <span className="text-foreground font-bold">{formatAmount(totalOwed)}</span>
                </span>
                {showLoans ? (
                  <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence>
                {showLoans && (loans as any[]).length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-1.5">
                      {(loans as any[]).map((loan: any) => (
                        <div key={loan.id} className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-muted/20">
                          <span className="text-xs font-medium truncate">{loan.name}</span>
                          <span className="text-xs font-bold text-destructive">{formatAmount(loan.current_balance)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ——— Recent Transactions ——— */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease }}
            className="space-y-3"
          >
            {/* Today */}
            {todayTx.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">Today</p>
                <div className="space-y-1.5">
                  {todayTx.map((t, idx) => (
                    <TransactionRow key={`t-${t.id}-${idx}`} t={t} formatAmount={formatAmount} delay={idx * 0.04} />
                  ))}
                </div>
              </div>
            )}

            {/* Earlier */}
            {earlierTx.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">Earlier</p>
                <div className="space-y-1.5">
                  {earlierTx.map((t, idx) => (
                    <TransactionRow key={`e-${t.id}-${idx}`} t={t} formatAmount={formatAmount} delay={idx * 0.04} />
                  ))}
                </div>
              </div>
            )}

            {allTransactions.length === 0 && (
              <div className="text-center py-10">
                <p className="text-sm text-muted-foreground font-medium">No transactions yet</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Add your first expense to get started</p>
              </div>
            )}

            {allTransactions.length > 0 && (
              <Button
                variant="ghost"
                onClick={() => navigate("/transactions")}
                className="w-full text-xs text-muted-foreground font-semibold h-9"
              >
                View all transactions
              </Button>
            )}
          </motion.div>
        </div>

        <OnboardingPopups />
      </div>
    </>
  );
}

/* ——— Transaction Row ——— */
function TransactionRow({
  t,
  formatAmount,
  delay = 0,
}: {
  t: any;
  formatAmount: (n: number) => string;
  delay?: number;
}) {
  const isIncome = t.type === "income";
  const timeStr = new Date(t.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-muted/30 transition-colors duration-200 cursor-default"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isIncome ? "bg-emerald-500/10" : "bg-destructive/10"}`}>
        {isIncome ? (
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-destructive" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold truncate">{isIncome ? t.source : t.name}</p>
        <p className="text-[10px] text-muted-foreground">{timeStr}</p>
      </div>
      <p className={`text-xs font-bold flex-shrink-0 ${isIncome ? "text-emerald-500" : "text-destructive"}`}>
        {isIncome ? "+" : "-"}{formatAmount(t.amount)}
      </p>
    </motion.div>
  );
}
