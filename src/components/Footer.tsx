import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg text-foreground mb-3">Trackora</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Trackora is a simple expense tracking platform designed to help individuals record their daily spending and understand their financial habits more clearly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How Trackora Works</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms and Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Contact</h3>
            <p className="text-sm text-foreground mb-1">
              Email:{" "}
              <a href="mailto:contact@trackora.com" className="text-primary hover:underline">
                contact@trackora.com
              </a>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you have questions or feedback about Trackora, feel free to contact us.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Trackora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}