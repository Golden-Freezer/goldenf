import { BlogPost, BlogCategory } from '@/types';
import { samplePosts } from '@/data/sample-posts';
import { BLOG_CATEGORIES, PAGINATION } from '@/lib/constants';
import { getRandomItems } from '@/lib/utils';

/**
 * Get all blog posts sorted by published date
 */
export function getAllPosts(): BlogPost[] {
  return [...samplePosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get a blog post by its slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return samplePosts.find((post) => post.slug === slug);
}

/**
 * Get posts by category ID
 */
export function getPostsByCategory(categoryId: string): BlogPost[] {
  return samplePosts
    .filter((post) => post.category.id === categoryId)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(): BlogPost[] {
  return samplePosts
    .filter((post) => post.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Get recent posts (excluding a specific post if provided)
 */
export function getRecentPosts(excludePostId?: string, limit: number = PAGINATION.recentPosts): BlogPost[] {
  return samplePosts
    .filter((post) => post.id !== excludePostId)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

/**
 * Get related posts based on category and tags
 */
export function getRelatedPosts(currentPost: BlogPost, limit: number = PAGINATION.relatedPosts): BlogPost[] {
  // First, try to get posts from the same category
  const sameCategoryPosts = samplePosts.filter(
    (post) => post.category.id === currentPost.category.id && post.id !== currentPost.id
  );

  // Calculate relevance score based on shared tags
  const postsWithScores = sameCategoryPosts.map((post) => {
    const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
    return {
      post,
      score: sharedTags.length,
    };
  });

  // Sort by relevance score (shared tags) and then by date
  postsWithScores.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score; // Higher score first
    }
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
  });

  let relatedPosts = postsWithScores.map((item) => item.post);

  // If we don't have enough posts from the same category, add posts from other categories
  if (relatedPosts.length < limit) {
    const otherPosts = samplePosts.filter(
      (post) => 
        post.category.id !== currentPost.category.id && 
        post.id !== currentPost.id &&
        !relatedPosts.some((relatedPost) => relatedPost.id === post.id)
    );

    // Add some randomness to other category posts
    const additionalPosts = getRandomItems(otherPosts, limit - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...additionalPosts];
  }

  return relatedPosts.slice(0, limit);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return samplePosts
    .filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  samplePosts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Search posts by title, excerpt, or content
 */
export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  
  return samplePosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category.name.toLowerCase().includes(lowercaseQuery)
    );
  }).sort((a, b) => {
    // Prioritize title matches
    const aTitleMatch = a.title.toLowerCase().includes(lowercaseQuery);
    const bTitleMatch = b.title.toLowerCase().includes(lowercaseQuery);
    
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    
    // Then sort by date
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

/**
 * Get post reading statistics
 */
export function getPostStats() {
  const totalPosts = samplePosts.length;
  const totalViews = samplePosts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = samplePosts.reduce((sum, post) => sum + post.likes, 0);
  const averageReadingTime = Math.round(
    samplePosts.reduce((sum, post) => sum + post.readingTime, 0) / totalPosts
  );

  const categoryStats = BLOG_CATEGORIES.map((category) => {
    const categoryPosts = getPostsByCategory(category.id);
    return {
      ...category,
      postCount: categoryPosts.length,
      totalViews: categoryPosts.reduce((sum, post) => sum + post.views, 0),
      totalLikes: categoryPosts.reduce((sum, post) => sum + post.likes, 0),
    };
  });

  return {
    totalPosts,
    totalViews,
    totalLikes,
    averageReadingTime,
    categoryStats,
  };
}

/**
 * Generate sitemap data for blog posts
 */
export function generateSitemapData() {
  return samplePosts.map((post) => ({
    url: `/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: post.featured ? 0.8 : 0.6,
  }));
}

/**
 * Generate RSS feed data
 */
export function generateRSSData() {
  return samplePosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((post) => ({
      title: post.title,
      description: post.excerpt,
      link: `/blog/${post.slug}`,
      author: post.author,
      pubDate: new Date(post.publishedAt),
      category: post.category.name,
      guid: post.id,
    }));
}

/**
 * Get popular posts (by views)
 */
export function getPopularPosts(limit: number = 5): BlogPost[] {
  return [...samplePosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

/**
 * Get posts with high engagement (views + likes)
 */
export function getHighEngagementPosts(limit: number = 5): BlogPost[] {
  return [...samplePosts]
    .sort((a, b) => (b.views + b.likes * 10) - (a.views + a.likes * 10))
    .slice(0, limit);
}