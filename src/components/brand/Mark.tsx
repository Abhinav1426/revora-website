import Image from "next/image";
import { cn } from "cn";

type MarkProps = {
  tone?: "navy" | "reversed";
  /** Rendered height in px. Minimum 24 per brand rules. */
  size?: number;
  className?: string;
};

const RATIO = 868 / 763;

/** The R mark with the rising figure. Never animate or recolour. */
export function Mark({ tone = "navy", size = 32, className }: MarkProps) {
  return (
    <Image
      src={tone === "navy" ? "/brand/revora-mark.svg" : "/brand/revora-mark-reversed.svg"}
      alt="Revora Solutions"
      width={Math.round(size * RATIO)}
      height={size}
      unoptimized
      className={cn("w-auto shrink-0", className)}
      style={{ height: size }}
    />
  );
}
