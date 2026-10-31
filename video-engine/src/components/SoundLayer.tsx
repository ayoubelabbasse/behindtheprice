import {Audio} from '@remotion/media';
import {staticFile} from 'remotion';
import type {SfxCue} from '../types/episode';

const resolveSrc = (src: string): string => {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  return staticFile(src);
};

export const SoundLayer: React.FC<{
  cues: SfxCue[];
}> = ({cues}) => {
  return (
    <>
      {cues.map((cue) => (
        <Audio
          key={`${cue.src}-${cue.startFrame}`}
          src={resolveSrc(cue.src)}
          from={cue.startFrame}
          volume={cue.volume ?? 0.35}
        />
      ))}
    </>
  );
};
