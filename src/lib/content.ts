import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { z } from "zod";
import {
  Job,
  Legal,
  PAGE_SCHEMAS,
  PillarsFile,
  Post,
  Service,
  ServicesHub,
  type LegalName,
  type PageData,
  type PageName,
  type PillarData,
} from "./schemas";

/**
 * Build-time content loaders (fs + gray-matter + zod). Invalid content THROWS so the
 * build fails. Only import this from Server Components, route handlers and config.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

type Parsed<T> = { data: T; body: string };

function parseFile<S extends z.ZodType>(rel: string, schema: S): Parsed<z.infer<S>> {
  const file = path.join(CONTENT_DIR, rel);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid content in content/${rel}:\n${z.prettifyError(result.error)}`);
  }
  return { data: result.data, body: content.trim() };
}

function listFiles(dir: string, ext: RegExp): string[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, dir))
    .filter((f) => ext.test(f) && !f.startsWith("_"))
    .sort();
}

function assertSlugMatchesFile(rel: string, slug: string) {
  const base = path.basename(rel).replace(/\.(md|mdx)$/, "");
  if (base !== slug) {
    throw new Error(`content/${rel}: slug "${slug}" must match the file name "${base}"`);
  }
}

// ---------- pages ----------
export const getPage = cache(
  <N extends PageName>(name: N): PageData<N> =>
    parseFile(`pages/${name}.md`, PAGE_SCHEMAS[name]).data as PageData<N>,
);

// ---------- legal ----------
export const getLegal = cache((name: LegalName) => {
  const { data, body } = parseFile(`legal/${name}.md`, Legal);
  return { ...data, body };
});

// ---------- pillars and hub ----------
export const getPillars = cache((): PillarData[] => {
  const { data } = parseFile("services/_pillars.md", PillarsFile);
  return [...data.pillars].sort((a, b) => a.order - b.order);
});

export const getPillar = (slug: string): PillarData | undefined =>
  getPillars().find((p) => p.slug === slug);

export const getServicesHub = cache(() => parseFile("services/_hub.md", ServicesHub).data);

// ---------- services ----------
export type ServiceWithBody = Service & { body: string };

export const getServices = cache((): ServiceWithBody[] => {
  const services = listFiles("services", /\.md$/).map((f) => {
    const { data, body } = parseFile(`services/${f}`, Service);
    assertSlugMatchesFile(f, data.slug);
    return { ...data, body };
  });
  const slugs = new Set(services.map((s) => s.slug));
  for (const s of services) {
    for (const r of s.related) {
      if (!slugs.has(r)) {
        throw new Error(`content/services/${s.slug}.md: related "${r}" is not a service`);
      }
    }
  }
  const pillarOrder = new Map(getPillars().map((p) => [p.slug, p.order]));
  return services.sort(
    (a, b) =>
      (pillarOrder.get(a.pillar) ?? 0) - (pillarOrder.get(b.pillar) ?? 0) || a.order - b.order,
  );
});

export const getServicesByPillar = (pillar: string) =>
  getServices().filter((s) => s.pillar === pillar);

export const getService = (pillar: string, slug: string) =>
  getServices().find((s) => s.pillar === pillar && s.slug === slug);

// ---------- jobs ----------
export type JobWithBody = Job & { body: string };

const loadJobs = cache((): JobWithBody[] => {
  const jobs = listFiles("jobs", /\.md$/).map((f) => {
    const { data, body } = parseFile(`jobs/${f}`, Job);
    assertSlugMatchesFile(f, data.slug);
    return { ...data, body };
  });
  return jobs.sort((a, b) => b.posted.getTime() - a.posted.getTime());
});

export const getJobs = ({ activeOnly = false }: { activeOnly?: boolean } = {}): JobWithBody[] =>
  loadJobs().filter((j) => !activeOnly || j.active);

export const getJob = (slug: string) => loadJobs().find((j) => j.slug === slug);

// ---------- posts ----------
export type PostWithBody = Post & { body: string };

const loadPosts = cache((): PostWithBody[] => {
  const posts = listFiles("insights", /\.mdx?$/).map((f) => {
    const { data, body } = parseFile(`insights/${f}`, Post);
    assertSlugMatchesFile(f, data.slug);
    return { ...data, body };
  });
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
});

export const getPosts = ({ includeDrafts = false }: { includeDrafts?: boolean } = {}): PostWithBody[] =>
  loadPosts().filter((p) => includeDrafts || !p.draft);

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

/** Run every loader once so any invalid file fails the build, wherever it is used. */
export function validateAllContent() {
  for (const n of Object.keys(PAGE_SCHEMAS) as PageName[]) getPage(n);
  getLegal("privacy");
  getLegal("terms");
  getPillars();
  getServicesHub();
  getServices();
  loadJobs();
  loadPosts();
}
