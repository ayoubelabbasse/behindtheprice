import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadNewsreader} from '@remotion/google-fonts/Newsreader';

const inter = loadInter('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const newsreader = loadNewsreader('normal', {
  weights: ['500', '600', '700'],
  subsets: ['latin'],
});

export const fonts = {
  sans: inter.fontFamily,
  serif: newsreader.fontFamily,
} as const;
