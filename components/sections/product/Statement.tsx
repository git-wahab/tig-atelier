import Display from "@/components/ui/Display";
import Section from "@/components/ui/Section";
import type { Product } from "@/lib/products";

/** The two phrases arrive in turn as the section scrolls into view. */
export default function Statement({ product }: { product: Product }) {
  return (
    <Section rhythm="statement" className="flex justify-center">
      <Display level={2} size="lg" className="max-w-[1000px] text-center">
        <span className="word">{product.statement.first}</span>
        <span className="word italic text-accent">{product.statement.second}</span>
      </Display>
    </Section>
  );
}
