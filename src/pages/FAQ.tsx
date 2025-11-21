import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, HelpCircle, Shield, Database, CreditCard, Globe, Smartphone, Lock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Footer } from "@/components/Footer";

export default function FAQ() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      questions: [
        {
          q: "How do I create an account on Trackora?",
          a: "Creating an account is simple and free. Click the 'Get Started' button on our homepage, enter your email address and create a secure password. You'll receive a confirmation email to verify your account, and then you can start tracking your finances immediately."
        },
        {
          q: "Is Trackora really free to use?",
          a: "Yes! Trackora is currently in public beta and is completely free to use. All features including receipt scanning, budget tracking, loan management, and analytics are available at no cost. We're committed to making financial management accessible to everyone."
        },
        {
          q: "What devices can I use Trackora on?",
          a: "Trackora is a web-based application that works seamlessly on all devices. You can access it from your desktop computer, laptop, tablet, or smartphone using any modern web browser (Chrome, Firefox, Safari, or Edge). The interface automatically adapts to your screen size for the best experience."
        },
        {
          q: "Do I need to download any software?",
          a: "No downloads required! Trackora runs entirely in your web browser. Simply visit our website, log in, and you're ready to go. This means you always have access to the latest features without any manual updates or installations."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      questions: [
        {
          q: "Is my financial data safe with Trackora?",
          a: "Absolutely. We take your security seriously. All your data is encrypted using bank-level 256-bit AES encryption both in transit and at rest. We use the same security standards as major financial institutions. Your data is stored on secure servers with regular backups, and we never sell or share your information with third parties."
        },
        {
          q: "Who can see my financial information?",
          a: "Only you. Your financial data is completely private and belongs to you alone. Trackora staff cannot access your personal financial information unless you explicitly grant permission for support purposes. We follow a strict zero-knowledge architecture where your sensitive data remains encrypted."
        },
        {
          q: "Are you GDPR and CCPA compliant?",
          a: "Yes. Trackora is fully compliant with GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act). You have the right to access, export, or delete your data at any time. Visit our Privacy Policy for complete details on how we protect your information."
        },
        {
          q: "Can I delete my account and all my data?",
          a: "Yes, you have complete control. You can delete your account at any time from the Settings page. When you delete your account, all your personal data, financial records, and receipt images are permanently removed from our servers within 30 days."
        }
      ]
    },
    {
      title: "Features & Functionality",
      icon: Database,
      questions: [
        {
          q: "Which currencies does Trackora support?",
          a: "Trackora supports multiple currencies including Indian Rupee (₹), US Dollar ($), Euro (€), British Pound (£), and many others. You can set your preferred currency in Settings, and all your financial data will be displayed in that currency. The currency selector is available in the top navigation for quick switching."
        },
        {
          q: "Can I track multiple bank accounts and credit cards?",
          a: "Yes! You can track unlimited accounts. While Trackora doesn't directly connect to your bank accounts (for security reasons), you can manually add transactions from multiple sources. Our smart categorization system helps you organize expenses from different accounts seamlessly."
        },
        {
          q: "How does budget tracking work?",
          a: "Budget tracking is simple and visual. Set a monthly budget for each category (like Food, Transport, Entertainment) or set an overall monthly spending limit. Trackora shows your spending progress with color-coded progress bars and alerts you gently when you're approaching your limits. You can adjust budgets anytime."
        },
        {
          q: "What is the loan tracker for?",
          a: "The loan tracker helps you manage all types of debts in one place: personal loans, student loans, car loans, home loans, or credit card balances. Enter the loan amount, interest rate, and payment schedule, and Trackora calculates your payoff timeline, tracks payments, and shows how much interest you'll pay over time."
        },
        {
          q: "Can I set savings goals?",
          a: "Absolutely! Create custom savings goals for anything: emergency fund, vacation, new gadget, wedding, or down payment. Set your target amount and deadline, then track your progress with visual progress rings. Trackora provides encouraging insights and celebrates your milestones along the way."
        }
      ]
    },
    {
      title: "Data & Export",
      icon: CreditCard,
      questions: [
        {
          q: "Can I export my financial data?",
          a: "Yes. You can export all your data at any time in CSV or JSON format from the Settings page. This includes expenses, income, receipts, loans, subscriptions, and savings goals. Exported data can be used for tax filing, financial analysis, or importing into other tools."
        },
        {
          q: "How far back does Trackora store my data?",
          a: "Trackora stores your data indefinitely as long as your account is active. You can access transaction history from years ago without any limits. Historical data is important for trend analysis and long-term financial planning."
        },
        {
          q: "Can I import data from other apps or spreadsheets?",
          a: "Currently, Trackora supports manual entry and receipt scanning. We're working on import features for CSV and Excel files. If you need to migrate data from another app, please contact our support team, and we'll help you with the process."
        }
      ]
    },
    {
      title: "Subscriptions & Billing",
      icon: CreditCard,
      questions: [
        {
          q: "How does subscription tracking work?",
          a: "Add all your recurring subscriptions (Netflix, Spotify, gym membership, software tools, etc.) with their billing amounts and renewal dates. Trackora sends you alerts before renewals, calculates your total monthly and yearly subscription costs, and helps you identify subscriptions you might want to cancel to save money."
        },
        {
          q: "Will Trackora always be free?",
          a: "Trackora is currently in public beta and is completely free. We're committed to keeping core features free forever. In the future, we may introduce optional premium features, but all essential financial tracking tools will remain accessible to everyone at no cost."
        },
        {
          q: "What happens to my data if I stop using Trackora?",
          a: "Your data remains safe and accessible as long as your account is active. If you become inactive for an extended period, we'll send you email reminders. You can always log back in and export your data. If you want to permanently delete your account, use the account deletion option in Settings."
        }
      ]
    },
    {
      title: "Mobile & Accessibility",
      icon: Smartphone,
      questions: [
        {
          q: "Is there a mobile app for Trackora?",
          a: "Trackora is a Progressive Web App (PWA), which means it works beautifully on mobile browsers and can be added to your home screen for a native app-like experience. We're planning dedicated iOS and Android apps in the future, but the web app provides full functionality on all mobile devices."
        },
        {
          q: "Can I use Trackora offline?",
          a: "Basic viewing functionality works offline, but adding new transactions, scanning receipts, and syncing data requires an internet connection. We're working on enhanced offline capabilities so you can track expenses anywhere and sync when you're back online."
        },
        {
          q: "Is Trackora accessible for users with disabilities?",
          a: "We're committed to accessibility. Trackora follows WCAG 2.1 guidelines with keyboard navigation, screen reader support, and high contrast modes. If you encounter any accessibility issues, please contact us so we can improve."
        }
      ]
    },
    {
      title: "Troubleshooting & Support",
      icon: Lock,
      questions: [
        {
          q: "I forgot my password. How do I reset it?",
          a: "Click the 'Forgot Password' link on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new secure password. If you don't receive the email, check your spam folder or contact support."
        },
        {
          q: "How do I contact support?",
          a: "You can reach our support team at support@trackorapp.in or use the contact form on our Contact page. We typically respond within 24-48 hours. For urgent issues, please mention 'Urgent' in the subject line."
        },
        {
          q: "Can I suggest new features?",
          a: "Absolutely! We love hearing from our users. Send your feature suggestions to support@trackorapp.in or use our contact form. User feedback directly shapes our product roadmap, and we're always looking for ways to improve Trackora."
        },
        {
          q: "I found a bug. How do I report it?",
          a: "Thank you for helping us improve! Please report bugs to support@trackorapp.in with details about what happened, which page you were on, and your browser/device information. Screenshots are very helpful. We prioritize bug fixes and will keep you updated on the resolution."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
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
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
              Find answers to common questions about Trackora. Can't find what you're looking for? 
              <Link to="/contact" className="text-primary hover:underline ml-1">Contact our support team</Link>.
            </p>
          </motion.div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our support team is here to help. Reach out with any questions, concerns, or feedback.
              </p>
              <Link to="/contact">
                <Button size="lg" className="gap-2">
                  Contact Support
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
