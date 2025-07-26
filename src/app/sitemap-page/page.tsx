import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BLOG_CATEGORIES, NAVIGATION_MENU, SITE_CONFIG } from '@/lib/constants';
import { getAllPosts, getCategoryBySlug } from '@/lib/blog-utils';
import { formatDate } from '@/lib/utils';
import { 
  Home, 
  BookOpen, 
  FolderOpen, 
  User, 
  Mail, 
  FileText,
  Calendar,
  ExternalLink
} from 'lucide-react';

export const metadata = {
  title: '사이트맵 | 골든에프 총무블로그',
  description: '골든에프 총무블로그의 모든 페이지와 콘텐츠를 한눈에 확인할 수 있는 사이트맵입니다.',
};

export default function SitemapPage() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 10);

  return (
    <MainLayout>
      <div className="min-h-screen py-20">
        <div className="container-modern">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              사이트맵
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              골든에프 총무블로그의 모든 페이지와 콘텐츠를 한눈에 확인하세요.
              <br className="hidden md:inline" />
              찾으시는 정보가 있다면 아래 링크를 이용해주세요.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Pages */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  주요 페이지
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {NAVIGATION_MENU.map((item) => (
                  <div key={item.href}>
                    {item.children ? (
                      <div>
                        <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white mb-2">
                          <FolderOpen className="w-4 h-4" />
                          {item.label}
                        </div>
                        <div className="pl-6 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                            >
                              <FileText className="w-3 h-3" />
                              {child.label}
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        {item.label === '홈' && <Home className="w-4 h-4" />}
                        {item.label === '전체 글' && <BookOpen className="w-4 h-4" />}
                        {item.label === '소개' && <User className="w-4 h-4" />}
                        {item.label === '문의' && <Mail className="w-4 h-4" />}
                        {item.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Additional Pages */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
                  <div className="space-y-2">
                    <Link
                      href="/search"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                    >
                      <FileText className="w-4 h-4" />
                      검색
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link
                      href="/sitemap-page"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                    >
                      <FileText className="w-4 h-4" />
                      사이트맵
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FolderOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  카테고리별 페이지
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link
                  href="/categories"
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4" />
                    <span className="font-medium">전체 카테고리</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                {BLOG_CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                        style={{ backgroundColor: category.color + '15' }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {category.postCount}개 글
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card className="card-modern lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                  최신 글 ({recentPosts.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: post.category.color + '15',
                              color: post.category.color
                            }}
                            className="text-xs"
                          >
                            {post.category.name}
                          </Badge>
                          {post.featured && (
                            <Badge variant="outline" className="text-xs text-amber-600 border-amber-600">
                              추천
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.publishedAt, 'short')}
                          <span>•</span>
                          <span>{post.readingTime}분 읽기</span>
                        </div>
                      </div>
                      
                      <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    전체 글 보기 ({allPosts.length}개)
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Legal Pages */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  법적 고지 및 정책
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { href: '/privacy', label: '개인정보처리방침' },
                  { href: '/terms', label: '이용약관' },
                  { href: '/disclaimer', label: '면책사항' },
                  { href: '/cookies', label: '쿠키 정책' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Site Info */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  사이트 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {SITE_CONFIG.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {SITE_CONFIG.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">전체 글</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {allPosts.length}개
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">카테고리</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {BLOG_CATEGORIES.length}개
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              찾으시는 정보가 없나요?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              원하시는 콘텐츠를 찾을 수 없다면 검색 기능을 이용하시거나 직접 문의해주세요.
              더 나은 서비스를 위해 지속적으로 노력하겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="btn-modern btn-primary px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                검색하기
              </Link>
              <Link
                href="/contact"
                className="btn-modern btn-secondary px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}