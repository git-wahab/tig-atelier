import Link from "next/link";
import { products } from "@/lib/products";

export default function SiteFooter() {
  return (
    <footer className="gutter mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-8 border-t border-white/10 py-12">
      <div className="flex h-11 min-w-[132px] items-center justify-center rounded-md border border-dashed border-bone/35 px-4 text-[11px] uppercase tracking-[0.2em] text-mute">
        Your logo
      </div>
      <nav className="flex flex-wrap gap-7" aria-label="Footer">
        <Link href="/" className="navlink">Collection</Link>
        {products.map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="navlink">
            {p.name}
          </Link>
        ))}
        <Link href="/help#faq" className="navlink">FAQ</Link>
        <Link href="/help#contact" className="navlink">Contact</Link>
      </nav>
      <span className="text-[13px] text-dim">© 2026 [Brand name]. All rights reserved.</span>
    </footer>
  );
}
