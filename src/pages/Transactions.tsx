import { useState, useMemo, useEffect } from "react";
import { TrendingUp, TrendingDown, Filter, Search, DollarSign, Pencil, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrency } from "@/components/currency-selector";
import { AddIncomeDialog } from "@/components/forms/AddIncomeDialog";
import { AddExpenseDialog } from "@/components/forms/AddExpenseDialog";
import EditIncomeDialog from "@/components/forms/EditIncomeDialog";
import EditExpenseDialog from "@/components/forms/EditExpenseDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { getGuestExpenses, getGuestIncome, type GuestExpense, type GuestIncome } from "@/lib/guest-storage";

export default function Transactions() {
  const { formatAmount } = useCurrency();
  const { user, isGuest } = useAuth();
  const queryClient = useQueryClient();
  const [selectedIncome, setSelectedIncome] = useState<any>(null);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterDateRange, setFilterDateRange] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Guest mode state
  const [guestIncome, setGuestIncome] = useState<GuestIncome[]>([]);
  const [guestExpenses, setGuestExpenses] = useState<GuestExpense[]>([]);

  const refreshGuestData = () => {
    setGuestIncome(getGuestIncome());
    setGuestExpenses(getGuestExpenses());
  };

  useEffect(() => {
    if (isGuest) {
      refreshGuestData();
    }
  }, [isGuest]);

  const { data: supabaseIncome = [], refetch: refetchIncome } = useQuery({
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
    enabled: !!user && !isGuest
  });

  const { data: supabaseExpenses = [], refetch: refetchExpenses } = useQuery({
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
    enabled: !!user && !isGuest
  });

  const income = isGuest ? guestIncome : supabaseIncome;
  const expenses = isGuest ? guestExpenses : supabaseExpenses;

  const handleRefetchIncome = () => {
    if (isGuest) {
      refreshGuestData();
    } else {
      refetchIncome();
    }
  };

  const handleRefetchExpenses = () => {
    if (isGuest) {
      refreshGuestData();
    } else {
      refetchExpenses();
    }
  };

  const handleRefetchAll = () => {
    if (isGuest) {
      refreshGuestData();
    } else {
      refetchIncome();
      refetchExpenses();
    }
  };

  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  // Get unique categories from both income and expenses
  const allCategories = useMemo(() => {
    const incomeCategories = income.map(i => i.category).filter(Boolean);
    const expenseCategories = expenses.map(e => e.category).filter(Boolean);
    return [...new Set([...incomeCategories, ...expenseCategories])] as string[];
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
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Track income and expenses in one place</p>
          </div>
          <div className="flex gap-3">
            <AddIncomeDialog onSuccess={handleRefetchAll} />
            <AddExpenseDialog onSuccess={handleRefetchAll} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Net Balance</p>
                  <p className={`text-2xl sm:text-3xl font-bold mt-1 ${netBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {netBalance >= 0 ? '+' : ''}{formatAmount(netBalance)}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${netBalance >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                  <DollarSign className={`h-6 w-6 ${netBalance >= 0 ? 'text-success' : 'text-destructive'}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Income</p>
                  <p className="text-2xl sm:text-3xl font-bold text-success mt-1">
                    +{formatAmount(totalIncome)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{income.length} transactions</p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-card/95 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Expenses</p>
                  <p className="text-2xl sm:text-3xl font-bold text-destructive mt-1">
                    -{formatAmount(totalExpenses)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{expenses.length} transactions</p>
                </div>
                <div className="p-3 rounded-xl bg-destructive/10">
                  <TrendingDown className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border border-border/50 bg-card/95">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-10 h-11"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant={hasActiveFilters ? "default" : "outline"} 
                    className="gap-2 h-11 relative"
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
                        <SelectTrigger className="h-10">
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
                        <SelectTrigger className="h-10">
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
                        <SelectTrigger className="h-10">
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

                    <Button className="w-full h-10" onClick={() => setIsFilterOpen(false)}>
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
                  <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setFilterType('all')}>
                    Type: {filterType}
                    <X className="h-3 w-3" />
                  </Badge>
                )}
                {filterCategory !== 'all' && (
                  <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setFilterCategory('all')}>
                    Category: {filterCategory}
                    <X className="h-3 w-3" />
                  </Badge>
                )}
                {filterDateRange !== 'all' && (
                  <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setFilterDateRange('all')}>
                    Date: {filterDateRange === 'today' ? 'Today' : filterDateRange === 'week' ? 'Last 7 days' : filterDateRange === 'month' ? 'Last 30 days' : 'Last year'}
                    <X className="h-3 w-3" />
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="border border-border/50 bg-card/95">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 h-11">
                <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
                <TabsTrigger value="income" className="text-sm">Income</TabsTrigger>
                <TabsTrigger value="expenses" className="text-sm">Expenses</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <DollarSign className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium mb-2">No transactions yet</p>
                    <p className="text-sm">Start by adding your first income or expense</p>
                  </div>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <div 
                      key={`${transaction.type}-${transaction.id}`}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-all duration-200 cursor-pointer group"
                      onClick={() => {
                        if (transaction.type === 'income') {
                          setSelectedIncome(transaction);
                        } else {
                          setSelectedExpense(transaction);
                        }
                      }}
                    >
                      <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                        transaction.type === 'income' ? 'bg-success/10' : 'bg-destructive/10'
                      }`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className="h-5 w-5 text-success" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {transaction.type === 'income' ? transaction.source : transaction.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                          {transaction.category && (
                            <Badge variant="outline" className="text-xs h-5">{transaction.category}</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <p className={`text-base font-semibold ${
                          transaction.type === 'income' ? 'text-success' : 'text-destructive'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatAmount(Number(transaction.amount))}
                        </p>
                        <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="income" className="space-y-3">
                {income.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium mb-2">No income yet</p>
                    <p className="text-sm">Add your first income to get started</p>
                  </div>
                ) : (
                  income.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-all duration-200 cursor-pointer group"
                      onClick={() => setSelectedIncome(item)}
                    >
                      <div className="p-2.5 rounded-lg bg-success/10 flex-shrink-0">
                        <TrendingUp className="h-5 w-5 text-success" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.source}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                          {item.category && <Badge variant="outline" className="text-xs h-5">{item.category}</Badge>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <p className="text-base font-semibold text-success">
                          +{formatAmount(Number(item.amount))}
                        </p>
                        <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="expenses" className="space-y-3">
                {expenses.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingDown className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium mb-2">No expenses yet</p>
                    <p className="text-sm">Add your first expense to get started</p>
                  </div>
                ) : (
                  expenses.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-all duration-200 cursor-pointer group"
                      onClick={() => setSelectedExpense(item)}
                    >
                      <div className="p-2.5 rounded-lg bg-destructive/10 flex-shrink-0">
                        <TrendingDown className="h-5 w-5 text-destructive" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                          {item.category && <Badge variant="outline" className="text-xs h-5">{item.category}</Badge>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <p className="text-base font-semibold text-destructive">
                          -{formatAmount(Number(item.amount))}
                        </p>
                        <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))
                )}
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
          onOpenChange={(open: boolean) => !open && setSelectedIncome(null)}
          onSuccess={() => {
            handleRefetchIncome();
            setSelectedIncome(null);
          }}
        />
      )}
      {selectedExpense && (
        <EditExpenseDialog
          expense={selectedExpense}
          open={!!selectedExpense}
          onOpenChange={(open: boolean) => !open && setSelectedExpense(null)}
          onSuccess={() => {
            handleRefetchExpenses();
            setSelectedExpense(null);
          }}
        />
      )}
    </div>
    </>
  );
}