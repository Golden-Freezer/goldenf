import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog-utils';
import { SITE_CONFIG, BLOG_CATEGORIES } from '@/lib/constants';
import { AdSenseAd } from '@/components/ads/adsense-ad';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Header Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl">📋</div>
              <span className="text-xl font-bold text-gray-900">골든에프</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/blog" className="text-blue-600 font-medium">
                전체 글
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                소개
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                문의
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            총무 업무 블로그
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            총무 담당자를 위한 실무 가이드, 법무 정보, 관리 노하우를 제공합니다
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">카테고리별 둘러보기</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              전체 ({allPosts.length})
            </Link>
            {BLOG_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                style={{ 
                  borderColor: `${category.color}40`,
                  color: category.color 
                }}
              >
                {category.icon} {category.name} ({category.postCount})
              </Link>
            ))}
          </div>
        </div>

        {/* Ad - Top of page */}
        <div className="mb-8">
          <AdSenseAd
            adSlot="BLOG_TOP"
            format="horizontal"
            className="mb-8"
          />
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              ⭐ 추천 글
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow border-amber-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge 
                        variant="secondary" 
                        style={{ 
                          backgroundColor: `${post.category.color}20`, 
                          color: post.category.color 
                        }}
                      >
                        {post.category.name}
                      </Badge>
                      <Badge variant="outline" className="text-amber-600 border-amber-600">
                        추천글
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>{post.author}</span>
                        <span>{formatDate(post.publishedAt, 'short')}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span>{post.readingTime}분</span>
                        <span>👁️ {post.views.toLocaleString()}</span>
                        <span>❤️ {post.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            전체 글 ({regularPosts.length})
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post, index) => (
              <div key={post.id}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge 
                        variant="secondary" 
                        style={{ 
                          backgroundColor: `${post.category.color}20`, 
                          color: post.category.color 
                        }}
                      >
                        {post.category.name}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>{post.author}</span>
                        <span>{formatDate(post.publishedAt, 'short')}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span>{post.readingTime}분</span>
                        <span>👁️ {post.views.toLocaleString()}</span>
                        <span>❤️ {post.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
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
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-100 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            총무 업무, 더 이상 혼자 고민하지 마세요!
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            골든에프 블로그에서 총무 업무에 필요한 모든 정보를 확인하고, 
            효율적인 업무 환경을 만들어보세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              문의하기
            </Link>
            <Link
              href="/about"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              골든에프 소개
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 골든에프. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/privacy" className="text-sm hover:text-gray-900">개인정보처리방침</Link>
              <Link href="/terms" className="text-sm hover:text-gray-900">이용약관</Link>
              <Link href="/disclaimer" className="text-sm hover:text-gray-900">면책사항</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}