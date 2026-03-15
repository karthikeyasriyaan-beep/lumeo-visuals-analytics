import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export default function ResourceArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const title = slug
    ?.split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <Button variant="ghost" size="sm" onClick={() => navigate("/resources")} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Resources
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h1>
          <p className="text-muted-foreground text-lg">
            Detailed content for this article is coming soon. Check back later for a comprehensive guide on this topic.
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
