// ============================================================
// U1_FlashHook — Template Universel 15s
// ============================================================
// Format   : 1080 × 1920 · 15s · 450f @ 30fps
// Usage    : Promo · Heritage · Produit · Story
// DA Rules :
//   ① Pattern interrupt frame 0 — couleur plein écran + texte géant
//   ② Jump cut à 2s — image produit plein écran sans transition
//   ③ Kinetic typography — chaque mot frappe séparément
//   ④ Rule of One — UN seul message central
//   ⑤ Bottom-third safe zone — captions sous les 80% de hauteur
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
import { PriceTag } from '../components/PriceTag';
import type { UniversalVideoProps } from '../types-universal';
import img from "../assets/hammam-vintage.jpg";

// ─── Composant : Mot cinétique (kinetic word) ─────────────────
const KineticWord: React.FC<{
  word: string;
  delay: number;
  color?: string;
  size?: number;
  weight?: number;
}> = ({ word, delay, color = COLORS.white, size = FONT_SIZES.hook, weight = FONT_WEIGHTS.black }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 10, stiffness: 180, mass: 0.6 },
    from: 0,
    to: 1,
  });

  const opacity = interpolate(Math.max(0, frame - delay), [0, 5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <span
      style={{
        display: 'inline-block',
        transform: `scale(${scale})`,
        opacity,
        color,
        fontFamily: FONTS.display,
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1.05,
        marginRight: 12,
      }}
    >
      {word}
    </span>
  );
};

// ─── Scène 1 : PATTERN INTERRUPT (0–60f / 0–2s) ──────────────
// DA: Première frame = CHOC VISUEL. Couleur saturée + texte géant.
// Pas de fondu, pas d'intro — on est dans le sujet à frame 0.
const ScenePatternInterrupt: React.FC<{
  hookFr: string;
  hookDarija: string;
  primaryColor: string;
  accentColor: string;
}> = ({ hookFr, hookDarija, primaryColor, accentColor }) => {
  const frame = useCurrentFrame();

  // Vibration légère : le fond pulse une fois entre 0-15f
  const bgScale = interpolate(frame, [0, 8, 15, 60], [1.05, 1, 1, 1], {
    extrapolateRight: 'clamp',
  });

  const words = hookFr.split(' ');

  return (
    <AbsoluteFill
      style={{
        background: primaryColor,
        transform: `scale(${bgScale})`,
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 48px',
      }}
    >
      {/* Lignes diagonales décoratives — énergie visuelle */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: '50%',
          border: `40px solid rgba(255,255,255,0.08)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: `30px solid rgba(255,255,255,0.06)`,
        }}
      />

      {/* Hook — kinetic typography, chaque mot apparaît */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 4,
          marginBottom: 20,
        }}
      >
        {words.map((word, i) => (
          <KineticWord
            key={i}
            word={word}
            delay={i * 6}
            color={COLORS.white}
            size={FONT_SIZES.hook - 8}
            weight={FONT_WEIGHTS.black}
          />
        ))}
      </div>

      {/* Hook darija — bas, RTL, petite taille, comme subtitle */}
      <div
        style={{
          direction: 'rtl',
          opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' }),
          background: 'rgba(0,0,0,0.25)',
          borderRadius: 50,
          padding: '8px 28px',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.arabic,
            fontSize: FONT_SIZES.body,
            fontWeight: FONT_WEIGHTS.semibold,
            color: accentColor,
          }}
        >
          {hookDarija}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 2 : MESSAGE PRINCIPAL (60–360f / 2–12s) ────────────
// DA: Jump cut brutal. Image produit plein écran + texte overlay.
// Pas de transition — la coupure brutale EST le pattern interrupt.
const SceneMessage: React.FC<{
  productImage: string;
  backgroundImage?: string;
  productName: string;
  scriptAngle: string;
  storytellingEmotion: string;
  benefits?: string[];
  region?: string;
  heritageYears?: string;
  originalPriceMAD?: number;
  promoPriceMAD?: number;
  promoCode?: string;
  urgencyText?: string;
  accentColor: string;
  pilier: string;
}> = ({
  productImage,
  backgroundImage,
  productName,
  scriptAngle,
  storytellingEmotion,
  benefits,
  region,
  heritageYears,
  originalPriceMAD,
  promoPriceMAD,
  promoCode,
  urgencyText,
  accentColor,
  pilier,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ken Burns : zoom lent sur l'image
  const zoom = interpolate(frame, [0, 300], [1, 1.08], { extrapolateRight: 'clamp' });

  // Overlay qui s'allège progressivement
  const overlayOpacity = interpolate(frame, [0, 40], [0.75, 0.45], { extrapolateRight: 'clamp' });

  const nameY = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 120 },
    from: 40,
    to: 0,
  });

  const isPromo = !!promoPriceMAD;
  const isHeritage = pilier?.toLowerCase().includes('heritage') || pilier?.toLowerCase().includes('héritage');

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
     {/* Image plein écran */}
      <Img
        src={backgroundImage || productImage || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1080"}
        // src={img}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      />

      {/* Gradient overlay sombre en bas */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,${overlayOpacity * 0.4}) 0%,
            rgba(0,0,0,0.05) 30%,
            rgba(0,0,0,0.3) 60%,
            rgba(28,15,0,0.92) 100%
          )`,
        }}
      />

      {/* Contenu bas — zone safe TikTok (bottom 15–80%) */}
      <div
        style={{
          position: 'absolute',
          bottom: 130,
          left: 0,
          right: 0,
          padding: '0 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          transform: `translateY(${nameY}px)`,
        }}
      >
        {/* Badge région/héritage */}
        {(region || heritageYears) && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {region && (
              <span
                style={{
                  background: COLORS.atlas,
                  color: COLORS.white,
                  fontFamily: FONTS.body,
                  fontSize: 28,
                  fontWeight: FONT_WEIGHTS.bold,
                  borderRadius: 50,
                  padding: '6px 20px',
                  opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              >
                🇲🇦 {region}
              </span>
            )}
            {heritageYears && (
              <span
                style={{
                  background: COLORS.gold,
                  color: COLORS.backgroundDark,
                  fontFamily: FONTS.body,
                  fontSize: 28,
                  fontWeight: FONT_WEIGHTS.black,
                  borderRadius: 50,
                  padding: '6px 20px',
                  opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              >
                {heritageYears} de tradition
              </span>
            )}
          </div>
        )}

        {/* Nom produit — grand, bold */}
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.title + 8,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.white,
            lineHeight: 1.1,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          {productName}
        </span>

        {/* Message émotionnel — 1 phrase max */}
        {storytellingEmotion && (
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: FONT_SIZES.body,
              fontWeight: FONT_WEIGHTS.medium,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.4,
              fontStyle: 'italic',
              opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            {storytellingEmotion.length > 80
              ? storytellingEmotion.slice(0, 80) + '…'
              : storytellingEmotion}
          </span>
        )}

        {/* Bénéfices — si mode produit/promo */}
        {benefits && benefits.length > 0 && !isHeritage && (
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            {benefits.slice(0, 3).map((b, i) => (
              <span
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  color: COLORS.white,
                  fontFamily: FONTS.body,
                  fontSize: 26,
                  fontWeight: FONT_WEIGHTS.semibold,
                  borderRadius: 50,
                  padding: '6px 18px',
                  border: `1.5px solid rgba(255,255,255,0.3)`,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Prix promo */}
        {isPromo && originalPriceMAD && promoPriceMAD && (
          <div
            style={{
              opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <PriceTag
              originalPrice={originalPriceMAD}
              promoPrice={promoPriceMAD}
              currency="MAD"
              promoCode={promoCode}
              startFrame={40}
            />
          </div>
        )}

        {/* Urgence */}
        {urgencyText && isPromo && (
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: 30,
              fontWeight: FONT_WEIGHTS.bold,
              color: '#FF6B6B',
              opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            ⏳ {urgencyText}
          </span>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 3 : CTA FORT (360–450f / 12–15s) ──────────────────
// DA: CTA unique, clair, action immédiate. Pas de texte superflu.
const SceneCTA: React.FC<{
  cta: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  brandName: string;
  ctaVariant?: 'whatsapp' | 'link-bio' | 'website';
  hashtags: string;
  primaryColor: string;
}> = ({ cta, whatsappNumber, websiteUrl, brandName, ctaVariant, hashtags, primaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 200 },
    from: 0.8,
    to: 1,
  });

  // Hashtags en bas, discrets
  const topTags = hashtags
    .split(/\s+/)
    .filter(t => t.startsWith('#'))
    .slice(0, 4)
    .join(' ');

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${primaryColor} 0%, ${COLORS.backgroundDark} 100%)`,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        padding: '0 48px',
        transform: `scale(${scale})`,
      }}
    >
      {/* CTA principal */}
      <CTAOverlay
        ctaText={cta}
        whatsappNumber={whatsappNumber}
        websiteUrl={websiteUrl}
        brandName={brandName}
        startFrame={0}
        variant={ctaVariant || (whatsappNumber ? 'whatsapp' : 'link-bio')}
      />

      {/* Hashtags discrets */}
      {topTags && (
        <span
          style={{
            position: 'absolute',
            bottom: 60,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: FONTS.body,
            fontSize: 26,
            color: 'rgba(255,255,255,0.4)',
            opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {topTags}
        </span>
      )}
    </AbsoluteFill>
  );
};

// ─── Composition principale U1 ────────────────────────────────
export const U1_FlashHook: React.FC<UniversalVideoProps> = (props) => {
  const {
    brandName,
    hookFr,
    hookDarija,
    productName,
    productImage,
    backgroundImage,
    scriptAngle,
    storytellingEmotion,
    benefits,
    region,
    heritageYears,
    originalPriceMAD,
    promoPriceMAD,
    promoCode,
    urgencyText,
    cta,
    hashtags,
    whatsappNumber,
    websiteUrl,
    ctaVariant,
    pilier,
    primaryColor = COLORS.primary,
    accentColor = COLORS.gold,
  } = props;

  return (
    <AbsoluteFill>
      <BrandWatermark brandName={brandName} />

      {/* Scène 1 : Pattern Interrupt (0–60f / 0–2s) */}
      <Sequence from={0} durationInFrames={60}>
        <ScenePatternInterrupt
          hookFr={hookFr}
          hookDarija={hookDarija}
          primaryColor={primaryColor}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scène 2 : Message (60–360f / 2–12s) */}
      <Sequence from={60} durationInFrames={300}>
        <SceneMessage
          productImage={productImage}
          backgroundImage={backgroundImage}
          productName={productName}
          scriptAngle={scriptAngle}
          storytellingEmotion={storytellingEmotion}
          benefits={benefits}
          region={region}
          heritageYears={heritageYears}
          originalPriceMAD={originalPriceMAD}
          promoPriceMAD={promoPriceMAD}
          promoCode={promoCode}
          urgencyText={urgencyText}
          accentColor={accentColor}
          pilier={pilier}
        />
      </Sequence>

      {/* Scène 3 : CTA (360–450f / 12–15s) */}
      <Sequence from={360} durationInFrames={90}>
        <SceneCTA
          cta={cta}
          whatsappNumber={whatsappNumber}
          websiteUrl={websiteUrl}
          brandName={brandName}
          ctaVariant={ctaVariant}
          hashtags={hashtags}
          primaryColor={primaryColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default U1_FlashHook;
