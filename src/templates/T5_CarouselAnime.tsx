import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { T5CarouselProps } from '../types';

const FRAMES_PER_SLIDE = 150; // 5 ثواني لكل شريحة

const SlideDots: React.FC<{ total: number; current: number }> = ({ total, current }) => (
  <div style={{ position: 'absolute', bottom: 44, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 10 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ width: i === current ? 32 : 10, height: 10, borderRadius: 5, background: i === current ? COLORS.gold : 'rgba(255,255,255,0.35)' }} />
    ))}
  </div>
);

const Slide: React.FC<{ slide: any; slideIndex: number; totalSlides: number; carouselTitle: string; brandName: string; cta: string; isLast: boolean; whatsappNumber?: string; websiteUrl?: string; }> = ({ slide, slideIndex, totalSlides, carouselTitle, brandName, cta, isLast, whatsappNumber, websiteUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enterX = spring({ fps, frame, config: { damping: 22, stiffness: 160 }, from: 1080, to: 0 });

  return (
    <AbsoluteFill style={{ background: slide.bgColor || GRADIENTS.hammam, transform: `translateX(${enterX}px)`, padding: '120px 52px' }}>
      {slide.image && <AbsoluteFill><Img src={slide.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} /></AbsoluteFill>}
      <SlideDots total={totalSlides} current={slideIndex} />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {slideIndex === 0 && (
           <>
             <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.hook - 10, fontWeight: FONT_WEIGHTS.black, color: COLORS.white }}>{carouselTitle}</span>
             <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: 'rgba(255,255,255,0.75)' }}>{slide.subtitle}</span>
           </>
        )}
        {slideIndex > 0 && !isLast && (
           <>
             <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, fontWeight: FONT_WEIGHTS.black, color: COLORS.white }}>{slide.title}</span>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: 20 }}>
               <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: COLORS.cream }}>{slide.body}</span>
             </div>
           </>
        )}
        {isLast && (
           <>
             <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, color: COLORS.white, textAlign: 'center', marginTop: 60 }}>{slide.title}</span>
             <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: 'rgba(255,255,255,0.75)', textAlign: 'center' }}>{slide.body}</span>
           </>
        )}
      </div>

      {isLast && <CTAOverlay ctaText={cta} whatsappNumber={whatsappNumber} websiteUrl={websiteUrl} brandName={brandName} startFrame={30} variant="full" />}
    </AbsoluteFill>
  );
};

export const T5_CarouselAnime: React.FC<T5CarouselProps> = (props) => {
  // أخذ أول 4 شرائح فقط لتناسب وقت 20 ثانية
  const fastSlides = props.slides?.slice(0, 4) || []; 
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
