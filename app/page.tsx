import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SleeveStory from "@/components/SleeveStory";
import { money, priceOf } from "@/lib/config";
import { products } from "@/lib/products";

const heroMask =
  "radial-gradient(ellipse 62% 60% at 50% 48%, #000 55%, transparent 100%)";

export default function HomePage() {
  const crane = products[0];
  const bloom = products[1];

  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-x-clip">
      <SiteHeader
        overlay
        links={[
          { href: "#collection", label: "Collection" },
          { href: "#sleeves", label: "The sleeves" },
          { href: "#craft", label: "Craft" },
        ]}
      />

      {/* HERO */}
      <section className="gutter relative flex min-h-[980px] flex-wrap items-center justify-between gap-6 overflow-hidden pb-20 pt-[150px]">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 68% 48%, #1B2230 0%, rgba(10,11,14,0) 70%), radial-gradient(ellipse 40% 45% at 8% 92%, #2A1A3A 0%, rgba(10,11,14,0) 100%), #0A0B0E",
          }}
        />
        <Image
          src={crane.pair.src}
          width={crane.pair.w}
          height={crane.pair.h}
          alt=""
          aria-hidden
          priority
          className="home-art pointer-events-none absolute left-1/2 top-1/2 z-0 h-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
          style={{ width: "min(1100px, 150%)" }}
        />
        <div className="relative z-[2] flex max-w-[640px] flex-[1_1_440px] flex-col gap-7">
          <span className="eyebrow">Embroidered hoodies · Two designs</span>
          <h1 className="display text-[clamp(56px,9vw,132px)] leading-[0.95]">
            Wear the <em className="italic text-copper">design.</em>
          </h1>
          <p className="max-w-[480px] text-lg leading-[1.65] text-mute">
            One embroidered scene runs from the shoulder to the cuff on both sleeves. The hoodie is
            the canvas.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link href={`/products/${crane.slug}`} className="btn btn-fill">
              Shop {crane.name}
            </Link>
            <Link href={`/products/${bloom.slug}`} className="btn btn-line">
              See {bloom.name}
            </Link>
          </div>
        </div>
        <div className="hero-photo-home relative z-[1] flex flex-[1_1_360px] justify-center">
          <div
            className="relative w-[min(560px,100%)]"
            style={{
              aspectRatio: `${crane.hoodie.w}/${crane.hoodie.h}`,
              WebkitMaskImage: heroMask,
              maskImage: heroMask,
            }}
          >
            <Image
              src={crane.hoodie.src}
              alt="Ivory hoodie with blue crane and blossom embroidery running down both sleeves"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-x-[clamp(20px,5vw,72px)] bottom-9 z-[2] flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.16em] text-dim">
          <span>Whispering Crane Bird · Ivory fleece</span>
          <span>Scroll to follow the thread</span>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="gutter flex justify-center py-[200px]">
        <h2 className="display max-w-[1100px] text-center text-[clamp(34px,5.4vw,76px)] leading-[1.12]">
          <span className="word">Most brands sell hoodies.</span>
          <span className="word italic text-copper"> We sell the design</span>
          <span className="word"> that happens to be stitched onto one.</span>
        </h2>
      </section>

      {/* SLEEVE STORY */}
      <SleeveStory
        product={crane}
        eyebrow={crane.name}
        intro="The embroidery does not stop at a patch. It travels the full length of each sleeve, so the scene unfolds as the arm moves."
      />

      {/* COLLECTION */}
      <section id="collection" className="gutter pb-40 pt-10">
        <div className="rise mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[clamp(40px,5vw,72px)] leading-none">
            Two designs.
            <br />
            <em className="italic text-lavender">Choose your sleeves.</em>
          </h2>
          <p className="max-w-[340px] text-base leading-[1.7] text-mute">
            Same fit, same fleece. The difference is the story stitched into the arms.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              style={{ "--accent": p.accent } as React.CSSProperties}
              className="group relative isolate flex min-h-[620px] flex-col justify-end overflow-hidden rounded-[28px] p-7 text-bone md:min-h-[760px] md:p-10"
            >
              <div className="absolute inset-0 -z-20 bg-[#14161C] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]">
                <Image
                  src={p.hoodie.src}
                  alt={`${p.name} hoodie`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectPosition: p.hoodiePosition }}
                  className="object-cover"
                />
              </div>
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background: `linear-gradient(180deg, rgba(10,11,14,0) 38%, ${
                    p.slug === "midnight-bloom" ? "rgba(14,10,20,0.92)" : "rgba(10,11,14,0.92)"
                  } 100%)`,
                }}
              />
              <span className="eyebrow mb-3">{p.number}</span>
              <h3 className="display mb-3 text-[clamp(36px,4vw,56px)] leading-none">{p.name}</h3>
              <p className="mb-6 max-w-[380px] text-[15px] leading-[1.65] text-soft">{p.cardBlurb}</p>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2.5 text-sm font-medium">
                  View the design
                  <i className="inline-block h-px w-9 bg-bone transition-all duration-500 group-hover:w-16" />
                </span>
                <span className="text-[15px]">{money(priceOf(p.slug))}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CRAFT */}
      <section id="craft" className="gutter pb-[180px] pt-10">
        <div className="flex flex-wrap items-center gap-[72px]">
          <div className="min-w-0 flex-[1_1_420px] overflow-hidden rounded-[28px] bg-panel">
            <Image
              src={crane.detail.src}
              width={crane.detail.w}
              height={crane.detail.h}
              alt="Close view of raised blossom embroidery on the shoulder"
              className="reveal block h-auto w-full"
            />
          </div>
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-10">
            <div className="flex flex-col gap-5">
              <span className="eyebrow">The craft</span>
              <h2 className="display text-[clamp(40px,5vw,72px)] leading-none">
                Thread you can <em className="italic text-copper">see rise.</em>
              </h2>
            </div>
            <div className="rise flex flex-col border-t border-white/10">
              {[
                ["Sleeve to sleeve", "The scene runs the full length of both arms, not a single patch."],
                ["Raised relief", "Dense stitching lifts each petal and feather off the fleece."],
                ["A mirrored pair", "Left and right sleeves reflect each other, crane facing crane."],
              ].map(([h, t]) => (
                <div key={h} className="flex flex-wrap gap-x-8 gap-y-2 border-b border-white/10 py-[26px]">
                  <h3 className="m-0 basis-[200px] text-base font-medium">{h}</h3>
                  <p className="m-0 min-w-[220px] flex-1 text-[15px] leading-[1.65] text-mute">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="gutter relative flex flex-col items-center gap-8 overflow-hidden py-[200px] text-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 70% at 22% 50%, #1B2230 0%, rgba(10,11,14,0) 100%), radial-gradient(ellipse 45% 70% at 78% 50%, #2A1A3A 0%, rgba(10,11,14,0) 100%), #0A0B0E",
          }}
        />
        {crane.artLeft && (
          <Image
            src={crane.artLeft.src}
            width={crane.artLeft.w}
            height={crane.artLeft.h}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-[4%] top-1/2 h-[130%] w-auto max-w-none -translate-y-1/2 opacity-[0.26]"
          />
        )}
        <Image
          src={bloom.pair.src}
          width={bloom.pair.w}
          height={bloom.pair.h}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-[12%] top-1/2 h-[125%] w-auto max-w-none -translate-y-1/2 opacity-[0.26]"
        />
        <h2 className="display rise relative max-w-[900px] text-[clamp(44px,7vw,104px)] leading-none">
          The sleeves tell it. <em className="italic text-copper">You wear it.</em>
        </h2>
        <div className="relative flex flex-wrap justify-center gap-3.5">
          <Link href={`/products/${crane.slug}`} className="btn btn-fill">
            Shop {crane.name}
          </Link>
          <Link href={`/products/${bloom.slug}`} className="btn btn-line">
            Shop {bloom.name}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
