import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import Section from "@/components/ui/Section";
import { products } from "@/lib/products";

export default function ClosingLinks() {
  const [crane, bloom] = products;

  return (
    <Section rhythm="band" className="flex flex-col items-center gap-7 text-center">
      <Display level={2} size="lg" className="rise max-w-[760px]">
        Still deciding between <em className="italic">two</em> sleeves?
      </Display>
      <div className="flex flex-wrap justify-center gap-3.5">
        <Button href={`/products/${crane.slug}`}>{crane.name}</Button>
        <Button href={`/products/${bloom.slug}`} variant="line">
          {bloom.name}
        </Button>
      </div>
    </Section>
  );
}
