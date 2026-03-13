import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T4TutorialProps } from '../types';

const IdeaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 12 3a4.65 4.65 0 0 0-4.5 4.5c0 1.5.83 2.76 1.41 3.5.76.76 1.23 1.52 1.41 2.5"></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const SceneProblem: React.FC<{ hookFr: string; problemStatement: string; bgImage?: string; }> = ({ hookFr, problemStatement, bgImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const boxSlide = spring({ fps, frame: frame - 10, config: { damping: 15 }, from: 100, to: 0 });
  const boxOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {bgImage && <Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }} />}
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 100%)` }} />
      <HookText hookFr={hookFr} hookDarija={""} variant="cinematic" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
      
      {problemStatement && problemStatement.trim() !== '' && (
        <div style={{ position: 'absolute', bottom: 300, left: 30, right: 30, transform: `translateY(${boxSlide}px)`, opacity: boxOpacity, background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', border: `1px solid rgba(255,255,255,0.2)`, borderRadius: 24, padding: '24px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ background: 'rgba(196,118,58,0.3)', padding: '12px', borderRadius: '50%' }}>
             <IdeaIcon />
          </div>
          <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: FONT_SIZES.body + 4, color: COLORS.white, fontWeight: 'bold', lineHeight: 1.4 }}>{problemStatement}</span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const SceneTutorial: React.FC<{ steps: any[]; bgImage?: string; }> = ({ steps, bgImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const validSteps = steps?.filter(s => s && s.desc && s.desc.trim() !== '').slice(0, 4) || [];
  
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
      
      {/* التعديل الأول: جعل الـ paddingBottom 180 لرفع الخطوات قليلاً وعدم تداخلها مع الشريط */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: validSteps.length > 2 ? 16 : 24, zIndex: 1, justifyContent: 'center', flex: 1, paddingBottom: 180 }}>
        {validSteps.map((step, i) => {
          const isCurrent = i === activeStep;
          const startFrame = stepStarts[i];
          
          const pop = spring({ fps, frame: frame - startFrame, config: { damping: 12 }, from: 1, to: 1.05 });
          const displayScale = isCurrent ? pop : 1;
          const displayOpacity = isCurrent ? 1 : 0.4;
          
          return (
             <div key={i} style={{ display: 'flex', gap: 20, opacity: displayOpacity, transform: `scale(${displayScale})`, background: isCurrent ? 'rgba(255,255,255,0.08)' : 'transparent', padding: isCurrent ? '20px' : '10px 20px', borderRadius: 24, border: isCurrent ? `1px solid rgba(196,118,58,0.5)` : '1px solid transparent' }}>
               <div style={{ width: validSteps.length > 2 ? 50 : 64, height: validSteps.length > 2 ? 50 : 64, borderRadius: '50%', background: isCurrent ? COLORS.gold : COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: isCurrent ? `0 0 20px rgba(196,118,58,0.5)` : 'none' }}>
                 <span style={{ color: isCurrent ? COLORS.backgroundDark : COLORS.white, fontWeight: 'black', fontSize: validSteps.length > 2 ? 22 : 28 }}>{i+1}</span>
               </div>
               <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: validSteps.length > 2 ? 26 : 32, color: COLORS.white, fontWeight: 'bold' }}>{step.title}</span>
                 {isCurrent && <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: validSteps.length > 2 ? 20 : 24, color: COLORS.cream, marginTop: 8, lineHeight: 1.4 }}>{step.desc}</span>}
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

  return (
    <AbsoluteFill style={{ background: '#000', alignItems: 'center', justifyContent: 'center' }}>
      
      <AbsoluteFill>
         <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         <AbsoluteFill style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
      </AbsoluteFill>

      <div style={{ position: 'absolute', bottom: 250, left: 20, right: 20 }}>
         <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: FONT_SIZES.title, color: COLORS.white, textAlign: 'center', display: 'block', textShadow: '0 6px 20px rgba(0,0,0,1)' }}>{resultsText}</span>
      </div>
      
    </AbsoluteFill>
  );
};

export const T4_TutorialRoutine: React.FC<T4TutorialProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ctaPop = spring({ fps, frame: frame - 525, config: { damping: 14 }, from: 0.8, to: 1 });
  const ctaOpacity = interpolate(frame, [525, 540], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      <BrandWatermark brandName={props.brandName} />
      
      <Sequence from={0} durationInFrames={90}>
        <SceneProblem hookFr={props.hookFr} problemStatement={props.problemStatement!} bgImage={props.problemBgImage} />
      </Sequence>
      
      <Sequence from={90} durationInFrames={360}>
        <SceneTutorial steps={props.steps || []} bgImage={props.tutorialBgImage} />
      </Sequence>
      
      <Sequence from={450} durationInFrames={75}>
         <SceneResults resultsText={props.resultsText!} productImage={props.productImage} bgImage={props.resultsBgImage} />
      </Sequence>
      
      <Sequence from={525} durationInFrames={75}>
        <AbsoluteFill>
          <Img src={props.ctaBgImage || props.productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(3px)', transform: 'scale(1.1)' }} />
          <AbsoluteFill style={{ background: 'rgba(0,0,0,0.55)' }} />
        </AbsoluteFill>
        
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: 40, transform: `scale(${ctaPop})`, opacity: ctaOpacity, paddingBottom: 120 }}>
           
           <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: 56, fontWeight: '900', color: COLORS.white, textAlign: 'center', padding: '0 30px', textShadow: '0 10px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(196,118,58,0.5)', lineHeight: 1.3 }}>
             {props.cta}
           </span>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
             {props.websiteUrl && (
               <div style={{ background: '#fff', padding: '20px 60px', borderRadius: 50, minWidth: 400, textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
                 <span style={{ fontFamily: FONTS.display, fontSize: 32, color: '#000', fontWeight: 'black' }}>{props.websiteUrl}</span>
               </div>
             )}
             {props.whatsappNumber && (
               <div style={{ background: '#25D366', padding: '20px 60px', borderRadius: 50, display: 'flex', alignItems: 'center', gap: 15, minWidth: 400, justifyContent: 'center', boxShadow: '0 10px 30px rgba(37,211,102,0.4)' }}>
                 <WhatsAppIcon />
                 <span style={{ fontFamily: FONTS.display, fontSize: 32, color: '#fff', fontWeight: 'bold' }}>{props.whatsappNumber}</span>
               </div>
             )}
           </div>
           
        </AbsoluteFill>
      </Sequence>
      
      <Sequence from={90} durationInFrames={360}>
        {/* التعديل الثاني: رفعنا الشريط الأخضر من 150 إلى 180 ليكون مرتفعاً قليلاً وبشكل آمن */}
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="word-by-word" bgColor={COLORS.primary} bottom={180} />
      </Sequence>
      
    </AbsoluteFill>
  );
};
export default T4_TutorialRoutine;
