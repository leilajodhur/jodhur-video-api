// ============================================================
// T4_TutorialRoutine — Vidéo 60s · Éducation Beauté
// ============================================================
// Format   : 1080 × 1920 (9:16)
// Durée    : 60 s → 1800 frames @ 30 fps
// Pilier   : "Éducation" (Lun semaines 4-8 du planning Excel)
// Exemples : Routine hammam 6 étapes · Masque Ghassoul · Argan
//
// Scènes :
//  [00:00–05:00] Scène 1 — Hook + Problème (0–150f)
//  [05:00–50:00] Scène 2 — Étapes tutoriel (150–1500f)
//  [50:00–57:00] Scène 3 — Résultats + Émotion (1500–1710f)
//  [57:00–60:00] Scène 4 — CTA (1710–1800f)
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
import { TikTokCaption } from '../components/TikTokCaption';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T4TutorialProps } from '../types';

// ─── Scène 1 : Hook + Problème (0–150f / 0–5s) ───────────────
const SceneProblem: React.FC<{
  hookFr: string;
  hookDarija: string;
  problemStatement: string;
}> = ({ hookFr, hookDarija, problemStatement }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problemY = spring({
    fps,
    frame: Math.max(0, frame - 60),
    config: { damping: 16, stiffness: 100 },
    from: 40,
    to: 0,
  });
  const problemOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: GRADIENTS.hammam, overflow: 'hidden' }}>
      {/* Pattern décoratif zellij */}
      <AbsoluteFill style={{ opacity: 0.06 }}>
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              style={{
                position: 'absolute',
                top: row * 260 - 30,
                left: col * 200 - 20,
                width: 160,
                height: 160,
                border: `3px solid ${COLORS.white}`,
                borderRadius: 4,
                transform: 'rotate(45deg)',
              }}
            />
          ))
        )}
      </AbsoluteFill>

      {/* Hook */}
      <HookText
        hookFr={hookFr}
        hookDarija={hookDarija}
        variant="cinematic"
        bgColor="transparent"
        textColor={COLORS.white}
        accentColor={COLORS.gold}
      />

      {/* Problème */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: 40,
          right: 40,
          opacity: problemOpacity,
          transform: `translateY(${problemY}px)`,
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: 20,
            padding: '20px 28px',
            borderLeft: `5px solid ${COLORS.gold}`,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 10 }}>💡</span>
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: FONT_SIZES.body,
              fontWeight: FONT_WEIGHTS.semibold,
              color: COLORS.white,
              lineHeight: 1.4,
            }}
          >
            {problemStatement}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Composant : Carte d'une étape ────────────────────────────
const StepCard: React.FC<{
  step: { number: number; title: string; desc: string; image?: string; durationSec: number };
  isActive: boolean;
  isPast: boolean;
  progress: number; // 0 → 1
}> = ({ step, isActive, isPast, progress }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 16,
        opacity: isActive ? 1 : isPast ? 0.55 : 0.3,
        transform: `scale(${isActive ? 1 : 0.97})`,
      }}
    >
      {/* En-tête étape */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: isActive
              ? COLORS.gold
              : isPast
              ? COLORS.atlas
              : 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: isActive ? `0 0 24px ${COLORS.gold}80` : 'none',
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
            {isPast ? '✓' : step.number}
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.subtitle,
              fontWeight: FONT_WEIGHTS.black,
              color: isActive ? COLORS.white : COLORS.sand,
              display: 'block',
            }}
          >
            {step.title}
          </span>

          {/* Barre de progression pour l'étape active */}
          {isActive && (
            <div
              style={{
                height: 4,
                background: 'rgba(255,255,255,0.25)',
                borderRadius: 2,
                marginTop: 6,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress * 100}%`,
                  background: COLORS.gold,
                  borderRadius: 2,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Contenu actif : description + image */}
      {isActive && (
        <div style={{ display: 'flex', gap: 16 }}>
          {step.image && (
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 16,
                overflow: 'hidden',
                flexShrink: 0,
                border: `3px solid ${COLORS.gold}`,
              }}
            >
              <Img
                src={step.image}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: '16px 20px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: FONT_SIZES.body - 2,
                fontWeight: FONT_WEIGHTS.medium,
                color: COLORS.cream,
                lineHeight: 1.55,
              }}
            >
              {step.desc}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Scène 2 : Tutoriel pas-à-pas (150–1500f / 5–50s) ─────────
const SceneTutorial: React.FC<{
  steps: T4TutorialProps['steps'];
}> = ({ steps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calcul de l'étape active à partir de la durée de chaque step
  const totalFrames = steps.reduce((s, st) => s + st.durationSec * fps, 0);
  let activeStep = 0;
  let elapsed = 0;
  let activeProgress = 0;

  for (let i = 0; i < steps.length; i++) {
    const stepFrames = steps[i].durationSec * fps;
    if (frame < elapsed + stepFrames) {
      activeStep = i;
      activeProgress = (frame - elapsed) / stepFrames;
      break;
    }
    elapsed += stepFrames;
    if (i === steps.length - 1) {
      activeStep = i;
      activeProgress = 1;
    }
  }

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // On affiche max 4 étapes autour de l'étape active
  const visibleStart = Math.max(0, activeStep - 1);
  const visibleEnd = Math.min(steps.length, visibleStart + 4);
  const visibleSteps = steps.slice(visibleStart, visibleEnd);

  return (
    <AbsoluteFill
      style={{ background: COLORS.backgroundDark, overflow: 'hidden', padding: '80px 44px 40px' }}
    >
      {/* Titre tutoriel */}
      <div style={{ opacity: titleOpacity, marginBottom: 28 }}>
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.subtitle,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.gold,
            letterSpacing: 2,
          }}
        >
          ÉTAPES
        </span>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: FONT_SIZES.caption,
            fontWeight: FONT_WEIGHTS.medium,
            color: 'rgba(255,255,255,0.45)',
            marginLeft: 16,
          }}
        >
          {activeStep + 1} / {steps.length}
        </span>

        {/* Barre globale */}
        <div
          style={{
            height: 3,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 2,
            marginTop: 10,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${((activeStep + activeProgress) / steps.length) * 100}%`,
              background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.primary})`,
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Liste des étapes visibles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {visibleSteps.map((step, relIdx) => {
          const absIdx = visibleStart + relIdx;
          return (
            <StepCard
              key={step.number}
              step={step}
              isActive={absIdx === activeStep}
              isPast={absIdx < activeStep}
              progress={absIdx === activeStep ? activeProgress : 0}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 3 : Résultats + Émotion (1500–1710f / 50–57s) ──────
const SceneResults: React.FC<{
  resultsText: string;
  tipBonus?: string;
  productImage: string;
}> = ({ resultsText, tipBonus, productImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 130 },
    from: 0.6,
    to: 1,
  });

  const textY = spring({
    fps,
    frame: Math.max(0, frame - 20),
    config: { damping: 16, stiffness: 110 },
    from: 50,
    to: 0,
  });

  const tipScale = spring({
    fps,
    frame: Math.max(0, frame - 80),
    config: { damping: 14, stiffness: 120 },
    from: 0.7,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        background: GRADIENTS.luxury,
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        padding: '0 48px',
      }}
    >
      {/* Étoiles déco */}
      {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: 120,
            fontSize: 40,
            opacity: interpolate(frame, [i * 8, i * 8 + 20], [0, 1], { extrapolateRight: 'clamp' }),
            left: `${15 + i * 17}%`,
          }}
        >
          {star}
        </span>
      ))}

      {/* Image produit */}
      <div style={{ transform: `scale(${imgScale})` }}>
        <Img
          src={productImage}
          style={{
            width: 300,
            height: 300,
            objectFit: 'contain',
            borderRadius: 24,
            boxShadow: `0 20px 60px rgba(212,175,55,0.4)`,
          }}
        />
      </div>

      {/* Texte résultat */}
      <div
        style={{
          textAlign: 'center',
          transform: `translateY(${textY}px)`,
          opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.title,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.white,
            lineHeight: 1.25,
            display: 'block',
            textAlign: 'center',
          }}
        >
          {resultsText}
        </span>
      </div>

      {/* Tip bonus */}
      {tipBonus && (
        <div
          style={{
            background: 'rgba(212,175,55,0.18)',
            border: `2px solid ${COLORS.gold}`,
            borderRadius: 20,
            padding: '16px 28px',
            transform: `scale(${tipScale})`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: FONT_SIZES.body - 2,
              fontWeight: FONT_WEIGHTS.semibold,
              color: COLORS.gold,
              textAlign: 'center',
              display: 'block',
            }}
          >
            💡 Tip : {tipBonus}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ─── Composition principale ────────────────────────────────────
export const T4_TutorialRoutine: React.FC<T4TutorialProps> = (props) => {
  const {
    brandName,
    hookFr,
    hookDarija,
    problemStatement,
    steps,
    resultsText,
    tipBonus,
    productImage,
    cta,
    whatsappNumber,
    websiteUrl,
  } = props;

  return (
    <AbsoluteFill>
      <BrandWatermark brandName={brandName} />

      {/* Scène 1 : Hook + Problème (0–150f / 0–5s) */}
      <Sequence from={0} durationInFrames={150}>
        <SceneProblem
          hookFr={hookFr}
          hookDarija={hookDarija}
          problemStatement={problemStatement}
        />
      </Sequence>

      {/* Scène 2 : Tutoriel (150–1500f / 5–50s) */}
      <Sequence from={150} durationInFrames={1350}>
        <SceneTutorial steps={steps} />
      </Sequence>

      {/* Scène 3 : Résultats (1500–1710f / 50–57s) */}
      <Sequence from={1500} durationInFrames={210}>
        <SceneResults
          resultsText={resultsText}
          tipBonus={tipBonus}
          productImage={productImage}
        />
      </Sequence>

      {/* Scène 4 : CTA (1710–1800f / 57–60s) */}
      <Sequence from={1710} durationInFrames={90}>
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

      {/* TikTok captions superposées sur la scène tutoriel */}
      <Sequence from={160} durationInFrames={200}>
        <TikTokCaption
          text={hookDarija}
          startFrame={0}
          rtl={true}
          animationMode="word-by-word"
          bgColor={COLORS.primary}
          bottom={50}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default T4_TutorialRoutine;
