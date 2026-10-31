import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/tokens';
import {formatPlainNumber} from '../utils/format';

const WIDTH = 1180;
const HEIGHT = 420;
const PAD = 48;

export const Chart: React.FC<{
  chartType: 'bar' | 'line';
  title?: string;
  unit?: string;
  series: Array<{label: string; value: number; color?: string}>;
}> = ({chartType, title, unit, series}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const max = Math.max(...series.map((point) => point.value), 1);
  const innerWidth = WIDTH - PAD * 2;
  const innerHeight = HEIGHT - PAD * 2;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      {title ? (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 28,
            color: colors.paper,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
      ) : null}
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <line
          x1={PAD}
          x2={WIDTH - PAD}
          y1={HEIGHT - PAD}
          y2={HEIGHT - PAD}
          stroke={colors.line}
          strokeWidth={2}
        />
        {chartType === 'bar'
          ? series.map((point, index) => {
              const progress = spring({
                fps,
                frame: frame - index * 3,
                config: {damping: 14},
              });
              const barWidth = innerWidth / series.length - 28;
              const x = PAD + index * (innerWidth / series.length) + 14;
              const barHeight = (point.value / max) * innerHeight * progress;
              const y = HEIGHT - PAD - barHeight;

              return (
                <g key={point.label}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={point.color ?? colors.gold}
                  />
                  <text
                    x={x + barWidth / 2}
                    y={HEIGHT - 16}
                    textAnchor="middle"
                    fill={colors.paperMuted}
                    fontFamily={fonts.sans}
                    fontSize={18}
                  >
                    {point.label}
                  </text>
                </g>
              );
            })
          : null}
        {chartType === 'line'
          ? (() => {
              const points = series.map((point, index) => {
                const x = PAD + (index / Math.max(series.length - 1, 1)) * innerWidth;
                const rawY = HEIGHT - PAD - (point.value / max) * innerHeight;
                const progress = interpolate(frame, [0, 28], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
                return `${x},${HEIGHT - PAD - (HEIGHT - PAD - rawY) * progress}`;
              });

              return (
                <>
                  <polyline
                    fill="none"
                    stroke={colors.gold}
                    strokeWidth={5}
                    points={points.join(' ')}
                  />
                  {series.map((point, index) => {
                    const x = PAD + (index / Math.max(series.length - 1, 1)) * innerWidth;
                    const y = HEIGHT - PAD - (point.value / max) * innerHeight;
                    return (
                      <g key={point.label}>
                        <circle cx={x} cy={y} r={7} fill={colors.gold} />
                        <text
                          x={x}
                          y={HEIGHT - 16}
                          textAnchor="middle"
                          fill={colors.paperMuted}
                          fontFamily={fonts.sans}
                          fontSize={18}
                        >
                          {point.label}
                        </text>
                      </g>
                    );
                  })}
                </>
              );
            })()
          : null}
      </svg>
      {unit ? (
        <div style={{fontFamily: fonts.sans, color: colors.paperMuted, fontSize: 18}}>
          {unit} · max {formatPlainNumber(max)}
        </div>
      ) : null}
    </div>
  );
};
