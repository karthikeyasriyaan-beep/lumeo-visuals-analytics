import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Filter, Search, DollarSign, Pencil, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrency } from "@/components/currency-selector";
import { AddIncomeDialog } from "@/components/forms/AddIncomeDialog";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import { AddMultipleExpensesDialog } from "@/components/forms/AddMultipleExpensesDialog";
import EditIncomeDialog from "@/components/forms/EditIncomeDialog";
import EditExpenseDialog from "@/components/forms/EditExpenseDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Transactions() {
  const { formatAmount } = useCurrency();
  const { user } = useAuth();
  const [selectedIncome, setSelectedIncome] = useState<any>(null);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterDateRange, setFilterDateRange] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: income = [], refetch: refetchIncome } = useQuery({
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

  const { data: expenses = [], refetch: refetchExpenses } = useQuery({
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

  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  // Get unique categories from both income and expenses
  const allCategories = useMemo(() => {
    const incomeCategories = income.map(i => i.category).filter(Boolean);
    const expenseCategories = expenses.map(e => e.category).filter(Boolean);
    return [...new Set([...incomeCategories, ...expenseCategories])];
  }, [income, expenses]);

  // Combined and sorted transactions
  const allTransactions = [
    ...income.map(item => ({ ...item, type: 'income' as const })),
    ...expenses.map(item => ({ ...item, type: 'expense' as const }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(t => {
      const title = t.type === 'income' ? t.source : t.name;
      const description = t.notes || '';
      
      // Search filter
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
      
      // Type filter
      const matchesType = filterType === 'all' || t.type === filterType;
      
      // Date range filter
      let matchesDate = true;
      if (filterDateRange !== 'all') {
        const transactionDate = new Date(t.date);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        
        switch (filterDateRange) {
          case 'today':
            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);
            matchesDate = transactionDate >= startOfToday && transactionDate <= today;
            break;
          case 'week':
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            matchesDate = transactionDate >= weekAgo && transactionDate <= today;
            break;
          case 'month':
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            matchesDate = transactionDate >= monthAgo && transactionDate <= today;
            break;
          case 'year':
            const yearAgo = new Date();
            yearAgo.setFullYear(yearAgo.getFullYear() - 1);
            matchesDate = transactionDate >= yearAgo && transactionDate <= today;
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesType && matchesDate;
    });
  }, [allTransactions, searchQuery, filterCategory, filterType, filterDateRange]);

  const hasActiveFilters = filterCategory !== 'all' || filterDateRange !== 'all' || filterType !== 'all';

  const clearFilters = () => {
    setFilterCategory('all');
    setFilterDateRange('all');
    setFilterType('all');
  };

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden p-4 sm:p-6 lg:p-8">
      <BackgroundBlobs />
      
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight gradient-text break-words">Transactions</h1>
            <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base break-words">Track income and expenses in one place</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <AddIncomeDialog onSuccess={refetchIncome} />
            <AddExpenseDialog onSuccess={refetchExpenses} />
            <AddMultipleExpensesDialog onSuccess={refetchExpenses} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Card className="glass hover-glow min-h-[120px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium break-words">Net Balance</CardTitle>
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className={`text-2xl sm:text-3xl font-bold break-words ${netBalance >= 0 ? 'status-positive' : 'status-negative'}`}>
                {netBalance >= 0 ? '+' : ''}{formatAmount(netBalance)}
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-glow min-h-[120px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium break-words">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-success flex-shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold status-positive break-words">
                +{formatAmount(totalIncome)}
              </div>
              <p className="text-xs text-muted-foreground mt-1 break-words">
                {income.length} transactions
              </p>
            </CardContent>
          </Card>

          <Card className="glass hover-glow min-h-[120px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium break-words">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-destructive flex-shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold status-negative break-words">
                -{formatAmount(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground mt-1 break-words">
                {expenses.length} transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="glass">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-10 min-h-[44px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant={hasActiveFilters ? "default" : "outline"} 
                    className="gap-2 min-h-[44px] min-w-[44px] relative"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                    {hasActiveFilters && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Filters</h4>
                      {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                          <X className="h-3 w-3 mr-1" />
                          Clear all
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Type</Label>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger>
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All types</SelectItem>
                          <SelectItem value="income">Income only</SelectItem>
                          <SelectItem value="expense">Expenses only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Category</Label>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All categories</SelectItem>
                          {allCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Date Range</Label>
                      <Select value={filterDateRange} onValueChange={setFilterDateRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="All time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">Last 7 days</SelectItem>
                          <SelectItem value="month">Last 30 days</SelectItem>
                          <SelectItem value="year">Last year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Active filters display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-3">
                {filterType !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Type: {filterType}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterType('all')} />
                  </Badge>
                )}
                {filterCategory !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Category: {filterCategory}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterCategory('all')} />
                  </Badge>
                )}
                {filterDateRange !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Date: {filterDateRange === 'today' ? 'Today' : filterDateRange === 'week' ? 'Last 7 days' : filterDateRange === 'month' ? 'Last 30 days' : 'Last year'}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterDateRange('all')} />
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="glass">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl break-words">All Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 h-auto p-1">
                <TabsTrigger value="all" className="text-xs sm:text-sm min-h-[44px]">All</TabsTrigger>
                <TabsTrigger value="income" className="text-xs sm:text-sm min-h-[44px]">Income</TabsTrigger>
                <TabsTrigger value="expenses" className="text-xs sm:text-sm min-h-[44px]">Expenses</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <DollarSign className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No transactions yet</p>
                    <p className="text-sm">Start by adding your first income or expense</p>
                  </div>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <div 
                      key={`${transaction.type}-${transaction.id}`}
                      className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                      onClick={() => {
                        if (transaction.type === 'income') {
                          setSelectedIncome(transaction);
                        } else {
                          setSelectedExpense(transaction);
                        }
                      }}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        transaction.type === 'income' ? 'bg-success/10' : 'bg-destructive/10'
                      }`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
                        ) : (
                          <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="font-medium text-sm sm:text-base truncate break-words">
                          {transaction.type === 'income' ? transaction.source : transaction.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                          {transaction.category && (
                            <Badge variant="outline" className="text-xs">{transaction.category}</Badge>
                          )}
                          <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'} className="text-xs">
                            {transaction.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className={`text-base sm:text-xl font-bold text-right ${
                          transaction.type === 'income' ? 'status-positive' : 'status-negative'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatAmount(Number(transaction.amount))}
                        </div>
                        <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="income" className="space-y-4">
                {income.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                    onClick={() => setSelectedIncome(item)}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-medium text-sm sm:text-base truncate break-words">{item.source}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                        {item.category && <Badge variant="outline" className="text-xs">{item.category}</Badge>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <div className="text-base sm:text-xl font-bold status-positive text-right">
                        +{formatAmount(Number(item.amount))}
                      </div>
                      <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="expenses" className="space-y-4">
                {expenses.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                    onClick={() => setSelectedExpense(item)}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-medium text-sm sm:text-base truncate break-words">{item.name}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                        {item.category && <Badge variant="outline" className="text-xs">{item.category}</Badge>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <div className="text-base sm:text-xl font-bold status-negative text-right">
                        -{formatAmount(Number(item.amount))}
                      </div>
                      <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialogs */}
      {selectedIncome && (
        <EditIncomeDialog
          income={selectedIncome}
          open={!!selectedIncome}
          onOpenChange={(open) => !open && setSelectedIncome(null)}
          onSuccess={() => {
            refetchIncome();
            setSelectedIncome(null);
          }}
        />
      )}
      {selectedExpense && (
        <EditExpenseDialog
          expense={selectedExpense}
          open={!!selectedExpense}
          onOpenChange={(open) => !open && setSelectedExpense(null)}
          onSuccess={() => {
            refetchExpenses();
            setSelectedExpense(null);
          }}
        />
      )}
    </div>
    </>
  );
}
