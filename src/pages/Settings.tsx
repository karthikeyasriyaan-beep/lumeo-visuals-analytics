import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Upload, Trash2, AlertTriangle, User, Palette, Database,
  ShieldCheck, FileText, LogOut, ChevronRight, Download, CheckCircle2
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
  icon: Icon, label, desc, children, danger = false,
}: {
  icon: any; label: string; desc?: string; children?: React.ReactNode; danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${danger ? "bg-destructive/10" : "bg-muted/50"}`}>
          <Icon className={`h-3.5 w-3.5 ${danger ? "text-destructive" : "text-muted-foreground"}`} />
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-medium leading-tight ${danger ? "text-destructive" : ""}`}>{label}</p>
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

/* ——— Import result type ——— */
interface ImportResult {
  income: number; expenses: number; loans: number; savings: number; errors: number;
}

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isClearing, setIsClearing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  /* ——— Export ——— */
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
        version: "1.0",
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
      toast({ title: "Export successful", description: "Your data has been downloaded." });
    } catch {
      toast({ title: "Export failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  /* ——— Import ——— */
  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const result: ImportResult = { income: 0, expenses: 0, loans: 0, savings: 0, errors: 0 };

      /* ——— Helper: strip DB-only fields and re-assign user_id ——— */
      const clean = (rows: any[], keep: string[]) =>
        (rows || []).map((row) => {
          const obj: any = { user_id: user.id };
          keep.forEach((k) => { if (row[k] !== undefined) obj[k] = row[k]; });
          return obj;
        });

      /* ——— Income ——— */
      if (Array.isArray(data.income) && data.income.length > 0) {
        const rows = clean(data.income, ["source", "amount", "category", "notes", "date"]);
        const { error } = await supabase.from("income").insert(rows);
        if (error) result.errors++;
        else result.income = rows.length;
      }

      /* ——— Expenses ——— */
      if (Array.isArray(data.expenses) && data.expenses.length > 0) {
        const rows = clean(data.expenses, ["name", "amount", "category", "notes", "date"]);
        const { error } = await supabase.from("expenses").insert(rows);
        if (error) result.errors++;
        else result.expenses = rows.length;
      }

      /* ——— Loans ——— */
      if (Array.isArray(data.loans) && data.loans.length > 0) {
        const rows = clean(data.loans, [
          "name", "initial_amount", "current_balance", "interest_rate",
          "monthly_payment", "start_date", "end_date", "status", "notes"
        ]);
        const { error } = await supabase.from("loans").insert(rows);
        if (error) result.errors++;
        else result.loans = rows.length;
      }

      /* ——— Savings ——— */
      if (Array.isArray(data.savings) && data.savings.length > 0) {
        const rows = clean(data.savings, [
          "name", "target_amount", "current_amount", "target_date", "notes"
        ]);
        const { error } = await supabase.from("savings").insert(rows);
        if (error) result.errors++;
        else result.savings = rows.length;
      }

      setImportResult(result);

      if (result.errors === 0) {
        toast({
          title: "Import successful!",
          description: `${result.income + result.expenses + result.loans + result.savings} records imported.`,
        });
      } else {
        toast({
          title: "Partial import",
          description: `Some records could not be imported. Check the summary below.`,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Invalid file",
        description: "Please upload a valid Trackora JSON export file.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      // Reset input so same file can be re-imported if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
      setImportResult(null);
      toast({ title: "All data cleared", description: "Your financial data has been permanently deleted." });
    } catch {
      toast({ title: "Error", description: "Could not clear data. Please try again.", variant: "destructive" });
    } finally {
      setIsClearing(false);
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* ── LEFT column ── */}
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
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, ease }}>
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

            {/* ── RIGHT column ── */}
            <div className="space-y-4">

              {/* Data Management */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, ease }}>
                <Section title="Data Management">

                  {/* Export */}
                  <SettingRow icon={Download} label="Export Data" desc="Download all your data as JSON">
                    <Button size="sm" variant="outline" className="h-8 px-3 rounded-lg text-xs"
                      onClick={handleExport} disabled={isExporting}>
                      {isExporting ? "Exporting..." : "Export"}
                    </Button>
                  </SettingRow>

                  {/* Import */}
                  <SettingRow icon={Upload} label="Import Data" desc="Restore from a Trackora JSON export">
                    <Button size="sm" variant="outline" className="h-8 px-3 rounded-lg text-xs"
                      onClick={() => fileInputRef.current?.click()} disabled={isImporting}>
                      {isImporting ? "Importing..." : "Import"}
                    </Button>
                  </SettingRow>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImportFile}
                  />

                  {/* Clear */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="cursor-pointer">
                        <SettingRow icon={Trash2} label="Clear All Data"
                          desc="Permanently delete all financial records" danger>
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
                          <AlertTriangle className="h-4 w-4 text-destructive" /> Clear all data?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This permanently deletes all your income, expenses, loans, savings, subscriptions and receipts. This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearData} disabled={isClearing}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          {isClearing ? "Clearing..." : "Yes, delete everything"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Section>
              </motion.div>

              {/* Import result summary */}
              {importResult && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }}
                  className="rounded-2xl bg-card border border-border/30 overflow-hidden">
                  <div className="px-5 py-3 border-b border-border/20 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Import Summary</p>
                  </div>
                  <div className="px-5 py-4 grid grid-cols-2 gap-3">
                    {[
                      { label: "Income", count: importResult.income },
                      { label: "Expenses", count: importResult.expenses },
                      { label: "Loans", count: importResult.loans },
                      { label: "Savings", count: importResult.savings },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-muted/30 px-3 py-2.5">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{item.label}</p>
                        <p className="text-lg font-bold mt-0.5">{item.count}</p>
                        <p className="text-[10px] text-muted-foreground">records</p>
                      </div>
                    ))}
                  </div>
                  {importResult.errors > 0 && (
                    <div className="px-5 pb-4">
                      <p className="text-xs text-destructive">{importResult.errors} table(s) failed to import.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Session */}
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
