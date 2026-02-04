"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Shield, Lock, Globe, Zap, ArrowRight, DollarSign, Repeat, Target, 
  BarChart3, Smartphone, Laptop, CheckCircle2, TrendingUp, Wallet, 
  PieChart, Clock, Sparkles, BookOpen, GraduationCap, Calculator, 
  CreditCard, Bell, LineChart, Lightbulb, Users, Home, Briefcase,
  FileText, AlertCircle, Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";

const Welcome = () => {
  const { enterAsGuest } = useAuth();

  return (
    <>
      <SEOHead
        title="Trackora - Smart Expense Tracker & Budget Analytics Platform"
        description="Take control of your finances with Trackora. Track daily expenses, manage loans, monitor subscriptions, set savings goals, and get clear spending insights. Free to use."
        keywords="expense tracker, budget analytics, personal finance, track expenses, financial planning, savings goals, loan tracker, subscription management"
        canonicalUrl="https://trackorapp.in"
      />
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <CookieConsent />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <span className="font-bold text-xl sm:text-2xl text-foreground">
            Trackora
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              onClick={enterAsGuest} 
              variant="ghost" 
              className="hidden sm:inline-flex font-semibold"
            >
              Enter
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-16 flex flex-col items-center text-center">
        {/* Device Recommendation Notice */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-xs sm:text-sm text-muted-foreground">
            <Laptop className="h-4 w-4" />
            <span>For best experience, use laptop or tablet</span>
            <Smartphone className="h-4 w-4" />
          </div>
        </motion.div>

        {/* Featured Slogan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8 sm:mb-12 w-full max-w-4xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-3xl rounded-full" />
          <div className="relative px-4 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-sm">
            <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                "All the power of an app.
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                Without installing."
              </span>
            </p>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mb-4 sm:mb-6 px-2"
        >
          Financial Clarity.{" "}
          <span className="text-primary">Zero Stress.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-10 px-4"
        >
          Track expenses, manage debts, monitor subscriptions, and achieve your savings goals—all in one beautiful web app.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-8 sm:mb-12 w-full sm:w-auto px-4 sm:px-0"
        >
          <Button
            onClick={enterAsGuest}
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 rounded-xl sm:rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Start Free Today
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={enterAsGuest}
            className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 rounded-xl sm:rounded-2xl border-2 border-primary/50 hover:bg-primary/10 font-semibold"
          >
            Enter
          </Button>
        </motion.div>

        {/* Support Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/30 mx-4"
        >
          <p className="text-xs sm:text-sm font-medium">
            <span className="text-primary font-bold">✓ Free to Use</span>{" "}
            — Questions? Contact{" "}
            <a href="mailto:pla.team@cadliotech.com" className="text-primary underline font-semibold">
              pla.team@cadliotech.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* What is Trackora Section - Educational Introduction */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              What is Trackora?
            </h2>
            <div className="text-base sm:text-lg text-muted-foreground space-y-4 text-left">
              <p>
                <strong className="text-foreground">Trackora is a comprehensive personal finance management platform</strong> designed to help individuals and families take complete control of their money. Unlike simple expense trackers that only record transactions, Trackora provides a complete financial ecosystem where you can manage daily expenses, track multiple income sources, monitor loan repayments, control subscription costs, and work toward meaningful savings goals.
              </p>
              <p>
                Whether you're a college student managing a tight budget, a working professional juggling multiple financial responsibilities, or a family planning for the future, Trackora adapts to your unique financial situation. The platform is built on the principle that financial clarity leads to better decisions, and better decisions lead to financial freedom.
              </p>
              <p>
                <strong className="text-foreground">Key benefits you'll experience:</strong> Instantly see where your money goes each month, identify spending patterns you weren't aware of, receive gentle alerts before subscription renewals, track your debt payoff journey with visual progress indicators, and celebrate milestones as you reach your savings targets.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Expense Tracking Matters - Educational Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Lightbulb className="h-4 w-4" />
              Financial Education
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why Tracking Expenses Matters
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-3xl mx-auto">
              Understanding where your money goes is the foundation of financial wellness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold">The Problem</h3>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      Studies show that most people have no clear idea where their money actually goes. Small daily purchases—a coffee here, a snack there, an impulse buy online—add up to hundreds or even thousands of rupees each month that simply "disappear."
                    </p>
                    <p>
                      Without tracking, you might believe you're spending ₹5,000 on food when you're actually spending ₹12,000. This gap between perception and reality prevents people from saving money, paying off debts, and reaching their financial goals.
                    </p>
                    <p>
                      Many people avoid tracking because traditional methods are tedious—spreadsheets are time-consuming, and most apps are either too complex or too limited. This creates a cycle where financial awareness remains low, and improvement feels impossible.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-primary/20">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">The Solution</h3>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Trackora makes financial awareness effortless.</strong> By providing quick-add features, intelligent categorization, and beautiful visualizations, tracking becomes a natural part of your daily routine—taking seconds, not minutes.
                    </p>
                    <p>
                      When you can clearly see that dining out costs ₹8,000/month while groceries cost ₹4,000, you gain the power to make informed choices. Maybe you decide to cook more often, or maybe you realize dining out brings you joy worth the cost. Either way, you're in control.
                    </p>
                    <p>
                      Research shows that simply becoming aware of spending patterns leads to natural reduction in unnecessary expenses—typically 15-20% savings without any strict budgeting rules. Trackora gives you this awareness without the complexity.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Features Section - High Value Content */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Complete Financial Management Features
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-3xl mx-auto">
              Every tool you need to understand, manage, and grow your finances—explained in detail
            </p>
          </motion.div>

          {/* Feature 1: Expense Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                      <Wallet className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      💰 Smart Expense Tracking
                    </h3>
                    <p className="text-primary font-medium">
                      Every rupee accounted for—without effort
                    </p>
                  </div>
                  <div className="lg:col-span-3 p-8">
                    <div className="space-y-4 text-muted-foreground mb-6">
                      <p>
                        <strong className="text-foreground">Trackora helps you record daily expenses such as food, travel, bills, shopping, and entertainment with minimal effort.</strong> By automatically categorizing transactions, you can identify spending habits and reduce unnecessary costs without spending hours on manual data entry.
                      </p>
                      <p>
                        The quick-add feature allows you to log expenses in under 5 seconds. Simply enter the amount, select a category (or let Trackora suggest one based on your history), and add an optional note. That's it—your expense is recorded and immediately reflected in your monthly totals and analytics.
                      </p>
                      <p>
                        Color-coded categories make visual scanning effortless. At a glance, you can see how much you've spent on groceries versus dining out, or how transportation costs compare to entertainment. This visual clarity helps you make quick, informed decisions about your spending.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Quick-add buttons for common expenses",
                        "Intelligent auto-categorization",
                        "Color-coded category visualization",
                        "Add notes and custom tags",
                        "Filter by date, category, or amount",
                        "Edit or delete any transaction easily"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 2: Income Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 bg-gradient-to-br from-secondary/20 to-accent/20 p-8 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
                      <TrendingUp className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      📈 Income Tracking
                    </h3>
                    <p className="text-secondary font-medium">
                      See the complete picture of your earnings
                    </p>
                  </div>
                  <div className="lg:col-span-3 p-8">
                    <div className="space-y-4 text-muted-foreground mb-6">
                      <p>
                        <strong className="text-foreground">Understanding your income is just as important as tracking expenses.</strong> Trackora allows you to record all your income sources—salary, freelance payments, rental income, dividends, gifts, and more—giving you a complete picture of your cash flow.
                      </p>
                      <p>
                        For freelancers and gig workers with variable income, Trackora helps identify patterns. You can see which months are typically higher or lower, plan for lean periods, and calculate your true average monthly income for better budgeting.
                      </p>
                      <p>
                        The income vs. expense comparison shows you exactly how much you're saving (or overspending) each month. This single metric is the foundation of wealth building—knowing whether you're moving forward or falling behind financially.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Track multiple income sources",
                        "Categorize by type (salary, freelance, etc.)",
                        "Monthly income summaries",
                        "Income vs expense comparison",
                        "Identify seasonal patterns",
                        "Plan for variable income"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 3: Loans & Debts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 bg-gradient-to-br from-accent/20 to-primary/20 p-8 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
                      <DollarSign className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      💳 Loans & Debt Tracker
                    </h3>
                    <p className="text-accent font-medium">
                      Breathe easy with complete debt visibility
                    </p>
                  </div>
                  <div className="lg:col-span-3 p-8">
                    <div className="space-y-4 text-muted-foreground mb-6">
                      <p>
                        <strong className="text-foreground">Managing debt shouldn't feel overwhelming.</strong> Trackora makes it calm and clear by bringing all your loans into one unified view—personal loans, student loans, home loans, car loans, and credit card balances.
                      </p>
                      <p>
                        For each loan, you can track the principal amount, interest rate, monthly EMI, and remaining balance. Trackora calculates how much interest you've paid, how much is remaining, and when you'll be debt-free if you continue current payments.
                      </p>
                      <p>
                        Visual progress bars show your payoff journey, turning what feels like an endless burden into a manageable path with a clear destination. Seeing your debt decrease month by month provides motivation to stay on track or even accelerate payments.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Track all loan types in one place",
                        "Monitor interest rates and total interest paid",
                        "EMI payment reminders",
                        "Visualize debt payoff timelines",
                        "Track multiple creditors",
                        "Calculate total debt burden"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 4: Subscriptions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                      <Repeat className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      🔄 Subscription Management
                    </h3>
                    <p className="text-primary font-medium">
                      No more surprise charges—ever
                    </p>
                  </div>
                  <div className="lg:col-span-3 p-8">
                    <div className="space-y-4 text-muted-foreground mb-6">
                      <p>
                        <strong className="text-foreground">The average person spends ₹2,000-5,000 monthly on subscriptions they barely use.</strong> Streaming services, gym memberships, software tools, cloud storage, magazines—these recurring charges silently drain your bank account without you even noticing.
                      </p>
                      <p>
                        Trackora gives you a unified view of all your subscriptions with their costs and renewal dates. Before each renewal, you receive a notification asking: "Do you still need this?" This simple prompt has helped users cancel forgotten subscriptions worth thousands of rupees per year.
                      </p>
                      <p>
                        The subscription dashboard shows your total monthly and yearly subscription costs. Many users are shocked to discover they're spending ₹40,000+ annually on subscriptions—money that could go toward savings, investments, or experiences that truly matter.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "All subscriptions in one view",
                        "Alerts before auto-renewals",
                        "Total monthly & yearly costs",
                        "Identify unused subscriptions",
                        "Track billing cycles",
                        "Different payment method tracking"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 5: Savings Goals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 bg-gradient-to-br from-secondary/20 to-primary/20 p-8 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      🎯 Savings Goals
                    </h3>
                    <p className="text-secondary font-medium">
                      Celebrate every step toward your dreams
                    </p>
                  </div>
                  <div className="lg:col-span-3 p-8">
                    <div className="space-y-4 text-muted-foreground mb-6">
                      <p>
                        <strong className="text-foreground">Saving money becomes exciting when you have clear goals to work toward.</strong> Trackora lets you create custom savings goals for anything—an emergency fund, dream vacation, new laptop, wedding, home down payment, or your child's education.
                      </p>
                      <p>
                        Each goal has a target amount and optional deadline. Visual progress rings show how close you are, making every contribution feel rewarding. Research shows that visualizing progress increases the likelihood of reaching goals by over 40%.
                      </p>
                      <p>
                        Trackora provides gentle encouragement and celebrates milestones. Reached 25% of your goal? You'll see a congratulatory message. Hit 50%? The progress ring glows brighter. These small celebrations maintain motivation over the months or years it takes to reach major financial goals.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Create unlimited savings goals",
                        "Visual progress rings",
                        "Set target amounts and deadlines",
                        "Track contributions over time",
                        "Milestone celebrations",
                        "Priority ordering for multiple goals"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 6: Budget Planning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 bg-gradient-to-br from-accent/20 to-secondary/20 p-8 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
                      <Calculator className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      📊 Budget Planning
                    </h3>
                    <p className="text-accent font-medium">
                      Spend intentionally, not accidentally
                    </p>
                  </div>
                  <div className="lg:col-span-3 p-8">
                    <div className="space-y-4 text-muted-foreground mb-6">
                      <p>
                        <strong className="text-foreground">A budget isn't about restriction—it's about giving every rupee a purpose.</strong> Trackora's budget planning feature helps you allocate your income across different categories, ensuring you're spending on what truly matters to you.
                      </p>
                      <p>
                        Set monthly limits for each category (Food: ₹8,000, Transport: ₹3,000, Entertainment: ₹2,000) or an overall monthly spending limit. As you track expenses, progress bars show how much you've spent versus your limit, with gentle color changes as you approach boundaries.
                      </p>
                      <p>
                        The system is designed to be encouraging, not punitive. Instead of harsh "You're over budget!" warnings, Trackora uses positive language like "You're doing great this month!" or "Consider slowing down on dining out to stay on track." This approach helps build sustainable habits without creating financial anxiety.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Category-wise budget limits",
                        "Overall monthly spending limits",
                        "Visual progress bars",
                        "Gentle approaching-limit alerts",
                        "Historical budget comparison",
                        "Auto-suggestions based on history"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 7: Analytics & Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      📈 Analytics & Insights
                    </h3>
                    <p className="text-primary font-medium">
                      Numbers that help, not stress
                    </p>
                  </div>
                  <div className="lg:col-span-3 p-8">
                    <div className="space-y-4 text-muted-foreground mb-6">
                      <p>
                        <strong className="text-foreground">Data becomes powerful when it's presented clearly.</strong> Trackora transforms your financial data into beautiful, easy-to-understand charts and visualizations that reveal patterns you might never notice otherwise.
                      </p>
                      <p>
                        See monthly spending breakdowns by category with colorful pie charts. Compare income vs expenses over time with trend lines. Identify which months you tend to overspend (holiday season? Summer vacations?) and prepare accordingly.
                      </p>
                      <p>
                        The analytics dashboard shows you insights like "You spent 35% more on dining out this month compared to last month" or "Your utility bills have increased 20% over the past quarter." These actionable insights help you spot issues early and make informed adjustments.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Category spending breakdown",
                        "Monthly trend analysis",
                        "Income vs expense comparison",
                        "Spending pattern identification",
                        "Export reports (CSV/JSON)",
                        "Historical data access"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Who Uses Trackora - Use Cases */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Who Uses Trackora?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-3xl mx-auto">
              Real people with real financial goals—Trackora adapts to every situation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Students",
                description: "Managing limited budgets on hostel fees, food, books, and entertainment while building financial habits that last a lifetime. Track part-time job income, control impulse spending, and save for future goals.",
                color: "primary"
              },
              {
                icon: Briefcase,
                title: "Working Professionals",
                description: "Balancing salary, bonuses, and side income while managing EMIs, rent, subscriptions, and lifestyle expenses. Trackora helps you see where your paycheck actually goes each month.",
                color: "secondary"
              },
              {
                icon: Home,
                title: "Families",
                description: "Managing household budgets, children's education expenses, family vacations, and long-term savings. Coordinate spending across family members and plan for major milestones together.",
                color: "accent"
              },
              {
                icon: Users,
                title: "Freelancers",
                description: "Handling variable income, tracking business expenses for tax purposes, and maintaining financial stability despite irregular payment schedules. Know your true monthly average and plan accordingly.",
                color: "primary"
              },
              {
                icon: CreditCard,
                title: "Debt-Free Seekers",
                description: "Actively paying down loans, credit cards, or other debts. Use the loan tracker to visualize your payoff journey, stay motivated, and accelerate your path to financial freedom.",
                color: "secondary"
              },
              {
                icon: Target,
                title: "Goal Setters",
                description: "Saving for specific targets—dream vacations, new gadgets, wedding, home down payment, or emergency funds. Visual progress tracking keeps you motivated and on track.",
                color: "accent"
              }
            ].map((useCase, idx) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`h-full hover:shadow-lg transition-shadow border-l-4 border-l-${useCase.color}`}>
                  <CardContent className="p-6">
                    <div className={`p-3 rounded-lg bg-${useCase.color}/10 w-fit mb-4`}>
                      <useCase.icon className={`h-6 w-6 text-${useCase.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{useCase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-foreground to-foreground/95 text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-background">
              Security & Privacy You Can Trust
            </h2>
            <p className="text-background/70 text-sm sm:text-lg max-w-3xl mx-auto">
              Your financial data deserves bank-level protection—and that's exactly what we provide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Shield, title: "256-bit Encryption", desc: "The same encryption standard used by major banks protects all your data in transit and at rest." },
              { icon: Lock, title: "Privacy First", desc: "We never sell or share your data. Your financial information belongs to you and only you." },
              { icon: Globe, title: "GDPR & CCPA Compliant", desc: "Full compliance with international data protection regulations. Exercise your data rights anytime." },
              { icon: Zap, title: "Secure Sync", desc: "Access your data from any device with automatic encryption and secure authentication." }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 rounded-2xl bg-background/10 border border-background/20"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-background mb-2">{item.title}</h3>
                <p className="text-background/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-background/80 leading-relaxed">
              We understand that financial data is among the most sensitive information you have. That's why security isn't an afterthought at Trackora—it's foundational to everything we build. From encrypted storage to secure authentication, every aspect of our platform is designed with your protection in mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              How to Get Started
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg">
              Three simple steps to financial clarity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                step: "1", 
                title: "Create Your Free Account", 
                desc: "Sign up with just your email address. No credit card required, no hidden fees. Your account is protected with bank-level encryption from day one." 
              },
              { 
                step: "2", 
                title: "Add Your Financial Data", 
                desc: "Log your expenses, income sources, active subscriptions, outstanding loans, and savings goals. The quick-add features make data entry fast and painless." 
              },
              { 
                step: "3", 
                title: "Track & Improve", 
                desc: "Watch your finances come into focus. View analytics, track progress toward goals, and make informed decisions that build long-term wealth." 
              }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Read Full Step-by-Step Guide
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Educational Resources Preview */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Free Resources</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Learn & Grow Your Financial Knowledge
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
              Trackora is more than a tool—it's a learning platform. Explore our guides and articles to build lasting financial skills.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: BookOpen, title: "Budgeting Guide", desc: "Master the art of creating and maintaining budgets that work for your lifestyle", link: "/budgeting-guide" },
              { icon: Target, title: "Savings Guide", desc: "Proven strategies for building savings and reaching your financial goals faster", link: "/savings-guide" },
              { icon: CreditCard, title: "Debt Management", desc: "Effective strategies for paying off debt and achieving financial freedom", link: "/debt-management-guide" },
              { icon: FileText, title: "Finance Blog", desc: "Articles on personal finance, expense tracking, and money management tips", link: "/blog" }
            ].map((resource, idx) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={resource.link}>
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                        <resource.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-2 border-primary/20 overflow-hidden">
              <CardContent className="p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Ready to Take Control of Your Finances?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands who have transformed their relationship with money. 
                  Start your journey to financial clarity today—it's completely free.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={enterAsGuest}
                    size="lg"
                    className="text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Link to="/faq">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-10 py-7 rounded-2xl border-2"
                    >
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Welcome;
