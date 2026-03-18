import { Link } from "react-router-dom";
import { BarChart3, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="font-display font-bold text-xl">Trame</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Your personal finance companion. Track expenses, manage budgets, and achieve your financial goals with clarity.
            </p>
            <a 
              href="mailto:trackorateam@trackorapp.in" 
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              trackorateam@trackorapp.in
            </a>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Expense Tracking
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Budget Analytics
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Savings Goals
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Finance Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ & Help Center
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/budgeting-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Budgeting Guide
                </Link>
              </li>
              <li>
                <Link to="/savings-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Savings Guide
                </Link>
              </li>
              <li>
                <Link to="/debt-management-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Debt Management
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:trackorateam@trackorapp.in" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Business Inquiries
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Created by Sriyaan Karthikeya. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hyderabad, Telangana, India
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Smart expense tracking & budget analytics for everyone
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}