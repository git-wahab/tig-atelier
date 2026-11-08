import Link from "next/link";
import { cx } from "@/lib/cx";

type Props = {
  variant?: "fill" | "line";
  /** A route goes through next/link; a "#id" stays an anchor; neither is a button. */
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  size?: "default" | "tall";
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

export default function Button({
  variant = "fill",
  href,
  type = "button",
  onClick,
  disabled,
  size = "default",
  className,
  children,
  ...rest
}: Props) {
  const classes = cx(
    "btn",
    variant === "fill" ? "btn-fill" : "btn-line",
    size === "tall" && "min-h-14 text-small",
    className,
  );

  if (href?.startsWith("#")) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(classes, disabled && "disabled:opacity-60")}
      {...rest}
    >
      {children}
    </button>
  );
}
