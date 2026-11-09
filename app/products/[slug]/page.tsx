import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import CloseUpZoom from "@/components/product/CloseUpZoom";
import MirroredPair from "@/components/product/MirroredPair";
import SleeveStory from "@/components/product/SleeveStory";
import Buy from "@/components/sections/product/Buy";
import Hero from "@/components/sections/product/Hero";
import OtherDesign from "@/components/sections/product/OtherDesign";
import Statement from "@/components/sections/product/Statement";
import PageShell from "@/components/ui/PageShell";
import { brand } from "@/lib/brand";
import { getProduct, products } from "@/lib/products";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  return product
    ? { title: `${product.name} · ${brand.name}`, description: product.tagline }
    : {};
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const other = products.find((p) => p.slug !== product.slug)!;

  return (
    <PageShell accent={product.accent}>
      <SiteHeader overlay />
      <Hero product={product} />
      <Statement product={product} />
      <SleeveStory product={product} eyebrow="Both sleeves" intro={product.sleeveIntro} />
      <CloseUpZoom product={product} />
      <MirroredPair product={product} />
      <Buy product={product} />
      <OtherDesign product={other} />
      <SiteFooter />
    </PageShell>
  );
}
