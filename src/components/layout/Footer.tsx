import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Logo } from "@/components/brand/Logo";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { SocialIcon, type SocialName } from "@/components/layout/SocialIcon";
import { getNav } from "@/config/nav";
import { site } from "@/config/site";
import { getPage } from "@/lib/content";
import { stripPlaceholders } from "@/lib/placeholders";

const linkClass =
  "inline-flex min-h-11 items-center text-[0.9375rem] text-fg-muted transition-colors hover:text-fg hover:underline underline-offset-4";
const headingClass = "font-sans text-xs font-semibold tracking-[0.14em] text-accent-text uppercase";

const SOCIAL_LABELS: Record<SocialName, string> = { linkedin: "LinkedIn", instagram: "Instagram", x: "X" };

/**
 * Navy footer: optional CTA band, four columns, bottom bar. Pages normally render their own
 * enquiry CtaBand, so the layout passes withCta={false}; the 404 page keeps the footer band.
 */
export function Footer({ withCta = true }: { withCta?: boolean }) {
  const nav = getNav();
  const { footer } = getPage("shared");
  const year = new Date().getFullYear();
  const socials = (Object.keys(SOCIAL_LABELS) as SocialName[]).filter((k) => site.socials[k]);
  const whatsappDigits = site.whatsapp ? stripPlaceholders(site.whatsapp).replace(/\D/g, "") : "";
  const [staffing, technology, payroll] = nav.pillars;

  return (
    <footer data-tone="dark" className="bg-navy text-white">
      {withCta ? (
        <Section bg="blue" spacing="sm" aria-labelledby="footer-cta">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="footer-cta" className="text-h2">
                <Text>{footer.ctaBand.title}</Text>
              </h2>
              <p className="mt-4 text-body-l text-fg-muted">
                <Text>{footer.ctaBand.text}</Text>
              </p>
            </div>
            <Button asChild variant="primary-on-dark" size="lg" className="shrink-0 self-start md:self-auto">
              <Link href={footer.ctaBand.cta.href}>
                <Text>{footer.ctaBand.cta.label}</Text>
                <ButtonArrow />
              </Link>
            </Button>
          </div>
        </Section>
      ) : null}

      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
        <div>
          <Logo tone="reversed" />
          <p className="mt-5 font-display text-xl text-fg">{site.tagline}</p>
          <p className="mt-3 max-w-[40ch] text-[0.9375rem] text-fg-muted">
            <Text>{footer.blurb}</Text>
          </p>
          {socials.length > 0 ? (
            <ul className="mt-5 flex gap-1">
              {socials.map((key) => (
                <li key={key}>
                  <a
                    href={stripPlaceholders(site.socials[key])}
                    aria-label={`${site.name} on ${SOCIAL_LABELS[key]}`}
                    className="inline-flex size-11 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-gold"
                  >
                    <SocialIcon name={key} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav aria-label="Talent and staffing services">
          <h2 className={headingClass}>
            <Link href={staffing.href} className="inline-flex min-h-11 items-center hover:underline">
              {staffing.title}
            </Link>
          </h2>
          <ul className="mt-1">
            {staffing.services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className={linkClass}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Technology and payroll services" className="flex flex-col gap-6">
          {[technology, payroll].map((pillar) => (
            <div key={pillar.slug}>
              <h2 className={headingClass}>
                <Link href={pillar.href} className="inline-flex min-h-11 items-center hover:underline">
                  {pillar.title}
                </Link>
              </h2>
              <ul className="mt-1">
                {pillar.services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className={linkClass}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div>
          <nav aria-label="Company">
            <h2 className={headingClass}>
              <span className="inline-flex min-h-11 items-center">Company</span>
            </h2>
            <ul className="mt-1">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <address className="mt-6 text-[0.9375rem] leading-relaxed text-fg-muted not-italic">
            <p>
              <Text>{site.address.line1}</Text>
              <br />
              <Text>{site.address.line2}</Text>
              <br />
              <Text>{site.address.city}</Text>, <Text>{site.address.state}</Text> <Text>{site.address.pin}</Text>
            </p>
            <ul className="mt-2">
              <li>
                <a href={`tel:${stripPlaceholders(site.phone.tel)}`} className={linkClass}>
                  <Text>{site.phone.display}</Text>
                </a>
              </li>
              <li>
                <a href={`mailto:${stripPlaceholders(site.email.general)}`} className={linkClass}>
                  <Text>{site.email.general}</Text>
                </a>
              </li>
              {whatsappDigits ? (
                <li>
                  <a href={`https://wa.me/${whatsappDigits}`} className={linkClass}>
                    WhatsApp
                  </a>
                </li>
              ) : null}
            </ul>
          </address>
        </div>
      </Container>

      <div className="bg-navy-900">
        <Container className="flex flex-col gap-x-6 gap-y-1 py-4 text-small text-fg-muted sm:flex-row sm:flex-wrap sm:items-center">
          <p className="sm:mr-auto">
            &copy; {year} <Text>{site.legalName}</Text>
          </p>
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-fg hover:underline underline-offset-4">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-fg hover:underline underline-offset-4">
                Terms
              </Link>
            </li>
          </ul>
          <p>
            Made in <Text>{site.address.city}</Text>
          </p>
        </Container>
      </div>
    </footer>
  );
}
