import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="text-3xl font-display">Terms of Service</CardTitle>
              </div>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
              <p className="text-sm text-muted-foreground mt-4">
                Welcome to Trackora. These terms are designed to be clear, fair, and human. If anything is unclear, please reach out to us.
              </p>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By creating an account and using Trackora, you agree to these Terms of Service. If you don't agree, please don't use our service. We'll always notify you of significant changes to these terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">2. What Trackora Does</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Trackora is a personal finance management tool that helps you:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Track income, expenses, loans, subscriptions, and savings goals</li>
                  <li>Set budgets and receive gentle spending guidance</li>
                  <li>Visualize your financial health through analytics and reports</li>
                  <li>Securely store your financial data in the cloud</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  <strong>Important:</strong> Trackora is a tracking tool, not a financial advisor. Always consult qualified professionals for financial decisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">3. Your Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To keep your account safe and our community healthy, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li><strong>Secure your account:</strong> Keep your login credentials confidential and enable two-factor authentication</li>
                  <li><strong>Provide accurate information:</strong> Enter correct financial data for meaningful insights</li>
                  <li><strong>Use Trackora legally:</strong> Comply with all applicable laws and regulations</li>
                  <li><strong>Don't share accounts:</strong> Each account is for individual use only</li>
                  <li><strong>Back up important data:</strong> While we maintain backups, you're responsible for your own records</li>
                  <li><strong>Report security issues:</strong> Notify us immediately of any unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">4. Financial Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Trackora is a financial tracking tool, not a financial advisor.</strong> We provide:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Tools to organize and visualize your financial data</li>
                  <li>Budget tracking and spending insights</li>
                  <li>Analytics based on your input</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We do <strong>not</strong> provide:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Investment recommendations or advice</li>
                  <li>Tax preparation or advice</li>
                  <li>Legal or professional financial consulting</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Always consult qualified financial professionals for advice on investments, taxes, loans, and major financial decisions. We are not responsible for any financial decisions you make based on Trackora's data or insights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">5. Data Accuracy & Responsibility</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we provide tools to help you track your finances accurately:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>You are responsible for verifying the accuracy of all data you enter</li>
                  <li>We recommend regularly reconciling Trackora data with official bank statements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">6. Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive for 99.9% uptime, but occasional interruptions may occur due to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Scheduled maintenance (we'll notify you in advance)</li>
                  <li>System updates and security patches</li>
                  <li>Unexpected technical issues</li>
                  <li>Force majeure events beyond our control</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We'll work quickly to resolve any issues and keep you informed throughout.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">7. Subscription & Billing (If Applicable)</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you subscribe to a paid plan:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Subscriptions renew automatically unless canceled</li>
                  <li>You can cancel anytime from your account settings</li>
                  <li>Refunds are handled on a case-by-case basis (contact support)</li>
                  <li>Pricing changes will be communicated 30 days in advance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">8. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Your data is yours.</strong> You retain ownership of all financial information you input into Trackora.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Trackora's code, design, branding, and features are our intellectual property. You may not:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Copy, modify, or reverse-engineer our software</li>
                  <li>Use our branding without permission</li>
                  <li>Create competing services using Trackora's code or design</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Trackora is provided "as is" without warranties of any kind</li>
                  <li>We are not liable for indirect, incidental, or consequential damages</li>
                  <li>Our total liability is limited to the amount you paid us in the past 12 months</li>
                  <li>We are not responsible for losses resulting from your financial decisions</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Some jurisdictions don't allow these limitations, so they may not apply to you.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">10. Account Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>You can delete your account anytime</strong> from your settings. All data will be permanently erased within 30 days.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We reserve the right to suspend or terminate accounts that:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Violate these terms</li>
                  <li>Engage in fraudulent activity</li>
                  <li>Pose security risks to our system or users</li>
                  <li>Remain inactive for extended periods (we'll notify you first)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">11. Changes to These Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update these terms from time to time. When we make significant changes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>We'll notify you via email or in-app notification</li>
                  <li>Changes become effective 30 days after notification</li>
                  <li>Continued use after changes means you accept the new terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">12. Governing Law & Disputes</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms are governed by the laws of [Your Jurisdiction]. If a dispute arises:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>We encourage friendly resolution through support@trackorapp.in</li>
                  <li>If needed, disputes will be resolved through binding arbitration</li>
                  <li>You waive the right to class action lawsuits</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">13. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Questions, concerns, or feedback? We'd love to hear from you:
                </p>
                <div className="mt-3 p-4 rounded-lg bg-muted/50">
                  <p className="text-foreground font-medium">Email: legal@trackorapp.in</p>
                  <p className="text-muted-foreground text-sm mt-1">We typically respond within 48 hours</p>
                </div>
              </section>

              <div className="mt-8 p-6 rounded-xl bg-secondary/10 border border-secondary/20">
                <p className="text-sm text-foreground font-medium">
                  <strong>We're Here for You:</strong> These terms are meant to protect both you and Trackora. If anything seems unfair or unclear, please reach out. We're committed to building a service you can trust.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;