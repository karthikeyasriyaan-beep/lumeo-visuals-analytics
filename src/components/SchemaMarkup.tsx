import { useEffect } from "react";

interface ArticleSchemaProps {
  type: "article";
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
  image?: string;
}

interface FAQSchemaProps {
  type: "faq";
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface BreadcrumbSchemaProps {
  type: "breadcrumb";
  items: Array<{
    name: string;
    url: string;
  }>;
}

interface HowToSchemaProps {
  type: "howto";
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
  }>;
}

interface OrganizationSchemaProps {
  type: "organization";
}

type SchemaProps = 
  | ArticleSchemaProps 
  | FAQSchemaProps 
  | BreadcrumbSchemaProps 
  | HowToSchemaProps 
  | OrganizationSchemaProps;

/**
 * SchemaMarkup component injects JSON-LD structured data into the document head.
 * This helps search engines understand the content better.
 */
export const SchemaMarkup = (props: SchemaProps) => {
  useEffect(() => {
    let schema: Record<string, unknown>;

    switch (props.type) {
      case "article":
        schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: props.headline,
          description: props.description,
          datePublished: props.datePublished,
          dateModified: props.dateModified || props.datePublished,
          author: {
            "@type": "Organization",
            name: props.author || "Trackora Team",
            url: "https://trackorapp.in/about"
          },
          publisher: {
            "@type": "Organization",
            name: "Trackora",
            url: "https://trackorapp.in",
            logo: {
              "@type": "ImageObject",
              url: "https://trackorapp.in/favicon.ico"
            }
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": props.url
          },
          image: props.image || "https://trackorapp.in/og-image.png"
        };
        break;

      case "faq":
        schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: props.questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer
            }
          }))
        };
        break;

      case "breadcrumb":
        schema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: props.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };
        break;

      case "howto":
        schema = {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: props.name,
          description: props.description,
          step: props.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text
          }))
        };
        break;

      case "organization":
        schema = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Trackora",
          url: "https://trackorapp.in",
          logo: "https://trackorapp.in/favicon.ico",
          description: "Trackora is a smart expense tracker and budget analytics platform helping users take control of their finances.",
          foundingDate: "2024",
          founder: {
            "@type": "Person",
            name: "Sriyaan Karthikeya"
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            addressCountry: "India"
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: "trackorateam@trackorapp.in",
            contactType: "customer service"
          },
          sameAs: [
            "https://cadliotech.com"
          ]
        };
        break;

      default:
        return;
    }

    // Create script element for JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `schema-${props.type}`;
    script.textContent = JSON.stringify(schema);

    // Remove existing schema of same type if present
    const existing = document.getElementById(`schema-${props.type}`);
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const element = document.getElementById(`schema-${props.type}`);
      if (element) {
        element.remove();
      }
    };
  }, [props]);

  return null;
};
