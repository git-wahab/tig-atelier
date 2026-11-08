export type Img = { src: string; w: number; h: number };

export type Product = {
  slug: string;
  name: string;
  /** First and last words around the italic accent word in the hero title. */
  titleParts: { before: string; accent: string; after: string };
  number: string; // "Design 01"
  accent: string; // CSS color for eyebrow, rails, buttons
  glow: string; // dark tint used in radial glows
  colour: string; // fleece colour
  threadNote: string;
  tagline: string;
  cardBlurb: string;
  hoodie: Img;
  hoodiePosition: string; // object-position for cards
  pair: Img; // both sleeve artworks side by side (cutout)
  artLeft?: Img;
  artRight?: Img;
  sleeveLeft: Img;
  sleeveRight: Img;
  detail: Img;
  statement: { first: string; second: string };
  sleeveIntro: string;
  captions: { label: string; title: string; text: string }[];
  closeUp: { title: string; alt: string };
  mirror: { title: string; text: string; variant: "slide" | "rise" };
};

export const products: Product[] = [
  {
    slug: "whispering-crane-bird",
    name: "Whispering Crane Bird",
    titleParts: { before: "Whispering ", accent: "Crane", after: " Bird" },
    number: "Design 01",
    accent: "#E39A78",
    glow: "#1B2230",
    colour: "Ivory",
    threadNote: "Ivory fleece with blue, silver and copper-rose thread.",
    tagline:
      "Two cranes in flight among cherry blossom, stitched from shoulder to cuff on both sleeves.",
    cardBlurb:
      "Two cranes in flight among cherry blossom, embroidered in blue, silver and copper-rose on ivory fleece.",
    hoodie: { src: "/images/crane-hoodie.jpg", w: 843, h: 1264 },
    hoodiePosition: "50% 20%",
    pair: { src: "/images/crane-pair.webp", w: 1023, h: 1537 },
    artLeft: { src: "/images/crane-art-left.webp", w: 511, h: 1377 },
    artRight: { src: "/images/crane-art-right.webp", w: 512, h: 1377 },
    sleeveLeft: { src: "/images/crane-sleeve-left.jpg", w: 600, h: 1480 },
    sleeveRight: { src: "/images/crane-sleeve-right.jpg", w: 566, h: 1440 },
    detail: { src: "/images/crane-detail.jpg", w: 810, h: 810 },
    statement: { first: "The hoodie is the canvas.", second: " The crane is the point." },
    sleeveIntro:
      "Keep scrolling and the embroidery travels down the arm, the way the scene is meant to be read.",
    captions: [
      {
        label: "At the shoulder",
        title: "Blossom branches open the story.",
        text: "Clusters of raised blossoms climb over the shoulder in copper-rose thread.",
      },
      {
        label: "Along the arm",
        title: "A crane in mid-flight.",
        text: "Layered blue and silver stitches build every feather.",
      },
      {
        label: "At the cuff",
        title: "Roots reach the wrist.",
        text: "Twisting roots and a last spray of blossoms finish the scene.",
      },
    ],
    closeUp: {
      title: "Every petal is built from thread.",
      alt: "Close view of raised blossom embroidery",
    },
    mirror: {
      title: "Crane faces crane.",
      text: "Left and right sleeves reflect each other, so the two birds meet across the body.",
      variant: "slide",
    },
  },
  {
    slug: "midnight-bloom",
    name: "Midnight Bloom",
    titleParts: { before: "Midnight ", accent: "Bloom", after: "" },
    number: "Design 02",
    accent: "#B48CDB",
    glow: "#2A1A3A",
    colour: "Charcoal",
    threadNote: "Charcoal fleece with violet and green thread.",
    tagline: "Lavender climbing both sleeves, stitched in violet and green on deep charcoal.",
    cardBlurb:
      "Sprigs of lavender climb both sleeves in violet and green thread, set against deep charcoal fleece.",
    hoodie: { src: "/images/bloom-hoodie.jpg", w: 912, h: 1172 },
    hoodiePosition: "50% 25%",
    pair: { src: "/images/bloom-pair.webp", w: 1122, h: 1402 },
    sleeveLeft: { src: "/images/bloom-sleeve-left.jpg", w: 600, h: 1480 },
    sleeveRight: { src: "/images/bloom-sleeve-right.jpg", w: 592, h: 1500 },
    detail: { src: "/images/bloom-detail.jpg", w: 800, h: 800 },
    statement: { first: "The hoodie is the night.", second: " The lavender is the point." },
    sleeveIntro:
      "Keep scrolling and the lavender follows the arm from the top of the sleeve to the wrist.",
    captions: [
      {
        label: "At the shoulder",
        title: "Sprigs rise from the shoulder.",
        text: "Tall lavender stems lean over the top of the sleeve in light and deep violet.",
      },
      {
        label: "Along the arm",
        title: "Layer on layer of violet.",
        text: "Hundreds of small buds overlap in shifting tones, so the thread seems to catch the light.",
      },
      {
        label: "At the cuff",
        title: "Green stems gather at the wrist.",
        text: "Fine sage-green branches draw the whole spray together where the sleeve ends.",
      },
    ],
    closeUp: {
      title: "Every bud is a stitch.",
      alt: "Close view of lavender embroidery on the shoulder",
    },
    mirror: {
      title: "Two sprays, one silhouette.",
      text: "The sleeves reflect each other and curve in toward the body, like two hands of lavender.",
      variant: "rise",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
