import ProductCard from "@/components/product/ProductCard";
import Display from "@/components/ui/Display";
import Lede from "@/components/ui/Lede";
import Section from "@/components/ui/Section";
import { products } from "@/lib/products";

export default function Collection() {
  return (
    <Section id="collection">
      <div className="rise mb-14 flex flex-wrap items-end justify-between gap-6">
        <Display level={2} size="lg">
          Two designs.
          <br />
          <em className="italic text-accent-lavender">Choose your sleeves.</em>
        </Display>
        <Lede size="body" className="max-w-[340px]">
          Same fit, same fleece. The difference is the story stitched into the arms.
        </Lede>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </Section>
  );
}
