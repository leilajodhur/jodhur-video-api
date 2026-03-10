import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T3ProduitRegionProps } from '../types';

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const SceneGeoHook: React.FC<{ hookFr: string; hookDarija: string; bgImage?: string; }> = ({ hookFr, hookDarija, bgImage }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 90], [1, 1.05], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      {bgImage && <Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})` }} />}
      <AbsoluteFill style={{ background: `rgba(28,15,0,0.5)` }} />
      <HookText hookFr={hookFr} hookDarija={hookDarija} variant="overlay" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
    </AbsoluteFill>
  );
};

const SceneRegionalJourney: React.FC<{ region: string; funFacts: string[]; bgImage?: string; productImage: string; }> = ({ region, funFacts, bgImage, productImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 1. حركة رفع الصورة بانسيابية من 100% إلى 55% لتجنب القطع الحاد
  const imageReveal = spring({ fps, frame, config: { damping: 18, stiffness: 100 }, from: 100, to: 55 });
  
  // 2. ظهور النص بتدرج ناعم بعد أن ترتفع الصورة
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [15, 30], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.parchment }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: `${imageReveal}%`, overflow: 'hidden' }}>
        {/* تم تعديل الارتفاع إلى 100% لكي لا تتشوه الصورة */}
        <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to top, ${COLORS.parchment} 0%, transparent 100%)` }} />
      </div>
      
      {/* تم إنزال النص إلى 58% بدلاً من 48% لكي لا يتداخل أبداً مع الصورة */}
      <div style={{ position: 'absolute', top: '58%', left: 0, right: 0, padding: '0 48px', opacity: textOpacity, transform: `translateY(${textY}px)` }}>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, fontWeight: FONT_WEIGHTS.black, marginBottom: 20, display:'block', color: COLORS.primaryDark }}>{region}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {funFacts.slice(0, 2).map((fact, i) => (
             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CheckIcon />
                <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.charcoal }}>{fact}</span>
             </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneExtraction: React.FC<{ extractionSteps: { label: string; durationSec: number }[]; bgImage?: string; productImage: string; }> = ({ extractionSteps, bgImage, productImage }) => {
  const frame = useCurrentFrame();
  // إضافة fade بسيط لتنعيم الدخول لمشهد الاستخراج
  const fade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, opacity: fade }}>
      <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
      <AbsoluteFill style={{ background: 'linear-gradient(160deg, rgba(28,15,0,0.6) 0%, rgba(44,60,20,0.5) 100%)' }} />
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0 }}><span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold, textAlign: 'center', display: 'block' }}>PROCESSUS NATUREL</span></div>
      <div style={{ position: 'absolute', top: '35%', left: 40, right: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {extractionSteps.slice(0, 2).map((step, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '16px 24px', borderRadius: 16, backdropFilter: 'blur(10px)', borderLeft: `4px solid ${COLORS.gold}` }}>
             <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: COLORS.white, fontWeight: 'bold' }}>{i+1}. {step.label}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const T3_ProduitRegion: React.FC<T3ProduitRegionProps> = (props) => {
  return (
    <AbsoluteFill>
      <BrandWatermark brandName={props.brandName} />
      <Sequence from={0} durationInFrames={90}><SceneGeoHook hookFr={props.hookFr} hookDarija={props.hookDarija} bgImage={props.regionBgImage} /></Sequence>
      <Sequence from={90} durationInFrames={210}><SceneRegionalJourney region={props.region!} funFacts={props.funFacts} bgImage={props.regionBgImage} productImage={props.productImage} /></Sequence>
      <Sequence from={300} durationInFrames={210}><SceneExtraction extractionSteps={props.extractionSteps} bgImage={props.extractionBgImage} productImage={props.productImage} /></Sequence>
      <Sequence from={510} durationInFrames={90}>
        <AbsoluteFill>
          <Img src={props.ctaBgImage || props.productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(15px)', transform: 'scale(1.1)' }} />
          <AbsoluteFill style={{ background: 'rgba(28,15,0,0.6)' }} />
        </AbsoluteFill>
        <CTAOverlay ctaText={props.cta} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} startFrame={0} variant="full" />
      </Sequence>
      <Sequence from={90} durationInFrames={210}>
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="slide-up" bgColor={COLORS.green} bottom={60} />
      </Sequence>
    </AbsoluteFill>
  );
};
export default T3_ProduitRegion;
