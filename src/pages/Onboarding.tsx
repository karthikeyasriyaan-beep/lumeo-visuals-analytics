import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Wallet, PiggyBank, Repeat, LayoutDashboard, ArrowRight, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Welcome to Trackora",
    text: "Trackora helps you record daily expenses, track budgets, monitor savings, and stay aware of your financial habits.",
    button: "Get Started",
    icon: null,
  },
  {
    title: "Track Expenses",
    text: "Record your daily spending with categories and notes. Know where your money goes.",
    button: "Next",
    icon: Receipt,
  },
  {
    title: "Manage Budget",
    text: "Set monthly budgets and monitor how much you've used to stay within limits.",
    button: "Next",
    icon: Wallet,
  },
  {
    title: "Savings Goals",
    text: "Create savings goals and track progress over time toward your financial future.",
    button: "Next",
    icon: PiggyBank,
  },
  {
    title: "Subscriptions & Loans",
    text: "Track recurring subscriptions and loans so you always know your commitments.",
    button: "Next",
    icon: Repeat,
  },
  {
    title: "Your Dashboard",
    text: "Get a clear overview of expenses, budgets, savings, and subscriptions in one place.",
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
          <Button variant="ghost" size="sm" onClick={finish} className="gap-1.5 text-muted-foreground text-xs">
            Skip <SkipForward className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      <div className="w-full max-w-sm">
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-primary" : i < current ? "w-1.5 bg-primary/50" : "w-1.5 bg-muted"
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
            className="text-center space-y-4"
          >
            {Icon && (
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            )}

            <h1 className="text-lg sm:text-xl font-bold">{step.title}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.text}</p>

            <Button size="default" onClick={next} className="gap-1.5 mt-3 text-sm">
              {step.button} <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
