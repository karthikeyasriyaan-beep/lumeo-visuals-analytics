import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, ArrowRight, UserPlus, PlusCircle, BarChart3, 
  Target, Bell, Shield, Lightbulb, CheckCircle2, 
  Wallet, PieChart, TrendingUp, Clock, Smartphone, Laptop
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";

export default function HowItWorks() {
  const { enterAsGuest } = useAuth();

  const howToSteps = [
    { name: "Create Your Free Account", text: "Sign up with just your email address and create a secure password. No credit card required." },
    { name: "Set Up Your Financial Profile", text: "Configure your preferred currency, set monthly budget limits, and define spending categories." },
    { name: "Add Your Financial Data", text: "Enter your income sources, recurring expenses, active subscriptions, outstanding loans, and savings goals." },
    { name: "Track Daily Spending", text: "Log your expenses as they happen or at the end of each day using our quick-add features." },
    { name: "Analyze Your Patterns", text: "View beautiful charts and visualizations that reveal your spending habits and trends." },
    { name: "Optimize and Grow", text: "Use your insights to make better financial decisions and watch your financial health improve." }
  ];

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Your Free Account",
      subtitle: "Get started in under 60 seconds",
      description: "Sign up with just your email address and create a secure password. No credit card required, no hidden fees. Your account is protected with bank-level encryption from day one.",
      details: [
        "Quick email verification process",
        "Secure password with encryption",
        "Instant access to all features",
        "No payment information needed"
      ],
      tip: "Pro Tip: Use a strong, unique password and enable browser password saving for quick access."
    },
    {
      number: "02",
      icon: Wallet,
      title: "Set Up Your Financial Profile",
      subtitle: "Customize Trackora to match your financial life",
      description: "Configure your preferred currency, set your monthly budget limits, and define spending categories that make sense for your lifestyle. The more personalized your setup, the better insights you'll receive.",
      details: [
        "Choose from 30+ supported currencies",
        "Set custom spending categories",
        "Define monthly budget limits",
        "Configure notification preferences"
      ],
      tip: "Pro Tip: Start with broad categories (Food, Transport, Bills) and add specific ones as you learn your patterns."
    },
    {
      number: "03",
      icon: PlusCircle,
      title: "Add Your Financial Data",
      subtitle: "Build your complete financial picture",
      description: "Enter your income sources, recurring expenses, active subscriptions, outstanding loans, and savings goals. Trackora's quick-add feature makes data entry fast and painless.",
      details: [
        "Quick-add buttons for common expenses",
        "Automatic category suggestions",
        "Support for multiple income sources",
        "Easy recurring transaction setup"
      ],
      tip: "Pro Tip: Spend 10 minutes adding your regular monthly expenses first. Daily tracking becomes much easier afterward."
    },
    {
      number: "04",
      icon: BarChart3,
      title: "Track Daily Spending",
      subtitle: "Build the habit that changes everything",
      description: "Log your expenses as they happen or at the end of each day. Trackora makes tracking so simple that it becomes a natural part of your routine. Each transaction takes just seconds to add.",
      details: [
        "Add expenses in under 5 seconds",
        "Automatic date and category defaults",
        "Optional notes for context",
        "Edit or delete any transaction easily"
      ],
      tip: "Pro Tip: Set a daily reminder to log expenses. Consistency is more important than perfection."
    },
    {
      number: "05",
      icon: PieChart,
      title: "Analyze Your Patterns",
      subtitle: "Discover where your money actually goes",
      description: "View beautiful charts and visualizations that reveal your spending habits. See monthly comparisons, category breakdowns, and trend analysis that help you understand your financial behavior.",
      details: [
        "Interactive spending charts",
        "Category-wise expense breakdown",
        "Monthly income vs expense comparison",
        "Historical trend analysis"
      ],
      tip: "Pro Tip: Review your analytics every Sunday. This 5-minute habit provides clarity for the week ahead."
    },
    {
      number: "06",
      icon: TrendingUp,
      title: "Optimize and Grow",
      subtitle: "Make informed decisions that build wealth",
      description: "Use your insights to make better financial decisions. Identify areas to cut back, track progress toward savings goals, and watch your financial health improve month over month.",
      details: [
        "Identify unnecessary expenses",
        "Track savings goal progress",
        "Monitor debt payoff timeline",
        "Celebrate financial milestones"
      ],
      tip: "Pro Tip: Focus on your top 3 spending categories first. Small improvements there create big results."
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save 5+ Hours Monthly",
      description: "Automated categorization and quick-add features eliminate the tedious parts of financial tracking."
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit AES encryption protects your data. Your financial information is safer than in most banking apps."
    },
    {
      icon: Lightbulb,
      title: "Actionable Insights",
      description: "Not just charts—specific recommendations based on your spending patterns and goals."
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Get notified before subscription renewals and when you're approaching budget limits."
    }
  ];

  const faqs = [
    {
      q: "How long does it take to see results?",
      a: "Most users notice improved financial awareness within the first week. Significant behavior changes and savings typically occur within 30-60 days of consistent tracking."
    },
    {
      q: "Do I need to track every single expense?",
      a: "Not necessarily. Focus on capturing at least 80% of your spending, especially larger purchases. Over time, tracking becomes second nature and you'll naturally capture more."
    },
    {
      q: "What if I forget to track for a few days?",
      a: "No problem! You can add past transactions by changing the date. Review your bank statement or receipts to catch up. Consistency over time matters more than daily perfection."
    },
    {
      q: "Can I use Trackora on my phone?",
      a: "Absolutely! Trackora is a Progressive Web App (PWA) that works beautifully on all devices. Add it to your home screen for instant access—no app store download required."
    }
  ];

  return (
    <>
      <SEOHead
        title="How Trackora Works - Step-by-Step Guide to Financial Clarity"
        description="Learn how to use Trackora expense tracker in 6 simple steps. From creating your account to analyzing spending patterns and achieving your financial goals."
        keywords="how to use Trackora, expense tracking guide, budget tracker tutorial, financial tracking steps, personal finance app guide"
        canonicalUrl="https://trackorapp.in/how-it-works"
      />
      <SchemaMarkup
        type="howto"
        name="How to Take Control of Your Finances with Trackora"
        description="A step-by-step guide to using Trackora for expense tracking and budget management."
        steps={howToSteps}
      />
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-foreground">Trackora</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
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
            <Lightbulb className="h-4 w-4" />
            Step-by-step guide to financial clarity
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How Trackora <span className="text-primary">Works</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your financial life in six simple steps. From creating your account to achieving your 
            financial goals, here's exactly how Trackora helps you take control of your money.
          </p>
        </motion.div>

        {/* Device Compatibility Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <Laptop className="h-6 w-6 text-primary" />
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Works everywhere:</strong> Access Trackora from any device—desktop, tablet, or smartphone. 
                Your data syncs automatically across all your devices.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Step Number */}
                    <div className="bg-gradient-to-br from-primary to-secondary p-6 lg:p-8 lg:w-48 flex flex-col items-center justify-center text-center">
                      <span className="text-4xl lg:text-5xl font-bold text-primary-foreground opacity-80">
                        {step.number}
                      </span>
                      <step.icon className="h-8 w-8 text-primary-foreground mt-2" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8">
                      <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-1">{step.title}</h2>
                        <p className="text-primary font-medium">{step.subtitle}</p>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">💡 {step.tip.split(":")[0]}:</span>
                          {step.tip.split(":").slice(1).join(":")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why This <span className="text-primary">Approach Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trackora is designed based on behavioral science principles that make financial 
              tracking sustainable and effective.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <Link to="/faq" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
                  View all FAQs <ArrowRight className="h-4 w-4" />
                </Link>
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
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-2 border-primary/20 overflow-hidden">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Take Control?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands who have transformed their financial lives with Trackora. 
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
                <Link to="/features">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-10 py-7 rounded-2xl border-2"
                  >
                    Explore Features
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
    </>
  );
}