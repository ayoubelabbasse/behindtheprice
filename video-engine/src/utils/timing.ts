import type {Scene} from '../types/episode';
import {DEFAULT_FPS} from '../theme/tokens';

export const framesFromSeconds = (seconds: number, fps = DEFAULT_FPS): number => {
  return Math.round(seconds * fps);
};

export const secondsFromFrames = (frames: number, fps = DEFAULT_FPS): number => {
  return frames / fps;
};

export const durationFromScenes = (scenes: Scene[], fallbackFrames = DEFAULT_FPS): number => {
  if (scenes.length === 0) {
    return fallbackFrames;
  }

  return scenes.reduce((latest, scene) => {
    return Math.max(latest, scene.startFrame + scene.durationInFrames);
  }, 0);
};

export const isActiveAtFrame = (scene: Scene, frame: number): boolean => {
  return frame >= scene.startFrame && frame < scene.startFrame + scene.durationInFrames;
};
