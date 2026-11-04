import { GoldDot } from "@/components/brand/GoldDot";
import { Container } from "@/components/layout/Container";
import { Marquee } from "@/components/motion/Marquee";
import { TickerPause } from "@/components/sections/TickerPause";
import { Text } from "@/components/Text";
import { getPage } from "@/lib/content";

/** Navy 72px band: gold label pinned left, slow marquee of roles. Static wrapped list under reduced motion. */
export function RoleTicker() {
  const { roleTicker } = getPage("home");
  return (
    <section data-tone="dark" data-ticker aria-label={roleTicker.label} className="bg-navy text-white">
      <Container className="flex min-h-[72px] items-center gap-5 py-2 md:gap-8">
        <p className="shrink-0 text-xs font-semibold tracking-[0.14em] text-accent-text uppercase sm:text-[0.8125rem]">
          <Text>{roleTicker.label}</Text>
        </p>
        <Marquee
          label={roleTicker.label}
          speed="slow"
          className="min-w-0 flex-1 motion-reduce:[mask-image:none] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          {roleTicker.roles.map((role) => (
            <li key={role} className="flex items-center whitespace-nowrap text-body font-medium motion-reduce:whitespace-normal">
              <span className="py-1">
                <Text>{role}</Text>
              </span>
              <GoldDot size="6px" className="mx-5" />
            </li>
          ))}
        </Marquee>
        <TickerPause />
      </Container>
    </section>
  );
}
