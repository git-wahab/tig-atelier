import { cx } from "@/lib/cx";

type Props = {
  as?: "div" | "aside" | "form";
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export default function Panel({ as: Tag = "div", className, children, ...rest }: Props) {
  return (
    <Tag className={cx("panel", className)} {...rest}>
      {children}
    </Tag>
  );
}
