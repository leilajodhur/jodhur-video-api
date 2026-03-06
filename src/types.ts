// ============================================================
// JODHUR — Interfaces TypeScript
// Correspondent aux colonnes de Full automation.xlsx
// ============================================================

/** Ligne brute du fichier Excel (colonnes 1:22) */
export interface ContentRow {
  semaine:              string;   // S1–S8
  phase:                string;   // Découverte | Éducation | Conversion
  jour:                 string;   // Lun | Mar | ...
  date_publication:     string;   // ISO date
  pilier:               string;   // Héritage & Émotion | ...
  format:               string;   // Reel 30s | Carousel 5 slides | ...
  produit_principal:    string;   // Ex: "Savon Beldi"
  produit_tags_shopify: string;   // Ex: "type-savon, zone-corps, ..."
  plateforme_primaire:  string;   // TikTok | IG | FB
  plateformes_repurpose:string;   // "IG Reels, FB Story"
  hook_fr:              string;   // Hook en français
  hook_darija:          string;   // Hook en darija/arabe
  script_angle:         string;   // Description des scènes
  storytelling_emotion: string;   // Message émotionnel
  cta:                  string;   // Call to action
  hashtags:             string;   // Hashtags string
  horaire_optimal:      string;   // "20:00"
  status_brief:         string | null;
  status_script:        string | null;
  status_visual:        string | null;
  status_publication:   string | null;
  url_post:             string | null;
}

// ============================================================
// Props pour chaque template Remotion
// ============================================================

/** Props communs à tous les templates */
export interface BaseProps {
  // Identité JODHUR
  brandName:          string;   // "JODHUR"
  brandLogo?:         string;   // URL du logo SVG/PNG
  brandColorPrimary?: string;   // Override couleur primaire
  // Contenu (mappé depuis ContentRow)
  hookFr:             string;   // ContentRow.hook_fr
  hookDarija:         string;   // ContentRow.hook_darija
  cta:                string;   // ContentRow.cta
  hashtags:           string;   // ContentRow.hashtags
  // Média
  productImage:       string;   // URL image produit HD
  backgroundImage?:   string;   // URL fond/ambiance
  // CTA Maroc
  whatsappNumber?:    string;   // "+212600000000"
  websiteUrl?:        string;   // "jodhur.ma"
}

/** T1 — Promo Flash 30s */
export interface T1PromoFlashProps extends BaseProps {
  productName:        string;   // "Kit Hammam"
  originalPriceMAD:   number;   // 250 (barré)
  promoPriceMAD:      number;   // 149
  promoCode?:         string;   // "HERITAGE25"
  urgencyText:        string;   // "Stock limité" | "48h seulement"
  benefits:           string[]; // 3 bénéfices courts
  promoEndDate?:      string;   // "Dimanche minuit"
  productImage2?:     string;   // 2ème image produit
  productImage3?:     string;   // 3ème image produit
}

/** T2 — Heritage Story 30s */
export interface T2HeritageStoryProps extends BaseProps {
  productName:        string;   // "Savon Beldi"
  storyText:          string;   // storytelling_emotion du Excel
  heritageYears?:     string;   // "3000 ans"
  region?:            string;   // "Souss-Massa"
  emotion:            string;   // Phrase émotionnelle courte
  atmosphereImage:    string;   // URL image patrimoine/ambiance
}

/** T3 — Produit & Région 45s */
export interface T3ProduitRegionProps extends BaseProps {
  productName:        string;   // "Huile d'Argan"
  region:             string;   // "Souss-Massa"
  originFact:         string;   // Fait sur l'origine
  extractionSteps:    { label: string; durationSec: number }[];
  funFacts:           string[]; // 2-3 faits courts
  ingredients?:       string;   // Composé actif principal
  regionImage?:       string;   // Photo de la région
  extractionImage?:   string;   // Photo extraction
}

/** T4 — Tutorial / Routine 60s */
export interface T4TutorialProps extends BaseProps {
  productName:        string;
  problemStatement:   string;   // "Peau sèche ? Voici..."
  steps:              {
    number:     number;
    title:      string;
    desc:       string;
    image?:     string;
    durationSec: number;
  }[];
  resultsText:        string;   // "Teste 21 jours et reviens nous dire"
  tipBonus?:          string;   // Tip supplémentaire
}

/** T5 — Carousel animé 5 slides */
export interface T5CarouselProps extends BaseProps {
  slides:             {
    title:       string;
    subtitle?:   string;
    body:        string;
    image?:      string;
    bgColor?:    string;
    textColor?:  string;
    highlight?:  string; // mot mis en valeur
  }[];
  carouselTitle:      string;   // Titre global
  saveText:           string;   // "Sauvegarde ce post ↗"
}

// ============================================================
// Type union de tous les templates
// ============================================================
export type AnyTemplateProps =
  | T1PromoFlashProps
  | T2HeritageStoryProps
  | T3ProduitRegionProps
  | T4TutorialProps
  | T5CarouselProps;
