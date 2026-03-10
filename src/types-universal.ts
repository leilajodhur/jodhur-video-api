// ============================================================
// types-universal.ts — Props universel pour full automation (Pro Version):
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

export type TemplateId = 'T1-PromoFlash' | 'T2-HeritageStory' | 'T3-ProduitRegion' | 'T4-TutorialRoutine' | 'T5-CarouselAnime';

export const FORMAT_TO_TEMPLATE: Record<string, TemplateId> = {
  'reel-15':         'T1-PromoFlash',
  'reel-20':         'T1-PromoFlash',
  'reel-30':         'T1-PromoFlash',
  'story':           'T1-PromoFlash',
  'short':           'T1-PromoFlash',
  'video-education': 'T4-TutorialRoutine',
  'video-tutorial':  'T4-TutorialRoutine',
  'video-routine':   'T4-TutorialRoutine',
  'video-60':        'T4-TutorialRoutine',
  'carousel':        'T5-CarouselAnime',
  'carousel-5':      'T5-CarouselAnime',
  'guide':           'T5-CarouselAnime',
};

export interface UniversalVideoProps {
  // ── الأساسيات ──
  brandName: string; 
  brandLogo?: string; 
  productName: string; 
  productImage: string; 
  
  // ── النصوص ──
  hookFr: string; 
  hookDarija: string; 
  scriptAngle?: string; 
  storytellingEmotion?: string; 
  cta: string; 
  hashtags?: string; 

  // ── التحكم المنفصل في الصور والخلفيات ──
  // القالب 1
  hookBgImage?: string;       
  productBgImage?: string;    
  priceBgImage?: string;      
  ctaBgImage?: string;        
  
  // القالب 2
  atmosphereBgImage?: string;
  storyBgImage?: string;
  heritageBgImage?: string;

  // القالب 3
  regionBgImage?: string;
  extractionBgImage?: string;
  
  // القالب 4
  problemBgImage?: string;
  tutorialBgImage?: string;
  resultsBgImage?: string;

  // دعم القديم (لكي لا تتعطل الأكواد القديمة إن وجدت)
  backgroundImage?: string;
  image2?: string;
  image3?: string;

  // ── التحكم في الألوان من n8n ──
  primaryColor?: string;  
  accentColor?: string;   
  customOverlayOpacity?: number;

  // ── متغيرات مخصصة للقوالب ──
  whatsappNumber?: string; 
  websiteUrl?: string; 
  ctaVariant?: 'whatsapp' | 'link-bio' | 'website';
  
  originalPriceMAD?: number; 
  promoPriceMAD?: number; 
  promoCode?: string; 
  urgencyText?: string; 
  benefits?: string[]; 
  
  region?: string; 
  heritageYears?: string; 
  
  problemStatement?: string; 
  steps?: TutoStep[]; 
  resultsText?: string; 
  tipBonus?: string; 
  
  slides?: SlideData[]; 
  carouselTitle?: string; 
  saveText?: string; 
}

export interface TutoStep {
  number: number;
  title: string;
  desc: string;
  image?: string;
  emoji?: string;
  durationSec: number; 
}

export interface SlideData {
  title: string;
  subtitle?: string;
  body: string;
  image?: string;
  bgColor?: string;
  textColor?: string;
  highlight?: string;
  emoji?: string;
}

export type T1PromoFlashProps = UniversalVideoProps;
export type T2HeritageStoryProps = UniversalVideoProps;
// تم دمج خصائص T3 بدقة لكي لا تنقص أي معلومة مثل originFact
export type T3ProduitRegionProps = UniversalVideoProps & { originFact: string; funFacts: string[]; extractionSteps: { label: string; durationSec: number }[]; extractionImage?: string; ingredients?: string; regionImage?: string; };
export type T4TutorialProps = UniversalVideoProps;
export type T5CarouselProps = UniversalVideoProps;
