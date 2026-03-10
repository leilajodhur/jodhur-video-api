import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { T5CarouselProps } from '../types';

const FRAMES_PER_SLIDE = 150; // 5 ثواني لكل شريحة

const SlideDots: React.FC<{ total: number; current: number }> = ({ total, current }) => (
  <div style={{ position: 'absolute', bottom: 44, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 12 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ width: i === current ? 40 : 12, height: 12, borderRadius: 6, background: i === current ? COLORS.gold : 'rgba(255,255,255,0.3)', transition: 'all 0.3s' }} />
    ))}
  </div>
);

const Slide: React.FC<{ slide: any; slideIndex: number; totalSlides: number; carouselTitle: string; brandName: string; cta: string; isLast: boolean; whatsappNumber?: string; websiteUrl?: string; }> = ({ slide, slideIndex, totalSlides, carouselTitle, brandName, cta, isLast, whatsappNumber, websiteUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enterX = spring({ fps, frame, config: { damping: 22, stiffness: 160 }, from: 1080, to: 0 });

  return (
    <AbsoluteFill style={{ background: slide.bgColor || COLORS.backgroundDark, transform: `translateX(${enterX}px)` }}>
      {/* خلفية فخمة ومغبشة دائماً */}
      {slide.image && (
        <AbsoluteFill>
          <Img src={slide.image} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(30px)', opacity: 0.4, transform: 'scale(1.1)' }} />
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{ padding: '160px 52px 120px 52px', background: 'rgba(0,0,0,0.2)' }}>
        <SlideDots total={totalSlides} current={slideIndex} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {slideIndex === 0 && (
             <>
               <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.hook - 20, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, lineHeight: 1.2 }}>{carouselTitle}</span>
               <div style={{ width: 100, height: 4, background: COLORS.gold, borderRadius: 2 }} />
               <span style={{ fontFamily: FONTS.arabic, fontSize: FONT_SIZES.subtitle, color: COLORS.sand, direction: 'rtl', lineHeight: 1.4 }}>{slide.subtitle}</span>
             </>
          )}
          {slideIndex > 0 && !isLast && (
             <>
               <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, fontWeight: FONT_WEIGHTS.black, color: COLORS.gold }}>{slide.title}</span>
               <div style={{ background: 'rgba(255,255,255,0.1)', padding: '32px', borderRadius: 24, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                 <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: COLORS.white, lineHeight: 1.5 }}>{slide.body}</span>
               </div>
               {slide.image && <Img src={slide.image} style={{ width: '100%', height: 350, objectFit: 'cover', borderRadius: 24, marginTop: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />}
             </>
          )}
          {isLast && (
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', marginTop: -40 }}>
               {slide.image && <Img src={slide.image} style={{ width: 300, height: 300, objectFit: 'contain', borderRadius: 24, marginBottom: 40 }} />}
               <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, color: COLORS.gold, textAlign: 'center', fontWeight: 'black' }}>{slide.title}</span>
               <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: COLORS.white, textAlign: 'center', marginTop: 16 }}>{slide.body}</span>
             </div>
          )}
        </div>
      </AbsoluteFill>

      {isLast && <CTAOverlay ctaText={cta} whatsappNumber={whatsappNumber} websiteUrl={websiteUrl} brandName={brandName} startFrame={30} variant="full" />}
    </AbsoluteFill>
  );
};

export const T5_CarouselAnime: React.FC<T5CarouselProps> = (props) => {
  // استخدام 4 شرائح دائماً. إذا تم إرسال أقل، سيقوم النظام بتعويضها تلقائياً لتجنب الشاشة السوداء.
  const safeSlides = props.slides || [];
  while (safeSlides.length < 4) {
      safeSlides.push({ title: "JODHUR", body: "Beauté authentique", image: props.slides?.[0]?.image || "" });
  }
  const fastSlides = safeSlides.slice(0, 4); 

  return (
    <AbsoluteFill>
      <BrandWatermark brandName={props.brandName} />
      {fastSlides.map((slide, index) => (
        <Sequence key={index} from={index * FRAMES_PER_SLIDE} durationInFrames={FRAMES_PER_SLIDE}>
          <Slide slide={slide} slideIndex={index} totalSlides={fastSlides.length} carouselTitle={props.carouselTitle!} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} cta={props.cta} isLast={index === fastSlides.length - 1} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
export default T5_CarouselAnime;
