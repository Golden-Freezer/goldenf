// Site configuration
export const SITE_CONFIG = {
  name: "GoldenF's BLOG",
  title: '총무 업무 가이드 | GoldenF\'s BLOG',
  description: '총무 업무에 필요한 실무 가이드, 법무 정보, 인사 관리 노하우를 제공하는 전문 블로그입니다. 총무 담당자를 위한 실용적인 정보와 최신 동향을 확인하세요.',
  url: 'https://goldenf.pages.dev',
  ogImage: '/og-image.jpg',
  author: {
    name: 'GoldenF',
    email: 'contact@goldenf.com',
    twitter: '@goldenf_blog',
  },
  keywords: [
    '총무',
    '총무업무',
    '인사관리',
    '사무관리',
    '법무',
    '계약관리',
    '시설관리',
    '보안관리',
    '예산관리',
    '총무 가이드',
    '업무 매뉴얼',
    '오피스 관리',
  ],
};

// Blog categories
export const BLOG_CATEGORIES = [
  {
    id: 'hr-management',
    name: '인사관리',
    slug: 'hr-management',
    description: '채용, 평가, 교육, 복리후생 등 인사 업무 전반',
    color: '#3b82f6',
    icon: '👥',
    postCount: 15,
  },
  {
    id: 'legal-affairs',
    name: '법무/계약',
    slug: 'legal-affairs', 
    description: '계약서 작성, 법무 검토, 규정 관리',
    color: '#10b981',
    icon: '⚖️',
    postCount: 12,
  },
  {
    id: 'facility-management',
    name: '시설관리',
    slug: 'facility-management',
    description: '사무공간, 장비, 보안 시설 관리',
    color: '#f59e0b',
    icon: '🏢',
    postCount: 8,
  },
  {
    id: 'budget-finance',
    name: '예산/재무',
    slug: 'budget-finance',
    description: '예산 편성, 비용 관리, 재무 계획',
    color: '#8b5cf6',
    icon: '💰',
    postCount: 10,
  },
  {
    id: 'office-admin',
    name: '사무관리',
    slug: 'office-admin',
    description: '문서 관리, 업무 프로세스, 일반 사무',
    color: '#ef4444',
    icon: '📋',
    postCount: 18,
  },
  {
    id: 'compliance',
    name: '컴플라이언스',
    slug: 'compliance',
    description: '규정 준수, 감사 대응, 리스크 관리',
    color: '#06b6d4',
    icon: '🛡️',
    postCount: 6,
  },
] as const;

// Navigation menu
export const NAVIGATION_MENU = [
  {
    label: '홈',
    href: '/',
  },
  {
    label: '카테고리',
    href: '/categories',
    children: BLOG_CATEGORIES.map(cat => ({
      label: cat.name,
      href: `/categories/${cat.slug}`,
    })),
  },
  {
    label: '전체 글',
    href: '/blog',
  },
  {
    label: '소개',
    href: '/about',
  },
  {
    label: '문의',
    href: '/contact',
  },
] as const;

// Legal pages menu (for footer or legal section)
export const LEGAL_MENU = [
  {
    label: '개인정보처리방침',
    href: '/privacy',
  },
  {
    label: '이용약관',
    href: '/terms',
  },
  {
    label: '쿠키 정책',
    href: '/cookies',
  },
  {
    label: '면책사항',
    href: '/disclaimer',
  },
] as const;

// SEO and schema.org constants
export const SCHEMA_ORG = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  author: {
    '@type': 'Organization',
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.url,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.author.name,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}/logo.png`,
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// Regular expressions for validation
export const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  korean: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
} as const;

// Date formatting
export const DATE_FORMATS = {
  article: 'YYYY년 MM월 DD일',
  short: 'MM/DD',
  iso: 'YYYY-MM-DD',
} as const;

// Reading time calculation (words per minute)
export const READING_SPEED = {
  korean: 300, // Korean characters per minute
  english: 200, // English words per minute
} as const;

// Pagination
export const PAGINATION = {
  postsPerPage: 12,
  recentPosts: 5,
  relatedPosts: 3,
} as const;

// AdSense compliance settings
export const ADSENSE_CONFIG = {
  autoAds: true,
  adClient: process.env.NEXT_PUBLIC_ADSENSE_ID,
  adTest: process.env.NODE_ENV === 'development' ? 'on' : 'off',
  adFrequency: 3, // Show ads every N paragraphs in articles
  adTypes: {
    displayAd: true,
    inArticleAd: true,
    inFeedAd: true,
    matchedContent: true,
  },
} as const;

// Cookie consent categories
export const COOKIE_CATEGORIES = {
  necessary: {
    id: 'necessary',
    name: '필수 쿠키',
    description: '웹사이트 기본 기능을 위해 반드시 필요한 쿠키입니다.',
    required: true,
  },
  analytics: {
    id: 'analytics',
    name: '분석 쿠키',
    description: '웹사이트 사용 패턴을 분석하여 서비스를 개선하는 데 사용됩니다.',
    required: false,
  },
  marketing: {
    id: 'marketing',
    name: '마케팅 쿠키',
    description: '사용자의 관심사에 맞는 맞춤형 광고를 제공하는 데 사용됩니다.',
    required: false,
  },
  functional: {
    id: 'functional',
    name: '기능성 쿠키',
    description: '사용자 경험을 향상시키는 추가 기능을 제공하는 데 사용됩니다.',
    required: false,
  },
} as const;