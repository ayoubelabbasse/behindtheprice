import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, motion} from '../theme/tokens';
import {fonts} from '../theme/fonts';

export const Headline: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}> = ({eyebrow, title, subtitle, align = 'left'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleIn = spring({
    fps,
    frame,
    config: {damping: motion.enterDamping, mass: motion.enterMass},
  });
  const subIn = spring({
    fps,
    frame: frame - 6,
    config: {damping: motion.enterDamping, mass: motion.enterMass},
  });
  const textAlign = align === 'center' ? 'center' : 'left';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        gap: 18,
        maxWidth: 1480,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: colors.gold,
            opacity: titleIn,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h1
        style={{
          margin: 0,
          fontFamily: fonts.serif,
          fontSize: 92,
          lineHeight: 1.02,
          fontWeight: 600,
          color: colors.paper,
          textAlign,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 28}px)`,
        }}
      >
        {title}
      </h1>
      {subtitle ? (
        <p
          style={{
            margin: 0,
            maxWidth: 920,
            fontFamily: fonts.sans,
            fontSize: 32,
            lineHeight: 1.35,
            color: colors.paperMuted,
            textAlign,
            opacity: subIn,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};
