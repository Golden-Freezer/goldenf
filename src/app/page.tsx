import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BLOG_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { samplePosts } from "@/data/sample-posts";
import { formatDate, formatNumber } from "@/lib/utils";
import { MainLayout } from "@/components/layout/main-layout";
import { 
  ArrowRight, 
  BookOpen, 
  Clock,
  Eye
} from "lucide-react";

export default function Home() {
  const featuredPosts = samplePosts.filter(post => post.featured).slice(0, 3);
  const recentPosts = samplePosts.slice(0, 6);

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container-minimal">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                총무업무의 모든 것을
                <br />
                <span className="text-blue-600 dark:text-blue-400">한 곳에서</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                총무 업무에 필요한 실무 가이드와 법무 정보를 제공하는 전문 블로그
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href="/blog">
                  <Button size="lg" className="btn-minimal btn-primary flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    전체 글 보기
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg" className="btn-minimal btn-secondary">
                    카테고리 탐색
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">전문 가이드</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">총무 담당자</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">만족도</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/30">
          <div className="container-minimal">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                추천 글
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                총무 업무에 꼭 필요한 핵심 가이드
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <article key={post.id} className="card-minimal p-6 h-full">
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
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                      {post.readingTime}분 읽기
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatNumber(post.views)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 lg:py-20">
          <div className="container-minimal">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                카테고리별 탐색
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                업무 영역별로 체계적으로 정리된 가이드
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_CATEGORIES.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <div className="card-minimal p-6 h-full group">
                    <div className="flex items-start gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                        style={{ backgroundColor: category.color + '15' }}
                      >
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatNumber(category.postCount)}개 글
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                      카테고리 보기
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/30">
          <div className="container-minimal">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                최신 글
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                가장 최근에 업데이트된 콘텐츠
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <article key={post.id} className="card-minimal p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                      style={{ 
                        backgroundColor: post.category.color + '15', 
                        color: post.category.color 
                      }}
                    >
                      {post.category.icon} {post.category.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      <Eye className="w-3 h-3 inline mr-1" />
                      {formatNumber(post.views)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}분
                    </span>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button size="lg" className="btn-minimal btn-primary flex items-center gap-2">
                  모든 글 보기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 lg:py-20">
          <div className="container-minimal">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                새로운 가이드를 놓치지 마세요
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                실무진의 경험과 전문성을 바탕으로 한 실용적인 가이드를 정기적으로 받아보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/about">
                  <Button size="lg" className="btn-minimal btn-primary">
                    더 알아보기
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="btn-minimal btn-secondary">
                    문의하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}