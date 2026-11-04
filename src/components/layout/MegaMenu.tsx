"use client";

import Link from "next/link";
import { cn } from "cn";
import { Container } from "@/components/layout/Container";
import { GoldDot } from "@/components/brand/GoldDot";
import { Text } from "@/components/Text";
import { ButtonArrow } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { SiteNav } from "@/config/nav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Gold dot under the active item (decorative; aria-current carries the meaning). */
function ActiveDot() {
  return <GoldDot size="5px" className="absolute bottom-0.5 left-1/2 -translate-x-1/2" />;
}

/**
 * Desktop primary nav. Services opens a full-width panel with one column per pillar.
 * Radix NavigationMenu gives hover + click open, Escape to close and arrow-key navigation.
 * Root and items are static so the panel anchors to the (sticky) header and spans the viewport.
 * Classes that must override shadcn's viewport=false defaults repeat the same variant prefix.
 */
export function MegaMenu({ nav, pathname }: { nav: SiteNav; pathname: string }) {
  const servicesActive = isActive(pathname, nav.servicesHref);
  return (
    <NavigationMenu viewport={false} className="static max-w-none">
      <NavigationMenuList>
        <NavigationMenuItem className="static">
          <NavigationMenuTrigger className="relative">
            Services
            {servicesActive ? <ActiveDot /> : null}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="fixed inset-x-0 w-full p-0 md:fixed group-data-[viewport=false]/navigation-menu:top-[72px] md:w-full group-data-[viewport=false]/navigation-menu:mt-0 group-data-[viewport=false]/navigation-menu:rounded-none group-data-[viewport=false]/navigation-menu:border-0 group-data-[viewport=false]/navigation-menu:border-b">
            <Container className="py-8">
              <ul className="-mx-3 grid grid-cols-3 gap-x-10">
                {nav.pillars.map((pillar) => (
                  <li key={pillar.slug}>
                    <NavigationMenuLink
                      asChild
                      className="text-xs font-semibold tracking-[0.14em] text-accent-text uppercase hover:bg-transparent hover:underline"
                    >
                      <Link href={pillar.href}>
                        {pillar.title}
                        <ButtonArrow />
                      </Link>
                    </NavigationMenuLink>
                    <ul className="mt-1">
                      {pillar.services.map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink
                            asChild
                            active={pathname === service.href}
                            className="flex-col items-start gap-0.5 py-2.5"
                          >
                            <Link href={service.href}>
                              <span className="font-semibold text-fg">{service.title}</span>
                              <span className="text-sm leading-snug text-ink-muted">
                                <Text>{service.summary}</Text>
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-line pt-4">
                <NavigationMenuLink asChild className="-mx-3 inline-flex w-auto font-semibold">
                  <Link href={nav.jobs.href}>
                    Looking for a job? See open roles
                    <ButtonArrow className="text-accent-text" />
                  </Link>
                </NavigationMenuLink>
              </div>
            </Container>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {nav.links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <NavigationMenuItem key={link.href} className="static">
              <NavigationMenuLink
                asChild
                active={active}
                className={cn(navigationMenuTriggerStyle(), "relative")}
              >
                <Link href={link.href} aria-current={active ? "page" : undefined}>
                  {link.label}
                  {active ? <ActiveDot /> : null}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
