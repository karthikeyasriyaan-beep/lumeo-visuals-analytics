import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { addGuestExpense, addGuestIncome } from "@/lib/guest-storage";

interface VoiceAssistantProps {
  onExpenseAdded?: () => void;
  onIncomeAdded?: () => void;
}

export function VoiceAssistant({ onExpenseAdded, onIncomeAdded }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();
  const { user, isGuest } = useAuth();

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const text = result[0].transcript;
      setTranscript(text);

      if (result.isFinal) {
        processVoiceCommand(text);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      toast({
        title: "Voice Error",
        description: `Could not recognize speech: ${event.error}`,
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  const processVoiceCommand = async (text: string) => {
    if (!text.trim() || !user) return;

    setIsProcessing(true);
    setTranscript("");

    try {
      const { data, error } = await supabase.functions.invoke("parse-voice-command", {
        body: { command: text },
      });

      if (error) throw error;

      if (data.type === "expense" && data.amount) {
        await addExpense(data);
      } else if (data.type === "income" && data.amount) {
        await addIncome(data);
      } else {
        toast({
          title: "Command Not Understood",
          description: "Try saying something like 'Add expense 50 dollars for groceries' or 'Add income 1000 dollars salary'",
        });
      }
    } catch (error) {
      console.error("Error processing voice command:", error);
      toast({
        title: "Processing Error",
        description: "Could not process your command. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const addExpense = async (data: { amount: number; name: string; category?: string }) => {
    if (!user) return;

    if (isGuest) {
      addGuestExpense({
        name: data.name || "Voice Expense",
        amount: data.amount,
        category: data.category || "Other",
      });

      toast({
        title: "Expense Added",
        description: `Added ${data.name || "expense"} (saved locally)`,
      });
      onExpenseAdded?.();
      return;
    }

    const { error } = await supabase.from("expenses").insert({
      user_id: user.id,
      name: data.name || "Voice Expense",
      amount: data.amount,
      category: data.category || "Other",
      date: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;

    toast({
      title: "Expense Added",
      description: `Added ${data.name || "expense"} for $${data.amount}`,
    });
    onExpenseAdded?.();
  };

  const addIncome = async (data: { amount: number; name: string; category?: string }) => {
    if (!user) return;

    if (isGuest) {
      addGuestIncome({
        source: data.name || "Voice Income",
        amount: data.amount,
        category: data.category || "Other",
      });

      toast({
        title: "Income Added",
        description: `Added ${data.name || "income"} (saved locally)`,
      });
      onIncomeAdded?.();
      return;
    }

    const { error } = await supabase.from("income").insert({
      user_id: user.id,
      source: data.name || "Voice Income",
      amount: data.amount,
      category: data.category || "Other",
      date: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;

    toast({
      title: "Income Added",
      description: `Added ${data.name || "income"} for $${data.amount}`,
    });
    onIncomeAdded?.();
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in this browser. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const isSupported = typeof window !== "undefined" && 
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  if (!isSupported) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={toggleListening}
        disabled={isProcessing}
        size="lg"
        className={`rounded-full w-14 h-14 p-0 transition-all duration-300 ${
          isListening 
            ? "bg-red-500 hover:bg-red-600 animate-pulse" 
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isProcessing ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
      
      {(isListening || transcript) && (
        <div className="text-center text-sm text-muted-foreground max-w-xs">
          {isListening && !transcript && "Listening..."}
          {transcript && <span className="text-foreground">{transcript}</span>}
        </div>
      )}
      
      {isProcessing && (
        <span className="text-xs text-muted-foreground">Processing...</span>
      )}
    </div>
  );
}
