import { Composition } from "remotion";
import { BeautyProductAd } from "./BeautyProductAd";
import { PromoAd } from "./PromoAd"; // استدعاء القالب الجديد

export const RemotionRoot: React.FC = () => {
  const defaultProps = {
    productName: "Huile d'Argan Pure - Jodhur",
    tagline: "Le secret de beauté ancestral du Maroc",
    price: "189 MAD",
    oldPrice: "249 MAD",
    rating: 4.8,
    features: ["100% Bio & Pressée à froid", "Certifiée USDA Organic", "Sans additifs ni conservateurs"],
    ctaText: "Commander maintenant",
    backgroundGradient: ["#F5E6D3", "#D4A574"],
    accentColor: "#8B5E3C",
    logoUrl: "https://placehold.co/200x80/8B5E3C/white?text=JODHUR",
    productImageUrl: "https://placehold.co/500x500/F5E6D3/8B5E3C?text=Argan+Oil",
  };

  return (
    <>
      {/* القالب الأول */}
      <Composition
        id="BeautyProductAd"
        component={BeautyProductAd}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={defaultProps}
      />

      {/* القالب الثاني (الجديد) */}
      <Composition
        id="PromoAdTemplate"
        component={PromoAd}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};