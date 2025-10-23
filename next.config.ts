import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

// Bundle analyzer configuration
if (process.env.ANALYZE === 'true') {
  const bundleAnalyzer = withBundleAnalyzer({
    enabled: true,
    openAnalyzer: true,
  });
  module.exports = bundleAnalyzer(nextConfig);
}

export default nextConfig;
