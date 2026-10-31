import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/tokens';
import {formatMoney} from '../utils/format';

export const Receipt: React.FC<{
  merchant: string;
  date?: string;
  items: Array<{label: string; price: number; emphasize?: boolean}>;
  total: number;
  currency?: string;
}> = ({merchant, date, items, total, currency = 'USD'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const paperIn = spring({
    fps,
    frame,
    config: {damping: 14, mass: 0.8},
  });

  return (
    <div
      style={{
        width: 620,
        background: colors.paper,
        color: colors.ink,
        padding: '42px 40px 36px',
        transform: `translateY(${(1 - paperIn) * 40}px)`,
        boxShadow: '0 28px 80px rgba(0,0,0,0.4)',
        backgroundImage:
          'repeating-linear-gradient(180deg, rgba(11,14,18,0.03) 0 2px, transparent 2px 8px)',
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 18,
          letterSpacing: 3,
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {merchant}
      </div>
      {date ? (
        <div
          style={{
            marginTop: 8,
            textAlign: 'center',
            fontFamily: fonts.sans,
            fontSize: 16,
            color: '#5C564C',
          }}
        >
          {date}
        </div>
      ) : null}
      <div
        style={{
          margin: '22px 0',
          borderTop: '1px dashed #8A8276',
        }}
      />
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {items.map((item, index) => {
          const itemIn = interpolate(frame, [8 + index * 4, 20 + index * 4], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={`${item.label}-${index}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: fonts.sans,
                fontSize: 22,
                opacity: itemIn,
                fontWeight: item.emphasize ? 700 : 500,
                color: item.emphasize ? colors.crimson : colors.ink,
              }}
            >
              <span>{item.label}</span>
              <span>{formatMoney(item.price, currency)}</span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          margin: '22px 0 16px',
          borderTop: '2px solid #1B1814',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: fonts.serif,
          fontSize: 34,
        }}
      >
        <span>Total</span>
        <span>{formatMoney(total, currency)}</span>
      </div>
    </div>
  );
};
