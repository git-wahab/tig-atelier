import { cx } from "@/lib/cx";
import { glowVar, type GlowToken } from "@/lib/tokens";

type Props = {
  glow: GlowToken;
  /** Where the blob sits; it is positioned, not inset to the section box. */
  className: string;
  /** Drift the blob as the section scrolls past. */
  drift?: boolean;
};

export default function GlowSpot({ glow, className, drift = false }: Props) {
  return (
    <div
      aria-hidden
      className={cx("absolute z-0", drift && "glow", className)}
      style={{
        background: `radial-gradient(ellipse at center, ${glowVar[glow]} 0%, var(--fade) 65%)`,
      }}
    />
  );
}
