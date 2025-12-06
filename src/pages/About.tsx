import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Shield, Users, ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-4xl">
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
              About Trackora
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Building the future of personal finance management, one user at a time.
            </p>
          </motion.div>
        </div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Story</h2>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                  <p>
                    Trackora was born from a simple realization: managing personal finances shouldn't require complex 
                    spreadsheets, expensive software, or a degree in accounting. We noticed that while financial literacy 
                    is crucial for building wealth and achieving life goals, the tools available were either too complicated 
                    for everyday use or too simplistic to provide real value.
                  </p>
                  <p>
                    Our team set out to create a solution that bridges this gap—a financial tracking platform that's 
                    powerful enough for serious financial planning yet intuitive enough for anyone to use from day one. 
                    We spent countless hours researching user needs, testing interfaces, and refining features to create 
                    a tool that feels natural and empowering.
                  </p>
                  <p>
                    What started as a small project quickly grew into a comprehensive financial management platform. 
                    Today, Trackora helps thousands of users take control of their finances, achieve their savings goals, 
                    and build a more secure financial future. We're proud to be part of their journey toward financial 
                    wellness and independence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission & Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Mission & Values</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To democratize financial management by providing accessible, intuitive tools that empower 
                      everyone to take control of their financial future, regardless of their background or experience level.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">User-First Design</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Every feature we build starts with understanding our users' needs. We believe great software 
                      should be invisible—helping you achieve your goals without getting in the way.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Security First</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Your financial data is precious. We implement bank-level security measures, encrypt all data, 
                      and never compromise on privacy. Your trust is our most valuable asset.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our roadmap is shaped by your feedback. We actively listen to our community and continuously 
                      improve Trackora based on real user needs and suggestions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Why We Built This */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="border-2">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why We Built Trackora</h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  Financial wellness is a cornerstone of a fulfilling life, yet too many people struggle with basic 
                  money management due to inadequate tools. We've seen brilliant individuals held back by poor financial 
                  decisions—not because they lack capability, but because they lack clarity about their financial situation.
                </p>
                <p>
                  Traditional financial software often falls into two extremes: overly complex enterprise solutions 
                  designed for accountants, or oversimplified apps that fail to provide meaningful insights. We built 
                  Trackora to fill this gap, creating a platform that respects your intelligence while removing 
                  unnecessary complexity.
                </p>
                <p>
                  Our vision extends beyond simple expense tracking. We want to help you understand your financial 
                  patterns, make informed decisions, and build sustainable habits that lead to long-term financial 
                  health. Whether you're saving for a house, paying off debt, or simply trying to understand where 
                  your money goes each month, Trackora provides the insights you need to succeed.
                </p>
                <p>
                  We believe financial empowerment should be accessible to everyone, which is why we're committed to 
                  keeping Trackora affordable and continuously improving it based on your needs. Your success is our 
                  success, and we're honored to be part of your financial journey.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
                Trackora is developed by a dedicated team of engineers, designers, and financial enthusiasts who 
                are passionate about creating tools that make a real difference in people's lives. We combine 
                expertise in software development, user experience design, and personal finance to deliver a product 
                that truly serves our users' needs.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Behind every feature is countless hours of research, testing, and refinement. We're continuously 
                learning from our community and evolving Trackora to meet the changing needs of modern financial 
                management. Our commitment is to provide you with the best possible tools for financial success.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mb-12"
        >
          <Card className="border-primary/20">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Company Information</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Legal Entity</h3>
                  <p className="text-muted-foreground">Cadlio Tech Private Limited</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Headquarters</h3>
                  <p className="text-muted-foreground">Hyderabad, Telangana, India</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Year Founded</h3>
                  <p className="text-muted-foreground">2024</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Contact</h3>
                  <a href="mailto:pla.team@cadliotech.com" className="text-primary hover:underline">
                    pla.team@cadliotech.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Join Us on This Journey</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Ready to take control of your finances? Join thousands of users who are already building a better 
                financial future with Trackora.
              </p>
              <Link to="/">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
