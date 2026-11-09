import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import Eyebrow from "@/components/ui/Eyebrow";
import GlowBackdrop from "@/components/ui/GlowBackdrop";
import Lede from "@/components/ui/Lede";
import Section from "@/components/ui/Section";

export default function Hero() {
  return (
    <Section rhythm="hero" clip className="flex flex-col gap-7">
      <GlowBackdrop
        stops={[
          { glow: "plum", size: "55% 70%", at: "85% 15%" },
          { glow: "steel", size: "50% 60%", at: "10% 95%", fade: "100%" },
        ]}
      />

      <div className="relative z-[1] flex max-w-[860px] flex-col gap-6">
        <Eyebrow>Help</Eyebrow>
        <Display level={1} size="hero">
          Tell us what you <em className="italic">need.</em>
        </Display>
        <Lede className="max-w-[520px]">
          An order, a size, a design, or anything the FAQ did not cover.
        </Lede>
        <div className="flex flex-wrap gap-3.5">
          <Button href="#contact">Write to us</Button>
          <Button href="/faq" variant="line">
            Read the FAQ
          </Button>
        </div>
      </div>
    </Section>
  );
}
