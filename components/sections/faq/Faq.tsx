import FaqList from "@/components/sections/faq/FaqList";
import Section from "@/components/ui/Section";
import SectionIntro from "@/components/ui/SectionIntro";

export default function Faq() {
  return (
    <Section id="faq">
      <div className="flex flex-wrap items-start gap-16">
        <SectionIntro
          eyebrow="FAQ"
          title="The short answers."
          lede="Tap a question to open it. One answer stays open at a time."
          className="from-l max-w-[380px] flex-[1_1_280px]"
        />
        <div className="min-w-0 flex-[2_1_520px]">
          <FaqList />
        </div>
      </div>
    </Section>
  );
}
