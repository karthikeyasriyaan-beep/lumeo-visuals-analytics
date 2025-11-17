import { useState } from "react";
import { ReceiptScanner } from "@/components/ReceiptScanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { useToast } from "@/hooks/use-toast";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { NoIndexMeta } from "@/components/NoIndexMeta";

export default function Receipts() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const { toast } = useToast();

  const { data: receipts = [], refetch } = useQuery({
    queryKey: ['receipts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('receipts')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      return data || [];
    },
    enabled: !!user
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('receipts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Receipt deleted",
        description: "The receipt has been removed successfully.",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error deleting receipt",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <NoIndexMeta />
      <div className="relative min-h-screen w-full overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <BackgroundBlobs />
        
        <div className="max-w-7xl mx-auto space-y-6 animate-slide-up">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text">
              Receipt Scanner
            </h1>
            <p className="text-muted-foreground mt-2">
              Snap a photo of any receipt and watch Trackora automatically extract amounts, vendors, dates, and categories
            </p>
          </div>

          {/* Scanner */}
          <ReceiptScanner onScanComplete={refetch} />

          {/* Receipts List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Scanned Receipts</h2>
            
            {receipts.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No receipts yet. Scan your first receipt to get started!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {receipts.map((receipt) => (
                  <Card key={receipt.id} className="glass-card overflow-hidden">
                    {receipt.image_url && (
                      <div className="aspect-video w-full bg-muted overflow-hidden">
                        <img 
                          src={receipt.image_url} 
                          alt={receipt.merchant || receipt.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">
                            {receipt.merchant || receipt.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(receipt.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary" className="ml-2 shrink-0">
                          {receipt.category}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-primary">
                          {formatAmount(receipt.amount)}
                        </p>
                        
                        <div className="flex gap-2">
                          {receipt.image_url && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => window.open(receipt.image_url!, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(receipt.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {receipt.notes && (
                        <p className="text-sm text-muted-foreground mt-3">
                          {receipt.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
