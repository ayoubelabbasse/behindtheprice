import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand, colors, motion} from '../theme/tokens';
import {fonts} from '../theme/fonts';

export const BrandMark: React.FC<{
  align?: 'left' | 'center';
}> = ({align = 'left'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame,
    config: {damping: motion.enterDamping, mass: motion.enterMass},
  });
  const rule = interpolate(enter, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        gap: 10,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 16}px)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 6,
          color: colors.gold,
        }}
      >
        {brand.mark}
      </div>
      <div
        style={{
          width: 84 * rule,
          height: 2,
          background: colors.gold,
        }}
      />
    </div>
  );
};
