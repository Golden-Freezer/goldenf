import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG, BLOG_CATEGORIES } from '@/lib/constants';

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            골든에프 총무블로그 소개
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            총무 업무의 전문성과 실무 경험을 바탕으로 실용적인 가이드와 최신 정보를 제공하는 전문 블로그입니다
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">우리의 미션</h2>
              <div className="space-y-4 text-muted-foreground">
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
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">실무 중심</h3>
                    <p className="text-sm text-muted-foreground">현장에서 바로 사용할 수 있는 실용적 정보</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">전문성</h3>
                    <p className="text-sm text-muted-foreground">풍부한 경험과 전문 지식 기반</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">지속 업데이트</h3>
                    <p className="text-sm text-muted-foreground">변화하는 법규와 트렌드 반영</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Cover Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">다루는 주제</h2>
            <p className="text-muted-foreground">총무 업무의 모든 영역을 포괄하는 전문 콘텐츠</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_CATEGORIES.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {category.postCount}개 글
                    </span>
                    <Link href={`/categories/${category.slug}`}>
                      <Button variant="outline" size="sm">
                        보기
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">운영진 소개</h2>
            <p className="text-muted-foreground">총무 분야 전문가들이 함께 운영합니다</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👨‍💼</span>
                </div>
                <CardTitle className="text-2xl">{SITE_CONFIG.author.name}</CardTitle>
                <CardDescription className="text-lg">총무 업무 전문가 팀</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-muted-foreground max-w-2xl mx-auto">
                  <p>
                    다양한 기업에서 총무 업무를 담당한 경험이 풍부한 전문가들이 모여 
                    실무진의 시각에서 유용한 정보를 제공합니다.
                  </p>
                  <p>
                    대기업부터 중소기업까지 다양한 규모의 조직에서 쌓은 노하우를 바탕으로 
                    실제 업무에 도움이 되는 콘텐츠를 만들어갑니다.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">인사관리</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">법무</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">시설관리</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">예산관리</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">컴플라이언스</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">전문 콘텐츠</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-muted-foreground">주요 카테고리</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-muted-foreground">월간 방문자</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">언제든 접근</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">우리의 가치</h2>
            <p className="text-muted-foreground">골든에프 총무블로그가 추구하는 핵심 가치입니다</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <CardTitle>신뢰성</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  정확하고 검증된 정보만을 제공하여 독자들의 신뢰를 얻습니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <CardTitle>실용성</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  이론보다는 실무에서 바로 적용할 수 있는 실용적인 정보를 중시합니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <CardTitle>성장</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  총무 담당자들의 전문성 향상과 업무 효율성 개선을 지원합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              함께 성장하는 총무 커뮤니티
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              골든에프 총무블로그와 함께 전문성을 키우고 업무 효율성을 높여보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg">최신 글 보기</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">문의하기</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}