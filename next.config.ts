import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages를 위한 정적 출력 설정
  output: 'export',
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
    // Memory optimization
    workerThreads: false,
  },

  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Webpack configuration for optimization
  webpack: (config, { dev, isServer }) => {
    // ALWAYS disable webpack cache to prevent large cache files
    config.cache = false;
    
    // Optimize bundle size for production builds
    if (!dev) {
      // Configure chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 15000000, // 15MB limit for individual chunks
        minSize: 20000,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for third-party libraries
          vendor: {
            name: isServer ? 'vendor-server' : 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            maxSize: 15000000,
            priority: 20,
          },
          // Common chunk for shared code
          common: {
            name: isServer ? 'common-server' : 'common',
            minChunks: 2,
            chunks: 'all',
            maxSize: 10000000,
            priority: 10,
          },
          // React specific chunk
          react: {
            name: isServer ? 'react-server' : 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            maxSize: 5000000,
            priority: 30,
          },
        },
      };
      
      // Additional optimizations
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.minimize = true;
      config.optimization.concatenateModules = true;
      config.optimization.nodeEnv = 'production';
    }

    // Edge Runtime 호환성을 위한 설정
    if (isServer) {
      config.target = 'node';
      config.externals = config.externals || [];
    }

    return config;
  },

  // Generate consistent build ID for Cloudflare Pages
  async generateBuildId() {
    return 'goldenf-blog-build'
  },

  // Memory and performance optimization
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Custom page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Cloudflare Pages 특화 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

export default nextConfig;