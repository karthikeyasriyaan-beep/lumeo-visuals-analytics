import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Smartphone, Activity, Download, Trash2, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { motion } from "framer-motion";
const Security = () => {
  const navigate = useNavigate();
  return <>
      <NoIndexMeta />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold font-display gradient-text">
                Security & Privacy
              </h1>
              <p className="text-lg text-muted-foreground">
                Your financial data is protected with industry-leading security
              </p>
            </div>

            {/* Security Overview */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-success animate-gentle-pulse" />
                    <div>
                      <p className="font-medium">Your account is secure</p>
                      <p className="text-sm text-muted-foreground">All security features are active</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">End-to-end encryption</span>
                    <span className="text-success font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Secure authentication</span>
                    <span className="text-success font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Data encryption at rest</span>
                    <span className="text-success font-medium">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            

            {/* Device Management */}
            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-secondary" />
                  Device Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  View and manage devices that have accessed your account.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">Current Device</p>
                      <p className="text-xs text-muted-foreground">Last active: Just now</p>
                    </div>
                    <span className="text-xs text-success">Active</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View All Devices
                </Button>
              </CardContent>
            </Card>

            {/* Login Activity */}
            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Login Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Review recent login activity to ensure your account security.
                </p>
                <Button variant="outline" className="w-full">
                  View Login History
                </Button>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Export Your Data</p>
                      <p className="text-xs text-muted-foreground">Download a copy of all your financial data</p>
                    </div>
                    <Button variant="soft" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Delete Account</p>
                      <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>How We Protect Your Data</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">AES-256 Encryption</h3>
                    <p className="text-sm text-muted-foreground">
                      Your data is encrypted using military-grade AES-256 encryption, both in transit and at rest.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Zero-Knowledge Architecture</h3>
                    <p className="text-sm text-muted-foreground">
                      We cannot access your financial data. Only you have the keys to decrypt your information.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Regular Security Audits</h3>
                    <p className="text-sm text-muted-foreground">
                      Our systems undergo regular third-party security audits to ensure the highest standards.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Compliance</h3>
                    <p className="text-sm text-muted-foreground">
                      We comply with GDPR, CCPA, and other major data protection regulations worldwide.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>;
};
export default Security;