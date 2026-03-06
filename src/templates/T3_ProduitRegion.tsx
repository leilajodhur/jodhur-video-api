// ============================================================
// T3_ProduitRegion — Reel 45s · Produit & Région
// ============================================================
// Format   : 1080 × 1920 (9:16)
// Durée    : 45 s → 1350 frames @ 30 fps
// Pilier   : "Produit & Région" (Lun + Jeu du planning Excel)
// Exemples : Argan Souss · Ghassoul Atlas · Ma zhar Meknès
//
// Scènes :
//  [00:00–05:00] Scène 1 — Hook géographique (0–150f)
//  [05:00–20:00] Scène 2 — Voyage régional (150–600f)
//  [20:00–35:00] Scène 3 — Processus extraction (600–1050f)
//  [35:00–42:00] Scène 4 — Bénéfices produit (1050–1260f)
//  [42:00–45:00] Scène 5 — CTA (1260–1350f)
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
import { HookText } from '../components/HookText';
import type { T3ProduitRegionProps } from '../types';

// ─── Scène 1 : Hook géographique (0–150f) ─────────────────────
const SceneGeoHook: React.FC<{
  hookFr: string;
  hookDarija: string;
  region: string;
  regionImage?: string;
}> = ({ hookFr, hookDarija, region, regionImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, 150], [1.1, 1], { extrapolateRight: 'clamp' });
  const overlayOpacity = interpolate(frame, [0, 40], [0.85, 0.55], { extrapolateRight: 'clamp' });

  const regionScale = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 14, stiffness: 120, mass: 0.8 },
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, overflow: 'hidden' }}>
      {/* Image région plein écran */}
      {regionImage && (
        <AbsoluteFill>
          <Img
            src={regionImage}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          />
        </AbsoluteFill>
      )}

      {/* Overlay gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(28,15,0,${overlayOpacity}) 0%, rgba(28,15,0,0.3) 40%, rgba(28,15,0,${overlayOpacity}) 100%)`,
        }}
      />

      {/* Badge région */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          transform: `scale(${regionScale})`,
        }}
      >
        <div
          style={{
            background: COLORS.atlas,
            borderRadius: 50,
            padding: '12px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 28 }}>🇲🇦</span>
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.subtitle,
              fontWeight: FONT_WEIGHTS.black,
              color: COLORS.white,
              letterSpacing: 2,
            }}
          >
            {region}
          </span>
        </div>
      </div>

      {/* Hook texte */}
      <HookText
        hookFr={hookFr}
        hookDarija={hookDarija}
        variant="overlay"
        bgColor="transparent"
        textColor={COLORS.white}
        accentColor={COLORS.gold}
      />
    </AbsoluteFill>
  );
};

// ─── Scène 2 : Voyage régional (150–600f / 5–20s) ─────────────
const SceneRegionalJourney: React.FC<{
  region: string;
  originFact: string;
  funFacts: string[];
  regionImage?: string;
  productImage: string;
}> = ({ region, originFact, funFacts, regionImage, productImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Parallax sur l'image de fond
  const bgY = interpolate(frame, [0, 450], [0, -40], { extrapolateRight: 'clamp' });

  const factOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });
  const factY = spring({
    fps,
    frame: Math.max(0, frame - 20),
    config: { damping: 18, stiffness: 90 },
    from: 30,
    to: 0,
  });

  return (
    <AbsoluteFill style={{ background: COLORS.parchment, overflow: 'hidden' }}>
      {/* Image de fond parallax */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '55%',
          overflow: 'hidden',
          transform: `translateY(${bgY}px)`,
        }}
      >
        <Img
          src={regionImage || productImage}
          style={{
            width: '100%',
            height: '120%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: `linear-gradient(to top, ${COLORS.parchment} 0%, transparent 100%)`,
          }}
        />
      </div>

      {/* Carte décorative */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: 0,
          right: 0,
          padding: '0 48px',
          opacity: factOpacity,
          transform: `translateY(${factY}px)`,
        }}
      >
        {/* Titre région */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 6,
              height: 40,
              background: COLORS.atlas,
              borderRadius: 3,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.subtitle,
              fontWeight: FONT_WEIGHTS.black,
              color: COLORS.backgroundDark,
            }}
          >
            {region}
          </span>
        </div>

        {/* Fait d'origine */}
        <div
          style={{
            background: COLORS.white,
            borderRadius: 20,
            padding: '24px 32px',
            marginBottom: 24,
            boxShadow: '0 4px 20px rgba(44,24,16,0.12)',
            borderLeft: `6px solid ${COLORS.atlas}`,
          }}
        >
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
            {originFact}
          </span>
        </div>

        {/* Fun facts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {funFacts.slice(0, 3).map((fact, i) => {
            const itemFrame = Math.max(0, frame - i * 25 - 40);
            const itemOpacity = interpolate(itemFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
            const itemX = interpolate(itemFrame, [0, 20], [-40, 0], { extrapolateRight: 'clamp' });

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: GRADIENTS.atlas,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 18, color: COLORS.white, fontWeight: 'bold' }}>
                    {i + 1}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: FONT_SIZES.body,
                    fontWeight: FONT_WEIGHTS.semibold,
                    color: COLORS.backgroundDark,
                    lineHeight: 1.4,
                  }}
                >
                  {fact}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 3 : Processus extraction (600–1050f / 20–35s) ──────
const SceneExtraction: React.FC<{
  extractionSteps: { label: string; durationSec: number }[];
  extractionImage?: string;
  productImage: string;
}> = ({ extractionSteps, extractionImage, productImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalDuration = extractionSteps.reduce((s, e) => s + e.durationSec, 0);
  const framesPerSecond = fps;

  // Quelle étape est active ?
  let activeStep = 0;
  let elapsed = 0;
  for (let i = 0; i < extractionSteps.length; i++) {
    const stepFrames = extractionSteps[i].durationSec * framesPerSecond;
    if (frame < elapsed + stepFrames) {
      activeStep = i;
      break;
    }
    elapsed += stepFrames;
    activeStep = i;
  }

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, overflow: 'hidden' }}>
      {/* Image extraction fond */}
      <AbsoluteFill>
        <Img
          src={extractionImage || productImage}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />
      </AbsoluteFill>

      {/* Overlay */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(160deg, rgba(28,15,0,0.92) 0%, rgba(44,60,20,0.7) 100%)',
        }}
      />

      {/* Titre */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          opacity: titleOpacity,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.subtitle,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.gold,
            textAlign: 'center',
            display: 'block',
            letterSpacing: 3,
          }}
        >
          PROCESSUS NATUREL
        </span>
        <div
          style={{
            width: interpolate(frame, [0, 30], [0, 200], { extrapolateRight: 'clamp' }),
            height: 3,
            background: COLORS.gold,
            borderRadius: 2,
            margin: '12px auto 0',
          }}
        />
      </div>

      {/* Étapes */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: 40,
          right: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {extractionSteps.map((step, i) => {
          const isActive = i === activeStep;
          const isPast = i < activeStep;
          const stepFrameStart = extractionSteps.slice(0, i).reduce((s, e) => s + e.durationSec * fps, 0);
          const stepFrame = Math.max(0, frame - stepFrameStart);
          const stepProgress = interpolate(
            stepFrame,
            [0, step.durationSec * fps],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                opacity: isActive ? 1 : isPast ? 0.6 : 0.35,
                transform: `scale(${isActive ? 1 : 0.95})`,
                transition: 'all 0.3s',
              }}
            >
              {/* Numéro */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: isActive ? COLORS.gold : isPast ? COLORS.atlas : 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: isActive ? `0 0 20px ${COLORS.gold}80` : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 26,
                    fontWeight: FONT_WEIGHTS.black,
                    color: isActive ? COLORS.backgroundDark : COLORS.white,
                  }}
                >
                  {isPast ? '✓' : i + 1}
                </span>
              </div>

              {/* Label + barre de progression */}
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: FONT_SIZES.body,
                    fontWeight: isActive ? FONT_WEIGHTS.black : FONT_WEIGHTS.medium,
                    color: isActive ? COLORS.white : COLORS.sand,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  {step.label}
                </span>

                {/* Barre progress active */}
                {isActive && (
                  <div
                    style={{
                      height: 4,
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${stepProgress * 100}%`,
                        background: COLORS.gold,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Image produit bas */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 40,
          opacity: interpolate(frame, [200, 250], [0, 0.7], { extrapolateRight: 'clamp' }),
        }}
      >
        <Img
          src={productImage}
          style={{ width: 200, height: 200, objectFit: 'contain', borderRadius: 20 }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 4 : Bénéfices produit (1050–1260f / 35–42s) ────────
const SceneBenefits: React.FC<{
  productName: string;
  productImage: string;
  funFacts: string[];
  ingredients?: string;
}> = ({ productName, productImage, funFacts, ingredients }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 120, mass: 0.9 },
    from: 0.8,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.cream,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 48px',
        gap: 24,
      }}
    >
      {/* Image produit */}
      <div style={{ transform: `scale(${imgScale})` }}>
        <Img
          src={productImage}
          style={{
            width: 320,
            height: 320,
            objectFit: 'contain',
            borderRadius: 24,
            boxShadow: `0 16px 48px rgba(196,118,58,0.3)`,
          }}
        />
      </div>

      {/* Nom produit */}
      <span
        style={{
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.title,
          fontWeight: FONT_WEIGHTS.black,
          color: COLORS.primaryDark,
          textAlign: 'center',
          opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        {productName}
      </span>

      {/* Bénéfices clés */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {funFacts.slice(0, 4).map((fact, i) => {
          const itemFrame = Math.max(0, frame - i * 15 - 20);
          const itemOpacity = interpolate(itemFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
          const itemX = interpolate(itemFrame, [0, 18], [50, 0], { extrapolateRight: 'clamp' });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: COLORS.white,
                borderRadius: 16,
                padding: '14px 20px',
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                boxShadow: '0 3px 12px rgba(44,24,16,0.08)',
              }}
            >
              <span style={{ fontSize: 28 }}>✨</span>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: FONT_SIZES.body - 2,
                  fontWeight: FONT_WEIGHTS.semibold,
                  color: COLORS.backgroundDark,
                  lineHeight: 1.35,
                }}
              >
                {fact}
              </span>
            </div>
          );
        })}
      </div>

      {/* Ingrédients si présents */}
      {ingredients && (
        <div
          style={{
            background: COLORS.primary,
            borderRadius: 16,
            padding: '10px 24px',
            opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: 30,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.white,
              textAlign: 'center',
            }}
          >
            🌿 {ingredients}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ─── Composition principale ────────────────────────────────────
export const T3_ProduitRegion: React.FC<T3ProduitRegionProps> = (props) => {
  const {
    brandName,
    hookFr,
    hookDarija,
    productName,
    productImage,
    region,
    originFact,
    extractionSteps,
    funFacts,
    ingredients,
    regionImage,
    extractionImage,
    cta,
    whatsappNumber,
    websiteUrl,
  } = props;

  return (
    <AbsoluteFill>
      <BrandWatermark brandName={brandName} />

      {/* Scène 1 : Hook géo (0–150f / 0–5s) */}
      <Sequence from={0} durationInFrames={150}>
        <SceneGeoHook
          hookFr={hookFr}
          hookDarija={hookDarija}
          region={region}
          regionImage={regionImage}
        />
      </Sequence>

      {/* Scène 2 : Voyage régional (150–600f / 5–20s) */}
      <Sequence from={150} durationInFrames={450}>
        <SceneRegionalJourney
          region={region}
          originFact={originFact}
          funFacts={funFacts}
          regionImage={regionImage}
          productImage={productImage}
        />
      </Sequence>

      {/* Scène 3 : Extraction (600–1050f / 20–35s) */}
      <Sequence from={600} durationInFrames={450}>
        <SceneExtraction
          extractionSteps={extractionSteps}
          extractionImage={extractionImage}
          productImage={productImage}
        />
      </Sequence>

      {/* Scène 4 : Bénéfices (1050–1260f / 35–42s) */}
      <Sequence from={1050} durationInFrames={210}>
        <SceneBenefits
          productName={productName}
          productImage={productImage}
          funFacts={funFacts}
          ingredients={ingredients}
        />
      </Sequence>

      {/* Scène 5 : CTA (1260–1350f / 42–45s) */}
      <Sequence from={1260} durationInFrames={90}>
        <AbsoluteFill style={{ background: COLORS.backgroundDark }} />
        <CTAOverlay
          ctaText={cta}
          whatsappNumber={whatsappNumber}
          websiteUrl={websiteUrl}
          brandName={brandName}
          startFrame={0}
          variant="full"
        />
      </Sequence>

      {/* Caption darija persistante scène 2 */}
      <Sequence from={160} durationInFrames={420}>
        <TikTokCaption
          text={hookDarija}
          startFrame={0}
          rtl={true}
          animationMode="slide-up"
          bgColor={COLORS.atlas}
          bottom={60}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default T3_ProduitRegion;
