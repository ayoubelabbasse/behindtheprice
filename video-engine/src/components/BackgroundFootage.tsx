import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Video} from '@remotion/media';
import {colors} from '../theme/tokens';

const resolveSrc = (src: string): string => {
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }

  return staticFile(src);
};

export const BackgroundFootage: React.FC<{
  src?: string;
  dim?: number;
  kenBurns?: boolean;
}> = ({src, dim = 0.58, kenBurns = false}) => {
  const frame = useCurrentFrame();
  const scale = kenBurns
    ? interpolate(frame, [0, 90], [1.08, 1.18], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1.04;
  const isVideo = Boolean(src && /\.(mp4|webm|mov|m3u8)$/i.test(src));

  return (
    <AbsoluteFill style={{background: colors.ink, overflow: 'hidden'}}>
      {src && isVideo ? (
        <Video
          src={resolveSrc(src)}
          muted
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})`}}
        />
      ) : null}
      {src && !isVideo ? (
        <Img
          src={resolveSrc(src)}
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})`}}
        />
      ) : null}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(11,14,18,0.35), ${colors.ink} ${Math.round(dim * 100)}%)`,
        }}
      />
    </AbsoluteFill>
  );
};
