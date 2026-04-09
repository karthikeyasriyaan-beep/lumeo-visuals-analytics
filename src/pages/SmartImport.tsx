import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Upload, Sparkles, Trash2, Plus, ImageIcon, FileText, ArrowLeft, CheckCircle2,
  Utensils, Car, Zap, Home as HomeIcon, ShoppingBag, Briefcase, Gift, Heart, Plane, Smartphone, ArrowRightLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ——— Category Detection ——— */
const CATEGORY_MAP: Record<string, { category: string; icon: typeof Utensils }> = {
  food: { category: "Food", icon: Utensils }, grocery: { category: "Food", icon: Utensils },
  restaurant: { category: "Food", icon: Utensils }, lunch: { category: "Food", icon: Utensils },
  dinner: { category: "Food", icon: Utensils }, coffee: { category: "Food", icon: Utensils },
  petrol: { category: "Travel", icon: Car }, fuel: { category: "Travel", icon: Car },
  uber: { category: "Travel", icon: Car }, travel: { category: "Travel", icon: Plane },
  electricity: { category: "Bills", icon: Zap }, bill: { category: "Bills", icon: Zap },
  wifi: { category: "Bills", icon: Zap }, phone: { category: "Bills", icon: Smartphone },
  rent: { category: "Housing", icon: HomeIcon }, shopping: { category: "Shopping", icon: ShoppingBag },
  amazon: { category: "Shopping", icon: ShoppingBag }, salary: { category: "Salary", icon: Briefcase },
  freelance: { category: "Freelance", icon: Briefcase }, gift: { category: "Gift", icon: Gift },
  medical: { category: "Health", icon: Heart },
};

function detectCategory(text: string) {
  const lower = text.toLowerCase();
  for (const [keyword, val] of Object.entries(CATEGORY_MAP)) { if (lower.includes(keyword)) return val; }
  return { category: "Other", icon: ArrowRightLeft };
}

/* ——— Types ——— */
interface ImportRow {
  id: string;
  amount: string;
  category: string;
  date: string;
  note: string;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function createEmptyRow(): ImportRow {
  return { id: crypto.randomUUID(), amount: "", category: "", date: new Date().toISOString().split("T")[0], note: "" };
}

export default function SmartImport() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [rows, setRows] = useState<ImportRow[]>(() => Array.from({ length: 3 }, createEmptyRow));
  const [quickText, setQuickText] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateRow = (id: string, patch: Partial<ImportRow>) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  };

  const removeRow = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const addRow = () => setRows(prev => [...prev, createEmptyRow()]);

  /* ——— Quick Entry Parse ——— */
  const parseQuickEntry = useCallback(() => {
    const lines = quickText.split("\n").filter(l => l.trim());
    if (lines.length === 0) return;

    const parsed: ImportRow[] = lines.map(line => {
      const trimmed = line.trim();
      const amountMatch = trimmed.match(/(\d+\.?\d*)/);
      const amount = amountMatch ? amountMatch[1] : "";
      const rest = trimmed.replace(amountMatch?.[0] || "", "").trim();
      const { category } = detectCategory(rest || trimmed);
      return {
        id: crypto.randomUUID(),
        amount,
        category: category || rest || "Other",
        date: new Date().toISOString().split("T")[0],
        note: rest,
      };
    });

    setRows(prev => [...prev.filter(r => r.amount || r.category), ...parsed]);
    setQuickText("");
    toast.success(`Parsed ${parsed.length} entries`);
  }, [quickText]);

  /* ——— Screenshot Upload ——— */
  const handleScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
    toast.info("Screenshot uploaded. Add entries manually based on the image.");
  };

  /* ——— Submit All ——— */
  const validRows = rows.filter(r => r.amount && !isNaN(Number(r.amount)));
  const total = validRows.reduce((s, r) => s + Number(r.amount), 0);

  const handleSubmit = async () => {
    if (!user) return;
    if (validRows.length === 0) {
      toast.error("Add at least one valid entry");
      return;
    }

    setLoading(true);
    try {
      const inserts = validRows.map(r => ({
        user_id: user.id,
        name: r.category || "Other",
        category: r.category || "Other",
        amount: parseFloat(r.amount),
        date: r.date,
        notes: r.note || null,
      }));

      const { error } = await supabase.from("expenses").insert(inserts);
      if (error) throw error;

      toast.success(`${validRows.length} transactions added successfully`);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["income"] });

      setRows(Array.from({ length: 3 }, createEmptyRow));
      setScreenshotPreview(null);
      navigate("/transactions");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-6 pb-28 space-y-6">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }}>
            <div className="flex items-center gap-3 mb-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">Smart Import</h1>
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 font-semibold">⭐ Smart Feature</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add multiple transactions quickly by uploading a screenshot or entering them manually.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Two-column layout on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Left: Upload + Quick Entry */}
            <div className="space-y-5">
              {/* Upload Screenshot */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, ease }}
                className="rounded-2xl bg-card border border-border/40 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <p className="text-sm font-bold">Upload Screenshot</p>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Upload a screenshot of your transactions to reference while adding entries.
                </p>

                {screenshotPreview ? (
                  <div className="relative">
                    <img src={screenshotPreview} alt="Screenshot" className="rounded-xl max-h-48 w-full object-cover border border-border/30" />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-lg"
                      onClick={() => setScreenshotPreview(null)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed border-border/40 hover:border-primary/30 transition-colors cursor-pointer bg-muted/10">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">Click to upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleScreenshot} />
                  </label>
                )}
              </motion.div>

              {/* Quick Entry */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }}
                className="rounded-2xl bg-card border border-border/40 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-sm font-bold">Quick Entry</p>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Type one entry per line, e.g. <span className="font-mono text-foreground">200 food</span>
                </p>
                <Textarea
                  placeholder={"200 food\n500 travel\n1200 shopping"}
                  value={quickText}
                  onChange={e => setQuickText(e.target.value)}
                  rows={5}
                  className="rounded-xl text-sm resize-none bg-muted/20 border-border/30"
                />
                <Button variant="outline" className="mt-3 h-10 rounded-xl text-xs font-bold gap-2 w-full" onClick={parseQuickEntry} disabled={!quickText.trim()}>
                  <FileText className="h-3.5 w-3.5" />
                  Parse & Add to Table
                </Button>
              </motion.div>
            </div>

            {/* Right: Manual Table */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, ease }}
              className="rounded-2xl bg-card border border-border/40 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <p className="text-sm font-bold">Entries</p>
                  {validRows.length > 0 && (
                    <Badge variant="secondary" className="text-[10px] px-1.5">{validRows.length}</Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold gap-1 rounded-lg" onClick={addRow}>
                  <Plus className="h-3 w-3" /> Add row
                </Button>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 px-1 pb-2 border-b border-border/30">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Amount</span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Category</span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Date</span>
                <span className="w-8" />
              </div>

              {/* Rows */}
              <div className="space-y-1.5 mt-2 max-h-[50vh] overflow-y-auto pr-1">
                <AnimatePresence>
                  {rows.map((row, idx) => (
                    <motion.div key={row.id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ ease }}
                      className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
                      <Input
                        type="number" step="0.01" placeholder="0"
                        value={row.amount} onChange={e => updateRow(row.id, { amount: e.target.value })}
                        className="h-9 rounded-lg text-sm bg-muted/20 border-border/30"
                      />
                      <Input
                        placeholder="Food"
                        value={row.category} onChange={e => updateRow(row.id, { category: e.target.value })}
                        className="h-9 rounded-lg text-sm bg-muted/20 border-border/30"
                      />
                      <Input
                        type="date"
                        value={row.date} onChange={e => updateRow(row.id, { date: e.target.value })}
                        className="h-9 rounded-lg text-sm bg-muted/20 border-border/30"
                      />
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg flex-shrink-0"
                        onClick={() => removeRow(row.id)} disabled={rows.length <= 1}>
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive transition-colors" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Note input for last selected */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground font-medium">Total</p>
                  <p className="text-lg font-bold">{formatAmount(total)}</p>
                </div>
                <p className="text-[10px] text-muted-foreground mb-3">
                  {validRows.length === 0 ? "No valid entries yet" : `${validRows.length} valid entries`}
                </p>
                <Button
                  className="w-full h-12 rounded-xl text-sm font-bold gap-2"
                  onClick={handleSubmit}
                  disabled={loading || validRows.length === 0}
                >
                  {loading ? (
                    <>Adding {validRows.length}...</>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Add All Transactions ({validRows.length})
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Empty state */}
          {rows.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <Sparkles className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-medium">No transactions added yet</p>
              <p className="text-xs text-muted-foreground mt-1">Start by adding multiple entries using Smart Import.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
