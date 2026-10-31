import {Audio} from '@remotion/media';
import {staticFile} from 'remotion';

export const NarrationTrack: React.FC<{
  src: string;
  startFrame?: number;
  volume?: number;
}> = ({src, startFrame = 0, volume = 1}) => {
  const resolved = src.startsWith('http') ? src : staticFile(src);

  return <Audio src={resolved} from={startFrame} volume={volume} />;
};
