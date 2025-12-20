/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@react-pdf/renderer'],
  async redirects() {
    return [
      // Old Mypen routes → Home
      {
        source: '/chat',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/models',
        destination: '/',
        permanent: true,
      },
      {
        source: '/models/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/mypen-ultra',
        destination: '/',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pricing-plan',
        destination: '/',
        permanent: true,
      },
      {
        source: '/checkout/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/check',
        destination: '/',
        permanent: true,
      },
      {
        source: '/translate',
        destination: '/',
        permanent: true,
      },
      {
        source: '/write',
        destination: '/',
        permanent: true,
      },
      {
        source: '/templates/:path*',
        destination: '/',
        permanent: true,
      },
      // Old seminar URLs → New seminar pages
      {
        source: '/system-constellation-reatreat',
        destination: '/seminars/system-constellation-retreat',
        permanent: true,
      },
      {
        source: '/system-constellation-retreat',
        destination: '/seminars/system-constellation-retreat',
        permanent: true,
      },
      {
        source: '/nugzar-dzidziguri-workshop',
        destination: '/seminars/nugzar-dzidziguri-workshop',
        permanent: true,
      },
      {
        source: '/consciousness',
        destination: '/seminars/consciousness',
        permanent: true,
      },
      // Old psychology blog URLs → New blog URLs (SEO preservation)
      {
        source: '/psychology/:slug',
        destination: '/blog/:slug',
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'kp-ge.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
