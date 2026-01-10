import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ExpenseAnalyticsProps {
  expenses: any[];
  formatAmount: (amount: number) => string;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function ExpenseAnalytics({ expenses, formatAmount }: ExpenseAnalyticsProps) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  
  const categoryData = expenses.reduce((acc: any, exp) => {
    const category = exp.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(exp.amount);
    return acc;
  }, {});

  const chartData = Object.entries(categoryData)
    .map(([name, value]) => ({
      name: name.length > 8 ? name.substring(0, 8) + '...' : name,
      fullName: name,
      amount: value,
    }))
    .sort((a, b) => (b.amount as number) - (a.amount as number))
    .slice(0, 6);

  return (
    <Card className="glass-strong hover-lift border-border/50">
      <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="font-display text-base sm:text-xl">Expense Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
        <div className="p-3 sm:p-4 rounded-lg bg-background/40 backdrop-blur">
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-xl sm:text-3xl font-bold font-display gradient-text animate-count-up">{formatAmount(totalExpenses)}</p>
        </div>
        <div className="w-full h-[200px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={10}
                tickLine={false}
                axisLine={false}
                angle={-35}
                textAnchor="end"
                height={50}
                interval={0}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                  padding: '8px 12px'
                }}
                formatter={(value: number, name: string, props: any) => [formatAmount(value), props.payload.fullName]}
                labelFormatter={() => ''}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}