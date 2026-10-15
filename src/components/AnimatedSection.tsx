import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Content is visible in server-rendered HTML, even before JavaScript loads.
// Viewport reveals and staggered delays made scrolling on phones feel sluggish.
export function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  return <div className={className}>{children}</div>;
}
