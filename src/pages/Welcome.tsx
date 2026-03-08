"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Shield, Lock, Globe, Zap, ArrowRight, DollarSign, Repeat, Target, 
  BarChart3, CheckCircle2, TrendingUp, Wallet, 
  Sparkles, BookOpen, GraduationCap, Calculator, 
  CreditCard, Users, Home, Briefcase,
  FileText, AlertCircle, ChevronRight, Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";
import { useRef } from "react";
import MeshWaveBackground from "@/components/MeshWaveBackground";
import dashboardPreview from "../assets/dashboard-preview.png";

/* ——— Animation Variants ——— */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const textReveal = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

const Welcome = () => {
  const { enterAsGuest } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      <SEOHead
        title="Trackora - Smart Expense Tracker & Budget Analytics Platform"
        description="Take control of your finances with Trackora. Track daily expenses, manage loans, monitor subscriptions, set savings goals, and get clear spending insights. Free to use."
        keywords="expense tracker, budget analytics, personal finance, track expenses, financial planning, savings goals, loan tracker, subscription management"
        canonicalUrl="https://trackorapp.in"
      />
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <MeshWaveBackground />
      <CookieConsent />
      
      {/* Floating Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-3 sm:mx-6 mt-2 sm:mt-4">
          <div className="bg-background/60 backdrop-blur-2xl border border-border/30 rounded-2xl shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between max-w-6xl mx-auto">
            <span className="font-extrabold text-lg sm:text-2xl text-foreground tracking-tighter">
              Trackora
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                onClick={enterAsGuest} 
                variant="ghost" 
                className="hidden sm:inline-flex font-bold text-sm tracking-tight"
              >
                Enter
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="relative pt-24 sm:pt-36 md:pt-40 pb-16 sm:pb-24 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div style={{ opacity: heroOpacity, y: heroY }}>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
              {/* Left — Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.h1
                  variants={textReveal}
                  custom={0}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.06em] leading-[0.95] mb-6 sm:mb-8"
                >
                  Track Your
                  <br />
                  Daily Expenses
                  <br />
                  <span className="text-muted-foreground/70">
                    Effortlessly.
                  </span>
                </motion.h1>

                <motion.p
                  variants={textReveal}
                  custom={1}
                  className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-5 sm:mb-7 max-w-xl font-medium"
                >
                  Trackora is a simple expense tracking platform designed to help people record daily spending and understand where their money goes. By keeping all expenses organized in one place, Trackora makes it easier to monitor spending habits and manage personal finances without complicated tools.
                </motion.p>

                <motion.div
                  variants={textReveal}
                  custom={2}
                  className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-muted-foreground mb-6 sm:mb-10 tracking-wide uppercase"
                >
                  <span>Simple tracking</span>
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-foreground/30" />
                  <span>Clear summaries</span>
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-foreground/30" />
                  <span>Personal finance</span>
                </motion.div>

                <motion.div
                  variants={textReveal}
                  custom={3}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10"
                >
                  <Button
                    onClick={enterAsGuest}
                    size="lg"
                    className="text-sm sm:text-base px-6 sm:px-10 py-5 sm:py-7 rounded-xl font-extrabold tracking-tight shadow-lg hover:shadow-xl transition-all group"
                  >
                    Start Tracking
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Button>
                  <Link to="/how-it-works">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-sm sm:text-base px-6 sm:px-10 py-5 sm:py-7 rounded-xl border-2 font-bold tracking-tight w-full sm:w-auto hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                      Learn How It Works
                    </Button>
                  </Link>
                </motion.div>

                <motion.p
                  variants={textReveal}
                  custom={4}
                  className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg font-medium"
                >
                  Trackora is designed to help individuals build better financial awareness by keeping daily expenses organized and easy to review.
                </motion.p>
              </motion.div>

              {/* Right — Dashboard Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-card/50 backdrop-blur-sm">
                  <img
                    src={dashboardPreview}
                    alt="Trackora dashboard showing expense list, spending categories pie chart, and budget summary cards"
                    className="w-full h-auto"
                    loading="eager"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.7 }}
                  className="text-[11px] sm:text-xs md:text-sm text-muted-foreground text-center mt-4 sm:mt-6 max-w-md mx-auto leading-relaxed font-medium"
                >
                  A simple dashboard that shows your expenses, spending categories, and financial summaries in one clear view.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ CORE FEATURES ═══════ */}
      <section className="py-16 sm:py-24 md:py-36 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6">
                Simple Features That Make Expense Tracking Easy
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Trackora provides simple tools designed to help you record expenses, stay organized, and understand your spending habits without complicated financial systems.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: Wallet,
                  title: "Smart Expense Tracking",
                  desc: "Quickly record your daily expenses and keep your spending organized in one place. Trackora makes it easy to monitor your expenses and maintain clear financial records."
                },
                {
                  icon: FileText,
                  title: "Receipt Scanner",
                  desc: "Upload a receipt image and Trackora can extract key details such as the total amount and store information to help you log expenses faster."
                },
                {
                  icon: Zap,
                  title: "Voice Expense Entry",
                  desc: "Add expenses by simply speaking. Trackora converts your voice input into expense entries so you can record spending quickly without typing."
                },
                {
                  icon: BarChart3,
                  title: "Clear Spending Insights",
                  desc: "View summaries and visual charts that help you understand where your money goes and how your spending patterns change over time."
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="h-full rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 sm:p-8 hover:shadow-xl hover:border-border transition-all duration-500 hover:-translate-y-1">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-foreground/5 flex items-center justify-center mb-5 sm:mb-6">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-16 sm:py-24 md:py-36 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6">
                How Trackora Helps You Track Your Expenses
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Trackora is designed to make expense tracking simple and quick. Follow these steps to start recording and understanding your daily spending.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-border/60" />

              {[
                { num: "01", title: "Create Your Account", desc: "Sign up and access your personal expense tracking dashboard where all your spending records will be stored securely." },
                { num: "02", title: "Add Your Expenses", desc: "Record your daily expenses manually, upload a receipt, or use voice input to quickly add spending entries." },
                { num: "03", title: "Organize Your Spending", desc: "Trackora automatically organizes your expenses so you can see how much you spend across different categories." },
                { num: "04", title: "Review Your Insights", desc: "View summaries and simple charts that help you understand your spending habits and manage your finances better." }
              ].map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative text-center"
                >
                  <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-5 sm:mb-7 text-sm sm:text-lg font-extrabold tracking-tight">
                    {step.num}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm max-w-[260px] mx-auto">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ DASHBOARD SHOWCASE ═══════ */}
      <section className="py-16 sm:py-24 md:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6">
                See Your Expenses Clearly in One Dashboard
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Trackora brings all your financial information together in a single dashboard so you can quickly understand your spending and stay organized.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left — Text */}
              <motion.div variants={slideInLeft}>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-4 sm:mb-6">
                  Everything You Need to Track Your Spending
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
                  The Trackora dashboard gives you a clear overview of your daily expenses, spending categories, and financial summaries. Instead of scattered records, everything is organized in one simple and easy-to-understand interface.
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "View all recorded expenses in one organized list",
                    "Automatically categorize your spending",
                    "See summaries that highlight your spending patterns",
                    "Quickly review recent transactions"
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-foreground mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right — Dashboard Image */}
              <motion.div variants={slideInRight}>
                <div className="rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-card/50 backdrop-blur-sm">
                  <img
                    src={dashboardPreview}
                    alt="Trackora dashboard showing expense list, spending categories pie chart, and budget summary cards"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground text-center mt-4 sm:mt-6 max-w-md mx-auto leading-relaxed font-medium">
                  A clear dashboard that helps you stay aware of your spending and manage your finances more effectively.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ WHAT IS TRACKORA ═══════ */}
      <section className="py-16 sm:py-24 md:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground/5 border border-border/50 text-xs sm:text-sm font-bold mb-4 sm:mb-5">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                About Trackora
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
                What is Trackora?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: Globe, title: "Complete Finance Platform", desc: "Trackora is a comprehensive personal finance management platform designed to help individuals and families take complete control of their money. Unlike simple expense trackers that only record transactions, Trackora provides a complete financial ecosystem." },
                { icon: Users, title: "For Everyone", desc: "Whether you're a college student managing a tight budget, a working professional juggling multiple financial responsibilities, or a family planning for the future, Trackora adapts to your unique financial situation." },
                { icon: Lightbulb, title: "Powerful Insights", desc: "Instantly see where your money goes each month, identify spending patterns you weren't aware of, receive gentle alerts before subscription renewals, and track your debt payoff journey with visual progress indicators." }
              ].map((item, idx) => (
                <motion.div key={item.title} variants={fadeUp} custom={idx}>
                  <div className="h-full rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-5 sm:p-8 hover:shadow-xl hover:border-border transition-all duration-500 hover:-translate-y-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-foreground/5 flex items-center justify-center mb-4 sm:mb-5">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ WHY TRACKING MATTERS ═══════ */}
      <section className="py-16 sm:py-24 md:py-36">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground/5 border border-border/50 text-xs sm:text-sm font-bold mb-4 sm:mb-5">
                <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Financial Education
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
                Why Tracking Expenses Matters
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                Understanding where your money goes is the foundation of financial wellness
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
              <motion.div variants={slideInLeft}>
                <div className="h-full rounded-2xl sm:rounded-3xl border border-destructive/20 bg-destructive/5 p-5 sm:p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-destructive/10">
                      <AlertCircle className="h-5 w-5 sm:h-7 sm:w-7 text-destructive" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-extrabold">The Problem</h3>
                  </div>
                  <div className="space-y-3 sm:space-y-5">
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                      Studies show that most people have no clear idea where their money actually goes. Small daily purchases add up to <strong className="text-foreground">hundreds or even thousands</strong> each month that simply "disappear."
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                      Without tracking, the <strong className="text-foreground">gap between perception and reality</strong> prevents people from saving money, paying off debts, and reaching their financial goals.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={slideInRight}>
                <div className="h-full rounded-2xl sm:rounded-3xl border border-foreground/20 bg-foreground/5 p-5 sm:p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-foreground/10">
                      <CheckCircle2 className="h-5 w-5 sm:h-7 sm:w-7 text-foreground" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-extrabold">The Solution</h3>
                  </div>
                  <div className="space-y-3 sm:space-y-5">
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                      <strong className="text-foreground">Trackora makes financial awareness effortless.</strong> Quick-add features, intelligent categorization, and beautiful visualizations make tracking a natural habit—taking seconds, not minutes.
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                      Research shows that simply becoming aware of spending patterns leads to a natural <strong className="text-foreground">15-20% reduction</strong> in unnecessary expenses.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="py-16 sm:py-24 md:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
              Complete Financial Management
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Every tool you need to understand, manage, and grow your finances
            </p>
          </motion.div>

          <FeatureBlock icon={Wallet} emoji="💰" title="Smart Expense Tracking" subtitle="Every rupee accounted for—without effort" reverse={false}
            paragraphs={[
              { text: <><strong className="text-foreground">Record daily expenses with minimal effort.</strong> Automatically categorize transactions to identify spending habits and reduce unnecessary costs.</> },
              { text: <>⚡ The quick-add feature lets you log expenses in <strong className="text-foreground">under 5 seconds</strong>—enter the amount, select a category, done.</>, highlight: true },
            ]}
            checks={["Quick-add buttons", "Auto-categorization", "Color-coded categories", "Notes & tags", "Date & amount filters", "Easy edit & delete"]}
          />
          <FeatureBlock icon={TrendingUp} emoji="📈" title="Income Tracking" subtitle="See the complete picture of your earnings" reverse={true}
            paragraphs={[
              { text: <><strong className="text-foreground">Understanding income is just as important as tracking expenses.</strong> Record all sources—salary, freelance, dividends—for a complete cash flow picture.</> },
              { text: <>📈 For freelancers: identify high/low months and calculate your <strong className="text-foreground">true average monthly income</strong> for better budgeting.</>, highlight: true },
            ]}
            checks={["Multiple income sources", "Categorize by type", "Monthly summaries", "Income vs expense view", "Seasonal patterns", "Variable income planning"]}
          />
          <FeatureBlock icon={DollarSign} emoji="💳" title="Loans & Debt Tracker" subtitle="Complete debt visibility" reverse={false}
            paragraphs={[
              { text: <><strong className="text-foreground">Managing debt shouldn't feel overwhelming.</strong> All your loans in one unified view—personal, student, home, car, and credit card balances.</> },
              { text: <>🎯 Track principal, interest rate, EMI, and remaining balance. Know exactly <strong className="text-foreground">when you'll be debt-free</strong>.</>, highlight: true },
            ]}
            checks={["All loan types in one place", "Interest rate monitoring", "EMI payment reminders", "Debt payoff timelines", "Multiple creditors", "Total debt burden"]}
          />
          <FeatureBlock icon={Repeat} emoji="🔄" title="Subscription Management" subtitle="No more surprise charges" reverse={true}
            paragraphs={[
              { text: <>⚠️ <strong className="text-foreground">The average person spends thousands monthly</strong> on subscriptions they barely use. Streaming, gym, software—these charges silently drain your account.</>, highlight: true },
              { text: <>Unified view with costs and renewal dates. Before each renewal: <strong className="text-foreground">"Do you still need this?"</strong></> },
            ]}
            checks={["All subscriptions in one view", "Renewal alerts", "Total monthly & yearly costs", "Find unused subscriptions", "Billing cycle tracking", "Payment method tracking"]}
          />
          <FeatureBlock icon={Target} emoji="🎯" title="Savings Goals" subtitle="Celebrate every step toward your dreams" reverse={false}
            paragraphs={[
              { text: <><strong className="text-foreground">Saving becomes exciting with clear goals.</strong> Create custom goals for anything—emergency fund, vacation, education, or home down payment.</> },
              { text: <>🏆 Visualizing progress increases goal completion by <strong className="text-foreground">over 40%</strong>. Progress rings make every contribution rewarding.</>, highlight: true },
            ]}
            checks={["Unlimited savings goals", "Visual progress rings", "Target amounts & deadlines", "Contribution tracking", "Milestone celebrations", "Priority ordering"]}
          />
          <FeatureBlock icon={Calculator} emoji="📊" title="Budget Planning" subtitle="Spend intentionally, not accidentally" reverse={true}
            paragraphs={[
              { text: <><strong className="text-foreground">A budget gives every rupee a purpose.</strong> Allocate income across categories, ensuring you spend on what truly matters.</> },
              { text: <>📋 Set limits per category or an <strong className="text-foreground">overall monthly limit</strong>. Progress bars show how close you are.</>, highlight: true },
            ]}
            checks={["Category-wise budgets", "Overall monthly limits", "Visual progress bars", "Gentle alerts", "Historical comparison", "Smart suggestions"]}
          />
          <FeatureBlock icon={BarChart3} emoji="📈" title="Analytics & Insights" subtitle="Numbers that help, not stress" reverse={false}
            paragraphs={[
              { text: <><strong className="text-foreground">Data becomes powerful when presented clearly.</strong> Beautiful charts reveal patterns you might never notice otherwise.</> },
              { text: <>💡 Insights like <strong className="text-foreground">"You spent 35% more on dining out this month"</strong> help you spot issues early.</>, highlight: true },
            ]}
            checks={["Category breakdowns", "Monthly trend analysis", "Income vs expense charts", "Pattern identification", "Export reports", "Historical access"]}
            isLast
          />
        </div>
      </section>

      {/* ═══════ WHO USES TRACKORA ═══════ */}
      <section className="py-16 sm:py-24 md:py-36">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
                Who Uses Trackora?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                Real people with real financial goals
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-6xl mx-auto">
              {[
                { icon: GraduationCap, title: "Students", description: "Managing limited budgets while building financial habits that last a lifetime." },
                { icon: Briefcase, title: "Professionals", description: "Balancing salary, bonuses, and side income while managing EMIs and subscriptions." },
                { icon: Home, title: "Families", description: "Managing household budgets, education expenses, and long-term savings." },
                { icon: Users, title: "Freelancers", description: "Handling variable income and maintaining stability despite irregular payments." },
                { icon: CreditCard, title: "Debt-Free Seekers", description: "Actively paying down loans and visualizing the payoff journey." },
                { icon: Target, title: "Goal Setters", description: "Saving for specific targets with visual progress tracking." }
              ].map((useCase, idx) => (
                <motion.div key={useCase.title} variants={scaleIn} custom={idx}>
                  <div className="h-full rounded-xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-7 hover:shadow-xl hover:border-border transition-all duration-500 hover:-translate-y-1">
                    <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-foreground/5 w-fit mb-3 sm:mb-5">
                      <useCase.icon className="h-4 w-4 sm:h-6 sm:w-6 text-foreground" />
                    </div>
                    <h3 className="text-sm sm:text-xl font-extrabold mb-1 sm:mb-3">{useCase.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[11px] sm:text-sm">{useCase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECURITY ═══════ */}
      <section className="py-16 sm:py-24 md:py-36 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-background/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-background/5 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 text-background">
                Security & Privacy
              </h2>
              <p className="text-background/50 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                Your financial data deserves bank-level protection
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-16">
              {[
                { icon: Shield, title: "256-bit Encryption", desc: "Same encryption used by major banks." },
                { icon: Lock, title: "Privacy First", desc: "We never sell or share your data." },
                { icon: Globe, title: "GDPR Compliant", desc: "Full international data protection." },
                { icon: Zap, title: "Secure Sync", desc: "Encrypted access from any device." }
              ].map((item, idx) => (
                <motion.div key={item.title} variants={scaleIn} custom={idx}
                  className="text-center p-4 sm:p-7 rounded-xl sm:rounded-3xl bg-background/5 border border-background/10 hover:bg-background/10 transition-all duration-500"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-5 rounded-xl sm:rounded-2xl bg-background/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-background" />
                  </div>
                  <h3 className="text-xs sm:text-lg font-extrabold text-background mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-background/50 text-[10px] sm:text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ HOW TO START ═══════ */}
      <section className="py-16 sm:py-24 md:py-36">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
                How to Get Started
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                Three simple steps to financial clarity
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-3 sm:gap-8 relative">
                <div className="hidden sm:block absolute top-10 sm:top-12 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-foreground/30 via-foreground/10 to-foreground/30" />
                
                {[
                  { step: "1", title: "Create Account", desc: "Sign up with just your email. Free forever, no credit card needed." },
                  { step: "2", title: "Add Data", desc: "Log expenses, income, subscriptions, loans, and savings goals quickly." },
                  { step: "3", title: "Track & Improve", desc: "View analytics, track progress, and make informed financial decisions." }
                ].map((item, idx) => (
                  <motion.div key={item.step} variants={fadeUp} custom={idx} className="text-center relative">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-6 rounded-2xl sm:rounded-3xl bg-foreground text-background flex items-center justify-center text-xl sm:text-3xl font-extrabold shadow-xl relative z-10">
                      {item.step}
                    </div>
                    <h3 className="text-xs sm:text-xl font-extrabold mb-1 sm:mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-[10px] sm:text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={fadeUp} className="text-center mt-8 sm:mt-14">
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="gap-2 rounded-xl sm:rounded-2xl border-2 px-5 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-bold">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                  Full Step-by-Step Guide
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ RESOURCES ═══════ */}
      <section className="py-16 sm:py-24 md:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-16">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                <span className="text-xs sm:text-sm font-bold">Free Resources</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
                Learn & Grow
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                Explore guides and articles to build lasting financial skills.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {[
                { icon: BookOpen, title: "Budgeting Guide", desc: "Master budgets that work for your lifestyle", link: "/budgeting-guide" },
                { icon: Target, title: "Savings Guide", desc: "Proven strategies for reaching financial goals", link: "/savings-guide" },
                { icon: CreditCard, title: "Debt Management", desc: "Strategies for paying off debt effectively", link: "/debt-management-guide" },
                { icon: FileText, title: "Finance Blog", desc: "Tips on personal finance and money management", link: "/blog" }
              ].map((resource, idx) => (
                <motion.div key={resource.title} variants={scaleIn} custom={idx}>
                  <Link to={resource.link}>
                    <div className="h-full rounded-xl sm:rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 sm:p-7 hover:shadow-xl hover:border-foreground/20 transition-all duration-500 hover:-translate-y-1 group cursor-pointer">
                      <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-foreground/5 w-fit mb-3 sm:mb-5 group-hover:bg-foreground/10 transition-colors">
                        <resource.icon className="h-4 w-4 sm:h-6 sm:w-6 text-foreground" />
                      </div>
                      <h3 className="text-xs sm:text-base font-extrabold mb-1 sm:mb-2 group-hover:text-foreground transition-colors">{resource.title}</h3>
                      <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed">{resource.desc}</p>
                      <div className="mt-2 sm:mt-4 flex items-center gap-1 text-[10px] sm:text-sm text-foreground font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-16 sm:py-24 md:py-36">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="relative p-6 sm:p-10 md:p-16 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-5">
                  Ready to Take Control?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                  Start your journey to financial clarity today—it's completely free.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button
                    onClick={enterAsGuest}
                    size="lg"
                    className="text-sm sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all group font-extrabold"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Link to="/faq">
                    <Button variant="outline" size="lg" className="text-sm sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-xl sm:rounded-2xl border-2 font-bold w-full sm:w-auto">
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

/* ——— Reusable Feature Block ——— */
interface FeatureParagraph { text: React.ReactNode; highlight?: boolean; }
interface FeatureBlockProps {
  icon: React.ElementType; emoji: string; title: string; subtitle: string;
  reverse: boolean; paragraphs: FeatureParagraph[]; checks: string[]; isLast?: boolean;
}

function FeatureBlock({ icon: Icon, emoji, title, subtitle, reverse, paragraphs, checks, isLast }: FeatureBlockProps) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerContainer}
      className={isLast ? "" : "mb-12 sm:mb-20 md:mb-28"}
    >
      <div className={`grid md:grid-cols-2 gap-6 sm:gap-10 items-center ${reverse ? "md:grid-flow-dense" : ""}`}>
        <motion.div variants={reverse ? slideInRight : slideInLeft} className={reverse ? "md:col-start-2" : ""}>
          <div className="rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-5 sm:p-8 md:p-10">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-foreground/5 flex items-center justify-center mb-3 sm:mb-5">
              <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-foreground" />
            </div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold mb-1 sm:mb-2">
              {emoji} {title}
            </h3>
            <p className="text-muted-foreground font-bold text-xs sm:text-sm mb-4 sm:mb-6">{subtitle}</p>
            <div className="space-y-3 sm:space-y-4">
              {paragraphs.map((p, i) => (
                p.highlight ? (
                  <div key={i} className="rounded-xl sm:rounded-2xl bg-foreground/5 p-3 sm:p-5 border border-border/50">
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{p.text}</p>
                  </div>
                ) : (
                  <p key={i} className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">{p.text}</p>
                )
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={reverse ? slideInLeft : slideInRight} className={reverse ? "md:col-start-1 md:row-start-1" : ""}>
          <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-2 sm:gap-4">
            {checks.map((item, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}
                className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-foreground/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="mt-0.5 p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-foreground/5 group-hover:bg-foreground/10 transition-colors flex-shrink-0">
                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-foreground" />
                </div>
                <span className="text-[10px] sm:text-sm font-bold">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Welcome;
