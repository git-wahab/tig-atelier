import Link from "next/link";

/**
 * Placeholder for your logo. Replace the contents with an <Image> of your logo,
 * for example: <Image src="/logo.svg" alt="Brand name" width={132} height={44} />
 */
export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="flex h-11 min-w-[132px] items-center justify-center rounded-md border border-dashed border-bone/45 px-4 text-[11px] uppercase tracking-[0.2em] text-soft"
    >
      Your logo
    </Link>
  );
}
