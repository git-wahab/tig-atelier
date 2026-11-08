"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import CartLine from "@/components/cart/CartLine";
import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import Eyebrow from "@/components/ui/Eyebrow";
import Field from "@/components/ui/Field";
import Lede from "@/components/ui/Lede";
import Meta from "@/components/ui/Meta";
import Panel from "@/components/ui/Panel";
import Section from "@/components/ui/Section";
import { cx } from "@/lib/cx";
import { useCart } from "@/lib/cart";
import { money, priceOf } from "@/lib/config";
import { getProduct, products } from "@/lib/products";
import type { AccentToken } from "@/lib/tokens";

type Step = "cart" | "checkout" | "done";

type Line = {
  slug: string;
  size: string;
  qty: number;
  name: string;
  colour: string;
  src: string;
  position: string;
  unit: number;
  total: number;
};

const steps: { id: Step; label: string }[] = [
  { id: "cart", label: "Bag" },
  { id: "checkout", label: "Delivery" },
  { id: "done", label: "Done" },
];

const titles: Record<Step, { lead: string; accented: string; accent: AccentToken }> = {
  cart: { lead: "Your", accented: "bag.", accent: "copper" },
  checkout: { lead: "Delivery", accented: "details.", accent: "lavender" },
  done: { lead: "Order", accented: "placed.", accent: "copper" },
};

const summaryPanel = "stage flex min-w-0 max-w-[480px] flex-[1_1_340px] flex-col gap-5";
const totalRow = "flex justify-between gap-4 text-lede font-medium";

export default function CartView() {
  const { items, ready, setQty, remove, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [placed, setPlaced] = useState<{ lines: Line[]; total: number } | null>(null);

  const lines: Line[] = useMemo(
    () =>
      items.flatMap((i) => {
        const p = getProduct(i.slug);
        if (!p) return [];
        const unit = priceOf(i.slug);
        return [
          {
            slug: i.slug,
            size: i.size,
            qty: i.qty,
            name: p.name,
            colour: p.colour,
            src: p.hoodie.src,
            position: p.hoodiePosition,
            unit,
            total: unit * i.qty,
          },
        ];
      }),
    [items],
  );
  const subtotal = lines.reduce((n, l) => n + l.total, 0);

  function placeOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send the order and delivery details to your backend or store platform,
    // and take payment through your payment provider before showing this screen.
    setPlaced({ lines, total: subtotal });
    clear();
    setStep("done");
    window.scrollTo({ top: 0 });
  }

  if (!ready) return <div className="min-h-[600px]" aria-hidden />;

  const title = titles[step];

  return (
    <>
      <Section rhythm="head" accent={title.accent} className="flex flex-col gap-7">
        <ol aria-label="Checkout steps" className="flex flex-wrap gap-x-7 gap-y-3">
          {steps.map((s) => (
            <li
              key={s.id}
              aria-current={step === s.id ? "step" : undefined}
              className={cx(
                "border-b-2 pb-2 text-meta uppercase tracking-eyebrow",
                step === s.id
                  ? "border-[var(--accent)] font-semibold text-content-primary"
                  : "border-transparent font-medium text-content-faint",
              )}
            >
              {s.label}
            </li>
          ))}
        </ol>
        <Display level={1} size="xl">
          {title.lead} <em className="italic text-accent">{title.accented}</em>
        </Display>
      </Section>

      {step === "cart" && (
        <Section rhythm="body" accent="copper">
          {lines.length === 0 ? (
            <Panel className="flex max-w-[640px] flex-col items-start gap-5">
              <Display level={2} size="sm">
                Nothing here yet.
              </Display>
              <Lede size="body">
                Pick a design and choose your size. Whatever you add shows up here and in the cart
                button at the top of every page.
              </Lede>
              <div className="flex flex-wrap gap-3.5">
                {products.map((p, i) => (
                  <Button key={p.slug} href={`/products/${p.slug}`} variant={i === 0 ? "fill" : "line"}>
                    {p.name}
                  </Button>
                ))}
              </div>
            </Panel>
          ) : (
            <div className="flex flex-wrap items-start gap-14">
              <div className="flex min-w-0 flex-[2_1_520px] flex-col border-t border-line-hairline">
                {lines.map((l) => (
                  <div
                    key={`${l.slug}-${l.size}`}
                    className="flex flex-wrap items-center gap-x-7 gap-y-5 border-b border-line-hairline py-7"
                  >
                    <Image
                      src={l.src}
                      alt={l.name}
                      width={120}
                      height={154}
                      style={{ objectPosition: l.position }}
                      className="h-[154px] w-[120px] flex-none rounded-2xl bg-surface-inset object-cover"
                    />
                    <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2">
                      <Display level={2} size="xs">
                        {l.name}
                      </Display>
                      <span className="text-small text-content-body">
                        {l.colour} · Size {l.size}
                      </span>
                      <span className="text-small text-content-secondary">
                        {money(l.unit)} each
                      </span>
                      <div>
                        <button
                          type="button"
                          onClick={() => remove(l.slug, l.size)}
                          className="text-meta text-content-body underline underline-offset-[3px] transition-colors hover:text-[var(--accent)]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="inline-flex h-11 items-center rounded-full border border-line-soft">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(l.slug, l.size, l.qty - 1)}
                        className="h-11 w-11 rounded-full text-lg transition-colors hover:text-[var(--accent)]"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-small font-medium">{l.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(l.slug, l.size, l.qty + 1)}
                        className="h-11 w-11 rounded-full text-lg transition-colors hover:text-[var(--accent)]"
                      >
                        +
                      </button>
                    </div>
                    <span className="w-[100px] flex-none text-right text-lede font-medium">
                      {money(l.total)}
                    </span>
                  </div>
                ))}
              </div>

              <Panel as="aside" className={summaryPanel}>
                <Display level={2} size="xs">
                  Summary
                </Display>
                <div className="flex flex-col gap-3.5 text-small">
                  <div className="flex justify-between gap-4">
                    <span className="text-content-body">Items</span>
                    <span>{lines.reduce((n, l) => n + l.qty, 0)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-content-body">Subtotal</span>
                    <span>{money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-content-body">Shipping</span>
                    <span>[SHIPPING COST]</span>
                  </div>
                </div>
                <div className={cx(totalRow, "border-t border-line-hairline pt-5")}>
                  <span>Total</span>
                  <span>{money(subtotal)}</span>
                </div>
                <Button
                  size="tall"
                  onClick={() => {
                    setStep("checkout");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Continue to delivery
                </Button>
                <Link href="/" className="navlink text-center">
                  Keep browsing
                </Link>
                <Meta className="leading-relaxed">
                  Prices shown are sample values. Set yours in lib/config.ts.
                </Meta>
              </Panel>
            </div>
          )}
        </Section>
      )}

      {step === "checkout" && (
        <Section rhythm="body" accent="lavender">
          <div className="flex flex-wrap items-start gap-14">
            <Panel
              as="form"
              onSubmit={placeOrder}
              className="flex min-w-0 flex-[2_1_520px] flex-col gap-7"
            >
              <fieldset className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0">
                <Eyebrow as="legend" className="mb-5">
                  Contact
                </Eyebrow>
                <Field id="c-email" label="Email">
                  <input
                    className="field"
                    id="c-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </Field>
              </fieldset>

              <fieldset className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0">
                <Eyebrow as="legend" className="mb-5">
                  Delivery address
                </Eyebrow>
                <div className="flex flex-wrap gap-5">
                  <Field id="c-first" label="First name" className="flex-[1_1_200px]">
                    <input
                      className="field"
                      id="c-first"
                      type="text"
                      required
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field id="c-last" label="Last name" className="flex-[1_1_200px]">
                    <input
                      className="field"
                      id="c-last"
                      type="text"
                      required
                      autoComplete="family-name"
                    />
                  </Field>
                </div>
                <Field id="c-addr" label="Address">
                  <input
                    className="field"
                    id="c-addr"
                    type="text"
                    required
                    autoComplete="street-address"
                  />
                </Field>
                <div className="flex flex-wrap gap-5">
                  <Field id="c-city" label="City" className="flex-[1_1_200px]">
                    <input
                      className="field"
                      id="c-city"
                      type="text"
                      required
                      autoComplete="address-level2"
                    />
                  </Field>
                  <Field id="c-zip" label="Postal code" className="flex-[1_1_140px]">
                    <input className="field" id="c-zip" type="text" autoComplete="postal-code" />
                  </Field>
                  <Field id="c-phone" label="Phone" className="flex-[1_1_200px]">
                    <input className="field" id="c-phone" type="tel" required autoComplete="tel" />
                  </Field>
                </div>
              </fieldset>

              <div className="flex flex-col gap-3.5">
                <Eyebrow>Payment</Eyebrow>
                <div className="flex min-h-[110px] items-center justify-center rounded-2xl border border-dashed border-line-strong p-5 text-center text-meta uppercase leading-[1.8] tracking-eyebrow text-content-body">
                  [Payment methods and card fields
                  <br />
                  from your payment provider]
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <Button type="submit" size="tall" className="flex-[1_1_240px]">
                  Place order · {money(subtotal)}
                </Button>
                <Button variant="line" size="tall" onClick={() => setStep("cart")}>
                  Back to bag
                </Button>
              </div>
            </Panel>

            <Panel as="aside" className={summaryPanel}>
              <Display level={2} size="xs">
                In your order
              </Display>
              {lines.map((l) => (
                <CartLine
                  key={`${l.slug}-${l.size}`}
                  src={l.src}
                  position={l.position}
                  name={l.name}
                  note={`Size ${l.size} · × ${l.qty}`}
                  trailing={money(l.total)}
                />
              ))}
              <div className="flex justify-between gap-4 border-t border-line-hairline pt-5 text-small">
                <span className="text-content-body">Shipping</span>
                <span>[SHIPPING COST]</span>
              </div>
              <div className={totalRow}>
                <span>Total</span>
                <span>{money(subtotal)}</span>
              </div>
            </Panel>
          </div>
        </Section>
      )}

      {step === "done" && placed && (
        <Section rhythm="body" accent="copper">
          <Panel className="flex max-w-[760px] flex-col gap-6">
            <Lede>
              Thank you. A confirmation goes to the email you entered. Order number: [ORDER NUMBER].
            </Lede>
            <div className="flex flex-col gap-4 border-t border-line-hairline pt-6">
              {placed.lines.map((l) => (
                <CartLine
                  key={`${l.slug}-${l.size}`}
                  src={l.src}
                  position={l.position}
                  name={l.name}
                  note={`Size ${l.size} · × ${l.qty}`}
                  trailing={money(l.total)}
                />
              ))}
              <div className={cx(totalRow, "border-t border-line-hairline pt-5")}>
                <span>Total</span>
                <span>{money(placed.total)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <Button href="/">Back to the collection</Button>
              <Button href="/help#contact" variant="line">
                Contact us
              </Button>
            </div>
          </Panel>
        </Section>
      )}
    </>
  );
}
