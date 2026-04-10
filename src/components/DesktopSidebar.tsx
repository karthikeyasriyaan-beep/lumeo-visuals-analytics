import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, Receipt, Sparkles, Wallet, PiggyBank, CreditCard, Repeat, Settings, LogOut, ChevronDown
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CurrencySelector } from "@/components/currency-selector";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Smart Import", href: "/smart-import", icon: Sparkles, badge: "⭐" },
];

const manageNav = [
  { name: "Budget", href: "/budget", icon: Wallet },
  { name: "Savings", href: "/savings", icon: PiggyBank },
  { name: "Loans & Debts", href: "/loans", icon: CreditCard },
  { name: "Subscriptions", href: "/subscriptions", icon: Repeat },
];

export function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tryMoreOpen, setTryMoreOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const NavItem = ({ item }: { item: { name: string; href: string; icon: typeof Home; badge?: string } }) => {
    const isActive = location.pathname === item.href;
    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        <item.icon className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{item.name}</span>
        {item.badge && (
          <span className="text-[9px] ml-auto">{item.badge}</span>
        )}
      </Link>
    );
  };

  return (
    <aside className="hidden lg:flex flex-col w-56 border-r border-border/40 bg-card/50 h-screen sticky top-0 p-4">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-2 px-3 mb-6">
        <span className="text-lg font-bold">Trackora</span>
      </Link>

      {/* Main */}
      <div className="space-y-1 mb-4">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Main</p>
        {mainNav.map(item => <NavItem key={item.href} item={item} />)}
      </div>

      {/* Manage */}
      <div className="space-y-1 mb-4">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Manage</p>
        {manageNav.map(item => <NavItem key={item.href} item={item} />)}
      </div>

      {/* Try More */}
      <div className="mb-4">
        <button
          onClick={() => setTryMoreOpen(!tryMoreOpen)}
          className="flex items-center gap-2 px-3 py-2 w-full text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
        >
          <span>Try More</span>
          <ChevronDown className={cn("h-3 w-3 transition-transform", tryMoreOpen && "rotate-180")} />
        </button>
        {tryMoreOpen && (
          <div className="space-y-1 mt-1">
            <NavItem item={{ name: "Settings", href: "/settings", icon: Settings }} />
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="mt-auto space-y-3">
        <div className="flex items-center gap-2 px-1">
          <ThemeToggle />
          <CurrencySelector />
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-muted-foreground" onClick={handleSignOut}>
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
