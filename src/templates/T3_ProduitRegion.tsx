import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { TikTokCaption } from '../components/TikTokCaption';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import { HookText } from '../components/HookText';
import type { T3ProduitRegionProps } from '../types';

const SceneGeoHook: React.FC<{ hookFr: string; hookDarija: string; region: string; regionImage?: string; }> = ({ hookFr, hookDarija, region, regionImage }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      {regionImage && <Img src={regionImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      <AbsoluteFill style={{ background: `rgba(28,15,0,0.6)` }} />
      <HookText hookFr={hookFr} hookDarija={hookDarija} variant="overlay" bgColor="transparent" textColor={COLORS.white} accentColor={COLORS.gold} />
    </AbsoluteFill>
  );
};

const SceneRegionalJourney: React.FC<{ region: string; funFacts: string[]; regionImage?: string; productImage: string; }> = ({ region, funFacts, regionImage, productImage }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.parchment }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%' }}>
        <Img src={regionImage || productImage} style={{ width: '100%', height: '120%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: `linear-gradient(to top, ${COLORS.parchment} 0%, transparent 100%)` }} />
      </div>
      <div style={{ position: 'absolute', top: '48%', left: 0, right: 0, padding: '0 48px' }}>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, fontWeight: FONT_WEIGHTS.black, marginBottom: 20, display:'block' }}>{region}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {funFacts.slice(0, 2).map((fact, i) => (
             <span key={i} style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, fontWeight: FONT_WEIGHTS.semibold }}>✓ {fact}</span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneExtraction: React.FC<{ extractionSteps: { label: string; durationSec: number }[]; extractionImage?: string; productImage: string; }> = ({ extractionSteps, extractionImage, productImage }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      <Img src={extractionImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
      <AbsoluteFill style={{ background: 'linear-gradient(160deg, rgba(28,15,0,0.92) 0%, rgba(44,60,20,0.7) 100%)' }} />
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0 }}><span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold, textAlign: 'center', display: 'block' }}>PROCESSUS NATUREL</span></div>
      <div style={{ position: 'absolute', top: '35%', left: 40, right: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {extractionSteps.slice(0, 2).map((step, i) => (
          <span key={i} style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, color: COLORS.white }}>{i+1}. {step.label}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const T3_ProduitRegion: React.FC<T3ProduitRegionProps> = (props) => {
  return (
    <AbsoluteFill>
      <BrandWatermark brandName={props.brandName} />
      <Sequence from={0} durationInFrames={90}><SceneGeoHook hookFr={props.hookFr} hookDarija={props.hookDarija} region={props.region!} regionImage={props.regionImage} /></Sequence>
      <Sequence from={90} durationInFrames={210}><SceneRegionalJourney region={props.region!} funFacts={props.funFacts} regionImage={props.regionImage} productImage={props.productImage} /></Sequence>
      <Sequence from={300} durationInFrames={210}><SceneExtraction extractionSteps={props.extractionSteps} extractionImage={props.extractionImage} productImage={props.productImage} /></Sequence>
      <Sequence from={510} durationInFrames={90}>
        <AbsoluteFill style={{ background: COLORS.backgroundDark }} />
        <CTAOverlay ctaText={props.cta} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} startFrame={0} variant="full" />
      </Sequence>
      <Sequence from={90} durationInFrames={210}>
        <TikTokCaption text={props.hookDarija} startFrame={0} rtl={true} animationMode="slide-up" bgColor={COLORS.atlas} bottom={60} />
      </Sequence>
    </AbsoluteFill>
  );
};
export default T3_ProduitRegion;
