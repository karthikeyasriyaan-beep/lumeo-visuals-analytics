import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Floating orbs with parallax effect */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/4 -right-8 w-80 h-80 bg-accent/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-chart-2/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
    </div>
  );
}
