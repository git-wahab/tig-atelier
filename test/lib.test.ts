import { describe, expect, it } from "vitest";
import { cx } from "@/lib/cx";
import { currency, money, priceOf, prices, sizes } from "@/lib/config";
import { getProduct, products } from "@/lib/products";
import { faqs } from "@/lib/faq";
import { accentVar, glowVar } from "@/lib/tokens";
import { brand } from "@/lib/brand";

describe("cx", () => {
  it("joins the truthy parts with a single space", () => {
    expect(cx("a", "b", "c")).toBe("a b c");
  });

  it("drops false, null, undefined and empty strings", () => {
    expect(cx("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("returns an empty string when nothing is truthy", () => {
    expect(cx(false, null, undefined)).toBe("");
    expect(cx()).toBe("");
  });

  it("keeps the order it was given", () => {
    expect(cx("btn", "btn-fill", "w-full")).toBe("btn btn-fill w-full");
  });
});

describe("money", () => {
  it("always shows two decimal places", () => {
    expect(money(120)).toBe("$120.00");
    expect(money(0)).toBe("$0.00");
    expect(money(9.5)).toBe("$9.50");
  });

  it("rounds to the nearest cent", () => {
    expect(money(10.005)).toBe("$10.01");
    expect(money(10.004)).toBe("$10.00");
  });

  it("uses the configured currency symbol", () => {
    expect(money(1)).toBe(`${currency}1.00`);
  });
});

describe("priceOf", () => {
  it("returns the configured price for a known slug", () => {
    expect(priceOf("whispering-crane-bird")).toBe(120);
    expect(priceOf("midnight-bloom")).toBe(120);
  });

  it("falls back to 0 for an unknown slug rather than undefined", () => {
    expect(priceOf("no-such-hoodie")).toBe(0);
  });

  it("does not read through to Object.prototype", () => {
    expect(priceOf("toString")).toBe(0);
    expect(priceOf("constructor")).toBe(0);
  });
});

describe("getProduct", () => {
  it("finds a product by slug", () => {
    expect(getProduct("whispering-crane-bird")?.name).toBe("Whispering Crane Bird");
    expect(getProduct("midnight-bloom")?.name).toBe("Midnight Bloom");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProduct("no-such-hoodie")).toBeUndefined();
  });
});

describe("product data", () => {
  it("has at least one product", () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it("gives every product a unique slug", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses url-safe slugs", () => {
    for (const p of products) {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("prices every product, so no hoodie can be added at $0", () => {
    for (const p of products) {
      expect(prices[p.slug], `missing price for ${p.slug}`).toBeGreaterThan(0);
    }
  });

  it("only references accent and glow tokens that resolve to a CSS variable", () => {
    for (const p of products) {
      expect(accentVar[p.accent], `unknown accent on ${p.slug}`).toBeDefined();
      expect(glowVar[p.glow], `unknown glow on ${p.slug}`).toBeDefined();
    }
  });

  it("reassembles the hero title from its parts", () => {
    for (const p of products) {
      const { before, accent, after } = p.titleParts;
      expect(before + accent + after).toBe(p.name);
    }
  });

  it("points every image at a local path with positive dimensions", () => {
    for (const p of products) {
      const images = [
        p.hoodie,
        p.pair,
        p.sleeveLeft,
        p.sleeveRight,
        p.detail,
        p.artLeft,
        p.artRight,
      ].filter((i): i is NonNullable<typeof i> => Boolean(i));

      for (const img of images) {
        expect(img.src, `${p.slug} image src`).toMatch(/^\/images\/.+\.(jpg|png|webp)$/);
        expect(img.w, `${img.src} width`).toBeGreaterThan(0);
        expect(img.h, `${img.src} height`).toBeGreaterThan(0);
      }
    }
  });

  it("gives the close-up an alt text, since it carries meaning", () => {
    for (const p of products) {
      expect(p.closeUp.alt.trim().length).toBeGreaterThan(0);
    }
  });

  it("only uses mirror variants the component knows how to animate", () => {
    for (const p of products) {
      expect(["slide", "rise"]).toContain(p.mirror.variant);
    }
  });

  it("gives every caption a label, title and text", () => {
    for (const p of products) {
      expect(p.captions.length).toBeGreaterThan(0);
      for (const c of p.captions) {
        expect(c.label.trim()).not.toBe("");
        expect(c.title.trim()).not.toBe("");
        expect(c.text.trim()).not.toBe("");
      }
    }
  });
});

describe("sizes", () => {
  it("offers sizes and keeps the default M among them", () => {
    expect(sizes.length).toBeGreaterThan(0);
    expect(sizes).toContain("M");
  });

  it("has no duplicates", () => {
    expect(new Set(sizes).size).toBe(sizes.length);
  });
});

describe("faq data", () => {
  it("is not empty, since FaqList opens faqs[0] on mount", () => {
    expect(faqs.length).toBeGreaterThan(0);
    expect(faqs[0].id).toBeTruthy();
  });

  it("gives every entry a unique id, used for aria-controls", () => {
    const ids = faqs.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every entry a question, an answer and a group", () => {
    for (const f of faqs) {
      expect(f.q.trim(), `${f.id} question`).not.toBe("");
      expect(f.a.trim(), `${f.id} answer`).not.toBe("");
      expect(f.group.trim(), `${f.id} group`).not.toBe("");
    }
  });

  it("keeps each group's entries contiguous, so headings are not repeated", () => {
    const seen: string[] = [];
    for (const f of faqs) {
      if (seen[seen.length - 1] !== f.group) seen.push(f.group);
    }
    expect(new Set(seen).size).toBe(seen.length);
  });
});

describe("brand", () => {
  it("has a name for the header, footer and metadata", () => {
    expect(brand.name.trim()).not.toBe("");
  });
});
