import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { BrandWatermark } from '../components/CTAOverlay';
import type { T2HeritageStoryProps } from '../types';

// أيقونة الواتساب للمشهد الأخير
const WhatsAppIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const SceneAtmosphere: React.FC<{ bgImage?: string; hookFr: string; }> = ({ bgImage, hookFr }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 150], [1, 1.1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      {bgImage && <Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`, opacity: 1 }} />}
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)` }} />
      <div style={{ position: 'absolute', bottom: 300, left: 48, right: 48, textAlign: 'center' }}>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.hookSub, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, lineHeight: 1.2, textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>{hookFr}</span>
      </div>
    </AbsoluteFill>
  );
};

const SceneStory: React.FC<{ storyText: string; hookDarija: string; productImage: string; bgImage?: string; }> = ({ storyText, hookDarija, productImage, bgImage }) => {
  const frame = useCurrentFrame();
  const fadeText = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: COLORS.parchment }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', overflow: 'hidden' }}>
        <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to top, ${COLORS.parchment} 0%, transparent 100%)` }} />
      </div>
      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, top: '55%', padding: '0 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24, opacity: fadeText }}>
        <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: FONT_SIZES.body + 2, fontStyle: 'italic', color: COLORS.charcoal, textAlign: 'center' }}>"{storyText}"</span>
        <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: FONT_SIZES.subtitle, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary, direction: 'rtl', textAlign: 'center' }}>{hookDarija}</span>
      </div>
    </AbsoluteFill>
  );
};

const SceneHeritage: React.FC<{ emotion: string; productName: string; bgImage?: string; }> = ({ emotion, productName, bgImage }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 150], [1.1, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      {bgImage && <AbsoluteFill><Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})`, opacity: 1 }} /></AbsoluteFill>}
      <AbsoluteFill style={{ background: `radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)` }} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0 56px' }}>
        <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: FONT_SIZES.title, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, textAlign: 'center', marginBottom: 20, textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>{emotion}</span>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold, textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>— {productName}</span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const T2_HeritageStory: React.FC<T2HeritageStoryProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // حركات المشهد الأخير
  const ctaPop = spring({ fps, frame: frame - 360, config: { damping: 14 }, from: 0.8, to: 1 });
  const ctaOpacity = interpolate(frame, [360, 375], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <BrandWatermark brandName={props.brandName} />
      
      <Sequence from={0} durationInFrames={90}>
        <SceneAtmosphere bgImage={props.atmosphereBgImage} hookFr={props.hookFr} />
      </Sequence>
      
      <Sequence from={90} durationInFrames={120}>
        <SceneStory storyText={props.scriptAngle || props.hookFr} hookDarija={props.hookDarija} productImage={props.productImage} bgImage={props.storyBgImage} />
      </Sequence>
      
      <Sequence from={210} durationInFrames={150}>
        <SceneHeritage emotion={props.storytellingEmotion || ''} productName={props.productName} bgImage={props.heritageBgImage || props.productImage} />
      </Sequence>
      
      {/* المشهد الأخير: ضبابية خفيفة جداً، منتج مجسم في الوسط، وأزرار مرفوعة */}
      <Sequence from={360} durationInFrames={90}>
        <AbsoluteFill>
          <Img src={props.ctaBgImage || props.productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(3px)', transform: 'scale(1.1)' }} />
          <AbsoluteFill style={{ background: 'rgba(0,0,0,0.55)' }} />
        </AbsoluteFill>
        
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: 30, transform: `scale(${ctaPop})`, opacity: ctaOpacity, paddingBottom: 60 }}>
           
           {/* المنتج المجسم الواضح */}
           <Img src={props.productImage} style={{ width: 350, height: 350, objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))' }} />
           
           {/* نص التحفيز */}
           <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: 44, fontWeight: 'bold', color: COLORS.white, textAlign: 'center', padding: '0 40px', textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>
             {props.cta}
           </span>
           
           {/* الأزرار المرفوعة والواضحة */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
             {props.whatsappNumber && (
               <div style={{ background: '#25D366', padding: '20px 60px', borderRadius: 50, display: 'flex', alignItems: 'center', gap: 15, minWidth: 380, justifyContent: 'center', boxShadow: '0 10px 30px rgba(37,211,102,0.4)' }}>
                 <WhatsAppIcon />
                 <span style={{ fontFamily: FONTS.display, fontSize: 32, color: '#fff', fontWeight: 'bold' }}>{props.whatsappNumber}</span>
               </div>
             )}
           </div>
           
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
export default T2_HeritageStory;
