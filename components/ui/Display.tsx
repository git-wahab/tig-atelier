import { cx } from "@/lib/cx";

const steps = {
  hero: "text-display-hero",
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
  xs: "text-display-xs",
} as const;

type Props = {
  /** Always given: the family writes one h1 per page and an h2 per section. */
  level: 1 | 2 | 3;
  size: keyof typeof steps;
  className?: string;
  children: React.ReactNode;
};

export default function Display({ level, size, className, children }: Props) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return <Tag className={cx("display", steps[size], className)}>{children}</Tag>;
}
