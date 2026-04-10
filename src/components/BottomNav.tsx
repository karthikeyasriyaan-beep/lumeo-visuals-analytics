import { Link, useLocation } from "react-router-dom";
import { Home, Receipt, Sparkles, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, PiggyBank, CreditCard, Repeat, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CurrencySelector } from "@/components/currency-selector";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const coreNav = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Smart Import", href: "/smart-import", icon: Sparkles },
];

const moreNav = [
  { name: "Budget", href: "/budget", icon: Wallet },
  { name: "Savings", href: "/savings", icon: PiggyBank },
  { name: "Loans & Debts", href: "/loans", icon: CreditCard },
  { name: "Subscriptions", href: "/subscriptions", icon: Repeat },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = moreNav.some(item => location.pathname === item.href);

  const handleSignOut = async () => {
    setMoreOpen(false);
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <>
      {/* More menu overlay */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed bottom-16 left-0 right-0 z-50 bg-card border-t border-border/40 rounded-t-2xl shadow-xl p-4 safe-bottom"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold">More</p>
                <div className="flex gap-1.5">
                  <ThemeToggle />
                  <CurrencySelector />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {moreNav.map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all",
                        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-[10px] font-medium leading-tight">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 text-xs text-muted-foreground justify-start gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/40 safe-bottom lg:hidden">
        <div className="flex items-center justify-around h-14 max-w-md mx-auto">
          {coreNav.map(item => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all min-w-[56px]",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                <span className={cn("text-[9px] font-medium", isActive && "font-bold")}>{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all min-w-[56px]",
              isMoreActive || moreOpen ? "text-primary" : "text-muted-foreground"
            )}
          >
            <MoreHorizontal className={cn("h-5 w-5", (isMoreActive || moreOpen) && "stroke-[2.5]")} />
            <span className={cn("text-[9px] font-medium", (isMoreActive || moreOpen) && "font-bold")}>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
