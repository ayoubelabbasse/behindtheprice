import {AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, spacing} from '../theme/tokens';
import {fonts} from '../theme/fonts';

export const PhotoStory: React.FC<{
  src: string;
  kicker?: string;
  headline?: string;
  caption?: string;
  attribution?: string;
  position?: string;
}> = ({src, kicker, headline, caption, attribution, position = 'center'}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1.03, 1.10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textIn = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: colors.ink}}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: position,
          transform: `scale(${scale})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(9,12,11,0.86) 0%, rgba(9,12,11,0.52) 46%, rgba(9,12,11,0.10) 78%), linear-gradient(0deg, rgba(9,12,11,0.72) 0%, transparent 45%)',
        }}
      />
      <AbsoluteFill
        style={{
          padding: spacing.frame,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          paddingBottom: 94,
        }}
      >
        <div style={{maxWidth: 1050, opacity: textIn, transform: `translateY(${(1-textIn)*18}px)`}}>
          {kicker ? (
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 21,
              textTransform: 'uppercase',
              letterSpacing: 4,
              fontWeight: 700,
              color: colors.gold,
              marginBottom: 14,
            }}>{kicker}</div>
          ) : null}
          {headline ? (
            <div style={{
              fontFamily: fonts.serif,
              fontSize: 66,
              lineHeight: 1.03,
              fontWeight: 650,
              color: colors.paper,
              textShadow: '0 4px 30px rgba(0,0,0,.35)',
            }}>{headline}</div>
          ) : null}
          {caption ? (
            <div style={{
              marginTop: 16,
              fontFamily: fonts.sans,
              fontSize: 27,
              lineHeight: 1.35,
              color: colors.paperMuted,
              maxWidth: 880,
            }}>{caption}</div>
          ) : null}
        </div>
      </AbsoluteFill>
      {attribution ? (
        <div style={{
          position: 'absolute',
          right: 28,
          bottom: 22,
          fontFamily: fonts.sans,
          fontSize: 14,
          color: 'rgba(244,245,240,.72)',
          background: 'rgba(9,12,11,.55)',
          padding: '6px 9px',
          borderRadius: 6,
        }}>{attribution}</div>
      ) : null}
    </AbsoluteFill>
  );
};
