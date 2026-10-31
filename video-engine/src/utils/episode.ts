import {episodeSchema, type EpisodeManifest} from '../schemas/episode';
import {DEFAULT_FPS, YOUTUBE_HEIGHT, YOUTUBE_WIDTH} from '../theme/tokens';

export const emptyEpisode = (id = 'untitled', slug = 'untitled'): EpisodeManifest => {
  return {
    id,
    title: '',
    slug,
    fps: DEFAULT_FPS,
    width: YOUTUBE_WIDTH,
    height: YOUTUBE_HEIGHT,
    audio: {
      narrationSrc: null,
      musicSrc: null,
      musicVolume: 0.12,
      sfx: [],
    },
    captions: [],
    scenes: [],
  };
};

export const parseEpisode = (data: unknown): EpisodeManifest => {
  return episodeSchema.parse(data);
};
