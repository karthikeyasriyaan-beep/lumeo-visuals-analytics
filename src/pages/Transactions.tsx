import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Search, Pencil, Trash2,
  Utensils, Car, Zap, Home as HomeIcon, ShoppingBag, Briefcase,
  Gift, Heart, Plane, Smartphone, Sparkles, ArrowRightLeft, ChevronDown
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
  food: { category: "Food", icon: Utensils }, zomato: { category: "Food", icon: Utensils }, swiggy: { category: "Food", icon: Utensils },
  restaurant: { category: "Food", icon: Utensils }, lunch: { category: "Food", icon: Utensils }, dinner: { category: "Food", icon: Utensils },
  breakfast: { category: "Food", icon: Utensils }, coffee: { category: "Food", icon: Utensils }, snack: { category: "Food", icon: Utensils },
  grocery: { category: "Food", icon: Utensils }, uber: { category: "Travel", icon: Car }, ola: { category: "Travel", icon: Car },
  petrol: { category: "Travel", icon: Car }, fuel: { category: "Travel", icon: Car }, travel: { category: "Travel", icon: Plane },
  flight: { category: "Travel", icon: Plane }, train: { category: "Travel", icon: Car }, bus: { category: "Travel", icon: Car },
  electricity: { category: "Bills", icon: Zap }, bill: { category: "Bills", icon: Zap }, wifi: { category: "Bills", icon: Zap },
  internet: { category: "Bills", icon: Zap }, phone: { category: "Bills", icon: Smartphone }, recharge: { category: "Bills", icon: Smartphone },
  rent: { category: "Housing", icon: HomeIcon }, housing: { category: "Housing", icon: HomeIcon },
  shopping: { category: "Shopping", icon: ShoppingBag }, clothes: { category: "Shopping", icon: ShoppingBag },
  amazon: { category: "Shopping", icon: ShoppingBag }, flipkart: { category: "Shopping", icon: ShoppingBag },
  salary: { category: "Salary", icon: Briefcase }, freelance: { category: "Freelance", icon: Briefcase },
  gift: { category: "Gift", icon: Gift }, health: { category: "Health", icon: Heart },
  medical: { category: "Health", icon: Heart }, medicine: { category: "Health", icon: Heart },
};

function detectCategory(text: string) {
  const lower = text.toLowerCase();
  for (const [keyword, val] of Object.entries(CATEGORY_MAP)) { if (lower.includes(keyword)) return val; }
  return { category: "Other", icon: ArrowRightLeft };
}

function getCategoryIcon(category: string | null): typeof Utensils {
  if (!category) return ArrowRightLeft;
  const lower = category.toLowerCase();
  for (const [, val] of Object.entries(CATEGORY_MAP)) { if (val.category.toLowerCase() === lower) return val.icon; }
  return ArrowRightLeft;
}

/* ——— Smart Input Parser ——— */
interface ParsedInput { amount: number; description: string; type: "expense" | "income"; category: string; }

function parseSmartInput(input: string): ParsedInput | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const amountMatch = trimmed.match(/(\d+\.?\d*)/);
  if (!amountMatch) return null;
  const amount = parseFloat(amountMatch[1]);
  const rest = trimmed.replace(amountMatch[0], "").trim();
  let type: ParsedInput["type"] = "expense";
  if (/\bfrom\b/i.test(rest) || /\bsalary\b/i.test(rest) || /\bincome\b/i.test(rest) || /\breceived\b/i.test(rest) || /\bearned\b/i.test(rest)) type = "income";
  const { category } = detectCategory(rest || trimmed);
  return { amount, description: rest || category, type, category };
}

const SUGGESTIONS = ["500 food", "2000 salary", "150 petrol", "100 coffee", "3000 rent", "200 shopping", "50 snack", "1500 freelance"];
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [guestIncome, setGuestIncome] = useState<GuestIncome[]>([]);
  const [guestExpenses, setGuestExpenses] = useState<GuestExpense[]>([]);

  const refreshGuestData = () => { setGuestIncome(getGuestIncome()); setGuestExpenses(getGuestExpenses()); };
  useEffect(() => { if (isGuest) refreshGuestData(); }, [isGuest]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: supabaseIncome = [], refetch: refetchIncome } = useQuery({
    queryKey: ["income", user?.id],
    queryFn: async () => { if (!user) return []; const { data } = await supabase.from("income").select("*").eq("user_id", user.id).order("date", { ascending: false }); return data || []; },
    enabled: !!user && !isGuest,
  });

  const { data: supabaseExpenses = [], refetch: refetchExpenses } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => { if (!user) return []; const { data } = await supabase.from("expenses").select("*").eq("user_id", user.id).order("date", { ascending: false }); return data || []; },
    enabled: !!user && !isGuest,
  });

  const income = isGuest ? guestIncome : supabaseIncome;
  const expenses = isGuest ? guestExpenses : supabaseExpenses;

  const refetchAll = useCallback(() => {
    if (isGuest) { refreshGuestData(); return; }
    refetchIncome(); refetchExpenses();
    queryClient.invalidateQueries({ queryKey: ["income", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["expenses", user?.id] });
  }, [isGuest, refetchIncome, refetchExpenses, queryClient, user?.id]);

  const handleSmartAdd = async () => {
    const parsed = parseSmartInput(smartInput);
    if (!parsed) { toast.error('Try: "500 food" or "2000 salary"'); return; }
    const today = new Date().toISOString().split("T")[0];
    if (parsed.type === "income") {
      if (isGuest) addGuestIncome({ source: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      else if (user) await supabase.from("income").insert({ user_id: user.id, source: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      toast.success(`+${formatAmount(parsed.amount)} added`, { description: parsed.description });
    } else {
      if (isGuest) addGuestExpense({ name: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      else if (user) await supabase.from("expenses").insert({ user_id: user.id, name: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      toast.success(`-${formatAmount(parsed.amount)} recorded`, { description: parsed.description });
    }
    setSmartInput(""); setShowSuggestions(false); refetchAll();
  };

  const preview = useMemo(() => parseSmartInput(smartInput), [smartInput]);
  const filteredSuggestions = useMemo(() =>
    !smartInput ? SUGGESTIONS : SUGGESTIONS.filter((s) => s.toLowerCase().includes(smartInput.toLowerCase())),
    [smartInput]
  );

  const allTransactions = useMemo(() => [
    ...income.map((i: any) => ({ ...i, type: "income" as const })),
    ...expenses.map((e: any) => ({ ...e, type: "expense" as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [income, expenses]);

  const filtered = useMemo(() => {
    const now = new Date();
    return allTransactions.filter((t) => {
      const d = new Date(t.date);
      if (timeFilter === "today" && d.toDateString() !== now.toDateString()) return false;
      if (timeFilter === "week") { const wa = new Date(); wa.setDate(wa.getDate() - 7); if (d < wa) return false; }
      if (timeFilter === "month") { const ma = new Date(); ma.setMonth(ma.getMonth() - 1); if (d < ma) return false; }
      if (searchQuery) {
        const title = t.type === "income" ? t.source : t.name;
        if (!title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }, [allTransactions, timeFilter, searchQuery]);

  const insight = useMemo(() => {
    const thisWeek = expenses.filter((e: any) => { const d = new Date(e.date); const wa = new Date(); wa.setDate(wa.getDate() - 7); return d >= wa; });
    if (thisWeek.length > 0) {
      const cat: Record<string, number> = {};
      thisWeek.forEach((e: any) => { const c = e.category || "Other"; cat[c] = (cat[c] || 0) + Number(e.amount); });
      const top = Object.entries(cat).sort((a, b) => b[1] - a[1])[0];
      if (top) return `You spent most on ${top[0]} this week`;
    }
    const ti = income.reduce((s: number, i: any) => s + Number(i.amount), 0);
    const te = expenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
    if (ti > te) return "Your income exceeds expenses — great job!";
    return "Add your first transaction to get started";
  }, [expenses, income]);

  const handleDelete = async (t: any) => {
    if (isGuest) { toast.info("Delete not available in guest mode"); return; }
    await supabase.from(t.type === "income" ? "income" : "expenses").delete().eq("id", t.id);
    toast.success("Deleted"); refetchAll();
  };

  const grouped = useMemo(() => {
    const todayStr = new Date().toDateString();
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    const groups: { label: string; items: typeof filtered }[] = [];
    const ti = filtered.filter((t) => new Date(t.date).toDateString() === todayStr);
    const yi = filtered.filter((t) => new Date(t.date).toDateString() === yesterdayStr);
    const ei = filtered.filter((t) => new Date(t.date).toDateString() !== todayStr && new Date(t.date).toDateString() !== yesterdayStr);
    if (ti.length > 0) groups.push({ label: "Today", items: ti });
    if (yi.length > 0) groups.push({ label: "Yesterday", items: yi });
    if (ei.length > 0) groups.push({ label: "Earlier", items: ei });
    return groups;
  }, [filtered]);

  const totalIncome = income.reduce((s: number, i: any) => s + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
  const net = totalIncome - totalExpenses;

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full bg-background">

        {/* ── STICKY TOPBAR: title + action buttons ONLY ── */}
        <div className="sticky top-14 sm:top-16 z-20 bg-background/95 backdrop-blur-md border-b border-border/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight leading-none">Transactions</h1>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">Smart add · Auto categorize</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <AddIncomeDialog onSuccess={refetchAll} />
              <AddExpenseDialog onSuccess={refetchAll} />
            </div>
          </div>
        </div>

        {/* ── ALL SCROLLABLE CONTENT BELOW ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-4 pb-28 space-y-4">

          {/* 1. Smart Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className="relative"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40 pointer-events-none" />
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
                  className="pl-10 h-11 rounded-xl bg-card border-border/50 text-sm"
                />
              </div>
              <AnimatePresence>
                {smartInput && (
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.15 }}
                  >
                    <Button onClick={handleSmartAdd} className="h-11 px-5 rounded-xl text-sm font-semibold">Add</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSuggestions && !preview && filteredSuggestions.length > 0 && (
                <motion.div
                  ref={suggestionsRef}
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                  className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-card border border-border/50 rounded-xl shadow-lg overflow-hidden"
                >
                  <p className="px-3 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Quick add</p>
                  {filteredSuggestions.slice(0, 4).map((s) => (
                    <button key={s}
                      className="w-full text-left px-3 py-2.5 text-sm hover:bg-muted/50 transition-colors"
                      onMouseDown={(e) => { e.preventDefault(); setSmartInput(s); setShowSuggestions(false); inputRef.current?.focus(); }}>
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Preview pill */}
            <AnimatePresence>
              {preview && smartInput && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5 capitalize">{preview.type}</Badge>
                    <span className="text-xs text-muted-foreground">{preview.category}</span>
                  </div>
                  <span className={`text-sm font-bold ${preview.type === "income" ? "text-success" : "text-destructive"}`}>
                    {preview.type === "income" ? "+" : "-"}{formatAmount(preview.amount)}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 2. Summary Cards — 3 equal cols, scrolls with page */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, ease }}
            className="grid grid-cols-3 gap-2 sm:gap-3"
          >
            <div className="rounded-2xl bg-success/5 border border-success/20 px-3 sm:px-4 py-3 sm:py-4 min-w-0">
              <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-success/60 mb-1">Income</p>
              <p className="text-sm sm:text-base font-bold text-success truncate">+{formatAmount(totalIncome)}</p>
            </div>
            <div className="rounded-2xl bg-destructive/5 border border-destructive/20 px-3 sm:px-4 py-3 sm:py-4 min-w-0">
              <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-destructive/60 mb-1">Expenses</p>
              <p className="text-sm sm:text-base font-bold text-destructive truncate">-{formatAmount(totalExpenses)}</p>
            </div>
            <div className={`rounded-2xl border px-3 sm:px-4 py-3 sm:py-4 min-w-0 ${net >= 0 ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"}`}>
              <p className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider mb-1 ${net >= 0 ? "text-success/60" : "text-destructive/60"}`}>Net</p>
              <p className={`text-sm sm:text-base font-bold truncate ${net >= 0 ? "text-success" : "text-destructive"}`}>{formatAmount(net)}</p>
            </div>
          </motion.div>

          {/* 3. Filters + Search */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="flex items-center gap-2"
          >
            <div className="flex gap-1 p-1 bg-muted/40 rounded-xl border border-border/30 flex-shrink-0">
              {(["today", "week", "month"] as const).map((f) => (
                <button key={f} onClick={() => setTimeFilter(f)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                    timeFilter === f
                      ? "bg-background text-foreground shadow-sm border border-border/40"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                  {f === "today" ? "Today" : f === "week" ? "Week" : "Month"}
                </button>
              ))}
            </div>
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 pointer-events-none" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-8 text-sm rounded-xl bg-card border-border/40 w-full"
              />
            </div>
          </motion.div>

          {/* 4. Insight */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-primary/5 border border-primary/10"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground font-medium">{insight}</p>
          </motion.div>

          {/* 5. Transaction Groups */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease }}
            className="space-y-5"
          >
            {grouped.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="h-6 w-6 text-muted-foreground/30" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">No transactions found</p>
                <p className="text-xs text-muted-foreground/50">Try a different filter or add one above</p>
              </div>
            )}

            {grouped.map((group) => (
              <div key={group.label} className="space-y-2">
                {/* Group header with count */}
                <div className="flex items-center gap-2 px-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap">{group.label}</p>
                  <div className="flex-1 h-px bg-border/30" />
                  <span className="text-[10px] text-muted-foreground/40 font-medium">{group.items.length}</span>
                </div>

                <div className="space-y-1.5">
                  {group.items.map((t, idx) => {
                    const isIncome = t.type === "income";
                    const title = isIncome ? t.source : t.name;
                    const Icon = getCategoryIcon(t.category);
                    const dateStr = new Date(t.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
                    const isExpanded = expandedId === `${t.type}-${t.id}`;

                    return (
                      <motion.div
                        key={`${t.type}-${t.id}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.02, ease }}
                        whileTap={{ scale: 0.99 }}
                        className="rounded-xl bg-card border border-border/40 hover:border-border/60 transition-all duration-150 cursor-pointer overflow-hidden"
                        onClick={() => setExpandedId(isExpanded ? null : `${t.type}-${t.id}`)}
                      >
                        <div className="flex items-center gap-3 px-4 py-3.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isIncome ? "bg-success/10" : "bg-destructive/10"}`}>
                            <Icon className={`h-4 w-4 ${isIncome ? "text-success" : "text-destructive"}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold leading-tight truncate">{title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                              {dateStr}{t.category ? ` · ${t.category}` : ""}
                            </p>
                          </div>
                          <p className={`text-sm font-bold flex-shrink-0 tabular-nums ${isIncome ? "text-success" : "text-destructive"}`}>
                            {isIncome ? "+" : "-"}{formatAmount(Number(t.amount))}
                          </p>
                          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground/40 transition-transform duration-200 flex-shrink-0 ml-0.5 ${isExpanded ? "rotate-180" : ""}`} />
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-3.5 border-t border-border/20 pt-3 flex gap-2">
                                <Button size="sm" variant="outline"
                                  className="h-8 px-3 rounded-lg text-xs font-semibold gap-1.5"
                                  onClick={(e) => { e.stopPropagation(); if (isIncome) setSelectedIncome(t); else setSelectedExpense(t); }}>
                                  <Pencil className="h-3 w-3" /> Edit
                                </Button>
                                <Button size="sm" variant="outline"
                                  className="h-8 px-3 rounded-lg text-xs font-semibold gap-1.5 text-destructive hover:bg-destructive/10 hover:border-destructive/30"
                                  onClick={(e) => { e.stopPropagation(); handleDelete(t); }}>
                                  <Trash2 className="h-3 w-3" /> Delete
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {selectedIncome && (
        <EditIncomeDialog income={selectedIncome} open={!!selectedIncome}
          onOpenChange={(open: boolean) => !open && setSelectedIncome(null)}
          onSuccess={() => { refetchAll(); setSelectedIncome(null); }} />
      )}
      {selectedExpense && (
        <EditExpenseDialog expense={selectedExpense} open={!!selectedExpense}
          onOpenChange={(open: boolean) => !open && setSelectedExpense(null)}
          onSuccess={() => { refetchAll(); setSelectedExpense(null); }} />
      )}
    </>
  );
}
