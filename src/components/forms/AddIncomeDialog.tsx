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
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { addGuestIncome } from "@/lib/guest-storage";

interface AddIncomeDialogProps {
  onSuccess?: () => void;
}

const incomeCategories = [
  "Salary", "Freelance", "Business", "Investment",
  "Rental", "Gift", "Bonus", "Refund", "Other",
];

export function AddIncomeDialog({ onSuccess }: AddIncomeDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    category: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  const { user, isGuest } = useAuth();
  const { toast } = useToast();

  const reset = () =>
    setFormData({ source: "", amount: "", category: "", notes: "", date: new Date().toISOString().split("T")[0] });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      if (isGuest) {
        addGuestIncome({
          source: formData.source,
          amount: parseFloat(formData.amount),
          category: formData.category || "Other",
          notes: formData.notes,
          date: formData.date,
          user_id: user.id,
        });
      } else {
        const { error } = await supabase.from("income").insert({
          user_id: user.id,
          source: formData.source,
          amount: parseFloat(formData.amount),
          category: formData.category || "Other",
          notes: formData.notes,
          date: formData.date,
        });
        if (error) throw error;
      }
      toast({ title: "Income added", description: `${formData.source} added successfully.` });
      reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error adding income:", error);
      toast({ title: "Error", description: "Failed to add income. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"
          className="gap-1.5 h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm border-success/30 hover:border-success/50 hover:bg-success/5">
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Add Income
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md border-border/50 bg-background p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-border/30">
          <DialogTitle className="text-base font-semibold">Add Income</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4 overflow-y-auto max-h-[70vh]">

          {/* Source */}
          <div className="space-y-1.5">
            <Label htmlFor="inc-source" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Source</Label>
            <Input
              id="inc-source"
              placeholder="e.g., Monthly Salary"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="h-10 text-sm rounded-lg"
              required
            />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="inc-amount" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount</Label>
              <Input
                id="inc-amount"
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
              <Label htmlFor="inc-date" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</Label>
              <Input
                id="inc-date"
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
                {incomeCategories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-sm">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="inc-notes" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Notes <span className="normal-case tracking-normal">(optional)</span>
            </Label>
            <Textarea
              id="inc-notes"
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
              {loading ? "Adding..." : "Add Income"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
