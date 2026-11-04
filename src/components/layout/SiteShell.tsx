import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getNav } from "@/config/nav";

/** Header + <main id="main"> + Footer. Used by the (site) layout and the 404 page. */
export function SiteShell({ children, footerCta = false }: { children: ReactNode; footerCta?: boolean }) {
  return (
    <>
      <Header nav={getNav()} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer withCta={footerCta} />
    </>
  );
}
