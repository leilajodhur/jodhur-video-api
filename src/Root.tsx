// ============================================================
// Root.tsx — Registre Remotion JODHUR — 5 Templates (T1 à T5)
// ============================================================

import React from 'react';
import { Composition } from 'remotion';

// استيراد القوالب الخمسة الجديدة (تأكد أن أسماء الملفات في مجلد templates تطابق هذه الأسماء)
import { T1_PromoFlash } from './templates/T1_PromoFlash';
import { T2_HeritageStory } from './templates/T2_HeritageStory';
import { T3_ProduitRegion } from './templates/T3_ProduitRegion';
import { T4_TutorialRoutine } from './templates/T4_TutorialRoutine';
import { T5_CarouselAnime } from './templates/T5_CarouselAnime';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* T1 — PromoFlash : 30s (900 frames) */}
      <Composition
        id="T1-PromoFlash"
        component={T1_PromoFlash}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* T2 — HeritageStory : 30s (900 frames) */}
      <Composition
        id="T2-HeritageStory"
        component={T2_HeritageStory}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* T3 — ProduitRegion : 45s (1350 frames) */}
      <Composition
        id="T3-ProduitRegion"
        component={T3_ProduitRegion}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* T4 — TutorialRoutine : 60s (1800 frames) */}
      <Composition
        id="T4-TutorialRoutine"
        component={T4_TutorialRoutine}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* T5 — CarouselAnime : 45s (1350 frames) */}
      <Composition
        id="T5-CarouselAnime"
        component={T5_CarouselAnime}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
