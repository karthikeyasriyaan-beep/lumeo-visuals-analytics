import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Minus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { addGuestExpense } from "@/lib/guest-storage";

interface AddExpenseDialogProps {
  onSuccess?: () => void;
}

const expenseCategories = [
  "Groceries", "Rent", "Utilities", "Fuel", "Subscription",
  "Dining Out", "Shopping", "Medical", "Education", "Travel",
  "Entertainment", "Transport", "Other",
];

export function AddExpenseDialog({ onSuccess }: AddExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  const { user, isGuest } = useAuth();
  const { toast } = useToast();

  const reset = () =>
    setFormData({ name: "", amount: "", category: "", notes: "", date: new Date().toISOString().split("T")[0] });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      if (isGuest) {
        addGuestExpense({
          name: formData.name,
          amount: parseFloat(formData.amount),
          category: formData.category || "Other",
          notes: formData.notes,
          date: formData.date,
          user_id: user.id,
        });
      } else {
        const { error } = await supabase.from("expenses").insert({
          user_id: user.id,
          name: formData.name,
          category: formData.category || "Other",
          amount: parseFloat(formData.amount),
          notes: formData.notes,
          date: formData.date,
        });
        if (error) throw error;
      }
      toast({ title: "Expense added", description: `${formData.name} added successfully.` });
      reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error adding expense:", error);
      toast({ title: "Error", description: "Failed to add expense. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5 h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm">
          <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Add Expense
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md border-border/50 bg-background p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-border/30">
          <DialogTitle className="text-base font-semibold">Add Expense</DialogTitle>
        </DialogHeader>

        {/* Form — no ScrollArea, let dialog handle overflow */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4 overflow-y-auto max-h-[70vh]">

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="exp-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Title</Label>
            <Input
              id="exp-name"
              placeholder="e.g., Grocery shopping"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 text-sm rounded-lg"
              required
            />
          </div>

          {/* Amount + Date side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="exp-amount" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount</Label>
              <Input
                id="exp-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="h-10 text-sm rounded-lg"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="exp-date" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</Label>
              <Input
                id="exp-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-10 text-sm rounded-lg"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</Label>
            <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
              <SelectTrigger className="h-10 text-sm rounded-lg">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-sm">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="exp-notes" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Notes <span className="normal-case tracking-normal">(optional)</span>
            </Label>
            <Textarea
              id="exp-notes"
              placeholder="Any extra details..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="resize-none text-sm rounded-lg"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 h-10 text-sm rounded-lg">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 h-10 text-sm rounded-lg">
              {loading ? "Adding..." : "Add Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
