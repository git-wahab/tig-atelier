import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionIntro from "@/components/ui/SectionIntro";
import type { Product } from "@/lib/products";

/**
 * Either the two sleeve artworks slide in around the copy, or the pair rises
 * under it — which one depends on whether the design has separate sleeve art.
 */
export default function MirroredPair({ product }: { product: Product }) {
  const intro = (
    <SectionIntro
      eyebrow="A mirrored pair"
      title={product.mirror.title}
      lede={product.mirror.text}
      align="center"
      className="rise"
    />
  );

  if (product.mirror.variant === "slide" && product.artLeft && product.artRight) {
    return (
      <Section rhythm="statement" clip className="flex flex-wrap items-center justify-center gap-6">
        <Image
          src={product.artLeft.src}
          width={product.artLeft.w}
          height={product.artLeft.h}
          alt="Left sleeve artwork"
          className="slide-l h-auto w-full min-w-0 max-w-[380px] flex-[0_1_380px]"
        />
        <div className="flex-[0_1_360px]">{intro}</div>
        <Image
          src={product.artRight.src}
          width={product.artRight.w}
          height={product.artRight.h}
          alt="Right sleeve artwork"
          className="slide-r h-auto w-full min-w-0 max-w-[380px] flex-[0_1_380px]"
        />
      </Section>
    );
  }

  return (
    <Section rhythm="statement" clip className="flex flex-col items-center gap-14">
      <div className="max-w-[560px]">{intro}</div>
      <Image
        src={product.pair.src}
        width={product.pair.w}
        height={product.pair.h}
        alt="Both sleeve artworks side by side"
        className="pair-in h-auto w-[min(720px,100%)]"
      />
    </Section>
  );
}
