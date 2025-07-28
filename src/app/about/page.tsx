import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG, BLOG_CATEGORIES } from '@/lib/constants';
import { MainLayout } from '@/components/layout/main-layout';
import { Target, Book, RefreshCw, Users, Heart, TrendingUp, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: '소개',
  description: '골든에프 총무블로그에 대한 소개와 운영진 정보를 확인하세요.',
  openGraph: {
    title: '소개 | 골든에프 총무블로그',
    description: '총무 업무 전문가들이 운영하는 실무 중심의 블로그입니다.',
    url: `${SITE_CONFIG.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/30 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.05),transparent_50%)]"></div>
          
          <div className="container-minimal relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-8">
                <Heart className="w-4 h-4" />
                About GoldenF's BLOG
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                골든에프 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                  총무블로그
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                총무 업무의 전문성과 실무 경험을 바탕으로 실용적인 가이드와 최신 정보를 제공하는 전문 블로그입니다
              </p>
            </div>
          </div>
        </section>

        <div className="container-minimal py-16">
          {/* Mission Section */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">우리의 미션</h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  <p>
                    총무 업무는 기업 운영의 핵심이지만, 체계적인 정보를 찾기 어려운 분야입니다. 
                    골든에프 총무블로그는 이러한 정보 부족 문제를 해결하고자 시작되었습니다.
                  </p>
                  <p>
                    실무진의 생생한 경험과 전문 지식을 바탕으로, 총무 담당자들이 실제 업무에서 
                    바로 활용할 수 있는 실용적인 정보를 제공합니다.
                  </p>
                  <p>
                    우리는 총무 업무의 전문성을 높이고, 업무 효율성을 개선하여 기업의 성장에 
                    기여하는 것을 목표로 합니다.
                  </p>
                </div>
              </div>
              
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-10 rounded-3xl border border-green-100 dark:border-green-800">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                        <Target className="w-7 h-7 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">실무 중심</h3>
                        <p className="text-gray-600 dark:text-gray-400">현장에서 바로 사용할 수 있는 실용적 정보</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                        <Book className="w-7 h-7 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">전문성</h3>
                        <p className="text-gray-600 dark:text-gray-400">풍부한 경험과 전문 지식 기반</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                        <RefreshCw className="w-7 h-7 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">지속 업데이트</h3>
                        <p className="text-gray-600 dark:text-gray-400">변화하는 법규와 트렌드 반영</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What We Cover Section */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">다루는 주제</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">총무 업무의 모든 영역을 포괄하는 전문 콘텐츠</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_CATEGORIES.map((category, index) => (
                <div 
                  key={category.id} 
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: category.color + '15' }}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {category.postCount}개 글
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <Link href={`/categories/${category.slug}`}>
                    <Button variant="outline" className="w-full border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20">
                      카테고리 보기
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">운영진 소개</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">총무 분야 전문가들이 함께 운영합니다</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-12 text-center border border-green-100 dark:border-green-800">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-8 flex items-center justify-center">
                  <Users className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{SITE_CONFIG.author.name}</h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">총무 업무 전문가 팀</p>
                
                <div className="space-y-6 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                  <p>
                    다양한 기업에서 총무 업무를 담당한 경험이 풍부한 전문가들이 모여 
                    실무진의 시각에서 유용한 정보를 제공합니다.
                  </p>
                  <p>
                    대기업부터 중소기업까지 다양한 규모의 조직에서 쌓은 노하우를 바탕으로 
                    실제 업무에 도움이 되는 콘텐츠를 만들어갑니다.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 mt-10">
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">인사관리</span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">법무</span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">시설관리</span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">예산관리</span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">컴플라이언스</span>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-24">
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-3xl p-12 lg:p-16 text-white">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="group">
                  <div className="text-4xl lg:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-green-100 text-lg">전문 콘텐츠</div>
                </div>
                <div className="group">
                  <div className="text-4xl lg:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">6</div>
                  <div className="text-green-100 text-lg">주요 카테고리</div>
                </div>
                <div className="group">
                  <div className="text-4xl lg:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">10K+</div>
                  <div className="text-green-100 text-lg">월간 방문자</div>
                </div>
                <div className="group">
                  <div className="text-4xl lg:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-green-100 text-lg">언제든 접근</div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">우리의 가치</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">골든에프 총무블로그가 추구하는 핵심 가치입니다</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">신뢰성</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  정확하고 검증된 정보만을 제공하여 독자들의 신뢰를 얻습니다.
                </p>
              </div>
              
              <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Target className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">실용성</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  이론보다는 실무에서 바로 적용할 수 있는 실용적인 정보를 중시합니다.
                </p>
              </div>
              
              <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">성장</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  총무 담당자들의 전문성 향상과 업무 효율성 개선을 지원합니다.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section>
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-3xl"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)] rounded-3xl"></div>
              
              <div className="relative p-12 lg:p-16 text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-8 flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  함께 성장하는 총무 커뮤니티
                </h2>
                <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                  골든에프 총무블로그와 함께 전문성을 키우고 업무 효율성을 높여보세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/blog">
                    <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-base font-semibold rounded-xl">
                      최신 글 보기
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
      </div>
    </MainLayout>
  );
}