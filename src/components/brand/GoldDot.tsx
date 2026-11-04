import { cn } from "cn";

type GoldDotProps = {
  /** Any CSS length. Defaults to 0.5em so it scales with surrounding type. */
  size?: string;
  className?: string;
};

/** The dot borrowed from the logo. Decorative: bullet, headline full stop, current-page marker. */
export function GoldDot({ size = "0.5em", className }: GoldDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 rounded-full bg-gold", className)}
      style={{ width: size, height: size }}
    />
  );
}
