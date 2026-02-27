// BeautyProductAd.tsx
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from "remotion";

const SCENES = {
  INTRO: [0, 60],       // 0-2s : Intro logo
  PRODUCT: [60, 120],   // 2-4s : Reveal produit
  FEATURES: [120, 180], // 4-6s : Features
  CTA: [180, 240],      // 6-8s : Call to action
};

export const BeautyProductAd: React.FC<{
  productName: string;
  tagline: string;
  price: string;
  oldPrice: string;
  features: string[];
  ctaText: string;
  backgroundGradient: string[];
  accentColor: string;
  logoUrl: string;
  productImageUrl: string;
}> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === SCENE 1 : INTRO LOGO ===
  const logoScale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 30 });
  const logoOpacity = interpolate(frame, [50, 60], [1, 0], { extrapolateRight: "clamp" });

  // === SCENE 2 : PRODUCT REVEAL ===
  const productSlide = spring({ frame: frame - 60, fps, from: 100, to: 0, durationInFrames: 30 });
  const productOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // === SCENE 3 : FEATURES ===
  const featureEntries = props.features.map((_, i) =>
    spring({ frame: frame - 120 - i * 15, fps, from: 50, to: 0, durationInFrames: 20 })
  );

  // === SCENE 4 : CTA ===
  const ctaScale = spring({ frame: frame - 190, fps, from: 0, to: 1, durationInFrames: 20 });
  const ctaPulse = interpolate(frame % 20, [0, 10, 20], [1, 1.05, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${props.backgroundGradient[0]}, ${props.backgroundGradient[1]})`,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* SCENE 1 — Logo Intro */}
      <Sequence from={0} durationInFrames={60}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: logoOpacity }}>
          <div style={{ transform: `scale(${logoScale})` }}>
            <Img src={props.logoUrl} style={{ width: 300 }} />
            <p style={{ color: props.accentColor, fontSize: 22, textAlign: "center", marginTop: 10 }}>
              {props.tagline}
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 2 — Product Reveal */}
      <Sequence from={60} durationInFrames={60}>
        <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", opacity: productOpacity }}>
          <div style={{ transform: `translateX(${productSlide}px)` }}>
            <Img src={props.productImageUrl} style={{ width: 350, borderRadius: 20 }} />
          </div>
          <div style={{ marginLeft: 40 }}>
            <h1 style={{ color: props.accentColor, fontSize: 36, maxWidth: 400 }}>{props.productName}</h1>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 10 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: props.accentColor }}>{props.price}</span>
              <span style={{ fontSize: 20, textDecoration: "line-through", color: "#999" }}>{props.oldPrice}</span>
            </div>
            <p style={{ color: "#B8860B", fontSize: 18 }}>⭐ {props.rating || "4.8"} — Best seller</p>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 3 — Features */}
      <Sequence from={120} durationInFrames={60}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <h2 style={{ color: props.accentColor, fontSize: 32, marginBottom: 30 }}>Pourquoi Jodhur ?</h2>
          {props.features.map((feat, i) => (
            <div
              key={i}
              style={{
                transform: `translateX(${featureEntries[i]}px)`,
                background: "rgba(255,255,255,0.7)",
                padding: "14px 30px",
                borderRadius: 12,
                marginBottom: 12,
                fontSize: 22,
                color: "#333",
                backdropFilter: "blur(10px)",
              }}
            >
              ✅ {feat}
            </div>
          ))}
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 4 — CTA */}
      <Sequence from={180} durationInFrames={60}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <Img src={props.productImageUrl} style={{ width: 200, borderRadius: 20, marginBottom: 20 }} />
          <div
            style={{
              transform: `scale(${ctaScale * ctaPulse})`,
              background: props.accentColor,
              color: "white",
              padding: "20px 50px",
              borderRadius: 50,
              fontSize: 28,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {props.ctaText}
          </div>
          <p style={{ color: props.accentColor, fontSize: 20, marginTop: 15 }}>
            Livraison gratuite 🇲🇦 | Paiement à la livraison
          </p>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};