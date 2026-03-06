// ============================================================
// U2_TutoPunch — Template Universel 20s · Éducation & Tutorial
// ============================================================
// Format   : 1080 × 1920 · 20s · 600f @ 30fps
// Usage    : Video 60s → Éducation Beauté, Routine, Tutorial
// DA Rules :
//   ① Problème frame 0 — le viewer se reconnaît immédiatement
//   ② Steps numérotés — 1 step visible à la fois, progression claire
//   ③ Kinetic number — le chiffre frappe avant le texte
//   ④ Bottom-third safe zone — captions toujours visibles
//   ⑤ CTA = résultat promis (pas "commande", mais "essaie")
// Scènes :
//   Scène 1 : Problème      (0–60f   / 0–2s)
//   Scène 2 : Steps x3      (60–480f / 2–16s) → 140f/step
//   Scène 3 : Résultat+CTA  (480–600f/ 16–20s)
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
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { UniversalVideoProps } from '../types-universal';

// ─── Numéro d'étape cinétique ─────────────────────────────────
const StepNumber: React.FC<{ n: number; color?: string }> = ({ n, color = COLORS.gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps, frame,
    config: { damping: 8, stiffness: 300, mass: 0.4 },
    from: 0, to: 1,
  });
  const opacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>
      <span style={{
        fontFamily: FONTS.display,
        fontSize: 200,
        fontWeight: FONT_WEIGHTS.black,
        color,
        lineHeight: 1,
        letterSpacing: -8,
        textShadow: `0 8px 40px rgba(0,0,0,0.4)`,
      }}>
        {n}
      </span>
    </div>
  );
};

// ─── Scène 1 : PROBLÈME (0–60f / 0–2s) ──────────────────────
const SceneProblem: React.FC<{
  hookFr: string;
  hookDarija: string;
  primaryColor: string;
  accentColor: string;
}> = ({ hookFr, hookDarija, primaryColor, accentColor }) => {
  const frame = useCurrentFrame();
  const words = hookFr.split(' ');

  const bgScale = interpolate(frame, [0, 8, 60], [1.04, 1, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      background: primaryColor,
      transform: `scale(${bgScale})`,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 56px',
      gap: 28,
    }}>
      {/* Icône problème */}
      <div style={{
        opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
        fontSize: 96,
        lineHeight: 1,
      }}>
        ❌
      </div>

      {/* Texte mot par mot */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 8,
      }}>
        {words.map((word, i) => {
          const wOpacity = interpolate(Math.max(0, frame - i * 4), [0, 6], [0, 1], { extrapolateRight: 'clamp' });
          return (
            <span key={i} style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.hookSub - 4,
              fontWeight: FONT_WEIGHTS.black,
              color: COLORS.white,
              opacity: wOpacity,
              lineHeight: 1.1,
            }}>
              {word}
            </span>
          );
        })}
      </div>

      {/* Darija */}
      <div style={{
        opacity: interpolate(frame, [35, 55], [0, 1], { extrapolateRight: 'clamp' }),
        direction: 'rtl',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: 50,
        padding: '8px 28px',
      }}>
        <span style={{
          fontFamily: FONTS.arabic,
          fontSize: FONT_SIZES.body,
          fontWeight: FONT_WEIGHTS.semibold,
          color: accentColor,
        }}>
          {hookDarija}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 2 : UNE ÉTAPE (réutilisée 3×) ─────────────────────
const SceneStep: React.FC<{
  stepNumber: number;
  title: string;
  desc: string;
  emoji?: string;
  productImage: string;
  accentColor: string;
  primaryColor: string;
  totalSteps: number;
}> = ({ stepNumber, title, desc, emoji, productImage, accentColor, primaryColor, totalSteps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    fps, frame,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
    from: 60, to: 0,
  });

  const titleOpacity = interpolate(frame, [10, 28], [0, 1], { extrapolateRight: 'clamp' });
  const descOpacity  = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' });
  const zoom = interpolate(frame, [0, 140], [1, 1.06], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Image fond Ken Burns */}
      <Img
        src={backgroundImage || productImage || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1080"} style={{
        position: 'absolute', width: '100%', height: '100%',
        objectFit: 'cover',
        transform: `scale(${zoom})`,
        filter: 'brightness(0.55)',
      }} />

      {/* Overlay gradient */}
      <AbsoluteFill style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(28,15,0,0.85) 100%)`,
      }} />

      {/* Barre de progression en haut */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'rgba(255,255,255,0.15)' }}>
        <div style={{
          height: '100%',
          width: `${(stepNumber / totalSteps) * 100}%`,
          background: accentColor,
          transition: 'width 0.3s',
        }} />
      </div>

      {/* Contenu principal */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 56px',
        transform: `translateX(${slideIn}px)`,
        gap: 20,
      }}>
        {/* Numéro + emoji */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <StepNumber n={stepNumber} color={accentColor} />
          {emoji && (
            <span style={{
              fontSize: 72,
              opacity: interpolate(frame, [8, 20], [0, 1], { extrapolateRight: 'clamp' }),
            }}>
              {emoji}
            </span>
          )}
        </div>

        {/* Titre étape */}
        <div style={{ opacity: titleOpacity }}>
          <span style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.title,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.white,
            lineHeight: 1.1,
            textShadow: '0 4px 16px rgba(0,0,0,0.6)',
          }}>
            {title}
          </span>
        </div>

        {/* Description */}
        <div style={{
          opacity: descOpacity,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          borderRadius: 20,
          padding: '16px 24px',
          borderLeft: `4px solid ${accentColor}`,
        }}>
          <span style={{
            fontFamily: FONTS.body,
            fontSize: FONT_SIZES.body,
            fontWeight: FONT_WEIGHTS.medium,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.5,
          }}>
            {desc}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 3 : RÉSULTAT + CTA (480–600f / 16–20s) ────────────
const SceneResult: React.FC<{
  storytellingEmotion: string;
  cta: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  brandName: string;
  hashtags: string;
  primaryColor: string;
}> = ({ storytellingEmotion, cta, whatsappNumber, websiteUrl, brandName, hashtags, primaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps, frame,
    config: { damping: 12, stiffness: 180 },
    from: 0.85, to: 1,
  });

  const topTags = hashtags.split(/\s+/).filter(t => t.startsWith('#')).slice(0, 4).join(' ');

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, ${primaryColor} 0%, ${COLORS.backgroundDark} 100%)`,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 56px',
      gap: 32,
      transform: `scale(${scale})`,
    }}>
      {/* Checkmark animé */}
      <div style={{
        fontSize: 100,
        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        ✅
      </div>

      {/* Message résultat */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        borderRadius: 24,
        padding: '24px 36px',
        opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <span style={{
          fontFamily: FONTS.body,
          fontSize: FONT_SIZES.body + 4,
          fontWeight: FONT_WEIGHTS.bold,
          color: COLORS.white,
          textAlign: 'center',
          display: 'block',
          lineHeight: 1.4,
          fontStyle: 'italic',
        }}>
          "{storytellingEmotion.length > 80
            ? storytellingEmotion.slice(0, 80) + '…'
            : storytellingEmotion}"
        </span>
      </div>

      {/* CTA Overlay */}
      <CTAOverlay
        ctaText={cta}
        whatsappNumber={whatsappNumber}
        websiteUrl={websiteUrl}
        brandName={brandName}
        startFrame={20}
        variant={whatsappNumber ? 'whatsapp' : 'link-bio'}
      />

      {/* Hashtags */}
      {topTags && (
        <span style={{
          position: 'absolute', bottom: 60, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: FONTS.body,
          fontSize: 26,
          color: 'rgba(255,255,255,0.35)',
          opacity: interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          {topTags}
        </span>
      )}
    </AbsoluteFill>
  );
};

// ─── Parsing du script_angle → steps ─────────────────────────
function parseSteps(scriptAngle: string): Array<{ title: string; desc: string; emoji: string }> {
  const EMOJI_MAP: Record<string, string> = {
    vapeur: '♨️', savon: '🧼', gommage: '✋', ghassoul: '🫙', rinçage: '💧', rincage: '💧',
    hydrat: '💆', argan: '🌿', spray: '💦', brume: '💦', masque: '🫙', cils: '👁️',
    cuir: '💆', mains: '🤲', démaquil: '✨', mélange: '🥄', application: '🖐️',
  };

  // Cherche patterns "1) titre desc", "Étape 1:", "Step 1:"
  const patterns = [
    /(\d+)\)\s*([^.:\n]{5,60})(?:[.:]?\s*(.{0,80}))?/g,
    /[Éé]tape\s*(\d+)\s*[:\-]\s*([^.\n]{5,60})(?:[.\-]?\s*(.{0,80}))?/g,
    /Slide\s*(\d+)\s*[:\-]\s*([^.\n]{5,80})/g,
  ];

  const steps: Array<{ title: string; desc: string; emoji: string }> = [];

  for (const pattern of patterns) {
    let match;
    pattern.lastIndex = 0;
    while ((match = pattern.exec(scriptAngle)) !== null && steps.length < 3) {
      const title = (match[2] || '').trim().slice(0, 50);
      const desc  = (match[3] || '').trim().slice(0, 80);
      if (title.length < 4) continue;

      const emojiKey = Object.keys(EMOJI_MAP).find(k => title.toLowerCase().includes(k) || desc.toLowerCase().includes(k));
      steps.push({ title, desc, emoji: emojiKey ? EMOJI_MAP[emojiKey] : '✨' });
    }
    if (steps.length >= 3) break;
  }

  // Fallback si parsing échoue
  while (steps.length < 3) {
    steps.push({ title: `Étape ${steps.length + 1}`, desc: scriptAngle.slice(0, 60), emoji: '✨' });
  }

  return steps.slice(0, 3);
}

// ─── Composition principale U2 ────────────────────────────────
export const U2_TutoPunch: React.FC<UniversalVideoProps> = (props) => {
  const {
    brandName, hookFr, hookDarija, productImage = '', scriptAngle = '',
    storytellingEmotion = '', cta = '', hashtags = '',
    whatsappNumber, websiteUrl,
    pilier = '', primaryColor = COLORS.primary, accentColor = COLORS.gold,
  } = props;

  const steps = parseSteps(scriptAngle);
  const STEP_DURATION = 140; // frames par step

  return (
    <AbsoluteFill>
      <BrandWatermark brandName={brandName} />

      {/* Scène 1 : Problème (0–60f) */}
      <Sequence from={0} durationInFrames={60}>
        <SceneProblem
          hookFr={hookFr}
          hookDarija={hookDarija}
          primaryColor={primaryColor}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scènes 2a/2b/2c : 3 steps (60–480f) */}
      {steps.map((step, i) => (
        <Sequence key={i} from={60 + i * STEP_DURATION} durationInFrames={STEP_DURATION}>
          <SceneStep
            stepNumber={i + 1}
            title={step.title}
            desc={step.desc}
            emoji={step.emoji}
            productImage={productImage}
            accentColor={accentColor}
            primaryColor={primaryColor}
            totalSteps={steps.length}
          />
        </Sequence>
      ))}

      {/* Scène 3 : Résultat + CTA (480–600f) */}
      <Sequence from={480} durationInFrames={120}>
        <SceneResult
          storytellingEmotion={storytellingEmotion}
          cta={cta}
          whatsappNumber={whatsappNumber}
          websiteUrl={websiteUrl}
          brandName={brandName}
          hashtags={hashtags}
          primaryColor={primaryColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default U2_TutoPunch;
