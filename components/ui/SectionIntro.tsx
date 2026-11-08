import { cx } from "@/lib/cx";
import Display from "./Display";
import Eyebrow from "./Eyebrow";
import Lede from "./Lede";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  size?: "xl" | "lg" | "md" | "sm";
  align?: "start" | "center";
  className?: string;
};

/** Eyebrow, then the section heading, then its lede — in that order, always. */
export default function SectionIntro({
  eyebrow,
  title,
  lede,
  size = "md",
  align = "start",
  className,
}: Props) {
  return (
    <div
      className={cx(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Display level={2} size={size}>
        {title}
      </Display>
      {lede && <Lede size="body">{lede}</Lede>}
    </div>
  );
}
