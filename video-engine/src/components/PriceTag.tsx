import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme/fonts';
import {colors, motion} from '../theme/tokens';
import {formatMoney} from '../utils/format';

export const PriceTag: React.FC<{
  label: string;
  amount: number;
  compareAt?: number;
  currency?: string;
}> = ({label, amount, compareAt, currency = 'USD'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame,
    config: {damping: 12, mass: motion.enterMass},
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 360,
        padding: '36px 32px 32px',
        background: colors.gold,
        color: colors.ink,
        transform: `rotate(${-6 + enter * 6}deg) scale(${0.86 + enter * 0.14})`,
        boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: colors.ink,
          boxShadow: 'inset 0 0 0 4px rgba(11,14,18,0.18)',
        }}
      />
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: fonts.serif,
          fontSize: 64,
          lineHeight: 1,
        }}
      >
        {formatMoney(amount, currency, Number.isInteger(amount) ? 0 : 2)}
      </div>
      {compareAt !== undefined ? (
        <div
          style={{
            marginTop: 8,
            fontFamily: fonts.sans,
            fontSize: 20,
            textDecoration: 'line-through',
            opacity: 0.7,
          }}
        >
          {formatMoney(compareAt, currency, Number.isInteger(compareAt) ? 0 : 2)}
        </div>
      ) : null}
    </div>
  );
};
