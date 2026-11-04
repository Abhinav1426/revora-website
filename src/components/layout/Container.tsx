import type { ComponentProps, ElementType } from "react";
import { cn } from "cn";

type ContainerProps = ComponentProps<"div"> & { as?: ElementType };

/** Max 1280px, 20px side padding on mobile, 24px from md. */
export function Container({ as: Tag = "div", className, ...props }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-[1280px] px-5 md:px-6", className)} {...props} />;
}
