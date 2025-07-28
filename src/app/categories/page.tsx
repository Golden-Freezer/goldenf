import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BlogCategory } from '@/types';
import { getAllPosts } from '@/lib/blog-utils';
import { BLOG_CATEGORIES } from '@/lib/constants';
import { AdSenseAd } from '@/components/ads/adsense-ad';

export const metadata = {
  title: '카테고리 | GoldenF\'s BLOG',
  description: '총무 업무를 분야별로 체계적으로 정리한 카테고리 페이지입니다. 인사관리, 법무계약, 시설관리 등 다양한 총무 업무 정보를 확인하세요.',
};

export default function CategoriesPage() {
  const allPosts = getAllPosts();
  
  // Calculate actual post counts for each category
  const categoriesWithActualCounts = BLOG_CATEGORIES.map(category => {
    const postsInCategory = allPosts.filter(post => post.category.id === category.id);
    return {
      ...category,
      actualPostCount: postsInCategory.length,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
                  <div className="text-center">
                    {/* Category Icon */}
                    <div 
                      className="text-4xl mb-4 w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      {category.icon}
                    </div>
                    
                    {/* Category Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    {/* Category Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Post Count Badge */}
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="px-3 py-1"
                        style={{ 
                          backgroundColor: `${category.color}15`, 
                          color: category.color,
                          border: `1px solid ${category.color}30`
                        }}
                      >
                        {category.actualPostCount > 0 
                          ? `${category.actualPostCount}개의 글` 
                          : '준비 중'
                        }
                      </Badge>
                    </div>
                    
                    {/* View All Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span 
                        className="text-sm px-4 py-2 rounded-full border transition-all duration-300"
                        style={{ 
                          borderColor: category.color,
                          color: category.color 
                        }}
                      >
                        전체 글 보기 →
                      </span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            원하는 정보를 찾지 못하셨나요?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            골든에프에서는 총무 업무에 대한 더 많은 실무 정보와 가이드를 지속적으로 업데이트하고 있습니다. 
            궁금한 점이 있으시면 언제든 문의해주세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              문의하기
            </Link>
            <Link
              href="/blog"
              className="bg-white text-green-600 px-6 py-3 rounded-lg border border-green-600 hover:bg-green-50 transition-colors"
            >
              전체 글 보기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}