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
          { glow: "steel", size: "55% 65%", at: "15% 20%" },
          { glow: "plum", size: "50% 60%", at: "90% 90%", fade: "100%" },
        ]}
      />

      <div className="relative z-[1] flex max-w-[860px] flex-col gap-6">
        <Eyebrow>The collection</Eyebrow>
        <Display level={1} size="hero">
          Pick your <em className="italic">design.</em>
        </Display>
        <Lede className="max-w-[520px]">
          Both designs in one place. Open either one to see the embroidery up close.
        </Lede>
        <div className="flex flex-wrap gap-3.5">
          <Button href="#collection">See both designs</Button>
          <Button href="/faq" variant="line">
            Read the FAQ
          </Button>
        </div>
      </div>
    </Section>
  );
}
