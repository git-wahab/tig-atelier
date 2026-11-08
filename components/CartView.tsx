"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { money, priceOf } from "@/lib/config";
import { getProduct } from "@/lib/products";

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

  return (
    <>
      <section className="gutter flex flex-col gap-7 pb-6 pt-10">
        <ol className="flex flex-wrap gap-x-7 gap-y-3">
          {steps.map((s) => (
            <li
              key={s.id}
              aria-current={step === s.id ? "step" : undefined}
              className={`border-b-2 pb-2 text-xs uppercase tracking-[0.18em] ${
                step === s.id ? "border-copper font-semibold text-bone" : "border-transparent font-medium text-dim"
              }`}
            >
              {s.label}
            </li>
          ))}
        </ol>
        {step === "cart" && (
          <h1 className="display text-[clamp(48px,7vw,96px)] leading-[0.98]">
            Your <em className="italic text-copper">bag.</em>
          </h1>
        )}
        {step === "checkout" && (
          <h1 className="display text-[clamp(48px,7vw,96px)] leading-[0.98]">
            Delivery <em className="italic text-lavender">details.</em>
          </h1>
        )}
        {step === "done" && (
          <h1 className="display text-[clamp(48px,7vw,96px)] leading-[0.98]">
            Order <em className="italic text-copper">placed.</em>
          </h1>
        )}
      </section>

      {/* STEP 1: BAG */}
      {step === "cart" && (
        <section className="gutter pb-40 pt-6">
          {lines.length === 0 ? (
            <div className="panel flex max-w-[640px] flex-col items-start gap-5">
              <h2 className="display text-[clamp(30px,3.4vw,44px)] leading-[1.1]">Nothing here yet.</h2>
              <p className="text-base leading-[1.7] text-mute">
                Pick a design and choose your size. Whatever you add shows up here and in the cart
                button at the top of every page.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Link href="/products/whispering-crane-bird" className="btn btn-fill">Whispering Crane Bird</Link>
                <Link href="/products/midnight-bloom" className="btn btn-line">Midnight Bloom</Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-start gap-14">
              <div className="flex min-w-0 flex-[2_1_520px] flex-col border-t border-white/10">
                {lines.map((l) => (
                  <div
                    key={`${l.slug}-${l.size}`}
                    className="flex flex-wrap items-center gap-x-7 gap-y-5 border-b border-white/10 py-7"
                  >
                    <Image
                      src={l.src}
                      alt={l.name}
                      width={120}
                      height={154}
                      style={{ objectPosition: l.position }}
                      className="h-[154px] w-[120px] flex-none rounded-2xl bg-[#14161C] object-cover"
                    />
                    <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2">
                      <h3 className="display text-[clamp(24px,2.4vw,32px)] leading-[1.1]">{l.name}</h3>
                      <span className="text-sm text-mute">
                        {l.colour} · Size {l.size}
                      </span>
                      <span className="text-sm text-soft">{money(l.unit)} each</span>
                      <div>
                        <button
                          type="button"
                          onClick={() => remove(l.slug, l.size)}
                          className="text-[13px] text-mute underline underline-offset-[3px] transition-colors hover:text-copper"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="inline-flex h-11 items-center rounded-full border border-bone/25">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(l.slug, l.size, l.qty - 1)}
                        className="h-11 w-11 rounded-full text-lg transition-colors hover:text-copper"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm font-medium">{l.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(l.slug, l.size, l.qty + 1)}
                        className="h-11 w-11 rounded-full text-lg transition-colors hover:text-copper"
                      >
                        +
                      </button>
                    </div>
                    <span className="w-[100px] flex-none text-right text-[17px] font-medium">
                      {money(l.total)}
                    </span>
                  </div>
                ))}
              </div>

              <aside className="panel flex min-w-0 max-w-[480px] flex-[1_1_340px] flex-col gap-5 md:sticky md:top-6">
                <h2 className="display text-[30px] leading-[1.1]">Summary</h2>
                <div className="flex flex-col gap-3.5 text-[15px]">
                  <div className="flex justify-between gap-4">
                    <span className="text-mute">Items</span>
                    <span>{lines.reduce((n, l) => n + l.qty, 0)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-mute">Subtotal</span>
                    <span>{money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-mute">Shipping</span>
                    <span>[SHIPPING COST]</span>
                  </div>
                </div>
                <div className="flex justify-between gap-4 border-t border-white/10 pt-[18px] text-[19px] font-medium">
                  <span>Total</span>
                  <span>{money(subtotal)}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-fill min-h-14 text-[15px]"
                  onClick={() => {
                    setStep("checkout");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Continue to delivery
                </button>
                <Link href="/" className="navlink text-center">Keep browsing</Link>
                <p className="text-xs leading-relaxed text-mute">
                  Prices shown are sample values. Set yours in lib/config.ts.
                </p>
              </aside>
            </div>
          )}
        </section>
      )}

      {/* STEP 2: DELIVERY */}
      {step === "checkout" && (
        <section className="gutter pb-40 pt-6">
          <div className="flex flex-wrap items-start gap-14">
            <form onSubmit={placeOrder} className="panel flex min-w-0 flex-[2_1_520px] flex-col gap-7">
              <fieldset className="m-0 flex min-w-0 flex-col gap-[18px] border-0 p-0">
                <legend className="eyebrow mb-[18px] !text-lavender">Contact</legend>
                <div className="flex flex-col gap-2">
                  <label className="lbl" htmlFor="c-email">Email</label>
                  <input className="field" id="c-email" type="email" required placeholder="you@example.com" autoComplete="email" />
                </div>
              </fieldset>
              <fieldset className="m-0 flex min-w-0 flex-col gap-[18px] border-0 p-0">
                <legend className="eyebrow mb-[18px] !text-lavender">Delivery address</legend>
                <div className="flex flex-wrap gap-[18px]">
                  <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2">
                    <label className="lbl" htmlFor="c-first">First name</label>
                    <input className="field" id="c-first" type="text" required autoComplete="given-name" />
                  </div>
                  <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2">
                    <label className="lbl" htmlFor="c-last">Last name</label>
                    <input className="field" id="c-last" type="text" required autoComplete="family-name" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="lbl" htmlFor="c-addr">Address</label>
                  <input className="field" id="c-addr" type="text" required autoComplete="street-address" />
                </div>
                <div className="flex flex-wrap gap-[18px]">
                  <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2">
                    <label className="lbl" htmlFor="c-city">City</label>
                    <input className="field" id="c-city" type="text" required autoComplete="address-level2" />
                  </div>
                  <div className="flex min-w-0 flex-[1_1_140px] flex-col gap-2">
                    <label className="lbl" htmlFor="c-zip">Postal code</label>
                    <input className="field" id="c-zip" type="text" autoComplete="postal-code" />
                  </div>
                  <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2">
                    <label className="lbl" htmlFor="c-phone">Phone</label>
                    <input className="field" id="c-phone" type="tel" required autoComplete="tel" />
                  </div>
                </div>
              </fieldset>
              <div className="flex flex-col gap-3.5">
                <span className="eyebrow !text-lavender">Payment</span>
                <div className="flex min-h-[110px] items-center justify-center rounded-2xl border border-dashed border-bone/30 p-5 text-center text-xs uppercase leading-[1.8] tracking-[0.16em] text-mute">
                  [Payment methods and card fields
                  <br />
                  from your payment provider]
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3.5">
                <button type="submit" className="btn btn-fill min-h-14 flex-[1_1_240px] text-[15px]">
                  Place order · {money(subtotal)}
                </button>
                <button type="button" className="btn btn-line min-h-14" onClick={() => setStep("cart")}>
                  Back to bag
                </button>
              </div>
            </form>

            <aside className="panel flex min-w-0 max-w-[480px] flex-[1_1_340px] flex-col gap-5 md:sticky md:top-6">
              <h2 className="display text-[30px] leading-[1.1]">In your order</h2>
              {lines.map((l) => (
                <div key={`${l.slug}-${l.size}`} className="flex items-center gap-3.5">
                  <Image
                    src={l.src}
                    alt=""
                    width={56}
                    height={72}
                    style={{ objectPosition: l.position }}
                    className="h-[72px] w-14 flex-none rounded-[10px] bg-[#1A1C22] object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-sm font-medium">{l.name}</span>
                    <span className="text-xs text-mute">Size {l.size} · × {l.qty}</span>
                  </div>
                  <span className="text-sm">{money(l.total)}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-t border-white/10 pt-[18px] text-[15px]">
                <span className="text-mute">Shipping</span>
                <span>[SHIPPING COST]</span>
              </div>
              <div className="flex justify-between gap-4 text-[19px] font-medium">
                <span>Total</span>
                <span>{money(subtotal)}</span>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* STEP 3: DONE */}
      {step === "done" && placed && (
        <section className="gutter pb-40 pt-6">
          <div className="panel flex max-w-[760px] flex-col gap-6">
            <p className="text-[17px] leading-[1.7] text-mute">
              Thank you. A confirmation goes to the email you entered. Order number: [ORDER NUMBER].
            </p>
            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              {placed.lines.map((l) => (
                <div key={`${l.slug}-${l.size}`} className="flex items-center gap-3.5">
                  <Image
                    src={l.src}
                    alt=""
                    width={56}
                    height={72}
                    style={{ objectPosition: l.position }}
                    className="h-[72px] w-14 flex-none rounded-[10px] bg-[#1A1C22] object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-[15px] font-medium">{l.name}</span>
                    <span className="text-[13px] text-mute">Size {l.size} · × {l.qty}</span>
                  </div>
                  <span className="text-[15px]">{money(l.total)}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-t border-white/10 pt-[18px] text-[19px] font-medium">
                <span>Total</span>
                <span>{money(placed.total)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <Link href="/" className="btn btn-fill">Back to the collection</Link>
              <Link href="/help#contact" className="btn btn-line">Contact us</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
