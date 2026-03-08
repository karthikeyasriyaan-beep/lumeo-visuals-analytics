export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      {/* Subtle noise texture effect via gradient */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-foreground/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-foreground/[0.02] rounded-full blur-3xl" />
    </div>
  );
}