import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CurrencyProvider } from "@/components/currency-selector";
import { MobileNav } from "@/components/MobileNav";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Subscriptions from "./pages/Subscriptions";
import Loans from "./pages/Loans";
import Savings from "./pages/Savings";
import Analytics from "./pages/Analytics";
import Budget from "./pages/Budget";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import PersonalFinanceBasics from "./pages/blog/PersonalFinanceBasics";
import SmartBudgetingStrategies from "./pages/blog/SmartBudgetingStrategies";
import DebtPayoffStrategies from "./pages/blog/DebtPayoffStrategies";
import SubscriptionAuditGuide from "./pages/blog/SubscriptionAuditGuide";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { CookieConsent } from "./components/CookieConsent";

function AppLayout() {
  const location = useLocation();
  const publicPaths = ["/", "/privacy", "/terms", "/features", "/about", "/contact", "/faq", "/blog"];
  const showNav = !publicPaths.includes(location.pathname) && !location.pathname.startsWith("/blog/");

  return (
    <div className="min-h-screen w-full overflow-x-hidden scroll-smooth">
      {showNav && <MobileNav />}
      <div className={showNav ? "pt-14 sm:pt-16" : ""}>
        <Outlet />
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CurrencyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <CookieConsent />
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Welcome />} />
                
                <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/loans" element={<Loans />} />
                  <Route path="/savings" element={<Savings />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>

                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/features" element={<Features />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/personal-finance-basics" element={<PersonalFinanceBasics />} />
                <Route path="/blog/smart-budgeting-strategies" element={<SmartBudgetingStrategies />} />
                <Route path="/blog/debt-payoff-strategies" element={<DebtPayoffStrategies />} />
                <Route path="/blog/subscription-audit-guide" element={<SubscriptionAuditGuide />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </CurrencyProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
