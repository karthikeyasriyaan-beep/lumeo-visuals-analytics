import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function Blog() {
  const blogPosts = [
    { slug: "what-is-personal-finance", title: "What is Personal Finance? A Complete Beginner's Guide", excerpt: "Personal finance encompasses all financial decisions and activities of an individual or household. Understanding personal finance is the foundation for building wealth and achieving financial security.", date: "November 20, 2025", readTime: "12 min read", author: "Trackora Team", category: "Finance Basics" },
    { slug: "why-tracking-expenses", title: "Why Tracking Expenses is the First Step to Financial Freedom", excerpt: "Financial freedom begins with awareness. You cannot control what you do not measure. Tracking your expenses is the foundational habit that separates those who achieve financial success.", date: "November 18, 2025", readTime: "10 min read", author: "Trackora Team", category: "Expense Tracking" },
    { slug: "fifty-thirty-twenty-rule", title: "The 50/30/20 Rule Explained: A Simple Budget That Works", excerpt: "The 50/30/20 rule is one of the most popular and effective budgeting methods. This simple framework helps you balance spending, saving, and enjoying life without complex calculations.", date: "November 16, 2025", readTime: "11 min read", author: "Trackora Team", category: "Budgeting" },
    { slug: "personal-finance-basics", title: "Personal Finance Basics: A Beginner's Guide to Taking Control of Your Money", excerpt: "Learn the fundamental principles of personal finance management, from budgeting to saving and investing. This comprehensive guide covers everything you need to know.", date: "November 15, 2025", readTime: "8 min read", author: "Trackora Team", category: "Finance Tips" },
    { slug: "build-emergency-fund", title: "How to Build an Emergency Fund: Your Financial Safety Net", excerpt: "An emergency fund is your financial safety net—money set aside specifically for life's unexpected expenses. Without one, a single emergency can derail your financial progress.", date: "November 14, 2025", readTime: "10 min read", author: "Trackora Team", category: "Savings" },
    { slug: "money-management-students", title: "Money Management Tips for Students: Building Financial Habits Early", excerpt: "College and university life offers incredible opportunities—but it also brings financial challenges. Learning to manage money as a student sets the foundation for lifelong success.", date: "November 12, 2025", readTime: "11 min read", author: "Trackora Team", category: "Student Finance" },
    { slug: "smart-budgeting-strategies", title: "Smart Budgeting Strategies That Actually Work in 2025", excerpt: "Discover proven budgeting techniques that help you save money without feeling restricted. From the 50/30/20 rule to zero-based budgeting, find your method.", date: "November 10, 2025", readTime: "6 min read", author: "Trackora Team", category: "Budgeting" },
    { slug: "control-unnecessary-spending", title: "How to Control Unnecessary Spending: Practical Strategies That Work", excerpt: "Unnecessary spending is the silent wealth killer. It's not the big purchases that derail our finances—it's the countless small, thoughtless expenditures.", date: "November 8, 2025", readTime: "12 min read", author: "Trackora Team", category: "Spending Habits" },
    { slug: "freelancer-income-tracking", title: "How Freelancers Can Track Irregular Income Properly", excerpt: "Freelancing offers incredible freedom but comes with a unique financial challenge: irregular income. Mastering income tracking is essential for freelance financial stability.", date: "November 6, 2025", readTime: "13 min read", author: "Trackora Team", category: "Freelance Finance" },
    { slug: "digital-vs-manual-tracking", title: "Manual vs Digital Expense Tracking: Which Method is Right for You?", excerpt: "The best expense tracking system is one you'll actually use. Understanding the pros and cons of each approach helps you choose methods for financial success.", date: "November 4, 2025", readTime: "10 min read", author: "Trackora Team", category: "Finance Tools" },
    { slug: "financial-goal-setting", title: "How to Set Financial Goals Using an Expense Tracker", excerpt: "Financial goals without tracking are just wishes. An expense tracker transforms vague aspirations into concrete, achievable targets.", date: "November 2, 2025", readTime: "11 min read", author: "Trackora Team", category: "Goal Setting" },
    { slug: "psychology-of-spending", title: "The Psychology of Spending: Why We Overspend and How to Stop", excerpt: "Our spending decisions are rarely as rational as we believe. Psychology, emotions, cognitive biases, and social pressures shape our financial behavior.", date: "October 30, 2025", readTime: "14 min read", author: "Trackora Team", category: "Behavioral Finance" },
    { slug: "debt-payoff-strategies", title: "Proven Debt Payoff Strategies: Snowball vs. Avalanche Method", excerpt: "Feeling overwhelmed by debt? This guide compares popular debt repayment strategies and helps you choose the best approach for your situation.", date: "October 28, 2025", readTime: "9 min read", author: "Trackora Team", category: "Debt Management" },
    { slug: "subscription-audit-guide", title: "How to Perform a Subscription Audit and Save Hundreds Annually", excerpt: "Most people are paying for subscriptions they don't use. Learn how to audit your recurring expenses and save significant money each year.", date: "October 20, 2025", readTime: "5 min read", author: "Trackora Team", category: "Money Saving" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Trackora Blog
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
              Financial tips, guides, and insights to help you take control of your money. 
              Learn budgeting strategies, debt management techniques, and smart money habits.
            </p>
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <span className="px-3 py-1 rounded-full bg-primary/10">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
