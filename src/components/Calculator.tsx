"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, X } from "lucide-react";

export function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation("");
      setWaitingForOperand(true);
    } catch {
      setDisplay("Error");
      setEquation("");
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setWaitingForOperand(false);
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <>
      {/* Button to open popup */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => setIsOpen(true)}
          className="gap-2 hover:shadow-lg"
          size="lg"
        >
          <CalcIcon className="h-5 w-5" />
          Calculator
        </Button>
      </motion.div>

      {/* Popup overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Draggable Calculator Card */}
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.2}
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-sm -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
            >
              <Card className="shadow-2xl border border-border/40 bg-background/95 backdrop-blur-md">
                <CardHeader className="flex flex-row justify-between items-center p-4 cursor-move">
                  <CardTitle>Calculator</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>

                <CardContent className="space-y-4 p-4 pt-0">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground h-5">{equation}</div>
                    <div className="text-3xl font-bold text-right break-words">
                      {display}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="w-full h-12 font-semibold"
                  >
                    Clear
                  </Button>

                  {buttons.map((row, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2">
                      {row.map((btn) => (
                        <motion.div key={btn} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant={["+", "-", "*", "/", "="].includes(btn) ? "default" : "outline"}
                            onClick={() => {
                              if (btn === "=") handleEquals();
                              else if (["+", "-", "*", "/"].includes(btn))
                                handleOperator(btn);
                              else if (btn === ".") handleDecimal();
                              else handleNumber(btn);
                            }}
                            className="w-full h-12 text-lg font-semibold"
                          >
                            {btn}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
