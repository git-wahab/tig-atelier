import Display from "@/components/ui/Display";
import Section from "@/components/ui/Section";

/** The words arrive one phrase at a time as the section scrolls into view. */
export default function Statement() {
  return (
    <Section rhythm="statement" className="flex justify-center">
      <Display level={2} size="lg" className="max-w-[1100px] text-center">
        <span className="word">Most brands sell hoodies.</span>
        <span className="word italic text-accent"> We sell the design</span>
        <span className="word"> that happens to be stitched onto one.</span>
      </Display>
    </Section>
  );
}
