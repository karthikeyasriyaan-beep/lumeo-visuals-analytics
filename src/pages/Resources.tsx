import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Wallet, PiggyBank, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Expense Tracking",
    icon: BookOpen,
    articles: [
      { title: "How to Track Your Daily Expenses Effectively", slug: "track-daily-expenses", desc: "Learn practical methods for recording daily spending and staying on top of your finances." },
      { title: "Why Expense Tracking Is Important for Financial Health", slug: "expense-tracking-financial-health", desc: "Understand the key benefits of monitoring your expenses regularly." },
      { title: "Simple Methods to Record and Organize Your Expenses", slug: "record-organize-expenses", desc: "Discover easy ways to categorize and organize your spending records." },
      { title: "Common Expense Tracking Mistakes to Avoid", slug: "expense-tracking-mistakes", desc: "Identify common pitfalls that can undermine your expense tracking efforts." },
      { title: "How to Build a Daily Habit of Recording Expenses", slug: "daily-expense-habit", desc: "Tips for turning expense tracking into a consistent daily routine." },
    ],
  },
  {
    title: "Budgeting",
    icon: Wallet,
    articles: [
      { title: "How to Create a Monthly Budget That Actually Works", slug: "monthly-budget-works", desc: "A step-by-step approach to building a realistic and effective monthly budget." },
      { title: "The 50/30/20 Budget Rule Explained Simply", slug: "fifty-thirty-twenty-explained", desc: "A clear breakdown of one of the most popular budgeting frameworks." },
      { title: "Budgeting Tips for Beginners", slug: "budgeting-tips-beginners", desc: "Essential budgeting advice for those just starting their financial journey." },
      { title: "How to Control Overspending in Daily Life", slug: "control-overspending", desc: "Practical strategies to curb impulse purchases and unnecessary spending." },
      { title: "Practical Budgeting Strategies for Personal Finance", slug: "budgeting-strategies", desc: "Proven techniques to manage your money and stick to your budget." },
    ],
  },
  {
    title: "Saving Money",
    icon: PiggyBank,
    articles: [
      { title: "10 Simple Ways to Save Money Every Month", slug: "save-money-monthly", desc: "Actionable tips to reduce expenses and grow your savings consistently." },
      { title: "How Small Savings Can Grow Over Time", slug: "small-savings-grow", desc: "The power of compound growth and why every small amount matters." },
      { title: "How to Build an Emergency Fund Step by Step", slug: "build-emergency-fund-steps", desc: "A practical guide to creating a financial safety net for unexpected events." },
      { title: "Smart Spending Habits That Help You Save More", slug: "smart-spending-habits", desc: "Develop spending habits that naturally lead to greater savings." },
      { title: "Reducing Unnecessary Expenses in Daily Life", slug: "reduce-unnecessary-expenses", desc: "Identify and eliminate wasteful spending from your daily routine." },
    ],
  },
  {
    title: "Personal Finance Basics",
    icon: TrendingUp,
    articles: [
      { title: "Understanding Personal Finance for Beginners", slug: "personal-finance-beginners", desc: "A beginner-friendly introduction to managing your personal finances." },
      { title: "How to Manage Your Money More Effectively", slug: "manage-money-effectively", desc: "Core principles for taking control of your financial life." },
      { title: "Financial Habits That Lead to Long Term Stability", slug: "financial-habits-stability", desc: "Build habits that set the foundation for lasting financial health." },
      { title: "Common Money Mistakes People Make", slug: "common-money-mistakes", desc: "Avoid these frequent financial errors that can set you back." },
      { title: "Why Financial Awareness Is Important", slug: "financial-awareness-importance", desc: "Understanding why being financially aware is the first step to financial freedom." },
    ],
  },
];

export default function Resources() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Resources and Financial Guides</h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-3xl">
            The Trackora Resources section provides helpful guides and insights designed to help individuals better understand their spending habits, improve financial awareness, and manage personal finances more effectively.
          </p>

          <div className="space-y-14">
            {categories.map((cat, catIdx) => {
              const Icon = cat.icon;
              return (
                <motion.section
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">{cat.title}</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {cat.articles.map((article) => (
                      <Link key={article.slug} to={`/resources/${article.slug}`}>
                        <Card className="h-full hover:shadow-md hover:border-primary/30 cursor-pointer transition-all">
                          <CardHeader>
                            <CardTitle className="text-base leading-snug">{article.title}</CardTitle>
                            <CardDescription className="mt-1.5">{article.desc}</CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
