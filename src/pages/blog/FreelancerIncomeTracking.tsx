import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Footer } from "@/components/Footer";
import { AuthorSection } from "@/components/blog/AuthorSection";
import { RelatedArticles } from "@/components/blog/RelatedArticles";

export default function FreelancerIncomeTracking() {
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
              <span className="px-3 py-1 rounded-full bg-primary/10">Freelance Finance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              How Freelancers Can Track Irregular Income Properly
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                November 6, 2025
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                13 min read
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
                Freelancing offers incredible freedom but comes with a unique financial challenge: irregular income. Some months you're flush with cash; others, you're wondering when the next payment will arrive. Mastering income tracking is essential for freelance financial stability.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">The Freelance Income Challenge</h2>
              <p>
                Unlike traditional employees with predictable paychecks, freelancers face income that varies significantly month to month. This variability makes budgeting, saving, and planning dramatically more complex. Without proper systems, it's easy to overspend during good months and panic during slow ones.
              </p>
              <p>
                Additionally, freelancers must manage their own taxes, retirement savings, insurance, and business expenses—all without the automatic systems employers provide. The financial complexity of freelancing is often underestimated until you're in the thick of it.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Setting Up Your Income Tracking System</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Separate Personal and Business Finances</h3>
              <p>
                The first rule of freelance finance is separation. Open a dedicated business bank account and use it exclusively for business income and expenses. This separation simplifies tracking, makes tax time easier, and provides clarity about your actual earnings.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Track All Income Sources</h3>
              <p>
                Create a system to record every payment received:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Client name</li>
                <li>Project or service description</li>
                <li>Amount received</li>
                <li>Date received</li>
                <li>Payment method</li>
                <li>Invoice number (if applicable)</li>
              </ul>
              <p>
                This detailed tracking helps you understand which clients and services generate the most income, identify payment patterns, and prepare accurate tax documents.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Monitor Outstanding Invoices</h3>
              <p>
                Track not just received income but also invoiced amounts. Knowing how much money is "in the pipeline" helps with cash flow planning. Flag late payments for follow-up and identify clients who consistently pay late.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Budgeting with Variable Income</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Calculate Your Baseline</h3>
              <p>
                Review your income history (ideally 12 months or more) and identify your lowest-earning months. Use this "floor" amount as the basis for your budget. This conservative approach ensures you can survive slow periods without panic.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">The Two-Account System</h3>
              <p>
                Many successful freelancers use a two-account system:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Income Account:</strong> All payments deposit here first</li>
                <li><strong>Operating Account:</strong> Transfer a fixed amount monthly for living expenses</li>
              </ol>
              <p>
                This system smooths out income variability. During high-earning months, extra money accumulates in the income account. During slow months, you have a buffer to draw from.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Pay Yourself a "Salary"</h3>
              <p>
                Decide on a consistent monthly amount to transfer to your personal account. This becomes your predictable "salary" that you budget around. As your freelance business stabilizes and grows, you can gradually increase this amount.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Managing Taxes as a Freelancer</h2>
              <p>
                Taxes are one of the biggest surprises for new freelancers. Without employer withholding, you're responsible for setting aside and paying your own taxes.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Set Aside Tax Money Immediately</h3>
              <p>
                When income arrives, immediately transfer a percentage to a dedicated tax savings account. Common percentages range from 25-35% depending on your tax bracket and location. This money is not yours to spend—it belongs to the tax authorities.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Quarterly Estimated Taxes</h3>
              <p>
                Most freelancers must pay estimated taxes quarterly. Mark these dates on your calendar and ensure your tax savings account has sufficient funds. Missing payments can result in penalties.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Track Deductible Expenses</h3>
              <p>
                Business expenses reduce your taxable income. Common freelancer deductions include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Home office space</li>
                <li>Equipment and software</li>
                <li>Professional development</li>
                <li>Health insurance premiums</li>
                <li>Business travel</li>
                <li>Marketing and advertising</li>
                <li>Professional services (accounting, legal)</li>
              </ul>
              <p>
                Keep receipts and records for all business expenses. Good record-keeping can save significant money at tax time.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Building Your Financial Safety Nets</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Emergency Fund (Personal)</h3>
              <p>
                Freelancers need a larger emergency fund than traditional employees—aim for 6-12 months of expenses. Your income can disappear without notice (a major client ends a contract, an industry downturn occurs), and you need time to find new work.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Business Reserve Fund</h3>
              <p>
                Beyond personal emergencies, maintain a business reserve for slow periods, equipment failures, or opportunities that require investment. This fund keeps your business operational during inevitable rough patches.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Retirement Savings</h3>
              <p>
                Without an employer 401(k) match, retirement saving becomes entirely your responsibility. Options for freelancers include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>SEP-IRA (can contribute up to 25% of net earnings)</li>
                <li>Solo 401(k) (higher contribution limits)</li>
                <li>Traditional or Roth IRA</li>
              </ul>
              <p>
                Automate retirement contributions to ensure they happen regardless of monthly income variations.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Cash Flow Management Strategies</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Invoice Promptly and Professionally</h3>
              <p>
                Send invoices immediately upon completing work. Delayed invoicing delays payment. Include clear payment terms and make it easy for clients to pay with multiple payment options.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Request Deposits and Progress Payments</h3>
              <p>
                For larger projects, request upfront deposits (typically 25-50%) and structure payments throughout the project. This improves cash flow and reduces the risk of non-payment.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Diversify Your Client Base</h3>
              <p>
                Relying on one or two major clients is risky. If one disappears, a huge portion of your income vanishes. Aim to have no single client represent more than 30-40% of your income.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Create Recurring Revenue</h3>
              <p>
                Look for opportunities to create recurring income:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Retainer agreements with clients</li>
                <li>Monthly maintenance contracts</li>
                <li>Subscription-based services</li>
                <li>Passive income products (courses, templates, etc.)</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Tracking Tools and Systems</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Choose the Right Tools</h3>
              <p>
                Use tools that make tracking easy and consistent:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Expense tracking app for daily expenses</li>
                <li>Invoicing software for professional billing</li>
                <li>Spreadsheet or accounting software for overall financial tracking</li>
                <li>Time tracking tools if billing hourly</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Weekly and Monthly Reviews</h3>
              <p>
                Schedule regular financial reviews:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Weekly:</strong> Review outstanding invoices, track hours, log expenses</li>
                <li><strong>Monthly:</strong> Calculate total income, review spending, assess cash flow, check progress toward goals</li>
                <li><strong>Quarterly:</strong> Pay estimated taxes, evaluate client mix, review annual progress</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Planning for Slow Periods</h2>
              <p>
                Every freelancer experiences slow periods. Planning ahead makes them manageable:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identify patterns:</strong> Track when slow periods typically occur in your industry</li>
                <li><strong>Save during peaks:</strong> When income is high, save aggressively for lean times</li>
                <li><strong>Use slow time productively:</strong> Market your services, develop skills, create content</li>
                <li><strong>Have a backup plan:</strong> Know what you'll do if slow periods extend longer than expected</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Common Freelance Finance Mistakes</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Spending windfalls:</strong> Treating a high-income month as the new normal</li>
                <li><strong>Ignoring taxes:</strong> Facing a huge tax bill with no money saved</li>
                <li><strong>No emergency fund:</strong> Being forced to take any work at any rate during slow periods</li>
                <li><strong>Mixing personal/business:</strong> Making accounting and taxes unnecessarily complicated</li>
                <li><strong>Not tracking time:</strong> Underpricing services because you don't know actual time spent</li>
                <li><strong>Skipping retirement:</strong> Assuming you'll start saving later</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
              <p>
                Freelancing requires you to be your own CFO. The freedom and flexibility of freelance work come with financial complexity that demands attention and systems. By tracking income carefully, budgeting conservatively, saving consistently, and planning for variability, you can achieve financial stability and success as a freelancer.
              </p>
              <p>
                Start implementing these systems today. Your future self—especially during slow months—will thank you for the financial foundation you're building now.
              </p>

              <div className="mt-10 p-6 bg-primary/5 rounded-lg">
                <p className="font-semibold text-lg mb-2">Track Your Freelance Finances with Ease</p>
                <p className="text-muted-foreground">
                  Trackora helps freelancers track income, expenses, and financial goals in one place. Perfect for managing the complexity of variable income.
                </p>
              </div>

              <AuthorSection />
              <RelatedArticles currentSlug="freelancer-income-tracking" />
            </CardContent>
          </Card>
        </motion.article>
      </div>
      
      <Footer />
    </div>
  );
}
