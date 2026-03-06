// ============================================================
// T1_PromoFlash — Reel 30s · Promo & Offres
// ============================================================
// Format   : 1080 × 1920 (portrait 9:16)
// Durée    : 30 s → 900 frames @ 30 fps
// Pilier   : "Promo & Offres" (tous les samedis dans le fichier)
// Exemples : Kit Hammam 149 MAD · Pack Argan+Rose · Trio Sanouj
//
// Scènes :
//  [00:00–03:00] Scène 1 — Hook punch bilingue (0–90f)
//  [03:00–10:00] Scène 2 — Produit(s) + bénéfices clés (90–300f)
//  [10:00–22:00] Scène 3 — Prix barré → prix flash + urgence (300–660f)
//  [22:00–27:00] Scène 4 — Validation sociale (660–810f)
//  [27:00–30:00] Scène 5 — CTA WhatsApp / Lien bio (810–900f)
//
// Props depuis Excel :
//  hook_fr          → hookFr
//  hook_darija      → hookDarija
//  produit_principal→ productName
//  cta              → cta
//  script_angle     → benefits[]
//  storytelling_emotion → urgencyText
//  hashtags         → hashtags
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
import { PriceTag, UrgencyBadge } from '../components/PriceTag';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T1PromoFlashProps } from '../types';

// ─── Scène 1 : Hook punch (0–90f) ────────────────────────────
const SceneHook: React.FC<Pick<T1PromoFlashProps, 'hookFr' | 'hookDarija'>> = ({
  hookFr,
  hookDarija,
}) => {
  const frame = useCurrentFrame();

  // Fond animé : particules or
  const bgOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      {/* Fond gradient hammam */}
      <AbsoluteFill
        style={{
          background: GRADIENTS.hammam,
          opacity: bgOpacity,
        }}
      />

      {/* Motif zellige décoratif */}
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(212,175,55,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(196,118,58,0.15) 0%, transparent 50%)',
        }}
      />

      <HookText
        hookFr={hookFr}
        hookDarija={hookDarija}
        variant="punch"
        bgColor="transparent"
        textColor={COLORS.white}
        accentColor={COLORS.gold}
      />
    </AbsoluteFill>
  );
};

// ─── Scène 2 : Produit + bénéfices (90–300f) ─────────────────
const SceneProduct: React.FC<{
  productName: string;
  productImage: string;
  productImage2?: string;
  productImage3?: string;
  benefits: string[];
}> = ({ productName, productImage, productImage2, productImage3, benefits }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageScale = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 100, mass: 1 },
    from: 1.08,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ background: COLORS.cream }}>
      {/* Image produit principale */}
      <AbsoluteFill>
        <Img
          src={productImage}
          style={{
            width: '100%',
            height: '70%',
            objectFit: 'cover',
            transform: `scale(${imageScale})`,
          }}
        />
      </AbsoluteFill>

      {/* Gradient overlay bas */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to top, ${COLORS.cream} 35%, transparent 70%)`,
        }}
      />

      {/* Nom du produit */}
      <div
        style={{
          position: 'absolute',
          top: '68%',
          left: 40,
          right: 40,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.title,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.primaryDark,
            display: 'block',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          {productName}
        </span>
      </div>

      {/* Bénéfices — liste avec check */}
      <div
        style={{
          position: 'absolute',
          top: '76%',
          left: 48,
          right: 48,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {benefits.map((b, i) => {
          const itemFrame = Math.max(0, frame - i * 12);
          const itemOpacity = interpolate(itemFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
          const itemX = interpolate(itemFrame, [0, 15], [-30, 0], { extrapolateRight: 'clamp' });

          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: COLORS.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 18, color: COLORS.white }}>✓</span>
              </div>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: FONT_SIZES.body,
                  fontWeight: FONT_WEIGHTS.semibold,
                  color: COLORS.backgroundDark,
                }}
              >
                {b}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 3 : Prix Flash (300–660f) ─────────────────────────
const ScenePrice: React.FC<{
  originalPriceMAD: number;
  promoPriceMAD: number;
  promoCode?: string;
  urgencyText: string;
  backgroundImage?: string;
}> = ({ originalPriceMAD, promoPriceMAD, promoCode, urgencyText, backgroundImage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      {/* Fond ambiance */}
      {backgroundImage && (
        <AbsoluteFill>
          <Img
            src={backgroundImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
          />
        </AbsoluteFill>
      )}

      {/* Fond overlay */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(160deg, rgba(28,15,0,0.9) 0%, rgba(196,118,58,0.4) 100%)',
        }}
      />

      {/* Badge urgence */}
      <UrgencyBadge text={urgencyText} startFrame={0} top={100} right={40} />

      {/* Texte FLASH */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 40,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 56,
            fontWeight: FONT_WEIGHTS.black,
            color: COLORS.gold,
            letterSpacing: 6,
          }}
        >
          FLASH
        </span>
        <br />
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 40,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.sand,
          }}
        >
          PROMO
        </span>
      </div>

      {/* Prix centré */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PriceTag
          priceMAD={promoPriceMAD}
          originalPriceMAD={originalPriceMAD}
          promoCode={promoCode}
          startFrame={0}
          size="large"
        />
      </div>

      {/* Mention naturel / halal */}
      <div
        style={{
          position: 'absolute',
          bottom: 220,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        {['🌿 Naturel', '✅ Halal', '🇲🇦 Artisanal'].map((tag, i) => {
          const tagFrame = Math.max(0, frame - i * 8);
          const tagOpacity = interpolate(tagFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
          return (
            <div
              key={i}
              style={{
                background: 'rgba(212,175,55,0.2)',
                border: `2px solid ${COLORS.gold}`,
                borderRadius: 50,
                padding: '8px 20px',
                opacity: tagOpacity,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 32,
                  fontWeight: FONT_WEIGHTS.semibold,
                  color: COLORS.gold,
                }}
              >
                {tag}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 4 : Preuve sociale (660–810f) ─────────────────────
const SceneSocial: React.FC<{ productName: string }> = ({ productName }) => {
  const frame = useCurrentFrame();

  const testimonials = [
    { text: '"Walah mzyan bzaf ! ✨"', name: 'Fatima Z., Casablanca', stars: 5 },
    { text: '"Livraison rapide, produit authentique 💯"', name: 'Khadija M., Marrakech', stars: 5 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.parchment,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 32,
        padding: '0 48px',
      }}
    >
      <span
        style={{
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.subtitle,
          fontWeight: FONT_WEIGHTS.bold,
          color: COLORS.primaryDark,
          textAlign: 'center',
        }}
      >
        Elles ont adoré {productName}
      </span>

      {testimonials.map((t, i) => {
        const tFrame = Math.max(0, frame - i * 20);
        const tOpacity = interpolate(tFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
        const tX = interpolate(tFrame, [0, 20], [60, 0], { extrapolateRight: 'clamp' });

        return (
          <div
            key={i}
            style={{
              opacity: tOpacity,
              transform: `translateX(${tX}px)`,
              background: COLORS.white,
              borderRadius: 24,
              padding: '24px 32px',
              width: '100%',
              boxShadow: '0 4px 20px rgba(196,118,58,0.15)',
              borderLeft: `6px solid ${COLORS.primary}`,
            }}
          >
            <span
              style={{
                fontSize: 44,
                display: 'block',
                marginBottom: 8,
              }}
            >
              {'⭐'.repeat(t.stars)}
            </span>
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: FONT_SIZES.body,
                fontWeight: FONT_WEIGHTS.medium,
                color: COLORS.backgroundDark,
                display: 'block',
                marginBottom: 8,
                fontStyle: 'italic',
              }}
            >
              {t.text}
            </span>
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: 30,
                fontWeight: FONT_WEIGHTS.semibold,
                color: COLORS.primary,
              }}
            >
              — {t.name}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── Composition principale ───────────────────────────────────
export const T1_PromoFlash: React.FC<T1PromoFlashProps> = (props) => {
  const {
    brandName,
    hookFr,
    hookDarija,
    productName,
    productImage,
    productImage2,
    productImage3,
    backgroundImage,
    originalPriceMAD,
    promoPriceMAD,
    promoCode,
    urgencyText,
    benefits,
    cta,
    whatsappNumber,
    websiteUrl,
  } = props;

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      {/* Watermark toujours visible */}
      <BrandWatermark brandName={brandName} />

      {/* ── Scène 1 : Hook (0–90f / 0–3s) ── */}
      <Sequence from={0} durationInFrames={90}>
        <SceneHook hookFr={hookFr} hookDarija={hookDarija} />
      </Sequence>

      {/* ── Scène 2 : Produit + bénéfices (90–300f / 3–10s) ── */}
      <Sequence from={90} durationInFrames={210}>
        <SceneProduct
          productName={productName}
          productImage={productImage}
          productImage2={productImage2}
          productImage3={productImage3}
          benefits={benefits}
        />
      </Sequence>

      {/* ── Scène 3 : Prix Flash (300–660f / 10–22s) ── */}
      <Sequence from={300} durationInFrames={360}>
        <ScenePrice
          originalPriceMAD={originalPriceMAD}
          promoPriceMAD={promoPriceMAD}
          promoCode={promoCode}
          urgencyText={urgencyText}
          backgroundImage={backgroundImage}
        />
      </Sequence>

      {/* ── Scène 4 : Preuve sociale (660–810f / 22–27s) ── */}
      <Sequence from={660} durationInFrames={150}>
        <SceneSocial productName={productName} />
      </Sequence>

      {/* ── Scène 5 : CTA (810–900f / 27–30s) ── */}
      <Sequence from={810} durationInFrames={90}>
        <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
          <AbsoluteFill
            style={{
              background: GRADIENTS.promo,
              opacity: 0.95,
            }}
          />
        </AbsoluteFill>
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
      <Sequence from={100} durationInFrames={190}>
        <TikTokCaption
          text={hookDarija}
          startFrame={0}
          rtl={true}
          animationMode="slide-up"
          bgColor={COLORS.backgroundDark}
          bottom={60}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default T1_PromoFlash;
