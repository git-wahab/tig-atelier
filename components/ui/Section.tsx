import { cx } from "@/lib/cx";
import { accentVar, type AccentToken } from "@/lib/tokens";

/** The project's vertical rhythm, one named step per role a section plays. */
const rhythms = {
  hero: "pt-36 pb-20",
  head: "pt-10 pb-6",
  body: "pt-6 pb-40",
  flow: "pt-10 pb-40",
  band: "pt-32 pb-40",
  statement: "py-48",
  none: "",
} as const;

type Props = {
  id?: string;
  rhythm?: keyof typeof rhythms;
  /** Scopes --accent for this section only, in place of a colour override. */
  accent?: AccentToken;
  /** Hold absolutely-positioned glows and scrims inside the section box. */
  clip?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Section({
  id,
  rhythm = "flow",
  accent,
  clip = false,
  className,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={cx("gutter", rhythms[rhythm], clip && "relative overflow-hidden", className)}
      style={accent ? ({ "--accent": accentVar[accent] } as React.CSSProperties) : undefined}
    >
      {children}
    </section>
  );
}
