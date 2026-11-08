import Image from "next/image";

type Props = {
  src: string;
  position: string;
  name: string;
  note: string;
  trailing: string;
};

/** One compact order line: thumbnail, name, note, amount. */
export default function CartLine({ src, position, name, note, trailing }: Props) {
  return (
    <div className="flex items-center gap-3.5">
      <Image
        src={src}
        alt=""
        width={56}
        height={72}
        style={{ objectPosition: position }}
        className="h-[72px] w-14 flex-none rounded-[10px] bg-surface-inset object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-small font-medium leading-snug">{name}</span>
        <span className="text-meta text-content-body">{note}</span>
      </div>
      <span className="flex-none text-small">{trailing}</span>
    </div>
  );
}
