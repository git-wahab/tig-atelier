import { cx } from "@/lib/cx";

type Props = {
  caps?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Meta({ caps = false, className, children }: Props) {
  return (
    <span
      className={cx(
        "text-meta text-content-faint",
        caps && "uppercase tracking-eyebrow",
        className,
      )}
    >
      {children}
    </span>
  );
}
