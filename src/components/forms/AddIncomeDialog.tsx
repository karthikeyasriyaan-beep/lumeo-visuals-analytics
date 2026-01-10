import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { addGuestIncome } from "@/lib/guest-storage";

interface AddIncomeDialogProps {
  onSuccess?: () => void;
}

const incomeCategories = [
  "Salary",
  "Freelance",
  "Business",
  "Investment",
  "Rental",
  "Gift",
  "Bonus",
  "Refund",
  "Other"
];

export function AddIncomeDialog({ onSuccess }: AddIncomeDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    category: "",
    notes: "",
    date: new Date().toISOString().split('T')[0]
  });
  
  const { user, isGuest } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      if (isGuest) {
        // Save to local storage for guest users
        addGuestIncome({
          source: formData.source,
          amount: parseFloat(formData.amount),
          category: formData.category || "Other",
          notes: formData.notes,
          date: formData.date,
          user_id: user.id,
        });
      } else {
        // Save to Supabase for authenticated users
        const { error } = await supabase
          .from('income')
          .insert({
            user_id: user.id,
            source: formData.source,
            amount: parseFloat(formData.amount),
            category: formData.category || "Other",
            notes: formData.notes,
            date: formData.date
          });

        if (error) throw error;
      }

      toast({
        title: "Income added",
        description: `${formData.source} has been added successfully.`,
      });

      setFormData({
        source: "",
        amount: "",
        category: "",
        notes: "",
        date: new Date().toISOString().split('T')[0]
      });
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error adding income:', error);
      toast({
        title: "Error",
        description: "Failed to add income. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border-success/30 hover:border-success/50 hover:bg-success/5">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Income</span>
          <span className="sm:hidden">Income</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-border/50 bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Income</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              placeholder="e.g., Monthly Salary"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="h-11"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {incomeCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 h-11">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 h-11">
              {loading ? "Adding..." : "Add Income"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}