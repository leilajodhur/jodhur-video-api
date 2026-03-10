// ============================================================
// CTAOverlay — CTA adapté marché marocain
// WhatsApp · Lien bio · Site e-commerce
// ============================================================

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';

interface CTAOverlayProps {
  ctaText:         string;    // Texte CTA (from Excel cta column)
  whatsappNumber?: string;    // "+212600000000"
  websiteUrl?:     string;    // "jodhur.ma"
  brandName:       string;    // "JODHUR"
  startFrame?:     number;
  variant?:        'whatsapp' | 'link-bio' | 'website' | 'full';
}

// Icône WhatsApp SVG
const WhatsAppIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill="#25D366"/>
    <path
      d="M20 8C13.37 8 8 13.37 8 20c0 2.14.56 4.14 1.53 5.88L8 32l6.24-1.5A11.95 11.95 0 0020 32c6.63 0 12-5.37 12-12S26.63 8 20 8zm6.07 16.62c-.26.72-1.52 1.38-2.1 1.47-.56.08-1.28.12-2.06-.13-.47-.15-1.08-.35-1.85-.69-3.25-1.4-5.38-4.7-5.54-4.92-.16-.22-1.3-1.73-1.3-3.3s.82-2.34 1.12-2.66c.29-.32.63-.4.84-.4l.6.01c.19.01.45-.07.7.54.26.62.88 2.16.96 2.31.08.16.13.34.02.55-.1.21-.16.34-.31.52-.16.18-.33.4-.47.54-.16.16-.32.33-.14.65.18.32.81 1.34 1.74 2.17 1.2 1.07 2.2 1.4 2.52 1.56.32.16.5.13.69-.08.19-.21.81-.95 1.02-1.27.21-.32.43-.27.72-.16.3.1 1.88.89 2.2 1.05.32.16.54.24.62.38.08.13.08.77-.18 1.49z"
      fill="white"
    />
  </svg>
);

// Flèche pointer
const ArrowIcon = () => (
  <span style={{ fontSize: 36 }}>👆</span>
);

export const CTAOverlay: React.FC<CTAOverlayProps> = ({
  ctaText,
  whatsappNumber,
  websiteUrl,
  brandName,
  startFrame = 0,
  variant = 'full',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Slide up depuis le bas
  const slideProgress = spring({
    fps,
    frame: relFrame,
    config: { damping: 18, stiffness: 140, mass: 0.7 },
    from: 0,
    to: 1,
  });

  const translateY = interpolate(slideProgress, [0, 1], [200, 0]);
  const opacity = interpolate(relFrame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

  // Pulsation bouton
  const pulse = spring({
    fps,
    frame: (relFrame % 45),
    config: { damping: 8, stiffness: 300, mass: 0.3 },
    from: 1,
    to: 1.05,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '25%', // هذا سيجعلها تظهر في الوسط تقريباً بدلاً من الأسفل
        left: 40,
        right: 40,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          background: 'rgba(28,15,0,0.85)', // لون شبه شفاف ليعطي فخامة
          padding: '50px 30px',
          borderRadius: 30, // زوايا دائرية
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Texte CTA */}
        <div
          style={{
            background: COLORS.overlayLight,
            borderRadius: 16,
            padding: '14px 32px',
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: FONT_SIZES.body,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.backgroundDark,
              textAlign: 'center',
              display: 'block',
              lineHeight: 1.3,
            }}
          >
            {ctaText}
          </span>
        </div>

        {/* Boutons d'action */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>

          {/* WhatsApp */}
          {(variant === 'whatsapp' || variant === 'full') && whatsappNumber && (
            <div
              style={{
                background: '#25D366',
                borderRadius: 50,
                padding: '16px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transform: `scale(${pulse})`,
                boxShadow: '0 6px 20px rgba(37,211,102,0.5)',
              }}
            >
              <WhatsAppIcon />
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: FONT_SIZES.cta,
                  fontWeight: FONT_WEIGHTS.extrabold,
                  color: COLORS.white,
                  letterSpacing: -0.5,
                }}
              >
                Commander sur WhatsApp
              </span>
            </div>
          )}

          {/* Lien bio */}
          {(variant === 'link-bio' || variant === 'full') && (
            <div
              style={{
                background: COLORS.primary,
                borderRadius: 50,
                padding: '16px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transform: `scale(${pulse})`,
                boxShadow: `0 6px 20px rgba(196,118,58,0.5)`,
              }}
            >
              <ArrowIcon />
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: FONT_SIZES.cta,
                  fontWeight: FONT_WEIGHTS.extrabold,
                  color: COLORS.white,
                }}
              >
                Lien en bio
              </span>
            </div>
          )}
        </div>

        {/* Brand watermark */}
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 28,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.gold,
            letterSpacing: 4,
            marginTop: 8,
            opacity: 0.9,
          }}
        >
          {brandName}
        </span>
      </div>
    </div>
  );
};

// ============================================================
// BrandWatermark — Logo en coin supérieur gauche
// ============================================================
export const BrandWatermark: React.FC<{ brandName: string; logo?: string }> = ({
  brandName,
  logo,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    fps,
    frame,
    config: { damping: 20, stiffness: 80 },
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 48,
        left: 40,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: COLORS.gold,
          borderRadius: 12,
          padding: '6px 16px',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 36,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.backgroundDark,
            letterSpacing: 3,
          }}
        >
          {brandName}
        </span>
      </div>
    </div>
  );
};
