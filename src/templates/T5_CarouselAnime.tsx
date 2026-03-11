import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { T5CarouselProps } from '../types';

const FRAMES_PER_SLIDE = 150; // 5 ثواني لكل شريحة

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
  
  // حركة دخول انسيابية للشريحة
  const enterX = spring({ fps, frame, config: { damping: 18, stiffness: 120 }, from: 1080, to: 0 });
  
  // حركة دخول النص من الأسفل
  const textY = spring({ fps, frame: frame - 15, config: { damping: 15 }, from: 100, to: 0 });
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });

  const slideImg = slide.image || fallbackImage;

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, transform: `translateX(${enterX}px)` }}>
      
      {/* 1. الصورة أصبحت كبيرة وتملأ الشاشة العلوية */}
      <AbsoluteFill style={{ height: '70%', top: 0 }}>
        <Img src={slideImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <AbsoluteFill style={{ background: 'linear-gradient(to top, rgba(28,15,0,1) 0%, transparent 100%)' }} />
      </AbsoluteFill>

      {/* 2. نقاط التمرير في الأعلى */}
      <SlideDots total={totalSlides} current={slideIndex} />

      {/* 3. البطاقة الزجاجية الفخمة للنصوص في الأسفل */}
      <AbsoluteFill style={{ top: '55%', bottom: 0, padding: '0 40px', justifyContent: 'center' }}>
        <div style={{ transform: `translateY(${textY}px)`, opacity: textOpacity, background: 'rgba(28, 15, 0, 0.6)', backdropFilter: 'blur(20px)', borderTop: `2px solid ${COLORS.gold}`, borderBottom: `1px solid rgba(255,255,255,0.1)`, borderRadius: 32, padding: '40px 30px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 -10px 40px rgba(0,0,0,0.5)' }}>
           
           <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, fontWeight: FONT_WEIGHTS.black, color: COLORS.gold, lineHeight: 1.2 }}>
             {slideIndex + 1}. {slide.title}
           </span>
           
           <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body + 2, color: COLORS.white, lineHeight: 1.5 }}>
             {slide.body}
           </span>
        </div>
      </AbsoluteFill>

      {/* 4. الـ CTA يظهر فقط في الشريحة الأخيرة */}
      {isLast && (
        <Sequence from={75} durationInFrames={75}>
          <CTAOverlay ctaText={cta} whatsappNumber={whatsappNumber} websiteUrl={websiteUrl} brandName={brandName} startFrame={0} variant="whatsapp" />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

export const T5_CarouselAnime: React.FC<T5CarouselProps> = (props) => {
  // الكود الذكي: يقرأ فقط الشرائح الحقيقية المليئة بالبيانات ويتجاهل الفارغة
  const validSlides = (props.slides || []).filter(s => s && s.title && s.title.trim() !== '');
  
  // إذا لم يجد شيئاً، يضع شريحة افتراضية واحدة فقط للحماية من الانهيار
  if (validSlides.length === 0) {
    validSlides.push({ title: "Découvrez notre produit", body: "Le secret de la nature marocaine.", image: props.productImage });
  }

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
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
