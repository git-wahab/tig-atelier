import Image from "next/image";
import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import Eyebrow from "@/components/ui/Eyebrow";
import GlowBackdrop from "@/components/ui/GlowBackdrop";
import Lede from "@/components/ui/Lede";
import Section from "@/components/ui/Section";
import type { Product } from "@/lib/products";

// A stencil for mask-image, not a colour: black is opaque, transparent is cut away.
const heroMask = "radial-gradient(ellipse 62% 60% at 50% 46%, black 55%, transparent 100%)";

export default function Hero({ product }: { product: Product }) {
  const { titleParts: t } = product;

  return (
    <Section
      rhythm="hero"
      clip
      className="flex min-h-[1040px] flex-col items-center text-center"
    >
      <GlowBackdrop
        stops={[{ glow: product.glow, size: "60% 50%", at: "50% 62%", fade: "72%" }]}
      />
      <Image
        src={product.pair.src}
        width={product.pair.w}
        height={product.pair.h}
        alt=""
        aria-hidden
        priority
        className="hero-art pointer-events-none absolute left-1/2 top-[58%] z-0 h-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        style={{ width: "min(1000px, 140%)" }}
      />

      <div className="relative z-[2] flex max-w-[900px] flex-col items-center gap-6">
        <Eyebrow>{product.number}</Eyebrow>
        <Display level={1} size="hero">
          {t.before}
          <em className="italic text-accent">{t.accent}</em>
          {t.after}
        </Display>
        <Lede className="max-w-[520px]">{product.tagline}</Lede>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button href="#buy">Buy now</Button>
          <Button href="#sleeves" variant="line">
            Explore the embroidery
          </Button>
        </div>
      </div>

      <div
        className="hero-photo relative z-[1] mt-6 w-[min(620px,100%)]"
        style={{
          aspectRatio: `${product.hoodie.w}/${product.hoodie.h}`,
          WebkitMaskImage: heroMask,
          maskImage: heroMask,
        }}
      >
        <Image
          src={product.hoodie.src}
          alt={`${product.name} hoodie in ${product.colour.toLowerCase()} with embroidered sleeves`}
          fill
          priority
          sizes="(max-width: 760px) 100vw, 620px"
          className="object-cover"
        />
      </div>
    </Section>
  );
}
