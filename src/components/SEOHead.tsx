import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  imageUrl?: string;
}

/**
 * SEOHead component dynamically updates document head for better SEO.
 * Sets meta tags for title, description, Open Graph, Twitter Cards, and more.
 */
export const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Trame Team",
  section,
  imageUrl,
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Trame`;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Set canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonicalElement) {
        canonicalElement = document.createElement("link");
        canonicalElement.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalElement);
      }
      canonicalElement.setAttribute("href", canonicalUrl);
    }

    // Basic meta tags
    setMetaTag("description", description);
    if (keywords) {
      setMetaTag("keywords", keywords);
    }
    setMetaTag("author", author);

    // Open Graph meta tags
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", type === "article" ? "article" : "website", true);
    if (canonicalUrl) {
      setMetaTag("og:url", canonicalUrl, true);
    }
    setMetaTag("og:site_name", "Trame", true);
    if (imageUrl) {
      setMetaTag("og:image", imageUrl, true);
    }

    // Twitter Card meta tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    if (imageUrl) {
      setMetaTag("twitter:image", imageUrl);
    }

    // Article-specific meta tags
    if (type === "article") {
      if (publishedTime) {
        setMetaTag("article:published_time", publishedTime, true);
      }
      if (modifiedTime) {
        setMetaTag("article:modified_time", modifiedTime, true);
      }
      if (author) {
        setMetaTag("article:author", author, true);
      }
      if (section) {
        setMetaTag("article:section", section, true);
      }
    }

    // Cleanup function - reset to defaults when component unmounts
    return () => {
      document.title = "Trame - Smart Expense Tracker & Budget Analytics Platform";
    };
  }, [title, description, keywords, canonicalUrl, type, publishedTime, modifiedTime, author, section, imageUrl]);

  return null;
};
