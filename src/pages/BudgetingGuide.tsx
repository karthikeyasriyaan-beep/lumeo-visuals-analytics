import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, ArrowRight, Calculator, Target, PiggyBank, 
  AlertTriangle, CheckCircle2, Lightbulb, BarChart3,
  Wallet, TrendingUp, Clock, Calendar, DollarSign
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function BudgetingGuide() {
  const { enterAsGuest } = useAuth();

  const budgetingMethods = [
    {
      title: "The 50/30/20 Rule",
      subtitle: "Best for: Beginners and those who want simplicity",
      description: "Divide your after-tax income into three categories: 50% for needs, 30% for wants, and 20% for savings and debt repayment. This method provides structure while maintaining flexibility.",
      breakdown: [
        { category: "Needs (50%)", items: ["Housing", "Utilities", "Groceries", "Insurance", "Minimum debt payments", "Transportation"] },
        { category: "Wants (30%)", items: ["Entertainment", "Dining out", "Shopping", "Hobbies", "Subscriptions", "Vacations"] },
        { category: "Savings (20%)", items: ["Emergency fund", "Retirement savings", "Extra debt payments", "Investment accounts", "Savings goals"] }
      ],
      pros: ["Simple to understand and implement", "Flexible within categories", "Good starting point for budgeting beginners"],
      cons: ["May not work for high-cost-of-living areas", "Doesn't account for irregular income", "Categories may feel too broad"]
    },
    {
      title: "Zero-Based Budgeting",
      subtitle: "Best for: Detail-oriented planners and those with variable expenses",
      description: "Every rupee/dollar of income is assigned a specific purpose before the month begins. Your income minus your expenses should equal zero—not because you're broke, but because every rupee has a job.",
      breakdown: [
        { category: "Step 1", items: ["Calculate total monthly income"] },
        { category: "Step 2", items: ["List all expenses (fixed and variable)"] },
        { category: "Step 3", items: ["Assign every rupee to a category"] },
        { category: "Step 4", items: ["Adjust until income - expenses = 0"] }
      ],
      pros: ["Maximum control over spending", "Forces intentional money decisions", "Helps identify wasteful spending"],
      cons: ["Time-intensive to set up and maintain", "Can feel restrictive", "Requires accurate income prediction"]
    },
    {
      title: "Envelope System",
      subtitle: "Best for: Cash-users and those who overspend on credit/debit cards",
      description: "Allocate cash into physical or digital 'envelopes' for each spending category. When an envelope is empty, you stop spending in that category until the next month.",
      breakdown: [
        { category: "Common Envelopes", items: ["Groceries", "Transportation", "Entertainment", "Dining out", "Personal care", "Miscellaneous"] }
      ],
      pros: ["Creates tangible spending awareness", "Prevents overspending naturally", "Great for visual learners"],
      cons: ["Inconvenient in a digital world", "Doesn't work well for online purchases", "Cash can be lost or stolen"]
    },
    {
      title: "Pay Yourself First",
      subtitle: "Best for: Those focused on building wealth and savings",
      description: "Prioritize savings by automatically transferring a fixed amount to savings/investments immediately when income arrives. Live on what remains. This method ensures savings happen before discretionary spending.",
      breakdown: [
        { category: "Priority Order", items: ["1. Emergency fund (3-6 months expenses)", "2. Retirement contributions", "3. Debt repayment above minimums", "4. Other financial goals", "5. Everything else with remaining funds"] }
      ],
      pros: ["Guarantees savings happen", "Reduces temptation to spend", "Builds wealth automatically"],
      cons: ["Doesn't address spending habits", "May leave insufficient funds for needs", "Requires income stability"]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Not Tracking Small Purchases",
      explanation: "The ₹50 coffee, ₹100 snack, and ₹200 impulse buy seem insignificant individually, but they add up to thousands monthly. These 'financial leaks' often account for 15-20% of monthly spending.",
      solution: "Track every expense, no matter how small. Trackora's quick-add feature makes this painless."
    },
    {
      mistake: "Setting Unrealistic Goals",
      explanation: "Creating a budget that slashes entertainment to zero or allows no dining out leads to frustration and budget abandonment within weeks.",
      solution: "Start with realistic cuts (10-20% per category) and gradually tighten as you build discipline."
    },
    {
      mistake: "Forgetting Irregular Expenses",
      explanation: "Annual insurance premiums, car maintenance, gifts, and medical expenses catch many budgets off guard because they don't occur monthly.",
      solution: "Create a 'sinking fund' by dividing annual expenses by 12 and saving that amount monthly."
    },
    {
      mistake: "Not Having an Emergency Fund",
      explanation: "Without emergency savings, any unexpected expense—medical bill, car repair, job loss—forces you into debt, derailing your entire financial plan.",
      solution: "Prioritize building a ₹25,000-50,000 starter emergency fund before aggressive debt payoff or investing."
    },
    {
      mistake: "Budgeting Based on Gross Income",
      explanation: "Using pre-tax income for budgeting creates an unrealistic picture. You can't spend money that goes to taxes and deductions.",
      solution: "Always budget using your take-home (net) pay—the amount actually deposited in your account."
    },
    {
      mistake: "Not Reviewing and Adjusting",
      explanation: "A budget isn't a one-time creation. Life changes, expenses fluctuate, and income varies. A static budget becomes irrelevant quickly.",
      solution: "Review your budget monthly. Celebrate wins, identify problems, and adjust for the next month."
    }
  ];

  const tips = [
    {
      icon: Calendar,
      title: "Schedule Budget Reviews",
      description: "Set a recurring calendar event for the last Sunday of each month to review spending and plan for the next month."
    },
    {
      icon: Target,
      title: "Start with One Goal",
      description: "Don't try to save for everything at once. Pick one priority (emergency fund, vacation, debt payoff) and focus on it."
    },
    {
      icon: Clock,
      title: "Use the 24-Hour Rule",
      description: "For non-essential purchases over ₹1,000, wait 24 hours before buying. You'll often realize you don't need it."
    },
    {
      icon: TrendingUp,
      title: "Celebrate Small Wins",
      description: "Acknowledge progress, even small milestones. Staying motivated is key to long-term budgeting success."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-foreground">Trackora</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Calculator className="h-4 w-4" />
            Complete Budgeting Guide
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Master Your <span className="text-primary">Budget</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive guide to creating, maintaining, and optimizing a budget that works for your 
            unique financial situation. Learn proven methods, avoid common pitfalls, and build lasting 
            financial habits.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="font-bold text-lg mb-4">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>4 proven budgeting methods explained</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Common budgeting mistakes to avoid</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Practical tips for budget success</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>How to track and optimize spending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Budgeting Matters</h2>
              <div className="prose prose-muted max-w-none space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  A budget is not a restriction—it's a plan that gives you permission to spend guilt-free 
                  on things that matter to you. Without a budget, money tends to slip away on things that 
                  don't align with your values and goals.
                </p>
                <p className="leading-relaxed">
                  Studies show that people who actively track their spending and follow a budget save 
                  significantly more money than those who don't. They also report lower financial stress 
                  and greater confidence in their financial future.
                </p>
                <p className="leading-relaxed">
                  The key to successful budgeting isn't deprivation—it's awareness. When you know exactly 
                  where your money goes, you can make intentional decisions that support your goals while 
                  still enjoying life.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Budgeting Methods */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Popular <span className="text-primary">Budgeting Methods</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              There's no one-size-fits-all budget. Explore these proven methods and choose what resonates 
              with your personality and financial situation.
            </p>
          </motion.div>

          <div className="space-y-8">
            {budgetingMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold">{method.title}</h3>
                        <p className="text-primary font-medium text-sm">{method.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">{method.description}</p>
                    
                    {method.breakdown && (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {method.breakdown.map((item, i) => (
                          <div key={i} className="bg-muted/30 rounded-lg p-4">
                            <h4 className="font-semibold text-sm mb-2">{item.category}</h4>
                            <ul className="space-y-1">
                              {item.items.map((listItem, j) => (
                                <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  {listItem}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-green-500/10 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-400">✓ Pros</h4>
                        <ul className="space-y-1">
                          {method.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-muted-foreground">{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-orange-500/10 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2 text-orange-600 dark:text-orange-400">✗ Cons</h4>
                        <ul className="space-y-1">
                          {method.cons.map((con, i) => (
                            <li key={i} className="text-sm text-muted-foreground">{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Common <span className="text-primary">Budgeting Mistakes</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Learn from others' mistakes so you don't have to make them yourself.
            </p>
          </motion.div>

          <div className="space-y-4">
            {commonMistakes.map((item, index) => (
              <motion.div
                key={item.mistake}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-destructive/10 flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{item.mistake}</h3>
                        <p className="text-muted-foreground mb-3 leading-relaxed">{item.explanation}</p>
                        <div className="bg-primary/5 rounded-lg p-3 border-l-4 border-primary">
                          <p className="text-sm">
                            <span className="font-semibold text-primary">Solution:</span>{" "}
                            <span className="text-muted-foreground">{item.solution}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tips for <span className="text-primary">Success</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                        <tip.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">{tip.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-2 border-primary/20">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Start Budgeting with Trackora
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Put these strategies into practice with Trackora's intuitive budgeting tools. 
                Set limits, track spending, and watch your financial health improve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={enterAsGuest}
                  size="lg"
                  className="text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary"
                >
                  Try Trackora Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/blog">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-10 py-7 rounded-2xl border-2"
                  >
                    Read More Articles
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}