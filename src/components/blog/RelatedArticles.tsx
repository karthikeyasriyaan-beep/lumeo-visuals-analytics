import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface RelatedArticle {
  slug: string;
  title: string;
  category: string;
}

interface RelatedArticlesProps {
  currentSlug: string;
}

const allArticles: RelatedArticle[] = [
  { slug: "what-is-personal-finance", title: "What is Personal Finance? A Complete Beginner's Guide", category: "Finance Basics" },
  { slug: "why-tracking-expenses", title: "Why Tracking Expenses is the First Step to Financial Freedom", category: "Expense Tracking" },
  { slug: "fifty-thirty-twenty-rule", title: "The 50/30/20 Rule Explained: A Simple Budget That Works", category: "Budgeting" },
  { slug: "personal-finance-basics", title: "Personal Finance Basics: A Beginner's Guide", category: "Finance Tips" },
  { slug: "build-emergency-fund", title: "How to Build an Emergency Fund: Your Financial Safety Net", category: "Savings" },
  { slug: "money-management-students", title: "Money Management Tips for Students", category: "Student Finance" },
  { slug: "smart-budgeting-strategies", title: "Smart Budgeting Strategies That Actually Work in 2025", category: "Budgeting" },
  { slug: "control-unnecessary-spending", title: "How to Control Unnecessary Spending", category: "Spending Habits" },
  { slug: "freelancer-income-tracking", title: "How Freelancers Can Track Irregular Income Properly", category: "Freelance Finance" },
  { slug: "digital-vs-manual-tracking", title: "Manual vs Digital Expense Tracking: Which is Right?", category: "Finance Tools" },
  { slug: "financial-goal-setting", title: "How to Set Financial Goals Using an Expense Tracker", category: "Goal Setting" },
  { slug: "psychology-of-spending", title: "The Psychology of Spending: Why We Overspend", category: "Behavioral Finance" },
  { slug: "debt-payoff-strategies", title: "Proven Debt Payoff Strategies: Snowball vs. Avalanche", category: "Debt Management" },
  { slug: "subscription-audit-guide", title: "How to Perform a Subscription Audit and Save Hundreds", category: "Money Saving" },
];

export const RelatedArticles = ({ currentSlug }: RelatedArticlesProps) => {
  // Filter out current article and get 3 random related articles
  const related = allArticles
    .filter(article => article.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h3 className="text-xl font-bold mb-6">Related Articles</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map((article) => (
          <Link key={article.slug} to={`/blog/${article.slug}`}>
            <Card className="h-full hover:shadow-md transition-all group cursor-pointer border-border/50 hover:border-primary/30">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10 inline-block mb-2">
                  {article.category}
                </span>
                <h4 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h4>
                <span className="inline-flex items-center text-xs text-primary font-medium group-hover:underline">
                  Read More <ArrowRight className="ml-1 w-3 h-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
