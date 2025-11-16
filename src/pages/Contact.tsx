import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone, MapPin, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
              Have questions, feedback, or need support? We're here to help. Reach out to us and we'll respond as quickly as possible.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a 
                      href="mailto:pla.team@cadliotech.com" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      pla.team@cadliotech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Support</p>
                    <a 
                      href="mailto:support@trackorapp.in" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      support@trackorapp.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Serving users globally
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Response Time</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We typically respond to all inquiries within 24-48 hours during business days. 
                  For urgent issues, please mention "URGENT" in your subject line.
                </p>
                <h3 className="font-bold mb-2">Beta Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  We're currently in beta and would love to hear your feedback! Your input helps 
                  us build a better product for everyone.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 max-w-6xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Is my financial data secure?</h3>
                <p className="text-muted-foreground">
                  Absolutely. We use bank-level 256-bit encryption to protect your data both in transit and at rest. 
                  Your information is never shared with third parties, and we follow industry-standard security practices.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Is Trackora free to use?</h3>
                <p className="text-muted-foreground">
                  Yes! Trackora is currently free during our beta phase. We're focused on building the best possible 
                  product with your feedback before introducing any paid features.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Can I export my data?</h3>
                <p className="text-muted-foreground">
                  Yes, you own your data. We provide easy export options so you can download your financial information 
                  at any time in standard formats like CSV and PDF.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">How do I delete my account?</h3>
                <p className="text-muted-foreground">
                  You can delete your account anytime from the Settings page. This will permanently remove all your 
                  data from our servers. If you need assistance, contact us at support@trackorapp.in.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
