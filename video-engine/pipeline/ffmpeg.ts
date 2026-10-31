export const YOUTUBE_ENCODE = {
  codec: 'h264',
  pixelFormat: 'yuv420p',
  audioCodec: 'aac',
  audioBitrate: '320k',
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const loudnormFilter = 'loudnorm=I=-16:TP=-1.5:LRA=11';

export const youtubeScaleFilter = `scale=${YOUTUBE_ENCODE.width}:${YOUTUBE_ENCODE.height}:force_original_aspect_ratio=decrease,pad=${YOUTUBE_ENCODE.width}:${YOUTUBE_ENCODE.height}:(ow-iw)/2:(oh-ih)/2`;

export const buildNarrationNormalizeArgs = (inputPath: string, outputPath: string): string[] => {
  return ['-y', '-i', inputPath, '-af', loudnormFilter, '-c:a', 'aac', '-b:a', '192k', outputPath];
};

export const buildStillExtractArgs = (inputPath: string, outputPath: string, atSeconds = 1.5): string[] => {
  return ['-y', '-ss', String(atSeconds), '-i', inputPath, '-frames:v', '1', outputPath];
};
