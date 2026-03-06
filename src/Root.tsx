// ============================================================
// Root.tsx — Registre Remotion JODHUR — 3 templates universels
// ============================================================

import React from 'react';
import { Composition } from 'remotion';
import { U1_FlashHook } from './templates/U1_FlashHook';
import { U2_TutoPunch } from './templates/U2_TutoPunch';
import { U3_StorySlide } from './templates/U3_StorySlide';
import type { UniversalVideoProps } from './types-universal';
import { COLORS } from './constants/colors';

// Props par défaut (preview dans Remotion Studio)
const DEFAULT_PROPS: UniversalVideoProps = {
  brandName:            'JODHUR',
  whatsappNumber:       '+212600000000',
  websiteUrl:           'jodhur.ma',
  semaine:              'S1',
  phase:                'Découverte',
  pilier:               'Héritage & Émotion',
  datePublication:      '2026-03-09',
  plateforme:           'TikTok',
  hookFr:               "Du savon d'Alep à votre hammam : 3000 ans de beauté",
  hookDarija:           'من صابون الحلب لحمّامك… 3000 عام من الجمال الأصيل',
  productName:          'Savon Beldi',
  scriptAngle:          'Voyage visuel Syrie→Maroc. Texture noire du savon.',
  storytellingEmotion:  "Le hammam transforme pas que la peau",
  cta:                  'Découvre notre savon beldi artisanal → lien bio',
  hashtags:             '#jodhur #savonbeldi #hammam #beauténaturelle',
  productImage:         'https://images.unsplash.com/photo-1600857062241-98e5def78abd?w=800',
  backgroundImage:      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
  heritageYears:        '3000 ans',
  region:               'Hammam Marocain',
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* U1 — FlashHook : Reel 15s — Promo · Héritage · Produit */}
      <Composition
        id="U1-FlashHook"
        component={U1_FlashHook}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={DEFAULT_PROPS}
      />

      {/* U2 — TutoPunch : Video 20s — Éducation · Tutorial · Routine */}
      <Composition
        id="U2-TutoPunch"
        component={U2_TutoPunch}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...DEFAULT_PROPS,
          hookFr:       "3 façons d'utiliser l'eau de rose que tu ne connais pas",
          hookDarija:   'ثلاث طرق لاستخدام ماء الورد ما كنتيش تعرفيهم',
          scriptAngle:  '1) Brume tonique matin - spray visage direct. 2) Mélangée au ghassoul comme masque purifiant. 3) Compresses yeux fatigués après longue journée.',
          storytellingEmotion: "L'eau de rose est le couteau suisse de ta routine",
          cta:          'Essaie ces 3 astuces et dis-nous ta préférée en commentaire',
          primaryColor: COLORS.green,
          pilier:       'Éducation Beauté',
        }}
      />

      {/* U3 — StorySlide : Carousel 20s — Guide · Multi-slides · Éducation */}
      <Composition
        id="U3-StorySlide"
        component={U3_StorySlide}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...DEFAULT_PROPS,
          hookFr:       '5 erreurs que tout le monde fait au hammam',
          hookDarija:   '5 أخطاء اللي كيديروهم الناس كاملين فالحمّام',
          scriptAngle:  'Slide 1: hook erreur courante. Slide 2: eau trop chaude - brûle les pores. Slide 3: pas de gommage avant savon. Slide 4: rinçage insuffisant. Slide 5: pas hydratation après.',
          storytellingEmotion: "Le hammam c'est un rituel, pas une corvée",
          cta:          'Sauvegarde ce post pour ton prochain hammam 🧖‍♀️',
          primaryColor: COLORS.green,
          pilier:       'Éducation Beauté',
        }}
      />
    </>
  );
};
