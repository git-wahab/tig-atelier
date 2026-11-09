import type { Metadata } from "next";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ClosingLinks from "@/components/product/ClosingLinks";
import Collection from "@/components/product/Collection";
import Hero from "@/components/sections/collection/Hero";
import PageShell from "@/components/ui/PageShell";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Collection · ${brand.name}`,
  description: "Both embroidered hoodie designs, side by side.",
};

export default function CollectionPage() {
  return (
    <PageShell accent="copper">
      <SiteHeader overlay />
      <Hero />
      <Collection />
      <ClosingLinks />
      <SiteFooter />
    </PageShell>
  );
}
