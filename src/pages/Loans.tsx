import { useState, useMemo, useCallback, useRef } from "react";
import {
  CreditCard, TrendingDown, TrendingUp, Pencil, Trash2,
  Check, ChevronDown, Plus, Sparkles, Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCurrency } from "@/components/currency-selector";
import { AddLoanDialog } from "@/components/forms/AddLoanDialog";
import EditLoanDialog from "@/components/forms/EditLoanDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function parseLoanInput(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const amountMatch = trimmed.match(/(\d+\.?\d*)/);
  if (!amountMatch) return null;
  const amount = parseFloat(amountMatch[1]);
  const rest = trimmed.replace(amountMatch[0], "").trim();
  let type: "owe" | "owed" = "owe";
  let name = rest;
  if (/\bfrom\b/i.test(rest)) { type = "owed"; name = rest.replace(/\bfrom\b/i, "").trim(); }
  else if (/\bto\b/i.test(rest)) { type = "owe"; name = rest.replace(/\bto\b/i, "").trim(); }
  if (!name) name = "Unnamed";
  return { amount, name, type };
}

function PartialPaymentDialog({ loan, open, onOpenChange, onSuccess }: { loan: any; open: boolean; onOpenChange: (v: boolean) => void; onSuccess: () => void }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { formatAmount } = useCurrency();
  const handlePay = async () => {
    const payAmount = parseFloat(amount);
    if (!payAmount || payAmount <= 0) { toast.error("Enter a valid amount"); return; }
    if (payAmount > Number(loan.current_balance)) { toast.error("Amount exceeds balance"); return; }
    setLoading(true);
    try {
      const newBalance = Number(loan.current_balance) - payAmount;
      const updates: any = { current_balance: newBalance };
      if (newBalance <= 0) updates.status = "paid_off";
      const { error } = await supabase.from("loans").update(updates).eq("id", loan.id);
      if (error) throw error;
      toast.success(`${formatAmount(payAmount)} paid off!`);
      onSuccess(); onOpenChange(false);
    } catch (err: any) { toast.error(err.message || "Failed to update"); }
    finally { setLoading(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl">
        <DialogHeader><DialogTitle>Pay towards {loan?.name}</DialogTitle></DialogHeader>
        <div className="space-y-5 pt-2">
          <p className="text-sm text-muted-foreground">Current balance: <span className="font-bold text-foreground">{formatAmount(loan?.current_balance || 0)}</span></p>
          <div className="space-y-2">
            <Label>Payment Amount</Label>
            <Input type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-13 rounded-xl text-base" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 h-12 rounded-xl">Cancel</Button>
            <Button onClick={handlePay} disabled={loading} className="flex-1 h-12 rounded-xl">{loading ? "Paying..." : "Confirm Payment"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Loans() {
  const { formatAmount } = useCurrency();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [partialLoan, setPartialLoan] = useState<any>(null);
  const [smartInput, setSmartInput] = useState("");
  const [filter, setFilter] = useState<"active" | "settled">("active");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: loans = [], refetch } = useQuery({
    queryKey: ["loans", user?.id],
    queryFn: async () => { if (!user) return []; const { data } = await supabase.from("loans").select("*").eq("user_id", user.id).order("created_at", { ascending: false }); return data || []; },
    enabled: !!user,
  });

  const refetchAll = useCallback(() => { refetch(); queryClient.invalidateQueries({ queryKey: ["loans", user?.id] }); }, [refetch, queryClient, user?.id]);

  const handleSmartAdd = async () => {
    const parsed = parseLoanInput(smartInput);
    if (!parsed || !user) { toast.error('Try: "5000 to Rahul" or "2000 from John"'); return; }
    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("loans").insert({ user_id: user.id, name: parsed.name, initial_amount: parsed.amount, current_balance: parsed.amount, start_date: today, status: "active", notes: parsed.type === "owed" ? "Owed to you" : "You owe" });
    if (error) { toast.error(error.message); return; }
    toast.success(`${parsed.type === "owed" ? "Credit" : "Debt"} added: ${formatAmount(parsed.amount)}`);
    setSmartInput(""); refetchAll();
  };

  const handleSettle = async (loan: any) => {
    if (!confirm(`Mark "${loan.name}" as settled?`)) return;
    const { error } = await supabase.from("loans").update({ status: "paid_off", current_balance: 0 }).eq("id", loan.id);
    if (error) { toast.error(error.message); return; }
    toast.success(`${loan.name} settled!`); refetchAll();
  };

  const handleDelete = async (loan: any) => {
    if (!confirm(`Delete "${loan.name}"?`)) return;
    const { error } = await supabase.from("loans").delete().eq("id", loan.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted"); refetchAll();
  };

  const activeLoans = useMemo(() => loans.filter((l: any) => l.status !== "paid_off"), [loans]);
  const settledLoans = useMemo(() => loans.filter((l: any) => l.status === "paid_off"), [loans]);
  const displayedLoans = filter === "active" ? activeLoans : settledLoans;
  const debts = useMemo(() => displayedLoans.filter((l: any) => !l.notes?.includes("Owed to you")), [displayedLoans]);
  const credits = useMemo(() => displayedLoans.filter((l: any) => l.notes?.includes("Owed to you")), [displayedLoans]);
  const totalYouOwe = activeLoans.filter((l: any) => !l.notes?.includes("Owed to you")).reduce((s: number, l: any) => s + Number(l.current_balance), 0);
  const totalOwedToYou = activeLoans.filter((l: any) => l.notes?.includes("Owed to you")).reduce((s: number, l: any) => s + Number(l.current_balance), 0);
  const preview = useMemo(() => parseLoanInput(smartInput), [smartInput]);

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
        <div className="max-w-lg mx-auto px-5 pt-6 pb-28 space-y-7">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Loans & Debts</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Track who you owe & who owes you</p>
            </div>
            <AddLoanDialog onSuccess={refetchAll} />
          </motion.div>

          {/* Summary Cards */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08, ease }} className="flex gap-4">
            <div className="flex-1 px-5 py-5 rounded-2xl bg-card border border-border/40 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">You Owe</p>
              </div>
              <p className="text-xl font-bold text-destructive">{formatAmount(totalYouOwe)}</p>
            </div>
            <div className="flex-1 px-5 py-5 rounded-2xl bg-card border border-border/40 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Owed To You</p>
              </div>
              <p className="text-xl font-bold text-success">{formatAmount(totalOwedToYou)}</p>
            </div>
          </motion.div>

          {/* Smart Input */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12, ease }}>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
                <Input ref={inputRef} placeholder='"5000 to Rahul" or "2000 from John"' value={smartInput}
                  onChange={(e) => setSmartInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSmartAdd(); }}
                  className="pl-10 h-13 rounded-2xl bg-card border-border/50 text-sm font-medium" />
              </div>
              {smartInput && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <Button onClick={handleSmartAdd} className="h-13 px-6 rounded-2xl text-sm font-bold">Add</Button>
                </motion.div>
              )}
            </div>
            {preview && smartInput && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 px-5 py-4 rounded-xl bg-card border border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs h-6 px-2">{preview.type === "owed" ? "Credit" : "Debt"}</Badge>
                  <span className="text-sm text-muted-foreground font-medium">{preview.name}</span>
                </div>
                <span className={`text-sm font-bold ${preview.type === "owed" ? "text-success" : "text-destructive"}`}>{formatAmount(preview.amount)}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-1 bg-card border border-border/40 rounded-2xl p-1.5 w-fit">
            {(["active", "settled"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${filter === f ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                {f === "active" ? "Active" : "Settled"}
              </button>
            ))}
          </motion.div>

          {/* You Owe Section */}
          {debts.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24, ease }} className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-destructive/80 px-1">You Owe</p>
              {debts.map((loan: any, idx: number) => (
                <LoanCard key={loan.id} loan={loan} type="debt" idx={idx} formatAmount={formatAmount}
                  expanded={expandedId === loan.id} onToggle={() => setExpandedId(expandedId === loan.id ? null : loan.id)}
                  onEdit={() => setSelectedLoan(loan)} onSettle={() => handleSettle(loan)}
                  onDelete={() => handleDelete(loan)} onPartialPay={() => setPartialLoan(loan)} isSettled={filter === "settled"} />
              ))}
            </motion.div>
          )}

          {/* Owed To You Section */}
          {credits.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease }} className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-success/80 px-1">Owed To You</p>
              {credits.map((loan: any, idx: number) => (
                <LoanCard key={loan.id} loan={loan} type="credit" idx={idx} formatAmount={formatAmount}
                  expanded={expandedId === loan.id} onToggle={() => setExpandedId(expandedId === loan.id ? null : loan.id)}
                  onEdit={() => setSelectedLoan(loan)} onSettle={() => handleSettle(loan)}
                  onDelete={() => handleDelete(loan)} onPartialPay={() => setPartialLoan(loan)} isSettled={filter === "settled"} />
              ))}
            </motion.div>
          )}

          {displayedLoans.length === 0 && (
            <div className="text-center py-16">
              <CreditCard className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-base text-muted-foreground font-medium">{filter === "active" ? "No active loans" : "No settled loans"}</p>
              <p className="text-sm text-muted-foreground/60 mt-1">{filter === "active" ? 'Try "5000 to Rahul" above' : "Settle a loan to see it here"}</p>
            </div>
          )}
        </div>
      </div>

      {selectedLoan && <EditLoanDialog loan={selectedLoan} open={!!selectedLoan} onOpenChange={(open: boolean) => !open && setSelectedLoan(null)} onSuccess={() => { refetchAll(); setSelectedLoan(null); }} />}
      {partialLoan && <PartialPaymentDialog loan={partialLoan} open={!!partialLoan} onOpenChange={(open) => !open && setPartialLoan(null)} onSuccess={() => { refetchAll(); setPartialLoan(null); }} />}
    </>
  );
}

/* ——— Expandable Loan Card ——— */
function LoanCard({ loan, type, idx, formatAmount, expanded, onToggle, onEdit, onSettle, onDelete, onPartialPay, isSettled }: {
  loan: any; type: "debt" | "credit"; idx: number; formatAmount: (n: number) => string;
  expanded: boolean; onToggle: () => void; onEdit: () => void; onSettle: () => void; onDelete: () => void; onPartialPay: () => void; isSettled: boolean;
}) {
  const isDebt = type === "debt";
  const paid = Number(loan.initial_amount) - Number(loan.current_balance);
  const progress = Number(loan.initial_amount) > 0 ? (paid / Number(loan.initial_amount)) * 100 : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, delay: idx * 0.05, ease }}
      whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`rounded-2xl bg-card border border-border/40 hover:border-border/60 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden ${isSettled ? "opacity-60" : ""}`}
    >
      {/* Summary row */}
      <div className="px-5 py-5 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isDebt ? "bg-destructive/10" : "bg-success/10"}`}>
          {isDebt ? <TrendingDown className="h-5 w-5 text-destructive" /> : <TrendingUp className="h-5 w-5 text-success" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-base font-bold truncate ${isSettled ? "line-through" : ""}`}>{loan.name}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {loan.start_date ? new Date(loan.start_date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : ""}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <p className={`text-xl font-bold ${isDebt ? "text-destructive" : "text-success"}`}>{formatAmount(Number(loan.current_balance))}</p>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 pb-5 pt-0 space-y-4 border-t border-border/30">
              {/* Progress */}
              {!isSettled && Number(loan.initial_amount) > 0 && (
                <div className="space-y-2 pt-4">
                  <Progress value={progress} className="h-2.5" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatAmount(paid)} paid</span>
                    <span>{progress.toFixed(0)}% done</span>
                  </div>
                </div>
              )}
              {/* Actions */}
              {!isSettled && (
                <div className="flex gap-3 pt-1">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onPartialPay(); }} className="h-11 rounded-xl text-xs font-bold flex-1">Pay Partial</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); onSettle(); }} className="h-11 rounded-xl text-xs font-bold flex-1 gap-1.5">
                    <Check className="h-3.5 w-3.5" /> Settle
                  </Button>
                  <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onEdit(); }} className="h-11 w-11 rounded-xl">
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); onDelete(); }} className="h-11 w-11 rounded-xl hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4 text-destructive/70" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
