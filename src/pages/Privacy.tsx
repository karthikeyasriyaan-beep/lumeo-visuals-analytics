import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "Information We Collect",
    body: "Trackora may collect certain information when users interact with the platform. This can include basic account information provided during registration, expense data entered by the user, and technical information such as browser type, device type, and usage activity.",
  },
  {
    title: "How We Use Information",
    body: "The information collected is used to operate and improve the Trackora platform. This includes storing expense records, displaying spending summaries, improving system performance, and ensuring the security of the service.",
  },
  {
    title: "Cookies and Analytics",
    body: "Trackora may use cookies and analytics tools to understand how visitors interact with the website. These technologies help improve user experience by analyzing general usage patterns.",
  },
  {
    title: "Data Security",
    body: "Trackora takes reasonable steps to protect user information from unauthorized access, misuse, or disclosure. Security practices are used to ensure that financial records and personal information remain protected.",
  },
  {
    title: "Third-Party Services",
    body: "Trackora may integrate third-party services such as analytics providers or advertising networks. These services may collect anonymous usage information according to their own privacy policies.",
  },
  {
    title: "User Control",
    body: "Users can manage and edit their expense records directly from their Trackora dashboard. The platform is designed to give users control over the information they choose to store.",
  },
  {
    title: "Policy Updates",
    body: "Trackora may update this Privacy Policy occasionally to reflect improvements or changes to the platform. Any updates will be posted on this page.",
  },
  {
    title: "Contact",
    body: "If you have questions about this Privacy Policy or how Trackora handles user information, you can contact the Trackora team through the website contact page.",
  },
];

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>

          <p className="text-muted-foreground leading-relaxed mb-10">
            This Privacy Policy describes how Trackora collects, uses, and protects information when users access the Trackora website and its expense tracking services. By using Trackora, users agree to the practices described in this policy.
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

export default Privacy;
