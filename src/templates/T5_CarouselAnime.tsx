import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { T5CarouselProps } from '../types';

const FRAMES_PER_SLIDE = 150; 

const SlideDots: React.FC<{ total: number; current: number }> = ({ total, current }) => (
  <div style={{ position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 12, zIndex: 20 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ width: i === current ? 50 : 16, height: 8, borderRadius: 4, background: i === current ? COLORS.gold : 'rgba(255,255,255,0.4)', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: i === current ? '0 0 10px rgba(196,118,58,0.5)' : 'none' }} />
    ))}
  </div>
);

const Slide: React.FC<{ slide: any; slideIndex: number; totalSlides: number; isLast: boolean; cta: string; whatsappNumber?: string; websiteUrl?: string; brandName: string; fallbackImage: string; }> = ({ slide, slideIndex, totalSlides, isLast, cta, whatsappNumber, websiteUrl, brandName, fallbackImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const enterX = spring({ fps, frame, config: { damping: 18, stiffness: 120 }, from: 1080, to: 0 });
  const textY = spring({ fps, frame: frame - 15, config: { damping: 15 }, from: 50, to: 0 });
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });

  const slideImg = slide.image || fallbackImage;

  return (
    <AbsoluteFill style={{ background: '#000', transform: `translateX(${enterX}px)` }}>
      
      {/* الصورة الآن تملأ الشاشة بالكامل وواضحة جداً وبدون ألوان بنية */}
      <AbsoluteFill>
        <Img src={slideImg} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }} />
        <AbsoluteFill style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)' }} />
      </AbsoluteFill>

      <SlideDots total={totalSlides} current={slideIndex} />

      {/* التعديل الأول: تم رفع البطاقة للأعلى بتغيير top إلى 25% */}
      <AbsoluteFill style={{ top: '25%', bottom: 'auto', padding: '0 40px', justifyContent: 'center' }}>
        
        {/* التعديل الثاني: تخفيف الضبابية إلى blur(3px) */}
        <div style={{ transform: `translateY(${textY}px)`, opacity: textOpacity, background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(3px)', border: `1px solid rgba(255,255,255,0.2)`, borderLeft: `4px solid ${COLORS.gold}`, borderRadius: 32, padding: '40px 30px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
           
           <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: FONT_SIZES.subtitle, fontWeight: FONT_WEIGHTS.black, color: COLORS.gold, lineHeight: 1.2 }}>
             {slide.title}
           </span>
           
           <span style={{ fontFamily: FONTS.arabic || 'sans-serif', fontSize: FONT_SIZES.body + 4, color: COLORS.white, lineHeight: 1.5 }}>
             {slide.body}
           </span>
        </div>
      </AbsoluteFill>

      {isLast && (
        <Sequence from={75} durationInFrames={75}>
          <CTAOverlay ctaText={cta} whatsappNumber={whatsappNumber} websiteUrl={websiteUrl} brandName={brandName} startFrame={0} variant="whatsapp" />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

export const T5_CarouselAnime: React.FC<T5CarouselProps> = (props) => {
  const validSlides = (props.slides || []).filter(s => s && s.title && s.title.trim() !== '');
  if (validSlides.length === 0) {
    validSlides.push({ title: "Découvrez notre produit", body: "Le secret de la nature marocaine.", image: props.productImage });
  }

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <BrandWatermark brandName={props.brandName} />
      
      {validSlides.map((slide, index) => (
        <Sequence key={index} from={index * FRAMES_PER_SLIDE} durationInFrames={validSlides.length * FRAMES_PER_SLIDE - (index * FRAMES_PER_SLIDE)}>
          <Slide 
            slide={slide} 
            slideIndex={index} 
            totalSlides={validSlides.length} 
            cta={props.cta} 
            whatsappNumber={props.whatsappNumber} 
            websiteUrl={props.websiteUrl} 
            brandName={props.brandName} 
            isLast={index === validSlides.length - 1} 
            fallbackImage={props.productImage} 
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export default T5_CarouselAnime;
