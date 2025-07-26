import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedPosts } from '@/lib/blog-utils';
import { formatDate } from '@/lib/utils';

export default function BlogPostNotFound() {
  const featuredPosts = getFeaturedPosts().slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Header Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl">📋</div>
              <span className="text-xl font-bold text-gray-900">골든에프</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 404 Content */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">📝</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            게시물을 찾을 수 없습니다
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            요청하신 게시물이 존재하지 않거나 삭제되었을 수 있습니다.
            다른 유용한 총무 업무 정보를 확인해보세요.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              전체 글 보기
            </Link>
            <Link
              href="/"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              추천 글을 읽어보세요
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            카테고리별로 찾아보기
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/categories/hr-management"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">👥</div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">인사관리</h3>
                  <p className="text-sm text-gray-600">채용, 평가, 교육, 복리후생</p>
                </div>
              </div>
            </Link>
            
            <Link
              href="/categories/legal-affairs"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">⚖️</div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">법무/계약</h3>
                  <p className="text-sm text-gray-600">계약서 작성, 법무 검토</p>
                </div>
              </div>
            </Link>
            
            <Link
              href="/categories/facility-management"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🏢</div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">시설관리</h3>
                  <p className="text-sm text-gray-600">사무공간, 장비, 보안</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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