import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart and Checkout · Embroidered Hoodies",
};

export default function CartPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[1440px] overflow-x-clip">
      <SiteHeader />
      <CartView />
      <SiteFooter />
    </div>
  );
}
