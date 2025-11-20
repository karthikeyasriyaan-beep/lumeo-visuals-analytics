import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function Blog() {
  const blogPosts = [
    {
      slug: "personal-finance-basics",
      title: "Personal Finance Basics: A Beginner's Guide to Taking Control of Your Money",
      excerpt: "Learn the fundamental principles of personal finance management, from budgeting to saving and investing. This comprehensive guide covers everything you need to know to start your financial wellness journey.",
      date: "November 15, 2025",
      readTime: "8 min read",
      author: "Trackora Team",
      category: "Finance Tips"
    },
    {
      slug: "smart-budgeting-strategies",
      title: "Smart Budgeting Strategies That Actually Work in 2025",
      excerpt: "Discover proven budgeting techniques that help you save money without feeling restricted. From the 50/30/20 rule to zero-based budgeting, find the method that works best for your lifestyle.",
      date: "November 10, 2025",
      readTime: "6 min read",
      author: "Trackora Team",
      category: "Budgeting"
    },
    {
      slug: "receipt-management-guide",
      title: "Complete Guide to Receipt Management for Tax Season and Beyond",
      excerpt: "Master the art of receipt organization with digital tools. Learn why keeping receipts matters, how long to store them, and how modern receipt scanners can save you hours during tax time.",
      date: "November 5, 2025",
      readTime: "7 min read",
      author: "Trackora Team",
      category: "Organization"
    },
    {
      slug: "debt-payoff-strategies",
      title: "Proven Debt Payoff Strategies: Snowball vs. Avalanche Method",
      excerpt: "Feeling overwhelmed by debt? This guide compares popular debt repayment strategies and helps you choose the best approach for your situation. Includes calculators and real-world examples.",
      date: "October 28, 2025",
      readTime: "9 min read",
      author: "Trackora Team",
      category: "Debt Management"
    },
    {
      slug: "subscription-audit-guide",
      title: "How to Perform a Subscription Audit and Save Hundreds Annually",
      excerpt: "Most people are paying for subscriptions they don't use. Learn how to audit your recurring expenses, identify waste, and optimize your subscriptions to save significant money each year.",
      date: "October 20, 2025",
      readTime: "5 min read",
      author: "Trackora Team",
      category: "Money Saving"
    }
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

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">More Articles Coming Soon</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're constantly publishing new content to help you improve your financial wellness. 
                Stay tuned for more guides, tips, and insights.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
