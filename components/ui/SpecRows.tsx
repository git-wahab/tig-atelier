import { cx } from "@/lib/cx";

type Row = { heading: string; text: string };

type Props = {
  rows: Row[];
  className?: string;
};

/** A bordered run of heading-and-text rows, through the shared `.row` class. */
export default function SpecRows({ rows, className }: Props) {
  return (
    <div className={cx("flex flex-col border-t border-line-hairline", className)}>
      {rows.map((r) => (
        <div key={r.heading} className="row">
          <h3 className="m-0 basis-40 text-body font-medium">{r.heading}</h3>
          <p className="m-0 min-w-[200px] flex-1 text-small text-content-body">{r.text}</p>
        </div>
      ))}
    </div>
  );
}
