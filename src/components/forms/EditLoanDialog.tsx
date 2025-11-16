import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
export default function EditLoanDialog({
  loan,
  open,
  onOpenChange,
  onSuccess
}: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: loan?.name || '',
    initial_amount: loan?.initial_amount || '',
    current_balance: loan?.current_balance || '',
    interest_rate: loan?.interest_rate || '',
    monthly_payment: loan?.monthly_payment || '',
    start_date: loan?.start_date || new Date().toISOString().split('T')[0],
    notes: loan?.notes || ''
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        error
      } = await supabase.from('loans').update({
        name: formData.name,
        initial_amount: parseFloat(formData.initial_amount),
        current_balance: parseFloat(formData.current_balance),
        interest_rate: formData.interest_rate ? parseFloat(formData.interest_rate) : null,
        monthly_payment: formData.monthly_payment ? parseFloat(formData.monthly_payment) : null,
        start_date: formData.start_date,
        notes: formData.notes
      }).eq('id', loan.id);
      if (error) throw error;
      toast.success('Loan updated successfully');
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update loan');
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this loan?')) return;
    setLoading(true);
    try {
      const {
        error
      } = await supabase.from('loans').delete().eq('id', loan.id);
      if (error) throw error;
      toast.success('Loan deleted successfully');
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete loan');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Edit Loan</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] px-6">
          <form onSubmit={handleSubmit} className="space-y-4 pb-6">
            <div className="space-y-2">
              <Label htmlFor="name">Loan Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initial_amount">Initial Amount</Label>
              <Input
                id="initial_amount"
                type="number"
                step="0.01"
                value={formData.initial_amount}
                onChange={(e) => setFormData({ ...formData, initial_amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current_balance">Current Balance</Label>
              <Input
                id="current_balance"
                type="number"
                step="0.01"
                value={formData.current_balance}
                onChange={(e) => setFormData({ ...formData, current_balance: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interest_rate">Interest Rate (%)</Label>
                <Input
                  id="interest_rate"
                  type="number"
                  step="0.01"
                  value={formData.interest_rate}
                  onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly_payment">Monthly Payment</Label>
                <Input
                  id="monthly_payment"
                  type="number"
                  step="0.01"
                  value={formData.monthly_payment}
                  onChange={(e) => setFormData({ ...formData, monthly_payment: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex justify-between gap-2 pt-4">
              <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}