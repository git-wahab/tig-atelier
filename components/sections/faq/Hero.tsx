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
          Questions, <em className="italic">answered.</em>
        </Display>
        <Lede className="max-w-[520px]">
          Everything about the designs, sizing, delivery and care. If it is not here, write to us.
        </Lede>
        <div className="flex flex-wrap gap-3.5">
          <Button href="#faq">Read the FAQ</Button>
          <Button href="/contact" variant="line">
            Contact us
          </Button>
        </div>
      </div>
    </Section>
  );
}
