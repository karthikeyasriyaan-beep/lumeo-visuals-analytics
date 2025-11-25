import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function SubscriptionAuditGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10">
                Money Saving
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              How to Perform a Subscription Audit and Save Hundreds Annually
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                October 20, 2025
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                5 min read
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Trackora Team
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <Card className="mb-8">
              <CardContent className="p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  Subscription services have revolutionized how we consume content and services, but they've also created 
                  a new financial challenge. From streaming platforms to cloud storage, productivity tools to meal kits, 
                  these recurring charges quietly add up. Most people are paying for subscriptions they rarely use or 
                  have completely forgotten about.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Hidden Cost of Subscription Creep</h2>
                
                <p>
                  Research shows that the average person underestimates their monthly subscription spending by over 40%. 
                  What feels like "just a few streaming services" often totals ₹5,000-10,000 or $200-400 per month when 
                  you include everything: entertainment, software, fitness apps, music services, cloud storage, and more.
                </p>

                <p>
                  The subscription business model is designed to be frictionless—easy to sign up, easy to forget about. 
                  Companies bet that many subscribers will pay indefinitely for services they barely use. A systematic 
                  audit helps you take back control and eliminate wasteful spending.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Step 1: Discover All Your Subscriptions</h2>

                <p>
                  The first challenge is identifying every subscription you're paying for. Here's how to find them all:
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Review Bank and Credit Card Statements</h3>
                <p>
                  Go through the past three months of transactions across all your accounts. Look for recurring charges, 
                  especially:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Monthly charges that appear consistently</li>
                  <li>Annual subscriptions (which are easy to forget)</li>
                  <li>Small charges under ₹500 or $20 that might slip under the radar</li>
                  <li>Charges with unfamiliar names (companies often bill under different names)</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Check Your Email</h3>
                <p>
                  Search your email for terms like "subscription," "membership," "renewal," "billing," and "payment 
                  confirmation." Most services send regular emails about billing, making your inbox a goldmine for 
                  discovering forgotten subscriptions.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Review App Store Subscriptions</h3>
                <p>
                  Check both Apple App Store and Google Play Store subscription sections. Many people have app subscriptions 
                  they signed up for during free trials and forgot to cancel.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Use Subscription Tracking Tools</h3>
                <p>
                  Tools like Trackora help automate this process by monitoring your transactions and identifying recurring 
                  charges. This eliminates the manual work and ensures nothing slips through the cracks.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Step 2: Create Your Subscription Inventory</h2>

                <p>
                  Once you've identified all subscriptions, create a comprehensive list including:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service name:</strong> What you're subscribed to</li>
                  <li><strong>Monthly cost:</strong> Convert annual costs to monthly for easier comparison</li>
                  <li><strong>Annual cost:</strong> The total yearly impact</li>
                  <li><strong>Billing date:</strong> When the charge occurs</li>
                  <li><strong>Billing cycle:</strong> Monthly, quarterly, or annual</li>
                  <li><strong>Cancellation deadline:</strong> When you must cancel to avoid next charge</li>
                  <li><strong>Last used:</strong> When you last actually used the service</li>
                </ul>

                <p>
                  Seeing everything in one place is eye-opening. Your total might shock you—but that's the point. 
                  Awareness is the first step to optimization.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Step 3: Evaluate Each Subscription</h2>

                <p>
                  Now comes the decision-making process. For each subscription, ask these critical questions:
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Usage Assessment</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>When did I last use this service?</li>
                  <li>How frequently do I use it? (Daily, weekly, monthly, rarely)</li>
                  <li>If I used it once for a specific project, do I still need it?</li>
                  <li>Would I notice if this disappeared tomorrow?</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Value Analysis</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Does this genuinely improve my life or work?</li>
                  <li>Is there a free alternative that meets my needs?</li>
                  <li>Could I share this subscription with family members to justify the cost?</li>
                  <li>Am I keeping this out of habit rather than value?</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Cost-Benefit Ratio</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>If I used this service twice a month, what's the cost per use?</li>
                  <li>Could I achieve the same result more affordably?</li>
                  <li>Am I paying for premium features I don't actually use?</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Step 4: Make Strategic Cuts and Adjustments</h2>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Immediate Cancellations</h3>
                <p>
                  Cancel subscriptions that fall into these categories:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Services you haven't used in over a month</li>
                  <li>Free trial that converted to paid without your active decision</li>
                  <li>Duplicate services (multiple streaming platforms with overlapping content)</li>
                  <li>Services that no longer meet your needs or goals</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Downgrade Options</h3>
                <p>
                  Instead of canceling entirely, consider downgrading:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Move from premium to basic tiers if you don't use premium features</li>
                  <li>Switch from monthly to annual billing if you're committed (often 15-20% cheaper)</li>
                  <li>Reduce seat count on team plans you're not fully utilizing</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Rotation Strategy</h3>
                <p>
                  For entertainment subscriptions, consider rotating them:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Subscribe to one streaming service for 2-3 months, watch everything you want</li>
                  <li>Cancel and switch to another service for the next quarter</li>
                  <li>This approach gives access to all content annually at a fraction of the cost</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Step 5: Implement Subscription Management Practices</h2>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Set Calendar Reminders</h3>
                <p>
                  For subscriptions you keep, set reminders a few days before renewal dates. This gives you time to 
                  evaluate whether you want to continue for another billing cycle.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Use Virtual Cards</h3>
                <p>
                  Some banks offer virtual card numbers. Use these for new subscriptions so you can easily disable 
                  the card number if a service becomes difficult to cancel.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Schedule Quarterly Reviews</h3>
                <p>
                  Put a recurring reminder in your calendar to review all subscriptions every three months. This prevents 
                  subscription creep from returning.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Adopt a One-In-One-Out Policy</h3>
                <p>
                  Before subscribing to a new service, commit to canceling an existing one. This keeps your total 
                  subscription spending in check.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Common Subscription Categories to Audit</h2>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Entertainment</h3>
                <p>
                  Netflix, Disney+, Amazon Prime, Apple TV+, Spotify, YouTube Premium, gaming subscriptions
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Productivity & Software</h3>
                <p>
                  Microsoft 365, Adobe Creative Cloud, Grammarly, cloud storage, password managers, project management tools
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Health & Fitness</h3>
                <p>
                  Gym memberships, fitness app subscriptions, meditation apps, nutrition tracking, online fitness classes
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">News & Education</h3>
                <p>
                  News website subscriptions, online courses, language learning apps, audiobook services
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Lifestyle</h3>
                <p>
                  Meal kit delivery, wine clubs, beauty boxes, book subscriptions, premium app memberships
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Financial Impact of Regular Audits</h2>

                <p>
                  A typical subscription audit eliminates 30-50% of recurring charges. If you're spending ₹8,000 or 
                  $300 monthly on subscriptions, that's potential annual savings of ₹28,800-48,000 or $1,080-1,800.
                </p>

                <p>
                  These aren't small numbers. Redirected toward savings goals, debt repayment, or investments, this 
                  money significantly improves your financial situation. The time investment—perhaps 2-3 hours for a 
                  thorough audit—delivers returns that few other activities can match.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Start Your Audit Today</h2>

                <p>
                  The best time to perform a subscription audit is right now. Block out an hour this week to identify 
                  all your subscriptions. You'll likely find surprises—services you forgot existed, charges that slipped 
                  through unnoticed, or premium tiers you're paying for but not using.
                </p>

                <p>
                  Remember that canceling doesn't mean you can never subscribe again. If you miss a service after 
                  canceling, you can always resubscribe. But often, you'll discover that you don't miss it at all—and 
                  you'll wonder why you paid for it so long.
                </p>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-base font-medium text-foreground">
                    Ready to optimize your subscriptions? <Link to="/" className="text-primary hover:underline">
                    Try Trackora</Link> to automatically track all your recurring subscriptions, receive renewal 
                    alerts, and see exactly how much you're spending monthly and annually on subscriptions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.article>
      </div>
      
      <Footer />
    </div>
  );
}
