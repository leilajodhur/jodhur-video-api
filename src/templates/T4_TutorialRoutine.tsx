import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T4TutorialProps } from '../types';

// أيقونة فكرة احترافية بدلاً من الإيموجي
const IdeaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 12 3a4.65 4.65 0 0 0-4.5 4.5c0 1.5.83 2.76 1.41 3.5.76.76 1.23 1.52 1.41 2.5"></path>
  </svg>
);

const SceneProblem: React.FC<{ hookFr: string; hookDarija: string; problemStatement: string; }> = ({ hookFr, hookDarija, problemStatement }) => {
  return (
    <AbsoluteFill style={{ background: GRADIENTS.hammam }}>
      <HookText hookFr={hookFr} hookDarija={hookDarija} variant="cinematic" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
      <div style={{ position: 'absolute', bottom: 150, left: 40, right: 40, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 24, padding: '24px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <IdeaIcon />
        <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: COLORS.white, fontWeight: 'bold' }}>{problemStatement}</span>
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
    // تم تغيير الـ padding من 80px إلى 160px لكي لا يغطي على اللوجو
    <AbsoluteFill style={{ background: COLORS.backgroundDark, padding: '160px 44px 40px 44px' }}>
      <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold, marginBottom: 40, letterSpacing: 2 }}>ÉTAPES {activeStep + 1}/{steps!.length}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {steps?.map((step, i) => {
          const isActive = i === activeStep;
          return (
             <div key={i} style={{ display: 'flex', gap: 20, opacity: isActive ? 1 : 0.3, transition: 'opacity 0.3s', background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent', padding: isActive ? '20px' : '0 20px', borderRadius: 20 }}>
               <div style={{ width: 64, height: 64, borderRadius: '50%', background: isActive ? COLORS.gold : COLORS.atlas, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: isActive ? `0 0 20px ${COLORS.goldLight}` : 'none' }}>
                 <span style={{ color: isActive ? COLORS.backgroundDark : COLORS.white, fontWeight: 'bold', fontSize: 28 }}>{i+1}</span>
               </div>
               <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <span style={{ fontFamily: FONTS.display, fontSize: 32, color: COLORS.white, display: 'block', fontWeight: 'bold' }}>{step.title}</span>
                 {isActive && <span style={{ fontFamily: FONTS.body, fontSize: 24, color: COLORS.cream, marginTop: 8 }}>{step.desc}</span>}
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
      <AbsoluteFill>
         <Img src={productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(30px)', opacity: 0.4 }} />
      </AbsoluteFill>
      <Img src={productImage} style={{ width: 350, height: 350, objectFit: 'contain', borderRadius: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.6)', zIndex: 10 }} />
      <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, color: COLORS.white, textAlign: 'center', marginTop: 40, zIndex: 10, fontWeight: 'black' }}>{resultsText}</span>
    </AbsoluteFill>
  );
};

export const T4_TutorialRoutine: React.FC<T4TutorialProps> = (props) => {
  return (
    <AbsoluteFill>
      <BrandWatermark brandName={props.brandName} />
      <Sequence from={0} durationInFrames={90}><SceneProblem hookFr={props.hookFr} hookDarija={props.hookDarija} problemStatement={props.problemStatement!} /></Sequence>
      <Sequence from={90} durationInFrames={360}><SceneTutorial steps={props.steps} /></Sequence>
      <Sequence from={450} durationInFrames={150}>
         <SceneResults resultsText={props.resultsText!} productImage={props.productImage} />
         <Sequence from={60} durationInFrames={90}>
            {/* النهاية أصبحت شفافة وتظهر النتيجة خلفها بدلاً من السواد المزعج */}
            <AbsoluteFill style={{ background: 'rgba(28,15,0,0.6)' }} />
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
