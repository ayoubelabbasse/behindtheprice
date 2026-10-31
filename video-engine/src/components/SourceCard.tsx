import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme/fonts';
import {colors, radii} from '../theme/tokens';

export const SourceCard: React.FC<{
  source: string;
  detail?: string;
  year?: string;
  url?: string;
}> = ({source, detail, year, url}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame,
    config: {damping: 16},
  });

  return (
    <div
      style={{
        width: 720,
        padding: '28px 32px',
        borderRadius: radii.card,
        background: colors.inkLift,
        border: `1px solid ${colors.line}`,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 20}px)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 16,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: colors.gold,
        }}
      >
        Source
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: fonts.serif,
          fontSize: 36,
          color: colors.paper,
        }}
      >
        {source}
        {year ? <span style={{color: colors.paperMuted}}>{` · ${year}`}</span> : null}
      </div>
      {detail ? (
        <div
          style={{
            marginTop: 10,
            fontFamily: fonts.sans,
            fontSize: 20,
            color: colors.paperMuted,
            lineHeight: 1.4,
          }}
        >
          {detail}
        </div>
      ) : null}
      {url ? (
        <div
          style={{
            marginTop: 12,
            fontFamily: fonts.sans,
            fontSize: 16,
            color: colors.goldSoft,
          }}
        >
          {url}
        </div>
      ) : null}
    </div>
  );
};
