"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Shield, Lock, Globe, Zap, ArrowRight, DollarSign, Repeat, Target, 
  BarChart3, CheckCircle2, TrendingUp, Wallet, 
  PieChart, Sparkles, BookOpen, GraduationCap, Calculator, 
  CreditCard, Bell, Lightbulb, Users, Home, Briefcase,
  FileText, Flame, Trophy, Star, Gamepad2, Rocket, Gift, Medal
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
        title="Trackora – Manage Money Like a Game | Smart Expense Tracker"
        description="Track expenses, earn XP, build streaks, and level up your financial life. Trackora turns personal finance into a fun daily challenge. Free to use."
        keywords="expense tracker, gamified finance, budget game, personal finance, track expenses, XP rewards, savings goals, financial challenges"
        canonicalUrl="https://trackorapp.in"
      />
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <CookieConsent />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl sm:text-2xl text-foreground">
              Trackora
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/blog">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Blog
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                About
              </Button>
            </Link>
            <Button 
              onClick={enterAsGuest} 
              variant="ghost" 
              className="hidden sm:inline-flex font-semibold"
            >
              Explore Demo
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-20 sm:pb-32 flex flex-col items-center text-center">
        {/* Game badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            Finance Meets Fun
            <Flame className="h-4 w-4 text-warning" />
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mb-6 sm:mb-8 px-2"
        >
          Manage Money{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Like a Game
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mb-10 sm:mb-14 px-4 leading-relaxed"
        >
          Track expenses, earn XP, build streaks, and improve your financial life daily. 
          Trackora turns budgeting into a rewarding challenge you'll actually enjoy.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-10 w-full sm:w-auto px-4 sm:px-0"
        >
          <Button
            onClick={enterAsGuest}
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-10 py-7 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Start Tracking Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={enterAsGuest}
            className="w-full sm:w-auto text-base sm:text-lg px-10 py-7 rounded-2xl border-2 border-primary/40 hover:bg-primary/10 font-semibold"
          >
            <Gamepad2 className="mr-2 h-5 w-5" />
            Explore Demo
          </Button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
        >
          {[
            { icon: Shield, text: "Bank-level security" },
            { icon: Zap, text: "No app install needed" },
            { icon: Gift, text: "100% free to use" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-primary" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════ HOW IT WORKS (3 Steps) ═══════════ */}
      <section className="py-20 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Rocket className="h-4 w-4" />
              Simple to Start
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              How Trackora Works
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Three simple steps to turn your finances into a rewarding daily habit
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                icon: Wallet,
                title: "Add an Expense or Income",
                desc: "Log your daily transactions in seconds. Quick-add buttons and smart categories make data entry effortless—it takes less than 5 seconds per entry.",
                color: "primary",
              },
              {
                step: "2",
                icon: Star,
                title: "Earn XP & Level Up",
                desc: "Every action earns experience points. Adding expenses gives +10 XP, income +15 XP, savings progress +20 XP. Watch your level grow as you build better habits.",
                color: "secondary",
              },
              {
                step: "3",
                icon: Trophy,
                title: "Complete Missions & Grow",
                desc: "Take on daily finance challenges—log all expenses, stay under budget, maintain streaks. Unlock badges and see your financial skills improve over time.",
                color: "accent",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="text-center"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-${item.color}/10 border-2 border-${item.color}/20 flex items-center justify-center relative`}>
                  <item.icon className={`w-9 h-9 text-${item.color}`} />
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-${item.color} flex items-center justify-center text-sm font-bold text-${item.color}-foreground shadow-lg`}>
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES SECTION (Cards) ═══════════ */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Win at Money
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
              Powerful tools wrapped in a fun experience—track, analyze, and improve every aspect of your finances
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Wallet,
                title: "Expense Tracking",
                desc: "Record daily expenses in seconds with smart categories, quick-add buttons, and color-coded visualizations. Know exactly where every rupee goes.",
                color: "primary",
                xp: "+10 XP per entry",
              },
              {
                icon: TrendingUp,
                title: "Income Logging",
                desc: "Track all income sources—salary, freelance, side hustles. Compare income vs spending monthly and identify your true savings rate.",
                color: "secondary",
                xp: "+15 XP per entry",
              },
              {
                icon: Target,
                title: "Savings Goals",
                desc: "Set goals for vacations, emergencies, or big purchases. Visual progress bars and milestone celebrations keep you motivated to save.",
                color: "accent",
                xp: "+20 XP per update",
              },
              {
                icon: Star,
                title: "XP & Level System",
                desc: "Every financial action earns experience points. Level up from Beginner to Finance Master as you build consistent money habits.",
                color: "warning",
                xp: "Level up rewards",
              },
              {
                icon: Flame,
                title: "Daily Streak Rewards",
                desc: "Log in daily and track expenses to build a streak. The longer you maintain it, the faster you earn XP and unlock exclusive badges.",
                color: "destructive",
                xp: "+5 XP daily login",
              },
              {
                icon: Trophy,
                title: "Finance Challenges",
                desc: "Complete daily missions like 'Stay under budget today' or 'Track expenses 3 days in a row' to earn badges and boost your rank.",
                color: "primary",
                xp: "Badge rewards",
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card className="h-full hover-lift group">
                  <CardContent className="p-7 sm:p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`p-3 rounded-xl bg-${feature.color}/10 group-hover:bg-${feature.color}/20 transition-colors`}>
                        <feature.icon className={`h-7 w-7 text-${feature.color}`} />
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-${feature.color}/10 text-${feature.color}`}>
                        {feature.xp}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional feature row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto mt-8">
            {[
              { icon: Repeat, title: "Subscriptions", desc: "Track recurring charges, get alerts before renewals, and cut wasted spending." },
              { icon: DollarSign, title: "Loan Tracker", desc: "Monitor all debts with progress bars showing your payoff journey." },
              { icon: Calculator, title: "Budget Planning", desc: "Set category limits and overall monthly budgets with visual progress." },
              { icon: BarChart3, title: "Smart Analytics", desc: "Charts and insights that reveal spending patterns and opportunities." },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card className="h-full hover-lift">
                  <CardContent className="p-6">
                    <div className="p-2.5 rounded-lg bg-muted w-fit mb-4">
                      <item.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY TRACKORA IS DIFFERENT ═══════════ */}
      <section className="py-20 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                <Lightbulb className="h-4 w-4" />
                Our Philosophy
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6">
                Why Trackora is Different
              </h2>
            </div>

            <div className="space-y-6">
              <div className="relative pl-6 border-l-4 border-primary/40 py-4 px-5 rounded-r-2xl bg-primary/5">
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  <strong className="text-foreground">Most finance apps feel like homework.</strong> They're boring spreadsheets with a prettier interface. You open them once, feel guilty about your spending, and never return. That's not how lasting financial habits are built.
                </p>
              </div>

              <div className="relative pl-6 border-l-4 border-secondary/40 py-4 px-5 rounded-r-2xl bg-secondary/5">
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  <strong className="text-foreground">Trackora uses gamification to change that.</strong> By rewarding every positive financial action with XP, streaks, levels, and badges, we tap into the same psychology that makes games addictive—but channel it toward building wealth. When tracking expenses earns you points and maintaining a budget unlocks a new badge, managing money stops feeling like a chore and starts feeling like progress.
                </p>
              </div>

              <div className="relative pl-6 border-l-4 border-accent/40 py-4 px-5 rounded-r-2xl bg-accent/5">
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  <strong className="text-foreground">The result?</strong> Users who gamify their finances are significantly more likely to stick with tracking long-term. Daily missions give you a reason to open the app. Streaks create accountability. Level-ups celebrate consistency. And before you know it, you've built habits that genuinely improve your financial life—not because you forced yourself, but because it was <strong className="text-foreground">actually fun</strong>.
                </p>
              </div>
            </div>

            {/* Gamification stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { value: "10+", label: "Levels to unlock" },
                { value: "15+", label: "Badges to earn" },
                { value: "5+", label: "Daily missions" },
                { value: "∞", label: "XP to collect" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-5 rounded-2xl bg-card border border-border"
                >
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHO USES TRACKORA ═══════════ */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Who Uses Trackora?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
              Real people with real financial goals—Trackora adapts to every situation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: "Students",
                description: "Managing limited budgets on hostel fees, food, books, and entertainment while building financial habits that last a lifetime. Track part-time job income and save for future goals.",
                color: "primary"
              },
              {
                icon: Briefcase,
                title: "Working Professionals",
                description: "Balancing salary, bonuses, and side income while managing EMIs, rent, subscriptions, and lifestyle expenses. See where your paycheck actually goes each month.",
                color: "secondary"
              },
              {
                icon: Home,
                title: "Families",
                description: "Managing household budgets, children's education expenses, family vacations, and long-term savings. Plan for major milestones together with shared visibility.",
                color: "accent"
              },
              {
                icon: Users,
                title: "Freelancers",
                description: "Handling variable income, tracking business expenses, and maintaining stability despite irregular payment schedules. Know your true monthly average.",
                color: "primary"
              },
              {
                icon: CreditCard,
                title: "Debt-Free Seekers",
                description: "Actively paying down loans or credit cards. Use the loan tracker to visualize your payoff journey and accelerate your path to financial freedom.",
                color: "secondary"
              },
              {
                icon: Target,
                title: "Goal Setters",
                description: "Saving for dream vacations, new gadgets, weddings, or emergency funds. Visual progress tracking and XP rewards keep you motivated and on track.",
                color: "accent"
              }
            ].map((useCase, idx) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card className={`h-full hover-lift border-l-4 border-l-${useCase.color}`}>
                  <CardContent className="p-7">
                    <div className={`p-3 rounded-xl bg-${useCase.color}/10 w-fit mb-5`}>
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

      {/* ═══════════ SECURITY ═══════════ */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-foreground to-foreground/95 text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-background">
              Security & Privacy You Can Trust
            </h2>
            <p className="text-background/70 text-base sm:text-lg max-w-3xl mx-auto">
              Your financial data deserves bank-level protection—and that's exactly what we provide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
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
                className="text-center p-7 rounded-2xl bg-background/10 border border-background/20"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-primary flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-background mb-2">{item.title}</h3>
                <p className="text-background/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EDUCATIONAL RESOURCES ═══════════ */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Free Resources</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              Learn & Grow Your Financial Knowledge
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Trackora is more than a tool—it's a learning platform. Explore our guides and articles to build lasting financial skills.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto mb-10">
            {[
              { icon: BookOpen, title: "Budgeting Guide", desc: "Master the art of creating and maintaining budgets that work for your lifestyle", link: "/budgeting-guide" },
              { icon: Target, title: "Savings Guide", desc: "Proven strategies for building savings and reaching your financial goals faster", link: "/savings-guide" },
              { icon: CreditCard, title: "Debt Management", desc: "Effective strategies for paying off debt and achieving financial freedom", link: "/debt-management-guide" },
              { icon: FileText, title: "Finance Blog", desc: "22+ articles on personal finance, expense tracking, and money management", link: "/blog" }
            ].map((resource, idx) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={resource.link}>
                  <Card className="h-full hover-lift cursor-pointer group">
                    <CardContent className="p-7">
                      <div className="p-3 rounded-xl bg-primary/10 w-fit mb-5 group-hover:bg-primary/20 transition-colors">
                        <resource.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{resource.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
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

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-20 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-2 border-primary/20 overflow-hidden">
              <CardContent className="p-10 sm:p-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  <Gamepad2 className="h-4 w-4" />
                  Ready to Play?
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-5">
                  Start Your Finance Game Today
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join thousands who've turned money management into a rewarding daily challenge. 
                  Level up your finances—it's completely free.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={enterAsGuest}
                    size="lg"
                    className="text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Get Started Free
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
