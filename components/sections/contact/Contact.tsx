import ContactForm from "@/components/sections/contact/ContactForm";
import DetailList from "@/components/ui/DetailList";
import GlowBackdrop from "@/components/ui/GlowBackdrop";
import Panel from "@/components/ui/Panel";
import Section from "@/components/ui/Section";
import SectionIntro from "@/components/ui/SectionIntro";

const details = [
  { label: "Email", value: "[EMAIL ADDRESS]" },
  { label: "Phone or WhatsApp", value: "[PHONE NUMBER]" },
  { label: "Hours", value: "[SUPPORT HOURS]" },
  { label: "Instagram", value: "[HANDLE]" },
];

export default function Contact() {
  return (
    <Section id="contact" rhythm="band" clip>
      <GlowBackdrop stops={[{ glow: "plum", size: "50% 60%", at: "85% 20%" }]} />

      <div className="relative z-[1] flex flex-wrap items-start gap-[72px]">
        <div className="flex max-w-[460px] flex-[1_1_340px] flex-col gap-5">
          <SectionIntro
            eyebrow="Contact us"
            size="lg"
            title={
              <>
                Write to <em className="italic">us.</em>
              </>
            }
            lede="Questions about an order, a size or a design? Send a note and we will reply within [RESPONSE TIME]."
            className="from-l"
          />
          <DetailList items={details} className="mt-3" />
        </div>
        <Panel className="from-r min-w-0 flex-[1.2_1_440px]">
          <ContactForm />
        </Panel>
      </div>
    </Section>
  );
}
