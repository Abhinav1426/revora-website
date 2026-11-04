import Link from "next/link";
import Image from "next/image";
import { cn } from "cn";

type LogoProps = {
  variant?: "horizontal";
  /** navy for light backgrounds, reversed for navy and blue. */
  tone?: "navy" | "reversed";
  priority?: boolean;
  className?: string;
};

/** Horizontal lockup, 30px tall on mobile and 36px from md up, linked to home. */
export function Logo({ variant = "horizontal", tone = "navy", priority = false, className }: LogoProps) {
  void variant;
  const src =
    tone === "navy"
      ? "/brand/revora-lockup-horizontal.png"
      : "/brand/revora-lockup-horizontal-reversed.png";
  return (
    <Link
      href="/"
      aria-label="Revora Solutions home"
      className={cn("inline-flex shrink-0 items-center rounded-sm", className)}
    >
      <Image
        src={src}
        alt="Revora Solutions"
        width={1188}
        height={300}
        priority={priority}
        sizes="143px"
        className="h-[30px] w-auto md:h-9"
      />
    </Link>
  );
}
