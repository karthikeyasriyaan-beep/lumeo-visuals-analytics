import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Wallet, PiggyBank, Repeat, LayoutDashboard, ArrowRight, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Welcome to Trackora",
    text: "Trackora helps you record your daily expenses, track budgets, monitor savings, and stay aware of your financial habits.",
    button: "Get Started",
    icon: null,
  },
  {
    title: "Track Your Expenses",
    text: "Easily record your daily spending by adding expenses with categories, notes, and receipt images. Keeping a record of your expenses helps you understand where your money goes.",
    button: "Next",
    icon: Receipt,
  },
  {
    title: "Manage Your Budget",
    text: "Set monthly budgets to control spending and monitor how much of your budget has been used. Trackora helps you stay within your planned financial limits.",
    button: "Next",
    icon: Wallet,
  },
  {
    title: "Track Your Savings Goals",
    text: "Create savings goals and monitor your progress over time. Trackora helps you stay motivated while building your financial future.",
    button: "Next",
    icon: PiggyBank,
  },
  {
    title: "Manage Subscriptions and Loans",
    text: "Keep track of recurring subscriptions, loans, and debts in one place so you always know your financial commitments.",
    button: "Next",
    icon: Repeat,
  },
  {
    title: "Your Financial Dashboard",
    text: "The Trackora dashboard gives you a clear overview of expenses, budgets, savings, and subscriptions so you can quickly understand your financial activity.",
    button: "Start Using Trackora",
    icon: LayoutDashboard,
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const finish = () => {
    localStorage.setItem("trame_onboarded", "true");
    navigate("/dashboard");
  };

  const next = () => {
    if (current === steps.length - 1) {
      finish();
    } else {
      setCurrent((p) => p + 1);
    }
  };

  const step = steps[current];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Skip button */}
      {current < steps.length - 1 && (
        <div className="fixed top-4 right-4 z-10">
          <Button variant="ghost" size="sm" onClick={finish} className="gap-1.5 text-muted-foreground">
            Skip <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : i < current ? "w-2 bg-primary/50" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-6"
          >
            {Icon && (
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-8 w-8 text-primary" />
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold">{step.title}</h1>
            <p className="text-muted-foreground leading-relaxed">{step.text}</p>

            <Button size="lg" onClick={next} className="gap-2 mt-4">
              {step.button} <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
