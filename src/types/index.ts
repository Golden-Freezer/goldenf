// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: BlogCategory;
  featured: boolean;
  readingTime: number;
  views: number;
  likes: number;
  seo: SEOMetadata;
}

// Category types
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
  postCount: number;
}

// SEO and metadata types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType: 'article' | 'website';
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
}

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
  external?: boolean;
}

// Search types
export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  publishedAt: string;
  relevanceScore: number;
}

// Common UI types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
}

// Analytics types
export interface PageView {
  url: string;
  title: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

// User preference types
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  language: 'ko' | 'en';
}