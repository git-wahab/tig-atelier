import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import PageShell from "@/components/ui/PageShell";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Cart and Checkout · ${brand.name}`,
};

export default function CartPage() {
  return (
    <PageShell accent="copper" fillViewport>
      <SiteHeader />
      <CartView />
      <SiteFooter />
    </PageShell>
  );
}
