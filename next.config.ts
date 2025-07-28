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
    // Memory optimization
    workerThreads: false,
  },

  // External packages for server components
  serverExternalPackages: ['sharp', 'canvas'],

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
    // ALWAYS disable webpack cache to prevent large cache files (both client and server)
    config.cache = false;
    
    // Optimize bundle size and prevent cache issues for production builds
    if (!dev) {
      // Configure chunk splitting for both client and server
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 15000000, // Reduced to 15MB limit for individual chunks
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
      
      // Prevent large modules from being included
      config.optimization.concatenateModules = true;
      
      // Memory management
      config.optimization.nodeEnv = 'production';
    }

    // Force garbage collection and memory cleanup
    if (isServer) {
      config.target = 'node';
      config.externals = config.externals || [];
    }

    return config;
  },

  // Additional Cloudflare Pages optimization
  
  // Generate consistent build ID
  async generateBuildId() {
    return 'goldenf-blog-build'
  },

  // Strict output file size limits for Cloudflare Pages
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Memory and performance optimization
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Static export temporarily disabled for admin functionality
  // output: 'export',

  // Custom page extensions to identify admin routes
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;