import {AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedNumber} from '../components';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/tokens';

const SlidingNumber: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame,
    config: {damping: 16, mass: 0.7},
  });
  const opacity = interpolate(enter, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(enter, [0, 1], [28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{opacity, transform: `translateY(${y}px)`}}>
      <AnimatedNumber value={100} prefix="$" suffix="M" />
    </div>
  );
};

export const TestComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleIn = spring({
    fps,
    frame,
    config: {damping: 16, mass: 0.7},
  });
  const titleOpacity = interpolate(titleIn, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(titleIn, [0, 1], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames - 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: colors.ink}}>
      <AbsoluteFill
        style={{
          opacity: fadeOut,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 96,
            lineHeight: 1,
            color: colors.paper,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Behind the Price
        </div>
        <Sequence from={24} durationInFrames={durationInFrames - 24} layout="none">
          <SlidingNumber />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
