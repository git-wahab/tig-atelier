export type Faq = { id: string; group: string; q: string; a: string };

/** Answers in [BRACKETS] are placeholders. Replace them with your real policies. */
export const faqs: Faq[] = [
  {
    id: "q1",
    group: "The designs",
    q: "Where is the embroidery on the hoodie?",
    a: "On both sleeves, from the shoulder down to the cuff. The body of the hoodie is left plain so the design stands out.",
  },
  {
    id: "q2",
    group: "The designs",
    q: "How many designs are there?",
    a: "Two. Whispering Crane Bird on ivory fleece, and Midnight Bloom on charcoal fleece.",
  },
  {
    id: "q3",
    group: "The designs",
    q: "Are the two sleeves identical?",
    a: "They mirror each other. On Whispering Crane Bird the two cranes face each other across the body, and on Midnight Bloom the lavender sprays curve in toward the chest.",
  },
  { id: "q4", group: "Sizing and care", q: "How do I choose my size?", a: "[SIZE GUIDE AND FIT NOTES]" },
  {
    id: "q5",
    group: "Sizing and care",
    q: "How should I wash an embroidered hoodie?",
    a: "[CARE INSTRUCTIONS]",
  },
  { id: "q6", group: "Orders and delivery", q: "How long does delivery take?", a: "[DELIVERY TIMES]" },
  { id: "q7", group: "Orders and delivery", q: "Which countries do you ship to?", a: "[SHIPPING REGIONS]" },
  {
    id: "q8",
    group: "Orders and delivery",
    q: "Can I return or exchange a hoodie?",
    a: "[RETURN AND EXCHANGE POLICY]",
  },
  { id: "q9", group: "Orders and delivery", q: "Will there be more designs?", a: "[NEXT DESIGN PLANS]" },
];
