import {z} from 'zod';

export const captionSchema = z.object({
  text: z.string(),
  startMs: z.number().nonnegative(),
  endMs: z.number().nonnegative(),
});

export const sfxCueSchema = z.object({
  src: z.string(),
  startFrame: z.number().int().nonnegative(),
  volume: z.number().min(0).max(1).optional(),
});

export const backgroundSchema = z.object({
  src: z.string().optional(),
  dim: z.number().min(0).max(1).optional(),
  kenBurns: z.boolean().optional(),
});

const sceneBase = {
  id: z.string().min(1),
  startFrame: z.number().int().nonnegative(),
  durationInFrames: z.number().int().positive(),
  background: backgroundSchema.optional(),
  captions: z.array(captionSchema).optional(),
  narrationSrc: z.string().optional(),
};

export const headlineSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('headline'),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
});

export const receiptItemSchema = z.object({
  label: z.string(),
  price: z.number(),
  emphasize: z.boolean().optional(),
});

export const receiptSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('receipt'),
  merchant: z.string(),
  date: z.string().optional(),
  items: z.array(receiptItemSchema),
  total: z.number(),
  currency: z.string().optional(),
});

export const priceTagSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('price-tag'),
  label: z.string(),
  amount: z.number(),
  compareAt: z.number().optional(),
  currency: z.string().optional(),
});

export const animatedNumberSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('animated-number'),
  value: z.number(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  label: z.string().optional(),
  decimals: z.number().int().min(0).max(4).optional(),
});

export const chartPointSchema = z.object({
  label: z.string(),
  value: z.number(),
  color: z.string().optional(),
});

export const chartSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('chart'),
  chartType: z.enum(['bar', 'line']),
  title: z.string().optional(),
  unit: z.string().optional(),
  series: z.array(chartPointSchema),
});

export const comparisonSideSchema = z.object({
  label: z.string(),
  value: z.number(),
  caption: z.string().optional(),
});

export const comparisonSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('comparison'),
  left: comparisonSideSchema,
  right: comparisonSideSchema,
  unit: z.string().optional(),
  format: z.enum(['currency', 'number', 'percent']).optional(),
});

export const timelineEventSchema = z.object({
  year: z.string(),
  label: z.string(),
  detail: z.string().optional(),
});

export const timelineSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('timeline'),
  title: z.string().optional(),
  events: z.array(timelineEventSchema),
});

export const sourceCardSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('source-card'),
  source: z.string(),
  detail: z.string().optional(),
  year: z.string().optional(),
  url: z.string().optional(),
});

export const bRollSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('b-roll'),
  src: z.string(),
  headline: z.string().optional(),
});

export const slateSceneSchema = z.object({
  ...sceneBase,
  kind: z.literal('slate'),
  title: z.string(),
  subtitle: z.string().optional(),
});

export const sceneSchema = z.discriminatedUnion('kind', [
  headlineSceneSchema,
  receiptSceneSchema,
  priceTagSceneSchema,
  animatedNumberSceneSchema,
  chartSceneSchema,
  comparisonSceneSchema,
  timelineSceneSchema,
  sourceCardSceneSchema,
  bRollSceneSchema,
  slateSceneSchema,
]);

export const episodeAudioSchema = z.object({
  narrationSrc: z.string().nullable(),
  musicSrc: z.string().nullable(),
  musicVolume: z.number().min(0).max(1).optional(),
  sfx: z.array(sfxCueSchema),
});

export const episodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  fps: z.number().int().positive(),
  width: z.literal(1920),
  height: z.literal(1080),
  audio: episodeAudioSchema,
  captions: z.array(captionSchema),
  scenes: z.array(sceneSchema),
});

export const episodeCompositionSchema = z.object({
  episode: episodeSchema,
});

export type CaptionLine = z.infer<typeof captionSchema>;
export type SfxCue = z.infer<typeof sfxCueSchema>;
export type Scene = z.infer<typeof sceneSchema>;
export type EpisodeManifest = z.infer<typeof episodeSchema>;
export type EpisodeCompositionProps = z.infer<typeof episodeCompositionSchema>;
