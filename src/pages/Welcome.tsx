"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, Lock, Globe, Zap, ArrowRight, DollarSign, Repeat, Target, BarChart3 } from "lucide-react";
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
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = isSignUp 
        ? await signUpWithEmail(email, password, fullName) 
        : await signInWithEmail(email, password);
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

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <CookieConsent />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Trackora
          </span>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => { setShowAuth(true); setIsSignUp(false); }} 
              variant="ghost" 
              className="hidden sm:inline-flex font-semibold"
            >
              Sign In
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-16 flex flex-col items-center text-center">
        {/* Featured Slogan - Prominent Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-3xl rounded-full" />
          <div className="relative px-8 py-6 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 backdrop-blur-sm">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
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
          className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mb-6"
        >
          Financial Clarity.{" "}
          <span className="text-primary">Zero Stress.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Track expenses, manage debts, monitor subscriptions, and achieve your savings goals—all in one beautiful web app.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-12"
        >
          <Button
            onClick={() => { setShowAuth(true); setIsSignUp(true); }}
            size="lg"
            className="text-lg px-10 py-7 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Start Free Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAuth(true)}
            className="text-lg px-10 py-7 rounded-2xl border-2 border-primary/50 hover:bg-primary/10 font-semibold"
          >
            Sign In
          </Button>
        </motion.div>

        {/* Beta Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="px-6 py-4 rounded-2xl bg-accent/15 border border-accent/30"
        >
          <p className="text-sm font-medium">
            <span className="text-accent font-bold">Beta:</span>{" "}
            Free during development. Questions?{" "}
            <a href="mailto:pla.team@cadliotech.com" className="text-accent underline font-semibold">
              pla.team@cadliotech.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* Features Grid - Luxury Cards */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful tools, beautifully simple.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full luxury-card border-border/50 hover:border-primary/50 bg-card">
                  <CardContent className="p-6 pt-8">
                    <div className={`w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section - High Contrast */}
      <section className="py-20 bg-gradient-to-br from-foreground to-foreground/95 text-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-background">
              Security You Can Trust
            </h2>
            <p className="text-background/70 text-lg">
              Your data deserves the highest protection.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 rounded-2xl bg-background/10 border border-background/20 hover:bg-background/15 transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-background mb-1">{item.title}</h3>
                <p className="text-background/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Simple */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-8">
              Ready to take control of your finances?
            </h2>
            <Button
              onClick={() => { setShowAuth(true); setIsSignUp(true); }}
              size="lg"
              className="text-lg px-10 py-6 rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Auth Dialog */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary font-bold"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full rounded-xl"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Welcome;
