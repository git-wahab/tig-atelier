import Link from "next/link";
import Logo from "./Logo";
import CartButton from "./CartButton";

type Props = {
  /** Float the header over the first section (used on pages with a full-bleed hero). */
  overlay?: boolean;
  links?: { href: string; label: string }[];
};

const defaultLinks = [
  { href: "/", label: "All designs" },
  { href: "/help#faq", label: "FAQ" },
  { href: "/help#contact", label: "Contact" },
];

export default function SiteHeader({ overlay = false, links = defaultLinks }: Props) {
  return (
    <header
      className={`gutter z-20 mx-auto flex max-w-[1440px] items-center justify-between gap-6 py-7 ${
        overlay ? "absolute inset-x-0 top-0" : "relative"
      }`}
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
