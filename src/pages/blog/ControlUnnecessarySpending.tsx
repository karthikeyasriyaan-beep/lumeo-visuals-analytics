import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function ControlUnnecessarySpending() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-4xl">
        <Link to="/blog">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10">Spending Habits</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              How to Control Unnecessary Spending: Practical Strategies That Work
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                November 8, 2025
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                12 min read
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Trackora Team
              </div>
            </div>
          </header>

          <Card>
            <CardContent className="p-6 sm:p-10 prose prose-lg max-w-none">
              <p className="lead text-xl text-muted-foreground mb-8">
                Unnecessary spending is the silent wealth killer. It's not the big purchases that derail our finances—it's the countless small, thoughtless expenditures that add up to significant amounts over time. Learning to control this spending is essential for financial success.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Understanding Why We Overspend</h2>
              <p>
                Before we can control unnecessary spending, we need to understand why we do it. Our spending habits are influenced by psychology, emotions, social pressures, and marketing. Understanding these factors helps us develop effective strategies to combat them.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Emotional Spending</h3>
              <p>
                Many of us spend money to manage emotions. Stressed? Retail therapy. Bored? Online shopping. Sad? Comfort food delivery. Happy? Celebration purchases. Recognizing your emotional spending triggers is the first step to breaking these patterns.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Social Pressure</h3>
              <p>
                We often spend to keep up with friends, family, or social media influencers. The desire to appear successful or fit in drives purchases we wouldn't otherwise make. This "keeping up with the Joneses" mentality can be financially devastating.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Marketing Manipulation</h3>
              <p>
                Companies spend billions figuring out how to make you spend. Limited-time offers, fear of missing out, artificial scarcity—these tactics work because they bypass rational thinking. Awareness of these techniques helps you resist them.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">The True Cost of Small Purchases</h2>
              <p>
                Small purchases seem insignificant individually but add up dramatically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Daily coffee ($5):</strong> $1,825 per year, $18,250 over 10 years</li>
                <li><strong>Weekly takeout ($40):</strong> $2,080 per year, $20,800 over 10 years</li>
                <li><strong>Monthly subscriptions ($50):</strong> $600 per year, $6,000 over 10 years</li>
                <li><strong>Impulse purchases ($100/month):</strong> $1,200 per year, $12,000 over 10 years</li>
              </ul>
              <p>
                If invested instead at 7% annual return, these amounts would grow even larger. That daily coffee habit could be worth over $25,000 in a decade.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Strategies to Control Spending</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">1. Track Every Purchase</h3>
              <p>
                Awareness is the foundation of control. When you track every purchase—yes, even that $2 snack—you become acutely aware of where your money goes. This awareness alone often reduces unnecessary spending by 10-20%.
              </p>
              <p>
                Use an expense tracking app to make this easy. The goal isn't to judge yourself but to see reality clearly.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">2. Implement the 24-Hour Rule</h3>
              <p>
                For any non-essential purchase over a certain amount (say $50), wait 24 hours before buying. This cooling-off period allows the emotional impulse to fade, letting rational thinking prevail. You'll be surprised how many purchases you no longer want after waiting.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">3. Use the 10-10-10 Rule</h3>
              <p>
                Before making a purchase, ask yourself: How will I feel about this in 10 minutes? 10 days? 10 months? This perspective helps distinguish between momentary desires and genuine needs.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">4. Unsubscribe from Marketing</h3>
              <p>
                Reduce temptation by unsubscribing from promotional emails, unfollowing brands on social media, and using ad blockers. You can't desire what you don't see. Remove yourself from the constant stream of "buy this" messages.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">5. Create Spending Friction</h3>
              <p>
                Make spending more difficult:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Remove saved credit cards from websites</li>
                <li>Delete shopping apps from your phone</li>
                <li>Leave cards at home when going out</li>
                <li>Use cash for discretionary spending</li>
                <li>Add items to cart and wait before checking out</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">6. Find Free Alternatives</h3>
              <p>
                Many things we spend money on have free or cheaper alternatives:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Library instead of buying books</li>
                <li>Parks instead of paid entertainment venues</li>
                <li>Home workouts instead of expensive gym memberships</li>
                <li>Potlucks instead of restaurant dinners</li>
                <li>Free community events instead of paid activities</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">7. Practice Mindful Spending</h3>
              <p>
                Before any purchase, ask yourself:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Do I really need this?</li>
                <li>Will this add value to my life?</li>
                <li>Can I afford this without affecting my goals?</li>
                <li>Is this the best use of this money?</li>
                <li>Am I buying this for the right reasons?</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Breaking Specific Spending Habits</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Online Shopping Addiction</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Delete shopping apps and bookmarks</li>
                <li>Implement a mandatory waiting period</li>
                <li>Keep a list of what you actually need</li>
                <li>Calculate cost in hours of work</li>
                <li>Find other activities for boredom</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Dining Out Excess</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Set a monthly dining budget and track it</li>
                <li>Plan meals for the week</li>
                <li>Make restaurant outings special occasions</li>
                <li>Learn to cook your favorite restaurant meals</li>
                <li>Pack lunch for work</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Subscription Creep</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>List all current subscriptions</li>
                <li>Cancel anything unused in 30 days</li>
                <li>Share subscriptions with family when allowed</li>
                <li>Use free trials carefully</li>
                <li>Review subscriptions monthly</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Building Better Habits</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Replace Spending with Saving</h3>
              <p>
                When you successfully resist an unnecessary purchase, transfer that amount to savings. This transforms the deprivation mindset into a winning mindset—you're not losing a purchase, you're gaining savings.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Celebrate Non-Spending Wins</h3>
              <p>
                Acknowledge when you make good choices. Turned down an impulse purchase? That's worth celebrating. This positive reinforcement builds better habits over time.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Focus on Experiences Over Things</h3>
              <p>
                Research shows experiences provide more lasting happiness than possessions. Redirect spending from stuff to meaningful experiences—often free or low-cost—that create memories and connections.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">When Spending Is Worth It</h2>
              <p>
                Controlling spending doesn't mean never spending. Some purchases are worth every penny:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Health and safety:</strong> Medical care, safe transportation, quality food</li>
                <li><strong>Time savings:</strong> Tools that significantly save time for productive use</li>
                <li><strong>Quality investments:</strong> Items that last longer and perform better</li>
                <li><strong>Experiences:</strong> Meaningful experiences with loved ones</li>
                <li><strong>Skills and education:</strong> Learning that increases earning potential</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">The Bigger Picture</h2>
              <p>
                Controlling unnecessary spending isn't about deprivation—it's about alignment. It's ensuring your money goes toward what truly matters to you rather than trickling away on things that don't add value to your life.
              </p>
              <p>
                Every dollar has a job to do. When you spend mindlessly, dollars slip away without purpose. When you spend intentionally, every dollar works toward your goals and values.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
              <p>
                Unnecessary spending is a habit, and habits can be changed. Start by becoming aware of your spending through tracking. Then, implement strategies that work for your triggers and tendencies. Build friction into spending and remove it from saving.
              </p>
              <p>
                Remember, the goal isn't to stop spending entirely—it's to spend intentionally on what truly matters while eliminating waste. This balance leads to both financial success and a satisfying life.
              </p>

              <div className="mt-10 p-6 bg-primary/5 rounded-lg">
                <p className="font-semibold text-lg mb-2">Track and Control Your Spending</p>
                <p className="text-muted-foreground">
                  Trackora helps you see exactly where your money goes, identify unnecessary spending, and build better financial habits. Start taking control today.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.article>
      </div>
      
      <Footer />
    </div>
  );
}
