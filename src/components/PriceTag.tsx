// ============================================================
// PriceTag — Affichage prix MAD avec animation "flash"
// ============================================================

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';

interface PriceTagProps {
  priceMAD: number;
  originalPriceMAD?: number;  // Prix barré
  promoCode?: string;
  startFrame?: number;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  priceMAD,
  originalPriceMAD,
  promoCode,
  startFrame = 0,
  size = 'large',
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const sizeMap = {
    small:  { price: 56, sub: 36, badge: 28 },
    medium: { price: 72, sub: 44, badge: 32 },
    large:  { price: FONT_SIZES.price, sub: FONT_SIZES.priceSub, badge: FONT_SIZES.badge },
  };
  const sz = sizeMap[size];

  // Animation entrée: bounce spring
  const scale = spring({
    fps,
    frame: relFrame,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
    from: 0,
    to: 1,
  });

  // Flash rouge toutes les 30 frames (1s)
  const flashCycle = Math.floor(relFrame / 15) % 2;
  const flashOpacity = interpolate(relFrame % 15, [0, 5, 10, 15], [1, 0.7, 1, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {/* Prix barré original */}
      {originalPriceMAD && (
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: sz.sub,
              fontWeight: FONT_WEIGHTS.semibold,
              color: COLORS.sand,
              opacity: 0.9,
            }}
          >
            {originalPriceMAD} MAD
          </span>
          {/* Barre rouge */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: -4,
              right: -4,
              height: 3,
              background: '#FF3B30',
              transform: 'translateY(-50%) rotate(-4deg)',
              borderRadius: 2,
            }}
          />
        </div>
      )}

      {/* Prix promo */}
      <div
        style={{
          background: flashCycle === 0 ? COLORS.primary : '#D4306A',
          borderRadius: 24,
          padding: '16px 40px',
          boxShadow: `0 8px 32px rgba(196,118,58,0.5)`,
          opacity: flashOpacity,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: sz.price,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.white,
            letterSpacing: -2,
          }}
        >
          {priceMAD} <span style={{ fontSize: sz.price * 0.55 }}>MAD</span>
        </span>
      </div>

      {/* Code promo */}
      {promoCode && (
        <div
          style={{
            background: COLORS.gold,
            borderRadius: 12,
            padding: '8px 24px',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: sz.badge,
              fontWeight: FONT_WEIGHTS.extrabold,
              color: COLORS.backgroundDark,
              letterSpacing: 2,
            }}
          >
            CODE : {promoCode}
          </span>
        </div>
      )}
    </div>
  );
};

// ============================================================
// UrgencyBadge — Compte à rebours / urgence
// ============================================================
interface UrgencyBadgeProps {
  text: string;
  startFrame?: number;
  top?: number;
  right?: number;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({
  text,
  startFrame = 0,
  top = 120,
  right = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Rotation wobble toutes les 20 frames
  const wobble = interpolate(
    relFrame % 20,
    [0, 5, 10, 15, 20],
    [0, -4, 0, 4, 0],
  );

  const scale = spring({
    fps,
    frame: relFrame,
    config: { damping: 8, stiffness: 250, mass: 0.4 },
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top,
        right,
        transform: `scale(${scale}) rotate(${wobble}deg)`,
        background: '#FF3B30',
        borderRadius: '50%',
        width: 180,
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(255,59,48,0.6)',
        zIndex: 20,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: 34,
          fontWeight: FONT_WEIGHTS.black,
          color: COLORS.white,
          textAlign: 'center',
          padding: 16,
          lineHeight: 1.2,
        }}
      >
        {text}
      </span>
    </div>
  );
};
