import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T3ProduitRegionProps } from '../types';

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
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
  
  const imageReveal = spring({ fps, frame, config: { damping: 18, stiffness: 100 }, from: 100, to: 55 });
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [15, 30], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.parchment }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: `${imageReveal}%`, overflow: 'hidden' }}>
        <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to top, ${COLORS.parchment} 0%, transparent 100%)` }} />
      </div>
      
      <div style={{ position: 'absolute', top: '58%', left: 0, right: 0, padding: '0 48px', opacity: textOpacity, transform: `translateY(${textY}px)` }}>
        <span style={{ fontFamily: FONTS.arabic || FONTS.display, fontSize: FONT_SIZES.subtitle, fontWeight: FONT_WEIGHTS.black, marginBottom: 20, display:'block', color: COLORS.primaryDark }}>{region}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {funFacts
            .filter(fact => fact && fact.trim() !== '')
            .slice(0, 4)
            .map((fact, i) => (
             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CheckIcon />
                <span style={{ fontFamily: FONTS.arabic || FONTS.body, fontSize: FONT_SIZES.body, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.charcoal }}>{fact}</span>
             </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneExtraction: React.FC<{ extractionSteps: { label: string; durationSec: number }[]; bgImage?: string; productImage: string; }> = ({ extractionSteps, bgImage, productImage }) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, opacity: fade }}>
      <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
      <AbsoluteFill style={{ background: 'linear-gradient(160deg, rgba(28,15,0,0.6) 0%, rgba(44,60,20,0.5) 100%)' }} />
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0 }}><span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold, textAlign: 'center', display: 'block' }}>PROCESSUS NATUREL</span></div>
      <div style={{ position: 'absolute', top: '35%', left: 40, right: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {extractionSteps
          .filter(step => step && step.label && step.label.trim() !== '')
          .slice(0, 4)
          .map((step, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '16px 24px', borderRadius: 16, backdropFilter: 'blur(10px)', borderLeft: `4px solid ${COLORS.gold}` }}>
             <span style={{ fontFamily: FONTS.arabic || FONTS.body, fontSize: FONT_SIZES.body, color: COLORS.white, fontWeight: 'bold' }}>{i+1}. {step.label}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const T3_ProduitRegion: React.FC<T3ProduitRegionProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // حركات المشهد الأخير
  const ctaPop = spring({ fps, frame: frame - 510, config: { damping: 14 }, from: 0.8, to: 1 });
  const ctaOpacity = interpolate(frame, [510, 525], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <BrandWatermark brandName={props.brandName} />
      
      <Sequence from={0} durationInFrames={90}>
        <SceneGeoHook hookFr={props.hookFr} hookDarija={props.hookDarija} bgImage={props.regionBgImage} />
      </Sequence>
      
      <Sequence from={90} durationInFrames={210}>
        <SceneRegionalJourney region={props.region!} funFacts={props.funFacts || []} bgImage={props.regionBgImage} productImage={props.productImage} />
      </Sequence>
      
      <Sequence from={300} durationInFrames={210}>
        <SceneExtraction extractionSteps={props.extractionSteps || []} bgImage={props.extractionBgImage} productImage={props.productImage} />
      </Sequence>
      
      {/* المشهد الأخير تم تعديله بالكامل */}
      <Sequence from={510} durationInFrames={90}>
        <AbsoluteFill>
          {/* التعديل الأول: تقليل الضبابية إلى 3px */}
          <Img src={props.ctaBgImage || props.productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(3px)', transform: 'scale(1.1)' }} />
          <AbsoluteFill style={{ background: 'rgba(0,0,0,0.55)' }} />
        </AbsoluteFill>
        
        {/* التعديل الثاني: الأزرار مرفوعة (Column) وفي وسط الشاشة (تم حذف صورة المنتج المربعة من هنا) */}
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: 30, transform: `scale(${ctaPop})`, opacity: ctaOpacity, paddingBottom: 60 }}>
           
           {/* نص التحفيز */}
           <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: 44, fontWeight: 'bold', color: COLORS.white, textAlign: 'center', padding: '0 40px', textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>
             {props.cta}
           </span>
           
           {/* الأزرار العمودية */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
             {props.websiteUrl && (
               <div style={{ background: '#fff', padding: '20px 60px', borderRadius: 50, minWidth: 380, textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                 <span style={{ fontFamily: FONTS.display, fontSize: 32, color: '#000', fontWeight: 'black' }}>{props.websiteUrl}</span>
               </div>
             )}
             {props.whatsappNumber && (
               <div style={{ background: '#25D366', padding: '20px 60px', borderRadius: 50, display: 'flex', alignItems: 'center', gap: 15, minWidth: 380, justifyContent: 'center', boxShadow: '0 10px 30px rgba(37,211,102,0.4)' }}>
                 <WhatsAppIcon />
                 <span style={{ fontFamily: FONTS.display, fontSize: 32, color: '#fff', fontWeight: 'bold' }}>{props.whatsappNumber}</span>
               </div>
             )}
           </div>
           
        </AbsoluteFill>
      </Sequence>
      
      <Sequence from={90} durationInFrames={210}>
        {/* التعديل الثالث: رفعنا الـ TikTok Caption إلى 150 لكي تكون مرفوعة "قليلاً" فقط ولا تغطي الـ etap */}
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="slide-up" bgColor={COLORS.green} bottom={150} />
      </Sequence>
      
    </AbsoluteFill>
  );
};
export default T3_ProduitRegion;
