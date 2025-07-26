import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { READING_SPEED, REGEX } from './constants';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date for Korean locale
export function formatDate(date: string | Date, format?: string): string {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    });
  }
  
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
  const koreanChars = (content.match(REGEX.korean) || []).length;
  const englishWords = content
    .replace(REGEX.korean, '')
    .split(/\s+/)
    .filter(word => word.length > 0).length;
  
  const koreanTime = koreanChars / READING_SPEED.korean;
  const englishTime = englishWords / READING_SPEED.english;
  
  return Math.ceil(koreanTime + englishTime);
}

// Generate SEO-friendly slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Validate email
export function isValidEmail(email: string): boolean {
  return REGEX.email.test(email);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Extract excerpt from content
export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove HTML tags and markdown syntax
  const plainText = content
    .replace(/<[^>]*>/g, '') // HTML tags
    .replace(/[#*`_\[\]]/g, '') // Markdown syntax
    .replace(/\n+/g, ' ') // Line breaks
    .trim();
  
  return truncateText(plainText, maxLength);
}

// Format number with Korean locale
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${Math.floor(num / 10000)}만${num % 10000 > 0 ? ` ${Math.floor((num % 10000) / 1000)}천` : ''}`;
  }
  if (num >= 1000) {
    return `${Math.floor(num / 1000)}천${num % 1000 > 0 ? ` ${num % 1000}` : ''}`;
  }
  return num.toString();
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Get random items from array
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Check if device is mobile
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

// Scroll to element
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

// Generate structured data for blog posts
export function generateArticleStructuredData(post: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  url: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    url: post.url,
    image: post.imageUrl,
    publisher: {
      '@type': 'Organization',
      name: '골든에프',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
  };
}