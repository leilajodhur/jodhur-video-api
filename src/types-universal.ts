// ============================================================
// types-universal.ts — Props universel pour full automation
// ============================================================

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
  benefits?:          string[]; // MAX 2
  region?:            string; 
  heritageYears?:     string; 

  problemStatement?:  string; 
  steps?:             TutoStep[]; // MAX 2-3
  resultsText?:       string; 
  tipBonus?:          string; 

  slides?:            SlideData[]; // MAX 4
  carouselTitle?:     string; 
  saveText?:          string; 
}

export interface TutoStep {
  number:      number;
  title:       string;
  desc:        string;
  image?:      string;
  emoji?:      string;
  durationSec: number; 
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

export type T1PromoFlashProps = UniversalVideoProps;
export type T2HeritageStoryProps = UniversalVideoProps;
export type T3ProduitRegionProps = UniversalVideoProps & { originFact: string; funFacts: string[]; extractionSteps: { label: string; durationSec: number }[]; extractionImage?: string; ingredients?: string; regionImage?: string; };
export type T4TutorialProps = UniversalVideoProps;
export type T5CarouselProps = UniversalVideoProps;
