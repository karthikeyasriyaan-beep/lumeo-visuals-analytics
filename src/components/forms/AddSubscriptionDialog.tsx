import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Repeat } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddSubscriptionDialogProps {
  onSuccess?: () => void;
}

const billingCycles = ["Monthly", "Yearly"];

export function AddSubscriptionDialog({ onSuccess }: AddSubscriptionDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    billing_cycle: "",
    next_billing_date: "",
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open) setTimeout(() => nameRef.current?.focus(), 100);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        name: formData.name,
        amount: parseFloat(formData.amount),
        billing_cycle: formData.billing_cycle,
        next_billing_date: formData.next_billing_date,
        status: "active",
      });
      if (error) throw error;
      toast({ title: "Subscription added successfully ✓", description: `${formData.name} is now being tracked.` });
      setFormData({ name: "", amount: "", billing_cycle: "", next_billing_date: "" });
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error adding subscription:", error);
      toast({ title: "Error adding subscription", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Subscription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Repeat className="h-4 w-4 text-primary" />
            </div>
            <DialogTitle className="text-lg">Add Subscription</DialogTitle>
          </div>
          <DialogDescription>Track your recurring payments and never miss a billing date.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="sub-name">Subscription Name</Label>
            <Input
              ref={nameRef}
              id="sub-name"
              placeholder="Netflix, Spotify, YouTube Premium"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="sub-amount">Amount</Label>
            <Input
              id="sub-amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="h-12 text-lg font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="sub-cycle">Billing Cycle</Label>
              <Select value={formData.billing_cycle} onValueChange={(v) => setFormData({ ...formData, billing_cycle: v })}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {billingCycles.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Choose how often this payment repeats.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sub-date">Next Billing Date</Label>
              <Input
                id="sub-date"
                type="date"
                value={formData.next_billing_date}
                onChange={(e) => setFormData({ ...formData, next_billing_date: e.target.value })}
                className="h-12"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : "Save Subscription"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
