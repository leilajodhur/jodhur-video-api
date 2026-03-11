import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { PriceTag, UrgencyBadge } from '../components/PriceTag';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T1PromoFlashProps } from '../types';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const SceneHook: React.FC<{ hookFr: string; hookDarija: string; bgImage?: string; overlayOpacity?: number }> = ({ hookFr, hookDarija, bgImage, overlayOpacity = 0.3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slowZoom = interpolate(frame, [0, fps * 3], [1.1, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      {bgImage && (
        <AbsoluteFill>
          <Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${slowZoom})`, opacity: 1 }} />
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)`, opacity: overlayOpacity + 0.3 }} />
      <HookText hookFr={hookFr} hookDarija={hookDarija} variant="punch" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
    </AbsoluteFill>
  );
};

const SceneProduct: React.FC<{ productName: string; productImage: string; bgImage?: string; benefits: string[]; }> = ({ productName, productImage, bgImage, benefits }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imageScale = spring({ fps, frame, config: { damping: 14, stiffness: 100 }, from: 1.08, to: 1 });
  
  return (
    <AbsoluteFill style={{ background: COLORS.cream }}>
      {bgImage && <AbsoluteFill><Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} /></AbsoluteFill>}
      
      <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <div style={{ width: '80%', height: '50%', background: COLORS.goldLight, filter: 'blur(80px)', opacity: 0.4, borderRadius: '50%' }} />
      </AbsoluteFill>
      <AbsoluteFill>
        <Img src={productImage} style={{ width: '100%', height: '65%', objectFit: 'contain', transform: `scale(${imageScale})`, marginTop: 40 }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(to top, ${COLORS.cream} 40%, transparent 80%)` }} />
      
      <div style={{ position: 'absolute', top: '60%', left: 40, right: 40 }}>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, fontWeight: FONT_WEIGHTS.black, color: COLORS.primaryDark, display: 'block', textAlign: 'center' }}>{productName}</span>
      </div>
      <div style={{ position: 'absolute', top: '72%', left: 48, right: 48, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {benefits?.slice(0, 2).map((b, i) => {
          const itemFrame = Math.max(0, frame - i * 12);
          const itemOpacity = interpolate(itemFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{ opacity: itemOpacity, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(196,118,58,0.4)' }}>
                <CheckIcon />
              </div>
              <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: FONT_SIZES.body, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.backgroundDark }}>{b}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// المشهد المعدل بالكامل بناءً على أوامرك الصارمة!
const ScenePrice: React.FC<{ originalPriceMAD: number; promoPriceMAD: number; promoCode?: string; urgencyText: string; bgImage?: string; productImage: string; productName: string; }> = ({ originalPriceMAD, promoPriceMAD, promoCode, urgencyText, bgImage, productImage, productName }) => {
  const frame = useCurrentFrame();
  const slowZoom = interpolate(frame, [0, 150], [1, 1.05], { extrapolateRight: 'clamp' });
  const { fps } = useVideoConfig();
  const pop = spring({ fps, frame: frame - 10, config: { damping: 12 }, from: 0.5, to: 1 });

  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      {bgImage && (
        <AbsoluteFill>
           <Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, transform: `scale(${slowZoom})` }} />
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(196,118,58,0.2) 0%, rgba(0,0,0,0.8) 100%)' }} />
      
      <UrgencyBadge text={urgencyText} startFrame={0} top={100} right={40} />
      
      {/* 1. تم التوسيط لتجنب الاصطدام مع شعار JODHUR */}
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontFamily: FONTS.display, fontSize: 44, fontWeight: FONT_WEIGHTS.black, color: COLORS.gold }}>OFFRE </span>
        <span style={{ fontFamily: FONTS.display, fontSize: 44, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white }}>SPÉCIALE</span>
      </div>
      
      {/* 2. تكبير حجم المنتج بشكل هائل ليكون البطل */}
      <div style={{ position: 'absolute', top: '24%', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${pop})` }}>
         <Img src={productImage} style={{ width: 400, height: 400, objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }} />
         <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: 32, color: COLORS.white, marginTop: 10, fontWeight: 'bold' }}>{productName}</span>
      </div>

      {/* 3. رفع السعر للأعلى لكي لا يبقى في القاع */}
      <div style={{ position: 'absolute', bottom: 220, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PriceTag priceMAD={promoPriceMAD} originalPriceMAD={originalPriceMAD} promoCode={promoCode} startFrame={0} size="large" />
      </div>
    </AbsoluteFill>
  );
};

export const T1_PromoFlash: React.FC<T1PromoFlashProps> = (props) => {
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      <BrandWatermark brandName={props.brandName} />
      
      <Sequence from={0} durationInFrames={60}>
        <SceneHook hookFr={props.hookFr} hookDarija={props.hookDarija} bgImage={props.hookBgImage} overlayOpacity={props.customOverlayOpacity} />
      </Sequence>
      
      <Sequence from={60} durationInFrames={150}>
        <SceneProduct productName={props.productName} productImage={props.productImage} bgImage={props.productBgImage} benefits={props.benefits || []} />
      </Sequence>
      
      <Sequence from={210} durationInFrames={150}>
        <ScenePrice originalPriceMAD={props.originalPriceMAD!} promoPriceMAD={props.promoPriceMAD!} promoCode={props.promoCode} urgencyText={props.urgencyText!} bgImage={props.priceBgImage} productImage={props.productImage} productName={props.productName} />
      </Sequence>
      
      <Sequence from={360} durationInFrames={90}>
        {/* 4. حل كارثة المنتج المتخفي في المشهد الأخير! */}
        <AbsoluteFill>
          <Img src={props.ctaBgImage || props.productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(20px)', transform: 'scale(1.1)' }} />
          <AbsoluteFill style={{ background: 'rgba(0,0,0,0.65)' }} />
        </AbsoluteFill>
        
        {/* إظهار المنتج مجسماً وواضحاً في الواجهة */}
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 160 }}>
           <Img src={props.productImage} style={{ width: 380, height: 380, objectFit: 'contain', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.6))' }} />
        </AbsoluteFill>

        <CTAOverlay ctaText={props.cta} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} startFrame={0} variant="full" />
      </Sequence>
      
      <Sequence from={60} durationInFrames={150}>
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="slide-up" bgColor={COLORS.backgroundDark} bottom={380} />
      </Sequence>
    </AbsoluteFill>
  );
};
export default T1_PromoFlash;
