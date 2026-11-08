import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import Eyebrow from "@/components/ui/Eyebrow";
import GlowSpot from "@/components/ui/GlowSpot";
import Lede from "@/components/ui/Lede";
import Section from "@/components/ui/Section";

export default function Hero() {
  return (
    <Section rhythm="hero" clip className="flex flex-col gap-7">
      <GlowSpot glow="plum" drift className="-right-[10%] -top-[20%] h-[140%] w-[70%]" />
      <GlowSpot glow="steel" className="-bottom-[40%] -left-[10%] h-[120%] w-[60%]" />

      <div className="relative z-[1] flex max-w-[860px] flex-col gap-6">
        <Eyebrow>Help</Eyebrow>
        <Display level={1} size="hero">
          Questions, <em className="italic text-accent">answered.</em>
        </Display>
        <Lede className="max-w-[520px]">
          Everything about the designs, sizing, delivery and care. If it is not here, write to us.
        </Lede>
        <div className="flex flex-wrap gap-3.5">
          <Button href="#faq">Read the FAQ</Button>
          <Button href="#contact" variant="line">
            Contact us
          </Button>
        </div>
      </div>
    </Section>
  );
}
