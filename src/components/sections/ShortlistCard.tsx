import { CheckIcon } from "lucide-react";
import { cn } from "cn";
import { Text } from "@/components/Text";
import type { HomePage } from "@/lib/schemas";

const AVATAR_TONES = ["bg-navy text-white", "bg-blue text-white", "bg-gold text-navy"] as const;

/**
 * The hero's human detail: a paper "shortlist" artefact. Overlaps the photo's bottom-left
 * corner on desktop, sits just under it on mobile.
 */
export function ShortlistCard({ card }: { card: HomePage["hero"]["shortlistCard"] }) {
  return (
    <div className="relative z-10 -mt-6 ml-4 w-[calc(100%-2rem)] max-w-[20rem] rounded-lg border border-line bg-paper p-5 shadow-card-hover lg:absolute lg:-bottom-12 lg:-left-12 lg:mt-0 lg:ml-0 lg:w-[19rem]">
      <p className="text-xs font-semibold tracking-[0.14em] text-accent-text uppercase">
        <Text>{card.eyebrow}</Text>
      </p>
      <p className="mt-2 font-display text-lg leading-snug text-navy">
        <Text>{card.role}</Text>
      </p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
        <ul className="flex -space-x-1" aria-label={`Candidates: ${card.initials.join(", ")}`}>
          {card.initials.map((initials, i) => (
            <li
              key={initials}
              aria-hidden="true"
              className={cn(
                "flex size-10 items-center justify-center rounded-full text-[0.6875rem] font-semibold tracking-wide ring-2 ring-paper",
                AVATAR_TONES[i % AVATAR_TONES.length],
              )}
            >
              {initials}
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-1.5 text-small text-ink-muted">
          <CheckIcon aria-hidden="true" className="size-4 text-navy" strokeWidth={1.5} />
          <Text>{card.note}</Text>
        </p>
      </div>
    </div>
  );
}
