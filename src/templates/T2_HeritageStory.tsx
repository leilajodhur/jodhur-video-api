import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { T2HeritageStoryProps } from '../types';

const SceneAtmosphere: React.FC<{ bgImage?: string; hookFr: string; }> = ({ bgImage, hookFr }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 150], [1, 1.1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, overflow: 'hidden' }}>
      {bgImage && <Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`, opacity: 0.7 }} />}
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, rgba(28,15,0,0.2) 0%, rgba(28,15,0,0.9) 100%)` }} />
      <div style={{ position: 'absolute', bottom: 120, left: 48, right: 48, textAlign: 'center' }}>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.hookSub, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, lineHeight: 1.2, textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>{hookFr}</span>
      </div>
    </AbsoluteFill>
  );
};

const SceneStory: React.FC<{ storyText: string; hookDarija: string; productImage: string; bgImage?: string; }> = ({ storyText, hookDarija, productImage, bgImage }) => {
  const frame = useCurrentFrame();
  const fadeText = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: COLORS.parchment }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', overflow: 'hidden' }}>
        <Img src={bgImage || productImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `linear-gradient(to top, ${COLORS.parchment} 0%, transparent 100%)` }} />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: '50%', padding: '32px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24, opacity: fadeText }}>
        <span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body + 2, fontStyle: 'italic', color: COLORS.charcoal, textAlign: 'center' }}>"{storyText}"</span>
        <span style={{ fontFamily: FONTS.arabic, fontSize: FONT_SIZES.subtitle, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary, direction: 'rtl', textAlign: 'center' }}>{hookDarija}</span>
      </div>
    </AbsoluteFill>
  );
};

const SceneHeritage: React.FC<{ emotion: string; productName: string; bgImage?: string; }> = ({ emotion, productName, bgImage }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 150], [1.1, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark, overflow: 'hidden' }}>
      {bgImage && <AbsoluteFill><Img src={bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})`, opacity: 0.5 }} /></AbsoluteFill>}
      <AbsoluteFill style={{ background: `linear-gradient(160deg, rgba(28,15,0,0.4) 0%, rgba(196,118,58,0.4) 100%)` }} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0 56px' }}>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, textAlign: 'center', marginBottom: 20, textShadow: '0 4px 15px rgba(0,0,0,0.6)' }}>{emotion}</span>
        <span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.subtitle, color: COLORS.gold, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>— {productName}</span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const T2_HeritageStory: React.FC<T2HeritageStoryProps> = (props) => {
  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDark }}>
      <BrandWatermark brandName={props.brandName} />
      
      <Sequence from={0} durationInFrames={90}>
        <SceneAtmosphere bgImage={props.atmosphereBgImage} hookFr={props.hookFr} />
      </Sequence>
      
      <Sequence from={90} durationInFrames={120}>
        <SceneStory storyText={props.scriptAngle || props.hookFr} hookDarija={props.hookDarija} productImage={props.productImage} bgImage={props.storyBgImage} />
      </Sequence>
      
      <Sequence from={210} durationInFrames={150}>
        <SceneHeritage emotion={props.storytellingEmotion || ''} productName={props.productName} bgImage={props.heritageBgImage || props.productImage} />
      </Sequence>
      
      <Sequence from={360} durationInFrames={90}>
        <AbsoluteFill>
          {/* خلفية الـ CTA أصبحت مستقلة */}
          <Img src={props.ctaBgImage || props.productImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(15px)', transform: 'scale(1.1)' }} />
          <AbsoluteFill style={{ background: 'rgba(28,15,0,0.5)' }} />
        </AbsoluteFill>
        <CTAOverlay ctaText={props.cta} whatsappNumber={props.whatsappNumber} websiteUrl={props.websiteUrl} brandName={props.brandName} startFrame={0} variant="whatsapp" />
      </Sequence>
    </AbsoluteFill>
  );
};
export default T2_HeritageStory;
