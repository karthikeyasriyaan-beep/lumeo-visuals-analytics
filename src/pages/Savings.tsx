import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Wallet, Target, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { AddSavingsDialog } from "@/components/forms/AddSavingsDialog";
import EditSavingsDialog from "@/components/forms/EditSavingsDialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const Savings = () => {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const [selectedSaving, setSelectedSaving] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: savings = [], refetch } = useQuery({
    queryKey: ["savings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("savings").select("*").eq("user_id", user?.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const totalSavings = savings.reduce((sum, s) => sum + Number(s.current_amount || 0), 0);
  const totalGoals = savings.reduce((sum, s) => sum + Number(s.target_amount || 0), 0);
  const avgProgress = savings.length > 0
    ? savings.reduce((sum, s) => sum + (Number(s.current_amount) / Number(s.target_amount)) * 100, 0) / savings.length
    : 0;

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("savings").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Goal deleted");
    refetch();
  };

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-6 pb-28 space-y-6">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Savings Goals</h1>
              <p className="text-xs text-muted-foreground mt-1">
                {savings.length > 0 ? `${savings.length} goal${savings.length > 1 ? "s" : ""} in progress` : "Start your journey to financial freedom"}
              </p>
            </div>
            <AddSavingsDialog onSuccess={refetch} />
          </motion.div>

          {/* Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, ease }}
              className="px-5 py-5 rounded-2xl bg-card border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-primary" />
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Total Saved</p>
              </div>
              <p className="text-xl font-bold">{formatAmount(totalSavings)}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }}
              className="px-5 py-5 rounded-2xl bg-card border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Total Goals</p>
              </div>
              <p className="text-xl font-bold">{formatAmount(totalGoals)}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, ease }}
              className="px-5 py-5 rounded-2xl bg-card border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Avg Progress</p>
              </div>
              <p className="text-xl font-bold text-success">{avgProgress.toFixed(1)}%</p>
            </motion.div>
          </div>

          {/* Savings List - Wide expandable cards */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, ease }}
            className="rounded-2xl bg-card border border-border/40 overflow-hidden">
            <div className="px-5 pt-5 pb-3">
              <p className="text-sm font-bold">Your Savings Goals</p>
            </div>

            {savings.length === 0 ? (
              <div className="text-center py-16 px-5">
                <Wallet className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-medium">Your savings journey starts here</p>
                <p className="text-xs text-muted-foreground mt-1">Set your first goal and watch your wealth grow</p>
              </div>
            ) : (
              <div className="px-3 pb-3 space-y-2">
                {savings.map((saving, idx) => {
                  const progress = Math.min((Number(saving.current_amount) / Number(saving.target_amount)) * 100, 100);
                  const isExpanded = expandedId === saving.id;
                  return (
                    <motion.div key={saving.id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.03, ease }}
                      className="rounded-xl border border-border/30 bg-muted/10 hover:bg-muted/20 transition-all cursor-pointer overflow-hidden"
                      onClick={() => setExpandedId(isExpanded ? null : saving.id)}>

                      <div className="flex items-center gap-4 px-5 py-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${progress >= 100 ? "bg-success/10" : "bg-primary/10"}`}>
                          <Target className={`h-4 w-4 ${progress >= 100 ? "text-success" : "text-primary"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold truncate">{saving.name}</p>
                            {saving.category && <Badge variant="outline" className="text-[9px] px-1.5 py-0">{saving.category}</Badge>}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={progress} className="h-1.5 flex-1" />
                            <span className="text-[10px] text-muted-foreground font-medium flex-shrink-0">{progress.toFixed(0)}%</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold">{formatAmount(Number(saving.current_amount))}</p>
                          <p className="text-[10px] text-muted-foreground">of {formatAmount(Number(saving.target_amount))}</p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease }}
                            className="overflow-hidden">
                            <div className="px-5 pb-4 pt-1 border-t border-border/20 space-y-3" onClick={e => e.stopPropagation()}>
                              {saving.notes && <p className="text-xs text-muted-foreground">{saving.notes}</p>}
                              {saving.deadline && (
                                <p className="text-xs text-muted-foreground">
                                  Deadline: {new Date(saving.deadline).toLocaleDateString()}
                                </p>
                              )}
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold gap-1.5 flex-1"
                                  onClick={() => setSelectedSaving(saving)}>
                                  <Pencil className="h-3 w-3" /> Edit
                                </Button>
                                <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold gap-1.5 text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDelete(saving.id)}>
                                  <Trash2 className="h-3 w-3" /> Delete
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {selectedSaving && (
        <EditSavingsDialog
          saving={selectedSaving}
          open={!!selectedSaving}
          onOpenChange={(open) => !open && setSelectedSaving(null)}
          onSuccess={() => { refetch(); setSelectedSaving(null); }}
        />
      )}
    </>
  );
};

export default Savings;
