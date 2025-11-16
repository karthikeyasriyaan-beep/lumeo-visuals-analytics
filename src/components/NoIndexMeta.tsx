import { useEffect } from "react";

/**
 * Component that adds noindex, nofollow meta tags to prevent search engines
 * from indexing pages that require authentication or have no public content
 */
export function NoIndexMeta() {
  useEffect(() => {
    // Create meta tag for robots
    const metaRobots = document.createElement("meta");
    metaRobots.name = "robots";
    metaRobots.content = "noindex, nofollow";
    document.head.appendChild(metaRobots);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  return null;
}
