import { cx } from "@/lib/cx";

type Props = {
  id: string;
  label: string;
  /** Flex basis for the row the field sits in. */
  className?: string;
  children: React.ReactNode;
};

/** Label tied to its control by htmlFor, the way every field in the project is written. */
export default function Field({ id, label, className, children }: Props) {
  return (
    <div className={cx("flex min-w-0 flex-col gap-2", className)}>
      <label className="lbl" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}
