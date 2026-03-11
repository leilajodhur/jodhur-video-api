import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T4TutorialProps } from '../types';

const IdeaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 12 3a4.65 4.65 0 0 0-4.5 4.5c0 1.5.83 2.76 1.41 3.5.76.76 1.23 1.52 1.41 2.5"></path>
  </svg>
);

const SceneProblem: React.FC<{ hookFr: string; problemStatement: string; bgImage?: string; }> = ({ hookFr, problemStatement, bgImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const boxSlide = spring({ fps, frame: frame - 10, config: { damping: 15 }, from: 100, to: 0 });
  const boxOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {/* الصورة واضحة 100% بدون أي لون بني */}
      {bgImage && <Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }} />}
      
      {/* تدرج أسود في الأسفل فقط لكي يظهر المربع بوضوح */}
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 100%)` }} />
      
      <HookText hookFr={hookFr} hookDarija={""} variant="cinematic" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
      
      {problemStatement && problemStatement.trim() !== '' && (
        <div style={{ position: 'absolute', bottom: 300, left: 30, right: 30, transform: `translateY(${boxSlide}px)`, opacity: boxOpacity, background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', border: `1px solid rgba(255,255,255,0.2)`, borderRadius: 24, padding: '24px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ background: 'rgba(196,118,58,0.3)', padding: '12px', borderRadius: '50%' }}>
             <IdeaIcon />
          </div>
          <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body + 4, color: COLORS.white, fontWeight: 'bold', lineHeight: 1.4 }}>{problemStatement}</span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const SceneTutorial: React.FC<{ steps: any[]; bgImage?: string; }> = ({ steps, bgImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const validSteps = steps?.filter(s => s && s.desc && s.desc.trim() !== '').slice(0, 4) || [];
  
  // حساب إطارات البداية لكل خطوة لحل مشكلة الـ Lag نهائياً
  const stepStarts: number[] = [];
  let curr = 0;
  for (let s of validSteps) {
    stepStarts.push(curr);
    curr += s.durationSec * fps;
  }
  
  let activeStep = 0;
  for (let i = 0; i < stepStarts.length; i++) {
    if (frame >= stepStarts[i]) activeStep = i;
  }

  const fade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, padding: '140px 40px 40px 40px', opacity: fade }}>
      {bgImage && <AbsoluteFill><Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} /></AbsoluteFill>}
      <AbsoluteFill style={{ background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)` }} />
      
      <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold, marginBottom: 40, letterSpacing: 2, textAlign: 'center', zIndex: 1 }}>RITUEL {activeStep + 1}/{validSteps.length}</span>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: validSteps.length > 2 ? 16 : 24, zIndex: 1, justifyContent: 'center', flex: 1, paddingBottom: 150 }}>
        {validSteps.map((step, i) => {
          const isCurrent = i === activeStep;
          const startFrame = stepStarts[i];
          
          // حركة برمجية نقية = 0 Lag!
          const pop = spring({ fps, frame: frame - startFrame, config: { damping: 12 }, from: 1, to: 1.05 });
          const displayScale = isCurrent ? pop : 1;
          const displayOpacity = isCurrent ? 1 : 0.4;
          
          return (
             <div key={i} style={{ display: 'flex', gap: 20, opacity: displayOpacity, transform: `scale(${displayScale})`, background: isCurrent ? 'rgba(255,255,255,0.08)' : 'transparent', padding: isCurrent ? '20px' : '10px 20px', borderRadius: 24, border: isCurrent ? `1px solid rgba(196,118,58,0.5)` : '1px solid transparent' }}>
               <div style={{ width: validSteps.length > 2 ? 50 : 64, height: validSteps.length > 2 ? 50 : 64, borderRadius: '50%', background: isCurrent ? COLORS.gold : COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: isCurrent ? `0 0 20px rgba(196,118,58,0.5)` : 'none' }}>
                 <span style={{ color: isCurrent ? COLORS.backgroundDark : COLORS.white, fontWeight: 'black', fontSize: validSteps.length > 2 ? 22 : 28 }}>{i+1}</span>
               </div>
               <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <span style={{ fontFamily: FONTS.display, fontSize: validSteps.length > 2 ? 26 : 32, color: COLORS.white, fontWeight: 'bold' }}>{step.title}</span>
                 {isCurrent && <span style={{ fontFamily: FONTS.body, fontSize: validSteps.length > 2 ? 20 : 24, color: COLORS.cream, marginTop: 8, lineHeight: 1.4 }}>{step.desc}</span>}
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
  
  // تأثير "الخطف" (Camera Flash Effect)
  // في الفريم 45 يحدث وميض أبيض ويظهر المنتج بحجم عملاق
  const flash = interpolate(frame, [40, 45, 50], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const showProduct = frame >= 45;
  const productPop = spring({ fps, frame: frame - 45, config: { damping: 10, mass: 0.8 }, from: 0.3, to: 1 });

  return (
    <AbsoluteFill style={{ background: '#000', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* المرحلة 1: إظهار صورة النتيجة واضحة لتأكيد الفعالية */}
      <AbsoluteFill>
         <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         <AbsoluteFill style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
      </AbsoluteFill>

      {/* نص النتيجة في الأسفل */}
      <div style={{ position: 'absolute', bottom: 120, left: 20, right: 20 }}>
         <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, color: COLORS.white, textAlign: 'center', display: 'block', textShadow: '0 4px 15px rgba(0,0,0,1)' }}>{resultsText}</span>
      </div>

      {/* الوميض الأبيض للخطف */}
      <AbsoluteFill style={{ background: 'white', opacity: flash }} />

      {/* المرحلة 2: المنتج يظهر بحجم كبييير ومجسم (بدون مربع خلفه) */}
      {showProduct && (
         <Img src={productImage} style={{ width: 600, height: 600, objectFit: 'contain', zIndex: 10, transform: `scale(${productPop})`, filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.8))' }} />
      )}
      
    </AbsoluteFill>
  );
};

export const T4_TutorialRoutine: React.FC<T4TutorialProps> = (props) => {
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      <BrandWatermark brandName={props.brandName} />
      
      <Sequence from={0} durationInFrames={90}>
        <SceneProblem hookFr={props.hookFr} problemStatement={props.problemStatement!} bgImage={props.problemBgImage} />
      </Sequence>
      
      <Sequence from={90} durationInFrames={360}>
        <SceneTutorial steps={props.steps || []} bgImage={props.tutorialBgImage} />
      </Sequence>
      
      <Sequence from={450} durationInFrames={150}>
         <SceneResults resultsText={props.resultsText!} productImage={props.productImage} bgImage={props.resultsBgImage} />
         <Sequence from={75} durationInFrames={75}>
            {/* يظهر الكول تو أكشن بعد الخطف بفترة قصيرة */}
            <CTAOverlay ctaText={props.cta} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} startFrame={0} variant="whatsapp" />
         </Sequence>
      </Sequence>
      
      <Sequence from={90} durationInFrames={360}>
        {/* رفعنا الدارجة للأعلى (bottom 380) لتتمركز في الشاشة فوق وصف تيك توك */}
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="word-by-word" bgColor={COLORS.primary} bottom={380} />
      </Sequence>
      
    </AbsoluteFill>
  );
};
export default T4_TutorialRoutine;
