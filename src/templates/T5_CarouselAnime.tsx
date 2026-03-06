// ============================================================
// T5_CarouselAnime — Carousel animé ~45s
// ============================================================
// Format   : 1080 × 1920 (9:16)
// Durée    : 45 s → 1350 frames @ 30 fps
// Pilier   : Guide / Éducation / Produit multi-bénéfices
// Exemple  : Guide Argan (S2/Mar) · 5 slides
//
// Chaque slide = ~9s (270 frames) avec auto-advance
// Slide 1 : Titre accrocheur (hook)
// Slide 2–4 : Contenu éducatif / bénéfices
// Slide 5 : CTA + Récapitulatif
//
// Transitions : slide horizontal + spring + fade
// ============================================================

import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
} from 'remotion';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { T5CarouselProps } from '../types';

// ─── Durée par slide ──────────────────────────────────────────
const FRAMES_PER_SLIDE = 270; // 9s @ 30fps

// ─── Indicateurs de pagination ───────────────────────────────
const SlideDots: React.FC<{ total: number; current: number }> = ({ total, current }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 44,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      gap: 10,
    }}
  >
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === current ? 32 : 10,
          height: 10,
          borderRadius: 5,
          background: i === current ? COLORS.gold : 'rgba(255,255,255,0.35)',
          transition: 'width 0.3s',
        }}
      />
    ))}
  </div>
);

// ─── Numéro de slide flottant ─────────────────────────────────
const SlideNumber: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div
    style={{
      position: 'absolute',
      top: 58,
      right: 48,
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(8px)',
      borderRadius: 50,
      padding: '6px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    }}
  >
    <span
      style={{
        fontFamily: FONTS.body,
        fontSize: FONT_SIZES.caption - 6,
        fontWeight: FONT_WEIGHTS.black,
        color: COLORS.gold,
      }}
    >
      {current + 1}
    </span>
    <span
      style={{
        fontFamily: FONTS.body,
        fontSize: FONT_SIZES.caption - 6,
        color: 'rgba(255,255,255,0.5)',
      }}
    >
      /{total}
    </span>
  </div>
);

// ─── Flèche "glisser" ─────────────────────────────────────────
const SwipeHint: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(
    frame % 60,
    [0, 20, 40, 60],
    [0.3, 1, 1, 0.3],
    { extrapolateRight: 'clamp' }
  );
  const x = interpolate(frame % 60, [0, 30, 60], [-8, 8, -8]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        right: 44,
        opacity,
        transform: `translateX(${x}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <span style={{ fontSize: 28 }}>👆</span>
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: 26,
          fontWeight: FONT_WEIGHTS.semibold,
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        Glisse
      </span>
    </div>
  );
};

// ─── Slide individuelle ───────────────────────────────────────
const Slide: React.FC<{
  slide: T5CarouselProps['slides'][0];
  slideIndex: number;
  totalSlides: number;
  carouselTitle: string;
  saveText?: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  brandName: string;
  cta: string;
  isLast: boolean;
}> = ({
  slide,
  slideIndex,
  totalSlides,
  carouselTitle,
  saveText,
  whatsappNumber,
  websiteUrl,
  brandName,
  cta,
  isLast,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation d'entrée : slide vient de la droite
  const enterX = spring({
    fps,
    frame,
    config: { damping: 22, stiffness: 160, mass: 1 },
    from: 1080,
    to: 0,
  });

  // Fade du contenu après entrée
  const contentOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: 'clamp' });
  const contentY = spring({
    fps,
    frame: Math.max(0, frame - 8),
    config: { damping: 18, stiffness: 120 },
    from: 30,
    to: 0,
  });

  const isFirstSlide = slideIndex === 0;

  return (
    <AbsoluteFill
      style={{
        background: slide.bgColor || GRADIENTS.hammam,
        transform: `translateX(${enterX}px)`,
        overflow: 'hidden',
      }}
    >
      {/* Image de fond si présente */}
      {slide.image && (
        <AbsoluteFill>
          <Img
            src={slide.image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isFirstSlide ? 0.25 : 0.2,
            }}
          />
          <AbsoluteFill
            style={{
              background: `linear-gradient(180deg, ${slide.bgColor || COLORS.backgroundDark}CC 0%, ${slide.bgColor || COLORS.backgroundDark} 60%)`,
            }}
          />
        </AbsoluteFill>
      )}

      {/* Numéro + pagination */}
      <SlideNumber current={slideIndex} total={totalSlides} />
      <SlideDots total={totalSlides} current={slideIndex} />

      {/* Contenu */}
      <AbsoluteFill
        style={{
          padding: '120px 52px 120px',
          flexDirection: 'column',
          justifyContent: isFirstSlide ? 'center' : 'flex-start',
          gap: 20,
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
        }}
      >
        {/* Slide 1 : titre de la série + hook */}
        {isFirstSlide && (
          <>
            <div
              style={{
                background: COLORS.gold,
                borderRadius: 50,
                padding: '8px 24px',
                alignSelf: 'flex-start',
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: FONT_SIZES.caption - 4,
                  fontWeight: FONT_WEIGHTS.black,
                  color: COLORS.backgroundDark,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                GUIDE
              </span>
            </div>

            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: FONT_SIZES.hook - 10,
                fontWeight: FONT_WEIGHTS.black,
                color: slide.textColor || COLORS.white,
                lineHeight: 1.2,
              }}
            >
              {carouselTitle}
            </span>

            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: FONT_SIZES.body,
                fontWeight: FONT_WEIGHTS.medium,
                color: slide.textColor
                  ? `${slide.textColor}CC`
                  : 'rgba(255,255,255,0.75)',
                lineHeight: 1.5,
              }}
            >
              {slide.subtitle}
            </span>

            {saveText && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 12,
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: 16,
                  padding: '14px 20px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ fontSize: 28 }}>🔖</span>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: FONT_SIZES.body - 4,
                    fontWeight: FONT_WEIGHTS.semibold,
                    color: COLORS.gold,
                  }}
                >
                  {saveText}
                </span>
              </div>
            )}
          </>
        )}

        {/* Slides 2+ : titre + highlight + corps */}
        {!isFirstSlide && !isLast && (
          <>
            {/* Numéro décoratif grand */}
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 140,
                fontWeight: FONT_WEIGHTS.black,
                color: 'rgba(255,255,255,0.06)',
                lineHeight: 1,
                position: 'absolute',
                top: 80,
                right: 30,
              }}
            >
              {slideIndex}
            </span>

            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: FONT_SIZES.title,
                fontWeight: FONT_WEIGHTS.black,
                color: slide.textColor || COLORS.white,
                lineHeight: 1.2,
              }}
            >
              {slide.title}
            </span>

            {slide.highlight && (
              <div
                style={{
                  background: COLORS.gold,
                  borderRadius: 12,
                  padding: '10px 20px',
                  alignSelf: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: FONT_SIZES.body - 4,
                    fontWeight: FONT_WEIGHTS.black,
                    color: COLORS.backgroundDark,
                  }}
                >
                  ✨ {slide.highlight}
                </span>
              </div>
            )}

            {/* Corps du texte avec tirets */}
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: 20,
                padding: '24px 28px',
                marginTop: 8,
              }}
            >
              {slide.body.split('\n').map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 12,
                    marginBottom: 12,
                    opacity: interpolate(frame, [20 + i * 15, 35 + i * 15], [0, 1], {
                      extrapolateRight: 'clamp',
                    }),
                    transform: `translateX(${interpolate(
                      frame,
                      [20 + i * 15, 40 + i * 15],
                      [-20, 0],
                      { extrapolateRight: 'clamp' }
                    )}px)`,
                  }}
                >
                  <span
                    style={{
                      color: COLORS.gold,
                      fontSize: 26,
                      fontWeight: FONT_WEIGHTS.black,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    →
                  </span>
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: FONT_SIZES.body - 2,
                      fontWeight: FONT_WEIGHTS.medium,
                      color: slide.textColor || COLORS.cream,
                      lineHeight: 1.5,
                    }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>

            {slide.image && (
              <Img
                src={slide.image}
                style={{
                  width: '100%',
                  height: 260,
                  objectFit: 'cover',
                  borderRadius: 20,
                  marginTop: 8,
                  opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              />
            )}
          </>
        )}

        {/* Dernière slide : CTA + résumé */}
        {isLast && (
          <>
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: FONT_SIZES.title,
                fontWeight: FONT_WEIGHTS.black,
                color: slide.textColor || COLORS.white,
                textAlign: 'center',
                marginTop: 60,
              }}
            >
              {slide.title}
            </span>

            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: FONT_SIZES.body,
                color: 'rgba(255,255,255,0.75)',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              {slide.body}
            </span>
          </>
        )}
      </AbsoluteFill>

      {/* Flèche "glisse" sur les slides non-dernières */}
      {!isLast && <SwipeHint frame={frame} />}

      {/* CTA overlay dernière slide */}
      {isLast && (
        <CTAOverlay
          ctaText={cta}
          whatsappNumber={whatsappNumber}
          websiteUrl={websiteUrl}
          brandName={brandName}
          startFrame={30}
          variant="full"
        />
      )}
    </AbsoluteFill>
  );
};

// ─── Composition principale ────────────────────────────────────
export const T5_CarouselAnime: React.FC<T5CarouselProps> = (props) => {
  const {
    brandName,
    slides,
    carouselTitle,
    saveText,
    cta,
    whatsappNumber,
    websiteUrl,
  } = props;

  return (
    <AbsoluteFill>
      <BrandWatermark brandName={brandName} />

      {slides.map((slide, index) => (
        <Sequence
          key={index}
          from={index * FRAMES_PER_SLIDE}
          durationInFrames={FRAMES_PER_SLIDE}
        >
          <Slide
            slide={slide}
            slideIndex={index}
            totalSlides={slides.length}
            carouselTitle={carouselTitle}
            saveText={saveText}
            whatsappNumber={whatsappNumber}
            websiteUrl={websiteUrl}
            brandName={brandName}
            cta={cta}
            isLast={index === slides.length - 1}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export default T5_CarouselAnime;
