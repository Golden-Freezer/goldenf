import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { ContactForm } from '@/components/contact/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '문의',
  description: '골든에프 총무블로그에 문의사항이 있으시면 언제든 연락주세요.',
  openGraph: {
    title: '문의 | 골든에프 총무블로그',
    description: '궁금한 점이나 제안사항이 있으시면 언제든 문의해주세요.',
    url: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            문의하기
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            궁금한 점이나 제안사항, 협업 문의 등 언제든 연락주세요. 
            빠른 시일 내에 답변드리겠습니다.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">연락처 정보</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-lg">✉️</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">이메일</CardTitle>
                        <CardDescription>일반 문의 및 제안사항</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={`mailto:${SITE_CONFIG.author.email}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {SITE_CONFIG.author.email}
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-lg">🕒</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">응답 시간</CardTitle>
                        <CardDescription>평균 응답 소요시간</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">평일 기준 24시간 이내</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      주말 및 공휴일에는 응답이 지연될 수 있습니다.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-lg">🌐</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">웹사이트</CardTitle>
                        <CardDescription>공식 웹사이트</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={SITE_CONFIG.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      {SITE_CONFIG.url}
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">자주 묻는 질문</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">블로그 글 제안이나 기고는 어떻게 하나요?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      총무 업무와 관련된 전문 콘텐츠나 경험담을 공유하고 싶으시다면 
                      이메일로 연락주세요. 검토 후 게시 여부를 안내드립니다.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">특정 주제에 대한 글 요청이 가능한가요?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      네, 가능합니다. 필요한 총무 업무 관련 주제가 있으시면 
                      문의를 통해 요청해주세요. 전문성을 바탕으로 관련 콘텐츠를 제작해드립니다.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">협업이나 파트너십은 어떻게 진행하나요?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      총무 업무와 관련된 서비스나 제품을 제공하는 업체라면 
                      협업 가능성을 검토해보겠습니다. 구체적인 제안서와 함께 연락주세요.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">개인정보는 어떻게 처리되나요?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      문의를 통해 수집된 개인정보는 문의 응답 목적으로만 사용되며, 
                      관련 법령에 따라 안전하게 보호됩니다. 자세한 내용은 개인정보처리방침을 참고해주세요.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">문의 양식</h2>
            <Card>
              <CardContent className="p-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Business Hours */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">운영 안내</h2>
              <p className="text-muted-foreground">
                더 나은 서비스 제공을 위해 노력하고 있습니다
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🕒</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">빠른 응답</h3>
                <p className="text-sm text-muted-foreground">
                  평일 기준 24시간 이내 답변 보장
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">친절한 상담</h3>
                <p className="text-sm text-muted-foreground">
                  전문성을 바탕으로 한 정확한 안내
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">정보 보호</h3>
                <p className="text-sm text-muted-foreground">
                  개인정보 보호법에 따른 안전한 처리
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}