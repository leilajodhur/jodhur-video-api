// ============================================================
// JODHUR — Système typographique
// ============================================================

export const FONTS = {
  // Titres & Hooks — Impact visuel fort
  display:   '"Playfair Display", Georgia, serif',
  // Corps & Captions — Lisibilité TikTok/Reel
  body:      '"Inter", "Helvetica Neue", Arial, sans-serif',
  // Darija / Arabe — Texte arabe
  arabic:    '"Cairo", "Noto Kufi Arabic", "Arial Unicode MS", sans-serif',
  // Accents — Manuscrit / Authentique
  handwrite: '"Dancing Script", cursive',
} as const;

// Tailles — optimisées 1080x1920 (portrait)
export const FONT_SIZES = {
  hook:       96,   // Hook principal - très gros
  hookSub:    56,   // Sous-hook
  hookDarija: 72,   // Hook arabe/darija
  title:      72,   // Titre de section
  subtitle:   48,   // Sous-titre
  body:       38,   // Corps de texte
  caption:    52,   // Captions style TikTok
  price:      88,   // Prix principal
  priceSub:   52,   // Ancien prix barré
  cta:        44,   // CTA button
  badge:      36,   // Badge produit
  hashtag:    28,   // Hashtags
} as const;

// Poids
export const FONT_WEIGHTS = {
  regular:    400,
  medium:     500,
  semibold:   600,
  bold:       700,
  extrabold:  800,
  black:      900,
} as const;
