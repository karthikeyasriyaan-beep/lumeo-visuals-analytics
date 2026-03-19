import { User } from "lucide-react";

export const AuthorSection = () => {
  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/30 border border-border/50">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">About the Trackora Team</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The Trackora editorial team consists of personal finance experts, certified financial planners, and experienced writers dedicated to helping you take control of your money. Our mission is to provide actionable, research-backed financial guidance that makes sense for real life.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">Personal Finance</span>
            <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium">Budgeting</span>
            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">Debt Management</span>
          </div>
        </div>
      </div>
    </section>
  );
};
