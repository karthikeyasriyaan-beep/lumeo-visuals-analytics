import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Search, Pencil, Trash2,
  Utensils, Car, Zap, Home as HomeIcon, ShoppingBag, Briefcase,
  Gift, Heart, Plane, Smartphone, Sparkles, ArrowRightLeft, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrency } from "@/components/currency-selector";
import { AddIncomeDialog } from "@/components/forms/AddIncomeDialog";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import EditIncomeDialog from "@/components/forms/EditIncomeDialog";
import EditExpenseDialog from "@/components/forms/EditExpenseDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import {
  getGuestExpenses, getGuestIncome, addGuestExpense, addGuestIncome,
  type GuestExpense, type GuestIncome
} from "@/lib/guest-storage";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

/* ——— Category helpers ——— */
const CATEGORY_MAP: Record<string, { category: string; icon: typeof Utensils }> = {
  food: { category: "Food", icon: Utensils }, zomato: { category: "Food", icon: Utensils },
  swiggy: { category: "Food", icon: Utensils }, restaurant: { category: "Food", icon: Utensils },
  lunch: { category: "Food", icon: Utensils }, dinner: { category: "Food", icon: Utensils },
  breakfast: { category: "Food", icon: Utensils }, coffee: { category: "Food", icon: Utensils },
  snack: { category: "Food", icon: Utensils }, grocery: { category: "Food", icon: Utensils },
  uber: { category: "Travel", icon: Car }, ola: { category: "Travel", icon: Car },
  petrol: { category: "Travel", icon: Car }, fuel: { category: "Travel", icon: Car },
  travel: { category: "Travel", icon: Plane }, flight: { category: "Travel", icon: Plane },
  train: { category: "Travel", icon: Car }, bus: { category: "Travel", icon: Car },
  electricity: { category: "Bills", icon: Zap }, bill: { category: "Bills", icon: Zap },
  wifi: { category: "Bills", icon: Zap }, internet: { category: "Bills", icon: Zap },
  phone: { category: "Bills", icon: Smartphone }, recharge: { category: "Bills", icon: Smartphone },
  rent: { category: "Housing", icon: HomeIcon }, housing: { category: "Housing", icon: HomeIcon },
  shopping: { category: "Shopping", icon: ShoppingBag }, clothes: { category: "Shopping", icon: ShoppingBag },
  amazon: { category: "Shopping", icon: ShoppingBag }, flipkart: { category: "Shopping", icon: ShoppingBag },
  salary: { category: "Salary", icon: Briefcase }, freelance: { category: "Freelance", icon: Briefcase },
  gift: { category: "Gift", icon: Gift }, health: { category: "Health", icon: Heart },
  medical: { category: "Health", icon: Heart }, medicine: { category: "Health", icon: Heart },
};

function detectCategory(text: string) {
  const lower = text.toLowerCase();
  for (const [kw, val] of Object.entries(CATEGORY_MAP)) { if (lower.includes(kw)) return val; }
  return { category: "Other", icon: ArrowRightLeft };
}

function getCategoryIcon(category: string | null): typeof Utensils {
  if (!category) return ArrowRightLeft;
  const lower = category.toLowerCase();
  for (const [, val] of Object.entries(CATEGORY_MAP)) { if (val.category.toLowerCase() === lower) return val.icon; }
  return ArrowRightLeft;
}

/* ——— Smart input parser ——— */
interface ParsedInput { amount: number; description: string; type: "expense" | "income"; category: string; }

function parseSmartInput(input: string): ParsedInput | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/(\d+\.?\d*)/);
  if (!match) return null;
  const amount = parseFloat(match[1]);
  const rest = trimmed.replace(match[0], "").trim();
  const type: ParsedInput["type"] =
    /\b(from|salary|income|received|earned)\b/i.test(rest) ? "income" : "expense";
  const { category } = detectCategory(rest || trimmed);
  return { amount, description: rest || category, type, category };
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ——— Component ——— */
export default function Transactions() {
  const { formatAmount } = useCurrency();
  const { user, isGuest } = useAuth();
  const queryClient = useQueryClient();

  const [selectedIncome, setSelectedIncome] = useState<any>(null);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [smartInput, setSmartInput] = useState("");
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [guestIncome, setGuestIncome] = useState<GuestIncome[]>([]);
  const [guestExpenses, setGuestExpenses] = useState<GuestExpense[]>([]);

  const refreshGuestData = () => {
    setGuestIncome(getGuestIncome());
    setGuestExpenses(getGuestExpenses());
  };
  useEffect(() => { if (isGuest) refreshGuestData(); }, [isGuest]);

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

  const handleSmartAdd = async () => {
    const parsed = parseSmartInput(smartInput);
    if (!parsed) { toast.error('Try: "500 food" or "2000 salary"'); return; }
    const today = new Date().toISOString().split("T")[0];
    if (parsed.type === "income") {
      if (isGuest) addGuestIncome({ source: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      else if (user) await supabase.from("income").insert({ user_id: user.id, source: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      toast.success(`+${formatAmount(parsed.amount)} income added`);
    } else {
      if (isGuest) addGuestExpense({ name: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      else if (user) await supabase.from("expenses").insert({ user_id: user.id, name: parsed.description, amount: parsed.amount, date: today, category: parsed.category });
      toast.success(`-${formatAmount(parsed.amount)} expense recorded`);
    }
    setSmartInput("");
    refetchAll();
  };

  const preview = useMemo(() => parseSmartInput(smartInput), [smartInput]);

  const allTransactions = useMemo(() => [
    ...income.map((i: any) => ({ ...i, type: "income" as const })),
    ...expenses.map((e: any) => ({ ...e, type: "expense" as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [income, expenses]);

  const filtered = useMemo(() => {
    const now = new Date();
    return allTransactions.filter((t) => {
      const d = new Date(t.date);
      if (timeFilter === "today" && d.toDateString() !== now.toDateString()) return false;
      if (timeFilter === "week") { const w = new Date(); w.setDate(w.getDate() - 7); if (d < w) return false; }
      if (timeFilter === "month") { const m = new Date(); m.setMonth(m.getMonth() - 1); if (d < m) return false; }
      if (searchQuery) {
        const title = t.type === "income" ? t.source : t.name;
        if (!title?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }, [allTransactions, timeFilter, searchQuery]);

  const insight = useMemo(() => {
    const week = expenses.filter((e: any) => { const w = new Date(); w.setDate(w.getDate() - 7); return new Date(e.date) >= w; });
    if (week.length > 0) {
      const cat: Record<string, number> = {};
      week.forEach((e: any) => { const c = e.category || "Other"; cat[c] = (cat[c] || 0) + Number(e.amount); });
      const top = Object.entries(cat).sort((a, b) => b[1] - a[1])[0];
      if (top) return `Most spent on ${top[0]} this week`;
    }
    const ti = income.reduce((s: number, i: any) => s + Number(i.amount), 0);
    const te = expenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
    if (ti > te) return "Income exceeds expenses — great job!";
    return "Add your first transaction to get started";
  }, [expenses, income]);

  const handleDelete = async (t: any) => {
    if (isGuest) { toast.info("Delete not available in guest mode"); return; }
    await supabase.from(t.type === "income" ? "income" : "expenses").delete().eq("id", t.id);
    toast.success("Deleted");
    refetchAll();
  };

  const grouped = useMemo(() => {
    const todayStr = new Date().toDateString();
    const yest = new Date(); yest.setDate(yest.getDate() - 1);
    const yesterdayStr = yest.toDateString();
    const groups: { label: string; items: typeof filtered }[] = [];
    const todays = filtered.filter((t) => new Date(t.date).toDateString() === todayStr);
    const yesterdays = filtered.filter((t) => new Date(t.date).toDateString() === yesterdayStr);
    const earlier = filtered.filter((t) => new Date(t.date).toDateString() !== todayStr && new Date(t.date).toDateString() !== yesterdayStr);
    if (todays.length) groups.push({ label: "Today", items: todays });
    if (yesterdays.length) groups.push({ label: "Yesterday", items: yesterdays });
    if (earlier.length) groups.push({ label: "Earlier", items: earlier });
    return groups;
  }, [filtered]);

  const totalIncome = income.reduce((s: number, i: any) => s + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
  const net = totalIncome - totalExpenses;

  return (
    <>
      <NoIndexMeta />
      <div className="min-h-screen w-full bg-background">

        {/* ── Sticky topbar ── */}
        <div className="sticky top-14 sm:top-16 z-20 bg-background/95 backdrop-blur-md border-b border-border/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
            <h1 className="text-base font-bold tracking-tight">Transactions</h1>
            <div className="flex gap-2">
              <AddIncomeDialog onSuccess={refetchAll} />
              <AddExpenseDialog onSuccess={refetchAll} />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 pb-28 space-y-5">

          {/* ── Smart input ── */}
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 pointer-events-none" />
                <Input
                  ref={inputRef}
                  placeholder='Quick add: "500 food" or "2000 salary"'
                  value={smartInput}
                  onChange={(e) => setSmartInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSmartAdd(); }}
                  className="pl-9 h-10 rounded-xl bg-card border-border/40 text-sm"
                />
              </div>
              <AnimatePresence>
                {smartInput && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.12 }}
                  >
                    <Button onClick={handleSmartAdd} className="h-10 px-4 rounded-xl text-sm">Add</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Preview — only shows type + amount, clean */}
            <AnimatePresence>
              {preview && smartInput && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-2 flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30 border border-border/20"
                >
                  <span className="text-xs text-muted-foreground">{preview.category} · {preview.type}</span>
                  <span className={`text-sm font-bold ${preview.type === "income" ? "text-success" : "text-destructive"}`}>
                    {preview.type === "income" ? "+" : "-"}{formatAmount(preview.amount)}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Summary cards ── */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-success/5 border border-success/15 px-3 py-3">
              <p className="text-[10px] font-medium text-success/50 uppercase tracking-wide">Income</p>
              <p className="text-sm font-bold text-success mt-0.5 truncate">+{formatAmount(totalIncome)}</p>
            </div>
            <div className="rounded-xl bg-destructive/5 border border-destructive/15 px-3 py-3">
              <p className="text-[10px] font-medium text-destructive/50 uppercase tracking-wide">Expenses</p>
              <p className="text-sm font-bold text-destructive mt-0.5 truncate">-{formatAmount(totalExpenses)}</p>
            </div>
            <div className={`rounded-xl border px-3 py-3 ${net >= 0 ? "bg-success/5 border-success/15" : "bg-destructive/5 border-destructive/15"}`}>
              <p className={`text-[10px] font-medium uppercase tracking-wide ${net >= 0 ? "text-success/50" : "text-destructive/50"}`}>Net</p>
              <p className={`text-sm font-bold mt-0.5 truncate ${net >= 0 ? "text-success" : "text-destructive"}`}>{formatAmount(net)}</p>
            </div>
          </div>

          {/* ── Filters + Search ── */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 p-0.5 bg-muted/40 rounded-lg border border-border/20 flex-shrink-0">
              {(["today", "week", "month"] as const).map((f) => (
                <button key={f} onClick={() => setTimeFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                    timeFilter === f
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                  {f === "today" ? "Today" : f === "week" ? "Week" : "Month"}
                </button>
              ))}
            </div>
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30 pointer-events-none" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-8 text-sm rounded-lg bg-card border-border/30 w-full"
              />
            </div>
          </div>

          {/* ── Insight ── */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
            <Sparkles className="h-3 w-3 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">{insight}</p>
          </div>

          {/* ── Transaction list ── */}
          <div className="space-y-6">
            {grouped.length === 0 && (
              <div className="flex flex-col items-center py-16 gap-2">
                <div className="w-10 h-10 rounded-full bg-muted/40 flex items-center justify-center mb-1">
                  <Search className="h-4 w-4 text-muted-foreground/30" />
                </div>
                <p className="text-sm text-muted-foreground">No transactions found</p>
                <p className="text-xs text-muted-foreground/40">Try a different filter or add one above</p>
              </div>
            )}

            {grouped.map((group) => (
              <div key={group.label}>
                {/* Group label */}
                <div className="flex items-center gap-2 mb-2 px-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">{group.label}</p>
                  <div className="flex-1 h-px bg-border/20" />
                </div>

                {/* Items */}
                <div className="space-y-1">
                  {group.items.map((t, idx) => {
                    const isIncome = t.type === "income";
                    const title = isIncome ? t.source : t.name;
                    const Icon = getCategoryIcon(t.category);
                    const dateStr = new Date(t.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
                    const isExpanded = expandedId === `${t.type}-${t.id}`;

                    return (
                      <motion.div
                        key={`${t.type}-${t.id}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, delay: idx * 0.02, ease }}
                        className="rounded-xl bg-card border border-border/30 hover:border-border/50 transition-colors duration-150 cursor-pointer overflow-hidden"
                        onClick={() => setExpandedId(isExpanded ? null : `${t.type}-${t.id}`)}
                      >
                        {/* Row */}
                        <div className="flex items-center gap-3 px-4 py-3">
                          {/* Icon */}
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isIncome ? "bg-success/10" : "bg-destructive/10"}`}>
                            <Icon className={`h-3.5 w-3.5 ${isIncome ? "text-success" : "text-destructive"}`} />
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate leading-tight">{title}</p>
                            <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                              {dateStr}{t.category ? ` · ${t.category}` : ""}
                            </p>
                          </div>

                          {/* Amount */}
                          <p className={`text-sm font-semibold tabular-nums flex-shrink-0 ${isIncome ? "text-success" : "text-destructive"}`}>
                            {isIncome ? "+" : "-"}{formatAmount(Number(t.amount))}
                          </p>

                          {/* Chevron */}
                          <ChevronDown className={`h-3 w-3 text-muted-foreground/30 flex-shrink-0 transition-transform duration-150 ${isExpanded ? "rotate-180" : ""}`} />
                        </div>

                        {/* Expanded actions */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 py-3 border-t border-border/20 flex gap-2">
                                <Button size="sm" variant="outline"
                                  className="h-8 px-3 rounded-lg text-xs gap-1.5"
                                  onClick={(e) => { e.stopPropagation(); isIncome ? setSelectedIncome(t) : setSelectedExpense(t); }}>
                                  <Pencil className="h-3 w-3" /> Edit
                                </Button>
                                <Button size="sm" variant="outline"
                                  className="h-8 px-3 rounded-lg text-xs gap-1.5 text-destructive hover:bg-destructive/10 hover:border-destructive/20"
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
          </div>
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
