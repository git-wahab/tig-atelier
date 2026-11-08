"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

export default function CartButton() {
  const { items, count } = useCart();
  const [open, setOpen] = useState(false);

  const lines = items
    .map((i) => ({ ...i, product: getProduct(i.slug) }))
    .filter((l) => l.product);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-bone/35 bg-ink/45 py-0 pl-5 pr-2.5 text-sm font-medium text-bone transition-colors hover:border-bone"
      >
        <span>Cart</span>
        <span
          className={`inline-flex h-6 min-w-6 items-center justify-center rounded-xl px-[7px] text-xs font-semibold ${
            count > 0 ? "bg-copper text-ink" : "bg-bone/15 text-bone"
          }`}
        >
          {count}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-[60] pt-2.5">
          <div className="flex w-[340px] max-w-[calc(100vw-32px)] flex-col gap-4 rounded-[20px] border border-white/15 bg-panel p-5 text-left shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
            {lines.length === 0 && (
              <p className="text-sm leading-relaxed text-mute">
                Your cart is empty. Add a hoodie and it will show up here.
              </p>
            )}
            {lines.map((l) => (
              <div key={`${l.slug}-${l.size}`} className="flex items-center gap-3.5">
                <Image
                  src={l.product!.hoodie.src}
                  alt=""
                  width={56}
                  height={72}
                  style={{ objectPosition: l.product!.hoodiePosition }}
                  className="h-[72px] w-14 flex-none rounded-[10px] bg-[#1A1C22] object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium leading-snug">{l.product!.name}</span>
                  <span className="text-xs text-mute">Size {l.size}</span>
                </div>
                <span className="flex-none text-[13px]">× {l.qty}</span>
              </div>
            ))}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex min-h-[46px] items-center justify-center rounded-full bg-bone text-sm font-medium text-ink"
            >
              View cart and checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
