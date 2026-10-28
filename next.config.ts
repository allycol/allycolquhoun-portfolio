import type { NextConfig } from 'next';

// Old Adobe Portfolio URLs, so links already shared in job applications keep working.
const OLD_SLUGS = [
  'zettle', 'comoditi', 'livesign', 'kester-james', 'mercho-pod', 'selz', 'qantas', 'frollo',
  'fame-partners', 'vodafone', 'carryology', 'kmart', 'outdoorkit', 'perfect-lights', 'maxcap',
  'mont', 'pinos-dolce-vita',
];

const nextConfig: NextConfig = {
  // Images are pre-optimised to WebP by scripts/scrape.mjs, so skip the
  // runtime optimiser (one less moving part on GoDaddy).
  images: { unoptimized: true },
  // GoDaddy's Preview environment proxies through *.airoapp.ai.
  allowedDevOrigins: ['*.airoapp.ai'],
  async redirects() {
    return [
      ...OLD_SLUGS.map((s) => ({ source: `/${s}`, destination: `/work/${s}`, permanent: true })),
      { source: '/copy-of-zettle', destination: '/work/galilee', permanent: true },
      { source: '/agencies', destination: '/about', permanent: true },
    ];
  },
};

export default nextConfig;
