import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionIntro from "@/components/ui/SectionIntro";
import SpecRows from "@/components/ui/SpecRows";
import { products } from "@/lib/products";

const rows = [
  {
    heading: "Sleeve to sleeve",
    text: "The scene runs the full length of both arms, not a single patch.",
  },
  { heading: "Raised relief", text: "Dense stitching lifts each petal and feather off the fleece." },
  {
    heading: "A mirrored pair",
    text: "Left and right sleeves reflect each other, crane facing crane.",
  },
];

export default function Craft() {
  const [crane] = products;

  return (
    <Section id="craft">
      <div className="flex flex-wrap items-center gap-[72px]">
        <div className="min-w-0 flex-[1_1_420px] overflow-hidden rounded-[28px] bg-surface-raised">
          <Image
            src={crane.detail.src}
            width={crane.detail.w}
            height={crane.detail.h}
            alt="Close view of raised blossom embroidery on the shoulder"
            className="reveal block h-auto w-full"
          />
        </div>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-10">
          <SectionIntro
            eyebrow="The craft"
            size="lg"
            title={
              <>
                Thread you can <em className="italic text-accent">see rise.</em>
              </>
            }
          />
          <SpecRows rows={rows} className="rise" />
        </div>
      </div>
    </Section>
  );
}
