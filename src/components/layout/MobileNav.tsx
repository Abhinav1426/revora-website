"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, PhoneIcon, MailIcon, MessageCircleIcon, XIcon } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/config/site";
import { stripPlaceholders } from "@/lib/placeholders";
import type { SiteNav } from "@/config/nav";

const bigLink =
  "flex min-h-12 items-center py-2 font-display text-[1.75rem] leading-tight tracking-[-0.01em] text-fg hover:text-accent-text";
const contactLink =
  "inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-fg hover:text-accent-text [&_svg]:size-4 [&_svg]:text-accent-text";

/** Mobile navigation: Sheet from the right, navy, Services accordion grouped by pillar. */
export function MobileNav({ nav }: { nav: SiteNav }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close on route change (adjusting state during render, not in an effect).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const whatsappDigits = site.whatsapp ? stripPlaceholders(site.whatsapp).replace(/\D/g, "") : "";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <MenuIcon aria-hidden="true" />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        data-tone="dark"
        aria-describedby={undefined}
        className="gap-0 border-0 bg-navy p-0 text-white data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetTitle className="sr-only text-white">Menu</SheetTitle>
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <Logo tone="reversed" />
          <SheetClose asChild>
            <Button variant="outline">
              <XIcon aria-hidden="true" />
              Close
            </Button>
          </SheetClose>
        </div>

        <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
          <Accordion type="single" collapsible className="border-t-0">
            <AccordionItem value="services" className="border-b-0">
              <AccordionTrigger className="min-h-12 items-center py-2 text-[1.75rem] leading-tight md:text-[1.75rem]">
                Services
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <ul className="flex flex-col gap-6 pt-2">
                  {nav.pillars.map((pillar) => (
                    <li key={pillar.slug}>
                      <SheetClose asChild>
                        <Link
                          href={pillar.href}
                          className="inline-flex min-h-11 items-center text-xs font-semibold tracking-[0.14em] text-accent-text uppercase"
                        >
                          {pillar.title}
                        </Link>
                      </SheetClose>
                      <ul>
                        {pillar.services.map((service) => (
                          <li key={service.href}>
                            <SheetClose asChild>
                              <Link href={service.href} className="flex min-h-11 flex-col justify-center py-1.5">
                                <span className="text-base font-semibold text-fg">{service.title}</span>
                                <span className="text-sm leading-snug text-fg-muted">
                                  <Text>{service.summary}</Text>
                                </span>
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ul>
            {nav.links.map((link) => (
              <li key={link.href}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}
                    className={bigLink}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-rule px-5 pt-5 pb-6">
          <div className="flex gap-3">
            <SheetClose asChild>
              <Button asChild variant="primary-on-dark" className="flex-1">
                <Link href={nav.hire.href}>{nav.hire.label}</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild variant="outline" className="flex-1">
                <Link href={nav.jobs.href}>{nav.jobs.label}</Link>
              </Button>
            </SheetClose>
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-5">
            <li>
              <a href={`tel:${stripPlaceholders(site.phone.tel)}`} className={contactLink}>
                <PhoneIcon aria-hidden="true" />
                <Text>{site.phone.display}</Text>
              </a>
            </li>
            <li>
              <a href={`mailto:${stripPlaceholders(site.email.general)}`} className={contactLink}>
                <MailIcon aria-hidden="true" />
                <Text>{site.email.general}</Text>
              </a>
            </li>
            {whatsappDigits ? (
              <li>
                <a href={`https://wa.me/${whatsappDigits}`} className={contactLink}>
                  <MessageCircleIcon aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
