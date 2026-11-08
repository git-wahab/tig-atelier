import Link from "next/link";
import Logo from "./Logo";
import Meta from "@/components/ui/Meta";
import { brand } from "@/lib/brand";
import { products } from "@/lib/products";

export default function SiteFooter() {
  return (
    <footer className="gutter mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-8 border-t border-line-hairline py-12">
      <Logo />
      <nav className="flex flex-wrap gap-7" aria-label="Footer">
        <Link href="/" className="navlink">
          Collection
        </Link>
        {products.map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="navlink">
            {p.name}
          </Link>
        ))}
        <Link href="/help#faq" className="navlink">
          FAQ
        </Link>
        <Link href="/help#contact" className="navlink">
          Contact
        </Link>
      </nav>
      <Meta>
        © {brand.year} {brand.name}. All rights reserved.
      </Meta>
    </footer>
  );
}
