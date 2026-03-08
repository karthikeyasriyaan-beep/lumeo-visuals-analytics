"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Shield, Lock, Globe, Zap, ArrowRight, DollarSign, Repeat, Target, 
  BarChart3, Smartphone, Laptop, CheckCircle2, TrendingUp, Wallet, 
  PieChart, Clock, Sparkles, BookOpen, GraduationCap, Calculator, 
  CreditCard, Bell, LineChart, Lightbulb, Users, Home, Briefcase,
  FileText, AlertCircle, Calendar, ChevronRight, Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";
import { useRef } from "react";
import dashboardPreview from "../assets/dashboard-preview.png";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const FeatureCheckItem = ({ text }: { text: string; color?: string }) => (
  <motion.div variants={fadeUp} className="flex items-start gap-3 group">
    <div className="mt-0.5 p-1 rounded-md bg-foreground/10 group-hover:bg-foreground/20 transition-colors">
      <CheckCircle2 className="h-3.5 w-3.5 text-foreground" />
    </div>
    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">{text}</span>
  </motion.div>
);

const Welcome = () => {
  const { enterAsGuest } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
      
      {/* Floating Header — Sleek Matte */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-4 sm:mx-6 mt-3 sm:mt-4">
          <div className="bg-background/70 backdrop-blur-3xl border border-border/30 rounded-2xl shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between max-w-6xl mx-auto">
            <span className="font-extrabold text-xl sm:text-2xl text-foreground tracking-tighter">
              Trackora
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                onClick={enterAsGuest} 
                variant="ghost" 
                className="hidden sm:inline-flex font-bold text-sm tracking-tight"
              >
                Enter
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section — Bold & Minimal */}
      <section ref={heroRef} className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden">
        {/* Minimal accent lines */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-6xl mx-auto">
            {/* Left — Content */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.05] mb-7"
              >
                Track Your Daily Expenses{" "}
                <span className="text-muted-foreground">
                  Clearly and Effortlessly
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7 max-w-xl font-medium"
              >
                Trackora is a simple expense tracking platform designed to help people record daily spending and understand where their money goes. By keeping all expenses organized in one place, Trackora makes it easier to monitor spending habits and manage personal finances without complicated tools.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 text-sm font-bold text-foreground/60 mb-10 tracking-wide uppercase"
              >
                <span>Simple tracking</span>
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                <span>Clear summaries</span>
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                <span>Personal finance</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <Button
                  onClick={enterAsGuest}
                  size="lg"
                  className="text-base px-10 py-7 rounded-xl font-extrabold tracking-tight shadow-lg hover:shadow-xl transition-all group"
                >
                  Start Tracking
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
                <Link to="/how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base px-10 py-7 rounded-xl border-2 font-bold tracking-tight w-full sm:w-auto hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    Learn How It Works
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-sm text-muted-foreground leading-relaxed max-w-lg font-medium"
              >
                Trackora is designed to help individuals build better financial awareness by keeping daily expenses organized and easy to review.
              </motion.p>
            </motion.div>

            {/* Right — Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-card">
                <img
                  src={dashboardPreview}
                  alt="Trackora dashboard showing expense list, spending categories pie chart, and budget summary cards"
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="text-xs sm:text-sm text-muted-foreground text-center mt-6 max-w-md mx-auto leading-relaxed font-medium"
              >
                A simple dashboard that shows your expenses, spending categories, and financial summaries in one clear view.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Trackora — Magazine-Style */}
      <section className="py-24 sm:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-muted/20 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
                <Sparkles className="h-4 w-4" />
                About Trackora
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                What is Trackora?
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              <motion.div variants={fadeUp} custom={0}>
                <div className="h-full rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Complete Finance Platform</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    <strong className="text-foreground">Trackora is a comprehensive personal finance management platform</strong> designed to help individuals and families take complete control of their money. Unlike simple expense trackers that only record transactions, Trackora provides a complete financial ecosystem where you can manage daily expenses, track multiple income sources, monitor loan repayments, control subscription costs, and work toward meaningful savings goals.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={1}>
                <div className="h-full rounded-3xl bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/15 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center mb-5">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">For Everyone</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Whether you're a college student managing a tight budget, a working professional juggling multiple financial responsibilities, or a family planning for the future, Trackora adapts to your unique financial situation. The platform is built on the principle that <strong className="text-foreground">financial clarity leads to better decisions</strong>, and better decisions lead to financial freedom.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={2}>
                <div className="h-full rounded-3xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/15 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center mb-5">
                    <Lightbulb className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Powerful Insights</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    <strong className="text-foreground">Key benefits you'll experience:</strong> Instantly see where your money goes each month, identify spending patterns you weren't aware of, receive gentle alerts before subscription renewals, track your debt payoff journey with visual progress indicators, and celebrate milestones as you reach your savings targets.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Expense Tracking Matters — Split Screen */}
      <section className="py-24 sm:py-36">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
                <Lightbulb className="h-4 w-4" />
                Financial Education
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Why Tracking Expenses Matters
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
                Understanding where your money goes is the foundation of financial wellness
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Problem */}
              <motion.div variants={slideInLeft}>
                <div className="h-full rounded-3xl border-2 border-destructive/15 bg-gradient-to-br from-destructive/3 to-transparent p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-destructive/10">
                      <AlertCircle className="h-7 w-7 text-destructive" />
                    </div>
                    <h3 className="text-2xl font-bold">The Problem</h3>
                  </div>
                  <div className="space-y-5">
                    <p className="text-muted-foreground leading-relaxed">
                      Studies show that most people have no clear idea where their money actually goes. Small daily purchases—a coffee here, a snack there, an impulse buy online—add up to <strong className="text-foreground">hundreds or even thousands of rupees</strong> each month that simply "disappear."
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Without tracking, you might believe you're spending ₹5,000 on food when you're actually spending ₹12,000. This <strong className="text-foreground">gap between perception and reality</strong> prevents people from saving money, paying off debts, and reaching their financial goals.
                    </p>
                    <div className="rounded-2xl bg-destructive/5 p-5 border border-destructive/10">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        💡 Many people avoid tracking because traditional methods are tedious—spreadsheets are time-consuming, and most apps are either too complex or too limited. This creates a cycle where financial awareness remains low.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Solution */}
              <motion.div variants={slideInRight}>
                <div className="h-full rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/3 to-transparent p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-primary/10">
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">The Solution</h3>
                  </div>
                  <div className="space-y-5">
                    <p className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Trackora makes financial awareness effortless.</strong> By providing quick-add features, intelligent categorization, and beautiful visualizations, tracking becomes a natural part of your daily routine—taking seconds, not minutes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      When you can clearly see that dining out costs ₹8,000/month while groceries cost ₹4,000, you gain the power to make <strong className="text-foreground">informed choices</strong>. Maybe you decide to cook more often, or maybe you realize dining out brings you joy worth the cost. Either way, you're in control.
                    </p>
                    <div className="rounded-2xl bg-primary/5 p-5 border border-primary/10">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        📊 Research shows that simply becoming aware of spending patterns leads to a natural <strong className="text-foreground">15-20% reduction</strong> in unnecessary expenses—without any strict budgeting rules.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section — Alternating Layout */}
      <section className="py-24 sm:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/10 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Complete Financial Management
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
              Every tool you need to understand, manage, and grow your finances—explained in detail
            </p>
          </motion.div>

          {/* Feature 1: Expense Tracking */}
          <FeatureBlock
            icon={Wallet}
            emoji="💰"
            title="Smart Expense Tracking"
            subtitle="Every rupee accounted for—without effort"
            color="primary"
            reverse={false}
            paragraphs={[
              { text: <><strong className="text-foreground">Record daily expenses with minimal effort.</strong> By automatically categorizing transactions, you can identify spending habits and reduce unnecessary costs without spending hours on manual data entry.</> },
              { text: <>⚡ The quick-add feature lets you log expenses in <strong className="text-foreground">under 5 seconds</strong>. Enter the amount, select a category, add an optional note—done. Immediately reflected in your analytics.</>, highlight: true },
              { text: <>Color-coded categories make visual scanning effortless. At a glance, see how much you've spent on groceries versus dining out, or how transportation costs compare to entertainment.</> },
            ]}
            checks={[
              "Quick-add buttons for common expenses",
              "Intelligent auto-categorization",
              "Color-coded category visualization",
              "Add notes and custom tags",
              "Filter by date, category, or amount",
              "Edit or delete any transaction easily"
            ]}
          />

          {/* Feature 2: Income Tracking */}
          <FeatureBlock
            icon={TrendingUp}
            emoji="📈"
            title="Income Tracking"
            subtitle="See the complete picture of your earnings"
            color="secondary"
            reverse={true}
            paragraphs={[
              { text: <><strong className="text-foreground">Understanding your income is just as important as tracking expenses.</strong> Record all your income sources—salary, freelance payments, rental income, dividends, gifts—giving you a complete picture of your cash flow.</> },
              { text: <>📈 For freelancers and gig workers: identify which months are typically higher or lower, plan for lean periods, and calculate your <strong className="text-foreground">true average monthly income</strong> for better budgeting.</>, highlight: true },
              { text: <>The income vs. expense comparison shows you exactly how much you're saving (or overspending) each month—the <strong className="text-foreground">foundation of wealth building</strong>.</> },
            ]}
            checks={[
              "Track multiple income sources",
              "Categorize by type (salary, freelance, etc.)",
              "Monthly income summaries",
              "Income vs expense comparison",
              "Identify seasonal patterns",
              "Plan for variable income"
            ]}
          />

          {/* Feature 3: Loans */}
          <FeatureBlock
            icon={DollarSign}
            emoji="💳"
            title="Loans & Debt Tracker"
            subtitle="Breathe easy with complete debt visibility"
            color="accent"
            reverse={false}
            paragraphs={[
              { text: <><strong className="text-foreground">Managing debt shouldn't feel overwhelming.</strong> Trackora brings all your loans into one unified view—personal loans, student loans, home loans, car loans, and credit card balances.</> },
              { text: <>🎯 Track principal amount, interest rate, monthly EMI, and remaining balance. Know exactly <strong className="text-foreground">when you'll be debt-free</strong> if you continue current payments.</>, highlight: true },
              { text: <>Visual progress bars turn what feels like an endless burden into a <strong className="text-foreground">manageable path with a clear destination</strong>. Seeing debt decrease month by month provides motivation to stay on track.</> },
            ]}
            checks={[
              "Track all loan types in one place",
              "Monitor interest rates and total interest paid",
              "EMI payment reminders",
              "Visualize debt payoff timelines",
              "Track multiple creditors",
              "Calculate total debt burden"
            ]}
          />

          {/* Feature 4: Subscriptions */}
          <FeatureBlock
            icon={Repeat}
            emoji="🔄"
            title="Subscription Management"
            subtitle="No more surprise charges—ever"
            color="primary"
            reverse={true}
            paragraphs={[
              { text: <>⚠️ <strong className="text-foreground">The average person spends ₹2,000-5,000 monthly</strong> on subscriptions they barely use. Streaming, gym, software, cloud storage—these charges silently drain your account.</>, highlight: true, highlightColor: "warning" },
              { text: <>Trackora gives you a unified view with costs and renewal dates. Before each renewal: <strong className="text-foreground">"Do you still need this?"</strong> This simple prompt has helped users save thousands per year.</> },
              { text: <>Many users are shocked to discover they're spending <strong className="text-foreground">₹40,000+ annually</strong> on subscriptions—money that could go toward savings, investments, or experiences that truly matter.</> },
            ]}
            checks={[
              "All subscriptions in one view",
              "Alerts before auto-renewals",
              "Total monthly & yearly costs",
              "Identify unused subscriptions",
              "Track billing cycles",
              "Different payment method tracking"
            ]}
          />

          {/* Feature 5: Savings */}
          <FeatureBlock
            icon={Target}
            emoji="🎯"
            title="Savings Goals"
            subtitle="Celebrate every step toward your dreams"
            color="secondary"
            reverse={false}
            paragraphs={[
              { text: <><strong className="text-foreground">Saving becomes exciting with clear goals.</strong> Create custom goals for anything—emergency fund, dream vacation, new laptop, wedding, home down payment, or your child's education.</> },
              { text: <>🏆 Visualizing progress increases the likelihood of reaching goals by <strong className="text-foreground">over 40%</strong>. Progress rings make every contribution feel rewarding.</>, highlight: true },
              { text: <>Reached 25%? Congratulatory message. Hit 50%? The progress ring glows brighter. These <strong className="text-foreground">small celebrations maintain motivation</strong> over the months it takes to reach major financial goals.</> },
            ]}
            checks={[
              "Create unlimited savings goals",
              "Visual progress rings",
              "Set target amounts and deadlines",
              "Track contributions over time",
              "Milestone celebrations",
              "Priority ordering for multiple goals"
            ]}
          />

          {/* Feature 6: Budget */}
          <FeatureBlock
            icon={Calculator}
            emoji="📊"
            title="Budget Planning"
            subtitle="Spend intentionally, not accidentally"
            color="accent"
            reverse={true}
            paragraphs={[
              { text: <><strong className="text-foreground">A budget isn't about restriction—it's about giving every rupee a purpose.</strong> Allocate income across categories, ensuring you spend on what truly matters to you.</> },
              { text: <>📋 Set limits per category (Food: ₹8,000, Transport: ₹3,000, Entertainment: ₹2,000) or an <strong className="text-foreground">overall monthly spending limit</strong>. Progress bars show how close you are with gentle color changes.</>, highlight: true },
              { text: <>Designed to be <strong className="text-foreground">encouraging, not punitive</strong>. Instead of harsh warnings, Trackora uses positive language like "You're doing great!" to build sustainable habits without financial anxiety.</> },
            ]}
            checks={[
              "Category-wise budget limits",
              "Overall monthly spending limits",
              "Visual progress bars",
              "Gentle approaching-limit alerts",
              "Historical budget comparison",
              "Auto-suggestions based on history"
            ]}
          />

          {/* Feature 7: Analytics */}
          <FeatureBlock
            icon={BarChart3}
            emoji="📈"
            title="Analytics & Insights"
            subtitle="Numbers that help, not stress"
            color="primary"
            reverse={false}
            paragraphs={[
              { text: <><strong className="text-foreground">Data becomes powerful when presented clearly.</strong> Beautiful charts and visualizations reveal patterns you might never notice otherwise.</> },
              { text: <>Colorful pie charts for category breakdowns. Trend lines for income vs expenses. Identify which months you tend to <strong className="text-foreground">overspend</strong> and prepare accordingly.</> },
              { text: <>💡 Insights like <strong className="text-foreground">"You spent 35% more on dining out this month"</strong> help you spot issues early and make informed adjustments.</>, highlight: true },
            ]}
            checks={[
              "Category spending breakdown",
              "Monthly trend analysis",
              "Income vs expense comparison",
              "Spending pattern identification",
              "Export reports (CSV/JSON)",
              "Historical data access"
            ]}
            isLast
          />
        </div>
      </section>

      {/* Who Uses Trackora — Bento Grid */}
      <section className="py-24 sm:py-36">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Who Uses Trackora?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
                Real people with real financial goals—Trackora adapts to every situation
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: GraduationCap,
                  title: "Students",
                  description: "Managing limited budgets on hostel fees, food, books, and entertainment while building financial habits that last a lifetime. Track part-time job income, control impulse spending, and save for future goals.",
                  gradient: "from-primary/10 to-primary/5",
                  borderColor: "border-primary/20",
                  iconBg: "bg-primary/15",
                  iconColor: "text-primary"
                },
                {
                  icon: Briefcase,
                  title: "Working Professionals",
                  description: "Balancing salary, bonuses, and side income while managing EMIs, rent, subscriptions, and lifestyle expenses. Trackora helps you see where your paycheck actually goes each month.",
                  gradient: "from-secondary/10 to-secondary/5",
                  borderColor: "border-secondary/20",
                  iconBg: "bg-secondary/15",
                  iconColor: "text-secondary"
                },
                {
                  icon: Home,
                  title: "Families",
                  description: "Managing household budgets, children's education expenses, family vacations, and long-term savings. Coordinate spending across family members and plan for major milestones together.",
                  gradient: "from-accent/10 to-accent/5",
                  borderColor: "border-accent/20",
                  iconBg: "bg-accent/15",
                  iconColor: "text-accent"
                },
                {
                  icon: Users,
                  title: "Freelancers",
                  description: "Handling variable income, tracking business expenses for tax purposes, and maintaining financial stability despite irregular payment schedules. Know your true monthly average and plan accordingly.",
                  gradient: "from-primary/10 to-primary/5",
                  borderColor: "border-primary/20",
                  iconBg: "bg-primary/15",
                  iconColor: "text-primary"
                },
                {
                  icon: CreditCard,
                  title: "Debt-Free Seekers",
                  description: "Actively paying down loans, credit cards, or other debts. Use the loan tracker to visualize your payoff journey, stay motivated, and accelerate your path to financial freedom.",
                  gradient: "from-secondary/10 to-secondary/5",
                  borderColor: "border-secondary/20",
                  iconBg: "bg-secondary/15",
                  iconColor: "text-secondary"
                },
                {
                  icon: Target,
                  title: "Goal Setters",
                  description: "Saving for specific targets—dream vacations, new gadgets, wedding, home down payment, or emergency funds. Visual progress tracking keeps you motivated and on track.",
                  gradient: "from-accent/10 to-accent/5",
                  borderColor: "border-accent/20",
                  iconBg: "bg-accent/15",
                  iconColor: "text-accent"
                }
              ].map((useCase, idx) => (
                <motion.div
                  key={useCase.title}
                  variants={scaleIn}
                  custom={idx}
                >
                  <div className={`h-full rounded-3xl bg-gradient-to-br ${useCase.gradient} border ${useCase.borderColor} p-7 hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
                    <div className={`p-3 rounded-2xl ${useCase.iconBg} w-fit mb-5`}>
                      <useCase.icon className={`h-6 w-6 ${useCase.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{useCase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security — Dark Immersive */}
      <section className="py-24 sm:py-36 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-background">
                Security & Privacy You Can Trust
              </h2>
              <p className="text-background/60 text-base sm:text-lg max-w-3xl mx-auto">
                Your financial data deserves bank-level protection—and that's exactly what we provide
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Shield, title: "256-bit Encryption", desc: "The same encryption standard used by major banks protects all your data in transit and at rest." },
                { icon: Lock, title: "Privacy First", desc: "We never sell or share your data. Your financial information belongs to you and only you." },
                { icon: Globe, title: "GDPR & CCPA Compliant", desc: "Full compliance with international data protection regulations. Exercise your data rights anytime." },
                { icon: Zap, title: "Secure Sync", desc: "Access your data from any device with automatic encryption and secure authentication." }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  custom={idx}
                  className="text-center p-7 rounded-3xl bg-background/5 border border-background/10 hover:bg-background/10 transition-all duration-500"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-background mb-2">{item.title}</h3>
                  <p className="text-background/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="max-w-3xl mx-auto text-center">
              <p className="text-background/70 leading-relaxed">
                We understand that financial data is among the most sensitive information you have. That's why security isn't an afterthought at Trackora—it's foundational to everything we build. From encrypted storage to secure authentication, every aspect of our platform is designed with your protection in mind.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How to Get Started — Timeline */}
      <section className="py-24 sm:py-36">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                How to Get Started
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Three simple steps to financial clarity
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" />
                
                {[
                  { 
                    step: "1", 
                    title: "Create Your Free Account", 
                    desc: "Sign up with just your email address. No credit card required, no hidden fees. Your account is protected with bank-level encryption from day one.",
                    gradient: "from-primary to-primary/80"
                  },
                  { 
                    step: "2", 
                    title: "Add Your Financial Data", 
                    desc: "Log your expenses, income sources, active subscriptions, outstanding loans, and savings goals. The quick-add features make data entry fast and painless.",
                    gradient: "from-secondary to-secondary/80"
                  },
                  { 
                    step: "3", 
                    title: "Track & Improve", 
                    desc: "Watch your finances come into focus. View analytics, track progress toward goals, and make informed decisions that build long-term wealth.",
                    gradient: "from-accent to-accent/80"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.step}
                    variants={fadeUp}
                    custom={idx}
                    className="text-center relative"
                  >
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-xl relative z-10`}>
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={fadeUp} className="text-center mt-14">
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="gap-2 rounded-2xl border-2 px-8 py-6">
                  <BookOpen className="h-5 w-5" />
                  Read Full Step-by-Step Guide
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-24 sm:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/10 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Free Resources</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Learn & Grow Your Financial Knowledge
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Trackora is more than a tool—it's a learning platform. Explore our guides and articles to build lasting financial skills.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: BookOpen, title: "Budgeting Guide", desc: "Master the art of creating and maintaining budgets that work for your lifestyle", link: "/budgeting-guide" },
                { icon: Target, title: "Savings Guide", desc: "Proven strategies for building savings and reaching your financial goals faster", link: "/savings-guide" },
                { icon: CreditCard, title: "Debt Management", desc: "Effective strategies for paying off debt and achieving financial freedom", link: "/debt-management-guide" },
                { icon: FileText, title: "Finance Blog", desc: "Articles on personal finance, expense tracking, and money management tips", link: "/blog" }
              ].map((resource, idx) => (
                <motion.div key={resource.title} variants={scaleIn} custom={idx}>
                  <Link to={resource.link}>
                    <div className="h-full rounded-3xl border border-border/60 bg-card p-7 hover:shadow-xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 group cursor-pointer">
                      <div className="p-3 rounded-2xl bg-primary/10 w-fit mb-5 group-hover:bg-primary/15 transition-colors">
                        <resource.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{resource.desc}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA — Gradient Card */}
      <section className="py-24 sm:py-36">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative rounded-[2rem] overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15" />
              <div className="absolute inset-0 border-2 border-primary/20 rounded-[2rem]" />
              
              <div className="relative p-10 sm:p-16 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
                  Ready to Take Control of Your Finances?
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join thousands who have transformed their relationship with money. 
                  Start your journey to financial clarity today—it's completely free.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={enterAsGuest}
                    size="lg"
                    className="text-lg px-12 py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-primary to-secondary group"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Link to="/faq">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-12 py-7 rounded-2xl border-2"
                    >
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

/* ——— Reusable Feature Block Component ——— */
interface FeatureParagraph {
  text: React.ReactNode;
  highlight?: boolean;
  highlightColor?: string;
}

interface FeatureBlockProps {
  icon: React.ElementType;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  reverse: boolean;
  paragraphs: FeatureParagraph[];
  checks: string[];
  isLast?: boolean;
}

function FeatureBlock({ icon: Icon, emoji, title, subtitle, color, reverse, paragraphs, checks, isLast }: FeatureBlockProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className={isLast ? "" : "mb-20 sm:mb-28"}
    >
      <div className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:grid-flow-dense" : ""}`}>
        {/* Info Side */}
        <motion.div variants={reverse ? slideInRight : slideInLeft} className={reverse ? "lg:col-start-2" : ""}>
          <div className={`rounded-3xl bg-gradient-to-br from-${color}/8 to-${color}/15 border border-${color}/15 p-8 sm:p-10`}>
            <div className={`w-14 h-14 rounded-2xl bg-${color}/15 flex items-center justify-center mb-5`}>
              <Icon className={`w-7 h-7 text-${color}`} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              {emoji} {title}
            </h3>
            <p className={`text-${color} font-medium mb-6`}>
              {subtitle}
            </p>
            <div className="space-y-4">
              {paragraphs.map((p, i) => {
                if (p.highlight) {
                  const hColor = p.highlightColor || color;
                  return (
                    <div key={i} className={`rounded-2xl bg-${hColor}/5 p-5 border border-${hColor}/10`}>
                      <p className="text-muted-foreground leading-relaxed text-sm">{p.text}</p>
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p.text}</p>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Checks Side */}
        <motion.div variants={reverse ? slideInLeft : slideInRight} className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
          <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-4">
            {checks.map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                className={`flex items-start gap-3 p-4 rounded-2xl bg-card border border-border/50 hover:border-${color}/30 hover:shadow-md transition-all duration-300 group`}
              >
                <div className={`mt-0.5 p-1.5 rounded-lg bg-${color}/10 group-hover:bg-${color}/15 transition-colors`}>
                  <CheckCircle2 className={`h-4 w-4 text-${color}`} />
                </div>
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Welcome;
