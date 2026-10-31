import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme/fonts';
import {colors, motion} from '../theme/tokens';
import {formatPlainNumber} from '../utils/format';

export const AnimatedNumber: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  decimals?: number;
}> = ({value, prefix = '', suffix = '', label, decimals = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({
    fps,
    frame,
    config: {damping: motion.numberDamping, mass: 0.85},
    durationInFrames: 36,
  });
  const current = interpolate(progress, [0, 1], [0, value], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 128,
          lineHeight: 1,
          color: colors.gold,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {prefix}
        {formatPlainNumber(current, decimals)}
        {suffix}
      </div>
      {label ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 28,
            color: colors.paperMuted,
            letterSpacing: 0.4,
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};
