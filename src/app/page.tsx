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
  Eye,
  Sparkles,
  TrendingUp
} from "lucide-react";

export default function Home() {
  const featuredPosts = samplePosts.filter(post => post.featured).slice(0, 3);
  const recentPosts = samplePosts.slice(0, 6);

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/30 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.05),transparent_50%)]"></div>
          
          <div className="container-minimal relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
                <Sparkles className="w-4 h-4" />
                총무 업무 전문 가이드
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-gray-900 dark:text-white leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                총무업무의 모든 것을
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                  한 곳에서
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                총무 업무에 필요한 실무 가이드와 법무 정보를 제공하는 전문 블로그
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Link href="/blog">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl">
                    <BookOpen className="w-5 h-5" />
                    전체 글 보기
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg" className="border-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 px-8 py-4 text-base font-semibold rounded-xl transition-all duration-300">
                    카테고리 탐색
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-center group">
                  <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">전문 가이드</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">총무 담당자</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">만족도</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-20 lg:py-24 bg-gradient-to-b from-green-50/30 to-white dark:from-gray-800/30 dark:to-gray-900">
          <div className="container-minimal">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                인기 콘텐츠
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                추천 글
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                총무 업무에 꼭 필요한 핵심 가이드를 선별했습니다
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
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
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {post.readingTime}분 읽기
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
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
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
        <section className="py-20 lg:py-24">
          <div className="container-minimal">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                카테고리별 탐색
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                업무 영역별로 체계적으로 정리된 전문 가이드를 만나보세요
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_CATEGORIES.map((category, index) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <div 
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm"
                        style={{ backgroundColor: category.color + '15' }}
                      >
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block">
                          {formatNumber(category.postCount)}개 글
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-semibold text-green-600 dark:text-green-400 group-hover:gap-3 transition-all duration-300">
                      카테고리 보기
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-20 lg:py-24 bg-gradient-to-b from-green-50/30 to-white dark:from-gray-800/30 dark:to-gray-900">
          <div className="container-minimal">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                최신 글
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                가장 최근에 업데이트된 총무 업무 가이드와 실무 팁
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span 
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ 
                        backgroundColor: post.category.color + '15', 
                        color: post.category.color 
                      }}
                    >
                      {post.category.icon} {post.category.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      <Eye className="w-3 h-3" />
                      {formatNumber(post.views)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}분
                    </span>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link href="/blog">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl">
                  모든 글 보기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          
          <div className="container-minimal relative">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                새로운 가이드를 놓치지 마세요
              </h2>
              <p className="text-xl text-green-100 mb-12 leading-relaxed">
                실무진의 경험과 전문성을 바탕으로 한 실용적인 가이드를 정기적으로 받아보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/about">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-base font-semibold rounded-xl">
                    더 알아보기
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-base font-semibold rounded-xl transition-all duration-300">
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