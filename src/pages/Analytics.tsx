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
      <div className="relative min-h-screen w-full overflow-x-hidden p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-8 animate-fade-in">
      <BackgroundBlobs />
      
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="space-y-2 sm:space-y-3 mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight break-words">Insights & Analytics</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg break-words">Scan your finances at a glance</p>
      </div>

        <Tabs defaultValue="summary" className="space-y-4 sm:space-y-6">
          <TabsList className="glass-strong grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-1 w-full h-auto p-1">
            <TabsTrigger value="summary" className="text-xs sm:text-sm min-h-[44px]">Monthly</TabsTrigger>
            <TabsTrigger value="earnings" className="text-xs sm:text-sm min-h-[44px]">Earnings</TabsTrigger>
            <TabsTrigger value="spending" className="text-xs sm:text-sm min-h-[44px]">Spending</TabsTrigger>
            <TabsTrigger value="goals" className="text-xs sm:text-sm min-h-[44px]">Goals</TabsTrigger>
            <TabsTrigger value="subscriptions" className="text-xs sm:text-sm min-h-[44px]">Subs</TabsTrigger>
            <TabsTrigger value="loans" className="text-xs sm:text-sm min-h-[44px]">Loans</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              <div className="p-3 sm:p-4 rounded-lg bg-background/40 backdrop-blur min-h-[100px]">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 break-words">Total Income</p>
                <p className="text-2xl sm:text-3xl font-bold font-display gradient-text animate-count-up break-words">{formatAmount(totalIncome)}</p>
            </div>
              <div className="p-3 sm:p-4 rounded-lg bg-background/40 backdrop-blur min-h-[100px]">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 break-words">Total Expenses</p>
                <p className="text-2xl sm:text-3xl font-bold font-display gradient-text animate-count-up break-words">{formatAmount(totalExpenses)}</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-background/40 backdrop-blur min-h-[100px]">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 break-words">Net Savings</p>
                <p className="text-2xl sm:text-3xl font-bold font-display gradient-text animate-count-up break-words">{formatAmount(netSavings)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <IncomeAnalytics income={income} formatAmount={formatAmount} />
              <ExpenseAnalytics expenses={expenses} formatAmount={formatAmount} />
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground break-words">You saved {formatAmount(netSavings)} this period.</p>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <IncomeAnalytics income={income} formatAmount={formatAmount} />
            <p className="text-xs sm:text-sm text-muted-foreground break-words">Total income: {formatAmount(totalIncome)}.</p>
          </TabsContent>

          <TabsContent value="spending" className="space-y-4">
            <ExpenseAnalytics expenses={expenses} formatAmount={formatAmount} />
            <p className="text-xs sm:text-sm text-muted-foreground break-words">Total expenses: {formatAmount(totalExpenses)}.</p>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <SavingsGoalsAnalytics savings={savings} goals={[]} formatAmount={formatAmount} />
            <p className="text-xs sm:text-sm text-muted-foreground break-words">Saved {formatAmount(totalSaved)} of {formatAmount(totalTarget)} ({overallProgress.toFixed(1)}%).</p>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <SubscriptionAnalytics subscriptions={subscriptions} formatAmount={formatAmount} />
            <p className="text-xs sm:text-sm text-muted-foreground break-words">Active: {activeSubscriptions.length} • Monthly: {formatAmount(totalMonthlySubs)}.</p>
          </TabsContent>

          <TabsContent value="loans" className="space-y-4">
            <LoanAnalytics loans={loans} formatAmount={formatAmount} />
            <p className="text-xs sm:text-sm text-muted-foreground break-words">Debt: {formatAmount(totalDebt)} • Paid: {formatAmount(totalPaidDebt)}.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}
