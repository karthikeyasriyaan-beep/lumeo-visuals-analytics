import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Footer } from "@/components/Footer";
import { AuthorSection } from "@/components/blog/AuthorSection";
import { RelatedArticles } from "@/components/blog/RelatedArticles";

export default function DebtPayoffStrategies() {
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
                Debt Management
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Proven Debt Payoff Strategies: Snowball vs. Avalanche Method
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                October 28, 2025
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                9 min read
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
                  Feeling overwhelmed by debt is one of the most stressful financial situations. Whether it's credit cards, 
                  student loans, personal loans, or medical bills, carrying multiple debts can feel impossible to manage. 
                  The good news is that with the right strategy and consistent effort, anyone can become debt-free.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Understanding Your Debt Landscape</h2>
                
                <p>
                  Before choosing a payoff strategy, you need a clear picture of your debt situation. Make a comprehensive 
                  list including:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The name of each creditor or loan</li>
                  <li>Current balance owed</li>
                  <li>Interest rate (APR)</li>
                  <li>Minimum monthly payment</li>
                  <li>Due date each month</li>
                </ul>

                <p>
                  This snapshot helps you understand not just how much you owe, but how much interest is costing you each 
                  month. Many people are shocked to discover that a significant portion of their minimum payments goes 
                  toward interest rather than reducing the actual debt.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Debt Snowball Method: Build Momentum Through Quick Wins</h2>

                <p>
                  The debt snowball method, popularized by personal finance expert Dave Ramsey, focuses on psychological 
                  wins to keep you motivated. Here's how it works:
                </p>

                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>List all your debts from smallest balance to largest, regardless of interest rate</li>
                  <li>Make minimum payments on all debts except the smallest one</li>
                  <li>Put any extra money toward the smallest debt</li>
                  <li>When the smallest debt is paid off, take that payment amount and add it to the minimum payment of the next smallest debt</li>
                  <li>Repeat this process, creating a "snowball" effect as payments get larger</li>
                </ol>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Why the Snowball Works</h3>
                <p>
                  The genius of this method lies in psychology. Paying off a debt completely provides a motivational boost 
                  that keeps you engaged in the process. Each eliminated debt is a concrete victory, making the journey feel 
                  achievable rather than endless.
                </p>

                <p>
                  <strong>Example:</strong> Imagine you have three debts: a ₹5,000 medical bill, a ₹15,000 credit card, 
                  and a ₹50,000 personal loan. With the snowball method, you'd attack the ₹5,000 medical bill first. 
                  Paying it off in a few months provides a psychological win that motivates you to tackle the next debt.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Debt Avalanche Method: Maximize Interest Savings</h2>

                <p>
                  The debt avalanche method takes a purely mathematical approach, focusing on minimizing the total interest 
                  you'll pay:
                </p>

                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>List all your debts from highest interest rate to lowest</li>
                  <li>Make minimum payments on all debts except the one with the highest interest rate</li>
                  <li>Put any extra money toward the highest-interest debt</li>
                  <li>Once paid off, move to the debt with the next highest interest rate</li>
                  <li>Continue until all debts are eliminated</li>
                </ol>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Why the Avalanche Saves Money</h3>
                <p>
                  Mathematically, this is the most efficient method. High-interest debt compounds quickly, so eliminating 
                  it first reduces the total amount you'll pay over time. If you have credit cards charging 24% APR 
                  alongside student loans at 5%, the avalanche method saves significant money.
                </p>

                <p>
                  <strong>Example:</strong> Using the same three debts, if the credit card has 22% interest, the personal 
                  loan has 12%, and the medical bill has 0% interest, the avalanche method attacks the credit card first—even 
                  though it's not the smallest balance.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Snowball vs. Avalanche: Which Should You Choose?</h2>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Choose the Snowball Method If:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You need motivational wins to stay committed</li>
                  <li>Your interest rates are relatively similar across debts</li>
                  <li>You have several small debts that could be eliminated quickly</li>
                  <li>You've struggled to stick with debt repayment in the past</li>
                  <li>Psychological factors strongly influence your financial behavior</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Choose the Avalanche Method If:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You're motivated by maximizing financial efficiency</li>
                  <li>You have significant differences in interest rates between debts</li>
                  <li>You can stay motivated even with longer timelines to first payoff</li>
                  <li>You want to minimize total interest paid</li>
                  <li>You prefer making purely mathematical decisions</li>
                </ul>

                <p className="mt-4">
                  <strong>The Truth:</strong> Research shows that people are more likely to succeed with the snowball method 
                  because motivation matters more than math. However, if the avalanche method saves you thousands in interest 
                  and you can stay committed, it's the more efficient choice.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Hybrid Approaches and Advanced Strategies</h2>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">The Snowflake Method</h3>
                <p>
                  Supplement either strategy by applying small, unexpected amounts of money toward debt. Found ₹500 in an 
                  old jacket? Got a ₹2,000 tax refund? These "snowflakes" add up when applied immediately to debt reduction.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">The Modified Avalanche</h3>
                <p>
                  Start with the snowball method to eliminate one or two small debts quickly, then switch to the avalanche 
                  method. This provides early wins while still optimizing for interest savings on larger debts.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Balance Transfer Strategy</h3>
                <p>
                  If you have good credit, consider transferring high-interest credit card debt to a 0% APR balance transfer 
                  card. This can save thousands in interest, but requires discipline to pay off the balance before the 
                  promotional period ends.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Making Your Strategy Stick</h2>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Track Everything</h3>
                <p>
                  Use tools like Trackora to monitor all your debts in one place. Seeing your balances decrease provides 
                  motivation and helps you stay accountable. Visual progress indicators make the journey feel more tangible.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Automate Payments</h3>
                <p>
                  Set up automatic minimum payments for all debts to avoid late fees and credit score damage. Then make 
                  additional manual payments toward your target debt according to your chosen strategy.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Increase Income or Decrease Expenses</h3>
                <p>
                  The faster you can put extra money toward debt, the sooner you'll be free. Consider a side hustle, 
                  selling unused items, or cutting unnecessary subscriptions to accelerate your progress.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Celebrate Milestones</h3>
                <p>
                  When you pay off a debt, acknowledge it! Small celebrations reinforce positive behavior without derailing 
                  your progress. Even a special home-cooked meal or movie night can mark the occasion.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Avoiding New Debt While Paying Off Old Debt</h2>

                <p>
                  The biggest challenge in debt payoff is not accumulating new debt while eliminating old debt. Strategies 
                  to prevent this include:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Building a small emergency fund (₹10,000-25,000 or $500-1,000) before aggressively attacking debt</li>
                  <li>Using cash or debit cards instead of credit cards during your debt payoff journey</li>
                  <li>Creating a realistic budget that accounts for irregular expenses</li>
                  <li>Addressing the underlying behaviors that led to debt accumulation</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Your Debt-Free Future Starts Today</h2>

                <p>
                  Whether you choose the snowball method, avalanche method, or a hybrid approach, the most important step 
                  is starting. Debt payoff requires patience and consistency, but thousands of people become debt-free every 
                  year using these proven strategies.
                </p>

                <p>
                  Calculate how much extra you can put toward debt each month. Even an additional ₹2,000 or $100 per month 
                  makes a significant difference over time. Pick your method, commit to it for at least six months, and track 
                  your progress. The relief and freedom that come with eliminating debt are worth every sacrifice.
                </p>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-base font-medium text-foreground">
                    Ready to tackle your debt strategically? <Link to="/" className="text-primary hover:underline">
                    Use Trackora</Link> to monitor all your loans and debts in one place, track payoff progress, 
                    and receive reminders for upcoming payments—helping you stay on track toward financial freedom.
                  </p>
                </div>

                <AuthorSection />
                <RelatedArticles currentSlug="debt-payoff-strategies" />
              </CardContent>
            </Card>
          </div>
        </motion.article>
      </div>
      
      <Footer />
    </div>
  );
}
