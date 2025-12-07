"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, Lock, Globe, Zap, ArrowRight, Camera, DollarSign, Repeat, Target, BarChart3, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
const Welcome = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const {
    signInWithEmail,
    signUpWithEmail
  } = useAuth();
  const {
    toast
  } = useToast();
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        error
      } = isSignUp ? await signUpWithEmail(email, password, fullName) : await signInWithEmail(email, password);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const features = [
    {
      icon: DollarSign,
      title: "Loans & Debts Tracker",
      description: "Stay on top of all your loans comfortably. Track balances, monitor interest rates, and get gentle reminders about upcoming EMI payments.",
      highlight: "Peace of mind for your debts"
    },
    {
      icon: Repeat,
      title: "Subscription Control",
      description: "See all your subscriptions in one place. Get alerts before renewals, understand your monthly costs, and easily spot subscriptions you might want to cancel.",
      highlight: "No more surprise charges"
    },
    {
      icon: Target,
      title: "Goals & Progress",
      description: "Set savings goals and watch your progress grow. Visual progress rings and encouraging insights help you celebrate every milestone on your journey.",
      highlight: "You're getting closer — keep going"
    },
    {
      icon: BarChart3,
      title: "Friendly Analytics",
      description: "Beautiful charts that speak your language. Get insights into spending patterns and trends without judgment — just helpful, encouraging guidance.",
      highlight: "Numbers that help, not stress"
    }
  ];
  const whyChoose = [{
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your financial data is protected with 256-bit encryption, the same security standard used by major banks worldwide."
  }, {
    icon: Lock,
    title: "Privacy First Always",
    description: "We never sell, share, or monetize your data. Your financial information is yours alone, and we're committed to keeping it that way."
  }, {
    icon: Globe,
    title: "Global Compliance",
    description: "Fully compliant with GDPR, CCPA, and international data protection regulations. Your rights are protected no matter where you are."
  }, {
    icon: Zap,
    title: "Real-Time Sync",
    description: "All your devices stay perfectly in sync. Add an expense on your phone and see it instantly on your laptop — seamlessly."
  }];
  return <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-accent/5 text-foreground overflow-hidden">
      <CookieConsent />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            
            <span className="font-bold text-xl">Trackora</span>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => {
            setShowAuth(true);
            setIsSignUp(false);
          }} variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center relative">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/15 border border-primary/30 text-primary text-base md:text-lg font-semibold mb-8 shadow-lg shadow-primary/10">
          "All the power of an app. Without installing."
        </motion.div>

        <motion.h1 initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7,
        delay: 0.1
      }} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mb-6">
          Financial clarity without the stress
        </motion.h1>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3,
        duration: 0.7
      }} className="max-w-3xl mb-10">
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            <span className="text-foreground font-semibold">Take control of your personal finances</span>{" "}
            <span className="text-muted-foreground">with Trackora, a modern</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
              expense tracking and budget management platform
            </span>
            <span className="text-muted-foreground">.</span>
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 text-base md:text-lg">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              <span className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Track your daily spending</span>, manage debts and loans
              </span>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10">
              <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
              <span className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Monitor recurring subscriptions</span> and work toward goals
              </span>
            </div>
          </div>
          
          <p className="text-base md:text-lg text-muted-foreground mt-6 leading-relaxed text-center">
            Perfect for individuals who want to{" "}
            <span className="text-primary font-medium">build better money habits</span>,{" "}
            <span className="text-accent font-medium">reduce financial stress</span>, and gain clarity about 
            where their money goes each month.
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5,
        duration: 0.7
      }} className="flex flex-col sm:flex-row gap-4 items-center mb-12">
          <Button onClick={() => {
          setShowAuth(true);
          setIsSignUp(true);
        }} size="lg" className="text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90">
            Start Free — No Credit Card
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button variant="outline" size="lg" onClick={() => setShowAuth(true)} className="text-lg px-10 py-7 rounded-2xl border-2">
            Sign In
          </Button>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.7,
        duration: 0.7
      }} className="max-w-2xl px-6 py-5 rounded-2xl bg-success/10 border border-success/20">
          <p className="text-sm leading-relaxed text-foreground">
            <strong className="text-success">Currently in Beta:</strong> Trackora is free while we perfect the experience. 
            Your data is completely safe with bank-level security. Share your feedback at{" "}
            <a href="mailto:pla.team@cadliotech.com" className="text-success hover:underline font-medium">
              pla.team@cadliotech.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* What is Trackora Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                What is Trackora?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Personal Finance Management</span> Solution
              </h2>
            </div>

            <Card className="mb-8 border-2 hover:border-primary/30 transition-all">
              <CardContent className="p-6 sm:p-8">
                <p className="text-lg leading-relaxed mb-6">
                  <span className="text-foreground font-semibold">Managing personal finances doesn't have to be complicated or stressful.</span>{" "}
                  <span className="text-muted-foreground">
                    Trackora is designed as a simple yet powerful tool to help you understand and control your money. 
                    Whether you're just starting your financial journey or looking to optimize your existing budget, 
                    our platform provides the clarity and insights you need to make confident financial decisions.
                  </span>
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary/30 transition-all bg-gradient-to-br from-primary/5 to-transparent">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Track Every Dollar</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      At its core, Trackora helps you <span className="text-foreground font-medium">track every expense and income source</span> throughout 
                      the month. By categorizing your spending automatically, you can quickly see where your money goes—from 
                      groceries and dining to utilities and entertainment. This visibility is the first step toward building 
                      better financial habits and identifying areas where you can save more effectively.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full border-2 hover:border-accent/30 transition-all bg-gradient-to-br from-accent/5 to-transparent">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold">Conquer Debt</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Managing debt is one of the most challenging aspects of personal finance. Trackora simplifies this by 
                      letting you <span className="text-foreground font-medium">track all your loans in one place</span>—personal loans, student debt, credit cards, 
                      and more. Monitor your balances, track interest charges, and see projected payoff dates. Set up friendly 
                      reminders for upcoming payments so you never miss a due date.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="h-full border-2 hover:border-primary/30 transition-all bg-gradient-to-br from-primary/5 to-transparent">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Repeat className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Control Subscriptions</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Subscription services have become a significant part of modern spending. From streaming platforms to 
                      software subscriptions, these recurring charges can quietly drain your budget. Trackora helps you{" "}
                      <span className="text-foreground font-medium">catalog all your subscriptions</span>, alerts you before renewals, and shows you exactly 
                      how much you're spending monthly and annually.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Card className="h-full border-2 hover:border-accent/30 transition-all bg-gradient-to-br from-accent/5 to-transparent">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold">Achieve Goals</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Setting and achieving financial goals becomes achievable with the right tools. Whether you're saving 
                      for an emergency fund, planning a vacation, or working toward a major purchase, Trackora lets you{" "}
                      <span className="text-foreground font-medium">create custom savings goals</span> with target amounts and deadlines. Visual progress 
                      indicators keep you motivated every step of the way.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <CheckCircle2 className="h-4 w-4" />
              Everything you need
            </motion.div>
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-3xl md:text-5xl font-bold mb-4">
              Tools designed for <span className="text-primary">peace of mind</span>
            </motion.h2>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every feature is crafted to be simple, supportive, and stress-free
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => <motion.div key={feature.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.1
          }}>
                <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-3 leading-relaxed">{feature.description}</p>
                    <p className="text-sm font-medium text-primary italic">"{feature.highlight}"</p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* How Trackora Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                <Zap className="h-4 w-4" />
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simple, Secure, and <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Effective</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started in minutes and experience effortless financial management
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full border-2 hover:border-accent/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-[100px]"></div>
                  <CardContent className="p-8 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                        1
                      </div>
                      <h3 className="text-2xl font-bold">Quick Start</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Getting started with Trackora takes just minutes. <span className="text-foreground font-medium">Sign up with your email 
                      address</span>—no credit card or payment information required during our free beta period. The onboarding 
                      process is straightforward and guides you through setting up your first budget and adding your initial 
                      expenses. Within moments, you'll have a clear dashboard showing your financial snapshot.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full border-2 hover:border-primary/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[100px]"></div>
                  <CardContent className="p-8 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                        2
                      </div>
                      <h3 className="text-2xl font-bold">Effortless Tracking</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Daily usage is designed to be effortless. When you make a purchase, open Trackora, tap the{" "}
                      <span className="text-foreground font-medium">"Add Expense" button</span>, enter the amount and a quick description, 
                      and select a category. The entire process takes seconds. You can add expenses from your phone while 
                      you're out shopping or from your computer when reviewing transactions at home.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="h-full border-2 hover:border-primary/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[100px]"></div>
                  <CardContent className="p-8 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                        3
                      </div>
                      <h3 className="text-2xl font-bold">Beautiful Insights</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      The analytics dashboard transforms your raw transaction data into meaningful insights. View{" "}
                      <span className="text-foreground font-medium">colorful charts showing spending by category</span>, compare your current 
                      month to previous periods, and identify trends in your financial behavior. These visual reports help 
                      you understand your money habits without complex calculations or spreadsheet formulas.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Card className="h-full border-2 hover:border-accent/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-[100px]"></div>
                  <CardContent className="p-8 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                        4
                      </div>
                      <h3 className="text-2xl font-bold">Bank-Level Security</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Security and privacy are built into every aspect of Trackora. We use{" "}
                      <span className="text-foreground font-medium">industry-standard 256-bit encryption</span> to protect your data, the same 
                      level of security used by major financial institutions. Your information is stored on secure servers 
                      with multiple layers of protection. We never sell your data to advertisers or third parties.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Trackora */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-3xl md:text-5xl font-bold mb-4">
              Built on <span className="text-primary">trust</span> and <span className="text-accent">safety</span>
            </motion.h2>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your financial data deserves the highest level of protection and respect
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChoose.map((item, idx) => <motion.div key={item.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.1
          }}>
                <Card className="p-6 border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-card/50 backdrop-blur h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start managing your money with peace
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands who've found financial clarity and emotional comfort with Trackora. 
              It's free, it's safe, and it's designed to make you feel good about your finances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={() => {
              setShowAuth(true);
              setIsSignUp(true);
            }} size="lg" className="text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <a href="/features">
                <Button variant="outline" size="lg" className="text-lg px-10 py-7 rounded-2xl border-2">
                  Explore Features
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Auth Dialog */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{isSignUp ? "Create Account" : "Welcome Back"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required className="rounded-xl" />
              </div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="rounded-xl" />
            </div>
            <Button type="submit" className="w-full rounded-xl" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
            <Button type="button" variant="ghost" className="w-full rounded-xl" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Welcome;
