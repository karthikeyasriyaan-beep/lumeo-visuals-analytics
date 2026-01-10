import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { ExpenseAnalytics } from "@/components/analytics/ExpenseAnalytics";
import { IncomeAnalytics } from "@/components/analytics/IncomeAnalytics";
import { SubscriptionAnalytics } from "@/components/analytics/SubscriptionAnalytics";
import { LoanAnalytics } from "@/components/analytics/LoanAnalytics";
import { SavingsGoalsAnalytics } from "@/components/analytics/SavingsGoalsAnalytics";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NoIndexMeta } from "@/components/NoIndexMeta";

export default function Analytics() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();

  // Fetch all data
  const { data: expenses = [], isLoading: expensesLoading } = useQuery({
    queryKey: ['expenses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      return data || [];
    },
    enabled: !!user
  });

  const { data: income = [], isLoading: incomeLoading } = useQuery({
    queryKey: ['income', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('income')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      return data || [];
    },
    enabled: !!user
  });

  const { data: subscriptions = [], isLoading: subsLoading } = useQuery({
    queryKey: ['subscriptions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);
      return data || [];
    },
    enabled: !!user
  });

  const { data: loans = [], isLoading: loansLoading } = useQuery({
    queryKey: ['loans', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('loans')
        .select('*')
        .eq('user_id', user.id);
      return data || [];
    },
    enabled: !!user
  });


  const { data: savings = [], isLoading: savingsLoading } = useQuery({
    queryKey: ['savings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('savings')
        .select('*')
        .eq('user_id', user.id);
      return data || [];
    },
    enabled: !!user
  });

  // Aggregates for summaries
  const totalExpenses = expenses.reduce((sum: number, exp: any) => sum + Number(exp.amount || 0), 0);
  const totalIncome = income.reduce((sum: number, inc: any) => sum + Number(inc.amount || 0), 0);
  const netSavings = totalIncome - totalExpenses;

  const activeSubscriptions = subscriptions.filter((sub: any) => sub.status === 'active');
  const totalMonthlySubs = activeSubscriptions.reduce((sum: number, sub: any) => {
    const amount = Number(sub.amount) || 0;
    return sum + (sub.billing_cycle === 'yearly' ? amount / 12 : amount);
  }, 0);

  const activeLoans = loans.filter((loan: any) => loan.status === 'active');
  const totalDebt = activeLoans.reduce((sum: number, loan: any) => sum + Number(loan.current_balance || 0), 0);
  const totalInitialDebt = activeLoans.reduce((sum: number, loan: any) => sum + Number(loan.initial_amount || 0), 0);
  const totalPaidDebt = totalInitialDebt - totalDebt;

  

  const allGoals = [...savings];
  const totalTarget = allGoals.reduce((sum: number, g: any) => sum + Number(g.target_amount || 0), 0);
  const totalSaved = allGoals.reduce((sum: number, g: any) => sum + Number(g.current_amount || 0), 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const isLoading = expensesLoading || incomeLoading || subsLoading || 
                    loansLoading || savingsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 animate-fade-in">
      <BackgroundBlobs />
      
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="space-y-1 sm:space-y-2 mb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display tracking-tight">Insights & Analytics</h1>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">Scan your finances at a glance</p>
      </div>

        <Tabs defaultValue="summary" className="space-y-4 sm:space-y-6">
          <TabsList className="glass-strong grid grid-cols-3 sm:grid-cols-6 gap-0.5 sm:gap-1 w-full h-auto p-0.5 sm:p-1">
            <TabsTrigger value="summary" className="text-[10px] sm:text-xs md:text-sm min-h-[36px] sm:min-h-[44px] px-1 sm:px-3">Monthly</TabsTrigger>
            <TabsTrigger value="earnings" className="text-[10px] sm:text-xs md:text-sm min-h-[36px] sm:min-h-[44px] px-1 sm:px-3">Earnings</TabsTrigger>
            <TabsTrigger value="spending" className="text-[10px] sm:text-xs md:text-sm min-h-[36px] sm:min-h-[44px] px-1 sm:px-3">Spending</TabsTrigger>
            <TabsTrigger value="goals" className="text-[10px] sm:text-xs md:text-sm min-h-[36px] sm:min-h-[44px] px-1 sm:px-3">Goals</TabsTrigger>
            <TabsTrigger value="subscriptions" className="text-[10px] sm:text-xs md:text-sm min-h-[36px] sm:min-h-[44px] px-1 sm:px-3">Subs</TabsTrigger>
            <TabsTrigger value="loans" className="text-[10px] sm:text-xs md:text-sm min-h-[36px] sm:min-h-[44px] px-1 sm:px-3">Loans</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="p-3 sm:p-4 rounded-lg bg-background/40 backdrop-blur min-h-[80px] sm:min-h-[100px]">
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1">Total Income</p>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold font-display gradient-text animate-count-up break-all">{formatAmount(totalIncome)}</p>
            </div>
              <div className="p-3 sm:p-4 rounded-lg bg-background/40 backdrop-blur min-h-[80px] sm:min-h-[100px]">
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1">Total Expenses</p>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold font-display gradient-text animate-count-up break-all">{formatAmount(totalExpenses)}</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-background/40 backdrop-blur min-h-[80px] sm:min-h-[100px]">
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1">Net Savings</p>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold font-display gradient-text animate-count-up break-all">{formatAmount(netSavings)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <IncomeAnalytics income={income} formatAmount={formatAmount} />
              <ExpenseAnalytics expenses={expenses} formatAmount={formatAmount} />
            </div>

            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">You saved {formatAmount(netSavings)} this period.</p>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <IncomeAnalytics income={income} formatAmount={formatAmount} />
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Total income: {formatAmount(totalIncome)}.</p>
          </TabsContent>

          <TabsContent value="spending" className="space-y-4">
            <ExpenseAnalytics expenses={expenses} formatAmount={formatAmount} />
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Total expenses: {formatAmount(totalExpenses)}.</p>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <SavingsGoalsAnalytics savings={savings} goals={[]} formatAmount={formatAmount} />
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Saved {formatAmount(totalSaved)} of {formatAmount(totalTarget)} ({overallProgress.toFixed(1)}%).</p>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <SubscriptionAnalytics subscriptions={subscriptions} formatAmount={formatAmount} />
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Active: {activeSubscriptions.length} • Monthly: {formatAmount(totalMonthlySubs)}.</p>
          </TabsContent>

          <TabsContent value="loans" className="space-y-4">
            <LoanAnalytics loans={loans} formatAmount={formatAmount} />
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Debt: {formatAmount(totalDebt)} • Paid: {formatAmount(totalPaidDebt)}.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}