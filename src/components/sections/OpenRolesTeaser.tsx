import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getJobs } from "@/lib/content";

/** Careers inside the home page: active roles as a hairline list. Copy comes from job frontmatter only. */
export function OpenRolesTeaser() {
  const jobs = getJobs({ activeOnly: true }).slice(0, 4);
  if (jobs.length === 0) return null;

  return (
    <Section bg="paper" spacing="md" aria-labelledby="open-roles-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow dot className="mb-5">
            Careers
          </Eyebrow>
          <h2 id="open-roles-title" className="text-h2">
            Open roles
          </h2>
          <Button asChild variant="link-arrow" className="mt-6">
            <Link href="/careers">
              See all open roles
              <ButtonArrow />
            </Link>
          </Button>
        </Reveal>

        <Stagger as="ul" gap={0.08} className="border-b border-line lg:col-span-8" itemClassName="border-t border-line">
          {jobs.map((job) => (
            <div key={job.slug} className="group relative flex items-start justify-between gap-6 py-7 md:items-center">
              <div>
                <h3 className="text-h3">
                  <Link
                    href={`/careers/${job.slug}`}
                    className="underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-gold after:absolute after:inset-0"
                  >
                    <Text>{job.title}</Text>
                  </Link>
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {[job.location, job.type, job.experience].map((tag) => (
                    <li
                      key={tag}
                      className="rounded-pill border border-line bg-white px-3 py-1 text-small text-ink-muted"
                    >
                      <Text>{tag}</Text>
                    </li>
                  ))}
                </ul>
              </div>
              <ArrowUpRightIcon
                aria-hidden="true"
                strokeWidth={1.5}
                className="mt-1 size-6 shrink-0 text-navy transition-transform duration-150 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] md:mt-0"
              />
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
