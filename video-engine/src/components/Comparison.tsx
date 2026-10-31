import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/tokens';
import {formatByKind, type NumberFormat} from '../utils/format';

const Side: React.FC<{
  label: string;
  value: number;
  caption?: string;
  format: NumberFormat;
  unit?: string;
  accent: string;
  delay: number;
}> = ({label, value, caption, format, unit, accent, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame: frame - delay,
    config: {damping: 15},
  });
  const bar = interpolate(enter, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{flex: 1, opacity: enter, transform: `translateY(${(1 - enter) * 24}px)`}}>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 22,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: colors.paperMuted,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: fonts.serif,
          fontSize: 72,
          color: accent,
        }}
      >
        {formatByKind(value, format, format === 'currency' ? unit : undefined)}
        {format !== 'currency' && unit ? (
          <span style={{fontSize: 28, marginLeft: 10, color: colors.paperMuted}}>{unit}</span>
        ) : null}
      </div>
      <div
        style={{
          marginTop: 22,
          height: 8,
          background: colors.line,
          overflow: 'hidden',
        }}
      >
        <div style={{width: `${bar * 100}%`, height: '100%', background: accent}} />
      </div>
      {caption ? (
        <div
          style={{
            marginTop: 16,
            fontFamily: fonts.sans,
            fontSize: 22,
            color: colors.paperMuted,
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};

export const Comparison: React.FC<{
  left: {label: string; value: number; caption?: string};
  right: {label: string; value: number; caption?: string};
  unit?: string;
  format?: NumberFormat;
}> = ({left, right, unit, format = 'number'}) => {
  return (
    <div style={{display: 'flex', alignItems: 'stretch', gap: 48, width: 1400}}>
      <Side {...left} format={format} unit={unit} accent={colors.gold} delay={0} />
      <div
        style={{
          alignSelf: 'center',
          fontFamily: fonts.sans,
          fontWeight: 700,
          letterSpacing: 2,
          color: colors.paper,
        }}
      >
        VS
      </div>
      <Side {...right} format={format} unit={unit} accent={colors.crimson} delay={5} />
    </div>
  );
};
