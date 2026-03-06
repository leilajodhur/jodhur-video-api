// ============================================================
// JODHUR — Données mappées depuis Full automation.xlsx
// 49 lignes × 22 colonnes → 5 instances de templates
// Mise à jour : extraction Python du fichier source
// ============================================================

import type {
  T1PromoFlashProps,
  T2HeritageStoryProps,
  T3ProduitRegionProps,
  T4TutorialProps,
  T5CarouselProps,
} from '../types';

// Base commune à tous (override par template)
const BASE = {
  brandName: 'JODHUR',
  brandLogo: '/assets/jodhur-logo.svg',
  whatsappNumber: '+212600000000', // ← remplacer par vrai numéro
  websiteUrl: 'jodhur.ma',
};

// ============================================================
// INSTANCE 1 — T1_PromoFlash
// Source: S1/Sam → "Kit Hammam à 149 MAD"
// Colonnes: hook_fr, hook_darija, cta, produit_principal,
//           script_angle, hashtags
// ============================================================
export const INSTANCE_T1_KIT_HAMMAM: T1PromoFlashProps = {
  ...BASE,
  // ← hook_fr (S1, Sam)
  hookFr:          'Kit Hammam complet à 149 MAD : ton rituel chez toi',
  // ← hook_darija (S1, Sam)
  hookDarija:      'كيت الحمام كامل ب149 درهم : الحمام ديالك فالدار',
  // ← cta (S1, Sam)
  cta:             'Commande ton Kit Hammam → lien bio - Stock limité',
  // ← hashtags (S1, Sam)
  hashtags:        '#jodhur #kithammam #promo #hammammaison #beauténaturelle',
  // Produit
  productName:     'Kit Hammam Complet',  // ← produit_principal
  productImage:    '/assets/products/kit-hammam.jpg',
  backgroundImage: '/assets/ambiance/hammam-steam.jpg',
  // Prix (inférés du hook_fr)
  originalPriceMAD: 220,
  promoPriceMAD:    149,
  promoCode:       undefined,
  urgencyText:     'Stock limité !',       // ← storytelling_emotion partiel
  // ← script_angle → bénéfices extraits
  benefits: [
    'Savon Beldi artisanal',
    'Gant Kessa + Ghassoul',
    'Eau de Rose de Kelaat',
  ],
};

// ============================================================
// INSTANCE 2 — T2_HeritageStory
// Source: S1/Lun → "Savon Beldi, 3000 ans de beauté"
// ============================================================
export const INSTANCE_T2_SAVON_BELDI: T2HeritageStoryProps = {
  ...BASE,
  // ← hook_fr (S1, Lun)
  hookFr:          "Du savon d'Alep à votre hammam : 3000 ans de beauté",
  // ← hook_darija (S1, Lun)
  hookDarija:      'من صابون الحلب لحمّامك… 3000 عام من الجمال الأصيل',
  // ← cta
  cta:             'Découvre notre savon beldi artisanal → lien bio',
  hashtags:        '#jodhur #savonbeldi #hammam #beauténaturelle #rituelbeauté',
  productName:     'Savon Beldi',
  productImage:    '/assets/products/savon-beldi.jpg',
  backgroundImage: '/assets/ambiance/hammam-vintage.jpg',
  atmosphereImage: '/assets/ambiance/syrie-maroc-map.jpg',
  // ← storytelling_emotion
  storyText:       "Dkhoul l'hammam machi bhal khroujo — Le hammam transforme pas que la peau",
  heritageYears:   '3000 ans',
  region:          'Hammam Marocain',
  // ← storytelling_emotion court
  emotion:         "Le hammam, c'est une renaissance",
};

// ============================================================
// INSTANCE 3 — T3_ProduitRegion
// Source: S2/Lun → "Huile d'Argan, les chèvres grimpent aux arbres"
// ============================================================
export const INSTANCE_T3_ARGAN: T3ProduitRegionProps = {
  ...BASE,
  // ← hook_fr (S2, Lun)
  hookFr:          "Les chèvres grimpent aux arbres pour cet or liquide",
  // ← hook_darija
  hookDarija:      'الماعز كيطّلعو للشجر على ود هاد الذهب السائل',
  cta:             'Découvre notre argan pure coopérative → lien bio',
  hashtags:        '#jodhur #huileargan #arganoil #ordumaroc #cooperative #amazigh',
  productName:     "Huile d'Argan Pure",
  productImage:    '/assets/products/argan-oil.jpg',
  backgroundImage: '/assets/regions/souss-arganier.jpg',
  region:          'Souss-Massa',
  regionImage:     '/assets/regions/souss-valle.jpg',
  extractionImage: '/assets/ambiance/femmes-cooperative.jpg',
  // ← script_angle → étapes
  extractionSteps: [
    { label: 'Chèvres dans les arganiers',            durationSec: 4 },
    { label: 'Femmes coopérative cassant les noix',   durationSec: 5 },
    { label: 'Extraction à la presse traditionnelle', durationSec: 5 },
    { label: 'Or liquide pur dans votre flacon',      durationSec: 4 },
  ],
  // ← script_angle → fun facts
  funFacts: [
    '1 litre d\'argan = 50 kg de fruits',
    '99% de la production mondiale vient du Maroc',
    '300 000 femmes amazighes vivent de l\'argan',
  ],
  originFact:   "Seul pays où pousse l'arganier : le Maroc",
  ingredients:  'Vitamine E · Oméga 6 & 9 · Tocophérols',
};

// ============================================================
// INSTANCE 4 — T4_Tutorial
// Source: S4/Lun → "Routine hammam en 6 étapes"
// ============================================================
export const INSTANCE_T4_ROUTINE_HAMMAM: T4TutorialProps = {
  ...BASE,
  // ← hook_fr (S4, Lun)
  hookFr:           "Routine hammam en 6 étapes : de l'amateur à l'experte",
  hookDarija:       'روتين الحمّام في 6 خطوات… من المبتدئة للخبيرة',
  cta:              'Sauvegarde cette routine et teste-la ce week-end',
  hashtags:         '#jodhur #routinehammam #savonbeldi #ghassoul #beauténaturelle',
  productName:      'Kit Hammam Complet',
  productImage:     '/assets/products/kit-hammam.jpg',
  backgroundImage:  '/assets/ambiance/hammam-zellige.jpg',
  // ← script_angle → étapes détaillées
  problemStatement: "❌ Tu fais le hammam sans vraiment savoir comment ?",
  steps: [
    { number: 1, title: 'Vapeur 10 min',         desc: 'Ouvre les pores avec la chaleur',         image: '/assets/steps/vapeur.jpg',      durationSec: 7 },
    { number: 2, title: 'Savon Beldi 5 min',      desc: 'Applique en cercles sur peau humide',    image: '/assets/steps/savon.jpg',       durationSec: 7 },
    { number: 3, title: 'Gommage Kessa',          desc: 'Retire les cellules mortes doucement',   image: '/assets/steps/gommage.jpg',     durationSec: 7 },
    { number: 4, title: 'Masque Ghassoul 10 min', desc: 'Purifie et resserre les pores',          image: '/assets/steps/ghassoul.jpg',    durationSec: 7 },
    { number: 5, title: 'Rinçage eau tiède',      desc: 'Toujours tiède, jamais froid direct',    image: '/assets/steps/rincage.jpg',     durationSec: 7 },
    { number: 6, title: 'Hydratation Argan',      desc: 'Scelle l\'humidité avec 3 gouttes',      image: '/assets/steps/argan.jpg',       durationSec: 7 },
  ],
  // ← cta / storytelling_emotion
  resultsText:  "Teste ce rituel 1×/semaine — tu ne reviendras plus en arrière",
  tipBonus:     "💡 Bonus : ajoute quelques gouttes d'eau de rose après le rinçage",
};

// ============================================================
// INSTANCE 5 — T5_Carousel
// Source: S2/Mar → "Argan : pas la même huile selon usage !"
// ============================================================
export const INSTANCE_T5_ARGAN_GUIDE: T5CarouselProps = {
  ...BASE,
  // ← hook_fr (S2, Mar)
  hookFr:       "Argan visage vs cheveux vs cuisine : pas la même huile !",
  hookDarija:   'أرغان الوجه، الشعر، والماكلة… ماشي نفس الشي!',
  cta:          'Sauvegarde ce guide pour ne plus te tromper',
  hashtags:     '#jodhur #huileargan #guide #skincare #beautémarocaine',
  productName:  "Huile d'Argan",
  productImage: '/assets/products/argan-collection.jpg',
  carouselTitle: "Le Guide Argan",
  saveText:      "↗ Sauvegarde · Partage · Applique",
  // ← script_angle → slides détaillées
  slides: [
    {
      title:     "L'Argan : 3 usages, 1 trésor",
      subtitle:  "Le guide que tu attendais",
      body:      "Toutes les huiles d'argan ne se ressemblent pas. Voici comment ne plus te tromper.",
      image:     '/assets/products/argan-trio.jpg',
      bgColor:   '#F5EDD8',
      highlight: "3 usages",
    },
    {
      title:     "🫙 Argan Cosmétique Visage",
      subtitle:  "Pressée à froid · Non torréfiée",
      body:      "Odeur neutre · Vitamine E max · Pénètre sans résidu · Antiâge quotidien",
      image:     '/assets/products/argan-cosmetique.jpg',
      bgColor:   '#E8A96A',
      highlight: "Visage",
    },
    {
      title:     "🍳 Argan Alimentaire",
      subtitle:  "Légèrement torréfiée",
      body:      "Parfum noisette intense · Protège le cœur · Ne s'utilise PAS en cosmétique",
      image:     '/assets/ambiance/argan-cuisine.jpg',
      bgColor:   '#D4AF37',
      highlight: "Cuisine",
    },
    {
      title:     "💆 Argan Cheveux",
      subtitle:  "En masque concentré",
      body:      "Répare les pointes · Éclat & douceur · Applique sur longueurs humides avant shampoing",
      image:     '/assets/ambiance/argan-cheveux.jpg',
      bgColor:   '#4A7C59',
      textColor: '#FDFAF4',
      highlight: "Cheveux",
    },
    {
      title:     "✅ Comment reconnaître la vraie ?",
      subtitle:  "3 tests simples",
      body:      "1. Couleur dorée claire\n2. Odeur noisette légère\n3. Absorbe en 60 secondes",
      image:     '/assets/products/argan-test.jpg',
      bgColor:   '#2C1810',
      textColor: '#F5EDD8',
      highlight: "Vraie argan",
    },
  ],
};

// ============================================================
// Map: format Excel → template Remotion
// ============================================================
export const FORMAT_TO_TEMPLATE: Record<string, string> = {
  'Reel 30s':         'T1_PromoFlash | T2_HeritageStory',
  'Reel 45s':         'T3_ProduitRegion',
  'Video 60s':        'T4_Tutorial',
  'Carousel 5 slides':'T5_Carousel',
  'Carousel 4 slides':'T5_Carousel',
  'Carousel 6 slides':'T5_Carousel',
  'Quote':            'T2_HeritageStory', // Slide unique
};
