import { cx } from "@/lib/cx";

const sizes = {
  lede: "text-lede",
  body: "text-body",
  small: "text-small",
} as const;

type Props = {
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

export default function Lede({ size = "lede", className, children }: Props) {
  return <p className={cx(sizes[size], "text-content-body", className)}>{children}</p>;
}
