"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { PiggyBank, CreditCard, DollarSign } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import LiveSummaryBar from "@/components/LiveSummaryBar";
import { Calculator } from "@/components/Calculator";
import { NoIndexMeta } from "@/components/NoIndexMeta";

export default function Dashboard() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();

  // --- Fetch all data sets ---
  const { data: income = [] } = useQuery({
    queryKey: ["income", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("income")
        .select("*")
        .eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: loans = [] } = useQuery({
    queryKey: ["loans", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("loans")
        .select("*")
        .eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: savings = [] } = useQuery({
    queryKey: ["savings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("savings")
        .select("*")
        .eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user,
  });


  // --- Responsive layout and stats ---
  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <BackgroundBlobs />

        <div className="relative max-w-7xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
        <LiveSummaryBar />

        {/* Header + Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight gradient-text break-words">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg break-words">
            Track your finances with clarity and confidence
          </p>
          <Calculator />
        </motion.div>

        {/* Dashboard Summary Cards */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: DollarSign,
              color: "chart-2",
              label: "Transactions",
              value: income.length + expenses.length,
              subtitle: "This month",
            },
            {
              icon: PiggyBank,
              color: "success",
              label: "Goals",
              value: savings.length,
              subtitle: "Active goals",
            },
            {
              icon: CreditCard,
              color: "destructive",
              label: "Loans",
              value: loans.length,
              subtitle: "Active loans",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass hover-glow cursor-pointer group min-h-[140px]">
                <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base font-display break-words">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`p-1.5 sm:p-2 rounded-lg bg-${item.color}/10 group-hover:bg-${item.color}/20 transition-colors flex-shrink-0`}
                    >
                      <item.icon
                        className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-${item.color}`}
                      />
                    </motion.div>
                    <span className="break-words">{item.label}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0">
                  <p className="text-2xl sm:text-3xl font-bold mb-1 animate-count-up">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground break-words">
                    {item.subtitle}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
