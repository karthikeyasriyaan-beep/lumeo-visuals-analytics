import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { command } = await req.json();

    if (!command) {
      return new Response(
        JSON.stringify({ error: "No command provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing voice command:", command);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-nano",
        messages: [
          {
            role: "system",
            content: `You are a financial assistant that parses voice commands to extract transaction details.
Extract the following from user commands:
- type: "expense" or "income"
- amount: number (extract the numeric value)
- name: string (what the transaction is for)
- category: string (categorize as: Food, Transport, Shopping, Bills, Entertainment, Health, Salary, Freelance, Investment, Other)

Respond ONLY with valid JSON in this exact format:
{"type": "expense"|"income", "amount": number, "name": "string", "category": "string"}

Examples:
"Add expense 50 dollars for groceries" -> {"type": "expense", "amount": 50, "name": "Groceries", "category": "Food"}
"I spent 30 on uber" -> {"type": "expense", "amount": 30, "name": "Uber", "category": "Transport"}
"Add income 5000 salary" -> {"type": "income", "amount": 5000, "name": "Salary", "category": "Salary"}
"Received 200 from freelance work" -> {"type": "income", "amount": 200, "name": "Freelance work", "category": "Freelance"}

If you cannot determine the type or amount, respond with: {"type": null, "amount": null, "name": null, "category": null}`
          },
          {
            role: "user",
            content: command
          }
        ],
        max_tokens: 150,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    
    console.log("AI response:", content);

    // Parse the JSON response
    let parsed;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Parse error:", parseError);
      parsed = { type: null, amount: null, name: null, category: null };
    }

    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in parse-voice-command:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
