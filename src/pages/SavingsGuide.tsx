import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, ArrowRight, PiggyBank, Target, Shield, 
  TrendingUp, CheckCircle2, Lightbulb, AlertTriangle,
  Calculator, Clock, Calendar, Wallet, Home, Car, GraduationCap
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function SavingsGuide() {
  const { enterAsGuest } = useAuth();

  const savingsTypes = [
    {
      icon: Shield,
      title: "Emergency Fund",
      priority: "Priority #1",
      description: "Your financial safety net for unexpected expenses like medical bills, car repairs, or job loss. Without this, a single emergency can derail your entire financial plan.",
      target: "3-6 months of essential expenses",
      tips: [
        "Start with a mini goal of ₹25,000-50,000",
        "Keep in a separate high-yield savings account",
        "Don't invest this money—it needs to be liquid",
        "Replenish immediately after using"
      ]
    },
    {
      icon: Home,
      title: "House Down Payment",
      priority: "Long-term Goal",
      description: "Saving for a home requires consistent effort over years. A larger down payment means lower EMIs and less interest paid over the loan term.",
      target: "10-20% of expected home price",
      tips: [
        "Calculate realistic home prices in your desired area",
        "Factor in registration, stamp duty, and moving costs",
        "Consider PPF or FD for safe, tax-efficient growth",
        "Set up automatic monthly transfers"
      ]
    },
    {
      icon: Car,
      title: "Vehicle Purchase",
      priority: "Medium-term Goal",
      description: "Saving for a car rather than financing it saves thousands in interest. Even a substantial down payment reduces your loan burden significantly.",
      target: "30-100% of vehicle cost",
      tips: [
        "Research total cost including insurance and maintenance",
        "Consider buying a certified pre-owned vehicle",
        "Factor in depreciation for realistic budgeting",
        "Compare financing vs. full cash payment benefits"
      ]
    },
    {
      icon: GraduationCap,
      title: "Education Fund",
      priority: "Long-term Goal",
      description: "Whether for yourself or your children, education costs are rising faster than inflation. Starting early leverages the power of compound growth.",
      target: "Varies by education type and institution",
      tips: [
        "Research costs at target institutions",
        "Account for annual fee increases (8-12%)",
        "Consider education-specific investment options",
        "Apply for scholarships to reduce needed savings"
      ]
    }
  ];

  const savingsStrategies = [
    {
      title: "The 52-Week Challenge",
      description: "Save ₹100 in week 1, ₹200 in week 2, and so on. By week 52, you'll have saved ₹1,37,800. Modify amounts to match your income level.",
      difficulty: "Beginner",
      potential: "₹50,000 - ₹1,50,000 annually"
    },
    {
      title: "Automated Savings",
      description: "Set up automatic transfers to savings on payday, before you have a chance to spend. 'Out of sight, out of mind' really works.",
      difficulty: "Beginner",
      potential: "Depends on amount automated"
    },
    {
      title: "Round-Up Savings",
      description: "Round up every purchase to the nearest ₹50 or ₹100 and save the difference. Small amounts accumulate surprisingly fast.",
      difficulty: "Beginner",
      potential: "₹5,000 - ₹15,000 annually"
    },
    {
      title: "No-Spend Days/Weeks",
      description: "Designate certain days or weeks as no-spending periods (essentials excluded). This builds awareness and discipline.",
      difficulty: "Intermediate",
      potential: "₹10,000 - ₹30,000 annually"
    },
    {
      title: "Subscription Audit",
      description: "Cancel unused subscriptions and redirect that money to savings. Most people waste ₹500-2,000/month on forgotten subscriptions.",
      difficulty: "Beginner",
      potential: "₹6,000 - ₹24,000 annually"
    },
    {
      title: "The 1% Challenge",
      description: "Save 1% more of your income each month. By month 12, you're saving 12% more than when you started.",
      difficulty: "Intermediate",
      potential: "Gradually increasing"
    }
  ];

  const obstacles = [
    {
      obstacle: "\"I don't earn enough to save\"",
      reality: "Even ₹500/month adds up to ₹6,000/year. Start small and increase as income grows. The habit matters more than the amount.",
      action: "Start with just 1% of your income this month."
    },
    {
      obstacle: "\"I'll start saving next month\"",
      reality: "There's never a 'perfect' time. Waiting costs you compound growth. Starting today with ₹100 beats starting next year with ₹1,000.",
      action: "Open a savings account and deposit ₹100 right now."
    },
    {
      obstacle: "\"I have too much debt to save\"",
      reality: "While paying off high-interest debt is crucial, a small emergency fund prevents new debt when unexpected expenses arise.",
      action: "Build a ₹10,000 mini emergency fund while paying minimum debt payments, then focus on debt."
    },
    {
      obstacle: "\"Saving feels like deprivation\"",
      reality: "Saving is paying your future self. Reframe it as giving yourself freedom and options rather than restriction.",
      action: "Name your savings goals (\"Freedom Fund,\" \"Dream Vacation\") to make them feel rewarding."
    }
  ];

  const milestones = [
    { amount: "₹10,000", description: "Mini emergency fund. Covers minor unexpected expenses.", timeframe: "2-4 months" },
    { amount: "₹50,000", description: "One month of expenses. Provides breathing room.", timeframe: "6-12 months" },
    { amount: "₹1,50,000", description: "Three months expenses. Real financial security begins.", timeframe: "1-2 years" },
    { amount: "₹3,00,000", description: "Six months expenses. Full emergency fund complete.", timeframe: "2-3 years" },
    { amount: "₹5,00,000+", description: "Beyond emergency. Start investing for growth.", timeframe: "3-5 years" }
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
            <PiggyBank className="h-4 w-4" />
            Complete Savings Guide
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Build Your <span className="text-primary">Savings</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive guide to building savings for emergencies, goals, and financial freedom. 
            Learn strategies that work, overcome common obstacles, and create a savings habit that lasts.
          </p>
        </motion.div>

        {/* Why Save Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Saving Matters</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Saving money isn't about hoarding—it's about creating options. Financial security provides 
                  peace of mind, enables you to handle emergencies without debt, and gives you the freedom to 
                  make choices based on what you want rather than what you can barely afford.
                </p>
                <p className="leading-relaxed">
                  Studies show that people with even small savings report significantly lower stress levels. 
                  Knowing you have a financial cushion changes how you approach life's challenges and 
                  opportunities.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary">56%</div>
                    <div className="text-sm">of people can't cover a ₹50,000 emergency</div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary">78%</div>
                    <div className="text-sm">say money stress affects their health</div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary">3-6</div>
                    <div className="text-sm">months expenses is recommended emergency fund</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Types of Savings */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Types of <span className="text-primary">Savings Goals</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Different goals require different approaches. Here's how to think about your various 
              savings needs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {savingsTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                        <type.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{type.title}</h3>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {type.priority}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-3 mb-4">
                      <p className="text-sm">
                        <span className="font-semibold">Target:</span>{" "}
                        <span className="text-muted-foreground">{type.target}</span>
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Tips:</h4>
                      <ul className="space-y-1">
                        {type.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Savings Strategies */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Savings <span className="text-primary">Strategies</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Practical methods to boost your savings without feeling deprived.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savingsStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-bold">{strategy.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        strategy.difficulty === "Beginner" 
                          ? "bg-green-500/10 text-green-600" 
                          : "bg-orange-500/10 text-orange-600"
                      }`}>
                        {strategy.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{strategy.description}</p>
                    <div className="text-xs text-primary font-medium">
                      Potential: {strategy.potential}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Overcoming Obstacles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Overcoming <span className="text-primary">Obstacles</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Common excuses and how to move past them.
            </p>
          </div>

          <div className="space-y-4">
            {obstacles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{item.obstacle}</h3>
                    <p className="text-muted-foreground mb-3 leading-relaxed">{item.reality}</p>
                    <div className="bg-primary/5 rounded-lg p-3 border-l-4 border-primary">
                      <p className="text-sm">
                        <span className="font-semibold text-primary">Take Action:</span>{" "}
                        <span className="text-muted-foreground">{item.action}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6">Savings Milestones to Celebrate</h2>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0">
                      <div className="text-2xl font-bold text-primary">{milestone.amount}</div>
                      <div className="text-xs text-muted-foreground">{milestone.timeframe}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Target className="h-6 w-6 text-primary/50" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
                Track Your Savings with Trame
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Set savings goals, track your progress with visual rings, and celebrate every milestone. 
                Trame makes saving feel rewarding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={enterAsGuest}
                  size="lg"
                  className="text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary"
                >
                  Start Saving Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/budgeting-guide">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-10 py-7 rounded-2xl border-2"
                  >
                    Read Budgeting Guide
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