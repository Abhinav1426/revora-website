import type { MetadataRoute } from "next";
import { getJobs, getPillars, getPosts, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/** Static routes, pillars, services, active jobs and published posts. /thank-you and /styleguide are excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/services", "/careers", "/insights", "/contact", "/privacy", "/terms"];
  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p) })),
    ...getPillars().map((p) => ({ url: absoluteUrl("/services/" + p.slug) })),
    ...getServices().map((s) => ({ url: absoluteUrl("/services/" + s.pillar + "/" + s.slug) })),
    ...getJobs({ activeOnly: true }).map((j) => ({
      url: absoluteUrl("/careers/" + j.slug),
      lastModified: j.posted,
    })),
    ...getPosts().map((p) => ({ url: absoluteUrl("/insights/" + p.slug), lastModified: p.date })),
  ];
}
