import Image from "next/image";
import Scrim from "@/components/ui/Scrim";
import SectionIntro from "@/components/ui/SectionIntro";
import type { Product } from "@/lib/products";

/** The detail photograph fills the frame and zooms as the pinned section scrolls. */
export default function CloseUpZoom({ product }: { product: Product }) {
  return (
    <section className="ztrack relative min-h-[1700px]">
      <div className="sticky top-0 flex h-[820px] items-center justify-center overflow-hidden">
        <div className="zoom-frame relative flex h-[760px] w-full items-center justify-center overflow-hidden bg-surface-raised">
          <Image
            src={product.detail.src}
            width={product.detail.w}
            height={product.detail.h}
            alt={product.closeUp.alt}
            className="zoom-img block h-full w-full object-cover"
          />
          <Scrim variant="image" />
          <SectionIntro
            eyebrow="Up close"
            title={product.closeUp.title}
            size="lg"
            className="zoom-text gutter absolute inset-x-0 bottom-14 max-w-[760px]"
          />
        </div>
      </div>
    </section>
  );
}
