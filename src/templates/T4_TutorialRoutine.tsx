import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T4TutorialProps } from '../types';

const SceneProblem: React.FC<{ hookFr: string; hookDarija: string; problemStatement: string; }> = ({ hookFr, hookDarija, problemStatement }) => {
  return (
    <AbsoluteFill style={{ background: GRADIENTS.hammam }}>
      <HookText hookFr={hookFr} hookDarija={hookDarija} variant="cinematic" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
      <div style={{ position: 'absolute', bottom: 180, left: 40, right: 40, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '20px' }}>
        <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: COLORS.white }}>💡 {problemStatement}</span>
      </div>
    </AbsoluteFill>
  );
};

const SceneTutorial: React.FC<{ steps: T4TutorialProps['steps']; }> = ({ steps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let activeStep = 0; let elapsed = 0;
  for (let i = 0; i < steps!.length; i++) {
    const stepFrames = steps![i].durationSec * fps;
    if (frame < elapsed + stepFrames) { activeStep = i; break; }
    elapsed += stepFrames;
    if (i === steps!.length - 1) { activeStep = i; }
  }

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, padding: '80px 44px' }}>
      <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold, marginBottom: 40 }}>ÉTAPES {activeStep + 1}/{steps!.length}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {steps?.map((step, i) => {
          const isActive = i === activeStep;
          return (
             <div key={i} style={{ display: 'flex', gap: 16, opacity: isActive ? 1 : 0.4 }}>
               <div style={{ width: 60, height: 60, borderRadius: '50%', background: isActive ? COLORS.gold : COLORS.atlas, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span style={{ color: isActive ? COLORS.backgroundDark : COLORS.white, fontWeight: 'bold', fontSize: 24 }}>{i+1}</span>
               </div>
               <div style={{ flex: 1 }}>
                 <span style={{ fontFamily: FONTS.display, fontSize: 30, color: COLORS.white, display: 'block' }}>{step.title}</span>
                 {isActive && <span style={{ fontFamily: FONTS.body, fontSize: 22, color: COLORS.cream }}>{step.desc}</span>}
               </div>
             </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SceneResults: React.FC<{ resultsText: string; productImage: string; }> = ({ resultsText, productImage }) => {
  return (
    <AbsoluteFill style={{ background: GRADIENTS.luxury, alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
      <Img src={productImage} style={{ width: 300, height: 300, objectFit: 'contain', borderRadius: 24 }} />
      <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, color: COLORS.white, textAlign: 'center', marginTop: 30 }}>{resultsText}</span>
    </AbsoluteFill>
  );
};

export const T4_TutorialRoutine: React.FC<T4TutorialProps> = (props) => {
  return (
    <AbsoluteFill>
      <BrandWatermark brandName={props.brandName} />
      <Sequence from={0} durationInFrames={90}><SceneProblem hookFr={props.hookFr} hookDarija={props.hookDarija} problemStatement={props.problemStatement!} /></Sequence>
      {/* تأكد أن مجموع الثواني في الإكسيل لهذه الخطوات لا يتجاوز 12 ثانية (360 إطار) */}
      <Sequence from={90} durationInFrames={360}><SceneTutorial steps={props.steps} /></Sequence>
      <Sequence from={450} durationInFrames={150}>
         <SceneResults resultsText={props.resultsText!} productImage={props.productImage} />
         <Sequence from={60} durationInFrames={90}>
            <AbsoluteFill style={{ background: 'rgba(28,15,0,0.85)' }} />
            <CTAOverlay ctaText={props.cta} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} startFrame={0} variant="full" />
         </Sequence>
      </Sequence>
      <Sequence from={90} durationInFrames={360}>
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="word-by-word" bgColor={COLORS.primary} bottom={50} />
      </Sequence>
    </AbsoluteFill>
  );
};
export default T4_TutorialRoutine;
