import type { Metadata } from "next";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ClosingLinks from "@/components/product/ClosingLinks";
import Faq from "@/components/sections/faq/Faq";
import Hero from "@/components/sections/faq/Hero";
import PageShell from "@/components/ui/PageShell";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `FAQ · ${brand.name}`,
  description: "Answers about the designs, sizing, delivery and care.",
};

export default function FaqPage() {
  return (
    <PageShell accent="copper">
      <SiteHeader overlay />
      <Hero />
      <Faq />
      <ClosingLinks />
      <SiteFooter />
    </PageShell>
  );
}
