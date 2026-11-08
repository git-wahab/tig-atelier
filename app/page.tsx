import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SleeveStory from "@/components/product/SleeveStory";
import Closing from "@/components/sections/home/Closing";
import Collection from "@/components/sections/home/Collection";
import Craft from "@/components/sections/home/Craft";
import Hero from "@/components/sections/home/Hero";
import Statement from "@/components/sections/home/Statement";
import PageShell from "@/components/ui/PageShell";
import { products } from "@/lib/products";

export default function HomePage() {
  const [crane] = products;

  return (
    <PageShell accent="copper">
      <SiteHeader
        overlay
        links={[
          { href: "#collection", label: "Collection" },
          { href: "#sleeves", label: "The sleeves" },
          { href: "#craft", label: "Craft" },
        ]}
      />
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
