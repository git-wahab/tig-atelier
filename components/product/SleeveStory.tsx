import Image from "next/image";
import Display from "@/components/ui/Display";
import Eyebrow from "@/components/ui/Eyebrow";
import Lede from "@/components/ui/Lede";
import Section from "@/components/ui/Section";
import SectionIntro from "@/components/ui/SectionIntro";
import { cx } from "@/lib/cx";
import type { Product } from "@/lib/products";

type Props = { product: Product; eyebrow: string; intro: string };

/** Both sleeves pan from shoulder to cuff as the page scrolls, with three captions. */
export default function SleeveStory({ product, eyebrow, intro }: Props) {
  const sleeves = [
    { img: product.sleeveLeft, alt: `${product.name} left sleeve embroidery`, offset: "" },
    { img: product.sleeveRight, alt: `${product.name} right sleeve embroidery`, offset: "mt-14" },
  ];

  return (
    <Section id="sleeves">
      <SectionIntro
        eyebrow={eyebrow}
        title="Shoulder to cuff."
        size="lg"
        lede={intro}
        className="rise mb-20 max-w-[720px]"
      />

      <div className="track flex min-h-[2000px] flex-wrap items-start gap-16">
        <div className="stage flex flex-[1_1_480px] items-start justify-center gap-7">
          {sleeves.map((s) => (
            <div
              key={s.img.src}
              className={cx(
                "h-[560px] w-[min(300px,40vw)] overflow-hidden rounded-3xl border border-line-hairline bg-surface-raised",
                s.offset,
              )}
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
          <div className="relative h-[560px] w-0.5 bg-line-hairline">
            <div className="rail-fill absolute inset-0 bg-accent" />
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-[300px] pb-[360px] pt-40">
          {product.captions.map((c) => (
            <div key={c.label} className="cap flex max-w-[420px] flex-col gap-3.5">
              <Eyebrow>{c.label}</Eyebrow>
              <Display level={3} size="sm">
                {c.title}
              </Display>
              <Lede size="body" className="m-0">
                {c.text}
              </Lede>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
