// ============================================================
// U3_StorySlide — Template Universel 20s · Carousel / Guide
// ============================================================
// Format   : 1080 × 1920 · 20s · 600f @ 30fps
// Usage    : Carousel 4/5/6 slides → Éducation, Guides, Promo
// DA Rules :
//   ① Slide 1 = hook fort + "Sauvegarde 🔖" visible dès 0s
//   ② Auto-swipe — chaque slide dure 120f (4s), transition slide
//   ③ Numéro slide discret en haut à droite — repère de progression
//   ④ Highlight mot-clé — 1 mot en couleur par slide
//   ⑤ CTA dernière slide — action unique claire
// Structure :
//   Slide 1 : Hook         (0–120f)
//   Slides 2-N : Contenu   (120f chacune)
//   Slide finale : CTA     (dernière 120f)
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

const SLIDE_DURATION = 120; // 4s par slide @ 30fps

// ─── Transition entre slides ─────────────────────────────────
const SlideTransition: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    fps, frame,
    config: { damping: 18, stiffness: 140, mass: 0.7 },
    from: 0, to: 1,
  });

  const translateX = interpolate(slideIn, [0, 1], [80, 0]);
  const opacity    = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, transform: `translateX(${translateX}px)`, opacity }}>
      {children}
    </div>
  );
};

// ─── Indicateur de slide (dots) ───────────────────────────────
const SlideDots: React.FC<{ total: number; current: number; accentColor: string }> = ({
  total, current, accentColor,
}) => (
  <div style={{
    position: 'absolute', top: 56, right: 48,
    display: 'flex', gap: 8, alignItems: 'center',
    zIndex: 50,
  }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        width: i === current ? 28 : 10,
        height: 10,
        borderRadius: 5,
        background: i === current ? accentColor : 'rgba(255,255,255,0.3)',
        transition: 'width 0.3s',
      }} />
    ))}
  </div>
);

// ─── Parsing script_angle → slides ───────────────────────────
interface ParsedSlide {
  title: string;
  body: string;
  highlight: string;
  emoji: string;
  bgTint: string;
}

function parseSlides(
  scriptAngle: string,
  hookFr: string,
  storytellingEmotion: string,
  pilier: string,
): ParsedSlide[] {
  const PILIER_TINTS: Record<string, string> = {
    'Éducation Beauté':   '#1a3828',
    'Héritage & Émotion': '#3d1a0a',
    'Produit & Région':   '#2d1a08',
    'Promo & Offres':     '#3d0a1a',
  };

  const bgBase = PILIER_TINTS[pilier] || '#1a1a1a';

  // Parse "Slide N: texte"
  const slideMatches = [...scriptAngle.matchAll(/Slide\s*(\d+)\s*[:\-]\s*([^\n.]{5,120})/gi)];

  const slides: ParsedSlide[] = [];

  // Slide 0 : Hook
  slides.push({
    title: hookFr.split(':')[0]?.trim() || hookFr.slice(0, 50),
    body: hookFr.split(':')[1]?.trim() || storytellingEmotion.slice(0, 80),
    highlight: hookFr.split(' ').find(w => w.length > 4) || '',
    emoji: '👆',
    bgTint: bgBase,
  });

  // Slides du script
  for (const m of slideMatches.slice(1)) {
    const text = m[2].trim();
    const parts = text.split(/[.:\-]/).map(p => p.trim()).filter(Boolean);
    slides.push({
      title:     parts[0]?.slice(0, 50) || text.slice(0, 50),
      body:      parts.slice(1).join(' ').slice(0, 100) || text,
      highlight: parts[0]?.split(' ')[0] || '',
      emoji:     getEmoji(text),
      bgTint:    bgBase,
    });
  }

  // Tronquer à 5 slides max (dernière = CTA)
  return slides.slice(0, 5);
}

function getEmoji(text: string): string {
  const map: Record<string, string> = {
    visage: '🫧', cheveux: '💆', argan: '🌿', nigelle: '🌱', savon: '🧼',
    ghassoul: '🫙', eau: '💧', rose: '🌸', ricin: '🌿', hammam: '♨️',
    erreur: '❌', avant: '⚡', après: '✅', résultat: '✅', slide: '📌',
    quiz: '❓', type: '🔍', protocole: '📋', routine: '🔄', acné: '🎯',
    sèche: '💧', coffret: '🎁', valeur: '💰', chute: '💆',
  };
  const lower = text.toLowerCase();
  return Object.entries(map).find(([k]) => lower.includes(k))?.[1] ?? '✨';
}

// ─── Slide : Hook (slide 0) ───────────────────────────────────
const SlideHook: React.FC<{
  title: string; body: string; hookDarija: string;
  accentColor: string; primaryColor: string; bgTint: string;
}> = ({ title, body, hookDarija, accentColor, primaryColor, bgTint }) => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp' });
  const bodyOp = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const saveOp = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, ${primaryColor} 0%, ${bgTint} 60%, ${COLORS.backgroundDark} 100%)`,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0 56px',
      gap: 28,
    }}>
      {/* Ligne accent */}
      <div style={{
        width: interpolate(frame, [0, 25], [0, 160], { extrapolateRight: 'clamp' }),
        height: 5, background: accentColor, borderRadius: 3,
      }} />

      {/* Titre */}
      <div style={{ transform: `translateY(${titleY}px)`, opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) }}>
        <span style={{
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.hookSub,
          fontWeight: FONT_WEIGHTS.black,
          color: COLORS.white,
          lineHeight: 1.15,
        }}>
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{ opacity: bodyOp }}>
        <span style={{
          fontFamily: FONTS.body,
          fontSize: FONT_SIZES.body,
          fontWeight: FONT_WEIGHTS.medium,
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}>
          {body.slice(0, 90)}
        </span>
      </div>

      {/* Darija */}
      <div style={{ opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' }), direction: 'rtl' }}>
        <span style={{
          fontFamily: FONTS.arabic,
          fontSize: FONT_SIZES.subtitle,
          fontWeight: FONT_WEIGHTS.bold,
          color: accentColor,
        }}>
          {hookDarija}
        </span>
      </div>

      {/* Save prompt */}
      <div style={{
        opacity: saveOp,
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 50,
        padding: '10px 28px',
        display: 'flex', alignItems: 'center', gap: 10,
        border: `1.5px solid ${accentColor}`,
      }}>
        <span style={{ fontSize: 32 }}>🔖</span>
        <span style={{
          fontFamily: FONTS.body,
          fontSize: 30,
          fontWeight: FONT_WEIGHTS.bold,
          color: accentColor,
        }}>
          Sauvegarde ce guide
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Slide : Contenu ─────────────────────────────────────────
const SlideContent: React.FC<{
  slideNum: number; title: string; body: string;
  emoji: string; highlight: string; accentColor: string; bgTint: string;
}> = ({ slideNum, title, body, emoji, highlight, accentColor, bgTint }) => {
  const frame = useCurrentFrame();

  const numOp  = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const txtOp  = interpolate(frame, [12, 30], [0, 1], { extrapolateRight: 'clamp' });
  const bodyOp = interpolate(frame, [28, 50], [0, 1], { extrapolateRight: 'clamp' });

  // Highlight le mot-clé dans le body
  const renderBody = (text: string) => {
    if (!highlight || !text.toLowerCase().includes(highlight.toLowerCase())) {
      return <span style={{ color: 'rgba(255,255,255,0.85)' }}>{text}</span>;
    }
    const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
    return (
      <>
        <span style={{ color: 'rgba(255,255,255,0.85)' }}>{text.slice(0, idx)}</span>
        <span style={{ color: accentColor, fontWeight: FONT_WEIGHTS.extrabold }}>{text.slice(idx, idx + highlight.length)}</span>
        <span style={{ color: 'rgba(255,255,255,0.85)' }}>{text.slice(idx + highlight.length)}</span>
      </>
    );
  };

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${bgTint} 0%, ${COLORS.backgroundDark} 100%)`,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '80px 56px 120px',
      gap: 24,
    }}>
      {/* Numéro + emoji */}
      <div style={{ opacity: numOp, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{
          background: accentColor,
          borderRadius: 20,
          width: 72, height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: FONTS.display,
            fontSize: 40,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.backgroundDark,
          }}>
            {slideNum}
          </span>
        </div>
        <span style={{ fontSize: 64 }}>{emoji}</span>
      </div>

      {/* Titre */}
      <div style={{ opacity: txtOp }}>
        <span style={{
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.title,
          fontWeight: FONT_WEIGHTS.black,
          color: COLORS.white,
          lineHeight: 1.15,
        }}>
          {title}
        </span>
      </div>

      {/* Séparateur */}
      <div style={{
        width: interpolate(frame, [20, 45], [0, 200], { extrapolateRight: 'clamp' }),
        height: 4, background: accentColor, borderRadius: 2,
      }} />

      {/* Body */}
      <div style={{
        opacity: bodyOp,
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: '20px 28px',
        borderLeft: `4px solid ${accentColor}`,
      }}>
        <span style={{
          fontFamily: FONTS.body,
          fontSize: FONT_SIZES.body,
          fontWeight: FONT_WEIGHTS.medium,
          lineHeight: 1.55,
        }}>
          {renderBody(body.slice(0, 100))}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Slide : CTA Final ────────────────────────────────────────
const SlideCTA: React.FC<{
  cta: string; storytellingEmotion: string;
  whatsappNumber?: string; websiteUrl?: string;
  brandName: string; hashtags: string; primaryColor: string;
}> = ({ cta, storytellingEmotion, whatsappNumber, websiteUrl, brandName, hashtags, primaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ fps, frame, config: { damping: 12, stiffness: 180 }, from: 0.88, to: 1 });
  const topTags = hashtags.split(/\s+/).filter(t => t.startsWith('#')).slice(0, 4).join(' ');

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, ${primaryColor} 0%, ${COLORS.backgroundDark} 100%)`,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 48px',
      transform: `scale(${scale})`,
    }}>
      {/* Étoiles */}
      <div style={{
        fontSize: 56, letterSpacing: 8,
        opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        marginBottom: 16,
      }}>
        ⭐⭐⭐
      </div>

      {/* Citation */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        borderRadius: 24,
        padding: '24px 36px',
        marginBottom: 32,
        opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <span style={{
          fontFamily: FONTS.body,
          fontSize: FONT_SIZES.body,
          fontWeight: FONT_WEIGHTS.bold,
          color: COLORS.white,
          textAlign: 'center',
          display: 'block',
          lineHeight: 1.4,
          fontStyle: 'italic',
        }}>
          "{storytellingEmotion.slice(0, 80)}"
        </span>
      </div>

      {/* CTA */}
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
          fontFamily: FONTS.body, fontSize: 26,
          color: 'rgba(255,255,255,0.3)',
          opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          {topTags}
        </span>
      )}
    </AbsoluteFill>
  );
};

// ─── Composition principale U3 ────────────────────────────────
export const U3_StorySlide: React.FC<UniversalVideoProps> = (props) => {
  const {
    brandName, hookFr, hookDarija = '', scriptAngle = '',
    storytellingEmotion = '', cta = '', hashtags = '',
    productImage = '', whatsappNumber, websiteUrl,
    pilier = '', primaryColor = COLORS.primary, accentColor = COLORS.gold,
  } = props;

  const slides = parseSlides(scriptAngle, hookFr, storytellingEmotion, pilier);
  const totalSlides = slides.length;

  return (
    <AbsoluteFill>
      <BrandWatermark brandName={brandName} />

      {/* Slide 0 : Hook */}
      <Sequence from={0} durationInFrames={SLIDE_DURATION}>
        <SlideTransition index={0}>
          <SlideDots total={totalSlides + 1} current={0} accentColor={accentColor} />
          <SlideHook
            title={slides[0].title}
            body={slides[0].body}
            hookDarija={hookDarija}
            accentColor={accentColor}
            primaryColor={primaryColor}
            bgTint={slides[0].bgTint}
          />
        </SlideTransition>
      </Sequence>

      {/* Slides contenu */}
      {slides.slice(1).map((slide, i) => (
        <Sequence key={i} from={(i + 1) * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <SlideTransition index={i + 1}>
            <SlideDots total={totalSlides + 1} current={i + 1} accentColor={accentColor} />
            <SlideContent
              slideNum={i + 1}
              title={slide.title}
              body={slide.body}
              emoji={slide.emoji}
              highlight={slide.highlight}
              accentColor={accentColor}
              bgTint={slide.bgTint}
            />
          </SlideTransition>
        </Sequence>
      ))}

      {/* Slide CTA finale */}
      <Sequence from={totalSlides * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
        <SlideTransition index={totalSlides}>
          <SlideDots total={totalSlides + 1} current={totalSlides} accentColor={accentColor} />
          <SlideCTA
            cta={cta}
            storytellingEmotion={storytellingEmotion}
            whatsappNumber={whatsappNumber}
            websiteUrl={websiteUrl}
            brandName={brandName}
            hashtags={hashtags}
            primaryColor={primaryColor}
          />
        </SlideTransition>
      </Sequence>
    </AbsoluteFill>
  );
};

export default U3_StorySlide;
