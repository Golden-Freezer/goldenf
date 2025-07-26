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
  Users, 
  TrendingUp, 
  Award,
  Sparkles,
  Clock,
  Eye,
  Heart
} from "lucide-react";

export default function Home() {
  const featuredPosts = samplePosts.filter(post => post.featured).slice(0, 3);
  const recentPosts = samplePosts.slice(0, 6);

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="container-modern relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
                <Sparkles className="w-4 h-4" />
                총무 전문가들이 인정하는 실무 가이드
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {SITE_CONFIG.name.split(' ')[0]}
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  {SITE_CONFIG.name.split(' ')[1]}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                총무 업무에 필요한 실무 가이드와 법무 정보를 제공하는
                <br className="hidden md:inline" />
                <span className="font-semibold text-gray-900 dark:text-white">대한민국 최고의 전문 블로그</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Button asChild size="lg" className="btn-modern btn-primary px-8 py-4 text-lg">
                  <Link href="/blog" className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    전체 글 보기
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="btn-modern btn-secondary px-8 py-4 text-lg">
                  <Link href="/categories" className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    카테고리 탐색
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">전문 가이드</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">총무 담당자</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">만족도</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-20 lg:py-24">
          <div className="container-modern">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                추천 글
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                총무 업무에 꼭 필요한 핵심 가이드
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                실무 경험이 풍부한 전문가들이 엄선한 필수 콘텐츠를 확인하세요
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card-modern p-6 h-full group cursor-pointer">
                    <div className="flex items-start gap-3 mb-4">
                      <span 
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: post.category.color + '15', 
                          color: post.category.color 
                        }}
                      >
                        {post.category.icon} {post.category.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 ml-auto">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}분
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span>{formatDate(post.publishedAt)}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {formatNumber(post.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-modern">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                카테고리
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                분야별 전문 콘텐츠
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                업무 영역별로 체계적으로 정리된 실무 가이드를 확인하세요
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_CATEGORIES.map((category, index) => (
                <div key={category.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link href={`/categories/${category.slug}`}>
                    <div className="card-modern p-6 h-full group cursor-pointer hover:scale-105 transition-all duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow"
                          style={{ backgroundColor: category.color + '15' }}
                        >
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-20 lg:py-24">
          <div className="container-modern">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
                <Clock className="w-4 h-4" />
                최신 글
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                가장 최근에 업데이트된 콘텐츠
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                실시간으로 업데이트되는 최신 총무 업무 정보와 트렌드를 놓치지 마세요
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card-modern p-6 h-full group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <span 
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: post.category.color + '15', 
                          color: post.category.color 
                        }}
                      >
                        {post.category.icon} {post.category.name}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {formatNumber(post.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span>{formatDate(post.publishedAt)}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}분 읽기
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" asChild className="btn-modern btn-primary px-8 py-4">
                <Link href="/blog" className="flex items-center gap-2">
                  모든 글 보기
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="container-modern relative z-10 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">
                총무 업무의 모든 것을
                <br className="hidden md:inline" />
                지금 시작하세요
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                실무진의 경험과 전문성을 바탕으로 한
                <br className="hidden md:inline" />
                실용적인 가이드와 최신 정보를 제공합니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Button size="lg" variant="secondary" asChild className="btn-modern px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/about" className="flex items-center gap-2">
                    더 알아보기
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="btn-modern px-8 py-4 text-lg border-white text-white hover:bg-white/10">
                  <Link href="/contact" className="flex items-center gap-2">
                    문의하기
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}