"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import CartLine from "./CartLine";

export default function CartButton() {
  const { items, count } = useCart();
  /**
   * The panel opens for two independent reasons, kept apart so they cannot
   * cancel each other out: the pointer is over the cart, or a click or key
   * press has pinned it open. Driving both from one flag meant the pointer had
   * already opened the panel by the time a mouse click landed, so clicking the
   * cart dismissed what hovering had just revealed.
   */
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);
  const open = pinned || hovering;
  const root = useRef<HTMLDivElement>(null);

  // A pinned panel outlives the pointer, so give it the usual ways out.
  useEffect(() => {
    if (!pinned) return;
    const onPointerDown = (e: Event) => {
      if (!root.current?.contains(e.target as Node)) setPinned(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [pinned]);

  const lines = items.map((i) => ({ ...i, product: getProduct(i.slug) })).filter((l) => l.product);

  return (
    <div
      ref={root}
      className="relative inline-block"
      // Only a real mouse hovers. Touch fires emulated enter events that never
      // get a matching leave, which would hold the panel open and stop a second
      // tap from closing it.
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovering(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHovering(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setPinned(false);
      }}
      onBlur={(e) => {
        // Once focus leaves the cart entirely, nothing is holding the panel open.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPinned(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
        onClick={() => setPinned((p) => !p)}
        className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line-strong bg-surface-base/45 py-0 pl-5 pr-2.5 text-sm font-medium text-content-primary transition-colors hover:border-content-primary"
      >
        <span>Cart</span>
        <span
          className={cx(
            "inline-flex h-6 min-w-6 items-center justify-center rounded-xl px-[7px] text-xs font-semibold",
            count > 0
              ? "bg-[var(--accent)] text-surface-base"
              : "bg-line-soft text-content-primary",
          )}
        >
          {count}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-[60] pt-2.5">
          <div className="flex w-[340px] max-w-[calc(100vw-32px)] flex-col gap-4 rounded-[20px] border border-line-soft bg-surface-raised p-5 text-left shadow-[0_24px_60px_var(--scrim-deep)]">
            {lines.length === 0 && (
              <p className="text-small text-content-body">
                Your cart is empty. Add a hoodie and it will show up here.
              </p>
            )}
            {lines.map((l) => (
              <CartLine
                key={`${l.slug}-${l.size}`}
                src={l.product!.hoodie.src}
                position={l.product!.hoodiePosition}
                name={l.product!.name}
                note={`Size ${l.size}`}
                trailing={`× ${l.qty}`}
              />
            ))}
            <Button href="/cart" onClick={() => setPinned(false)} className="w-full">
              View cart and checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
