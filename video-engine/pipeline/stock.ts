export type StockProvider = 'pexels' | 'pixabay' | 'wikimedia';

export type StockSearchQuery = {
  query: string;
  kind?: 'video' | 'image';
  provider?: StockProvider;
};

export const STOCK_PROVIDERS: Record<
  StockProvider,
  {
    label: string;
    searchUrl: string;
    apiUrl: string;
    licenseNote: string;
  }
> = {
  pexels: {
    label: 'Pexels',
    searchUrl: 'https://www.pexels.com/search/videos/',
    apiUrl: 'https://api.pexels.com/videos/search',
    licenseNote: 'Pexels License. Attribution is not required but recommended.',
  },
  pixabay: {
    label: 'Pixabay',
    searchUrl: 'https://pixabay.com/videos/search/',
    apiUrl: 'https://pixabay.com/api/videos/',
    licenseNote: 'Pixabay Content License. Do not sell unaltered copies.',
  },
  wikimedia: {
    label: 'Wikimedia Commons',
    searchUrl: 'https://commons.wikimedia.org/w/index.php',
    apiUrl: 'https://commons.wikimedia.org/w/api.php',
    licenseNote: 'File-specific Creative Commons or public-domain licenses. Keep attribution.',
  },
};

export const stockSearchPage = ({
  query,
  kind = 'video',
  provider = 'pexels',
}: StockSearchQuery): string => {
  const encoded = encodeURIComponent(query);

  if (provider === 'pexels') {
    return kind === 'image'
      ? `https://www.pexels.com/search/${encoded}/`
      : `https://www.pexels.com/search/videos/${encoded}/`;
  }

  if (provider === 'pixabay') {
    return kind === 'image'
      ? `https://pixabay.com/images/search/${encoded}/`
      : `https://pixabay.com/videos/search/${encoded}/`;
  }

  return `https://commons.wikimedia.org/w/index.php?search=${encoded}&title=Special:MediaSearch&type=${kind === 'image' ? 'image' : 'video'}`;
};

export const requiredStockEnv = (provider: StockProvider): string[] => {
  if (provider === 'pexels') {
    return ['PEXELS_API_KEY'];
  }

  if (provider === 'pixabay') {
    return ['PIXABAY_API_KEY'];
  }

  return [];
};
