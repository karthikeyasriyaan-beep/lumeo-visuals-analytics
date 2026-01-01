export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Simple gradient background - optimized for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      {/* Static subtle accents - no animations for better performance */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 -right-8 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
    </div>
  );
}