import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  description: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, description, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>최종 업데이트: {lastUpdated}</span>
            <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full" />
            <span>효력 발생일: {lastUpdated}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">법적 문서 바로가기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/privacy">개인정보처리방침</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/terms">이용약관</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/disclaimer">면책사항</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/cookies">쿠키 정책</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-slate max-w-none">
                {children}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-muted/30 rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-4">
              이 문서에 대한 질문이나 의견이 있으시면 언제든 연락주세요.
            </p>
            <Button variant="outline" asChild>
              <Link href="/contact">문의하기</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}