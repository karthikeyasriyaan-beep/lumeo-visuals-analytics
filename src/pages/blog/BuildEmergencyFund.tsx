import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function BuildEmergencyFund() {
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
              <span className="px-3 py-1 rounded-full bg-primary/10">Savings</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              How to Build an Emergency Fund: Your Financial Safety Net
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                November 14, 2025
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                10 min read
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
                An emergency fund is your financial safety net—money set aside specifically for life's unexpected expenses. Without one, a single emergency can derail your financial progress and send you spiraling into debt.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Why Emergency Funds Are Non-Negotiable</h2>
              <p>
                Life is unpredictable. Cars break down, jobs disappear, medical emergencies happen, and appliances fail at the worst possible times. Without an emergency fund, these unexpected expenses force you to rely on credit cards, loans, or depleting other savings—setting back your financial progress significantly.
              </p>
              <p>
                Research shows that nearly 60% of people cannot cover an unexpected $1,000 expense without borrowing. This statistic reveals how vulnerable most people are to financial emergencies. An emergency fund provides peace of mind and financial stability during life's inevitable challenges.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">How Much Should You Save?</h2>
              <p>
                Financial experts typically recommend saving three to six months of essential expenses. However, the right amount depends on your personal circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>3 Months:</strong> Appropriate if you have stable income, dual-income household, low debt, and good job security</li>
                <li><strong>6 Months:</strong> Better for single-income households, variable income, self-employed individuals, or those with dependents</li>
                <li><strong>9-12 Months:</strong> Consider this if you're self-employed with irregular income, work in a volatile industry, or have health concerns</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Calculating Your Target</h3>
              <p>
                To determine your emergency fund target, calculate your essential monthly expenses:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Housing (rent/mortgage)</li>
                <li>Utilities</li>
                <li>Food (groceries only)</li>
                <li>Transportation</li>
                <li>Insurance</li>
                <li>Minimum debt payments</li>
                <li>Essential medications</li>
              </ul>
              <p>
                Add these up, then multiply by your target number of months. For example, if essential expenses are $3,000 monthly and you want six months of coverage, your target is $18,000.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Where to Keep Your Emergency Fund</h2>
              <p>
                Your emergency fund needs to be accessible but not too tempting to use for non-emergencies. Here are the best options:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>High-Yield Savings Account:</strong> The gold standard for emergency funds. Earns interest while remaining easily accessible. Look for accounts with no minimum balance requirements and FDIC insurance.</li>
                <li><strong>Money Market Account:</strong> Similar to savings accounts but may offer slightly higher interest rates with some check-writing privileges.</li>
                <li><strong>Separate Bank:</strong> Consider keeping your emergency fund at a different bank than your checking account. The extra steps to access it can prevent impulsive withdrawals.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Where NOT to Keep Your Emergency Fund</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Checking Account:</strong> Too easy to spend accidentally</li>
                <li><strong>Stock Market:</strong> Too volatile—you could lose value when you need it most</li>
                <li><strong>CDs (Certificates of Deposit):</strong> Penalties for early withdrawal defeat the purpose</li>
                <li><strong>Cash at Home:</strong> Risk of theft, fire, or spending temptation</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Step-by-Step Guide to Building Your Fund</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Step 1: Start with $1,000</h3>
              <p>
                If you're starting from zero, aim for $1,000 as your initial goal. This "starter emergency fund" can cover most minor emergencies while you work on the larger goal. It provides immediate protection and builds confidence.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Step 2: Automate Your Savings</h3>
              <p>
                Set up automatic transfers from your checking account to your emergency fund. Even $50 or $100 per paycheck adds up. Treating savings like a bill ensures consistency and removes the temptation to skip contributions.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Step 3: Find Extra Money to Save</h3>
              <p>
                Accelerate your progress by finding additional money to save:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Tax refunds</li>
                <li>Work bonuses</li>
                <li>Birthday or holiday money</li>
                <li>Side hustle income</li>
                <li>Money from selling unused items</li>
                <li>Savings from cutting expenses</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Step 4: Reduce Expenses Temporarily</h3>
              <p>
                Consider temporarily cutting discretionary spending to build your fund faster. Cancel unused subscriptions, cook at home more, and pause non-essential purchases until you reach your initial goal.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Step 5: Increase Income if Possible</h3>
              <p>
                Additional income streams can dramatically accelerate your savings:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Freelance work in your skill area</li>
                <li>Part-time job</li>
                <li>Selling crafts or services</li>
                <li>Rideshare or delivery driving</li>
                <li>Tutoring or teaching</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">What Counts as an Emergency?</h2>
              <p>
                Knowing what qualifies as an emergency helps protect your fund from unnecessary withdrawals:
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">Emergency (Use Your Fund)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Job loss or significant income reduction</li>
                <li>Medical emergencies and unexpected health costs</li>
                <li>Essential car repairs needed for work</li>
                <li>Critical home repairs (burst pipe, broken furnace)</li>
                <li>Unexpected travel for family emergencies</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Not an Emergency (Don't Use Your Fund)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Vacation or travel for fun</li>
                <li>Holiday gifts</li>
                <li>Sales or deals on wanted items</li>
                <li>Planned purchases you didn't budget for</li>
                <li>Home upgrades or improvements</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Rebuilding After Using Your Fund</h2>
              <p>
                If you need to use your emergency fund, don't feel guilty—that's exactly what it's for. However, make rebuilding it a priority:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Assess how much was used and set a replenishment goal</li>
                <li>Temporarily increase your savings rate if possible</li>
                <li>Apply any windfalls to rebuilding</li>
                <li>Consider what could prevent similar emergencies in the future</li>
              </ol>

              <h2 className="text-2xl font-bold mt-8 mb-4">Overcoming Common Challenges</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">"I Can't Afford to Save"</h3>
              <p>
                Start tiny. Even $5 per week is $260 per year. Track your expenses for a month—you'll likely find small cuts that can fund savings. Every dollar counts when building your safety net.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">"I Have Debt—Should I Save First?"</h3>
              <p>
                Build a starter emergency fund of $1,000 first. This prevents new emergencies from adding to your debt. Then focus on paying off high-interest debt, then complete your full emergency fund.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">"It Will Take Forever"</h3>
              <p>
                Building a full emergency fund is a marathon, not a sprint. Celebrate milestones along the way: first $1,000, one month of expenses, three months, and so on. Progress motivates continued effort.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">The Peace of Mind Factor</h2>
              <p>
                Beyond the practical benefits, an emergency fund provides invaluable peace of mind. Knowing you can handle financial surprises reduces stress, improves sleep, and allows you to make better decisions without desperation.
              </p>
              <p>
                Financial security changes how you approach life. You can negotiate better at work, leave a bad job, or handle setbacks without panic. This confidence is priceless.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
              <p>
                An emergency fund is the foundation of financial security. It protects you from debt, reduces stress, and gives you options when life throws curveballs. Start building yours today, even if you can only save a small amount.
              </p>
              <p>
                Remember: the goal isn't to build your fund overnight. It's to make steady progress until you have a comfortable cushion. Your future self will thank you for every dollar you set aside.
              </p>

              <div className="mt-10 p-6 bg-primary/5 rounded-lg">
                <p className="font-semibold text-lg mb-2">Track Your Emergency Fund Progress</p>
                <p className="text-muted-foreground">
                  Use Trackora to set savings goals and watch your emergency fund grow. Our visual progress tracking keeps you motivated on your journey to financial security.
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
