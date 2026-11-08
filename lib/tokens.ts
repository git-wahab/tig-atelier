export type AccentToken = "copper" | "lavender";
export type GlowToken = "steel" | "plum";

export const accentVar: Record<AccentToken, string> = {
  copper: "var(--accent-copper)",
  lavender: "var(--accent-lavender)",
};

export const glowVar: Record<GlowToken, string> = {
  steel: "var(--glow-steel)",
  plum: "var(--glow-plum)",
};
