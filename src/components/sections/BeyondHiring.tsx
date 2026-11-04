import Link from "next/link";
import { CpuIcon, WalletIcon, type LucideIcon } from "lucide-react";
import { GoldDot } from "@/components/brand/GoldDot";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import { ButtonArrow } from "@/components/ui/button";
import { getPage } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = { Cpu: CpuIcon, Wallet: WalletIcon };

/** "Need more than people?": L5 text, R7 two clickable pillar cards. */
export function BeyondHiring() {
  const { beyondHiring: b } = getPage("home");
  return (
    <Section bg="white" spacing="sm" aria-labelledby="beyond-hiring-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-5">
          <h2 id="beyond-hiring-title" className="text-h2">
            <Text>{b.title}</Text>
          </h2>
          <p className="mt-6 text-body-l text-fg-muted">
            <Text>{b.text}</Text>
          </p>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:col-span-7" itemClassName="flex">
          {b.panels.map((panel) => {
            const Icon = ICONS[panel.icon] ?? CpuIcon;
            return (
              <Link
                key={panel.title}
                href={panel.href}
                className="group flex w-full flex-col rounded-lg border border-line bg-white p-7 transition-shadow duration-200 hover:shadow-card-hover"
              >
                <Icon aria-hidden="true" className="size-6 text-navy" strokeWidth={1.5} />
                <h3 className="mt-6 text-h3">
                  <Text>{panel.title}</Text>
                </h3>
                <p className="mt-3 text-small text-fg-muted">
                  <Text>{panel.text}</Text>
                </p>
                <ul className="mt-6 flex-1 border-t border-line pt-4">
                  {panel.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 py-1.5 text-small">
                      <GoldDot size="6px" />
                      <Text>{item}</Text>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-small font-semibold text-navy">
                  <span className="underline decoration-1 underline-offset-[6px] group-hover:decoration-2">
                    Explore <Text>{panel.title}</Text>
                  </span>
                  <ButtonArrow className="size-4 text-accent-text transition-transform duration-150 group-hover:translate-x-[3px]" />
                </span>
              </Link>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
