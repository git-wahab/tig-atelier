/**
 * Store settings. Edit these before launch.
 *
 * The prices below are SAMPLE values so the cart can show totals.
 * Replace them with your real prices, or load them from your store backend.
 */
export const currency = "$";

export const prices: Record<string, number> = {
  "whispering-crane-bird": 120,
  "midnight-bloom": 120,
};

export const sizes = ["XS", "S", "M", "L", "XL"];

export function money(amount: number): string {
  return currency + amount.toFixed(2);
}

export function priceOf(slug: string): number {
  return prices[slug] ?? 0;
}
