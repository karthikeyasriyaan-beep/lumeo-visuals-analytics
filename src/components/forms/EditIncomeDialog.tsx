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
import { updateGuestIncome, deleteGuestIncome } from '@/lib/guest-storage';

const incomeCategories = [
  "Salary", "Freelance", "Business", "Investment", 
  "Rental", "Gift", "Bonus", "Refund", "Other"
];

export default function EditIncomeDialog({ income, open, onOpenChange, onSuccess }: any) {
  const { isGuest } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    notes: ''
  });

  useEffect(() => {
    if (income) {
      setFormData({
        source: income.source || '',
        amount: income.amount?.toString() || '',
        date: income.date || new Date().toISOString().split('T')[0],
        category: income.category || '',
        notes: income.notes || ''
      });
    }
  }, [income]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isGuest) {
        updateGuestIncome(income.id, {
          source: formData.source,
          amount: parseFloat(formData.amount),
          date: formData.date,
          category: formData.category,
          notes: formData.notes
        });
        toast.success('Income updated');
      } else {
        const { error } = await supabase
          .from('income')
          .update({
            source: formData.source,
            amount: parseFloat(formData.amount),
            date: formData.date,
            category: formData.category,
            notes: formData.notes
          })
          .eq('id', income.id);

        if (error) throw error;
        toast.success('Income updated');
      }
      
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update income');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this income?')) return;
    
    setLoading(true);
    try {
      if (isGuest) {
        deleteGuestIncome(income.id);
        toast.success('Income deleted');
      } else {
        const { error } = await supabase
          .from('income')
          .delete()
          .eq('id', income.id);

        if (error) throw error;
        toast.success('Income deleted');
      }
      
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete income');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-border/50 bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Income</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
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