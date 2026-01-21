import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Footer } from "@/components/Footer";
import { AuthorSection } from "@/components/blog/AuthorSection";
import { RelatedArticles } from "@/components/blog/RelatedArticles";

export default function PersonalFinanceBasics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10">
                Finance Tips
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Personal Finance Basics: A Beginner's Guide to Taking Control of Your Money
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                November 15, 2025
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                8 min read
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Trackora Team
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <Card className="mb-8">
              <CardContent className="p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  Taking control of your personal finances can feel overwhelming, especially when you're just starting out. 
                  But the truth is, managing money well doesn't require a finance degree or complex spreadsheets. 
                  With the right foundation and simple habits, anyone can build financial security and work toward their goals.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Understanding Your Financial Foundation</h2>
                
                <p>
                  The first step in personal finance is understanding where you stand today. This means knowing exactly how much 
                  money comes in each month (your income) and how much goes out (your expenses). Many people skip this crucial 
                  step and wonder why they feel financially stressed despite earning a good income.
                </p>

                <p>
                  Start by tracking every single expense for at least one month. This includes everything from your rent or 
                  mortgage payment to that morning coffee. Modern tools like Trackora make this incredibly easy with features 
                  like automatic categorization and visual budgeting, so managing your finances becomes effortless.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Core Principles of Financial Wellness</h2>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1. Create a Realistic Budget</h3>
                <p>
                  A budget isn't about restricting yourself—it's about making intentional choices with your money. The popular 
                  50/30/20 rule is a great starting point: allocate 50% of your income to needs (housing, food, utilities), 
                  30% to wants (entertainment, dining out), and 20% to savings and debt repayment.
                </p>
                <p>
                  Don't aim for perfection in your first month. Your budget should evolve as you learn your actual spending 
                  patterns and find what works for your lifestyle. The key is consistency, not perfection.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2. Build an Emergency Fund</h3>
                <p>
                  Life is unpredictable. Your car breaks down, your laptop crashes, or unexpected medical expenses arise. 
                  An emergency fund prevents these surprises from becoming financial disasters. Start with a goal of saving 
                  ₹10,000 or $500, then gradually build up to 3-6 months of living expenses.
                </p>
                <p>
                  Keep this money in a separate savings account that's easy to access but not so convenient that you're 
                  tempted to dip into it for non-emergencies. Even saving ₹500 or $50 per month adds up faster than you think.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3. Tackle Debt Strategically</h3>
                <p>
                  Not all debt is created equal. High-interest debt like credit cards can quickly spiral out of control, 
                  while low-interest debt like student loans or mortgages may be manageable. Prioritize paying off 
                  high-interest debt first to save money on interest charges.
                </p>
                <p>
                  Two popular strategies are the "debt snowball" method (paying off smallest debts first for psychological 
                  wins) and the "debt avalanche" method (paying off highest interest rate debts first to save the most money). 
                  Choose whichever keeps you motivated and consistent.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4. Automate Your Savings</h3>
                <p>
                  The best way to save money is to make it automatic. Set up automatic transfers from your checking account 
                  to your savings account right after you get paid. When you automate savings, you remove the decision-making 
                  and temptation to spend that money elsewhere.
                </p>
                <p>
                  Start small if you need to—even ₹1,000 or $100 per month builds meaningful savings over time. As your 
                  income grows or you pay off debts, gradually increase the amount you're automatically saving.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Common Financial Mistakes to Avoid</h2>

                <p>
                  <strong>Lifestyle inflation:</strong> When your income increases, it's tempting to immediately upgrade 
                  your lifestyle. Instead, try to save or invest at least 50% of any raise or bonus you receive.
                </p>

                <p>
                  <strong>Ignoring small expenses:</strong> Those daily ₹200 coffees or $5 subscriptions you forgot about 
                  add up to thousands per year. Track everything, and you'll be surprised where your money actually goes.
                </p>

                <p>
                  <strong>Not planning for irregular expenses:</strong> Things like car maintenance, annual insurance 
                  premiums, or holiday gifts aren't emergencies—they're predictable irregular expenses. Set aside money 
                  for these throughout the year.
                </p>

                <p>
                  <strong>Waiting to save or invest:</strong> The power of compound interest means that starting early, 
                  even with small amounts, beats starting later with larger amounts. Don't wait until you have "extra" 
                  money—make saving a priority now.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Using Technology to Stay on Track</h2>

                <p>
                  Modern financial management tools have made it easier than ever to take control of your money. Apps like 
                  Trackora provide features that would have required hours of manual work just a decade ago:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Quick expense entry with automatic categorization</li>
                  <li>Visual budgets that show spending progress in real-time</li>
                  <li>Debt tracking that calculates payoff timelines and interest costs</li>
                  <li>Subscription monitoring to catch wasteful recurring charges</li>
                  <li>Savings goal trackers with progress rings and encouraging insights</li>
                </ul>

                <p>
                  The key is finding tools that fit naturally into your routine. The best financial system is the one 
                  you'll actually use consistently.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Your Financial Journey Starts Now</h2>

                <p>
                  Personal finance isn't about perfection or making huge sacrifices. It's about making informed choices, 
                  building good habits, and being intentional with your money. Start with small, manageable steps:
                </p>

                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Track your expenses for one month to understand your baseline</li>
                  <li>Create a simple budget based on your actual spending patterns</li>
                  <li>Start building an emergency fund, even if it's just ₹500 or $50 per month</li>
                  <li>If you have debt, make a plan to tackle it strategically</li>
                  <li>Automate your savings so it happens without thinking about it</li>
                </ol>

                <p>
                  Remember, financial wellness is a journey, not a destination. There will be setbacks and unexpected 
                  expenses. What matters is having a system in place that helps you recover and keep moving forward. 
                  Every small step you take today builds toward a more secure financial future.
                </p>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-base font-medium text-foreground">
                    Ready to take control of your finances? <Link to="/" className="text-primary hover:underline">
                    Get started with Trackora</Link> and track your expenses, set budgets, and work toward your 
                    financial goals with ease.
                  </p>
                </div>

                <AuthorSection />
                <RelatedArticles currentSlug="personal-finance-basics" />
              </CardContent>
            </Card>
          </div>
        </motion.article>
      </div>
      
      <Footer />
    </div>
  );
}
