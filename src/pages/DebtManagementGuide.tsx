import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, ArrowRight, CreditCard, TrendingDown, 
  CheckCircle2, AlertTriangle, Calculator, Target,
  Clock, Lightbulb, Shield, DollarSign, Percent
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function DebtManagementGuide() {
  const { enterAsGuest } = useAuth();

  const debtTypes = [
    {
      type: "Credit Card Debt",
      rate: "18-42% APR",
      priority: "High Priority",
      description: "Credit card debt is typically the most expensive form of debt due to high interest rates. Paying only minimums can trap you in debt for decades.",
      tips: [
        "Pay more than the minimum payment",
        "Consider balance transfer to 0% card",
        "Stop using cards while paying off",
        "Attack highest rate card first"
      ]
    },
    {
      type: "Personal Loans",
      rate: "10-24% APR",
      priority: "Medium-High Priority",
      description: "Personal loans have lower rates than credit cards but higher than secured loans. They're often used to consolidate higher-interest debt.",
      tips: [
        "Avoid prepayment penalty loans",
        "Consider refinancing if rates drop",
        "Use for debt consolidation strategically",
        "Keep loan term as short as affordable"
      ]
    },
    {
      type: "Student Loans",
      rate: "4-12% APR",
      priority: "Medium Priority",
      description: "Student loans often have lower rates and flexible repayment options. Some may qualify for forgiveness programs or income-based repayment.",
      tips: [
        "Explore income-driven repayment plans",
        "Check for employer repayment benefits",
        "Consider refinancing private loans",
        "Don't ignore federal loan benefits"
      ]
    },
    {
      type: "Home Loan (Mortgage)",
      rate: "7-10% APR",
      priority: "Low Priority",
      description: "Mortgage debt is considered 'good debt' as it builds equity in an appreciating asset. Focus on higher-rate debt first.",
      tips: [
        "Make bi-weekly payments (1 extra payment/year)",
        "Consider refinancing when rates drop 1%+",
        "Avoid extending term when refinancing",
        "Build home equity before investing heavily"
      ]
    },
    {
      type: "Car Loan",
      rate: "7-15% APR",
      priority: "Medium Priority",
      description: "Auto loans are secured by a depreciating asset. Pay off quickly to avoid being 'underwater' (owing more than car's worth).",
      tips: [
        "Aim for 4-year or shorter loan term",
        "Make extra principal payments",
        "Avoid rolling over old loan into new car",
        "Consider used cars to reduce loan amount"
      ]
    }
  ];

  const payoffMethods = [
    {
      name: "Debt Avalanche Method",
      description: "Pay off debts starting with the highest interest rate first while making minimum payments on others. This mathematically minimizes total interest paid.",
      steps: [
        "List all debts with their interest rates",
        "Make minimum payments on all debts",
        "Put extra money toward highest-rate debt",
        "Once paid off, roll that payment to next highest rate",
        "Repeat until debt-free"
      ],
      pros: [
        "Saves the most money on interest",
        "Mathematically optimal strategy",
        "Reduces total repayment time"
      ],
      cons: [
        "Highest-rate debt might be largest (slow wins)",
        "Requires patience and discipline",
        "Can feel demotivating if progress is slow"
      ],
      bestFor: "Disciplined individuals who want to minimize interest paid"
    },
    {
      name: "Debt Snowball Method",
      description: "Pay off debts starting with the smallest balance first regardless of interest rate. Quick wins build momentum and motivation.",
      steps: [
        "List all debts from smallest to largest balance",
        "Make minimum payments on all debts",
        "Put extra money toward smallest balance",
        "Once paid off, roll that payment to next smallest",
        "Repeat, building momentum (like a snowball)"
      ],
      pros: [
        "Quick wins boost motivation",
        "Psychologically rewarding",
        "Simplifies monthly payments faster"
      ],
      cons: [
        "Pays more interest overall",
        "Not mathematically optimal",
        "May take longer for total payoff"
      ],
      bestFor: "People who need motivation and quick wins to stay committed"
    },
    {
      name: "Debt Consolidation",
      description: "Combine multiple debts into a single loan with a lower interest rate. Simplifies payments and potentially reduces total interest.",
      steps: [
        "Calculate total debt and average interest rate",
        "Shop for consolidation loans with lower rates",
        "Include all fees in cost comparison",
        "Use loan to pay off all existing debts",
        "Focus on single monthly payment"
      ],
      pros: [
        "Single monthly payment",
        "Potentially lower interest rate",
        "Fixed payoff date"
      ],
      cons: [
        "May extend repayment period",
        "Requires good credit for best rates",
        "Risk of accumulating new debt on cleared cards"
      ],
      bestFor: "Those with good credit and multiple high-interest debts"
    }
  ];

  const mistakes = [
    {
      mistake: "Making Only Minimum Payments",
      impact: "A ₹1,00,000 credit card balance at 24% APR paid with minimums takes 30+ years and costs ₹2,50,000+ in interest.",
      fix: "Always pay more than the minimum. Even ₹500 extra per month makes a massive difference."
    },
    {
      mistake: "Ignoring High-Interest Debt",
      impact: "While you save in low-yield accounts, high-interest debt compounds against you at 2-3x the rate you're earning.",
      fix: "Focus emergency efforts on debt above 10% APR before building savings beyond a mini emergency fund."
    },
    {
      mistake: "Not Having an Emergency Fund First",
      impact: "Without emergency savings, any unexpected expense sends you back into debt, creating a never-ending cycle.",
      fix: "Build ₹25,000-50,000 mini emergency fund before aggressive debt payoff."
    },
    {
      mistake: "Closing Credit Cards After Payoff",
      impact: "Closing cards reduces available credit, increasing credit utilization ratio and potentially hurting your credit score.",
      fix: "Keep old cards open (with ₹0 balance) unless they have annual fees. Use occasionally for small purchases."
    },
    {
      mistake: "Not Tracking Progress",
      impact: "Without visible progress, motivation fades. Many abandon debt payoff plans due to feeling overwhelmed.",
      fix: "Use Trame to track loan balances, visualize payoff timelines, and celebrate milestones."
    }
  ];

  const quickWins = [
    {
      action: "Negotiate Lower Interest Rates",
      savings: "1-5% rate reduction possible",
      effort: "One phone call",
      details: "Call your credit card company and ask for a rate reduction. If you have good payment history, many will reduce rates to retain you."
    },
    {
      action: "Set Up Automatic Payments",
      savings: "Avoid late fees (₹500-1,500 each)",
      effort: "10 minutes online",
      details: "Automatic payments ensure you never miss a due date. Many lenders also offer 0.25-0.5% rate discount for auto-pay."
    },
    {
      action: "Use Windfalls for Debt",
      savings: "Varies by windfall size",
      effort: "Decision only",
      details: "Tax refunds, bonuses, and gifts can accelerate debt payoff significantly. Commit 50-100% of unexpected money to debt."
    },
    {
      action: "Review Statements for Errors",
      savings: "Varies, potentially significant",
      effort: "30 minutes monthly",
      details: "Check statements for incorrect charges, fees, or interest calculation errors. Dispute anything that doesn't look right."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-foreground">Trame</span>
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
            <TrendingDown className="h-4 w-4" />
            Complete Debt Management Guide
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Conquer Your <span className="text-primary">Debt</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive guide to understanding, managing, and eliminating debt. Learn proven strategies, 
            avoid common mistakes, and create a realistic plan to become debt-free.
          </p>
        </motion.div>

        {/* Why This Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border-2 border-destructive/20 bg-destructive/5">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-destructive/10 flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">The Real Cost of Debt</h2>
                  <p className="text-muted-foreground">Understanding debt's true impact is the first step to conquering it.</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-background rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-destructive">₹2.4L</div>
                  <div className="text-sm text-muted-foreground">Interest paid on ₹1L credit card debt paid with minimums</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-destructive">30+</div>
                  <div className="text-sm text-muted-foreground">Years to pay off ₹1L with minimum payments at 24% APR</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary">70%</div>
                  <div className="text-sm text-muted-foreground">Interest saved by doubling minimum payment</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Types of Debt */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Understanding <span className="text-primary">Debt Types</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Not all debt is created equal. Prioritize based on interest rates and impact.
            </p>
          </motion.div>

          <div className="space-y-4">
            {debtTypes.map((debt, index) => (
              <motion.div
                key={debt.type}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{debt.type}</h3>
                          <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                            {debt.rate}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            debt.priority.includes("High") 
                              ? "bg-destructive/10 text-destructive" 
                              : debt.priority.includes("Medium") 
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" 
                                : "bg-primary/10 text-primary"
                          }`}>
                            {debt.priority}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{debt.description}</p>
                      </div>
                      
                      <div className="lg:w-64 flex-shrink-0">
                        <h4 className="font-semibold text-sm mb-2">Key Tips:</h4>
                        <ul className="space-y-1">
                          {debt.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              {tip}
                            </li>
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

        {/* Payoff Methods */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Debt <span className="text-primary">Payoff Methods</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the method that matches your personality and situation.
            </p>
          </motion.div>

          <div className="space-y-8">
            {payoffMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-2xl font-bold mb-2">{method.name}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{method.description}</p>
                    
                    <div className="grid lg:grid-cols-3 gap-6 mb-6">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-3">How It Works:</h4>
                        <ol className="space-y-2">
                          {method.steps.map((step, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">
                                {i + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div className="bg-primary/5 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 text-primary">✓ Pros:</h4>
                        <ul className="space-y-1">
                          {method.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-muted-foreground">{pro}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-destructive/5 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 text-destructive">✗ Cons:</h4>
                        <ul className="space-y-1">
                          {method.cons.map((con, i) => (
                            <li key={i} className="text-sm text-muted-foreground">{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
                      <p className="text-sm">
                        <span className="font-semibold">Best For:</span>{" "}
                        <span className="text-muted-foreground">{method.bestFor}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Mistakes to <span className="text-primary">Avoid</span>
            </h2>
          </div>

          <div className="space-y-4">
            {mistakes.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    {item.mistake}
                  </h3>
                  <p className="text-muted-foreground mb-3"><strong>Impact:</strong> {item.impact}</p>
                  <div className="bg-primary/5 rounded-lg p-3 border-l-4 border-primary">
                    <p className="text-sm">
                      <span className="font-semibold text-primary">Fix:</span>{" "}
                      <span className="text-muted-foreground">{item.fix}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick Wins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Quick <span className="text-primary">Wins</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Small actions that make a big difference in your debt journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {quickWins.map((win, index) => (
              <motion.div
                key={win.action}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">{win.action}</h3>
                    <div className="flex gap-4 mb-3 text-sm">
                      <span className="text-primary">💰 {win.savings}</span>
                      <span className="text-muted-foreground">⏱️ {win.effort}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{win.details}</p>
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
                Track Your Debt Payoff with Trame
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Monitor all your loans, visualize payoff timelines, and celebrate every payment. 
                Trame makes debt repayment visible and motivating.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={enterAsGuest}
                  size="lg"
                  className="text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary"
                >
                  Start Tracking Debt
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/savings-guide">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-10 py-7 rounded-2xl border-2"
                  >
                    Read Savings Guide
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