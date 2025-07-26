import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: '쿠키 정책',
  description: '골든에프 총무블로그의 쿠키 사용 정책에 대해 안내합니다.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="쿠키 정책"
      lastUpdated="2024년 1월 1일"
      description="골든에프 총무블로그에서 사용하는 쿠키에 대한 상세한 정보를 제공합니다."
    >
      <div className="space-y-8">
        {/* 쿠키란 무엇인가 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">쿠키란 무엇인가요?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              쿠키(Cookie)는 웹사이트를 방문할 때 사용자의 컴퓨터나 모바일 기기에 저장되는 작은 텍스트 파일입니다. 
              쿠키를 통해 웹사이트는 사용자의 방문을 기억하고, 사용자 경험을 향상시킬 수 있습니다.
            </p>
            <p>
              골든에프 총무블로그는 웹사이트 기능 제공, 사용자 경험 개선, 트래픽 분석, 맞춤형 광고 제공을 위해 쿠키를 사용합니다.
            </p>
          </div>
        </section>

        {/* 사용하는 쿠키의 종류 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">사용하는 쿠키의 종류</h2>
          <div className="space-y-6 text-muted-foreground">
            
            {/* 필수 쿠키 */}
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">1. 필수 쿠키</h3>
              <p className="mb-4">
                웹사이트의 기본 기능을 제공하기 위해 반드시 필요한 쿠키입니다. 
                이러한 쿠키는 비활성화할 수 없으며, 개인을 식별하는 정보는 저장하지 않습니다.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">주요 용도:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>세션 관리 (로그인 상태 유지)</li>
                  <li>보안 기능 (CSRF 공격 방지)</li>
                  <li>사용자 설정 저장 (언어, 테마 등)</li>
                  <li>장바구니 기능 (전자상거래)</li>
                </ul>
              </div>
            </div>

            {/* 분석 쿠키 */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">2. 분석 쿠키</h3>
              <p className="mb-4">
                웹사이트 사용 패턴을 분석하여 서비스를 개선하는 데 사용됩니다. 
                이 정보는 익명으로 수집되며 개인을 식별하지 않습니다.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">주요 서비스:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Google Analytics: 방문자 통계 및 행동 분석</li>
                  <li>Google Search Console: 검색 성능 분석</li>
                  <li>자체 분석 도구: 콘텐츠 성과 측정</li>
                </ul>
                <h4 className="font-semibold text-foreground mb-2 mt-4">수집하는 정보:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>페이지 조회수 및 방문 시간</li>
                  <li>트래픽 소스 (검색엔진, 직접 방문 등)</li>
                  <li>기기 정보 (브라우저, 운영체제, 화면 해상도)</li>
                  <li>지역 정보 (IP 주소 기반, 도시 수준)</li>
                </ul>
              </div>
            </div>

            {/* 마케팅 쿠키 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">3. 마케팅 쿠키</h3>
              <p className="mb-4">
                사용자의 관심사에 맞는 맞춤형 광고를 제공하는 데 사용됩니다. 
                사용자가 방문한 페이지를 기반으로 관련성 높은 광고를 표시합니다.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">주요 서비스:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Google AdSense: 맞춤형 광고 표시</li>
                  <li>Google Ads: 광고 성과 측정</li>
                  <li>Facebook Pixel: 소셜미디어 광고 최적화</li>
                </ul>
                <h4 className="font-semibold text-foreground mb-2 mt-4">수집하는 정보:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>방문한 페이지 및 콘텐츠</li>
                  <li>광고 클릭 및 전환 데이터</li>
                  <li>관심사 및 선호도 정보</li>
                  <li>기기 간 활동 연결</li>
                </ul>
              </div>
            </div>

            {/* 기능성 쿠키 */}
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">4. 기능성 쿠키</h3>
              <p className="mb-4">
                사용자 경험을 향상시키는 추가 기능을 제공하는 데 사용됩니다. 
                이러한 쿠키는 개인화된 기능을 제공하지만 개인을 식별하지는 않습니다.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">주요 기능:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>소셜미디어 공유 기능</li>
                  <li>댓글 시스템</li>
                  <li>라이브 채팅 지원</li>
                  <li>개인화된 콘텐츠 추천</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 쿠키 보존 기간 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">쿠키 보존 기간</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>쿠키는 유형에 따라 다른 보존 기간을 가집니다:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-3 text-left font-semibold text-foreground">쿠키 유형</th>
                    <th className="border border-border p-3 text-left font-semibold text-foreground">보존 기간</th>
                    <th className="border border-border p-3 text-left font-semibold text-foreground">설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3">세션 쿠키</td>
                    <td className="border border-border p-3">브라우저 세션 종료 시</td>
                    <td className="border border-border p-3">브라우저를 닫으면 자동 삭제</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">영구 쿠키</td>
                    <td className="border border-border p-3">1개월 ~ 2년</td>
                    <td className="border border-border p-3">설정된 만료일까지 유지</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">분석 쿠키</td>
                    <td className="border border-border p-3">최대 26개월</td>
                    <td className="border border-border p-3">Google Analytics 기본 설정</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">광고 쿠키</td>
                    <td className="border border-border p-3">최대 12개월</td>
                    <td className="border border-border p-3">광고 개인화를 위한 데이터</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 쿠키 관리 방법 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">쿠키 관리 방법</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>사용자는 다음과 같은 방법으로 쿠키를 관리할 수 있습니다:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">🔧 웹사이트 설정</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>쿠키 동의 배너에서 선택적 수락</li>
                  <li>웹사이트 설정 페이지에서 변경</li>
                  <li>언제든지 설정 수정 가능</li>
                </ul>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">🌐 브라우저 설정</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>브라우저 설정에서 쿠키 차단</li>
                  <li>개별 웹사이트별 설정</li>
                  <li>기존 쿠키 삭제</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">주요 브라우저별 쿠키 설정 방법:</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Chrome</h4>
                  <p className="text-sm">설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터</p>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Firefox</h4>
                  <p className="text-sm">설정 → 개인정보 및 보안 → 쿠키 및 사이트 데이터</p>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Safari</h4>
                  <p className="text-sm">Safari → 환경설정 → 개인정보 → 쿠키 및 웹사이트 데이터</p>
                </div>
                
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Edge</h4>
                  <p className="text-sm">설정 → 쿠키 및 사이트 권한 → 쿠키 및 저장된 데이터</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 제3자 쿠키 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제3자 쿠키</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              일부 쿠키는 제3자 서비스 제공업체에 의해 설정됩니다. 
              이러한 업체들은 자체 개인정보처리방침을 가지고 있으며, 
              해당 업체의 정책에 따라 데이터가 처리됩니다.
            </p>
            
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">주요 제3자 서비스:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Google (Analytics, AdSense, Ads):</strong>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                      Google 개인정보처리방침
                    </a>
                  </li>
                  <li>
                    <strong>Facebook (Meta Pixel):</strong>
                    <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                      Meta 개인정보처리방침
                    </a>
                  </li>
                  <li>
                    <strong>Cloudflare (CDN, 보안):</strong>
                    <a href="https://www.cloudflare.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                      Cloudflare 개인정보처리방침
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 쿠키 거부 시 영향 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">쿠키 거부 시 영향</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>쿠키를 거부하거나 삭제할 경우 다음과 같은 영향이 있을 수 있습니다:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2">제한되는 기능</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                  <li>로그인 상태 유지 불가</li>
                  <li>사용자 설정 저장 불가</li>
                  <li>맞춤형 콘텐츠 제공 불가</li>
                  <li>일부 대화형 기능 제한</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">여전히 가능한 기능</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>웹사이트 기본 탐색</li>
                  <li>콘텐츠 읽기</li>
                  <li>검색 기능 사용</li>
                  <li>파일 다운로드</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 쿠키 정책 변경 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">쿠키 정책 변경</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              본 쿠키 정책은 관련 법령의 변경, 서비스 정책의 변경, 보안 강화 등을 이유로 변경될 수 있습니다. 
              정책이 변경되는 경우 웹사이트에 공지하며, 중요한 변경사항에 대해서는 이메일 등을 통해 개별 통지할 수 있습니다.
            </p>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">정책 변경 시 절차:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>변경 내용 및 시행일자 공지 (최소 7일 전)</li>
                <li>주요 변경사항에 대한 개별 알림</li>
                <li>사용자 재동의 요청 (필요시)</li>
                <li>변경된 정책에 따른 쿠키 설정 업데이트</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 연락처 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">문의사항</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              쿠키 정책에 대한 질문이나 의견이 있으시면 언제든 연락주세요.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">연락처:</p>
              <ul className="space-y-1">
                <li>이메일: contact@goldenf.com</li>
                <li>웹사이트: <a href="/contact" className="text-primary hover:underline">문의 페이지</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}