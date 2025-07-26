import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog-utils';
import { SITE_CONFIG, BLOG_CATEGORIES } from '@/lib/constants';
import { AdSenseAd } from '@/components/ads/adsense-ad';
import { MainLayout } from '@/components/layout/main-layout';
import { Clock, Eye, Heart, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: '전체 블로그 글 | 골든에프 총무블로그',
  description: '총무 업무에 필요한 모든 실무 가이드와 정보를 한 곳에서 확인하세요. 인사관리, 법무, 시설관리, 예산관리 등 다양한 총무 업무 정보를 제공합니다.',
  keywords: ['총무', '블로그', '업무 가이드', '실무 정보', '인사관리', '법무', '시설관리'],
  openGraph: {
    title: '전체 블로그 글 | 골든에프 총무블로그',
    description: '총무 업무에 필요한 모든 실무 가이드와 정보를 한 곳에서 확인하세요.',
    url: `${SITE_CONFIG.url}/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const regularPosts = allPosts.filter(post => !post.featured);

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/30">
          <div className="container-minimal">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                총무 업무 블로그
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                총무 담당자를 위한 실무 가이드, 법무 정보, 관리 노하우를 제공합니다
              </p>
            </div>
          </div>
        </section>

        <div className="container-minimal py-12">
          {/* Categories Filter */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">카테고리별 둘러보기</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="btn-minimal btn-primary"
              >
                전체 ({allPosts.length})
              </Link>
              {BLOG_CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="btn-minimal btn-secondary"
                >
                  {category.icon} {category.name} ({category.postCount})
                </Link>
              ))}
            </div>
          </div>

          {/* Ad - Top of page */}
          <div className="mb-12">
            <AdSenseAd
              adSlot="BLOG_TOP"
              format="horizontal"
              className="mb-8"
            />
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-2 mb-8">
                <Star className="w-5 h-5 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  추천 글
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="card-minimal p-6 h-full group">
                    <div className="flex items-center gap-2 mb-4">
                      <span 
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                        style={{ 
                          backgroundColor: post.category.color + '15', 
                          color: post.category.color 
                        }}
                      >
                        {post.category.icon} {post.category.name}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 rounded-md text-xs font-medium">
                        <Star className="w-3 h-3" />
                        추천
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <span>{post.author}</span>
                        <span>{formatDate(post.publishedAt, 'short')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime}분
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Regular Posts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              전체 글 ({regularPosts.length})
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post, index) => (
                <div key={post.id}>
                  <article className="card-minimal p-6 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span 
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                        style={{ 
                          backgroundColor: post.category.color + '15', 
                          color: post.category.color 
                        }}
                      >
                        {post.category.icon} {post.category.name}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <span>{post.author}</span>
                        <span>{formatDate(post.publishedAt, 'short')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime}분
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                  
                  {/* Ad every 6 posts */}
                  {(index + 1) % 6 === 0 && (
                    <div className="mt-6">
                      <AdSenseAd
                        adSlot="BLOG_FEED"
                        format="horizontal"
                        className="my-6"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mt-20 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              총무 업무, 더 이상 혼자 고민하지 마세요!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              골든에프 블로그에서 총무 업무에 필요한 모든 정보를 확인하고, 
              효율적인 업무 환경을 만들어보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-minimal btn-primary"
              >
                문의하기
              </Link>
              <Link
                href="/about"
                className="btn-minimal btn-secondary"
              >
                골든에프 소개
              </Link>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}