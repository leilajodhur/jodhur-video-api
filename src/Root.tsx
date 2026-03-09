import React from 'react';
import { Composition } from 'remotion';

import T1_PromoFlash from './templates/T1_PromoFlash';
import T2_HeritageStory from './templates/T2_HeritageStory';
import T3_ProduitRegion from './templates/T3_ProduitRegion';
import T4_TutorialRoutine from './templates/T4_TutorialRoutine';
import T5_CarouselAnime from './templates/T5_CarouselAnime';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* القوالب العادية: 15 ثانية (450 إطار) */}
      <Composition id="T1-PromoFlash" component={T1_PromoFlash} durationInFrames={450} fps={30} width={1080} height={1920} />
      <Composition id="T2-HeritageStory" component={T2_HeritageStory} durationInFrames={450} fps={30} width={1080} height={1920} />

      {/* القوالب المعقدة: 20 ثانية (600 إطار) */}
      <Composition id="T3-ProduitRegion" component={T3_ProduitRegion} durationInFrames={600} fps={30} width={1080} height={1920} />
      <Composition id="T4-TutorialRoutine" component={T4_TutorialRoutine} durationInFrames={600} fps={30} width={1080} height={1920} />
      <Composition id="T5-CarouselAnime" component={T5_CarouselAnime} durationInFrames={600} fps={30} width={1080} height={1920} />
    </>
  );
};
