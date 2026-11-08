import { cx } from "@/lib/cx";
import { accentVar, type AccentToken } from "@/lib/tokens";

type Props = {
  /** Scopes --accent for everything inside, so no child writes a colour. */
  accent?: AccentToken;
  fillViewport?: boolean;
  children: React.ReactNode;
};

export default function PageShell({ accent, fillViewport = false, children }: Props) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-[1440px] overflow-x-clip",
        fillViewport && "min-h-screen",
      )}
      style={accent ? ({ "--accent": accentVar[accent] } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
