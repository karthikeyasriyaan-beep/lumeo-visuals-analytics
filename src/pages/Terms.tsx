import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "Use of the Platform",
    body: "Trame provides tools that allow users to record and review personal expense information. Users agree to use the platform responsibly and only for lawful purposes related to personal financial organization.",
  },
  {
    title: "User Responsibilities",
    body: "Users are responsible for the accuracy of the information they enter into Trame. The platform stores expense data as provided by the user and does not verify or validate financial entries.",
  },
  {
    title: "Service Availability",
    body: "Trame aims to provide reliable access to its services. However, the platform may occasionally experience updates, maintenance, or technical interruptions that temporarily affect availability.",
  },
  {
    title: "Limitation of Responsibility",
    body: "Trame is designed as a personal expense tracking tool and should not be considered financial or investment advice. Users remain responsible for their financial decisions and how they interpret the information provided by the platform.",
  },
  {
    title: "Changes to the Terms",
    body: "Trame may update these Terms and Conditions periodically to reflect improvements or changes to the platform. Updated terms will be published on this page.",
  },
  {
    title: "Contact",
    body: "If you have questions regarding these Terms and Conditions, you can contact the Trame team through the website contact page.",
  },
];

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms and Conditions</h1>

          <p className="text-muted-foreground leading-relaxed mb-10">
            These Terms and Conditions outline the rules and guidelines for using the Trame website and its expense tracking services. By accessing or using Trame, users agree to comply with these terms.
          </p>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl font-semibold text-foreground mb-2">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;