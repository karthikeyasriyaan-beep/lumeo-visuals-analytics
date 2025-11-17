import { useState, useRef } from "react";
import { Camera, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ReceiptScannerProps {
  onScanComplete?: () => void;
}

export function ReceiptScanner({ onScanComplete }: ReceiptScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleImageSelect = async (file: File) => {
    if (!user) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setScanning(true);

    try {
      // Convert to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Call edge function to scan receipt
      const { data, error } = await supabase.functions.invoke('scan-receipt', {
        body: { imageBase64: base64 }
      });

      if (error) throw error;

      // Upload image to storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('receipts')
        .getPublicUrl(fileName);

      // Save to database
      const { error: insertError } = await supabase.from('receipts').insert({
        user_id: user.id,
        name: data.merchant,
        merchant: data.merchant,
        amount: parseFloat(data.amount),
        date: data.date,
        category: data.category,
        image_url: publicUrl,
      });

      if (insertError) throw insertError;

      toast({
        title: "Receipt scanned successfully!",
        description: `Extracted: ${data.merchant} - $${data.amount}`,
      });

      setPreview(null);
      onScanComplete?.();
    } catch (error: any) {
      console.error("Error scanning receipt:", error);
      toast({
        title: "Error scanning receipt",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Scan Receipt</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a photo to automatically extract details
            </p>
          </div>

          {preview && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <img src={preview} alt="Receipt preview" className="w-full h-full object-contain" />
              {scanning && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Scanning receipt...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
            />
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={scanning}
              className="flex-1 gap-2"
              size="lg"
            >
              <Camera className="h-5 w-5" />
              Take Photo
            </Button>

            <Button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) handleImageSelect(file);
                };
                input.click();
              }}
              disabled={scanning}
              variant="outline"
              className="flex-1 gap-2"
              size="lg"
            >
              <Upload className="h-5 w-5" />
              Upload
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
