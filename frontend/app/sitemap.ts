import type { MetadataRoute } from "next";
import { allResidentialDoors, residentialBrands } from "@/lib/residential";
import { allCommercialDoors, commercialBrands } from "@/lib/commercial";

const BASE = "https://doorsdirectsouth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/residential-garage-doors`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/commercial-garage-doors`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/liftmaster-products`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/liftmaster-products/openers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/liftmaster-products/accessories`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/request-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/spring-request`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/ezdoor`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const brandPages: MetadataRoute.Sitemap = [
    ...residentialBrands.map((b) => ({
      url: `${BASE}/residential-garage-doors/${b.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...commercialBrands.map((b) => ({
      url: `${BASE}/commercial-garage-doors/${b.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const doorPages: MetadataRoute.Sitemap = [
    ...allResidentialDoors.map((d) => ({
      url: `${BASE}${d.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...allCommercialDoors.map((d) => ({
      url: `${BASE}${d.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticPages, ...brandPages, ...doorPages];
}
