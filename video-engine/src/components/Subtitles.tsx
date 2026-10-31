import {useCurrentFrame, useVideoConfig} from 'remotion';
import {fonts} from '../theme/fonts';
import {colors, radii} from '../theme/tokens';
import type {CaptionLine} from '../types/episode';
import {paginateCaptions} from '../utils/captions';

export const Subtitles: React.FC<{
  captions: CaptionLine[];
}> = ({captions}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const nowMs = (frame / fps) * 1000;
  const pages = paginateCaptions(captions);
  const page = pages.find((item) => nowMs >= item.startMs && nowMs < item.startMs + item.durationMs);

  if (!page) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 64,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          padding: '14px 22px',
          borderRadius: radii.pill,
          background: 'rgba(11,14,18,0.72)',
          color: colors.paper,
          fontFamily: fonts.sans,
          fontSize: 36,
          lineHeight: 1.25,
          textAlign: 'center',
          whiteSpace: 'pre',
        }}
      >
        {page.tokens.map((token) => {
          const active = nowMs >= token.fromMs && nowMs <= token.toMs;
          return (
            <span key={`${token.fromMs}-${token.text}`} style={{color: active ? colors.gold : colors.paper}}>
              {token.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
