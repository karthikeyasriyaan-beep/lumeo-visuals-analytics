import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";
export default function LiveSummaryBar() {
  const {
    user
  } = useAuth();
  const {
    formatAmount
  } = useCurrency();
  const {
    data: income = []
  } = useQuery({
    queryKey: ['income', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const {
        data
      } = await supabase.from('income').select('*').eq('user_id', user.id);
      return data || [];
    },
    enabled: !!user
  });
  const {
    data: expenses = []
  } = useQuery({
    queryKey: ['expenses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const {
        data
      } = await supabase.from('expenses').select('*').eq('user_id', user.id);
      return data || [];
    },
    enabled: !!user
  });
  const {
    data: savings = []
  } = useQuery({
    queryKey: ['savings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const {
        data
      } = await supabase.from('savings').select('*').eq('user_id', user.id);
      return data || [];
    },
    enabled: !!user
  });
  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalSavings = savings.reduce((sum, saving) => sum + Number(saving.current_amount || 0), 0);
  const balance = totalIncome - totalExpenses;
  const stats = [{
    label: "Balance",
    value: balance,
    icon: Wallet,
    color: balance >= 0 ? "text-primary" : "text-destructive",
    bgColor: balance >= 0 ? "bg-primary/10" : "bg-destructive/10"
  }, {
    label: "Income",
    value: totalIncome,
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10"
  }, {
    label: "Expenses",
    value: totalExpenses,
    icon: TrendingDown,
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  }, {
    label: "Savings",
    value: totalSavings,
    icon: PiggyBank,
    color: "text-accent",
    bgColor: "bg-accent/10"
  }];
  return <div className="glass-strong sticky top-16 z-20 mb-4 sm:mb-6 overflow-hidden">
      
    </div>;
}