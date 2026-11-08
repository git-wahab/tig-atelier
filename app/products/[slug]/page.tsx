import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SleeveStory from "@/components/SleeveStory";
import ProductBuyPanel from "@/components/ProductBuy";
import { getProduct, products } from "@/lib/products";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  return product
    ? { title: `${product.name} · Embroidered Hoodies`, description: product.tagline }
    : {};
}

const heroMask = "radial-gradient(ellipse 62% 60% at 50% 46%, #000 55%, transparent 100%)";

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const other = products.find((p) => p.slug !== product.slug)!;
  const { titleParts: t } = product;

  return (
    <div
      className="mx-auto w-full max-w-[1440px] overflow-x-clip"
      style={{ "--accent": product.accent } as React.CSSProperties}
    >
      <SiteHeader
        overlay
        links={[
          { href: "/", label: "All designs" },
          { href: "#sleeves", label: "The sleeves" },
          { href: "#buy", label: "Buy" },
        ]}
      />

      {/* HERO */}
      <section className="gutter relative flex min-h-[1040px] flex-col items-center overflow-hidden pb-[60px] pt-[150px] text-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 62%, ${product.glow} 0%, rgba(10,11,14,0) 72%), #0A0B0E`,
          }}
        />
        <Image
          src={product.pair.src}
          width={product.pair.w}
          height={product.pair.h}
          alt=""
          aria-hidden
          priority
          className="hero-art pointer-events-none absolute left-1/2 top-[58%] z-0 h-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
          style={{ width: "min(1000px, 140%)" }}
        />
        <div className="relative z-[2] flex max-w-[900px] flex-col items-center gap-[22px]">
          <span className="eyebrow">{product.number}</span>
          <h1 className="display text-[clamp(52px,8.4vw,124px)] leading-[0.95]">
            {t.before}
            <em className="italic text-accent">{t.accent}</em>
            {t.after}
          </h1>
          <p className="max-w-[520px] text-lg leading-[1.65] text-mute">{product.tagline}</p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a href="#buy" className="btn btn-fill">
              Buy now
            </a>
            <a href="#sleeves" className="btn btn-line">
              Explore the embroidery
            </a>
          </div>
        </div>
        <div
          className="hero-photo relative z-[1] mt-6 w-[min(620px,100%)]"
          style={{
            aspectRatio: `${product.hoodie.w}/${product.hoodie.h}`,
            WebkitMaskImage: heroMask,
            maskImage: heroMask,
          }}
        >
          <Image
            src={product.hoodie.src}
            alt={`${product.name} hoodie in ${product.colour.toLowerCase()} with embroidered sleeves`}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 620px"
            className="object-cover"
          />
        </div>
      </section>

      {/* STATEMENT */}
      <section className="gutter flex justify-center py-[180px]">
        <h2 className="display max-w-[1000px] text-center text-[clamp(34px,5.4vw,76px)] leading-[1.12]">
          <span className="word">{product.statement.first}</span>
          <span className="word italic text-accent">{product.statement.second}</span>
        </h2>
      </section>

      <SleeveStory product={product} eyebrow="Both sleeves" intro={product.sleeveIntro} />

      {/* PINNED CLOSE-UP */}
      <section className="ztrack relative min-h-[1700px]">
        <div className="sticky top-0 flex h-[820px] items-center justify-center overflow-hidden">
          <div className="zoom-frame relative flex h-[760px] w-full items-center justify-center overflow-hidden bg-panel">
            <Image
              src={product.detail.src}
              width={product.detail.w}
              height={product.detail.h}
              alt={product.closeUp.alt}
              className="zoom-img block h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,11,14,0.1) 30%, rgba(10,11,14,0.85) 100%)",
              }}
            />
            <div className="zoom-text gutter absolute inset-x-0 bottom-14 flex max-w-[760px] flex-col gap-3.5">
              <span className="eyebrow">Up close</span>
              <h2 className="display text-[clamp(36px,5vw,68px)] leading-[1.02]">
                {product.closeUp.title}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* MIRRORED PAIR */}
      <section className="gutter overflow-hidden py-40">
        {product.mirror.variant === "slide" && product.artLeft && product.artRight ? (
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Image
              src={product.artLeft.src}
              width={product.artLeft.w}
              height={product.artLeft.h}
              alt="Left sleeve artwork"
              className="slide-l h-auto w-full min-w-0 max-w-[380px] flex-[0_1_380px]"
            />
            <div className="rise flex flex-[0_1_360px] flex-col items-center gap-[18px] text-center">
              <span className="eyebrow">A mirrored pair</span>
              <h2 className="display text-[clamp(36px,4.4vw,60px)] leading-[1.05]">
                {product.mirror.title}
              </h2>
              <p className="m-0 text-base leading-[1.7] text-mute">{product.mirror.text}</p>
            </div>
            <Image
              src={product.artRight.src}
              width={product.artRight.w}
              height={product.artRight.h}
              alt="Right sleeve artwork"
              className="slide-r h-auto w-full min-w-0 max-w-[380px] flex-[0_1_380px]"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-14">
            <div className="rise flex max-w-[560px] flex-col items-center gap-[18px] text-center">
              <span className="eyebrow">A mirrored pair</span>
              <h2 className="display text-[clamp(36px,4.4vw,60px)] leading-[1.05]">
                {product.mirror.title}
              </h2>
              <p className="m-0 text-base leading-[1.7] text-mute">{product.mirror.text}</p>
            </div>
            <Image
              src={product.pair.src}
              width={product.pair.w}
              height={product.pair.h}
              alt="Both sleeve artworks side by side"
              className="pair-in h-auto w-[min(720px,100%)]"
            />
          </div>
        )}
      </section>

      {/* BUY */}
      <section id="buy" className="gutter pb-40 pt-20">
        <div className="flex flex-wrap items-start gap-16">
          <div className="stage min-w-0 flex-[1_1_440px]" style={{ top: 40 }}>
            <div className="reveal overflow-hidden rounded-[28px] bg-[#14161C]">
              <Image
                src={product.hoodie.src}
                width={product.hoodie.w}
                height={product.hoodie.h}
                alt={product.name}
                className="block h-auto w-full"
              />
            </div>
          </div>
          <ProductBuyPanel product={product} />
        </div>
      </section>

      {/* OTHER DESIGN */}
      <section className="gutter pb-40">
        <h2 className="display rise mb-10 text-[clamp(34px,4.4vw,60px)] leading-none">
          Also in the collection.
        </h2>
        <Link
          href={`/products/${other.slug}`}
          style={{ "--accent": other.accent } as React.CSSProperties}
          className="group relative isolate flex min-h-[520px] flex-col justify-end overflow-hidden rounded-[28px] p-9 text-bone"
        >
          <div className="absolute inset-0 -z-20 bg-[#14161C] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]">
            <Image
              src={other.hoodie.src}
              alt={`${other.name} hoodie`}
              fill
              sizes="100vw"
              style={{ objectPosition: other.hoodiePosition }}
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,11,14,0.92) 0%, rgba(10,11,14,0.2) 70%)",
            }}
          />
          <span className="eyebrow mb-3">{other.number}</span>
          <h3 className="display mb-3 text-[clamp(36px,4.4vw,64px)] leading-none">{other.name}</h3>
          <p className="mb-5 max-w-[380px] text-[15px] leading-[1.65] text-soft">{other.tagline}</p>
          <span className="text-sm font-medium">View the design →</span>
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
