import { useState } from "react";
import { Repeat, Calendar, AlertTriangle, Pencil, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/components/currency-selector";
import { AddSubscriptionDialog } from "@/components/forms/AddSubscriptionDialog";
import EditSubscriptionDialog from "@/components/forms/EditSubscriptionDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Subscriptions() {
  const { formatAmount } = useCurrency();
  const { user } = useAuth();
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: subscriptions = [], refetch } = useQuery({
    queryKey: ['subscriptions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      return data || [];
    },
    enabled: !!user
  });

  const activeSubscriptions = subscriptions.filter(sub => sub.status === "active");

  const totalMonthly = activeSubscriptions.reduce((sum, sub) => {
    const amount = Number(sub.amount);
    return sum + (sub.billing_cycle === "Monthly" ? amount :
                  sub.billing_cycle === "Yearly" ? amount / 12 :
                  sub.billing_cycle === "Quarterly" ? amount / 3 :
                  sub.billing_cycle === "Weekly" ? amount * 4 : amount);
  }, 0);

  const totalYearly = totalMonthly * 12;

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("subscriptions").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Subscription deleted");
    refetch();
  };

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-8 pt-4 sm:pt-6 pb-28 space-y-4 sm:space-y-5">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg sm:text-2xl font-bold">Subscriptions</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Manage your recurring payments</p>
            </div>
            <AddSubscriptionDialog onSuccess={() => refetch()} />
          </motion.div>

          {/* Summary - horizontal scroll on mobile */}
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, ease }}
              className="min-w-[140px] flex-shrink-0 sm:min-w-0 px-4 py-3.5 rounded-2xl bg-card border border-border/40">
              <div className="flex items-center gap-2 mb-1.5">
                <Repeat className="h-3.5 w-3.5 text-primary" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Monthly</p>
              </div>
              <p className="text-base sm:text-xl font-bold text-destructive">-{formatAmount(totalMonthly)}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }}
              className="min-w-[140px] flex-shrink-0 sm:min-w-0 px-4 py-3.5 rounded-2xl bg-card border border-border/40">
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar className="h-3.5 w-3.5 text-warning" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Yearly</p>
              </div>
              <p className="text-base sm:text-xl font-bold text-destructive">-{formatAmount(totalYearly)}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, ease }}
              className="min-w-[140px] flex-shrink-0 sm:min-w-0 px-4 py-3.5 rounded-2xl bg-card border border-border/40">
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Active</p>
              </div>
              <p className="text-base sm:text-xl font-bold">{activeSubscriptions.length}</p>
            </motion.div>
          </div>

          {/* Subscriptions List - expandable cards */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, ease }}
            className="rounded-2xl bg-card border border-border/40 overflow-hidden">
            <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-2 sm:pb-3">
              <p className="text-xs sm:text-sm font-bold">Your Subscriptions</p>
            </div>

            {subscriptions.length === 0 ? (
              <div className="text-center py-12 sm:py-16 px-4">
                <Repeat className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">No subscriptions yet</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Add your first subscription to track recurring expenses</p>
              </div>
            ) : (
              <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3 space-y-2">
                {subscriptions.map((sub, idx) => {
                  const isExpanded = expandedId === sub.id;
                  return (
                    <motion.div key={sub.id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.03, ease }}
                      className="rounded-xl border border-border/30 bg-muted/10 hover:bg-muted/20 transition-all cursor-pointer overflow-hidden"
                      onClick={() => setExpandedId(isExpanded ? null : sub.id)}>

                      <div className="flex items-center gap-3 px-3.5 sm:px-5 py-3.5 sm:py-4">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Repeat className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold truncate">{sub.name}</p>
                            <Badge variant={sub.status === 'active' ? 'default' : 'destructive'} className="text-[9px] px-1.5 py-0">{sub.status}</Badge>
                          </div>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            {sub.billing_cycle} · Next: {sub.next_billing_date ? new Date(sub.next_billing_date).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : 'Not set'}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-destructive">-{formatAmount(Number(sub.amount))}</p>
                        </div>
                        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease }}
                            className="overflow-hidden">
                            <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-4 pt-1 border-t border-border/20 space-y-2.5" onClick={e => e.stopPropagation()}>
                              {sub.notes && <p className="text-[10px] sm:text-xs text-muted-foreground">{sub.notes}</p>}
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold gap-1.5 flex-1"
                                  onClick={() => setSelectedSubscription(sub)}>
                                  <Pencil className="h-3 w-3" /> Edit
                                </Button>
                                <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold gap-1.5 text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDelete(sub.id)}>
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

          {/* Upcoming Renewals */}
          {activeSubscriptions.filter(s => s.next_billing_date).length > 0 && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, ease }}
              className="rounded-2xl bg-card border border-border/40 overflow-hidden">
              <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-2 sm:pb-3">
                <p className="text-xs sm:text-sm font-bold">Upcoming Renewals</p>
              </div>
              <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3 space-y-1.5">
                {activeSubscriptions
                  .filter(s => s.next_billing_date)
                  .sort((a, b) => new Date(a.next_billing_date).getTime() - new Date(b.next_billing_date).getTime())
                  .slice(0, 5)
                  .map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-muted/10">
                      <div>
                        <p className="text-xs sm:text-sm font-medium">{sub.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(sub.next_billing_date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-destructive">
                        -{formatAmount(Number(sub.amount))}
                      </span>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {selectedSubscription && (
        <EditSubscriptionDialog
          subscription={selectedSubscription}
          open={!!selectedSubscription}
          onOpenChange={(open) => !open && setSelectedSubscription(null)}
          onSuccess={() => { refetch(); setSelectedSubscription(null); }}
        />
      )}
    </>
  );
}
