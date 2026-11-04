"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/brand/Logo";
import { Button, ButtonArrow } from "@/components/ui/button";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import type { SiteNav } from "@/config/nav";

/** Routes whose first screen is a hero the header should sit on, transparent until scrolled. */
const TRANSPARENT_ROUTES = ["/"];

type HeaderProps = {
  nav: SiteNav;
  /** Force the transparent-until-scrolled state on or off. Defaults to true on the home page only. */
  transparent?: boolean;
};

export function Header({ nav, transparent }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const overHero = transparent ?? TRANSPARENT_ROUTES.includes(pathname);
  const solid = scrolled || !overHero;

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "sticky top-0 z-40 h-16 border-b transition-colors duration-200 md:h-[72px]",
        solid ? "bg-white" : "border-transparent bg-transparent",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-pill bg-navy px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <Container className="flex h-full items-center justify-between gap-6">
        <Logo priority />
        <nav aria-label="Primary" className="hidden lg:block">
          <MegaMenu nav={nav} pathname={pathname} />
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild className="hidden lg:inline-flex">
            <Link href={nav.hire.href}>
              {nav.hire.label}
              <ButtonArrow />
            </Link>
          </Button>
          <MobileNav nav={nav} />
        </div>
      </Container>
    </header>
  );
}
