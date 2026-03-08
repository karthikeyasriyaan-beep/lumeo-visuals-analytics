import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      
      {/* Animated blobs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-foreground/[0.03] blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -40, 30, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-foreground/[0.025] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 50, -30, 0], y: [0, -20, 40, 0], scale: [1, 1.05, 0.9, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-15%] left-[20%] w-[550px] h-[550px] rounded-full bg-foreground/[0.02] blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -20, 40, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] left-[-8%] w-[400px] h-[400px] rounded-full bg-foreground/[0.02] blur-[80px]"
      />
      <motion.div
        animate={{ x: [0, 25, -35, 0], y: [0, -35, 25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[30%] w-[350px] h-[350px] rounded-full bg-foreground/[0.015] blur-[90px]"
      />
    </div>
  );
}
