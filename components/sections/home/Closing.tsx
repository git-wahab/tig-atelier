import Image from "next/image";
import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import GlowBackdrop from "@/components/ui/GlowBackdrop";
import Section from "@/components/ui/Section";
import { products } from "@/lib/products";

export default function Closing() {
  const [crane, bloom] = products;

  return (
    <Section rhythm="statement" clip className="flex flex-col items-center gap-8 text-center">
      <GlowBackdrop
        stops={[
          { glow: "steel", size: "45% 70%", at: "22% 50%", fade: "100%" },
          { glow: "plum", size: "45% 70%", at: "78% 50%", fade: "100%" },
        ]}
      />
      {crane.artLeft && (
        <Image
          src={crane.artLeft.src}
          width={crane.artLeft.w}
          height={crane.artLeft.h}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-[4%] top-1/2 h-[130%] w-auto max-w-none -translate-y-1/2 opacity-[0.26]"
        />
      )}
      <Image
        src={bloom.pair.src}
        width={bloom.pair.w}
        height={bloom.pair.h}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-1/2 h-[125%] w-auto max-w-none -translate-y-1/2 opacity-[0.26]"
      />

      <Display level={2} size="xl" className="rise relative max-w-[900px]">
        The sleeves tell it. <em className="italic">You wear it.</em>
      </Display>
      <div className="relative flex flex-wrap justify-center gap-3.5">
        <Button href={`/products/${crane.slug}`}>Shop {crane.name}</Button>
        <Button href={`/products/${bloom.slug}`} variant="line">
          Shop {bloom.name}
        </Button>
      </div>
    </Section>
  );
}
