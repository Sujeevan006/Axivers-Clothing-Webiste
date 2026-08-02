/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Enable AVIF and WebP auto-conversion for optimal bandwidth and Core Web Vitals
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Strictly target Firebase Cloud Storage buckets for axivers-clothing-65138
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/axivers-clothing-65138.firebasestorage.app/o/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/axivers-clothing-65138.appspot.com/o/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**',
      },
      {
        protocol: 'https',
        hostname: 'axivers-clothing-65138.firebasestorage.app',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
