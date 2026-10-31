import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/tokens';

export const Timeline: React.FC<{
  title?: string;
  events: Array<{year: string; label: string; detail?: string}>;
}> = ({title, events}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const line = spring({
    fps,
    frame,
    config: {damping: 18},
    durationInFrames: 28,
  });

  return (
    <div style={{width: 1500, display: 'flex', flexDirection: 'column', gap: 36}}>
      {title ? (
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 48,
            color: colors.paper,
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{position: 'relative', paddingTop: 20}}>
        <div
          style={{
            position: 'absolute',
            top: 34,
            left: 0,
            width: `${line * 100}%`,
            height: 3,
            background: colors.gold,
          }}
        />
        <div style={{display: 'flex', justifyContent: 'space-between', gap: 24}}>
          {events.map((event, index) => {
            const enter = spring({
              fps,
              frame: frame - 6 - index * 5,
              config: {damping: 14},
            });

            return (
              <div
                key={`${event.year}-${event.label}`}
                style={{
                  flex: 1,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 18}px)`,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: colors.gold,
                    marginBottom: 18,
                  }}
                />
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 20,
                    color: colors.gold,
                    letterSpacing: 1,
                  }}
                >
                  {event.year}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: fonts.serif,
                    fontSize: 28,
                    color: colors.paper,
                  }}
                >
                  {event.label}
                </div>
                {event.detail ? (
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: fonts.sans,
                      fontSize: 18,
                      color: colors.paperMuted,
                      lineHeight: 1.4,
                    }}
                  >
                    {event.detail}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
