import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS } from '../constants/colors';
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

const WhatsAppIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const SceneHook: React.FC<{ hookFr: string; hookDarija: string; bgImage?: string; overlayOpacity?: number }> = ({ hookFr, hookDarija, bgImage, overlayOpacity = 0.3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slowZoom = interpolate(frame, [0, fps * 3], [1.1, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      {bgImage && <Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${slowZoom})` }} />}
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)` }} />
      <HookText hookFr={hookFr} hookDarija={hookDarija} variant="punch" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
    </AbsoluteFill>
  );
};

const ScenePrice: React.FC<{ originalPriceMAD: number; promoPriceMAD: number; promoCode?: string; urgencyText: string; bgImage?: string; productImage: string; productName: string; }> = ({ originalPriceMAD, promoPriceMAD, promoCode, urgencyText, bgImage, productImage, productName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slowZoom = interpolate(frame, [0, 150], [1, 1.05], { extrapolateRight: 'clamp' });
  const pop = spring({ fps, frame: frame - 10, config: { damping: 12 }, from: 0.8, to: 1 });

  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <AbsoluteFill>
         <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(3px)', opacity: 0.85, transform: `scale(${slowZoom})` }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)' }} />
      <UrgencyBadge text={urgencyText} startFrame={0} top={100} right={40} />
      
      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontFamily: FONTS.display, fontSize: 44, fontWeight: FONT_WEIGHTS.black, color: COLORS.gold }}>OFFRE </span>
        <span style={{ fontFamily: FONTS.display, fontSize: 44, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white }}>SPÉCIALE</span>
      </div>
      
      <div style={{ position: 'absolute', top: '42%', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${pop})` }}>
         <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: 56, color: COLORS.white, fontWeight: 'bold', textShadow: '0 4px 20px rgba(0,0,0,0.9)', textAlign: 'center', padding: '0 30px' }}>{productName}</span>
      </div>

      <div style={{ position: 'absolute', bottom: 220, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PriceTag priceMAD={promoPriceMAD} originalPriceMAD={originalPriceMAD} promoCode={promoCode} startFrame={0} size="large" />
      </div>
    </AbsoluteFill>
  );
};

export const T1_PromoFlash: React.FC<T1PromoFlashProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ctaPop = spring({ fps, frame: frame - 360, config: { damping: 14 }, from: 0.8, to: 1 });
  const ctaOpacity = interpolate(frame, [360, 375], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <BrandWatermark brandName={props.brandName} />
      
      <Sequence from={0} durationInFrames={60}>
        <SceneHook hookFr={props.hookFr} hookDarija={props.hookDarija} bgImage={props.hookBgImage} />
      </Sequence>
      
      <Sequence from={60} durationInFrames={150}>
        <AbsoluteFill style={{ background: COLORS.cream }}>
           <Img src={props.productImage} style={{ width: '100%', height: '65%', objectFit: 'contain', marginTop: 40 }} />
           <AbsoluteFill style={{ background: `linear-gradient(to top, ${COLORS.cream} 40%, transparent 80%)` }} />
           <div style={{ position: 'absolute', top: '60%', left: 0, right: 0, textAlign: 'center' }}>
              <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, fontWeight: 'black', color: COLORS.primaryDark }}>{props.productName}</span>
           </div>
        </AbsoluteFill>
      </Sequence>
      
      <Sequence from={210} durationInFrames={150}>
        <ScenePrice originalPriceMAD={props.originalPriceMAD!} promoPriceMAD={props.promoPriceMAD!} promoCode={props.promoCode} urgencyText={props.urgencyText!} bgImage={props.priceBgImage} productImage={props.productImage} productName={props.productName} />
      </Sequence>
      
      <Sequence from={360} durationInFrames={90}>
        <AbsoluteFill>
          <Img src={props.ctaBgImage || props.productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(3px)' }} />
          <AbsoluteFill style={{ background: 'rgba(0,0,0,0.65)' }} />
        </AbsoluteFill>
        
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: 40, transform: `scale(${ctaPop})`, opacity: ctaOpacity }}>
           <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: 50, fontWeight: 'bold', color: COLORS.white, textAlign: 'center', padding: '0 40px', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>{props.cta}</span>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
             {props.websiteUrl && (
               <div style={{ background: '#fff', padding: '24px 60px', borderRadius: 50, minWidth: 400, textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                 <span style={{ fontFamily: FONTS.display, fontSize: 32, color: '#000', fontWeight: 'black' }}>{props.websiteUrl}</span>
               </div>
             )}
             {props.whatsappNumber && (
               <div style={{ background: '#25D366', padding: '24px 60px', borderRadius: 50, display: 'flex', alignItems: 'center', gap: 20, minWidth: 400, justifyContent: 'center', boxShadow: '0 10px 30px rgba(37,211,102,0.4)' }}>
                 <WhatsAppIcon />
                 <span style={{ fontFamily: FONTS.display, fontSize: 36, color: '#fff', fontWeight: 'black' }}>{props.whatsappNumber}</span>
               </div>
             )}
           </div>
        </AbsoluteFill>
      </Sequence>
      
      <Sequence from={60} durationInFrames={150}>
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="slide-up" bgColor={COLORS.backgroundDark} bottom={380} />
      </Sequence>
    </AbsoluteFill>
  );
};
export default T1_PromoFlash;
