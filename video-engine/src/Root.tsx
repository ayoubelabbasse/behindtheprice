import type {FC} from 'react';
import {Composition} from 'remotion';
import {EpisodeComposition, calculateEpisodeMetadata} from './compositions/EpisodeComposition';
import {TestComposition} from './compositions/TestComposition';
import {episodeCompositionSchema} from './schemas/episode';
import {DEFAULT_FPS, YOUTUBE_HEIGHT, YOUTUBE_WIDTH} from './theme/tokens';
import {emptyEpisode} from './utils/episode';

export const Root: FC = () => {
  return (
    <>
      <Composition
        id="TestComposition"
        component={TestComposition}
        durationInFrames={300}
        fps={DEFAULT_FPS}
        width={YOUTUBE_WIDTH}
        height={YOUTUBE_HEIGHT}
      />
      <Composition
        id="Episode"
        component={EpisodeComposition}
        schema={episodeCompositionSchema}
        defaultProps={{
          episode: emptyEpisode(),
        }}
        calculateMetadata={calculateEpisodeMetadata}
        durationInFrames={DEFAULT_FPS}
        fps={DEFAULT_FPS}
        width={YOUTUBE_WIDTH}
        height={YOUTUBE_HEIGHT}
      />
    </>
  );
};
