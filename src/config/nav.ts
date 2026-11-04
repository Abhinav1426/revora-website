import "server-only";
import { getPillars, getServicesByPillar } from "@/lib/content";

/** Navigation derived from content (pillars -> services). Plain data, safe to pass to client components. */

export type NavService = { title: string; href: string; summary: string };
export type NavPillar = { slug: string; title: string; href: string; services: NavService[] };
export type NavLink = { label: string; href: string };
export type SiteNav = {
  servicesHref: string;
  pillars: NavPillar[];
  links: NavLink[];
  hire: NavLink;
  jobs: NavLink;
};

export function getNav(): SiteNav {
  return {
    servicesHref: "/services",
    pillars: getPillars().map((p) => ({
      slug: p.slug,
      title: p.title,
      href: `/services/${p.slug}`,
      services: getServicesByPillar(p.slug).map((s) => ({
        title: s.title,
        href: `/services/${p.slug}/${s.slug}`,
        summary: s.summary,
      })),
    })),
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
    hire: { label: "Hire talent", href: "/contact?enquiry=hire" },
    jobs: { label: "Find a job", href: "/careers" },
  };
}
