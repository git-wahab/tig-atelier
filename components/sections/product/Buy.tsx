import Image from "next/image";
import ProductBuyPanel from "@/components/product/ProductBuyPanel";
import Section from "@/components/ui/Section";
import type { Product } from "@/lib/products";

export default function Buy({ product }: { product: Product }) {
  return (
    <Section id="buy">
      <div className="flex flex-wrap items-start gap-16">
        <div className="stage min-w-0 flex-[1_1_440px]">
          <div className="reveal overflow-hidden rounded-[28px] bg-surface-raised">
            <Image
              src={product.hoodie.src}
              width={product.hoodie.w}
              height={product.hoodie.h}
              alt={product.name}
              className="block h-auto w-full"
            />
          </div>
        </div>
        <ProductBuyPanel product={product} />
      </div>
    </Section>
  );
}
