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
      }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          A calm space to understand your money
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

        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3,
        duration: 0.7
      }} className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          Trackora is a comprehensive personal finance management platform that helps you track expenses, 
          manage loans and debts, monitor subscriptions, and reach your financial goals. Whether you're 
          budgeting for the first time or looking to optimize your spending habits, Trackora provides 
          intuitive tools and beautiful analytics to make financial management effortless. Our platform 
          combines powerful features with a clean, user-friendly interface designed to reduce financial 
          stress and help you make informed decisions about your money. From automated expense categorization 
          to detailed spending insights, Trackora gives you complete visibility into your financial health.
        </motion.p>

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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              What is Trackora? Your Complete Financial Management Solution
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Trackora is a modern personal finance management application designed to simplify how you manage your money. 
                In today's complex financial landscape, keeping track of expenses, subscriptions, loans, and savings goals 
                can be overwhelming. Trackora brings all these aspects together in one intuitive platform, making financial 
                management accessible to everyone, regardless of their financial expertise.
              </p>
              <p>
                Our platform offers comprehensive expense tracking that automatically categorizes your spending, helping you 
                understand exactly where your money goes each month. With detailed analytics and visual reports, you can 
                identify spending patterns, discover opportunities to save, and make data-driven decisions about your finances. 
                Whether you're tracking daily coffee purchases or major expenses, Trackora ensures nothing falls through the cracks.
              </p>
              <p>
                Beyond basic expense tracking, Trackora includes powerful tools for managing debts and loans. Track multiple 
                loans simultaneously, monitor interest rates, calculate payoff timelines, and set up payment reminders. Our 
                loan management features help you stay on top of your financial obligations and work toward becoming debt-free 
                faster. The platform also includes subscription tracking to help you identify and eliminate unnecessary recurring 
                charges that drain your budget.
              </p>
              <p>
                Financial goal setting is at the heart of Trackora's mission. Set specific savings targets for emergencies, 
                vacations, large purchases, or retirement. Our visual progress tracking keeps you motivated with clear milestones 
                and encouraging insights. Combined with intelligent budgeting tools that adapt to your spending habits, Trackora 
                provides the guidance you need to achieve your financial goals while maintaining a healthy work-life balance.
              </p>
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
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              How Trackora Works: Simple, Secure, and Effective
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed mb-12">
              <p>
                Getting started with Trackora is incredibly simple. Create your free account in seconds using your email 
                address—no credit card required. Once you're in, you'll find an intuitive dashboard that provides a 
                comprehensive overview of your financial health at a glance. The clean, modern interface makes navigation 
                effortless, whether you're using a desktop computer, tablet, or smartphone.
              </p>
              <p>
                Adding expenses and income is quick and straightforward. Simply click the "Add Expense" button, enter the 
                amount and description, and Trackora automatically categorizes the transaction based on intelligent pattern 
                recognition. Over time, the system learns your spending habits and becomes even more accurate. You can also 
                add notes, attach tags, and customize categories to match your unique financial situation.
              </p>
              <p>
                Security is paramount at Trackora. All your financial data is protected with bank-level 256-bit AES encryption, 
                both when it's transmitted and when it's stored on our servers. We never sell or share your personal information 
                with third parties. You maintain complete control over your data with the ability to export or delete it at any 
                time. Our infrastructure is hosted on enterprise-grade cloud servers with 99.9% uptime, ensuring your financial 
                information is always accessible when you need it.
              </p>
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
