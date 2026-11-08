import { cx } from "@/lib/cx";

/** Darkening washes that let text sit over a photograph. */
const variants = {
  card: "linear-gradient(180deg, var(--fade) 38%, var(--scrim-full) 100%)",
  cardViolet: "linear-gradient(180deg, var(--fade) 38%, var(--scrim-violet) 100%)",
  image: "linear-gradient(180deg, var(--scrim-faint) 30%, var(--scrim-deep) 100%)",
  side: "linear-gradient(90deg, var(--scrim-full) 0%, var(--scrim-soft) 70%)",
} as const;

type Props = {
  variant: keyof typeof variants;
  className?: string;
};

export default function Scrim({ variant, className }: Props) {
  return (
    <div
      aria-hidden
      className={cx("absolute inset-0", className)}
      style={{ background: variants[variant] }}
    />
  );
}
