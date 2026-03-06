import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';
import { COLORS } from '../constants/colors';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from '../constants/fonts';
import { CTAOverlay, BrandWatermark } from '../components/CTAOverlay';
import type { UniversalVideoProps } from '../types-universal';

const StepNumber: React.FC<{ n: number; color?: string }> = ({ n, color = COLORS.gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ fps, frame, config: { damping: 8, stiffness: 300, mass: 0.4 }, from: 0, to: 1 });
  const opacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>
      <span style={{ fontFamily: FONTS.display, fontSize: 200, fontWeight: FONT_WEIGHTS.black, color, lineHeight: 1, letterSpacing: -8, textShadow: `0 8px 40px rgba(0,0,0,0.4)` }}>{n}</span>
    </div>
  );
};

const SceneProblem: React.FC<{ hookFr: string; hookDarija: string; primaryColor: string; accentColor: string; }> = ({ hookFr, hookDarija, primaryColor, accentColor }) => {
  const frame = useCurrentFrame();
  const words = hookFr.split(' ');
  const bgScale = interpolate(frame, [0, 8, 60], [1.04, 1, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: primaryColor, transform: `scale(${bgScale})`, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 56px', gap: 28 }}>
      <div style={{ opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' }), fontSize: 96, lineHeight: 1 }}>❌</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center', gap: 8 }}>
        {words.map((word, i) => {
          const wOpacity = interpolate(Math.max(0, frame - i * 4), [0, 6], [0, 1], { extrapolateRight: 'clamp' });
          return <span key={i} style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.hookSub - 4, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, opacity: wOpacity, lineHeight: 1.1 }}>{word}</span>;
        })}
      </div>
      <div style={{ opacity: interpolate(frame, [35, 55], [0, 1], { extrapolateRight: 'clamp' }), direction: 'rtl', background: 'rgba(0,0,0,0.2)', borderRadius: 50, padding: '8px 28px' }}>
        <span style={{ fontFamily: FONTS.arabic, fontSize: FONT_SIZES.body, fontWeight: FONT_WEIGHTS.semibold, color: accentColor }}>{hookDarija}</span>
      </div>
    </AbsoluteFill>
  );
};

// --- Scene Step (Clean Version) ---
const SceneStep: React.FC<{ stepNumber: number; title: string; desc: string; emoji?: string; productImage: string; accentColor: string; primaryColor: string; totalSteps: number; }> = ({ stepNumber, title, desc, emoji, productImage, accentColor, primaryColor, totalSteps }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 140], [1, 1.06], { extrapolateRight: 'clamp' });
  const slideIn = spring({ fps: 30, frame, config: { damping: 14, stiffness: 120, mass: 0.8 }, from: 60, to: 0 });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Img src={productImage || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1080"} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`, filter: 'brightness(0.55)' }} />
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(28,15,0,0.85) 100%)` }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'rgba(255,255,255,0.15)' }}><div style={{ height: '100%', width: `${(stepNumber / totalSteps) * 100}%`, background: accentColor, transition: 'width 0.3s' }} /></div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '0 56px', transform: `translateX(${slideIn}px)`, gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><StepNumber n={stepNumber} color={accentColor} />{emoji && <span style={{ fontSize: 72, opacity: interpolate(frame, [8, 20], [0, 1], { extrapolateRight: 'clamp' }) }}>{emoji}</span>}</div>
        <div style={{ opacity: interpolate(frame, [10, 28], [0, 1], { extrapolateRight: 'clamp' }) }}><span style={{ fontFamily: FONTS.display, fontSize: FONT_SIZES.title, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, lineHeight: 1.1, textShadow: '0 4px 16px rgba(0,0,0,0.6)' }}>{title}</span></div>
        <div style={{ opacity: interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' }), background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '16px 24px', borderLeft: `4px solid ${accentColor}` }}><span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body, fontWeight: FONT_WEIGHTS.medium, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>{desc}</span></div>
      </div>
    </AbsoluteFill>
  );
};

const SceneResult: React.FC<{ storytellingEmotion: string; cta: string; whatsappNumber?: string; websiteUrl?: string; brandName: string; hashtags: string; primaryColor: string; }> = ({ storytellingEmotion, cta, whatsappNumber, websiteUrl, brandName, hashtags, primaryColor }) => {
  const frame = useCurrentFrame();
  const scale = spring({ fps: 30, frame, config: { damping: 12, stiffness: 180 }, from: 0.85, to: 1 });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${primaryColor} 0%, ${COLORS.backgroundDark} 100%)`, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 56px', gap: 32, transform: `scale(${scale})` }}>
      <div style={{ fontSize: 100, opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) }}>✅</div>
      <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: 24, padding: '24px 36px', opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }) }}><span style={{ fontFamily: FONTS.body, fontSize: FONT_SIZES.body + 4, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white, textAlign: 'center', display: 'block', lineHeight: 1.4, fontStyle: 'italic' }}>"{storytellingEmotion}"</span></div>
      <CTAOverlay ctaText={cta} whatsappNumber={whatsappNumber} websiteUrl={websiteUrl} brandName={brandName} startFrame={20} variant={whatsappNumber ? 'whatsapp' : 'link-bio'} />
    </AbsoluteFill>
  );
};

function parseSteps(scriptAngle: string) {
  const steps = [];
  const patterns = [/(\d+)\)\s*([^.:\n]{5,60})(?:[.:]?\s*(.{0,80}))?/g];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(scriptAngle)) !== null && steps.length < 3) {
      steps.push({ title: (match[2] || '').trim(), desc: (match[3] || '').trim() });
    }
  }
  while (steps.length < 3) steps.push({ title: `Étape ${steps.length + 1}`, desc: "..." });
  return steps;
}

export const U2_TutoPunch: React.FC<UniversalVideoProps> = (props) => {
  const { brandName, hookFr, hookDarija, productImage = '', scriptAngle = '', storytellingEmotion = '', cta = '', primaryColor = COLORS.primary, accentColor = COLORS.gold } = props;
  const steps = parseSteps(scriptAngle);
  return (
    <AbsoluteFill>
      <BrandWatermark brandName={brandName} />
      <Sequence from={0} durationInFrames={60}><SceneProblem hookFr={hookFr} hookDarija={hookDarija} primaryColor={primaryColor} accentColor={accentColor} /></Sequence>
      {steps.map((step, i) => (
        <Sequence key={i} from={60 + i * 140} durationInFrames={140}>
          <SceneStep stepNumber={i + 1} title={step.title} desc={step.desc} productImage={productImage} accentColor={accentColor} primaryColor={primaryColor} totalSteps={3} />
        </Sequence>
      ))}
      <Sequence from={480} durationInFrames={120}><SceneResult storytellingEmotion={storytellingEmotion} cta={cta} brandName={brandName} hashtags="" primaryColor={primaryColor} /></Sequence>
    </AbsoluteFill>
  );
};

export default U2_TutoPunch;
