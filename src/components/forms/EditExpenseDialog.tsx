import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { updateGuestExpense, deleteGuestExpense } from '@/lib/guest-storage';

const expenseCategories = [
  "Groceries", "Rent", "Utilities", "Fuel", "Subscription",
  "Dining Out", "Shopping", "Medical", "Education", "Travel",
  "Entertainment", "Transport", "Other"
];

export default function EditExpenseDialog({ expense, open, onOpenChange, onSuccess }: any) {
  const { isGuest } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    notes: ''
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        name: expense.name || '',
        amount: expense.amount?.toString() || '',
        date: expense.date || new Date().toISOString().split('T')[0],
        category: expense.category || '',
        notes: expense.notes || ''
      });
    }
  }, [expense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isGuest) {
        updateGuestExpense(expense.id, {
          name: formData.name,
          amount: parseFloat(formData.amount),
          date: formData.date,
          category: formData.category,
          notes: formData.notes
        });
        toast.success('Expense updated');
      } else {
        const { error } = await supabase
          .from('expenses')
          .update({
            name: formData.name,
            amount: parseFloat(formData.amount),
            date: formData.date,
            category: formData.category,
            notes: formData.notes
          })
          .eq('id', expense.id);

        if (error) throw error;
        toast.success('Expense updated');
      }
      
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update expense');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this expense?')) return;
    
    setLoading(true);
    try {
      if (isGuest) {
        deleteGuestExpense(expense.id);
        toast.success('Expense deleted');
      } else {
        const { error } = await supabase
          .from('expenses')
          .delete()
          .eq('id', expense.id);

        if (error) throw error;
        toast.success('Expense deleted');
      }
      
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-border/50 bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Title</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading} className="flex-1 h-11">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading} className="h-11 px-4">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}