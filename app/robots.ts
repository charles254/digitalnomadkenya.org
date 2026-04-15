import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/partner", "/admin", "/api/"] },
    ],
    sitemap: "https://digitalnomadkenya.org/sitemap.xml",
  };
}
