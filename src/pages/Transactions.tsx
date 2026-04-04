import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  TrendingUp, TrendingDown, Search, Pencil, Trash2, X,
  Utensils, Car, Zap, Home as HomeIcon, ShoppingBag, Briefcase,
  Gift, Heart, Plane, Smartphone, Sparkles, ArrowRightLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/components/currency-selector";
import { AddIncomeDialog } from "@/components/forms/AddIncomeDialog";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import EditIncomeDialog from "@/components/forms/EditIncomeDialog";
import EditExpenseDialog from "@/components/forms/EditExpenseDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { getGuestExpenses, getGuestIncome, addGuestExpense, addGuestIncome, type GuestExpense, type GuestIncome } from "@/lib/guest-storage";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

/* ——— Category Detection ——— */
const CATEGORY_MAP: Record<string, { category: string; icon: typeof Utensils }> = {
  food: { category: "Food", icon: Utensils },
  zomato: { category: "Food", icon: Utensils },
  swiggy: { category: "Food", icon: Utensils },
  restaurant: { category: "Food", icon: Utensils },
  lunch: { category: "Food", icon: Utensils },
  dinner: { category: "Food", icon: Utensils },
  breakfast: { category: "Food", icon: Utensils },
  coffee: { category: "Food", icon: Utensils },
  snack: { category: "Food", icon: Utensils },
  grocery: { category: "Food", icon: Utensils },
  uber: { category: "Travel", icon: Car },
  ola: { category: "Travel", icon: Car },
  petrol: { category: "Travel", icon: Car },
  fuel: { category: "Travel", icon: Car },
  travel: { category: "Travel", icon: Plane },
  flight: { category: "Travel", icon: Plane },
  train: { category: "Travel", icon: Car },
  bus: { category: "Travel", icon: Car },
  electricity: { category: "Bills", icon: Zap },
  bill: { category: "Bills", icon: Zap },
  wifi: { category: "Bills", icon: Zap },
  internet: { category: "Bills", icon: Zap },
  phone: { category: "Bills", icon: Smartphone },
  recharge: { category: "Bills", icon: Smartphone },
  rent: { category: "Housing", icon: HomeIcon },
  housing: { category: "Housing", icon: HomeIcon },
  shopping: { category: "Shopping", icon: ShoppingBag },
  clothes: { category: "Shopping", icon: ShoppingBag },
  amazon: { category: "Shopping", icon: ShoppingBag },
  flipkart: { category: "Shopping", icon: ShoppingBag },
  salary: { category: "Salary", icon: Briefcase },
  freelance: { category: "Freelance", icon: Briefcase },
  gift: { category: "Gift", icon: Gift },
  health: { category: "Health", icon: Heart },
  medical: { category: "Health", icon: Heart },
  medicine: { category: "Health", icon: Heart },
};

function detectCategory(text: string): { category: string; icon: typeof Utensils } {
  const lower = text.toLowerCase();
  for (const [keyword, val] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(keyword)) return val;
  }
  return { category: "Other", icon: ArrowRightLeft };
}

function getCategoryIcon(category: string | null): typeof Utensils {
  if (!category) return ArrowRightLeft;
  const lower = category.toLowerCase();
  for (const [, val] of Object.entries(CATEGORY_MAP)) {
    if (val.category.toLowerCase() === lower) return val.icon;
  }
  return ArrowRightLeft;
}

/* ——— Smart Input Parser ——— */
interface ParsedInput {
  amount: number;
  description: string;
  type: "expense" | "income" | "owe" | "owed";
  category: string;
}

function parseSmartInput(input: string): ParsedInput | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const amountMatch = trimmed.match(/(\d+\.?\d*)/);
  if (!amountMatch) return null;
  const amount = parseFloat(amountMatch[1]);
  const rest = trimmed.replace(amountMatch[0], "").trim();
  let type: ParsedInput["type"] = "expense";
  if (/\bfrom\b/i.test(rest) || /\bsalary\b/i.test(rest) || /\bincome\b/i.test(rest) || /\breceived\b/i.test(rest) || /\bearned\b/i.test(rest)) {
    type = "income";
  }
  const { category } = detectCategory(rest || trimmed);
  const description = rest || category;
  return { amount, description, type, category };
}

const SUGGESTIONS = [
  "500 food", "2000 salary", "150 petrol", "100 coffee",
  "3000 rent", "200 shopping", "50 snack", "1500 freelance"
];

/* ——— Main Component ——— */
export default function Transactions() {
  const { formatAmount } = useCurrency();
  const { user, isGuest } = useAuth();
  const queryClient = useQueryClient();
  const [selectedIncome, setSelectedIncome] = useState<any>(null);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [smartInput, setSmartInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">("month");
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [guestIncome, setGuestIncome] = useState<GuestIncome[]>([]);
  const [guestExpenses, setGuestExpenses] = useState<GuestExpense[]>([]);

  const refreshGuestData = () => {
    setGuestIncome(getGuestIncome());
    setGuestExpenses(getGuestExpenses());
  };

  useEffect(() => {
    if (isGuest) refreshGuestData();
  }, [isGuest]);

  const { data: supabaseIncome = [], refetch: refetchIncome } = useQuery({
    queryKey: ["income", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("income").select("*").eq("user_id", user.id).order("date", { ascending: false });
      return data || [];
    },
    enabled: !!user && !isGuest,
  });

  const { data: supabaseExpenses = [], refetch: refetchExpenses } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("expenses").select("*").eq("user_id", user.id).order("date", { ascending: false });
      return data || [];
    },
    enabled: !!user && !isGuest,
  });

  const income = isGuest ? guestIncome : supabaseIncome;
  const expenses = isGuest ? guestExpenses : supabaseExpenses;

  const refetchAll = useCallback(() => {
    if (isGuest) { refreshGuestData(); return; }
    refetchIncome();
    refetchExpenses();
    queryClient.invalidateQueries({ queryKey: ["income", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["expenses", user?.id] });
  }, [isGuest, refetchIncome, refetchExpenses, queryClient, user?.id]);

  /* ——— Smart Add ——— */
  const handleSmartAdd = async () => {
    const parsed = parseSmartInput(smartInput);
    if (!parsed) {
      toast.error("Try: \"500 food\" or \"2000 salary\"");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (parsed.type === "income") {
      if (isGuest) {
        addGuestIncome({ source: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      } else if (user) {
        await supabase.from("income").insert({ user_id: user.id, source: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      }
      toast.success(`+${formatAmount(parsed.amount)} added`, { description: parsed.description });
    } else {
      if (isGuest) {
        addGuestExpense({ name: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      } else if (user) {
        await supabase.from("expenses").insert({ user_id: user.id, name: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      }
      toast.success(`-${formatAmount(parsed.amount)} recorded`, { description: parsed.description });
    }
    setSmartInput("");
    setShowSuggestions(false);
    refetchAll();
  };

  const preview = useMemo(() => parseSmartInput(smartInput), [smartInput]);
  const filteredSuggestions = useMemo(() => {
    if (!smartInput) return SUGGESTIONS;
    return SUGGESTIONS.filter((s) => s.toLowerCase().includes(smartInput.toLowerCase()));
  }, [smartInput]);

  /* ——— Filter logic ——— */
  const allTransactions = useMemo(() => {
    return [
      ...income.map((i: any) => ({ ...i, type: "income" as const })),
      ...expenses.map((e: any) => ({ ...e, type: "expense" as const })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [income, expenses]);

  const filtered = useMemo(() => {
    const now = new Date();
    return allTransactions.filter((t) => {
      const d = new Date(t.date);
      if (timeFilter === "today") {
        if (d.toDateString() !== now.toDateString()) return false;
      } else if (timeFilter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        if (d < weekAgo) return false;
      } else {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        if (d < monthAgo) return false;
      }
      if (searchQuery) {
        const title = t.type === "income" ? t.source : t.name;
        if (!title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }, [allTransactions, timeFilter, searchQuery]);

  /* ——— Insights ——— */
  const insight = useMemo(() => {
    const thisWeekExpenses = expenses.filter((e: any) => {
      const d = new Date(e.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return d >= weekAgo;
    });
    if (thisWeekExpenses.length > 0) {
      const catTotals: Record<string, number> = {};
      thisWeekExpenses.forEach((e: any) => {
        const cat = e.category || "Other";
        catTotals[cat] = (catTotals[cat] || 0) + Number(e.amount);
      });
      const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];
      if (topCat) return `You spent most on ${topCat[0]} this week`;
    }
    const totalInc = income.reduce((s: number, i: any) => s + Number(i.amount), 0);
    const totalExp = expenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
    if (totalInc > totalExp) return "Your income exceeds expenses — great job!";
    if (totalExp > 0) return "Track daily to stay in control";
    return "Add your first transaction to get started";
  }, [expenses, income]);

  /* ——— Delete ——— */
  const handleDelete = async (t: any) => {
    if (isGuest) { toast.info("Delete not available in guest mode"); return; }
    const table = t.type === "income" ? "income" : "expenses";
    await supabase.from(table).delete().eq("id", t.id);
    toast.success("Deleted");
    refetchAll();
  };

  /* ——— Group by date ——— */
  const grouped = useMemo(() => {
    const todayStr = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    const groups: { label: string; items: typeof filtered }[] = [];
    const todayItems = filtered.filter((t) => new Date(t.date).toDateString() === todayStr);
    const yesterdayItems = filtered.filter((t) => new Date(t.date).toDateString() === yesterdayStr);
    const earlier = filtered.filter(
      (t) => new Date(t.date).toDateString() !== todayStr && new Date(t.date).toDateString() !== yesterdayStr
    );
    if (todayItems.length > 0) groups.push({ label: "Today", items: todayItems });
    if (yesterdayItems.length > 0) groups.push({ label: "Yesterday", items: yesterdayItems });
    if (earlier.length > 0) groups.push({ label: "Earlier", items: earlier });
    return groups;
  }, [filtered]);

  const totalIncome = income.reduce((s: number, i: any) => s + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((s: number, e: any) => s + Number(e.amount), 0);

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-28 space-y-5">

          {/* ——— Header ——— */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-xl font-bold tracking-tight">Transactions</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Smart add · Auto categorize</p>
            </div>
            <div className="flex gap-2">
              <AddIncomeDialog onSuccess={refetchAll} />
              <AddExpenseDialog onSuccess={refetchAll} />
            </div>
          </motion.div>

          {/* ——— Smart Input Bar (Sticky) ——— */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="sticky top-16 z-20 bg-background/95 backdrop-blur-md pb-2 -mx-4 px-4 pt-2"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
                <Input
                  ref={inputRef}
                  placeholder='Try "500 food" or "2000 salary"'
                  value={smartInput}
                  onChange={(e) => { setSmartInput(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSmartAdd();
                    if (e.key === "Escape") setShowSuggestions(false);
                  }}
                  className="pl-10 h-12 rounded-2xl bg-card border-border/50 text-sm font-medium"
                />
              </div>
              {smartInput && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.15 }}>
                  <Button onClick={handleSmartAdd} className="h-12 px-5 rounded-2xl text-sm font-bold">Add</Button>
                </motion.div>
              )}
            </div>

            {/* Live preview */}
            {preview && smartInput && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 px-4 py-3 rounded-xl bg-card border border-border/40 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs h-6 px-2">
                    {preview.type === "income" ? "Income" : "Expense"}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">{preview.category}</span>
                </div>
                <span className={`text-sm font-bold ${preview.type === "income" ? "text-success" : "text-destructive"}`}>
                  {preview.type === "income" ? "+" : "-"}{formatAmount(preview.amount)}
                </span>
              </motion.div>
            )}

            {/* Suggestions dropdown */}
            <AnimatePresence>
              {showSuggestions && !preview && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-4 right-4 mt-1 z-30 bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden"
                >
                  <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick add</p>
                  {filteredSuggestions.slice(0, 5).map((s) => (
                    <button
                      key={s}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-muted/40 transition-colors"
                      onMouseDown={(e) => { e.preventDefault(); setSmartInput(s); setShowSuggestions(false); inputRef.current?.focus(); }}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ——— Insight ——— */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground font-medium">{insight}</p>
          </motion.div>

          {/* ——— Summary ——— */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease }}
            className="flex gap-3"
          >
            <div className="flex-1 px-4 py-3 rounded-2xl bg-card border border-border/40">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Income</p>
              <p className="text-base font-bold text-success mt-0.5">+{formatAmount(totalIncome)}</p>
            </div>
            <div className="flex-1 px-4 py-3 rounded-2xl bg-card border border-border/40">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Expenses</p>
              <p className="text-base font-bold text-destructive mt-0.5">-{formatAmount(totalExpenses)}</p>
            </div>
            <div className="flex-1 px-4 py-3 rounded-2xl bg-card border border-border/40">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Net</p>
              <p className={`text-base font-bold mt-0.5 ${totalIncome - totalExpenses >= 0 ? "text-success" : "text-destructive"}`}>
                {formatAmount(totalIncome - totalExpenses)}
              </p>
            </div>
          </motion.div>

          {/* ——— Filters ——— */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="flex gap-1 bg-card border border-border/40 rounded-2xl p-1">
              {(["today", "week", "month"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTimeFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    timeFilter === f
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f === "today" ? "Today" : f === "week" ? "Week" : "Month"}
                </button>
              ))}
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-8 text-sm rounded-xl bg-card border-border/40"
              />
            </div>
          </motion.div>

          {/* ——— Transaction Cards ——— */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease }}
            className="space-y-5"
          >
            {grouped.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground mb-3 px-1">
                  {group.label}
                </p>
                <div className="space-y-3">
                  {group.items.map((t, idx) => {
                    const isIncome = t.type === "income";
                    const title = isIncome ? t.source : t.name;
                    const Icon = getCategoryIcon(t.category);
                    const timeStr = new Date(t.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });

                    return (
                      <motion.div
                        key={`${t.type}-${t.id}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, delay: idx * 0.04, ease }}
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center gap-4 px-4 py-4 rounded-2xl bg-card border border-border/40 hover:border-border/60 hover:shadow-lg transition-all duration-200 cursor-pointer"
                        onClick={() => {
                          if (isIncome) setSelectedIncome(t);
                          else setSelectedExpense(t);
                        }}
                      >
                        {/* Category Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isIncome ? "bg-success/10" : "bg-destructive/10"
                        }`}>
                          <Icon className={`h-5 w-5 ${isIncome ? "text-success" : "text-destructive"}`} />
                        </div>

                        {/* Title + Date */}
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold truncate">{title}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{timeStr}{t.category ? ` · ${t.category}` : ""}</p>
                        </div>

                        {/* Amount + Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <p className={`text-lg font-bold ${isIncome ? "text-success" : "text-destructive"}`}>
                            {isIncome ? "+" : "-"}{formatAmount(Number(t.amount))}
                          </p>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={(e) => { e.stopPropagation(); if (isIncome) setSelectedIncome(t); else setSelectedExpense(t); }}
                              className="p-2 rounded-xl hover:bg-muted transition-colors"
                            >
                              <Pencil className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(t); }}
                              className="p-2 rounded-xl hover:bg-destructive/10 transition-colors"
                            >
                              <Trash2 className="h-4 w-4 text-destructive/70" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-base text-muted-foreground font-medium">No transactions found</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Try a different filter or add one above</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Edit Dialogs */}
      {selectedIncome && (
        <EditIncomeDialog
          income={selectedIncome}
          open={!!selectedIncome}
          onOpenChange={(open: boolean) => !open && setSelectedIncome(null)}
          onSuccess={() => { refetchAll(); setSelectedIncome(null); }}
        />
      )}
      {selectedExpense && (
        <EditExpenseDialog
          expense={selectedExpense}
          open={!!selectedExpense}
          onOpenChange={(open: boolean) => !open && setSelectedExpense(null)}
          onSuccess={() => { refetchAll(); setSelectedExpense(null); }}
        />
      )}
    </>
  );
}
