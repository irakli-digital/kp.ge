/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Legacy route
      {
        source: '/chat',
        destination: '/',
        permanent: true,
      },

      // ===========================================
      // 404 FIXES - Google Search Console Report
      // ===========================================

      // Deleted blog posts → Blog index
      {
        source: '/blog/save-tokens-on-mypen',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/unique-mypenge-prompts',
        destination: '/blog',
        permanent: true,
      },

      // Auth pages → chat.mypen.ge
      {
        source: '/register',
        destination: 'https://chat.mypen.ge/register',
        permanent: true,
        basePath: false,
      },
      {
        source: '/login',
        destination: 'https://chat.mypen.ge/login',
        permanent: true,
        basePath: false,
      },

      // Pricing pages → chat.mypen.ge
      {
        source: '/pricing',
        destination: 'https://chat.mypen.ge/#pricing',
        permanent: true,
        basePath: false,
      },
      {
        source: '/pricing-plan',
        destination: 'https://chat.mypen.ge/#pricing',
        permanent: true,
        basePath: false,
      },

      // Checkout pages → chat.mypen.ge
      {
        source: '/checkout/:path*',
        destination: 'https://chat.mypen.ge/checkout/:path*',
        permanent: true,
        basePath: false,
      },

      // Legacy tool pages → New tool pages
      {
        source: '/check',
        destination: '/tools/spellchecker',
        permanent: true,
      },
      {
        source: '/translate',
        destination: '/tools/translator',
        permanent: true,
      },
      {
        source: '/write',
        destination: '/models',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 400, 600, 800, 1200],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
