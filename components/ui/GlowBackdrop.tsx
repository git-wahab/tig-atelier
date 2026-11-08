import { cx } from "@/lib/cx";
import { glowVar, type GlowToken } from "@/lib/tokens";

export type GlowStop = {
  glow: GlowToken;
  /** Ellipse size, e.g. "60% 55%". */
  size: string;
  /** Ellipse centre, e.g. "68% 48%". */
  at: string;
  fade?: string;
};

type Props = {
  stops: GlowStop[];
  /** Lay the page surface under the glows; off where a section is already tinted. */
  base?: boolean;
  className?: string;
};

export default function GlowBackdrop({ stops, base = true, className }: Props) {
  const layers = stops.map(
    (s) =>
      `radial-gradient(ellipse ${s.size} at ${s.at}, ${glowVar[s.glow]} 0%, var(--fade) ${
        s.fade ?? "70%"
      })`,
  );
  if (base) layers.push("var(--surface)");

  return (
    <div
      aria-hidden
      className={cx("absolute inset-0 z-0", className)}
      style={{ background: layers.join(", ") }}
    />
  );
}
