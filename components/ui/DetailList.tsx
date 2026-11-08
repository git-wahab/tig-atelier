import { cx } from "@/lib/cx";
import Meta from "./Meta";

type Props = {
  items: { label: string; value: string }[];
  className?: string;
};

export default function DetailList({ items, className }: Props) {
  return (
    <dl className={cx("m-0 flex flex-col border-t border-line-hairline", className)}>
      {items.map((i) => (
        <div key={i.label} className="flex flex-col gap-1.5 border-b border-line-hairline py-5">
          <dt>
            <Meta caps>{i.label}</Meta>
          </dt>
          <dd className="m-0 text-lede">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
