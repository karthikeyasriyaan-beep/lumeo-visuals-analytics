import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const monthlyBudgetSchema = z.object({
  total_limit: z.string().min(1, "Budget limit is required"),
});

interface SetMonthlyBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingBudget?: any;
}

export function SetMonthlyBudgetDialog({ open, onOpenChange, existingBudget }: SetMonthlyBudgetDialogProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof monthlyBudgetSchema>>({
    resolver: zodResolver(monthlyBudgetSchema),
    defaultValues: {
      total_limit: existingBudget?.total_limit?.toString() || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof monthlyBudgetSchema>) => {
    if (!user) return;
    setLoading(true);

    try {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      const budgetData = {
        user_id: user.id,
        total_limit: parseFloat(values.total_limit),
        month: currentMonth,
        year: currentYear,
      };

      if (existingBudget) {
        const { error } = await supabase
          .from("monthly_budgets")
          .update(budgetData)
          .eq("id", existingBudget.id);

        if (error) throw error;
        toast.success("Monthly budget updated successfully");
      } else {
        const { error } = await supabase.from("monthly_budgets").insert(budgetData);
        if (error) throw error;
        toast.success("Monthly budget set successfully");
      }

      queryClient.invalidateQueries({ queryKey: ["monthly_budgets"] });
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to save monthly budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{existingBudget ? "Edit" : "Set"} Monthly Budget</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="total_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Monthly Budget</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="5000.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground">
              Set your overall monthly spending limit. We'll help you stay on track with gentle reminders.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : existingBudget ? "Update" : "Set Budget"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
