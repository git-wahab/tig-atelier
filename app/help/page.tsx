import type { Metadata } from "next";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ClosingLinks from "@/components/sections/help/ClosingLinks";
import Contact from "@/components/sections/help/Contact";
import Faq from "@/components/sections/help/Faq";
import Hero from "@/components/sections/help/Hero";
import PageShell from "@/components/ui/PageShell";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `FAQ and Contact · ${brand.name}`,
  description: "Answers about the designs, sizing, delivery and care, and a way to write to us.",
};

export default function HelpPage() {
  return (
    <PageShell accent="copper">
      <SiteHeader
        overlay
        links={[
          { href: "/", label: "All designs" },
          { href: "#faq", label: "FAQ" },
          { href: "#contact", label: "Contact" },
        ]}
      />
      <Hero />
      <Faq />
      <Contact />
      <ClosingLinks />
      <SiteFooter />
    </PageShell>
  );
}
