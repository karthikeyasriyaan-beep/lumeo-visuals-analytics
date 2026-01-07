import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddLoanDialogProps {
  onSuccess?: () => void;
}

const loanStatuses = ["active", "paid_off", "defaulted"];

export function AddLoanDialog({ onSuccess }: AddLoanDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    initial_amount: "",
    interest_rate: "",
    monthly_payment: "",
    start_date: new Date().toISOString().split('T')[0],
    status: "active",
    notes: ""
  });
  
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a loan name.",
        variant: "destructive",
      });
      return;
    }

    const initialAmount = parseFloat(formData.initial_amount) || 0;
    const interestRate = parseFloat(formData.interest_rate) || 0;
    const monthlyPayment = parseFloat(formData.monthly_payment) || 0;

    if (initialAmount <= 0) {
      toast({
        title: "Validation Error",
        description: "Loan amount must be greater than 0.",
        variant: "destructive",
      });
      return;
    }

    if (monthlyPayment <= 0) {
      toast({
        title: "Validation Error",
        description: "Monthly payment must be greater than 0.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Calculate end date based on loan amortization
      let endDate = null;
      if (interestRate > 0 && monthlyPayment > 0) {
        const monthlyRate = interestRate / 12 / 100;
        const principalTimesRate = initialAmount * monthlyRate;
        
        // Only calculate if monthly payment is greater than interest
        if (monthlyPayment > principalTimesRate) {
          const numerator = Math.log(monthlyPayment / (monthlyPayment - principalTimesRate));
          const denominator = Math.log(1 + monthlyRate);
          const months = Math.ceil(numerator / denominator);
          
          if (months > 0 && months < 1200) { // Max 100 years
            const startDate = new Date(formData.start_date);
            const calculatedEndDate = new Date(startDate);
            calculatedEndDate.setMonth(calculatedEndDate.getMonth() + months);
            endDate = calculatedEndDate.toISOString().split('T')[0];
          }
        }
      } else if (monthlyPayment > 0) {
        // Simple calculation without interest
        const months = Math.ceil(initialAmount / monthlyPayment);
        if (months > 0 && months < 1200) {
          const startDate = new Date(formData.start_date);
          const calculatedEndDate = new Date(startDate);
          calculatedEndDate.setMonth(calculatedEndDate.getMonth() + months);
          endDate = calculatedEndDate.toISOString().split('T')[0];
        }
      }

      const { error } = await supabase
        .from('loans')
        .insert({
          user_id: user.id,
          name: formData.name.trim(),
          initial_amount: initialAmount,
          current_balance: initialAmount,
          interest_rate: interestRate,
          monthly_payment: monthlyPayment,
          start_date: formData.start_date,
          end_date: endDate,
          status: formData.status,
          notes: formData.notes.trim() || null
        });

      if (error) throw error;

      toast({
        title: "Loan added successfully",
        description: `${formData.name} has been added to your loans.`,
      });

      setFormData({
        name: "",
        initial_amount: "",
        interest_rate: "",
        monthly_payment: "",
        start_date: new Date().toISOString().split('T')[0],
        status: "active",
        notes: ""
      });
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error adding loan:', error);
      toast({
        title: "Error adding loan",
        description: "There was an error adding your loan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Loan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Add New Loan</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] px-6">
          <form onSubmit={handleSubmit} className="space-y-4 pb-6">
          <div className="space-y-2">
            <Label htmlFor="name">Loan Name</Label>
            <Input
              id="name"
              placeholder="e.g., Car Loan, Student Loan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="initial_amount">Loan Amount</Label>
            <Input
              id="initial_amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.initial_amount}
              onChange={(e) => setFormData({ ...formData, initial_amount: e.target.value })}
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
                placeholder="0.00"
                value={formData.interest_rate}
                onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly_payment">Monthly Payment</Label>
              <Input
                id="monthly_payment"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.monthly_payment}
                onChange={(e) => setFormData({ ...formData, monthly_payment: e.target.value })}
                required
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
            <p className="text-xs text-muted-foreground">End date will be calculated automatically</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {loanStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Loan"}
            </Button>
          </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
