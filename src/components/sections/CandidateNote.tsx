import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/Text";
import { ButtonArrow } from "@/components/ui/button";
import { getPage } from "@/lib/content";

/** One-line strip on staffing pages pointing job seekers to open roles. Copy from shared.md. */
export function CandidateNote({ bg = "white" }: { bg?: "white" | "paper" }) {
  const note = getPage("shared").candidateNote;
  return (
    <Section bg={bg} aria-label="For job seekers" className="border-t border-line py-8 md:py-10">
      <p className="flex max-w-none flex-wrap items-center gap-x-5 gap-y-1 text-body">
        <span>
          <Text>{note.text}</Text>
        </span>
        <Link
          href={note.link.href}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-fg underline decoration-1 underline-offset-[6px] hover:decoration-2"
        >
          <Text>{note.link.label}</Text>
          <ButtonArrow className="size-4 text-accent-text" />
        </Link>
      </p>
    </Section>
  );
}
