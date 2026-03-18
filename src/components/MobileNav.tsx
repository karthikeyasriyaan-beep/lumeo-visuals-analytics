import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Receipt, TrendingUp, Repeat, CreditCard, PiggyBank, BarChart3, Settings, LogOut, Calculator, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/theme-toggle";
import { CurrencySelector } from "@/components/currency-selector";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
const navigation = [{
  name: "Dashboard",
  href: "/dashboard",
  icon: Home
}, {
  name: "Transactions",
  href: "/transactions",
  icon: Receipt
}, {
  name: "Budget",
  href: "/budget",
  icon: Wallet
}, {
  name: "Subscriptions",
  href: "/subscriptions",
  icon: Repeat
}, {
  name: "Loans",
  href: "/loans",
  icon: CreditCard
}, {
  name: "Savings",
  href: "/savings",
  icon: PiggyBank
}, {
  name: "Analytics",
  href: "/analytics",
  icon: BarChart3
}, {
  name: "Settings",
  href: "/settings",
  icon: Settings
}];
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };
  return <>
      <motion.header initial={{
      y: -100
    }} animate={{
      y: 0
    }} className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50 safe-top">
        <div className="flex items-center justify-between px-3 sm:px-4 h-14 sm:h-16">
          <Link to="/dashboard" className="flex items-center gap-2 min-w-0">
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="text-lg sm:text-xl font-bold gradient-text truncate text-card-foreground">
              Trame
            </motion.div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <ThemeToggle />
            <CurrencySelector />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative h-9 w-9 sm:h-10 sm:w-10">
              <AnimatePresence mode="wait">
                {isOpen ? <motion.div key="close" initial={{
                rotate: -90,
                opacity: 0
              }} animate={{
                rotate: 0,
                opacity: 1
              }} exit={{
                rotate: 90,
                opacity: 0
              }} transition={{
                duration: 0.2
              }}>
                    <X className="h-5 w-5" />
                  </motion.div> : <motion.div key="menu" initial={{
                rotate: 90,
                opacity: 0
              }} animate={{
                rotate: 0,
                opacity: 1
              }} exit={{
                rotate: -90,
                opacity: 0
              }} transition={{
                duration: 0.2
              }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.2
        }} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />

            <motion.nav initial={{
          x: "100%"
        }} animate={{
          x: 0
        }} exit={{
          x: "100%"
        }} transition={{
          type: "spring",
          damping: 25,
          stiffness: 200
        }} className="fixed top-14 sm:top-16 right-0 bottom-0 w-64 sm:w-72 glass-strong border-l border-border/50 z-50 overflow-y-auto safe-bottom">
              <div className="p-4 sm:p-6 space-y-2">
                {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return <motion.div key={item.href} initial={{
                x: 50,
                opacity: 0
              }} animate={{
                x: 0,
                opacity: 1
              }} transition={{
                delay: index * 0.05
              }}>
                      <Link to={item.href} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all min-h-[44px] ${isActive ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted"}`}>
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base break-words">{item.name}</span>
                      </Link>
                    </motion.div>;
            })}

                <motion.div initial={{
              x: 50,
              opacity: 0
            }} animate={{
              x: 0,
              opacity: 1
            }} transition={{
              delay: navigation.length * 0.05
            }} className="pt-4 border-t border-border mt-4">
                  <Button variant="ghost" className="w-full justify-start gap-3 min-h-[44px] text-sm sm:text-base" onClick={handleSignOut}>
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className="break-words">Sign Out</span>
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          </>}
      </AnimatePresence>
    </>;
}