const BACKEND_URL =
  process.env.BACKEND_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://multify-backend.vercel.app');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${BACKEND_URL}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

