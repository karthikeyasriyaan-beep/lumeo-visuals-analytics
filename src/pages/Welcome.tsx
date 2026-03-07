"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Shield, Lock, Globe, ArrowRight, DollarSign, Repeat, Target, 
  BarChart3, Smartphone, Laptop, CheckCircle2, TrendingUp, Wallet, 
  Clock, BookOpen, GraduationCap, Calculator, 
  CreditCard, LineChart, Lightbulb, Users, Home, Briefcase,
  FileText, AlertCircle, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

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
    <div className="min-h-screen bg-background text-foreground">
      <CookieConsent />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/40"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            <span className="font-bold text-xl tracking-tight text-foreground">
              Trackora
            </span>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                onClick={enterAsGuest} 
                size="sm"
                className="font-medium"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border text-xs sm:text-sm text-muted-foreground">
              <Laptop className="h-3.5 w-3.5" />
              Best experience on laptop or tablet
              <Smartphone className="h-3.5 w-3.5" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Financial clarity,{" "}
            <span className="text-primary">made simple.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Track expenses, manage debts, monitor subscriptions, and achieve your savings goals — all in one beautifully crafted web app.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-12"
          >
            <Button
              onClick={enterAsGuest}
              size="lg"
              className="text-base px-8 py-6 rounded-xl font-semibold group"
            >
              Start Free Today
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={enterAsGuest}
              className="text-base px-8 py-6 rounded-xl font-medium"
            >
              Explore Dashboard
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            {[
              { icon: Shield, text: "256-bit Encrypted" },
              { icon: Clock, text: "Instant Setup" },
              { icon: Lock, text: "100% Free" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-primary/70" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-xs text-muted-foreground"
          >
            Questions?{" "}
            <a href="mailto:pla.team@cadliotech.com" className="text-primary underline">
              pla.team@cadliotech.com
            </a>
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="h-px bg-border" />
      </div>

      {/* What is Trackora */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fade} className="text-center mb-14">
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">About</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">What is Trackora?</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Complete Platform",
                  body: "A comprehensive personal finance management platform designed to help individuals and families take complete control of their money. Unlike simple expense trackers, Trackora provides a complete financial ecosystem — expenses, income, loans, subscriptions, and savings goals."
                },
                {
                  icon: Users,
                  title: "Built for Everyone",
                  body: "Whether you're a college student managing a tight budget, a working professional juggling multiple responsibilities, or a family planning for the future — Trackora adapts to your unique financial situation. Financial clarity leads to better decisions."
                },
                {
                  icon: Lightbulb,
                  title: "Actionable Insights",
                  body: "See where your money goes each month, identify spending patterns you weren't aware of, receive alerts before subscription renewals, track your debt payoff journey with visual progress, and celebrate milestones as you reach your savings targets."
                }
              ].map((card, idx) => (
                <motion.div key={card.title} variants={fade} custom={idx}>
                  <div className="h-full rounded-xl border border-border bg-card p-7 hover:shadow-md transition-all duration-300">
                    <card.icon className="w-6 h-6 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{card.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Tracking Matters */}
      <section className="py-20 sm:py-28 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fade} className="text-center mb-14">
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Financial Education</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Tracking Expenses Matters</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Understanding where your money goes is the foundation of financial wellness
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <motion.div variants={fade}>
                <div className="h-full rounded-xl border border-border bg-card p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-lg bg-destructive/10">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold">The Problem</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Studies show that most people have no clear idea where their money actually goes. Small daily purchases — a coffee here, a snack there, an impulse buy online — add up to <strong className="text-foreground">hundreds or even thousands</strong> each month that simply "disappear."
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Without tracking, you might believe you're spending ₹5,000 on food when you're actually spending ₹12,000. This <strong className="text-foreground">gap between perception and reality</strong> prevents people from saving and reaching their goals.
                    </p>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        💡 Many people avoid tracking because traditional methods are tedious — spreadsheets are time-consuming, and most apps are either too complex or too limited.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fade} custom={1}>
                <div className="h-full rounded-xl border border-border bg-card p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">The Solution</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      <strong className="text-foreground">Trackora makes financial awareness effortless.</strong> Quick-add features, intelligent categorization, and beautiful visualizations make tracking a natural part of your daily routine — taking seconds, not minutes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      When you can see that dining out costs ₹8,000/month while groceries cost ₹4,000, you gain the power to make <strong className="text-foreground">informed choices</strong>. Either way, you're in control.
                    </p>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        📊 Research shows that simply becoming aware of spending patterns leads to a natural <strong className="text-foreground">15–20% reduction</strong> in unnecessary expenses — without any strict budgeting rules.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fade}
            className="text-center mb-16"
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Complete Financial Management
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every tool you need to understand, manage, and grow your finances
            </p>
          </motion.div>

          <div className="space-y-16 sm:space-y-24">
            <FeatureSection
              icon={Wallet}
              title="Smart Expense Tracking"
              subtitle="Every rupee accounted for — without effort"
              paragraphs={[
                <><strong className="text-foreground">Record daily expenses with minimal effort.</strong> Automatic categorization helps identify spending habits and reduce unnecessary costs without hours of manual entry.</>,
                <>The quick-add feature lets you log expenses in <strong className="text-foreground">under 5 seconds</strong>. Enter the amount, select a category, add an optional note — done. Immediately reflected in your analytics.</>,
                <>Color-coded categories make visual scanning effortless. At a glance, see how much you've spent on groceries versus dining out, or how transportation costs compare to entertainment.</>
              ]}
              checks={["Quick-add buttons", "Auto-categorization", "Color-coded categories", "Notes & custom tags", "Date & amount filters", "Edit or delete easily"]}
              reverse={false}
            />

            <FeatureSection
              icon={TrendingUp}
              title="Income Tracking"
              subtitle="See the complete picture of your earnings"
              paragraphs={[
                <><strong className="text-foreground">Understanding your income is just as important as tracking expenses.</strong> Record all sources — salary, freelance, rental income, dividends, gifts — giving you a complete picture of your cash flow.</>,
                <>For freelancers and gig workers: identify which months are typically higher or lower, plan for lean periods, and calculate your <strong className="text-foreground">true average monthly income</strong> for better budgeting.</>,
                <>The income vs. expense comparison shows you exactly how much you're saving (or overspending) each month — the <strong className="text-foreground">foundation of wealth building</strong>.</>
              ]}
              checks={["Multiple income sources", "Categorize by type", "Monthly summaries", "Income vs expense view", "Seasonal patterns", "Variable income planning"]}
              reverse={true}
            />

            <FeatureSection
              icon={DollarSign}
              title="Loans & Debt Tracker"
              subtitle="Complete debt visibility at a glance"
              paragraphs={[
                <><strong className="text-foreground">Managing debt shouldn't feel overwhelming.</strong> Bring all your loans into one unified view — personal loans, student loans, home loans, car loans, and credit card balances.</>,
                <>Track principal amount, interest rate, monthly EMI, and remaining balance. Know exactly <strong className="text-foreground">when you'll be debt-free</strong> if you continue current payments.</>,
                <>Visual progress bars turn what feels like an endless burden into a <strong className="text-foreground">manageable path with a clear destination</strong>. Seeing debt decrease month by month provides motivation to stay on track.</>
              ]}
              checks={["All loan types in one place", "Interest rate monitoring", "EMI payment reminders", "Payoff timelines", "Multiple creditors", "Total debt overview"]}
              reverse={false}
            />

            <FeatureSection
              icon={Repeat}
              title="Subscription Management"
              subtitle="No more surprise charges — ever"
              paragraphs={[
                <><strong className="text-foreground">The average person spends ₹2,000–5,000 monthly</strong> on subscriptions they barely use. Streaming, gym, software, cloud storage — these charges silently drain your account.</>,
                <>Trackora gives you a unified view with costs and renewal dates. Before each renewal: <strong className="text-foreground">"Do you still need this?"</strong> This simple prompt has helped users save thousands per year.</>,
                <>Many users discover they're spending <strong className="text-foreground">₹40,000+ annually</strong> on subscriptions — money that could go toward savings, investments, or experiences that truly matter.</>
              ]}
              checks={["All subscriptions in one view", "Renewal alerts", "Monthly & yearly costs", "Identify unused services", "Billing cycle tracking", "Payment method tracking"]}
              reverse={true}
            />

            <FeatureSection
              icon={Target}
              title="Savings Goals"
              subtitle="Celebrate every step toward your dreams"
              paragraphs={[
                <><strong className="text-foreground">Saving becomes exciting with clear goals.</strong> Create custom goals for anything — emergency fund, dream vacation, new laptop, wedding, home down payment, or your child's education.</>,
                <>Visualizing progress increases the likelihood of reaching goals by <strong className="text-foreground">over 40%</strong>. Progress rings make every contribution feel rewarding.</>,
                <>Reached 25%? Congratulatory message. Hit 50%? The progress ring fills brighter. These <strong className="text-foreground">small celebrations maintain motivation</strong> over the months it takes to reach major financial goals.</>
              ]}
              checks={["Unlimited savings goals", "Visual progress rings", "Target amounts & deadlines", "Contribution tracking", "Milestone celebrations", "Priority ordering"]}
              reverse={false}
            />

            <FeatureSection
              icon={Calculator}
              title="Budget Planning"
              subtitle="Spend intentionally, not accidentally"
              paragraphs={[
                <><strong className="text-foreground">A budget isn't about restriction — it's about giving every rupee a purpose.</strong> Allocate income across categories, ensuring you spend on what truly matters to you.</>,
                <>Set limits per category (Food: ₹8,000, Transport: ₹3,000, Entertainment: ₹2,000) or an <strong className="text-foreground">overall monthly spending limit</strong>. Progress bars show how close you are with gentle color changes.</>,
                <>Designed to be <strong className="text-foreground">encouraging, not punitive</strong>. Instead of harsh warnings, Trackora uses positive language to build sustainable habits without financial anxiety.</>
              ]}
              checks={["Category-wise limits", "Overall monthly limits", "Visual progress bars", "Gentle limit alerts", "Historical comparison", "Auto-suggestions"]}
              reverse={true}
            />

            <FeatureSection
              icon={BarChart3}
              title="Analytics & Insights"
              subtitle="Numbers that help, not overwhelm"
              paragraphs={[
                <><strong className="text-foreground">Data becomes powerful when presented clearly.</strong> Beautiful charts and visualizations reveal patterns you might never notice otherwise.</>,
                <>Colorful pie charts for category breakdowns. Trend lines for income vs expenses. Identify which months you tend to <strong className="text-foreground">overspend</strong> and prepare accordingly.</>,
                <>Insights like <strong className="text-foreground">"You spent 35% more on dining out this month"</strong> help you spot issues early and make informed adjustments.</>
              ]}
              checks={["Category breakdowns", "Monthly trend analysis", "Income vs expense charts", "Spending patterns", "Export reports", "Historical data"]}
              reverse={false}
            />
          </div>
        </div>
      </section>

      {/* Who Uses Trackora */}
      <section className="py-20 sm:py-28 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fade} className="text-center mb-14">
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Our Users</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Who Uses Trackora?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real people with real financial goals — Trackora adapts to every situation
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: "Students",
                  description: "Managing limited budgets on hostel fees, food, books, and entertainment while building financial habits that last a lifetime. Track part-time job income and control impulse spending."
                },
                {
                  icon: Briefcase,
                  title: "Working Professionals",
                  description: "Balancing salary, bonuses, and side income while managing EMIs, rent, subscriptions, and lifestyle expenses. See where your paycheck actually goes each month."
                },
                {
                  icon: Home,
                  title: "Families",
                  description: "Managing household budgets, children's education expenses, family vacations, and long-term savings. Coordinate spending and plan for major milestones together."
                },
                {
                  icon: Users,
                  title: "Freelancers",
                  description: "Handling variable income, tracking business expenses, and maintaining financial stability despite irregular payment schedules. Know your true monthly average."
                },
                {
                  icon: CreditCard,
                  title: "Debt-Free Seekers",
                  description: "Actively paying down loans, credit cards, or other debts. Visualize your payoff journey, stay motivated, and accelerate your path to financial freedom."
                },
                {
                  icon: Target,
                  title: "Goal Setters",
                  description: "Saving for specific targets — dream vacations, gadgets, wedding, home down payment, or emergency funds. Visual progress keeps you motivated and on track."
                }
              ].map((useCase, idx) => (
                <motion.div key={useCase.title} variants={fade} custom={idx}>
                  <div className="h-full rounded-xl border border-border bg-card p-6 hover:shadow-md transition-all duration-300">
                    <useCase.icon className="h-5 w-5 text-primary mb-4" />
                    <h3 className="text-base font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{useCase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fade} className="text-center mb-14">
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Security</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Data is Safe with Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We treat your financial data with the highest level of care and protection
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { icon: Lock, title: "Encrypted Storage", desc: "All financial data encrypted with industry-standard AES-256 encryption at rest and in transit." },
                { icon: Shield, title: "Secure Authentication", desc: "Protected with multi-factor authentication, secure password hashing, and session management." },
                { icon: Globe, title: "Privacy First", desc: "Your data is never sold, shared, or used for advertising. Complete ownership of your information." },
                { icon: LineChart, title: "Secure Sync", desc: "Access your data from any device with automatic encryption and secure authentication." }
              ].map((item, idx) => (
                <motion.div key={item.title} variants={fade} custom={idx}>
                  <div className="h-full rounded-xl border border-border bg-card p-6 text-center hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fade} className="text-center text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
              We understand that financial data is among the most sensitive information you have. Security isn't an afterthought at Trackora — it's foundational to everything we build.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-20 sm:py-28 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fade} className="text-center mb-14">
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Getting Started</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Three Steps to Clarity</h2>
              <p className="text-muted-foreground">Simple, straightforward, and completely free</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  step: "01", 
                  title: "Create Your Account", 
                  desc: "Sign up with your email. No credit card required, no hidden fees. Protected with bank-level encryption from day one."
                },
                { 
                  step: "02", 
                  title: "Add Your Data", 
                  desc: "Log expenses, income sources, subscriptions, loans, and savings goals. Quick-add features make data entry fast and painless."
                },
                { 
                  step: "03", 
                  title: "Track & Improve", 
                  desc: "Watch your finances come into focus. View analytics, track progress, and make informed decisions that build long-term wealth."
                }
              ].map((item, idx) => (
                <motion.div key={item.step} variants={fade} custom={idx} className="text-center">
                  <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fade} className="text-center mt-12">
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="gap-2 rounded-xl px-8 py-6">
                  <BookOpen className="h-4 w-4" />
                  Read Full Guide
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fade} className="text-center mb-14">
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Resources</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Learn & Grow</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our guides and articles to build lasting financial skills
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: BookOpen, title: "Budgeting Guide", desc: "Master budgets that work for your lifestyle", link: "/budgeting-guide" },
                { icon: Target, title: "Savings Guide", desc: "Proven strategies for reaching your goals faster", link: "/savings-guide" },
                { icon: CreditCard, title: "Debt Management", desc: "Effective strategies for paying off debt", link: "/debt-management-guide" },
                { icon: FileText, title: "Finance Blog", desc: "Articles on personal finance and money tips", link: "/blog" }
              ].map((resource, idx) => (
                <motion.div key={resource.title} variants={fade} custom={idx}>
                  <Link to={resource.link}>
                    <div className="h-full rounded-xl border border-border bg-card p-6 hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                      <resource.icon className="h-5 w-5 text-primary mb-4" />
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors text-sm">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{resource.desc}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              Ready to take control?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Join thousands who have transformed their relationship with money. Start your journey to financial clarity — it's completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={enterAsGuest}
                size="lg"
                className="text-base px-10 py-6 rounded-xl font-semibold group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Link to="/faq">
                <Button variant="outline" size="lg" className="text-base px-10 py-6 rounded-xl">
                  View FAQ
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

/* ——— Feature Section Component ——— */
function FeatureSection({ 
  icon: Icon, title, subtitle, paragraphs, checks, reverse 
}: { 
  icon: React.ElementType; title: string; subtitle: string; 
  paragraphs: React.ReactNode[]; checks: string[]; reverse: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
    >
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${reverse ? "lg:grid-flow-dense" : ""}`}>
        <motion.div variants={fade} className={reverse ? "lg:col-start-2" : ""}>
          <div className="rounded-xl border border-border bg-card p-7 sm:p-8">
            <Icon className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-1">{title}</h3>
            <p className="text-primary/70 text-sm font-medium mb-5">{subtitle}</p>
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-sm">{p}</p>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={fade} custom={1} className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
          <div className="grid sm:grid-cols-2 gap-3">
            {checks.map((item, i) => (
              <motion.div
                key={i}
                variants={fade}
                custom={i * 0.5}
                className="flex items-center gap-3 p-3.5 rounded-lg bg-muted/60 border border-border/50 hover:bg-muted transition-colors duration-200"
              >
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Welcome;
