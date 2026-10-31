import type {CalculateMetadataFunction} from 'remotion';
import {AbsoluteFill} from 'remotion';
import {BackgroundFootage, MusicBed, NarrationTrack, SoundLayer, Subtitles} from '../components';
import {BrandMark} from '../components/BrandMark';
import {Headline} from '../components/Headline';
import {episodeCompositionSchema, type EpisodeCompositionProps} from '../schemas/episode';
import {SceneRenderer} from '../scenes/SceneRenderer';
import {colors, spacing} from '../theme/tokens';
import {durationFromScenes} from '../utils/timing';

export const calculateEpisodeMetadata: CalculateMetadataFunction<EpisodeCompositionProps> = ({
  props,
}) => {
  const parsed = episodeCompositionSchema.parse(props);

  return {
    durationInFrames: durationFromScenes(parsed.episode.scenes, parsed.episode.fps),
    fps: parsed.episode.fps,
    width: parsed.episode.width,
    height: parsed.episode.height,
  };
};

export const EpisodeComposition: React.FC<EpisodeCompositionProps> = ({episode}) => {
  const empty = episode.scenes.length === 0;

  return (
    <AbsoluteFill style={{background: colors.ink}}>
      <BackgroundFootage />
      {empty ? (
        <AbsoluteFill
          style={{
            padding: spacing.frame,
            justifyContent: 'center',
            gap: 28,
          }}
        >
          <BrandMark />
          <Headline
            eyebrow={episode.id || 'Episode'}
            title={episode.title || 'No scenes yet'}
            subtitle="Add timed scenes to this episode plan to start production."
          />
        </AbsoluteFill>
      ) : (
        episode.scenes.map((scene) => <SceneRenderer key={scene.id} scene={scene} />)
      )}
      {episode.captions.length > 0 ? <Subtitles captions={episode.captions} /> : null}
      {episode.audio.narrationSrc ? <NarrationTrack src={episode.audio.narrationSrc} /> : null}
      {episode.audio.musicSrc ? (
        <MusicBed src={episode.audio.musicSrc} volume={episode.audio.musicVolume} />
      ) : null}
      <SoundLayer cues={episode.audio.sfx} />
    </AbsoluteFill>
  );
};
