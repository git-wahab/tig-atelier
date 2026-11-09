import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import Collection from "@/components/product/Collection";
import SleeveStory from "@/components/product/SleeveStory";
import Closing from "@/components/sections/home/Closing";
import Craft from "@/components/sections/home/Craft";
import Hero from "@/components/sections/home/Hero";
import Statement from "@/components/sections/home/Statement";
import PageShell from "@/components/ui/PageShell";
import { products } from "@/lib/products";

export default function HomePage() {
  const [crane] = products;

  return (
    <PageShell accent="copper">
      <SiteHeader overlay />
      <Hero />
      <Statement />
      <SleeveStory
        product={crane}
        eyebrow={crane.name}
        intro="The embroidery does not stop at a patch. It travels the full length of each sleeve, so the scene unfolds as the arm moves."
      />
      <Collection />
      <Craft />
      <Closing />
      <SiteFooter />
    </PageShell>
  );
}
