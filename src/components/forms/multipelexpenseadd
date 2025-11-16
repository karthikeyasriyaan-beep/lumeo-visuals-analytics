import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MultipleExpenseRow {
  name: string;
  amount: string;
  notes?: string;
  date: string;
  useCustomTitle?: boolean;
  customTitle?: string;
}

// Common selectable titles (copied from single add dialog)
const expenseTitles = [
  "Groceries",
  "Rent",
  "Utilities",
  "Fuel",
  "Subscription",
  "Dining Out",
  "Shopping",
  "Medical",
  "Education",
  "Travel",
  "Other",
];

interface AddMultipleExpensesDialogProps {
  onSuccess?: () => void;
}

export function AddMultipleExpensesDialog({ onSuccess }: AddMultipleExpensesDialogProps) {
  // start with 2 rows so the dialog enforces "two or more"
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<MultipleExpenseRow[]>(() => {
    const today = new Date().toISOString().split("T")[0];
    return [
      { name: "", amount: "", notes: "", date: today },
      { name: "", amount: "", notes: "", date: today },
    ];
  });
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const { formatAmount } = useCurrency();

  const updateRow = (index: number, patch: Partial<MultipleExpenseRow>) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    const today = new Date().toISOString().split("T")[0];
    setRows((prev) => [...prev, { name: "", amount: "", notes: "", date: today }]);
  };

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    if (rows.length < 2) {
      toast({ title: "Add at least two expenses", variant: "destructive" });
      return false;
    }
    for (const r of rows) {
      if (!r.name || !r.amount) {
        toast({ title: "Each expense needs a title and amount", variant: "destructive" });
        return false;
      }
      if (isNaN(Number(r.amount))) {
        toast({ title: "Amounts must be valid numbers", variant: "destructive" });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!validate()) return;

    setLoading(true);
    try {
      const inserts = rows.map((r) => ({
        user_id: user.id,
        name: r.name,
        category: r.name,
        amount: parseFloat(r.amount),
        notes: r.notes || null,
        date: r.date,
      }));

      const { error } = await supabase.from("expenses").insert(inserts);
      if (error) throw error;

      toast({
        title: "Expenses added",
        description: `Added ${rows.length} expenses successfully.`,
      });

      // reset
      const today = new Date().toISOString().split("T")[0];
      setRows([
        { name: "", amount: "", notes: "", date: today },
        { name: "", amount: "", notes: "", date: today },
      ]);
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error("Error adding multiple expenses:", err);
      toast({
        title: "Error adding expenses",
        description: "There was an error saving your expenses. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="outline">
          <Plus className="h-4 w-4" />
          Add Multiple Expenses
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Multiple Expenses</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 max-h-[50vh] overflow-auto pr-2">
            {rows.map((row, idx) => (
              <div key={idx} className="p-3 rounded-lg border bg-card/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Expense #{idx + 1}</div>
                  <div className="flex items-center gap-2">
                    {rows.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeRow(idx)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-2 md:col-span-1">
                    <Label>Title</Label>
                    {!row.useCustomTitle ? (
                      <Select
                        onValueChange={(value) => {
                          if (value === "custom") {
                            updateRow(idx, { useCustomTitle: true, name: "" });
                          } else {
                            updateRow(idx, { name: value, customTitle: "", useCustomTitle: false });
                          }
                        }}
                        value={row.name || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a title" />
                        </SelectTrigger>
                        <SelectContent>
                          {expenseTitles.map((title) => (
                            <SelectItem key={title} value={title}>
                              {title}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">+ Custom Title</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter custom title"
                          value={row.customTitle || ""}
                          onChange={(e) => updateRow(idx, { customTitle: e.target.value, name: e.target.value })}
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => updateRow(idx, { useCustomTitle: false, customTitle: "" })}
                        >
                          Back
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input type="number" step="0.01" value={row.amount} onChange={(e) => updateRow(idx, { amount: e.target.value })} placeholder="0.00" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" value={row.date} onChange={(e) => updateRow(idx, { date: e.target.value })} required />
                  </div>
                </div>

                <div className="space-y-2 mt-3">
                  <Label>Notes (optional)</Label>
                  <Textarea value={row.notes} onChange={(e) => updateRow(idx, { notes: e.target.value })} rows={2} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" onClick={addRow} className="gap-2">
              <Plus className="h-4 w-4" /> Add another
            </Button>
            <div className="text-sm text-muted-foreground">You must add at least two expenses</div>
          </div>

          {/* Running total */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-lg font-bold">{formatAmount(rows.reduce((s, r) => s + (Number(r.amount) || 0), 0))}</div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? `Adding ${rows.length}...` : `Add ${rows.length} Expenses`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
