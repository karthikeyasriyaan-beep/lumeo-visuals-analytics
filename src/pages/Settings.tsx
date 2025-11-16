import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Upload, Trash2, AlertTriangle } from "lucide-react";
import { CurrencySelector } from "@/components/currency-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { NoIndexMeta } from "@/components/NoIndexMeta";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearData = async () => {
    if (!user) return;
    
    setIsClearing(true);
    try {
      // Clear all user data from all tables
      const clearPromises = [
        supabase.from('income').delete().eq('user_id', user.id),
        supabase.from('expenses').delete().eq('user_id', user.id),
        supabase.from('loans').delete().eq('user_id', user.id),
        supabase.from('subscriptions').delete().eq('user_id', user.id),
        supabase.from('receipts').delete().eq('user_id', user.id),
        supabase.from('savings').delete().eq('user_id', user.id),
      ];
      
      const results = await Promise.all(clearPromises);
      
      // Check for errors
      const errors = results.filter(result => result.error);
      if (errors.length > 0) {
        throw new Error('Some data could not be cleared');
      }

      toast({
        title: "Data cleared successfully",
        description: "All your financial data has been permanently deleted.",
      });
    } catch (error) {
      console.error('Error clearing data:', error);
      toast({
        title: "Error clearing data",
        description: "There was an error clearing your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  const handleImportData = () => {
    // Create file input programmatically
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            // Handle import logic here
            toast({
              title: "Import feature coming soon",
              description: "Data import functionality will be available in a future update.",
            });
          } catch (error) {
            toast({
              title: "Invalid file format",
              description: "Please upload a valid JSON or CSV file.",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight gradient-text break-words">Settings</h1>
          <p className="text-muted-foreground text-sm sm:text-base break-words">
            Manage your preferences and data settings
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 w-full">
          {/* Appearance Settings */}
          <Card className="border-primary/20">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl break-words">
                Appearance
              </CardTitle>
              <CardDescription className="text-sm break-words">
                Customize how Trackora looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base break-words">Theme</p>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">Switch between light and dark mode</p>
                </div>
                <ThemeToggle />
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base break-words">Currency</p>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">Choose your preferred currency</p>
                </div>
                <CurrencySelector />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="border-primary/20">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl break-words">
                Data Management
              </CardTitle>
              <CardDescription className="text-sm break-words">
                Import and manage your financial data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="grid gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start gap-2 min-h-[44px] w-full"
                  onClick={handleImportData}
                >
                  <Upload className="h-4 w-4 flex-shrink-0" />
                  <span className="break-words">Import Data</span>
                  <span className="text-xs text-muted-foreground ml-auto">JSON, CSV</span>
                </Button>
                <Separator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="justify-start gap-2 min-h-[44px] w-full">
                      <Trash2 className="h-4 w-4 flex-shrink-0" />
                      <span className="break-words">Clear All Data</span>
                      <span className="text-xs text-muted-foreground ml-auto">Permanent</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete all your financial data including:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Income and expense records</li>
                        <li>Loan and debt information</li>
                        <li>Subscription data</li>
                        <li>Receipt images and data</li>
                        <li>Financial goals and progress</li>
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearData}
                      disabled={isClearing}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isClearing ? "Clearing..." : "Yes, clear all data"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your account details and security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Storage</p>
                <p className="text-sm text-muted-foreground">Securely stored with bank-level encryption</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Protected
              </span>
            </div>
          </CardContent>
        </Card>

          {/* Privacy & Legal */}
          <Card className="border-primary/20">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl break-words">Privacy & Legal</CardTitle>
              <CardDescription className="text-sm break-words">
                Review our policies and terms
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 sm:p-6 pt-0">
              <Button variant="ghost" size="sm" className="min-h-[44px] w-full sm:w-auto" asChild>
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="min-h-[44px] w-full sm:w-auto" asChild>
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}