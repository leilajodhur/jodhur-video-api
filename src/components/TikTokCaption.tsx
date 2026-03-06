// ============================================================
// TikTokCaption — Captions animées style TikTok/Reels
// Apparition mot par mot avec background highlight
// ============================================================

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';

interface TikTokCaptionProps {
  text: string;
  startFrame?: number;
  // Style
  fontSize?: number;
  color?: string;
  bgColor?: string;
  align?: 'left' | 'center' | 'right';
  // Position
  bottom?: number;
  left?: number;
  right?: number;
  // Darija mode (RTL)
  rtl?: boolean;
  // Animation
  animationMode?: 'word-by-word' | 'slide-up' | 'fade';
}

export const TikTokCaption: React.FC<TikTokCaptionProps> = ({
  text,
  startFrame = 0,
  fontSize = FONT_SIZES.caption,
  color = COLORS.white,
  bgColor = COLORS.primary,
  align = 'center',
  bottom = 140,
  left = 40,
  right = 40,
  rtl = false,
  animationMode = 'word-by-word',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);
  const words = text.split(' ');

  // word-by-word: 1 mot toutes les ~8 frames (0.27s)
  const framesPerWord = Math.round(fps / 3.7);

  const containerOpacity = interpolate(relFrame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const slideY = interpolate(relFrame, [0, 12], [30, 0], {
    extrapolateRight: 'clamp',
  });

  if (animationMode === 'slide-up') {
    return (
      <div
        style={{
          position: 'absolute',
          bottom,
          left,
          right,
          opacity: containerOpacity,
          transform: `translateY(${slideY}px)`,
          direction: rtl ? 'rtl' : 'ltr',
        }}
      >
        <div
          style={{
            background: bgColor,
            borderRadius: 16,
            padding: '16px 28px',
            display: 'inline-block',
            maxWidth: '100%',
          }}
        >
          <span
            style={{
              fontFamily: rtl ? FONTS.arabic : FONTS.body,
              fontSize,
              fontWeight: FONT_WEIGHTS.extrabold,
              color,
              textAlign: align,
              lineHeight: 1.25,
              letterSpacing: rtl ? 0 : -0.5,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {text}
          </span>
        </div>
      </div>
    );
  }

  if (animationMode === 'fade') {
    return (
      <div
        style={{
          position: 'absolute',
          bottom,
          left,
          right,
          opacity: containerOpacity,
          textAlign: align,
          direction: rtl ? 'rtl' : 'ltr',
        }}
      >
        <div
          style={{
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(4px)',
            borderRadius: 20,
            padding: '18px 32px',
            display: 'inline-block',
          }}
        >
          <span
            style={{
              fontFamily: rtl ? FONTS.arabic : FONTS.body,
              fontSize,
              fontWeight: FONT_WEIGHTS.bold,
              color,
              lineHeight: 1.3,
            }}
          >
            {text}
          </span>
        </div>
      </div>
    );
  }

  // word-by-word (défaut)
  return (
    <div
      style={{
        position: 'absolute',
        bottom,
        left,
        right,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        direction: rtl ? 'rtl' : 'ltr',
        opacity: containerOpacity,
      }}
    >
      {words.map((word, i) => {
        const wordStartFrame = i * framesPerWord;
        const wordRelFrame = Math.max(0, relFrame - wordStartFrame);
        const wordScale = spring({
          fps,
          frame: wordRelFrame,
          config: { damping: 14, stiffness: 180, mass: 0.6 },
        });
        const wordOpacity = interpolate(wordRelFrame, [0, 4], [0, 1], {
          extrapolateRight: 'clamp',
        });
        const isActive = wordRelFrame > 0;

        return (
          <div
            key={i}
            style={{
              opacity: wordOpacity,
              transform: `scale(${isActive ? wordScale : 0.6})`,
              background: isActive ? bgColor : 'transparent',
              borderRadius: 10,
              padding: '6px 14px',
              transition: 'background 0.15s',
            }}
          >
            <span
              style={{
                fontFamily: rtl ? FONTS.arabic : FONTS.body,
                fontSize,
                fontWeight: FONT_WEIGHTS.extrabold,
                color,
                letterSpacing: rtl ? 0 : -0.3,
                textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              {word}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// DarijaBanner — Bande darija bilingue
// ============================================================
interface DarijaBannerProps {
  textFr: string;
  textDarija: string;
  startFrame?: number;
  bottom?: number;
}

export const DarijaBanner: React.FC<DarijaBannerProps> = ({
  textFr,
  textDarija,
  startFrame = 0,
  bottom = 80,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const slideIn = spring({
    fps,
    frame: relFrame,
    config: { damping: 16, stiffness: 120, mass: 0.8 },
  });

  const translateY = interpolate(slideIn, [0, 1], [80, 0]);
  const opacity = interpolate(relFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        bottom,
        left: 0,
        right: 0,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* Bande française */}
      <div
        style={{
          background: COLORS.primary,
          padding: '12px 48px',
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: FONT_SIZES.body,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.white,
            textAlign: 'center',
            display: 'block',
          }}
        >
          {textFr}
        </span>
      </div>
      {/* Bande darija */}
      <div
        style={{
          background: COLORS.backgroundDark,
          padding: '12px 48px',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.arabic,
            fontSize: FONT_SIZES.subtitle,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.gold,
            textAlign: 'center',
            display: 'block',
            direction: 'rtl',
          }}
        >
          {textDarija}
        </span>
      </div>
    </div>
  );
};
