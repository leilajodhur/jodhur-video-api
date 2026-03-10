import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { PriceTag, UrgencyBadge } from '../components/PriceTag';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T1PromoFlashProps } from '../types';

const SceneHook: React.FC<Pick<T1PromoFlashProps, 'hookFr' | 'hookDarija'>> = ({ hookFr, hookDarija }) => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      <AbsoluteFill style={{ background: GRADIENTS.hammam, opacity: bgOpacity }} />
      <HookText hookFr={hookFr} hookDarija={hookDarija} variant="punch" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
    </AbsoluteFill>
  );
};

const SceneProduct: React.FC<{ productName: string; productImage: string; benefits: string[]; }> = ({ productName, productImage, benefits }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imageScale = spring({ fps, frame, config: { damping: 14, stiffness: 100 }, from: 1.08, to: 1 });
  return (
    <AbsoluteFill style={{ background: COLORS.cream }}>
      {/* تأثير إضاءة (Glow) خلف المنتج */}
      <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <div style={{ width: '80%', height: '50%', background: COLORS.goldLight, filter: 'blur(80px)', opacity: 0.3, borderRadius: '50%' }} />
      </AbsoluteFill>
      <AbsoluteFill>
        <Img src={productImage} style={{ width: '100%', height: '70%', objectFit: 'cover', transform: `scale(${imageScale})` }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(to top, ${COLORS.cream} 35%, transparent 70%)` }} />
      <div style={{ position: 'absolute', top: '60%', left: 40, right: 40 }}>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, fontWeight: FONT_WEIGHTS.black, color: COLORS.primaryDark, display: 'block', textAlign: 'center' }}>{productName}</span>
      </div>
      <div style={{ position: 'absolute', top: '74%', left: 48, right: 48, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {benefits?.slice(0, 2).map((b, i) => {
          const itemFrame = Math.max(0, frame - i * 12);
          const itemOpacity = interpolate(itemFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
          return (
            <div key={i} style={{ opacity: itemOpacity, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 20, color: COLORS.white }}>✓</span></div>
              <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.backgroundDark }}>{b}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const ScenePrice: React.FC<{ originalPriceMAD: number; promoPriceMAD: number; promoCode?: string; urgencyText: string; backgroundImage?: string; }> = ({ originalPriceMAD, promoPriceMAD, promoCode, urgencyText, backgroundImage }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      {/* الصورة أصبحت ساطعة أكثر */}
      {backgroundImage && <AbsoluteFill><Img src={backgroundImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} /></AbsoluteFill>}
      {/* التدرج اللوني أصبح أخف ليبرز الصورة */}
      <AbsoluteFill style={{ background: 'linear-gradient(160deg, rgba(28,15,0,0.4) 0%, rgba(196,118,58,0.3) 100%)' }} />
      <UrgencyBadge text={urgencyText} startFrame={0} top={100} right={40} />
      <div style={{ position: 'absolute', top: 120, left: 40 }}>
        <span style={{ fontFamily: FONTS.display, fontSize: 56, fontWeight: FONT_WEIGHTS.black, color: COLORS.gold }}>FLASH</span><br />
        <span style={{ fontFamily: FONTS.body, fontSize: 40, fontWeight: FONT_WEIGHTS.bold, color: COLORS.sand }}>PROMO</span>
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        <SceneHook hookFr={props.hookFr} hookDarija={props.hookDarija} />
      </Sequence>
      <Sequence from={60} durationInFrames={150}>
        <SceneProduct productName={props.productName} productImage={props.productImage} benefits={props.benefits || []} />
      </Sequence>
      <Sequence from={210} durationInFrames={150}>
        <ScenePrice originalPriceMAD={props.originalPriceMAD!} promoPriceMAD={props.promoPriceMAD!} promoCode={props.promoCode} urgencyText={props.urgencyText!} backgroundImage={props.backgroundImage} />
      </Sequence>
      <Sequence from={360} durationInFrames={90}>
        {/* الخاتمة السينمائية الجديدة - صورة مغبشة خلف الزر */}
        <AbsoluteFill>
          <Img src={props.productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(15px)', transform: 'scale(1.1)' }} />
          <AbsoluteFill style={{ background: 'rgba(28,15,0,0.5)' }} />
        </AbsoluteFill>
        <CTAOverlay ctaText={props.cta} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} startFrame={0} variant="full" />
      </Sequence>
      <Sequence from={60} durationInFrames={150}>
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="slide-up" bgColor={COLORS.backgroundDark} bottom={60} />
      </Sequence>
    </AbsoluteFill>
  );
};
export default T1_PromoFlash;
