// ============================================================
// T2_HeritageStory — Reel 30s · Héritage & Émotion
// ============================================================
// Format   : 1080 × 1920 (9:16)
// Durée    : 30 s → 900 frames @ 30 fps
// Pilier   : "Héritage & Émotion" (Lun + Mer du planning Excel)
// Exemples : Savon Beldi 3000 ans · Huile Argan "grand-mère" · Ma zhar
//
// Scènes :
//  [00:00–05:00] Scène 1 — Atmosphère cinématique (0–150f)
//  [05:00–12:00] Scène 2 — Storytelling texte + image (150–360f)
//  [12:00–22:00] Scène 3 — Héritage + émotion (360–660f)
//  [22:00–27:00] Scène 4 — Produit révélé (660–810f)
//  [27:00–30:00] Scène 5 — CTA doux (810–900f)
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
import { TikTokCaption, DarijaBanner } from '../components/TikTokCaption';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { T2HeritageStoryProps } from '../types';

// ─── Scène 1 : Atmosphère cinématique (0–150f) ───────────────
const SceneAtmosphere: React.FC<{
  atmosphereImage: string;
  hookFr: string;
  heritageYears?: string;
}> = ({ atmosphereImage, hookFr, heritageYears }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom lent Ken Burns
  const zoom = interpolate(frame, [0, 150], [1, 1.06], { extrapolateRight: 'clamp' });
  const overlayOpacity = interpolate(frame, [0, 30], [0.9, 0.5], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: 'clamp' });
  const textY = spring({
    fps,
    frame: Math.max(0, frame - 20),
    config: { damping: 16, stiffness: 90, mass: 1.2 },
    from: 40,
    to: 0,
  });

  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <Img
        src={atmosphereImage}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      />

      {/* Vignette sombre */}
      <AbsoluteFill
        style={{
          background: `rgba(28,15,0,${overlayOpacity})`,
          transition: 'background 0.5s',
        }}
      />

      {/* Ligne décorative top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: COLORS.gold,
        }}
      />

      {/* Heritage years badge */}
      {heritageYears && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            right: 40,
            background: COLORS.gold,
            borderRadius: 16,
            padding: '12px 24px',
            opacity: textOpacity,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 36,
              fontWeight: FONT_WEIGHTS.black,
              color: COLORS.backgroundDark,
              letterSpacing: -1,
            }}
          >
            {heritageYears}
          </span>
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: 22,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.backgroundDark,
              display: 'block',
              textAlign: 'center',
            }}
          >
            de beauté
          </span>
        </div>
      )}

      {/* Hook principal */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: 48,
          right: 48,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.hookSub,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.white,
            lineHeight: 1.15,
            display: 'block',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          {hookFr}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 2 : Storytelling (150–360f) ───────────────────────
const SceneStory: React.FC<{
  storyText: string;
  hookDarija: string;
  region?: string;
  productImage: string;
}> = ({ storyText, hookDarija, region, productImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftImageX = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 80, mass: 1.2 },
    from: -200,
    to: 0,
  });
  const rightTextX = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 80, mass: 1.2 },
    from: 200,
    to: 0,
  });

  return (
    <AbsoluteFill style={{ background: COLORS.parchment }}>
      {/* Layout split vertical */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '55%',
          transform: `translateX(${leftImageX}px)`,
          overflow: 'hidden',
        }}
      >
        <Img
          src={productImage}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: `linear-gradient(to top, ${COLORS.parchment} 0%, transparent 100%)`,
          }}
        />
      </div>

      {/* Texte bas */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: '50%',
          padding: '32px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
          transform: `translateX(${rightTextX}px)`,
        }}
      >
        {/* Region badge */}
        {region && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: COLORS.primary,
              borderRadius: 50,
              padding: '8px 20px',
              alignSelf: 'flex-start',
            }}
          >
            <span style={{ fontSize: 24 }}>🇲🇦</span>
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: 28,
                fontWeight: FONT_WEIGHTS.bold,
                color: COLORS.white,
              }}
            >
              {region}
            </span>
          </div>
        )}

        {/* Story text */}
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: FONT_SIZES.body + 2,
            fontWeight: FONT_WEIGHTS.medium,
            color: COLORS.backgroundDark,
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}
        >
          "{storyText}"
        </span>

        {/* Darija text */}
        <span
          style={{
            fontFamily: FONTS.arabic,
            fontSize: FONT_SIZES.subtitle,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.primary,
            direction: 'rtl',
            textAlign: 'right',
            lineHeight: 1.4,
          }}
        >
          {hookDarija}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 3 : Héritage + émotion (360–660f) ─────────────────
const SceneHeritage: React.FC<{
  emotion: string;
  productName: string;
  productImage: string;
}> = ({ emotion, productName, productImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Parallax vertical
  const imgY = interpolate(frame, [0, 300], [0, -30], { extrapolateRight: 'clamp' });

  const titleScale = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 120 },
    from: 0.85,
    to: 1,
  });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, overflow: 'hidden' }}>
      {/* Image fond */}
      <AbsoluteFill style={{ transform: `translateY(${imgY}px)` }}>
        <Img
          src={productImage}
          style={{ width: '100%', height: '115%', objectFit: 'cover', opacity: 0.45 }}
        />
      </AbsoluteFill>

      {/* Overlay gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, ${COLORS.backgroundDark} 20%, rgba(44,24,16,0.6) 60%, ${COLORS.backgroundDark} 100%)`,
        }}
      />

      {/* Contenu centré */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 40,
          padding: '0 56px',
        }}
      >
        {/* Ornement top */}
        <div
          style={{
            width: 3,
            height: interpolate(frame, [0, 30], [0, 80], { extrapolateRight: 'clamp' }),
            background: COLORS.gold,
            borderRadius: 2,
          }}
        />

        {/* Emotion quote */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.title,
              fontWeight: FONT_WEIGHTS.black,
              color: COLORS.white,
              lineHeight: 1.15,
              display: 'block',
              marginBottom: 20,
            }}
          >
            {emotion}
          </span>

          <div
            style={{
              width: 80,
              height: 3,
              background: COLORS.gold,
              borderRadius: 2,
              margin: '0 auto 20px',
            }}
          />

          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.subtitle,
              fontWeight: FONT_WEIGHTS.medium,
              color: COLORS.gold,
              fontStyle: 'italic',
            }}
          >
            — {productName}
          </span>
        </div>

        {/* Ornement bas */}
        <div
          style={{
            width: 3,
            height: interpolate(frame, [30, 60], [0, 80], { extrapolateRight: 'clamp' }),
            background: COLORS.gold,
            borderRadius: 2,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Scène 4 : Produit révélé (660–810f) ─────────────────────
const SceneReveal: React.FC<{
  productName: string;
  productImage: string;
}> = ({ productName, productImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 140, mass: 0.8 },
    from: 0.7,
    to: 1,
  });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.cream,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      {/* Image produit */}
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Img
          src={productImage}
          style={{
            width: 600,
            height: 600,
            objectFit: 'contain',
            borderRadius: 32,
            boxShadow: `0 20px 60px rgba(196,118,58,0.3)`,
          }}
        />
      </div>

      {/* Nom */}
      <span
        style={{
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.title,
          fontWeight: FONT_WEIGHTS.black,
          color: COLORS.primaryDark,
          textAlign: 'center',
          opacity,
        }}
      >
        {productName}
      </span>

      {/* Badges */}
      <div style={{ display: 'flex', gap: 16, opacity }}>
        {['Artisanal', 'Naturel', '🇲🇦'].map((tag, i) => (
          <div
            key={i}
            style={{
              background: COLORS.primary,
              borderRadius: 50,
              padding: '8px 20px',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: 30,
                fontWeight: FONT_WEIGHTS.bold,
                color: COLORS.white,
              }}
            >
              {tag}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Composition principale ───────────────────────────────────
export const T2_HeritageStory: React.FC<T2HeritageStoryProps> = (props) => {
  const {
    brandName,
    hookFr,
    hookDarija,
    productName,
    productImage,
    atmosphereImage,
    storyText,
    heritageYears,
    region,
    emotion,
    cta,
    whatsappNumber,
    websiteUrl,
  } = props;

  return (
    <AbsoluteFill>
      <BrandWatermark brandName={brandName} />

      {/* Scène 1 : Atmosphère (0–150f / 0–5s) */}
      <Sequence from={0} durationInFrames={150}>
        <SceneAtmosphere
          atmosphereImage={atmosphereImage}
          hookFr={hookFr}
          heritageYears={heritageYears}
        />
      </Sequence>

      {/* Scène 2 : Story (150–360f / 5–12s) */}
      <Sequence from={150} durationInFrames={210}>
        <SceneStory
          storyText={storyText}
          hookDarija={hookDarija}
          region={region}
          productImage={productImage}
        />
      </Sequence>

      {/* Scène 3 : Héritage (360–660f / 12–22s) */}
      <Sequence from={360} durationInFrames={300}>
        <SceneHeritage
          emotion={emotion}
          productName={productName}
          productImage={productImage}
        />
      </Sequence>

      {/* Scène 4 : Reveal (660–810f / 22–27s) */}
      <Sequence from={660} durationInFrames={150}>
        <SceneReveal productName={productName} productImage={productImage} />
      </Sequence>

      {/* Scène 5 : CTA (810–900f / 27–30s) */}
      <Sequence from={810} durationInFrames={90}>
        <AbsoluteFill style={{ background: COLORS.backgroundDark }} />
        <CTAOverlay
          ctaText={cta}
          whatsappNumber={whatsappNumber}
          websiteUrl={websiteUrl}
          brandName={brandName}
          startFrame={0}
          variant="whatsapp"
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default T2_HeritageStory;
