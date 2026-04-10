import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, PiggyBank } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddSavingsDialogProps {
  onSuccess?: () => void;
}

export function AddSavingsDialog({ onSuccess }: AddSavingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    target_amount: "",
    current_amount: "",
    deadline: "",
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
      const { error } = await supabase.from("savings").insert({
        user_id: user.id,
        name: formData.name,
        target_amount: parseFloat(formData.target_amount),
        current_amount: parseFloat(formData.current_amount || "0"),
        deadline: formData.deadline || null,
      });
      if (error) throw error;
      toast({ title: "Savings goal created successfully 🎯", description: `${formData.name} is ready to track.` });
      setFormData({ name: "", target_amount: "", current_amount: "", deadline: "" });
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error adding savings:", error);
      toast({ title: "Error creating goal", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Savings Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <PiggyBank className="h-4 w-4 text-primary" />
            </div>
            <DialogTitle className="text-lg">Create Savings Goal</DialogTitle>
          </div>
          <DialogDescription>Start a goal and track your progress step by step.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="sg-name">Goal Name</Label>
            <Input
              ref={nameRef}
              id="sg-name"
              placeholder="New Phone, Emergency Fund, Trip"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="sg-target">Target Amount</Label>
            <Input
              id="sg-target"
              type="number"
              step="0.01"
              min="1"
              placeholder="0.00"
              value={formData.target_amount}
              onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
              className="h-12 text-lg font-semibold"
              required
            />
            <p className="text-xs text-muted-foreground">Set a goal and start building your savings consistently.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="sg-current">Starting Amount</Label>
              <Input
                id="sg-current"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.current_amount}
                onChange={(e) => setFormData({ ...formData, current_amount: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sg-deadline">Target Date</Label>
              <Input
                id="sg-deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="h-12"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating..." : "Create Goal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
