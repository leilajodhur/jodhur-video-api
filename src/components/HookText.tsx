// ============================================================
// HookText — Hook d'accroche cinématique (0–4s)
// Optimisé pour stopper le scroll
// ============================================================

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';

interface HookTextProps {
  hookFr:     string;
  hookDarija: string;
  startFrame?: number;
  variant?: 'cinematic' | 'split' | 'overlay' | 'punch';
  // Couleurs override
  bgColor?:   string;
  textColor?: string;
  accentColor?: string;
}

export const HookText: React.FC<HookTextProps> = ({
  hookFr,
  hookDarija,
  startFrame = 0,
  variant = 'cinematic',
  bgColor = COLORS.backgroundDark,
  textColor = COLORS.white,
  accentColor = COLORS.gold,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // ── Variant: PUNCH — texte explose depuis le centre ──
  if (variant === 'punch') {
    const scale = spring({
      fps,
      frame: relFrame,
      config: { damping: 8, stiffness: 300, mass: 0.4 },
      from: 0.2,
      to: 1,
    });
    const opacity = interpolate(relFrame, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

    const lines = hookFr.split(' : ');

    return (
      <AbsoluteFill
        style={{
          background: bgColor,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 24,
          padding: '0 48px',
        }}
      >
        {/* Ligne décorative */}
        <div
          style={{
            width: interpolate(relFrame, [0, 20], [0, 200], { extrapolateRight: 'clamp' }),
            height: 4,
            background: accentColor,
            borderRadius: 2,
          }}
        />

        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              transform: `scale(${scale})`,
              opacity,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: i === 0 ? FONT_SIZES.hook : FONT_SIZES.hookSub,
                fontWeight: FONT_WEIGHTS.black,
                color: i === 0 ? textColor : accentColor,
                lineHeight: 1.1,
                letterSpacing: -1,
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              {line}
            </span>
          </div>
        ))}

        <div
          style={{
            width: interpolate(relFrame, [0, 20], [0, 200], { extrapolateRight: 'clamp' }),
            height: 4,
            background: accentColor,
            borderRadius: 2,
          }}
        />
      </AbsoluteFill>
    );
  }

  // ── Variant: SPLIT — FR en haut, Darija en bas ──
  if (variant === 'split') {
    const topY = spring({
      fps,
      frame: relFrame,
      config: { damping: 14, stiffness: 160 },
      from: -80,
      to: 0,
    });
    const botY = spring({
      fps,
      frame: relFrame,
      config: { damping: 14, stiffness: 160 },
      from: 80,
      to: 0,
    });

    return (
      <AbsoluteFill style={{ background: bgColor }}>
        {/* Haut — Français */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: height / 2,
            background: COLORS.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 48px',
            transform: `translateY(${topY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.hookSub,
              fontWeight: FONT_WEIGHTS.black,
              color: COLORS.white,
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            {hookFr}
          </span>
        </div>

        {/* Bas — Darija */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: height / 2,
            background: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 48px',
            transform: `translateY(${botY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.arabic,
              fontSize: FONT_SIZES.hookDarija,
              fontWeight: FONT_WEIGHTS.extrabold,
              color: accentColor,
              textAlign: 'center',
              direction: 'rtl',
              lineHeight: 1.3,
            }}
          >
            {hookDarija}
          </span>
        </div>
      </AbsoluteFill>
    );
  }

  // ── Variant: OVERLAY — texte superposé sur vidéo ──
  if (variant === 'overlay') {
    const opacity = interpolate(relFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
    const scale = spring({
      fps,
      frame: relFrame,
      config: { damping: 16, stiffness: 120, mass: 0.9 },
      from: 0.95,
      to: 1,
    });

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: COLORS.overlayHeavy,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          opacity,
          padding: '0 48px',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.hook * 0.75,
            fontWeight: FONT_WEIGHTS.black,
            color: textColor,
            textAlign: 'center',
            lineHeight: 1.15,
            transform: `scale(${scale})`,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          {hookFr}
        </span>
        <div
          style={{
            width: 80,
            height: 3,
            background: accentColor,
            borderRadius: 2,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.arabic,
            fontSize: FONT_SIZES.hookDarija * 0.8,
            fontWeight: FONT_WEIGHTS.bold,
            color: accentColor,
            textAlign: 'center',
            direction: 'rtl',
            lineHeight: 1.3,
          }}
        >
          {hookDarija}
        </span>
      </div>
    );
  }

  // ── Variant: CINEMATIC (défaut) — apparition séquentielle ──
  const titleOpacity = interpolate(relFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = spring({
    fps,
    frame: relFrame,
    config: { damping: 14, stiffness: 100 },
    from: 40,
    to: 0,
  });
  const subtitleOpacity = interpolate(relFrame, [12, 24], [0, 1], { extrapolateRight: 'clamp' });
  const lineWidth = interpolate(relFrame, [8, 28], [0, 400], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: bgColor,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 56px',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* Ligne accent */}
      <div
        style={{
          width: lineWidth,
          height: 5,
          background: accentColor,
          borderRadius: 3,
        }}
      />

      {/* Hook français */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.hookSub,
            fontWeight: FONT_WEIGHTS.black,
            color: textColor,
            lineHeight: 1.15,
            display: 'block',
            textShadow: '0 3px 12px rgba(0,0,0,0.4)',
          }}
        >
          {hookFr}
        </span>
      </div>

      {/* Hook darija */}
      <div style={{ opacity: subtitleOpacity }}>
        <span
          style={{
            fontFamily: FONTS.arabic,
            fontSize: FONT_SIZES.subtitle,
            fontWeight: FONT_WEIGHTS.semibold,
            color: accentColor,
            direction: 'rtl',
            display: 'block',
            lineHeight: 1.4,
          }}
        >
          {hookDarija}
        </span>
      </div>
    </AbsoluteFill>
  );
};
