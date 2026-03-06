// ============================================================
// types-universal.ts — Props universel pour full automation
// ============================================================
// UN seul objet de props injecté par le script Python
// depuis chaque ligne du fichier Excel.
// Aucun champ hardcodé : tout vient du planning éditorial.
// ============================================================

/** Ligne brute Excel — identique à ContentRow */
export interface ContentRow {
  semaine:               string;
  phase:                 string;
  jour:                  string;
  date_publication:      string;
  pilier:                string;
  format:                string;
  produit_principal:     string;
  produit_tags_shopify:  string;
  plateforme_primaire:   string;
  plateformes_repurpose: string;
  hook_fr:               string;
  hook_darija:           string;
  script_angle:          string;
  storytelling_emotion:  string;
  cta:                   string;
  hashtags:              string;
  horaire_optimal:       string;
  status_brief:          string | null;
  status_script:         string | null;
  status_visual:         string | null;
  status_publication:    string | null;
  url_post:              string | null;
}

// ─── Mapping format Excel → ID composition ────────────────────
export type TemplateId = 'U1-FlashHook' | 'U2-TutoPunch' | 'U3-StorySlide';

export const FORMAT_TO_TEMPLATE: Record<string, TemplateId> = {
  'reel-15':         'U1-FlashHook',
  'reel-20':         'U1-FlashHook',
  'reel-30':         'U1-FlashHook',
  'story':           'U1-FlashHook',
  'short':           'U1-FlashHook',
  'video-education': 'U2-TutoPunch',
  'video-tutorial':  'U2-TutoPunch',
  'video-routine':   'U2-TutoPunch',
  'video-60':        'U2-TutoPunch',
  'carousel':        'U3-StorySlide',
  'carousel-5':      'U3-StorySlide',
  'guide':           'U3-StorySlide',
};

// ─── Props universel — injectable depuis n'importe quelle ligne ──
export interface UniversalVideoProps {
  // ── Identité marque ─────────────────────────────────────────
  brandName:          string;         // "JODHUR"
  brandLogo?:         string;         // URL logo
  primaryColor?:      string;         // Override couleur (défaut: terracotta)
  accentColor?:       string;         // Override accent (défaut: gold)

  // ── Données Excel mappées ────────────────────────────────────
  semaine:            string;         // "S1"
  phase:              string;         // "Découverte"
  pilier:             string;         // "Héritage & Émotion"
  datePublication:    string;         // "2025-01-06"
  plateforme:         string;         // "TikTok"

  // ── Contenu textuel ──────────────────────────────────────────
  hookFr:             string;         // Hook accrocheur FR
  hookDarija:         string;         // Hook darija RTL
  productName:        string;         // "Savon Beldi"
  scriptAngle:        string;         // script_angle du Excel
  storytellingEmotion:string;         // storytelling_emotion
  cta:                string;         // "DM pour commander"
  hashtags:           string;         // "#JODHUR #cosmétiques..."

  // ── Médias (URLs images) ─────────────────────────────────────
  productImage:       string;         // Image produit HD
  backgroundImage?:   string;         // Fond/ambiance
  image2?:            string;         // 2ème image optionnelle
  image3?:            string;         // 3ème image optionnelle

  // ── CTA Maroc ────────────────────────────────────────────────
  whatsappNumber?:    string;         // "+212600000000"
  websiteUrl?:        string;         // "jodhur.ma"
  ctaVariant?:        'whatsapp' | 'link-bio' | 'website';

  // ── Champs spécifiques U1 (Promo / Produit) ──────────────────
  originalPriceMAD?:  number;         // Prix barré (ex: 250)
  promoPriceMAD?:     number;         // Prix promo (ex: 149)
  promoCode?:         string;         // "JODHUR10"
  urgencyText?:       string;         // "Stock limité · 48h"
  benefits?:          string[];       // ["Sans paraben", "Halal", "Made in Maroc"]
  region?:            string;         // "Souss-Massa"
  heritageYears?:     string;         // "3000 ans"

  // ── Champs spécifiques U2 (Tutorial / Éducation) ─────────────
  problemStatement?:  string;         // "Peau sèche ?"
  steps?:             TutoStep[];     // Étapes du tutoriel
  resultsText?:       string;         // "Résultats visibles en 7 jours"
  tipBonus?:          string;         // Tip final

  // ── Champs spécifiques U3 (Carousel / Guide) ─────────────────
  slides?:            SlideData[];    // 3-5 slides
  carouselTitle?:     string;         // Titre de la série
  saveText?:          string;         // "Enregistre 🔖 pour plus tard"
}

export interface TutoStep {
  number:      number;
  title:       string;
  desc:        string;
  image?:      string;
  emoji?:      string;
  durationSec: number;  // Durée d'affichage de cette étape
}

export interface SlideData {
  title:      string;
  subtitle?:  string;
  body:       string;
  image?:     string;
  bgColor?:   string;
  textColor?: string;
  highlight?: string;
  emoji?:     string;
}
