import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Upload, Sparkles, Trash2, ImageIcon, CheckCircle2, ArrowLeft,
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
  for (const [keyword, val] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(keyword)) return val;
  }
  return { category: text || "Other", icon: ArrowRightLeft };
}

interface ParsedEntry {
  id: string;
  amount: number;
  category: string;
  icon: typeof Utensils;
  note: string;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function SmartImport() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [quickText, setQuickText] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ——— Live parse from text ——— */
  const parsed: ParsedEntry[] = quickText
    .split("\n")
    .filter(l => l.trim())
    .map(line => {
      const trimmed = line.trim();
      const amountMatch = trimmed.match(/(\d+\.?\d*)/);
      const amount = amountMatch ? parseFloat(amountMatch[1]) : 0;
      const rest = trimmed.replace(amountMatch?.[0] || "", "").trim();
      const { category, icon } = detectCategory(rest);
      return { id: crypto.randomUUID(), amount, category, icon, note: rest };
    })
    .filter(e => e.amount > 0);

  const total = parsed.reduce((s, e) => s + e.amount, 0);

  /* ——— Screenshot ——— */
  const handleScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* ——— Submit ——— */
  const handleSubmit = async () => {
    if (!user || parsed.length === 0) return;
    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const inserts = parsed.map(e => ({
        user_id: user.id,
        name: e.category,
        category: e.category,
        amount: e.amount,
        date: today,
        notes: e.note || null,
      }));
      const { error } = await supabase.from("expenses").insert(inserts);
      if (error) throw error;
      toast.success(`${parsed.length} transactions added successfully`);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setQuickText("");
      setScreenshotPreview(null);
      navigate("/transactions");
    } catch {
      toast.error("Failed to add transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-28 space-y-4">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }}>
            <div className="flex items-center gap-3 mb-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl flex-shrink-0" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold">Smart Import</h1>
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0.5 font-semibold">⭐ Smart</Badge>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                  Quickly add multiple transactions with minimal effort.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Screenshot Upload — compact */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, ease }}
            className="rounded-2xl bg-card border border-border/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="h-4 w-4 text-primary" />
              <p className="text-xs font-bold">Upload Screenshot</p>
            </div>
            <p className="text-[10px] text-muted-foreground mb-2">
              Upload a screenshot of your transactions for quick reference while typing.
            </p>
            {screenshotPreview ? (
              <div className="relative">
                <img src={screenshotPreview} alt="Screenshot" className="rounded-xl max-h-36 w-full object-cover border border-border/30" />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 rounded-lg"
                  onClick={() => setScreenshotPreview(null)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-1.5 py-5 rounded-xl border-2 border-dashed border-border/40 hover:border-primary/30 transition-colors cursor-pointer bg-muted/10">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-medium">Click to upload</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleScreenshot} />
              </label>
            )}
          </motion.div>

          {/* Quick Entry — main feature */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }}
            className="rounded-2xl bg-card border border-border/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-xs font-bold">Quick Entry</p>
            </div>
            <p className="text-[10px] text-muted-foreground mb-2">
              Type one entry per line: <span className="font-mono text-foreground">amount category</span>
            </p>
            <Textarea
              placeholder={"200 food\n500 travel\n1200 shopping"}
              value={quickText}
              onChange={e => setQuickText(e.target.value)}
              rows={5}
              className="rounded-xl text-sm resize-none bg-muted/20 border-border/30 min-h-[120px]"
              autoFocus
            />
          </motion.div>

          {/* Live Preview — simple list */}
          <AnimatePresence>
            {parsed.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ ease }}
                className="rounded-2xl bg-card border border-border/40 p-4 overflow-hidden"
              >
                <p className="text-xs font-bold mb-3">Preview ({parsed.length})</p>
                <div className="space-y-2">
                  {parsed.map((entry, i) => {
                    const Icon = entry.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03, ease }}
                        className="flex items-center justify-between py-1.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{entry.category}</span>
                        </div>
                        <span className="text-sm font-bold">{formatAmount(entry.amount)}</span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-base font-bold">{formatAmount(total)}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, ease }}
            className="flex gap-3">
            <Button variant="outline" className="flex-1 h-11 rounded-xl text-xs font-semibold" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 rounded-xl text-xs font-bold gap-2"
              onClick={handleSubmit}
              disabled={loading || parsed.length === 0}
            >
              {loading ? (
                <>Adding {parsed.length}...</>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Add Transactions{parsed.length > 0 ? ` (${parsed.length})` : ""}
                </>
              )}
            </Button>
          </motion.div>

          {/* Empty state */}
          {!quickText.trim() && !screenshotPreview && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-center py-8">
              <Sparkles className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Start typing above to add transactions quickly.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
