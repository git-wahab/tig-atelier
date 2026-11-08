import Image from "next/image";
import type { Product } from "@/lib/products";

/** Both sleeves pan from shoulder to cuff as the page scrolls, with three captions. */
export default function SleeveStory({
  product,
  eyebrow,
  intro,
}: {
  product: Product;
  eyebrow: string;
  intro: string;
}) {
  const sleeves = [
    { img: product.sleeveLeft, alt: `${product.name} left sleeve embroidery`, offset: "" },
    { img: product.sleeveRight, alt: `${product.name} right sleeve embroidery`, offset: "mt-14" },
  ];

  return (
    <section id="sleeves" className="gutter pb-40 pt-10">
      <div className="rise mb-20 flex max-w-[720px] flex-col gap-5">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display text-[clamp(44px,6vw,88px)] leading-none">Shoulder to cuff.</h2>
        <p className="max-w-[520px] text-[17px] leading-[1.7] text-mute">{intro}</p>
      </div>

      <div className="track flex min-h-[2000px] flex-wrap items-start gap-16">
        <div className="stage flex flex-[1_1_480px] items-start justify-center gap-7">
          {sleeves.map((s) => (
            <div
              key={s.img.src}
              className={`h-[560px] w-[min(300px,40vw)] overflow-hidden rounded-3xl border border-white/10 bg-panel ${s.offset}`}
            >
              <Image
                src={s.img.src}
                width={s.img.w}
                height={s.img.h}
                alt={s.alt}
                className="pan -ml-[12.5%] block h-auto w-[125%] max-w-none"
              />
            </div>
          ))}
          <div className="relative h-[560px] w-0.5 bg-white/10">
            <div className="rail-fill absolute inset-0 bg-accent" />
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-[300px] pb-[360px] pt-40">
          {product.captions.map((c) => (
            <div key={c.label} className="cap flex max-w-[420px] flex-col gap-3.5">
              <span className="eyebrow">{c.label}</span>
              <h3 className="display text-[clamp(30px,3.4vw,46px)] leading-[1.1]">{c.title}</h3>
              <p className="m-0 text-base leading-[1.7] text-mute">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
