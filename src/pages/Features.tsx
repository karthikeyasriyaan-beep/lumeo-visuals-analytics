import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, DollarSign, Repeat, Target, Receipt, BarChart3, 
  Shield, Zap, CheckCircle2, ArrowRight,
  Sparkles, Globe
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      icon: Camera,
      title: "📸 Receipt Scanner — Snap & Forget",
      description: "The heart of Trackora. Take a photo of any receipt and watch the magic happen:",
      features: [
        "Automatic OCR extraction of amounts, vendors, dates, and categories",
        "Receipt library with searchable thumbnails",
        "Auto-organized by date and merchant",
        "Export receipt data for tax time or expense reports",
        "Works with printed receipts, digital invoices, and handwritten notes"
      ],
      highlight: "Never manually enter a receipt again — just snap and it's done.",
      color: "from-primary/20 to-accent/20"
    },
    {
      icon: DollarSign,
      title: "💰 Loans & Debts Tracker — Breathe Easy",
      description: "Managing debt shouldn't feel overwhelming. Trackora makes it calm and clear:",
      features: [
        "Track multiple loans: personal, student, home, car, credit cards",
        "Monitor interest rates and total interest paid",
        "Set up EMI reminders with friendly notifications",
        "Visualize debt payoff timelines",
        "See your progress month-by-month with encouraging insights"
      ],
      highlight: "Stay on top of debts comfortably, with peace of mind.",
      color: "from-accent/20 to-primary/20"
    },
    {
      icon: Repeat,
      title: "🔄 Subscription Management — No Surprises",
      description: "Streaming services, gym memberships, software tools — track them all:",
      features: [
        "See all subscriptions in one unified view",
        "Get alerts before auto-renewals",
        "Calculate total monthly and yearly subscription costs",
        "Identify subscriptions you might want to cancel",
        "Track billing cycles and payment methods"
      ],
      highlight: "No more surprise charges — you're always in control.",
      color: "from-primary/20 to-accent/20"
    },
    {
      icon: Target,
      title: "🎯 Goals & Progress — Celebrate Every Step",
      description: "Set financial goals that matter to you and watch your progress grow:",
      features: [
        "Create custom savings goals (vacation, emergency fund, gadget, etc.)",
        "Visual progress rings that feel rewarding",
        "Set target amounts and deadlines",
        "Track contributions over time",
        "Get gentle encouragement and milestone celebrations"
      ],
      highlight: "You're getting closer — keep going softly.",
      color: "from-accent/20 to-primary/20"
    },
    {
      icon: Receipt,
      title: "📝 Smart Expense & Income Tracking",
      description: "Every rupee accounted for — without the effort:",
      features: [
        "Quick-add buttons for common expenses",
        "Intelligent auto-categorization (food, transport, bills, etc.)",
        "Track multiple income sources",
        "Color-coded categories for easy visual scanning",
        "Add notes, tags, and custom fields",
        "Filter by date, category, or amount"
      ],
      highlight: "Tracking so simple, it feels automatic.",
      color: "from-primary/20 to-accent/20"
    },
    {
      icon: BarChart3,
      title: "📊 Friendly Analytics — Insights, Not Judgment",
      description: "Beautiful charts that help you understand your money story:",
      features: [
        "Monthly spending breakdowns by category",
        "Income vs. expenses comparison",
        "Trend analysis over weeks, months, and years",
        "Identify spending patterns and habits",
        "Export reports for budgeting or tax purposes",
        "All presented in warm, easy-to-read visualizations"
      ],
      highlight: "Numbers that help, not stress.",
      color: "from-accent/20 to-primary/20"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit encryption protects your data like a fortress."
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Access from any device, anywhere in the world."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Add expenses in seconds, not minutes."
    },
    {
      icon: CheckCircle2,
      title: "Always Free Beta",
      description: "Use Trackora free while we perfect the experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Trackora</span>
          </button>
          <Button onClick={() => navigate("/")} variant="ghost">
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          <CheckCircle2 className="h-4 w-4" />
          Every feature designed for peace of mind
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Features that make finance <span className="text-primary">feel simple</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Trackora brings together everything you need to manage your money with confidence and calm. 
          From receipt scanning to debt tracking, every feature is designed to reduce stress, not add to it.
        </motion.p>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-6 py-12">
        <div className="space-y-16">
          {mainFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`overflow-hidden border-2 hover:border-primary/50 transition-all bg-gradient-to-br ${feature.color}`}>
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/20 flex-shrink-0">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">{feature.title}</h2>
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-card/60 backdrop-blur rounded-xl p-6 mb-6">
                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <p className="text-sm font-medium text-primary italic text-center">
                      💡 {feature.highlight}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for your <span className="text-primary">comfort</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every detail designed to make financial management feel safe and simple
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 text-center border-2 hover:border-primary/50 transition-all h-full">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-primary/10">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 overflow-hidden">
          <CardContent className="p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to experience calm finance?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands finding peace of mind with Trackora. Free during beta, safe forever.
              </p>
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
