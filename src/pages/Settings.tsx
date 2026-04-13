import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Upload, Trash2, AlertTriangle, User, Palette, Database,
  ShieldCheck, FileText, LogOut, ChevronRight, Download
} from "lucide-react";
import { CurrencySelector } from "@/components/currency-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ——— Reusable row ——— */
function SettingRow({
  icon: Icon,
  label,
  desc,
  children,
  danger = false,
}: {
  icon: any;
  label: string;
  desc?: string;
  children?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${danger ? "bg-destructive/10" : "bg-muted/50"}`}>
          <Icon className={`h-3.5 w-3.5 ${danger ? "text-destructive" : "text-muted-foreground"}`} />
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-medium ${danger ? "text-destructive" : ""}`}>{label}</p>
          {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
        </div>
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}

/* ——— Section wrapper ——— */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border/30 overflow-hidden">
      <div className="px-5 py-3 border-b border-border/20">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">{title}</p>
      </div>
      <div className="px-5 divide-y divide-border/20">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isClearing, setIsClearing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  /* ——— Clear all data ——— */
  const handleClearData = async () => {
    if (!user) return;
    setIsClearing(true);
    try {
      await Promise.all([
        supabase.from("income").delete().eq("user_id", user.id),
        supabase.from("expenses").delete().eq("user_id", user.id),
        supabase.from("loans").delete().eq("user_id", user.id),
        supabase.from("subscriptions").delete().eq("user_id", user.id),
        supabase.from("receipts").delete().eq("user_id", user.id),
        supabase.from("savings").delete().eq("user_id", user.id),
      ]);
      toast({ title: "All data cleared", description: "Your financial data has been permanently deleted." });
    } catch {
      toast({ title: "Error", description: "Could not clear data. Please try again.", variant: "destructive" });
    } finally {
      setIsClearing(false);
    }
  };

  /* ——— Export data as JSON ——— */
  const handleExport = async () => {
    if (!user) return;
    setIsExporting(true);
    try {
      const [income, expenses, loans, savings] = await Promise.all([
        supabase.from("income").select("*").eq("user_id", user.id),
        supabase.from("expenses").select("*").eq("user_id", user.id),
        supabase.from("loans").select("*").eq("user_id", user.id),
        supabase.from("savings").select("*").eq("user_id", user.id),
      ]);
      const exportData = {
        exported_at: new Date().toISOString(),
        income: income.data || [],
        expenses: expenses.data || [],
        loans: loans.data || [],
        savings: savings.data || [],
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `trackora-export-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Export successful", description: "Your data has been downloaded as JSON." });
    } catch {
      toast({ title: "Export failed", description: "Could not export data. Please try again.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  /* ——— Sign out ——— */
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })
    : "—";

  return (
    <>
      <NoIndexMeta />
      <div className="min-h-screen w-full bg-background">

        {/* ── Sticky topbar ── */}
        <div className="sticky top-14 sm:top-16 z-20 bg-background/95 backdrop-blur-md border-b border-border/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center">
            <h1 className="text-base font-bold tracking-tight">Settings</h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-5 pb-28">

          {/* ── 2-column wide layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* LEFT column */}
            <div className="space-y-4">

              {/* Account */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }}>
                <Section title="Account">
                  <SettingRow icon={User} label={user?.email || "No email"} desc={`Member since ${memberSince}`}>
                    <span className="text-[10px] bg-success/10 text-success font-semibold px-2 py-1 rounded-full">Active</span>
                  </SettingRow>
                  <SettingRow icon={ShieldCheck} label="Data Security" desc="Bank-level encryption, stored securely">
                    <span className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full">Protected</span>
                  </SettingRow>
                </Section>
              </motion.div>

              {/* Appearance */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, ease }}>
                <Section title="Appearance">
                  <SettingRow icon={Palette} label="Theme" desc="Switch between light and dark mode">
                    <ThemeToggle />
                  </SettingRow>
                  <SettingRow icon={Database} label="Currency" desc="Your preferred display currency">
                    <CurrencySelector />
                  </SettingRow>
                </Section>
              </motion.div>

              {/* Legal */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }}>
                <Section title="Legal">
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                    <SettingRow icon={FileText} label="Privacy Policy" desc="How we handle your data">
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                    </SettingRow>
                  </a>
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    <SettingRow icon={FileText} label="Terms of Service" desc="Usage terms and conditions">
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                    </SettingRow>
                  </a>
                </Section>
              </motion.div>
            </div>

            {/* RIGHT column */}
            <div className="space-y-4">

              {/* Data Management */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, ease }}>
                <Section title="Data Management">

                  {/* Export */}
                  <div
                    className="cursor-pointer hover:bg-muted/20 transition-colors rounded-lg -mx-1 px-1"
                    onClick={handleExport}
                  >
                    <SettingRow
                      icon={Download}
                      label="Export Data"
                      desc="Download all your data as JSON"
                    >
                      <Button size="sm" variant="outline" className="h-8 px-3 rounded-lg text-xs" disabled={isExporting}>
                        {isExporting ? "Exporting..." : "Export"}
                      </Button>
                    </SettingRow>
                  </div>

                  {/* Import */}
                  <div
                    className="cursor-pointer hover:bg-muted/20 transition-colors rounded-lg -mx-1 px-1"
                    onClick={() => toast({ title: "Coming soon", description: "Import will be available in the next update." })}
                  >
                    <SettingRow icon={Upload} label="Import Data" desc="Restore from a previous export">
                      <Button size="sm" variant="outline" className="h-8 px-3 rounded-lg text-xs" disabled>
                        Soon
                      </Button>
                    </SettingRow>
                  </div>

                  {/* Clear data */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="cursor-pointer hover:bg-destructive/5 transition-colors rounded-lg -mx-1 px-1">
                        <SettingRow
                          icon={Trash2}
                          label="Clear All Data"
                          desc="Permanently delete all your financial records"
                          danger
                        >
                          <Button size="sm" variant="outline"
                            className="h-8 px-3 rounded-lg text-xs text-destructive border-destructive/30 hover:bg-destructive/10">
                            Clear
                          </Button>
                        </SettingRow>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          Clear all data?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This permanently deletes all your income, expenses, loans, savings, subscriptions and receipts. This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleClearData}
                          disabled={isClearing}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isClearing ? "Clearing..." : "Yes, delete everything"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Section>
              </motion.div>

              {/* Sign out */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, ease }}>
                <Section title="Session">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="cursor-pointer hover:bg-destructive/5 transition-colors rounded-lg -mx-1 px-1">
                        <SettingRow icon={LogOut} label="Sign Out" desc="Log out of your Trackora account" danger />
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Sign out?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You'll need to sign in again to access your data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSignOut}>Sign Out</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Section>
              </motion.div>

              {/* App info */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                className="px-2 py-4 text-center space-y-1">
                <p className="text-xs font-semibold text-muted-foreground/40">Trackora</p>
                <p className="text-[10px] text-muted-foreground/30">Where trust meets money</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
