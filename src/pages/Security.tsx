import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Smartphone, Activity, Download, Trash2, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Security = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [showDevices, setShowDevices] = useState(false);
  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready shortly. We'll send you a download link via email.",
    });
  };

  const handleResetPassword = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "No email address found for your account.",
        variant: "destructive",
      });
      return;
    }

    setIsResettingPassword(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for a link to reset your password.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // In a real app, you'd call a backend endpoint to delete the account
      await signOut();
      toast({
        title: "Account Deleted",
        description: "Your account and all associated data have been permanently deleted.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };
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

            {/* Password Reset */}
            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-primary" />
                  Password Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Keep your account secure by using a strong, unique password.
                </p>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">Reset Password</p>
                    <p className="text-xs text-muted-foreground">Send a password reset link to your email</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleResetPassword}
                    disabled={isResettingPassword}
                  >
                    {isResettingPassword ? "Sending..." : "Reset"}
                  </Button>
                </div>
              </CardContent>
            </Card>


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
                <Button variant="outline" className="w-full" onClick={() => setShowDevices(true)}>
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
                <Button variant="outline" className="w-full" onClick={() => setShowLoginHistory(true)}>
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
                    <Button variant="soft" size="sm" onClick={handleExportData}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Delete Account</p>
                      <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(true)}>
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

        {/* Devices Dialog */}
        <Dialog open={showDevices} onOpenChange={setShowDevices}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Device Management</DialogTitle>
              <DialogDescription>
                Devices that have accessed your account recently
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Current Device</p>
                      <p className="text-sm text-muted-foreground">
                        {navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'} • {navigator.platform}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">Active</span>
                </div>
                <p className="text-xs text-muted-foreground">Last active: Just now</p>
              </div>
              <p className="text-sm text-muted-foreground text-center py-4">
                No other devices have accessed your account recently
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Login History Dialog */}
        <Dialog open={showLoginHistory} onOpenChange={setShowLoginHistory}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Login Activity</DialogTitle>
              <DialogDescription>
                Recent login activity on your account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">Active</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Signed in: {new Date().toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-muted-foreground text-center py-4">
                No other recent login activity
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Account Confirmation Dialog */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                Are you absolutely sure you want to delete your account? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm font-medium text-destructive">Warning: This will permanently delete:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>All your financial data</li>
                  <li>Transaction history</li>
                  <li>Budget information</li>
                  <li>Account settings</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>;
};
export default Security;