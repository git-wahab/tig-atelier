import Image from "next/image";
import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import Eyebrow from "@/components/ui/Eyebrow";
import GlowBackdrop from "@/components/ui/GlowBackdrop";
import Lede from "@/components/ui/Lede";
import Meta from "@/components/ui/Meta";
import Section from "@/components/ui/Section";
import { products } from "@/lib/products";

// A stencil for mask-image, not a colour: black is opaque, transparent is cut away.
const heroMask = "radial-gradient(ellipse 62% 60% at 50% 48%, black 55%, transparent 100%)";

export default function Hero() {
  const [crane, bloom] = products;

  return (
    <Section
      rhythm="hero"
      clip
      className="flex min-h-[980px] flex-wrap items-center justify-between gap-6"
    >
      <GlowBackdrop
        stops={[
          { glow: "steel", size: "60% 55%", at: "68% 48%" },
          { glow: "plum", size: "40% 45%", at: "8% 92%", fade: "100%" },
        ]}
      />
      <Image
        src={crane.pair.src}
        width={crane.pair.w}
        height={crane.pair.h}
        alt=""
        aria-hidden
        priority
        className="home-art pointer-events-none absolute left-1/2 top-1/2 z-0 h-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
        style={{ width: "min(1100px, 150%)" }}
      />

      <div className="relative z-[2] flex max-w-[640px] flex-[1_1_440px] flex-col gap-7">
        <Eyebrow>Embroidered hoodies · Two designs</Eyebrow>
        <Display level={1} size="hero">
          Wear the <em className="italic text-accent">design.</em>
        </Display>
        <Lede className="max-w-[480px]">
          One embroidered scene runs from the shoulder to the cuff on both sleeves. The hoodie is the
          canvas.
        </Lede>
        <div className="flex flex-wrap gap-3.5">
          <Button href={`/products/${crane.slug}`}>Shop {crane.name}</Button>
          <Button href={`/products/${bloom.slug}`} variant="line">
            See {bloom.name}
          </Button>
        </div>
      </div>

      <div className="hero-photo-home relative z-[1] flex flex-[1_1_360px] justify-center">
        <div
          className="relative w-[min(560px,100%)]"
          style={{
            aspectRatio: `${crane.hoodie.w}/${crane.hoodie.h}`,
            WebkitMaskImage: heroMask,
            maskImage: heroMask,
          }}
        >
          <Image
            src={crane.hoodie.src}
            alt="Ivory hoodie with blue crane and blossom embroidery running down both sleeves"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 560px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="gutter absolute inset-x-0 bottom-9 z-[2] flex flex-wrap justify-between gap-4">
        <Meta caps>Whispering Crane Bird · Ivory fleece</Meta>
        <Meta caps>Scroll to follow the thread</Meta>
      </div>
    </Section>
  );
}
