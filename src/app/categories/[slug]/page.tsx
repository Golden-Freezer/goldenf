import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost, BlogCategory } from '@/types';
import { formatDate } from '@/lib/utils';
import { getCategoryBySlug, getPostsByCategory, getAllPosts } from '@/lib/blog-utils';
import { SITE_CONFIG, BLOG_CATEGORIES } from '@/lib/constants';
import { AdSenseAd } from '@/components/ads/adsense-ad';

interface CategoryPageProps {
  params: { slug: string };
}

// Generate static params for all categories
export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}


// Generate metadata for the category page
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: '카테고리를 찾을 수 없습니다',
      description: '요청하신 카테고리를 찾을 수 없습니다.',
    };
  }

  const url = `${SITE_CONFIG.url}/categories/${category.slug}`;

  return {
    title: `${category.name} | 골든에프 총무블로그`,
    description: `${category.description}에 관한 실무 가이드와 정보를 확인하세요. 총무 담당자를 위한 전문적인 ${category.name} 콘텐츠를 제공합니다.`,
    keywords: [category.name, '총무', '업무 가이드', ...SITE_CONFIG.keywords],
    openGraph: {
      title: `${category.name} | 골든에프 총무블로그`,
      description: `${category.description}에 관한 실무 가이드와 정보를 확인하세요.`,
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(category.id);
  const allPosts = getAllPosts();
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">홈</Link>
          {' > '}
          <Link href="/blog" className="hover:text-gray-700">블로그</Link>
          {' > '}
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div 
              className="text-6xl p-4 rounded-full"
              style={{ backgroundColor: `${category.color}20` }}
            >
              {category.icon}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {category.description}
          </p>
          <div className="flex justify-center">
            <Badge 
              variant="secondary" 
              className="text-lg px-4 py-2"
              style={{ 
                backgroundColor: `${category.color}20`, 
                color: category.color 
              }}
            >
              총 {posts.length}개의 글
            </Badge>
          </div>
        </div>

        {/* Other Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">다른 카테고리 둘러보기</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              전체 글 ({allPosts.length})
            </Link>
            {BLOG_CATEGORIES.filter(cat => cat.id !== category.id).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                style={{ 
                  borderColor: `${cat.color}40`,
                  color: cat.color 
                }}
              >
                {cat.icon} {cat.name} ({cat.postCount})
              </Link>
            ))}
          </div>
        </div>

        {/* Ad - Top of page */}
        <div className="mb-8">
          <AdSenseAd
            adSlot="CATEGORY_TOP"
            format="horizontal"
            className="mb-8"
          />
        </div>

        {posts.length === 0 ? (
          /* No Posts */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              아직 이 카테고리에 글이 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              곧 유용한 {category.name} 관련 정보를 업데이트할 예정입니다.
            </p>
            <Link
              href="/blog"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              다른 글 보기
            </Link>
          </div>
        ) : (
          <>
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
                              backgroundColor: `${category.color}20`, 
                              color: category.color 
                            }}
                          >
                            {category.name}
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
            {regularPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {category.name} 글 ({regularPosts.length})
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
                                backgroundColor: `${category.color}20`, 
                                color: category.color 
                              }}
                            >
                              {category.name}
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
                            adSlot="CATEGORY_FEED"
                            format="horizontal"
                            className="my-6"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-100 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {category.name} 업무가 더 궁금하신가요?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            골든에프에서 {category.name}에 관한 더 많은 실무 정보와 가이드를 제공합니다. 
            궁금한 점이 있으시면 언제든 문의해주세요.
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
      </main>
    </div>
  );
}