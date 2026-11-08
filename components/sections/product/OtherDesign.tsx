import ProductCard from "@/components/product/ProductCard";
import Display from "@/components/ui/Display";
import Section from "@/components/ui/Section";
import type { Product } from "@/lib/products";

export default function OtherDesign({ product }: { product: Product }) {
  return (
    <Section rhythm="body">
      <Display level={2} size="md" className="rise mb-10">
        Also in the collection.
      </Display>
      <ProductCard product={product} variant="banner" />
    </Section>
  );
}
