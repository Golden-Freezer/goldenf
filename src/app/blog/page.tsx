import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog-utils';
import { SITE_CONFIG, BLOG_CATEGORIES } from '@/lib/constants';
import { AdSenseAd } from '@/components/ads/adsense-ad';
import { MainLayout } from '@/components/layout/main-layout';
import { Clock, Eye, Heart, Star, BookOpen, Filter } from 'lucide-react';

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
        <section className="py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/30 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.05),transparent_50%)]"></div>
          
          <div className="container-minimal relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-8">
                <BookOpen className="w-4 h-4" />
                전체 글 {allPosts.length}개
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                총무 업무 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                  블로그
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                총무 담당자를 위한 실무 가이드, 법무 정보, 관리 노하우를 제공합니다
              </p>
            </div>
          </div>
        </section>

        <div className="container-minimal py-16">
          {/* Categories Filter */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Filter className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">카테고리별 둘러보기</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                전체 ({allPosts.length})
              </Link>
              {BLOG_CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-200 dark:hover:border-green-800 hover:text-green-700 dark:hover:text-green-300 transition-all duration-200"
                >
                  <span className="text-sm">{category.icon}</span>
                  {category.name} ({category.postCount})
                </Link>
              ))}
            </div>
          </div>

          {/* Ad - Top of page */}
          <div className="mb-16">
            <AdSenseAd
              adSlot="BLOG_TOP"
              format="horizontal"
              className="mb-8"
            />
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-12">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  추천 글
                </h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <span 
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ 
                          backgroundColor: post.category.color + '15', 
                          color: post.category.color 
                        }}
                      >
                        {post.category.icon} {post.category.name}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-lg text-xs font-semibold">
                        <Star className="w-3 h-3" />
                        추천
                      </span>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{post.author}</span>
                        <span>{formatDate(post.publishedAt, 'short')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          {post.readingTime}분
                        </span>
                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
              전체 글 ({regularPosts.length})
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post, index) => (
                <div key={post.id}>
                  <article className="group bg-white dark:bg-gray-800 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-2 mb-6">
                      <span 
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ 
                          backgroundColor: post.category.color + '15', 
                          color: post.category.color 
                        }}
                      >
                        {post.category.icon} {post.category.name}
                      </span>
                    </div>
                    
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{post.author}</span>
                        <span>{formatDate(post.publishedAt, 'short')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          {post.readingTime}분
                        </span>
                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          <Eye className="w-3 h-3" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                  
                  {/* Ad every 6 posts */}
                  {(index + 1) % 6 === 0 && (
                    <div className="mt-8">
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
          <section className="mt-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-3xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)] rounded-3xl"></div>
            
            <div className="relative p-12 lg:p-16 text-center text-white">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                총무 업무, 더 이상 혼자 고민하지 마세요!
              </h3>
              <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                골든에프 블로그에서 총무 업무에 필요한 모든 정보를 확인하고, 
                효율적인 업무 환경을 만들어보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  문의하기
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
                >
                  골든에프 소개
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}