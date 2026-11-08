"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import Eyebrow from "@/components/ui/Eyebrow";
import SpecRows from "@/components/ui/SpecRows";
import { cx } from "@/lib/cx";
import { useCart } from "@/lib/cart";
import { money, priceOf, sizes } from "@/lib/config";
import type { Product } from "@/lib/products";

const specRows = (p: Product) => [
  { heading: "Embroidery", text: "Both sleeves, shoulder to cuff." },
  { heading: "Colour", text: p.threadNote },
  { heading: "Fabric", text: "[FABRIC DETAILS]" },
  { heading: "Fit", text: "[FIT DETAILS]" },
  { heading: "Care", text: "[CARE INSTRUCTIONS]" },
  { heading: "Shipping", text: "[SHIPPING AND RETURNS]" },
];

export default function ProductBuyPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  return (
    <div className="flex min-w-0 flex-1 basis-[400px] flex-col gap-8 pt-4">
      <div className="flex flex-col gap-3.5">
        <Eyebrow>
          {product.number} · {product.colour}
        </Eyebrow>
        <Display level={2} size="md">
          {product.name}
        </Display>
        <span className="display text-display-xs">{money(priceOf(product.slug))}</span>
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Size</span>
          <span className="text-content-body">Selected: {size}</span>
        </div>
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Size">
          {sizes.map((s) => {
            const on = s === size;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setSize(s);
                  setAdded(false);
                }}
                className={cx(
                  "h-12 min-w-14 rounded-xl border px-3.5 text-sm font-medium transition-colors",
                  on
                    ? "border-[var(--accent)] bg-[var(--accent)] text-surface-base"
                    : "border-line-soft bg-transparent text-content-primary hover:border-content-primary",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <Button
        size="tall"
        className="w-full"
        onClick={() => {
          add(product.slug, size);
          setAdded(true);
        }}
      >
        {added ? `Added to bag (${size})` : "Add to bag"}
      </Button>
      {added && (
        <Link href="/cart" className="navlink self-center font-medium">
          View cart and checkout →
        </Link>
      )}

      <SpecRows rows={specRows(product)} />
    </div>
  );
}
