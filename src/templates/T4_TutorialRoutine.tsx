import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T4TutorialProps } from '../types';

const IdeaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 12 3a4.65 4.65 0 0 0-4.5 4.5c0 1.5.83 2.76 1.41 3.5.76.76 1.23 1.52 1.41 2.5"></path>
  </svg>
);

const SceneProblem: React.FC<{ hookFr: string; hookDarija: string; problemStatement: string; bgImage?: string; }> = ({ hookFr, hookDarija, problemStatement, bgImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // حركة دخول ناعمة للمشكلة
  const boxSlide = spring({ fps, frame: frame - 15, config: { damping: 15 }, from: 50, to: 0 });
  const boxOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  const zoom = interpolate(frame, [0, 90], [1, 1.05], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      {bgImage && <Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`, opacity: 0.6 }} />}
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, rgba(28,15,0,0.2) 0%, rgba(28,15,0,0.95) 100%)` }} />
      <HookText hookFr={hookFr} hookDarija={hookDarija} variant="cinematic" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
      
      {/* تم رفع المربع لـ bottom 250 ليكون في المنطقة الآمنة */}
      {problemStatement && problemStatement.trim() !== '' && (
        <div style={{ position: 'absolute', bottom: 250, left: 40, right: 40, transform: `translateY(${boxSlide}px)`, opacity: boxOpacity, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderLeft: `4px solid ${COLORS.gold}`, borderRadius: 20, padding: '24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <IdeaIcon />
          <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: COLORS.white, fontWeight: 'bold', lineHeight: 1.4 }}>{problemStatement}</span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const SceneTutorial: React.FC<{ steps: any[]; bgImage?: string; }> = ({ steps, bgImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // فلترة ذكية للخطوات الفارغة (تقبل حتى 4 خطوات)
  const validSteps = steps?.filter(s => s && s.desc && s.desc.trim() !== '').slice(0, 4) || [];
  
  let activeStep = 0; let elapsed = 0;
  for (let i = 0; i < validSteps.length; i++) {
    const stepFrames = validSteps[i].durationSec * fps;
    if (frame < elapsed + stepFrames) { activeStep = i; break; }
    elapsed += stepFrames;
    if (i === validSteps.length - 1) { activeStep = i; }
  }

  const fade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, padding: '160px 40px 40px 40px', opacity: fade }}>
      {bgImage && <AbsoluteFill><Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} /></AbsoluteFill>}
      <AbsoluteFill style={{ background: `linear-gradient(to top, rgba(28,15,0,0.8) 0%, transparent 100%)` }} />
      
      <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold, marginBottom: 40, letterSpacing: 2, textAlign: 'center', zIndex: 1 }}>RITUEL {activeStep + 1}/{validSteps.length}</span>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: validSteps.length > 2 ? 16 : 24, zIndex: 1, justifyContent: 'center', flex: 1, paddingBottom: 100 }}>
        {validSteps.map((step, i) => {
          const isActive = i === activeStep;
          const pop = spring({ fps, frame: isActive ? frame - elapsed : 0, config: { damping: 12 }, from: 0.8, to: 1 });
          
          return (
             <div key={i} style={{ display: 'flex', gap: 20, opacity: isActive ? 1 : 0.3, transform: isActive ? `scale(${pop})` : 'scale(1)', background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent', padding: isActive ? '20px' : '10px 20px', borderRadius: 24, transition: 'all 0.3s ease', border: isActive ? `1px solid rgba(196,118,58,0.3)` : 'none' }}>
               <div style={{ width: validSteps.length > 2 ? 50 : 64, height: validSteps.length > 2 ? 50 : 64, borderRadius: '50%', background: isActive ? COLORS.gold : COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: isActive ? `0 0 20px rgba(196,118,58,0.5)` : 'none' }}>
                 <span style={{ color: isActive ? COLORS.backgroundDark : COLORS.white, fontWeight: 'black', fontSize: validSteps.length > 2 ? 22 : 28 }}>{i+1}</span>
               </div>
               <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <span style={{ fontFamily: FONTS.display, fontSize: validSteps.length > 2 ? 26 : 32, color: COLORS.white, fontWeight: 'bold' }}>{step.title}</span>
                 {isActive && <span style={{ fontFamily: FONTS.body, fontSize: validSteps.length > 2 ? 20 : 24, color: COLORS.cream, marginTop: 8, lineHeight: 1.4 }}>{step.desc}</span>}
               </div>
             </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SceneResults: React.FC<{ resultsText: string; productImage: string; bgImage?: string; }> = ({ resultsText, productImage, bgImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ fps, frame, config: { damping: 14 }, from: 0.5, to: 1 });
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
      <AbsoluteFill>
         <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(20px)', opacity: 0.4, transform: 'scale(1.2)' }} />
         <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(28,15,0,0.1) 0%, rgba(28,15,0,0.9) 100%)' }} />
      </AbsoluteFill>
      <Img src={productImage} style={{ width: 350, height: 350, objectFit: 'contain', borderRadius: 32, zIndex: 10, transform: `scale(${pop})`, boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }} />
      <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, color: COLORS.gold, textAlign: 'center', marginTop: 40, zIndex: 10, fontWeight: 'black', opacity: textOpacity, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>{resultsText}</span>
    </AbsoluteFill>
  );
};

export const T4_TutorialRoutine: React.FC<T4TutorialProps> = (props) => {
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      <BrandWatermark brandName={props.brandName} />
      
      <Sequence from={0} durationInFrames={90}>
        <SceneProblem hookFr={props.hookFr} hookDarija={props.hookDarija} problemStatement={props.problemStatement!} bgImage={props.problemBgImage} />
      </Sequence>
      
      <Sequence from={90} durationInFrames={360}>
        <SceneTutorial steps={props.steps || []} bgImage={props.tutorialBgImage} />
      </Sequence>
      
      <Sequence from={450} durationInFrames={150}>
         <SceneResults resultsText={props.resultsText!} productImage={props.productImage} bgImage={props.resultsBgImage} />
         <Sequence from={60} durationInFrames={90}>
            <CTAOverlay ctaText={props.cta} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} startFrame={0} variant="full" />
         </Sequence>
      </Sequence>
      
      {/* هنا التعديل الأهم للمنطقة الآمنة: bottom: 250 */}
      <Sequence from={90} durationInFrames={360}>
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="word-by-word" bgColor={COLORS.primary} bottom={250} />
      </Sequence>
      
    </AbsoluteFill>
  );
};
export default T4_TutorialRoutine;
