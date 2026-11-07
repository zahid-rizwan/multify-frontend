/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://multify-backend.vercel.app/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'https://multify-backend.vercel.app/uploads/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

