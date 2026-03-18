import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, HelpCircle, Shield, Database, CreditCard, Globe, Smartphone, Lock, Settings, Wallet, Target, BarChart3, Bell, FileText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";

// FAQ data for schema markup
const allFaqQuestions = [
  { question: "What is Trame and how does it help me manage my finances?", answer: "Trame is a comprehensive personal finance management platform designed to help individuals and families take complete control of their money. Unlike simple expense trackers that only record transactions, Trame provides a complete financial ecosystem where you can manage daily expenses across categories like food, transport, and entertainment; track multiple income sources including salary, freelance work, and investments; monitor loan repayments with interest calculations and payoff timelines; control subscription costs with renewal alerts; and work toward meaningful savings goals with visual progress tracking. The platform transforms complex financial data into clear, actionable insights through beautiful charts and visualizations, helping you understand exactly where your money goes and make informed decisions that build long-term wealth." },
  { question: "Is Trame really free to use?", answer: "Yes, Trame is completely free to use with all core features included at no cost. This includes unlimited expense and income tracking, loan and debt management, subscription monitoring, savings goal tracking, budget planning with alerts, and comprehensive analytics. We believe financial management tools should be accessible to everyone regardless of their economic situation. There are no hidden fees, no premium tiers locking essential features, and no credit card required to sign up. Our commitment is to democratize personal finance management by providing professional-grade tools at no cost." },
  { question: "How do I create an account on Trame?", answer: "Creating a Trame account is simple and takes less than 60 seconds. Click the 'Get Started' or 'Start Free Today' button on our homepage. Enter your email address and create a secure password (we recommend at least 8 characters with a mix of letters, numbers, and symbols). You'll receive a verification email to confirm your account—check your spam folder if you don't see it within a few minutes. Once verified, you can immediately start tracking your finances. No credit card, no phone number, no extensive personal information required. Your account is protected with bank-level 256-bit encryption from the moment you sign up." },
  { question: "Is my financial data safe with Trame?", answer: "Absolutely. We take your security extremely seriously because we understand that financial data is among the most sensitive information you have. All your data is encrypted using bank-level 256-bit AES encryption both in transit (when data moves between your device and our servers) and at rest (when stored on our servers). We use the same security standards as major financial institutions. Our servers are hosted on secure, SOC 2 compliant infrastructure with regular security audits and backups. We implement HTTPS everywhere, secure authentication protocols, and regular penetration testing. Most importantly, we never sell, share, or monetize your personal financial information—your data belongs to you alone." },
  { question: "Who can see my financial information?", answer: "Only you. Your financial data is completely private and belongs to you alone. Trame staff cannot access your personal financial information unless you explicitly grant permission for support purposes, and even then, access is limited and logged. We follow a strict data privacy architecture where your sensitive information remains encrypted and protected. We don't sell or share your data with advertisers, data brokers, or any third parties. Our business model doesn't depend on exploiting your personal information—we're focused solely on building the best financial management tool possible." },
  { question: "Which currencies does Trame support?", answer: "Trame supports multiple currencies to serve users worldwide. Currently supported currencies include Indian Rupee (₹), US Dollar ($), Euro (€), British Pound (£), Japanese Yen (¥), Australian Dollar (A$), Canadian Dollar (C$), Swiss Franc (CHF), and many others. You can set your preferred currency in the Settings page, and all your financial data—expenses, income, loans, savings goals—will be displayed in that currency. The currency selector is available in the top navigation for quick switching if you need to view amounts in different currencies. We're continuously adding more currencies based on user requests." },
  { question: "How does expense tracking work in Trame?", answer: "Expense tracking in Trame is designed to be as quick and effortless as possible while still capturing meaningful data. To add an expense, simply click the 'Add Expense' button, enter the amount, select or type a category (Food, Transport, Shopping, Bills, Entertainment, etc.), and optionally add a note for context. The entire process takes under 5 seconds. Trame provides intelligent category suggestions based on your history—if you frequently log 'Zomato' expenses as Food, it will automatically suggest that category. All expenses are immediately reflected in your monthly totals, category breakdowns, and analytics. You can filter expenses by date range, category, or amount, and edit or delete any transaction at any time." },
  { question: "Can I track multiple income sources?", answer: "Yes, Trame allows you to track unlimited income sources with full categorization. Whether you have salary from an employer, freelance payments from clients, rental income from property, dividends from investments, gifts, or any other income type, you can log each separately with its source, amount, date, and optional notes. This is particularly valuable for freelancers and gig workers who need to track variable income from multiple clients, or for anyone with diverse income streams. The income tracking feature helps you understand your true monthly average income, identify seasonal patterns, and compare total income versus expenses to see exactly how much you're saving each month." },
  { question: "How does the loan and debt tracker work?", answer: "The loan tracker helps you manage all types of debts in one unified view. For each loan—whether it's a personal loan, student loan, home loan, car loan, credit card balance, or money borrowed from friends—you can enter the loan name, original amount, current balance, interest rate, and monthly EMI. Trame then calculates your payoff timeline, showing when you'll be debt-free if you continue current payments. You can see how much total interest you've paid and how much remains. Visual progress bars show your journey from the original loan amount to zero, providing motivation to stay on track or accelerate payments. The tracker also helps you compare multiple debts so you can prioritize which to pay off first using strategies like the debt snowball or avalanche method." },
  { question: "How does subscription management help me save money?", answer: "The average person spends ₹2,000-5,000 monthly on subscriptions they barely use or have forgotten about. Trame's subscription management feature brings all your recurring charges into one view—streaming services (Netflix, Prime, Hotstar), music apps (Spotify, Apple Music), software tools (Office 365, Adobe), cloud storage, gym memberships, magazine subscriptions, and more. For each subscription, you enter the name, amount, billing cycle (monthly, quarterly, yearly), and next renewal date. Before each renewal, Trame sends you a notification asking if you still need this subscription. This simple prompt has helped users identify and cancel forgotten subscriptions worth thousands of rupees per year. The dashboard also shows your total monthly and yearly subscription costs, often revealing spending levels that surprise users." },
  { question: "How do savings goals work?", answer: "Savings goals in Trame help you save with purpose and motivation. Create a goal for anything—emergency fund, dream vacation, new laptop, wedding fund, home down payment, child's education, or a new car. For each goal, set a target amount and optional deadline. As you add money toward the goal, visual progress rings show how close you are to achieving it. Trame celebrates milestones along the way: hitting 25%, 50%, 75% of your goal triggers encouraging messages. Research shows that visualizing progress increases the likelihood of reaching goals by over 40%. You can have multiple active goals, prioritize them, and track contributions over time to see your savings journey unfold." },
  { question: "How does budget planning work in Trame?", answer: "Budget planning in Trame follows a simple principle: give every rupee a purpose. You can set monthly spending limits for individual categories (for example, Food: ₹8,000, Transport: ₹3,000, Entertainment: ₹2,000) or set an overall monthly spending limit. As you track expenses throughout the month, color-coded progress bars show how much you've spent versus your limit. Green means you're well under budget, yellow indicates you're approaching your limit, and a gentle notification reminds you to slow down if needed. The system is designed to be encouraging rather than punitive—we use positive language like 'You're doing great this month!' instead of harsh warnings. You can view historical budget performance to see how your spending has evolved over time." },
  { question: "What analytics and insights does Trame provide?", answer: "Trame transforms your financial data into beautiful, easy-to-understand visualizations that reveal patterns you might never notice otherwise. The analytics dashboard includes: monthly spending breakdown by category with colorful pie charts; income vs expense comparison over time with trend lines; spending trend analysis across weeks, months, and years; identification of spending patterns and anomalies; category-wise comparison between different time periods; and subscription cost summaries. Beyond basic charts, Trame provides actionable insights like 'You spent 35% more on dining out this month compared to last month' or 'Your utility bills have increased 20% over the past quarter.' These insights help you spot issues early and make informed adjustments to your spending habits." },
  { question: "Can I export my financial data?", answer: "Yes, you have complete ownership of your data and can export it anytime. From the Settings page, you can export all your financial data in CSV or JSON format. This includes your complete expense history with dates, amounts, categories, and notes; all income records; loan and debt details; subscription information; savings goals and contributions; and budget configurations. Exported data can be used for tax filing purposes, imported into spreadsheet software for custom analysis, shared with a financial advisor, or simply kept as a backup. We believe your financial data belongs to you, and you should always have full access to it in portable formats." },
  { question: "Is there a mobile app for Trame?", answer: "Trame is a Progressive Web App (PWA), which means it works beautifully on mobile browsers and can be added to your home screen for a native app-like experience—without downloading anything from an app store. On your phone, simply open Trame in your browser (Chrome, Safari, or any modern browser), tap the browser menu, and select 'Add to Home Screen.' This creates an icon on your phone that launches Trame instantly, just like a native app. The PWA approach ensures you always have the latest version without waiting for app store updates, and it works across all devices—Android, iOS, tablets, and desktop—with a consistent experience. We're exploring dedicated iOS and Android apps for the future, but the PWA provides full functionality today." },
  { question: "What devices can I use Trame on?", answer: "Trame is a web-based application that works seamlessly on all devices with a modern browser. You can access it from desktop computers (Windows, Mac, Linux), laptops, tablets (iPad, Android tablets), and smartphones (iPhone, Android phones). The interface automatically adapts to your screen size—on larger screens you see more data at once, while on mobile the layout adjusts for touch interaction. Because it's web-based, your data syncs automatically across all devices. Start adding an expense on your phone during lunch, and see it reflected on your laptop when you check your analytics in the evening. No downloads, no installations, no manual syncing required." },
  { question: "How do I reset my password if I forget it?", answer: "If you forget your password, click the 'Forgot Password' link on the login page. Enter the email address associated with your account, and we'll send you a password reset link within a few minutes. Check your spam or junk folder if you don't see the email in your inbox. Click the link in the email, and you'll be able to create a new secure password. For security, the reset link expires after 24 hours. If you're still having trouble accessing your account, contact our support team at support@trackorapp.in with your account email, and we'll help you regain access." },
  { question: "Are you GDPR and CCPA compliant?", answer: "Yes, Trame is fully compliant with GDPR (General Data Protection Regulation) for European users and CCPA (California Consumer Privacy Act) for California residents. This means you have the right to know what personal data we collect and why; access all your data at any time (and export it); request correction of inaccurate data; request deletion of your data ('right to be forgotten'); object to certain types of data processing; and data portability (transferring your data to another service). You can exercise these rights through the Settings page or by contacting our support team. Visit our Privacy Policy page for complete details on how we protect your information and respect your data rights." },
  { question: "Can I delete my account and all my data?", answer: "Yes, you have complete control over your account and data. You can delete your account at any time from the Settings page. When you choose to delete your account, all your personal data—expenses, income records, loans, subscriptions, savings goals, and profile information—will be permanently removed from our servers within 30 days. This deletion is irreversible, so we recommend exporting your data first if you want to keep a copy. Before deletion, you'll receive a confirmation prompt to ensure this is intentional. We respect your right to be forgotten and make the process straightforward." },
  { question: "How do I contact Trame support?", answer: "Our support team is available to help with any questions, issues, or feedback. You can reach us at support@trackorapp.in or use the contact form on our Contact page. We typically respond within 24-48 hours, though we often reply much faster during business hours. For urgent issues, include 'Urgent' in your email subject line, and we'll prioritize your request. When reporting issues, please include details about what happened, which page you were on, and your browser/device information—screenshots are very helpful. We also welcome feature suggestions and feedback that helps shape our product roadmap." }
];

export default function FAQ() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      questions: [
        {
          q: "What is Trame and how does it help me manage my finances?",
          a: "Trame is a comprehensive personal finance management platform designed to help individuals and families take complete control of their money. Unlike simple expense trackers that only record transactions, Trame provides a complete financial ecosystem where you can manage daily expenses across categories like food, transport, and entertainment; track multiple income sources including salary, freelance work, and investments; monitor loan repayments with interest calculations and payoff timelines; control subscription costs with renewal alerts; and work toward meaningful savings goals with visual progress tracking. The platform transforms complex financial data into clear, actionable insights through beautiful charts and visualizations, helping you understand exactly where your money goes and make informed decisions that build long-term wealth."
        },
        {
          q: "How do I create an account on Trame?",
          a: "Creating a Trame account is simple and takes less than 60 seconds. Click the 'Get Started' or 'Start Free Today' button on our homepage. Enter your email address and create a secure password (we recommend at least 8 characters with a mix of letters, numbers, and symbols). You'll receive a verification email to confirm your account—check your spam folder if you don't see it within a few minutes. Once verified, you can immediately start tracking your finances. No credit card, no phone number, no extensive personal information required. Your account is protected with bank-level 256-bit encryption from the moment you sign up."
        },
        {
          q: "Is Trame really free to use?",
          a: "Yes, Trame is completely free to use with all core features included at no cost. This includes unlimited expense and income tracking, loan and debt management, subscription monitoring, savings goal tracking, budget planning with alerts, and comprehensive analytics. We believe financial management tools should be accessible to everyone regardless of their economic situation. There are no hidden fees, no premium tiers locking essential features, and no credit card required to sign up. Our commitment is to democratize personal finance management by providing professional-grade tools at no cost."
        },
        {
          q: "What devices can I use Trame on?",
          a: "Trame is a web-based application that works seamlessly on all devices with a modern browser. You can access it from desktop computers (Windows, Mac, Linux), laptops, tablets (iPad, Android tablets), and smartphones (iPhone, Android phones). The interface automatically adapts to your screen size—on larger screens you see more data at once, while on mobile the layout adjusts for touch interaction. Because it's web-based, your data syncs automatically across all devices. Start adding an expense on your phone during lunch, and see it reflected on your laptop when you check your analytics in the evening."
        },
        {
          q: "Do I need to download any software to use Trame?",
          a: "No downloads required! Trame runs entirely in your web browser. Simply visit our website at trackorapp.in, log in, and you're ready to go. This means you always have access to the latest features without any manual updates or installations. On mobile devices, you can add Trame to your home screen for a native app-like experience. Just open Trame in your mobile browser, tap the menu, and select 'Add to Home Screen.' This creates a convenient shortcut that launches instantly like any other app."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      questions: [
        {
          q: "Is my financial data safe with Trame?",
          a: "Absolutely. We take your security extremely seriously because we understand that financial data is among the most sensitive information you have. All your data is encrypted using bank-level 256-bit AES encryption both in transit (when data moves between your device and our servers) and at rest (when stored on our servers). We use the same security standards as major financial institutions. Our servers are hosted on secure, SOC 2 compliant infrastructure with regular security audits and backups. We implement HTTPS everywhere, secure authentication protocols, and regular penetration testing. Most importantly, we never sell, share, or monetize your personal financial information—your data belongs to you alone."
        },
        {
          q: "Who can see my financial information?",
          a: "Only you. Your financial data is completely private and belongs to you alone. Trame staff cannot access your personal financial information unless you explicitly grant permission for support purposes, and even then, access is limited and logged. We follow a strict data privacy architecture where your sensitive information remains encrypted and protected. We don't sell or share your data with advertisers, data brokers, or any third parties. Our business model doesn't depend on exploiting your personal information—we're focused solely on building the best financial management tool possible."
        },
        {
          q: "Are you GDPR and CCPA compliant?",
          a: "Yes, Trame is fully compliant with GDPR (General Data Protection Regulation) for European users and CCPA (California Consumer Privacy Act) for California residents. This means you have the right to know what personal data we collect and why; access all your data at any time (and export it); request correction of inaccurate data; request deletion of your data ('right to be forgotten'); object to certain types of data processing; and data portability (transferring your data to another service). You can exercise these rights through the Settings page or by contacting our support team. Visit our Privacy Policy page for complete details on how we protect your information and respect your data rights."
        },
        {
          q: "Can I delete my account and all my data?",
          a: "Yes, you have complete control over your account and data. You can delete your account at any time from the Settings page. When you choose to delete your account, all your personal data—expenses, income records, loans, subscriptions, savings goals, and profile information—will be permanently removed from our servers within 30 days. This deletion is irreversible, so we recommend exporting your data first if you want to keep a copy. Before deletion, you'll receive a confirmation prompt to ensure this is intentional. We respect your right to be forgotten and make the process straightforward."
        }
      ]
    },
    {
      title: "Expense & Income Tracking",
      icon: Wallet,
      questions: [
        {
          q: "How does expense tracking work in Trame?",
          a: "Expense tracking in Trame is designed to be as quick and effortless as possible while still capturing meaningful data. To add an expense, simply click the 'Add Expense' button, enter the amount, select or type a category (Food, Transport, Shopping, Bills, Entertainment, etc.), and optionally add a note for context. The entire process takes under 5 seconds. Trame provides intelligent category suggestions based on your history—if you frequently log 'Zomato' expenses as Food, it will automatically suggest that category. All expenses are immediately reflected in your monthly totals, category breakdowns, and analytics. You can filter expenses by date range, category, or amount, and edit or delete any transaction at any time."
        },
        {
          q: "Can I track multiple income sources?",
          a: "Yes, Trame allows you to track unlimited income sources with full categorization. Whether you have salary from an employer, freelance payments from clients, rental income from property, dividends from investments, gifts, or any other income type, you can log each separately with its source, amount, date, and optional notes. This is particularly valuable for freelancers and gig workers who need to track variable income from multiple clients, or for anyone with diverse income streams. The income tracking feature helps you understand your true monthly average income, identify seasonal patterns, and compare total income versus expenses to see exactly how much you're saving each month."
        },
        {
          q: "Which currencies does Trame support?",
          a: "Trame supports multiple currencies to serve users worldwide. Currently supported currencies include Indian Rupee (₹), US Dollar ($), Euro (€), British Pound (£), Japanese Yen (¥), Australian Dollar (A$), Canadian Dollar (C$), Swiss Franc (CHF), and many others. You can set your preferred currency in the Settings page, and all your financial data—expenses, income, loans, savings goals—will be displayed in that currency. The currency selector is available in the top navigation for quick switching if you need to view amounts in different currencies. We're continuously adding more currencies based on user requests."
        },
        {
          q: "Can I edit or delete transactions after adding them?",
          a: "Yes, you have full control over all your transactions. Any expense or income entry can be edited to correct the amount, change the category, update the date, or modify notes. Simply find the transaction in your list or through the search/filter function, click on it, and select 'Edit.' You can also delete transactions entirely if they were added by mistake. All changes are reflected immediately in your totals and analytics. We maintain a simple, forgiving system because we know mistakes happen—there's no penalty or complication for correcting your records."
        }
      ]
    },
    {
      title: "Loans & Subscriptions",
      icon: CreditCard,
      questions: [
        {
          q: "How does the loan and debt tracker work?",
          a: "The loan tracker helps you manage all types of debts in one unified view. For each loan—whether it's a personal loan, student loan, home loan, car loan, credit card balance, or money borrowed from friends—you can enter the loan name, original amount, current balance, interest rate, and monthly EMI. Trame then calculates your payoff timeline, showing when you'll be debt-free if you continue current payments. You can see how much total interest you've paid and how much remains. Visual progress bars show your journey from the original loan amount to zero, providing motivation to stay on track or accelerate payments. The tracker also helps you compare multiple debts so you can prioritize which to pay off first using strategies like the debt snowball or avalanche method."
        },
        {
          q: "How does subscription management help me save money?",
          a: "The average person spends ₹2,000-5,000 monthly on subscriptions they barely use or have forgotten about. Trame's subscription management feature brings all your recurring charges into one view—streaming services (Netflix, Prime, Hotstar), music apps (Spotify, Apple Music), software tools (Office 365, Adobe), cloud storage, gym memberships, magazine subscriptions, and more. For each subscription, you enter the name, amount, billing cycle (monthly, quarterly, yearly), and next renewal date. Before each renewal, Trame sends you a notification asking if you still need this subscription. This simple prompt has helped users identify and cancel forgotten subscriptions worth thousands of rupees per year. The dashboard also shows your total monthly and yearly subscription costs, often revealing spending levels that surprise users."
        },
        {
          q: "What types of loans can I track?",
          a: "You can track any type of loan or debt in Trame. Common examples include: personal loans from banks or NBFCs; student loans or education loans; home loans/mortgages; car loans or vehicle financing; credit card balances; loans from family or friends; business loans; gold loans; consumer durable loans; and any other borrowed money. For each loan, you can specify the lender name, original amount, current balance, interest rate, EMI amount, start date, and expected end date. Trame helps you visualize all your debts together so you can create a strategic payoff plan and track your progress toward becoming debt-free."
        }
      ]
    },
    {
      title: "Savings & Budgeting",
      icon: Target,
      questions: [
        {
          q: "How do savings goals work?",
          a: "Savings goals in Trame help you save with purpose and motivation. Create a goal for anything—emergency fund, dream vacation, new laptop, wedding fund, home down payment, child's education, or a new car. For each goal, set a target amount and optional deadline. As you add money toward the goal, visual progress rings show how close you are to achieving it. Trame celebrates milestones along the way: hitting 25%, 50%, 75% of your goal triggers encouraging messages. Research shows that visualizing progress increases the likelihood of reaching goals by over 40%. You can have multiple active goals, prioritize them, and track contributions over time to see your savings journey unfold."
        },
        {
          q: "How does budget planning work in Trame?",
          a: "Budget planning in Trame follows a simple principle: give every rupee a purpose. You can set monthly spending limits for individual categories (for example, Food: ₹8,000, Transport: ₹3,000, Entertainment: ₹2,000) or set an overall monthly spending limit. As you track expenses throughout the month, color-coded progress bars show how much you've spent versus your limit. Green means you're well under budget, yellow indicates you're approaching your limit, and a gentle notification reminds you to slow down if needed. The system is designed to be encouraging rather than punitive—we use positive language like 'You're doing great this month!' instead of harsh warnings. You can view historical budget performance to see how your spending has evolved over time."
        },
        {
          q: "Can I set different budgets for different categories?",
          a: "Yes, Trame supports granular budget control at the category level. You can set individual spending limits for each category that matters to you—for example: Groceries: ₹6,000; Dining Out: ₹4,000; Transport: ₹3,500; Entertainment: ₹2,000; Shopping: ₹3,000; Bills: ₹5,000. Each category has its own progress bar showing how much you've spent versus your limit for the current month. This allows you to be strict with some categories while being more flexible with others, based on your priorities and values. You can also set an overall monthly limit as a backup to catch total overspending even if individual categories are within bounds."
        }
      ]
    },
    {
      title: "Analytics & Reports",
      icon: BarChart3,
      questions: [
        {
          q: "What analytics and insights does Trame provide?",
          a: "Trame transforms your financial data into beautiful, easy-to-understand visualizations that reveal patterns you might never notice otherwise. The analytics dashboard includes: monthly spending breakdown by category with colorful pie charts; income vs expense comparison over time with trend lines; spending trend analysis across weeks, months, and years; identification of spending patterns and anomalies; category-wise comparison between different time periods; and subscription cost summaries. Beyond basic charts, Trame provides actionable insights like 'You spent 35% more on dining out this month compared to last month' or 'Your utility bills have increased 20% over the past quarter.' These insights help you spot issues early and make informed adjustments to your spending habits."
        },
        {
          q: "Can I export my financial data?",
          a: "Yes, you have complete ownership of your data and can export it anytime. From the Settings page, you can export all your financial data in CSV or JSON format. This includes your complete expense history with dates, amounts, categories, and notes; all income records; loan and debt details; subscription information; savings goals and contributions; and budget configurations. Exported data can be used for tax filing purposes, imported into spreadsheet software for custom analysis, shared with a financial advisor, or simply kept as a backup. We believe your financial data belongs to you, and you should always have full access to it in portable formats."
        },
        {
          q: "How far back does Trame store my data?",
          a: "Trame stores your financial data indefinitely as long as your account remains active. There are no limits on how many transactions you can store or how far back you can access. Whether you want to analyze spending patterns from six months ago or compare this year's budget to last year's, all your historical data is available. This long-term storage is crucial for meaningful trend analysis, annual financial reviews, and tax preparation. Even users who have been with us for years can access their complete financial history anytime."
        }
      ]
    },
    {
      title: "Mobile & Accessibility",
      icon: Smartphone,
      questions: [
        {
          q: "Is there a mobile app for Trame?",
          a: "Trame is a Progressive Web App (PWA), which means it works beautifully on mobile browsers and can be added to your home screen for a native app-like experience—without downloading anything from an app store. On your phone, simply open Trame in your browser (Chrome, Safari, or any modern browser), tap the browser menu, and select 'Add to Home Screen.' This creates an icon on your phone that launches Trame instantly, just like a native app. The PWA approach ensures you always have the latest version without waiting for app store updates, and it works across all devices—Android, iOS, tablets, and desktop—with a consistent experience."
        },
        {
          q: "Can I use Trame offline?",
          a: "Basic viewing functionality works offline—you can see your previously loaded data, review your analytics, and navigate through the app. However, adding new transactions, syncing data, and accessing the latest updates requires an internet connection. We're actively working on enhanced offline capabilities that will allow you to add expenses while offline and automatically sync them when you reconnect. For now, we recommend having an internet connection when logging transactions to ensure your data is saved and backed up securely."
        },
        {
          q: "Is Trame accessible for users with disabilities?",
          a: "We're committed to making Trame accessible to everyone. The platform follows WCAG 2.1 guidelines with keyboard navigation support, screen reader compatibility, and proper semantic HTML structure. We use sufficient color contrast ratios, provide text alternatives for visual elements, and ensure all interactive elements are keyboard-accessible. If you encounter any accessibility issues or have suggestions for improvement, please contact us at support@trackorapp.in. We actively work to improve accessibility based on user feedback and are committed to ensuring Trame is usable by people of all abilities."
        }
      ]
    },
    {
      title: "Troubleshooting & Support",
      icon: Lock,
      questions: [
        {
          q: "I forgot my password. How do I reset it?",
          a: "If you forget your password, click the 'Forgot Password' link on the login page. Enter the email address associated with your account, and we'll send you a password reset link within a few minutes. Check your spam or junk folder if you don't see the email in your inbox. Click the link in the email, and you'll be able to create a new secure password. For security, the reset link expires after 24 hours. If you're still having trouble accessing your account, contact our support team at support@trackorapp.in with your account email, and we'll help you regain access."
        },
        {
          q: "How do I contact Trame support?",
          a: "Our support team is available to help with any questions, issues, or feedback. You can reach us at support@trackorapp.in or use the contact form on our Contact page. We typically respond within 24-48 hours, though we often reply much faster during business hours. For urgent issues, include 'Urgent' in your email subject line, and we'll prioritize your request. When reporting issues, please include details about what happened, which page you were on, and your browser/device information—screenshots are very helpful. We also welcome feature suggestions and feedback that helps shape our product roadmap."
        },
        {
          q: "Can I suggest new features for Trame?",
          a: "Absolutely! We love hearing from our users, and user feedback directly shapes our product roadmap. Send your feature suggestions to support@trackorapp.in or use our contact form. Tell us what you'd like to see, why it would help you, and how you imagine it working. Many of our current features started as user suggestions. We carefully review all feedback and prioritize features that would benefit the most users. While we can't implement every suggestion, we genuinely appreciate hearing how we can make Trame better for you."
        },
        {
          q: "I found a bug. How do I report it?",
          a: "Thank you for helping us improve! Please report bugs to support@trackorapp.in with as much detail as possible. Include: what you were trying to do, what happened instead, which page or feature was affected, your browser name and version (Chrome, Safari, Firefox, etc.), your device type (phone, tablet, computer), and any error messages you saw. Screenshots or screen recordings are extremely helpful for us to understand and reproduce the issue. We prioritize bug fixes based on severity and impact, and we'll keep you updated on the resolution. Your reports help make Trame better for everyone."
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="FAQ - Frequently Asked Questions About Trame"
        description="Get answers to common questions about Trame expense tracker. Learn about features, security, pricing, supported currencies, data export, and how to get started with personal finance management."
        keywords="Trame FAQ, expense tracker help, budgeting app questions, Trame support, financial tracking help, personal finance FAQ"
        canonicalUrl="https://trackorapp.in/faq"
      />
      <SchemaMarkup
        type="faq"
        questions={allFaqQuestions}
      />
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
              Find comprehensive answers to common questions about Trame. We believe in transparency and want you to understand exactly how our platform works. Can't find what you're looking for? 
              <Link to="/contact" className="text-primary hover:underline ml-1">Contact our support team</Link>.
            </p>
          </motion.div>
        </div>

        {/* FAQ Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Below you'll find detailed answers to over 20 frequently asked questions organized by topic. 
                Each answer is comprehensive to help you fully understand Trame's features, security, 
                and how it can help you achieve your financial goals. Click on any question to expand the answer.
              </p>
            </CardContent>
          </Card>
        </motion.div>

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
                        <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:text-primary">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base">
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

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12"
        >
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Quick Summary</h2>
              <div className="grid sm:grid-cols-2 gap-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What Trame Offers</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Comprehensive expense and income tracking</li>
                    <li>• Loan and debt management with payoff timelines</li>
                    <li>• Subscription monitoring with renewal alerts</li>
                    <li>• Visual savings goals with progress tracking</li>
                    <li>• Budget planning with category limits</li>
                    <li>• Beautiful analytics and spending insights</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Key Facts</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• 100% free with all features included</li>
                    <li>• Bank-level 256-bit encryption</li>
                    <li>• Works on all devices (phone, tablet, computer)</li>
                    <li>• GDPR and CCPA compliant</li>
                    <li>• No downloads required (works in browser)</li>
                    <li>• Export your data anytime</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our support team is here to help with any questions not covered above. 
                Whether you need help getting started, have technical issues, or want to suggest new features, 
                we're happy to assist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="gap-2">
                    Contact Support
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </Link>
                <a href="mailto:support@trackorapp.in">
                  <Button size="lg" variant="outline" className="gap-2">
                    Email: support@trackorapp.in
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
    </>
  );
}
