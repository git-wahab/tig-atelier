import type { Metadata } from "next";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ClosingLinks from "@/components/product/ClosingLinks";
import Contact from "@/components/sections/contact/Contact";
import Hero from "@/components/sections/contact/Hero";
import PageShell from "@/components/ui/PageShell";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Contact · ${brand.name}`,
  description: "Write to us about an order, a size or a design.",
};

export default function ContactPage() {
  return (
    <PageShell accent="copper">
      <SiteHeader overlay />
      <Hero />
      <Contact />
      <ClosingLinks />
      <SiteFooter />
    </PageShell>
  );
}
