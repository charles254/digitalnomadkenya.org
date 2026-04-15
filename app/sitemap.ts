import { MetadataRoute } from "next";
import data from "@/lib/data/pseo_data.json";

const BASE = "https://digitalnomadkenya.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/immigration-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const locationPages = data.locations.map((loc) => ({
    url: `${BASE}/immigration-guide/${loc.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const topicPages = data.topics.map((t) => ({
    url: `${BASE}/guide/${t.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...locationPages, ...topicPages];
}
