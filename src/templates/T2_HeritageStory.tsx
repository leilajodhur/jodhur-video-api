import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS, GRADIENTS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { T2HeritageStoryProps } from '../types';

const SceneAtmosphere: React.FC<{ atmosphereImage: string; hookFr: string; heritageYears?: string; }> = ({ atmosphereImage, hookFr, heritageYears }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 90], [1, 1.06], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <Img src={atmosphereImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})` }} />
      <AbsoluteFill style={{ background: `rgba(28,15,0,0.6)` }} />
      <div style={{ position: 'absolute', bottom: 180, left: 48, right: 48 }}>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.hookSub, fontWeight: FONT_WEIGHTS.black, color: COLORS.white }}>{hookFr}</span>
      </div>
    </AbsoluteFill>
  );
};

const SceneStory: React.FC<{ storyText: string; hookDarija: string; region?: string; productImage: string; }> = ({ storyText, hookDarija, region, productImage }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.parchment }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', overflow: 'hidden' }}>
        <Img src={productImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to top, ${COLORS.parchment} 0%, transparent 100%)` }} />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: '50%', padding: '32px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
        <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body + 2, fontStyle: 'italic' }}>"{storyText}"</span>
        <span style={{ fontFamily: FONTS.arabic, fontSize: FONT_SIZES.subtitle, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary, direction: 'rtl' }}>{hookDarija}</span>
      </div>
    </AbsoluteFill>
  );
};

const SceneHeritage: React.FC<{ emotion: string; productName: string; productImage: string; }> = ({ emotion, productName, productImage }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, overflow: 'hidden' }}>
      <AbsoluteFill><Img src={productImage} style={{ width: '100%', height: '115%', objectFit: 'cover', opacity: 0.45 }} /></AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(160deg, ${COLORS.backgroundDark} 20%, rgba(44,24,16,0.6) 60%, ${COLORS.backgroundDark} 100%)` }} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0 56px' }}>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, textAlign: 'center', marginBottom: 20 }}>{emotion}</span>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold }}>— {productName}</span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const T2_HeritageStory: React.FC<T2HeritageStoryProps> = (props) => {
  return (
    <AbsoluteFill>
      <BrandWatermark brandName={props.brandName} />
      <Sequence from={0} durationInFrames={90}><SceneAtmosphere atmosphereImage={props.atmosphereImage!} hookFr={props.hookFr} heritageYears={props.heritageYears} /></Sequence>
      <Sequence from={90} durationInFrames={120}><SceneStory storyText={props.storyText!} hookDarija={props.hookDarija} region={props.region} productImage={props.productImage} /></Sequence>
      <Sequence from={210} durationInFrames={150}><SceneHeritage emotion={props.emotion!} productName={props.productName} productImage={props.productImage} /></Sequence>
      <Sequence from={360} durationInFrames={90}>
        <AbsoluteFill style={{ background: COLORS.backgroundDark }} />
        <CTAOverlay ctaText={props.cta} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} startFrame={0} variant="whatsapp" />
      </Sequence>
    </AbsoluteFill>
  );
};
export default T2_HeritageStory;
