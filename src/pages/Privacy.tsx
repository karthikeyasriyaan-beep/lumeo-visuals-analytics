import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Privacy = () => {
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
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-3xl font-display">Privacy Policy</CardTitle>
              </div>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
              <p className="text-sm text-muted-foreground mt-4">
                At Trackora, your privacy is our priority. We believe in transparency, security, and giving you full control over your financial data.
              </p>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide directly to us when you create an account and use Trackora's services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, and authentication credentials from your Google account</li>
                  <li><strong>Financial Data:</strong> Income records, expenses, loans, subscriptions, and savings goals you choose to track</li>
                  <li><strong>Usage Data:</strong> How you interact with our app, features you use, and preferences you set</li>
                  <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information helps us provide, maintain, and improve Trackora's services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Securely storing and organizing your financial data</li>
                  <li>Providing personalized analytics, insights, and budget recommendations</li>
                  <li>Sending important service updates and security alerts</li>
                  <li>Protecting against fraud and ensuring account security</li>
                  <li>Improving our features based on usage patterns</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  <strong>We never sell your data to third parties.</strong> Your financial information is yours alone.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">3. Data Security & Encryption</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-leading security measures to protect your data:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li><strong>AES-256 Encryption:</strong> Military-grade encryption for all data at rest and in transit</li>
                  <li><strong>Secure Authentication:</strong> OAuth 2.0 with Google for safe, passwordless login</li>
                  <li><strong>Zero-Knowledge Architecture:</strong> Your financial data is encrypted with keys only you control</li>
                  <li><strong>Regular Security Audits:</strong> Third-party penetration testing and vulnerability assessments</li>
                  <li><strong>Secure Infrastructure:</strong> Hosted on enterprise-grade cloud infrastructure with 99.9% uptime</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">4. International Data Protection Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Trackora complies with major data protection regulations worldwide:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li><strong>GDPR</strong> (European Union & United Kingdom) — Right to access, rectify, and erase data</li>
                  <li><strong>CCPA</strong> (California, USA) — Right to know what data is collected and opt-out of sale</li>
                  <li><strong>GLBA</strong> (United States) — Financial data protection standards</li>
                  <li><strong>LGPD</strong> (Brazil) — Data processing transparency and user consent</li>
                  <li><strong>PDPA</strong> (Singapore) — Personal data collection and usage rules</li>
                  <li><strong>POPIA</strong> (South Africa) — Processing of personal information protection</li>
                  <li><strong>PIPEDA</strong> (Canada) — Privacy rights and data handling</li>
                  <li><strong>Privacy Act</strong> (Australia) — Information privacy principles</li>
                  <li><strong>APPI</strong> (Japan) — Protection of personal information</li>
                  <li><strong>DPDP Act</strong> (India) — Digital personal data protection</li>
                  <li><strong>DIFC Data Protection Law</strong> (UAE) — Data security in financial zones</li>
                  <li><strong>Federal Data Protection Act</strong> (Switzerland) — Data processing transparency</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">5. Your Privacy Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have complete control over your data:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li><strong>Access:</strong> View all personal information we hold about you</li>
                  <li><strong>Update:</strong> Modify or correct your data at any time</li>
                  <li><strong>Delete:</strong> Permanently erase your account and all associated data</li>
                  <li><strong>Export:</strong> Download your complete financial data in portable formats (CSV, JSON)</li>
                  <li><strong>Restrict:</strong> Limit how we process your data</li>
                  <li><strong>Object:</strong> Opt-out of certain data processing activities</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  To exercise these rights, visit your <strong>Security Settings</strong> or contact us at <strong>privacy@trackorapp.in</strong>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your data only as long as necessary to provide our services or as required by law:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Active accounts: Data is retained as long as your account is active</li>
                  <li>Deleted accounts: Data is permanently erased within 30 days</li>
                  <li>Backups: Deleted data is removed from backups within 90 days</li>
                  <li>Legal requirements: Some data may be retained longer if required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">7. Cookies & Analytics</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use minimal cookies to ensure Trackora works smoothly:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li><strong>Essential cookies:</strong> Required for login and core functionality</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how you use Trackora (you can opt-out)</li>
                  <li><strong>Preference cookies:</strong> Remember your settings and customizations</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  You can manage cookie preferences through our cookie consent banner or browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">8. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Trackora uses trusted third-party services for specific functions:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li><strong>Google OAuth:</strong> For secure authentication (Google's privacy policy applies)</li>
                  <li><strong>Cloud Infrastructure:</strong> For secure data storage and hosting</li>
                  <li><strong>Analytics:</strong> For anonymous usage statistics (if you consent)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  These services are carefully vetted and comply with strict data protection standards.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">9. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Trackora is not intended for children under 13 years old. We do not knowingly collect data from children. If you believe a child has provided us with personal information, please contact us immediately at <strong>privacy@trackorapp.in</strong>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. When we make significant changes, we'll notify you via email or through a prominent notice in the app. Your continued use of Trackora after changes become effective means you accept the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions, concerns, or requests about this Privacy Policy or your data:
                </p>
                <div className="mt-3 p-4 rounded-lg bg-muted/50">
                  <p className="text-foreground font-medium">Email: privacy@trackorapp.in</p>
                  <p className="text-muted-foreground text-sm mt-1">We typically respond within 48 hours</p>
                </div>
              </section>

              <div className="mt-8 p-6 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground font-medium">
                  <strong>Your Trust Matters:</strong> We're committed to protecting your privacy and handling your financial data with the utmost care. If you ever have concerns, we're here to help.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;