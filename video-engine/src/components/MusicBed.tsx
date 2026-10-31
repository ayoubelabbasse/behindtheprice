import {Audio} from '@remotion/media';
import {interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const MusicBed: React.FC<{
  src: string;
  volume?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}> = ({src, volume = 0.12, fadeInFrames = 18, fadeOutFrames = 24}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const resolved = src.startsWith('http') ? src : staticFile(src);
  const fadeIn = interpolate(frame, [0, fadeInFrames], [0, volume], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fadeOutFrames, durationInFrames],
    [volume, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const currentVolume = Math.min(fadeIn, fadeOut);

  return <Audio src={resolved} volume={currentVolume} loop />;
};
