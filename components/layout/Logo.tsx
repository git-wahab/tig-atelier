import Link from "next/link";
import { brand } from "@/lib/brand";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} — home`}
      className="font-display text-lede uppercase leading-none tracking-eyebrow text-content-primary transition-colors hover:text-[var(--accent)]"
    >
      {brand.name}
    </Link>
  );
}
