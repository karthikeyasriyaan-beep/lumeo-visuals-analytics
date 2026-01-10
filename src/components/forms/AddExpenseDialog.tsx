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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { addGuestExpense } from "@/lib/guest-storage";

interface AddExpenseDialogProps {
  onSuccess?: () => void;
}

const expenseCategories = [
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
  "Entertainment",
  "Transport",
  "Other",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      if (isGuest) {
        // Save to local storage for guest users
        addGuestExpense({
          name: formData.name,
          amount: parseFloat(formData.amount),
          category: formData.category || "Other",
          notes: formData.notes,
          date: formData.date,
          user_id: user.id,
        });
      } else {
        // Save to Supabase for authenticated users
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

      toast({
        title: "Expense added",
        description: `${formData.name} has been added successfully.`,
      });

      setFormData({
        name: "",
        amount: "",
        category: "",
        notes: "",
        date: new Date().toISOString().split("T")[0],
      });
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error adding expense:", error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4">
          <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>Add Expense</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] border-border/50 bg-background/95 backdrop-blur-sm p-0">
        <DialogHeader className="p-4 sm:p-6 pb-0">
          <DialogTitle className="text-lg sm:text-xl font-semibold">Add Expense</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-80px)] px-4 sm:px-6 pb-4 sm:pb-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pt-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="name" className="text-xs sm:text-sm">Title</Label>
              <Input
                id="name"
                placeholder="e.g., Grocery shopping"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-10 sm:h-11 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="amount" className="text-xs sm:text-sm">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="h-10 sm:h-11 text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="date" className="text-xs sm:text-sm">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-10 sm:h-11 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label className="text-xs sm:text-sm">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-sm">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="notes" className="text-xs sm:text-sm">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="resize-none text-sm"
              />
            </div>

            <div className="flex gap-2 sm:gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 h-10 sm:h-11 text-sm"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 h-10 sm:h-11 text-sm">
                {loading ? "Adding..." : "Add Expense"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}