import type { Metadata } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: brand.name,
  description:
    "Two hoodies where the design is the point. Embroidery runs from shoulder to cuff on both sleeves.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
