import type {Caption} from '@remotion/captions';
import {createTikTokStyleCaptions} from '@remotion/captions';
import type {CaptionLine} from '../types/episode';

export const toRemotionCaptions = (lines: CaptionLine[]): Caption[] => {
  return lines.map((line, index) => ({
    text: index === 0 ? line.text : ` ${line.text}`,
    startMs: line.startMs,
    endMs: line.endMs,
    timestampMs: Math.round((line.startMs + line.endMs) / 2),
    confidence: null,
  }));
};

export const paginateCaptions = (lines: CaptionLine[], windowMs = 1800) => {
  return createTikTokStyleCaptions({
    captions: toRemotionCaptions(lines),
    combineTokensWithinMilliseconds: windowMs,
  }).pages;
};
