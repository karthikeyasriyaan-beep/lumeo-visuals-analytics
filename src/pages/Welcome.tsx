"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, Lock, Globe, Zap, ArrowRight, DollarSign, Repeat, Target, BarChart3, Smartphone, Laptop, CheckCircle2, TrendingUp, Wallet, PieChart, Clock, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { useAuth } from "@/hooks/useAuth";

const Welcome = () => {
  const { enterAsGuest } = useAuth();

  const features = [
    {
      icon: DollarSign,
      title: "Loans & Debts",
      description: "Track balances, monitor rates, get EMI reminders.",
      color: "from-primary to-secondary"
    },
    {
      icon: Repeat,
      title: "Subscriptions",
      description: "All recurring costs in one view. No surprise charges.",
      color: "from-secondary to-accent"
    },
    {
      icon: Target,
      title: "Savings Goals",
      description: "Visual progress. Celebrate every milestone.",
      color: "from-accent to-primary"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Beautiful insights. Numbers that help, not stress.",
      color: "from-primary to-accent"
    }
  ];

  const securityFeatures = [
    { icon: Shield, title: "256-bit Encryption", desc: "Bank-level security" },
    { icon: Lock, title: "Privacy First", desc: "Your data stays yours" },
    { icon: Globe, title: "GDPR Compliant", desc: "Global standards" },
    { icon: Zap, title: "Real-Time Sync", desc: "All devices, instantly" }
  ];

  const benefits = [
    { icon: Wallet, title: "Track Every Penny", desc: "Know exactly where your money goes" },
    { icon: PieChart, title: "Visual Reports", desc: "Understand spending at a glance" },
    { icon: Clock, title: "Save Time", desc: "Quick entry, instant insights" },
    { icon: TrendingUp, title: "Grow Wealth", desc: "Make smarter financial decisions" }
  ];

  return (
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

        {/* Featured Slogan - Prominent Highlight */}
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

        {/* Beta Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-accent/15 border border-accent/30 mx-4"
        >
          <p className="text-xs sm:text-sm font-medium">
            <span className="text-accent font-bold">Beta:</span>{" "}
            Free during development. Questions?{" "}
            <a href="mailto:pla.team@cadliotech.com" className="text-accent underline font-semibold">
              pla.team@cadliotech.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* Why Trackora Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              Why Choose Trackora?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
              Take control of your finances with tools designed for real life.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold mb-1">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Luxury Cards */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg">
              Powerful tools, beautifully simple.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full luxury-card border-border/50 hover:border-primary/50 bg-card">
                  <CardContent className="p-4 sm:p-6 pt-6 sm:pt-8">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 mb-3 sm:mb-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-base text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              What You Can Do
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
              Manage every aspect of your personal finances in one place.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: CheckCircle2, title: "Log Expenses Quickly", desc: "Add transactions in seconds with smart categorization" },
              { icon: CheckCircle2, title: "Track Income Sources", desc: "See all your earnings organized by type and date" },
              { icon: CheckCircle2, title: "Set Savings Targets", desc: "Create goals and watch your progress grow" },
              { icon: CheckCircle2, title: "Monitor Subscriptions", desc: "Never forget a recurring payment again" },
              { icon: CheckCircle2, title: "Manage Loans & Debt", desc: "Track balances and plan your payoff strategy" },
              { icon: CheckCircle2, title: "View Clear Analytics", desc: "Understand your spending patterns visually" }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-card border border-border/50"
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-success/10 flex-shrink-0">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold mb-0.5 sm:mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section - High Contrast */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-foreground to-foreground/95 text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-background">
              Security You Can Trust
            </h2>
            <p className="text-background/70 text-sm sm:text-lg">
              Your data deserves the highest protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {securityFeatures.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-background/10 border border-background/20 hover:bg-background/15 transition-all"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-background mb-0.5 sm:mb-1">{item.title}</h3>
                <p className="text-background/60 text-xs sm:text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              Simple to Get Started
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg">
              Three steps to financial clarity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: "1", title: "Create Account", desc: "Sign up in seconds. No credit card required." },
              { step: "2", title: "Add Your Data", desc: "Log expenses, income, subscriptions, and goals." },
              { step: "3", title: "Track & Grow", desc: "Watch your finances improve with clear insights." }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl sm:text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-base text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">Start Today</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 px-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                All the power of an app. Without installing.
              </span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto px-4">
              Start managing your finances with clarity and confidence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                onClick={enterAsGuest}
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-10 sm:px-12 py-6 sm:py-7 rounded-xl sm:rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-primary to-secondary"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <a href="/features" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-base sm:text-lg px-10 sm:px-12 py-6 sm:py-7 rounded-xl sm:rounded-2xl border-2 border-primary/50 hover:bg-primary/10 font-semibold"
                >
                  Explore Features
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Welcome;