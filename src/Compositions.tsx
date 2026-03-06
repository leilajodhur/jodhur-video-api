// ============================================================
// Compositions.tsx — Registre des 5 templates JODHUR
// ============================================================
// Ce fichier exporte les props par défaut de chaque composition.
// Utilisé par Root.tsx pour enregistrer dans Remotion Studio.
// ============================================================

import {
  INSTANCE_T1_KIT_HAMMAM,
  INSTANCE_T2_SAVON_BELDI,
  INSTANCE_T3_ARGAN,
  INSTANCE_T4_ROUTINE_HAMMAM,
  INSTANCE_T5_ARGAN_GUIDE,
} from './data/excelData';

// ─── IDs des compositions (utilisés dans Root.tsx) ───────────
export const COMPOSITION_IDS = {
  T1_PROMO_FLASH:    'T1-PromoFlash',
  T2_HERITAGE_STORY: 'T2-HeritageStory',
  T3_PRODUIT_REGION: 'T3-ProduitRegion',
  T4_TUTORIAL:       'T4-TutorialRoutine',
  T5_CAROUSEL:       'T5-CarouselAnime',
} as const;

// ─── Configurations des compositions ─────────────────────────
export const COMPOSITIONS_CONFIG = [
  {
    id:             COMPOSITION_IDS.T1_PROMO_FLASH,
    component:      'T1_PromoFlash',
    durationInFrames: 900,   // 30s @ 30fps
    fps:            30,
    width:          1080,
    height:         1920,
    defaultProps:   INSTANCE_T1_KIT_HAMMAM,
    description:    'Reel 30s — Promo Flash & Offres (Kit Hammam 149 MAD)',
  },
  {
    id:             COMPOSITION_IDS.T2_HERITAGE_STORY,
    component:      'T2_HeritageStory',
    durationInFrames: 900,   // 30s @ 30fps
    fps:            30,
    width:          1080,
    height:         1920,
    defaultProps:   INSTANCE_T2_SAVON_BELDI,
    description:    'Reel 30s — Héritage & Émotion (Savon Beldi 3000 ans)',
  },
  {
    id:             COMPOSITION_IDS.T3_PRODUIT_REGION,
    component:      'T3_ProduitRegion',
    durationInFrames: 1350,  // 45s @ 30fps
    fps:            30,
    width:          1080,
    height:         1920,
    defaultProps:   INSTANCE_T3_ARGAN,
    description:    'Reel 45s — Produit & Région (Huile d\'Argan, Souss)',
  },
  {
    id:             COMPOSITION_IDS.T4_TUTORIAL,
    component:      'T4_TutorialRoutine',
    durationInFrames: 1800,  // 60s @ 30fps
    fps:            30,
    width:          1080,
    height:         1920,
    defaultProps:   INSTANCE_T4_ROUTINE_HAMMAM,
    description:    'Vidéo 60s — Éducation Beauté (Routine hammam 6 étapes)',
  },
  {
    id:             COMPOSITION_IDS.T5_CAROUSEL,
    component:      'T5_CarouselAnime',
    durationInFrames: 1350,  // 45s @ 30fps (5 slides × 270f)
    fps:            30,
    width:          1080,
    height:         1920,
    defaultProps:   INSTANCE_T5_ARGAN_GUIDE,
    description:    'Carousel animé 45s — Guide 5 slides (Guide Argan)',
  },
] as const;

// ─── Export des instances par ID ──────────────────────────────
export const INSTANCES_BY_ID = {
  [COMPOSITION_IDS.T1_PROMO_FLASH]:    INSTANCE_T1_KIT_HAMMAM,
  [COMPOSITION_IDS.T2_HERITAGE_STORY]: INSTANCE_T2_SAVON_BELDI,
  [COMPOSITION_IDS.T3_PRODUIT_REGION]: INSTANCE_T3_ARGAN,
  [COMPOSITION_IDS.T4_TUTORIAL]:       INSTANCE_T4_ROUTINE_HAMMAM,
  [COMPOSITION_IDS.T5_CAROUSEL]:       INSTANCE_T5_ARGAN_GUIDE,
} as const;
