import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_CONFIG, BLOG_CATEGORIES } from '@/lib/constants';
import { getPostsByCategory } from '@/lib/blog-utils';
import { AdSenseAd } from '@/components/ads/adsense-ad';

export const metadata: Metadata = {
  title: '카테고리 | 골든에프 총무블로그',
  description: '총무 업무를 카테고리별로 체계적으로 정리한 가이드입니다. 인사관리, 법무, 시설관리, 예산관리 등 분야별 전문 정보를 확인하세요.',
  keywords: ['총무 카테고리', '업무 분류', '인사관리', '법무', '시설관리', '예산관리', '사무관리'],
  openGraph: {
    title: '카테고리 | 골든에프 총무블로그',
    description: '총무 업무를 카테고리별로 체계적으로 정리한 가이드입니다.',
    url: `${SITE_CONFIG.url}/categories`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/categories`,
  },
};

export default function CategoriesPage() {
  // Get actual post counts for each category
  const categoriesWithActualCounts = BLOG_CATEGORIES.map(category => ({
    ...category,
    actualPostCount: getPostsByCategory(category.id).length,
  }));

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
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                전체 글
              </Link>
              <Link href="/categories" className="text-blue-600 font-medium">
                카테고리
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
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            카테고리별 총무 가이드
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            총무 업무를 분야별로 체계적으로 정리했습니다. 필요한 정보를 쉽게 찾아보세요.
          </p>
        </div>

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">홈</Link>
          {' > '}
          <span className="text-gray-900">카테고리</span>
        </nav>

        {/* Ad - Top of page */}
        <div className="mb-8">
          <AdSenseAd
            adSlot="CATEGORIES_TOP"
            format="horizontal"
            className="mb-8"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categoriesWithActualCounts.map((category) => (
            <Card 
              key={category.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardContent className="p-6">
                <Link href={`/categories/${category.slug}`}>
                  {/* Category Icon */}
                  <div 
                    className="text-4xl mb-4 p-4 rounded-full inline-flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </div>
                  
                  {/* Category Info */}
                  <h3 
                    className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary"
                      style={{ 
                        backgroundColor: `${category.color}15`, 
                        color: category.color,
                        border: `1px solid ${category.color}30`
                      }}
                    >
                      {category.actualPostCount}개의 글
                    </Badge>
                    
                    <div className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                      자세히 보기 →
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Categories Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            인기 카테고리
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {categoriesWithActualCounts
              .sort((a, b) => b.actualPostCount - a.actualPostCount)
              .slice(0, 4)
              .map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="text-3xl p-3 rounded-full group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="font-semibold text-lg group-hover:text-blue-600 transition-colors"
                        style={{ color: category.color }}
                      >
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {category.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline"
                          style={{ 
                            borderColor: category.color,
                            color: category.color 
                          }}
                        >
                          {category.actualPostCount}개의 글
                        </Badge>
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                      →
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Ad - Middle of page */}
        <div className="my-12">
          <AdSenseAd
            adSlot="CATEGORIES_MIDDLE"
            format="horizontal"
            className="my-12"
          />
        </div>

        {/* Help Section */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-100 p-8 text-center">
            <div className="text-4xl mb-4">❓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              찾으시는 정보가 없나요?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              궁금한 총무 업무나 추가로 필요한 가이드가 있으시면 언제든 문의해주세요. 
              더 나은 콘텐츠로 보답하겠습니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                문의하기
              </Link>
              <Link
                href="/blog"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                전체 글 보기
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            빠른 링크
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm"
            >
              📝 전체 글
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm"
            >
              ℹ️ 소개
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm"
            >
              💬 문의
            </Link>
          </div>
        </section>
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