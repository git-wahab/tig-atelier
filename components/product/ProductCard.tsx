import Image from "next/image";
import Link from "next/link";
import Display from "@/components/ui/Display";
import Eyebrow from "@/components/ui/Eyebrow";
import Scrim from "@/components/ui/Scrim";
import { cx } from "@/lib/cx";
import { money, priceOf } from "@/lib/config";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  /** "tile" sits in the collection grid; "banner" spans the page on its own. */
  variant?: "tile" | "banner";
};

export default function ProductCard({ product: p, variant = "tile" }: Props) {
  const tile = variant === "tile";

  return (
    <Link
      href={`/products/${p.slug}`}
      className={cx(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-[28px] text-content-primary",
        tile ? "min-h-[620px] p-7 md:min-h-[760px] md:p-10" : "min-h-[520px] p-9",
      )}
    >
      <div className="absolute inset-0 -z-20 bg-surface-inset transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]">
        <Image
          src={p.hoodie.src}
          alt={`${p.name} hoodie`}
          fill
          sizes={tile ? "(max-width: 900px) 100vw, 50vw" : "100vw"}
          style={{ objectPosition: p.hoodiePosition }}
          className="object-cover"
        />
      </div>
      <Scrim
        variant={tile ? (p.accent === "lavender" ? "cardViolet" : "card") : "side"}
        className="-z-10"
      />

      <Eyebrow className="mb-3 text-content-primary">{p.number}</Eyebrow>
      <Display level={3} size="md" className="mb-3">
        {p.name}
      </Display>
      <p
        className={cx(
          "max-w-[380px] text-small text-content-secondary",
          tile ? "mb-6" : "mb-5",
        )}
      >
        {tile ? p.cardBlurb : p.tagline}
      </p>

      {tile ? (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2.5 text-sm font-medium">
            View the design
            <i className="inline-block h-px w-9 bg-content-primary transition-all duration-500 group-hover:w-16" />
          </span>
          <span className="text-small">{money(priceOf(p.slug))}</span>
        </div>
      ) : (
        <span className="text-sm font-medium">View the design →</span>
      )}
    </Link>
  );
}
