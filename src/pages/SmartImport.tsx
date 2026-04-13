import { useState } from "react";
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
  Utensils, Car, Zap, Home as HomeIcon, ShoppingBag, Briefcase,
  Gift, Heart, Plane, Smartphone, ArrowRightLeft
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

  /* ——— Live parse ——— */
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

  const handleScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

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
      toast.success(`${parsed.length} transactions added`);
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
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-5 pb-28">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ease }}
            className="flex items-center gap-3 mb-6"
          >
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl flex-shrink-0" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold">Smart Import</h1>
                <Badge variant="secondary" className="text-[9px] px-1.5 py-0.5 font-semibold">⭐ Smart</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add multiple transactions at once with minimal effort.
              </p>
            </div>
          </motion.div>

          {/* ── Main Grid: left col = inputs, right col = preview ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* LEFT — Screenshot + Quick Entry */}
            <div className="space-y-4">

              {/* Screenshot Upload */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, ease }}
                className="rounded-2xl bg-card border border-border/30 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">Upload Screenshot</p>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Upload a screenshot of your transactions for quick reference while typing.
                </p>
                {screenshotPreview ? (
                  <div className="relative">
                    <img
                      src={screenshotPreview} alt="Screenshot"
                      className="rounded-xl w-full object-cover border border-border/30 max-h-52"
                    />
                    <Button
                      variant="destructive" size="icon"
                      className="absolute top-2 right-2 h-7 w-7 rounded-lg"
                      onClick={() => setScreenshotPreview(null)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed border-border/30 hover:border-primary/30 hover:bg-muted/10 transition-all cursor-pointer">
                    <Upload className="h-5 w-5 text-muted-foreground/50" />
                    <span className="text-xs text-muted-foreground">Click to upload image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleScreenshot} />
                  </label>
                )}
              </motion.div>

              {/* Quick Entry */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, ease }}
                className="rounded-2xl bg-card border border-border/30 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">Quick Entry</p>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  One entry per line —{" "}
                  <span className="font-mono text-foreground/80 bg-muted/50 px-1 py-0.5 rounded text-[11px]">amount category</span>
                </p>
                <Textarea
                  placeholder={"200 food\n500 travel\n1200 shopping\n3000 salary"}
                  value={quickText}
                  onChange={e => setQuickText(e.target.value)}
                  rows={8}
                  className="rounded-xl text-sm resize-none bg-muted/10 border-border/30 font-mono leading-relaxed"
                  autoFocus
                />
              </motion.div>
            </div>

            {/* RIGHT — Live Preview */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {parsed.length > 0 ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ ease }}
                    className="rounded-2xl bg-card border border-border/30 p-5 h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-semibold">Preview</p>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                        {parsed.length} {parsed.length === 1 ? "entry" : "entries"}
                      </span>
                    </div>

                    {/* Entry list */}
                    <div className="space-y-1 mb-4">
                      {parsed.map((entry, i) => {
                        const Icon = entry.icon;
                        return (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03, ease }}
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                                <Icon className="h-3.5 w-3.5 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{entry.category}</p>
                                {entry.note && entry.note !== entry.category && (
                                  <p className="text-[11px] text-muted-foreground truncate">{entry.note}</p>
                                )}
                              </div>
                            </div>
                            <p className="text-sm font-semibold tabular-nums flex-shrink-0 ml-2">
                              {formatAmount(entry.amount)}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Total */}
                    <div className="border-t border-border/20 pt-4 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground font-medium">Total</p>
                      <p className="text-lg font-bold">{formatAmount(total)}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="rounded-2xl border border-dashed border-border/20 p-5 flex flex-col items-center justify-center min-h-[300px] gap-3"
                  >
                    <Sparkles className="h-8 w-8 text-muted-foreground/15" />
                    <p className="text-sm text-muted-foreground/50 text-center">
                      Your preview will appear here as you type
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions — below preview on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, ease }}
                className="flex gap-3"
              >
                <Button
                  variant="outline"
                  className="flex-1 h-11 rounded-xl text-sm"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-11 rounded-xl text-sm font-semibold gap-2"
                  onClick={handleSubmit}
                  disabled={loading || parsed.length === 0}
                >
                  {loading ? (
                    `Adding ${parsed.length}...`
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      {parsed.length > 0 ? `Add ${parsed.length} Transaction${parsed.length > 1 ? "s" : ""}` : "Add Transactions"}
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
