import { cx } from "@/lib/cx";

type Props = {
  /** `legend` where the eyebrow titles a fieldset, as the checkout form does. */
  as?: "span" | "div" | "legend";
  className?: string;
  children: React.ReactNode;
};

export default function Eyebrow({ as: Tag = "span", className, children }: Props) {
  return <Tag className={cx("eyebrow", className)}>{children}</Tag>;
}
