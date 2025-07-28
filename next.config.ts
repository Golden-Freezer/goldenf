import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output configuration for Cloudflare Pages - temporarily disabled due to admin routes
  // output: 'export',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Turbopack configuration (stable)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Note: Headers and redirects are disabled for static export (Cloudflare Pages)
  // Configure these in Cloudflare Pages dashboard instead

  // Webpack configuration for optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
          },
        },
      };
    }

    return config;
  },

  // Additional Cloudflare Pages optimization
  
  // Generate consistent build ID
  async generateBuildId() {
    return 'goldenf-blog-build'
  },

  // Custom page extensions to identify admin routes
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;