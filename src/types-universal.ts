// ============================================================
// types-universal.ts — Props universel pour full automation
// (Version Rapide : 15s - 20s)
// ============================================================

export interface ContentRow {
  semaine:                 string;
  phase:                   string;
  jour:                    string;
  date_publication:        string;
  pilier:                  string;
  format:                  string;
  produit_principal:       string;
  produit_tags_shopify:  string;
  plateforme_primaire:     string;
  plateformes_repurpose: string;
  hook_fr:                 string;
  hook_darija:             string;
  script_angle:          string;
  storytelling_emotion:  string;
  cta:                     string;
  hashtags:                string;
  horaire_optimal:         string;
  status_brief:          string | null;
  status_script:         string | null;
  status_visual:         string | null;
  status_publication:    string | null;
  url_post:              string | null;
}

export type TemplateId = 'U1-FlashHook' | 'U2-TutoPunch' | 'U3-StorySlide';

export const FORMAT_TO_TEMPLATE: Record<string, TemplateId> = {
  'reel-15':         'U1-FlashHook',
  'reel-20':         'U1-FlashHook',
  'story':           'U1-FlashHook',
  'short':           'U1-FlashHook',
  'video-education': 'U2-TutoPunch',
  'video-tutorial':  'U2-TutoPunch',
  'carousel':        'U3-StorySlide',
  'guide':           'U3-StorySlide',
};

export interface UniversalVideoProps {
  brandName:          string; 
  brandLogo?:         string; 
  primaryColor?:      string; 
  accentColor?:       string; 

  semaine:            string; 
  phase:              string; 
  pilier:             string; 
  datePublication:    string; 
  plateforme:         string; 

  hookFr:             string; 
  hookDarija:         string; 
  productName:        string; 
  scriptAngle:        string; 
  storytellingEmotion:string; 
  cta:                string; 
  hashtags:           string; 

  productImage:       string; 
  backgroundImage?:   string; 
  image2?:            string; 
  image3?:            string; 

  whatsappNumber?:    string; 
  websiteUrl?:        string; 
  ctaVariant?:        'whatsapp' | 'link-bio' | 'website';

  originalPriceMAD?:  number; 
  promoPriceMAD?:     number; 
  promoCode?:         string; 
  urgencyText?:       string; 
  benefits?:          string[]; // MAX 2 BÉNÉFICES COURTS
  region?:            string; 
  heritageYears?:     string; 

  problemStatement?:  string; 
  steps?:             TutoStep[]; // MAX 2-3 ÉTAPES RAPIDES (4s chacune)
  resultsText?:       string; 
  tipBonus?:          string; 

  slides?:            SlideData[]; // MAX 4 SLIDES (5s chacune)
  carouselTitle?:     string; 
  saveText?:          string; 
}

export interface TutoStep {
  number:      number;
  title:       string;
  desc:        string;
  image?:      string;
  emoji?:      string;
  durationSec: number; // Forcer à 3 ou 4 secondes max dans n8n
}

export interface SlideData {
  title:      string;
  subtitle?:  string;
  body:       string; // TRÈS COURT (max 5-6 mots)
  image?:     string;
  bgColor?:   string;
  textColor?: string;
  highlight?: string;
  emoji?:     string;
}
