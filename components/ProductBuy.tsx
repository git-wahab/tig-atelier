"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { money, priceOf, sizes } from "@/lib/config";
import type { Product } from "@/lib/products";

const specRows = (p: Product) => [
  { h: "Embroidery", t: "Both sleeves, shoulder to cuff." },
  { h: "Colour", t: p.threadNote },
  { h: "Fabric", t: "[FABRIC DETAILS]" },
  { h: "Fit", t: "[FIT DETAILS]" },
  { h: "Care", t: "[CARE INSTRUCTIONS]" },
  { h: "Shipping", t: "[SHIPPING AND RETURNS]" },
];

export default function ProductBuyPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  return (
    <div className="flex min-w-0 flex-1 basis-[400px] flex-col gap-8 pt-4">
      <div className="flex flex-col gap-3.5">
        <span className="eyebrow">
          {product.number} · {product.colour}
        </span>
        <h2 className="display text-[clamp(40px,4.6vw,64px)] leading-none">{product.name}</h2>
        <span className="text-[22px]">{money(priceOf(product.slug))}</span>
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Size</span>
          <span className="text-mute">Selected: {size}</span>
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
                className={`h-12 min-w-14 rounded-xl border px-3.5 text-sm font-medium transition-colors ${
                  on
                    ? "border-[var(--accent)] bg-accent text-ink"
                    : "border-bone/30 bg-transparent text-bone hover:border-bone"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-fill min-h-14 w-full text-[15px]"
        onClick={() => {
          add(product.slug, size);
          setAdded(true);
        }}
      >
        {added ? `Added to bag (${size})` : "Add to bag"}
      </button>
      {added && (
        <Link href="/cart" className="navlink self-center font-medium">
          View cart and checkout →
        </Link>
      )}

      <div className="flex flex-col border-t border-white/10">
        {specRows(product).map((r) => (
          <div key={r.h} className="row">
            <h3 className="m-0 basis-40 text-sm font-medium">{r.h}</h3>
            <p className="m-0 min-w-[200px] flex-1 text-[15px] leading-relaxed text-mute">{r.t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
