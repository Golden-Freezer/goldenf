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
    
    // 정적 출력을 위한 기본 설정만 유지
    if (!dev && !isServer) {
      // 클라이언트 측에서만 최적화 적용
      config.optimization.minimize = true;
    }

    // Cloudflare Pages 호환성을 위한 설정
    if (isServer) {
      // Next.js 내부 Pages Router 관련 처리 방지
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias['next/document'] = false;
      config.resolve.alias['next/app'] = false;
      
      // 불필요한 서버 코드 제외
      config.externals = config.externals || [];
      if (typeof config.externals === 'object' && !Array.isArray(config.externals)) {
        config.externals = [config.externals];
      }
      
      config.externals.push(
        'next/document',
        '@next/document'
      );
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
};

export default nextConfig;