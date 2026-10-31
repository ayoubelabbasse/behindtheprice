export const YOUTUBE_WIDTH = 1920;
export const YOUTUBE_HEIGHT = 1080;
export const DEFAULT_FPS = 30;

export const colors = {
  ink: '#090C0B',
  inkLift: '#111714',
  paper: '#F4F5F0',
  paperMuted: '#B7BDB7',

  // Brand accent. Existing components use the legacy "gold" key;
  // keep the key stable while aligning the visual system with the
  // Behind the Price black / off-white / electric-green identity.
  gold: '#16F28B',
  goldSoft: '#8BFFC0',

  // Semantic emphasis / warning colors.
  crimson: '#FF5E63',
  sage: '#77B98B',

  line: 'rgba(244, 245, 240, 0.14)',
  dim: 'rgba(9, 12, 11, 0.60)',
} as const;

export const spacing = {
  frame: 72,
  stack: 28,
} as const;

export const radii = {
  card: 18,
  pill: 999,
} as const;

export const motion = {
  enterDamping: 16,
  enterMass: 0.7,
  numberDamping: 18,
} as const;

export const brand = {
  name: 'Behind the Price',
  mark: 'BEHIND THE PRICE',
} as const;
