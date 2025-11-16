import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("trackora-cookie-consent");
    if (!consent) {
      // Show after a short delay for better UX
      setTimeout(() => setShowConsent(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("trackora-cookie-consent", "accepted");
    setShowConsent(false);
  };

  const rejectNonEssential = () => {
    localStorage.setItem("trackora-cookie-consent", "essential-only");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <Card className="p-6 shadow-2xl border-2 bg-card/95 backdrop-blur-lg">
        <button
          onClick={rejectNonEssential}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <Cookie className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-base mb-2">We value your privacy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to enhance your experience, analyze site traffic, and provide personalized content. 
              Your data is always protected and never sold.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            onClick={acceptAll}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            size="sm"
          >
            Accept All
          </Button>
          <Button
            onClick={rejectNonEssential}
            variant="outline"
            className="flex-1 rounded-xl"
            size="sm"
          >
            Essential Only
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Learn more in our{" "}
          <a href="/privacy" className="underline hover:text-primary transition-colors">
            Privacy Policy
          </a>
        </p>
      </Card>
    </div>
  );
}
