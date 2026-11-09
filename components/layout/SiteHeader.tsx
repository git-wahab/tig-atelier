import Link from "next/link";
import Logo from "./Logo";
import CartButton from "@/components/cart/CartButton";
import { cx } from "@/lib/cx";

type Props = {
  /** Float the header over the first section (used on pages with a full-bleed hero). */
  overlay?: boolean;
};

/** The same three links on every page — no page overrides them. */
const links = [
  { href: "/collection", label: "Collection" },
  { href: "/contact", label: "Contact us" },
  { href: "/faq", label: "FAQs" },
];

export default function SiteHeader({ overlay = false }: Props) {
  return (
    <header
      className={cx(
        "gutter z-20 mx-auto flex max-w-[1440px] items-center justify-between gap-6 py-7",
        overlay ? "absolute inset-x-0 top-0" : "relative",
      )}
    >
      <Logo />
      <nav className="hidden gap-10 md:flex" aria-label="Main">
        {links.map((l) => (
          <Link key={l.href + l.label} href={l.href} className="navlink">
            {l.label}
          </Link>
        ))}
      </nav>
      <CartButton />
    </header>
  );
}
