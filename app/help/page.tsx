import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FaqList from "@/components/FaqList";
import ContactForm from "@/components/ContactForm";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "FAQ and Contact · Embroidered Hoodies",
  description: "Answers about the designs, sizing, delivery and care, and a way to write to us.",
};

const details = [
  ["Email", "[EMAIL ADDRESS]"],
  ["Phone or WhatsApp", "[PHONE NUMBER]"],
  ["Hours", "[SUPPORT HOURS]"],
  ["Instagram", "[HANDLE]"],
];

export default function HelpPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-x-clip">
      <SiteHeader
        overlay
        links={[
          { href: "/", label: "All designs" },
          { href: "#faq", label: "FAQ" },
          { href: "#contact", label: "Contact" },
        ]}
      />

      {/* HERO */}
      <section className="gutter relative flex flex-col gap-7 overflow-hidden pb-[120px] pt-[200px]">
        <div
          className="glow absolute -right-[10%] -top-[20%] z-0 h-[140%] w-[70%]"
          style={{ background: "radial-gradient(ellipse at center, #2A1A3A 0%, rgba(10,11,14,0) 65%)" }}
        />
        <div
          className="absolute -bottom-[40%] -left-[10%] z-0 h-[120%] w-[60%]"
          style={{ background: "radial-gradient(ellipse at center, #1B2230 0%, rgba(10,11,14,0) 65%)" }}
        />
        <div className="relative z-[1] flex max-w-[860px] flex-col gap-6">
          <span className="eyebrow">Help</span>
          <h1 className="display text-[clamp(52px,8vw,116px)] leading-[0.97]">
            Questions, <em className="italic text-copper">answered.</em>
          </h1>
          <p className="max-w-[520px] text-lg leading-[1.65] text-mute">
            Everything about the designs, sizing, delivery and care. If it is not here, write to us.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a href="#faq" className="btn btn-fill">Read the FAQ</a>
            <a href="#contact" className="btn btn-line">Contact us</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="gutter pb-40 pt-10">
        <div className="flex flex-wrap items-start gap-16">
          <div className="from-l flex max-w-[380px] flex-[1_1_280px] flex-col gap-[18px]">
            <span className="eyebrow">FAQ</span>
            <h2 className="display text-[clamp(36px,4.4vw,60px)] leading-[1.04]">The short answers.</h2>
            <p className="text-base leading-[1.7] text-mute">
              Tap a question to open it. One answer stays open at a time.
            </p>
          </div>
          <div className="min-w-0 flex-[2_1_520px]">
            <FaqList />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="gutter relative overflow-hidden bg-[#0E0B14] pb-40 pt-[140px]">
        <div
          className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse 50% 60% at 85% 20%, #2A1A3A 0%, rgba(14,11,20,0) 70%)" }}
        />
        <div className="relative z-[1] flex flex-wrap items-start gap-[72px]">
          <div className="from-l flex max-w-[460px] flex-[1_1_340px] flex-col gap-5">
            <span className="eyebrow !text-lavender">Contact us</span>
            <h2 className="display text-[clamp(40px,5vw,72px)] leading-none">
              Write to <em className="italic text-lavender">us.</em>
            </h2>
            <p className="text-base leading-[1.7] text-mute">
              Questions about an order, a size or a design? Send a note and we will reply within
              [RESPONSE TIME].
            </p>
            <div className="mt-3 flex flex-col border-t border-white/10">
              {details.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1.5 border-b border-white/10 py-[22px]">
                  <span className="text-xs uppercase tracking-[0.18em] text-dim">{label}</span>
                  <span className="text-[17px]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="from-r panel min-w-0 flex-[1.2_1_440px] !p-[clamp(24px,4vw,48px)]">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CLOSING LINKS */}
      <section className="gutter flex flex-col items-center gap-7 py-[140px] text-center">
        <h2 className="display rise max-w-[760px] text-[clamp(36px,5vw,72px)] leading-[1.04]">
          Still deciding between <em className="italic text-copper">two</em> sleeves?
        </h2>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Link href={`/products/${products[0].slug}`} className="btn btn-fill">
            {products[0].name}
          </Link>
          <Link href={`/products/${products[1].slug}`} className="btn btn-line">
            {products[1].name}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
