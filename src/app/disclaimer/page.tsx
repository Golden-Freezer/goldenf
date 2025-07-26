import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: '면책사항',
  description: '골든에프 총무블로그의 콘텐츠 및 서비스 이용에 관한 면책사항을 안내합니다.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="면책사항"
      lastUpdated="2024년 1월 1일"
      description="골든에프 총무블로그의 콘텐츠와 서비스 이용에 관한 중요한 면책사항을 안내합니다."
    >
      <div className="space-y-8">
        {/* 일반 면책사항 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">일반 면책사항</h2>
          <div className="space-y-4 text-muted-foreground">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
              <p className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">⚠️ 중요 고지</p>
              <p className="text-yellow-700 dark:text-yellow-300">
                본 웹사이트의 모든 정보는 일반적인 참고 목적으로만 제공됩니다. 
                특정 상황에 대한 전문적인 조언이 필요한 경우 반드시 해당 분야의 전문가와 상담하시기 바랍니다.
              </p>
            </div>
            
            <p>
              골든에프 총무블로그("웹사이트")는 총무 업무와 관련된 정보, 가이드, 템플릿, 
              기타 자료("콘텐츠")를 제공합니다. 이러한 콘텐츠의 이용과 관련하여 
              다음과 같은 면책사항을 고지합니다.
            </p>
          </div>
        </section>

        {/* 정보의 정확성 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">정보의 정확성 및 완전성</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              웹사이트는 제공되는 정보의 정확성, 완전성, 신뢰성을 보장하지 않습니다. 
              모든 정보는 작성 시점을 기준으로 하며, 시간이 지남에 따라 변경될 수 있습니다.
            </p>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">특히 다음 사항에 유의하시기 바랍니다:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>법령 및 규정은 지속적으로 변경되므로 최신 정보를 별도로 확인해야 합니다</li>
                <li>세무, 법무, 노무 관련 정보는 개별 상황에 따라 적용이 달라질 수 있습니다</li>
                <li>모든 기업의 상황이 다르므로 획일적인 적용이 어려울 수 있습니다</li>
                <li>제공된 템플릿이나 양식은 참고용이며, 실무 적용 전 검토가 필요합니다</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 전문적 조언 제한 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">전문적 조언의 제한</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              웹사이트에서 제공하는 정보는 전문적인 법률, 세무, 회계, 또는 기타 전문 조언을 
              대체할 수 없습니다. 구체적인 문제나 의사결정이 필요한 경우 반드시 해당 분야의 
              전문가와 상담하시기 바랍니다.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2">전문가 상담이 필요한 경우</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                  <li>법적 분쟁이나 소송 관련 사항</li>
                  <li>세무 신고 및 절세 전략</li>
                  <li>근로기준법 위반 우려 사항</li>
                  <li>계약서 작성 및 검토</li>
                  <li>개인정보보호법 준수 방안</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">추천 전문가</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  <li>변호사 (법무 관련)</li>
                  <li>세무사 (세무 관련)</li>
                  <li>공인회계사 (회계 관련)</li>
                  <li>공인노무사 (인사노무 관련)</li>
                  <li>관련 공공기관 상담센터</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 파일 및 템플릿 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제공 파일 및 템플릿</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              웹사이트에서 제공하는 파일, 템플릿, 양식 등은 참고 및 교육 목적으로만 제공됩니다. 
              실무에서 사용하기 전에 반드시 다음 사항을 확인하시기 바랍니다.
            </p>
            
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">파일 사용 시 주의사항:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>개별 기업의 상황에 맞게 수정 및 보완이 필요합니다</li>
                  <li>최신 법령 및 규정에 맞는지 확인해야 합니다</li>
                  <li>해당 분야 전문가의 검토를 받으시기 바랍니다</li>
                  <li>바이러스 검사를 실시한 후 사용하시기 바랍니다</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">⚠️ 중요</p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  제공된 파일이나 템플릿을 그대로 사용하여 발생하는 모든 문제에 대해 
                  웹사이트는 책임을 지지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 외부 링크 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">외부 링크</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              웹사이트에는 다른 웹사이트로 연결되는 링크가 포함되어 있을 수 있습니다. 
              이러한 외부 웹사이트의 내용, 정책, 보안에 대해서는 해당 웹사이트의 
              운영자가 책임을 지며, 본 웹사이트는 이에 대한 책임을 지지 않습니다.
            </p>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">외부 링크 이용 시 유의사항:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>각 웹사이트의 이용약관 및 개인정보처리방침을 확인하세요</li>
                <li>링크된 콘텐츠의 정확성은 해당 웹사이트에서 보장합니다</li>
                <li>외부 웹사이트에서의 개인정보 처리는 해당 사이트 정책을 따릅니다</li>
                <li>악성코드나 보안 위협이 있을 수 있으니 주의하세요</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 사용자 책임 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">사용자의 책임</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              웹사이트를 이용하는 사용자는 다음과 같은 책임을 집니다:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">정보 활용 책임</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>제공된 정보의 적절성 판단</li>
                  <li>최신 정보 확인 및 업데이트</li>
                  <li>전문가 상담을 통한 검증</li>
                  <li>개별 상황에 맞는 적용</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">법적 준수 책임</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>관련 법령 및 규정 준수</li>
                  <li>저작권 및 지적재산권 존중</li>
                  <li>웹사이트 이용약관 준수</li>
                  <li>타인의 권리 침해 금지</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 손해 배상 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">손해 배상의 제한</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              웹사이트 및 그 운영자는 다음과 같은 경우에 발생하는 손해에 대해 
              책임을 지지 않습니다:
            </p>
            
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2">면책 범위</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-red-700 dark:text-red-300">
                  <li>제공된 정보의 부정확성으로 인한 손해</li>
                  <li>정보의 오용이나 오해로 인한 문제</li>
                  <li>제3자의 행위로 발생한 손해</li>
                  <li>서비스 중단으로 인한 불편이나 손실</li>
                  <li>웹사이트 기술적 오류로 인한 문제</li>
                  <li>바이러스나 악성코드로 인한 피해</li>
                </ul>
              </div>
              
              <p className="text-sm">
                다만, 웹사이트의 고의 또는 중과실로 인한 손해의 경우에는 
                관련 법령에 따라 배상 책임을 질 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 지적재산권 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">지적재산권</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              웹사이트의 모든 콘텐츠(텍스트, 이미지, 로고, 디자인 등)는 
              저작권법 및 기타 지적재산권법의 보호를 받습니다.
            </p>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">이용 허용 범위:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>허용:</strong> 개인적, 비상업적 목적의 열람 및 인쇄</li>
                <li><strong>허용:</strong> 교육 목적의 인용 (출처 명시 시)</li>
                <li><strong>금지:</strong> 상업적 목적의 무단 복제 및 배포</li>
                <li><strong>금지:</strong> 수정, 변경, 2차 저작물 작성</li>
                <li><strong>금지:</strong> 출처 표시 없는 무단 사용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 서비스 가용성 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">서비스 가용성</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              웹사이트는 최대한 안정적인 서비스 제공을 위해 노력하고 있으나, 
              다음과 같은 사유로 서비스가 중단될 수 있습니다:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">예정된 중단</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>정기 시스템 점검</li>
                  <li>업데이트 및 개선 작업</li>
                  <li>보안 패치 적용</li>
                  <li>서버 이전 작업</li>
                </ul>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">예상치 못한 중단</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>서버 하드웨어 장애</li>
                  <li>네트워크 연결 문제</li>
                  <li>해킹이나 사이버 공격</li>
                  <li>자연재해나 불가항력</li>
                </ul>
              </div>
            </div>
            
            <p className="text-sm">
              서비스 중단으로 인한 불편이나 손실에 대해서는 책임을 지지 않으며, 
              가능한 한 빠른 복구를 위해 최선을 다하겠습니다.
            </p>
          </div>
        </section>

        {/* 관할법원 및 준거법 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">관할법원 및 준거법</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              본 면책사항 및 웹사이트 이용과 관련하여 발생하는 모든 분쟁에 대해서는 
              대한민국 법을 준거법으로 하며, 서울중앙지방법원을 제1심 관할법원으로 합니다.
            </p>
            
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">분쟁 해결 절차:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>사전 협의를 통한 원만한 해결 시도</li>
                <li>조정기관을 통한 조정 절차</li>
                <li>법원을 통한 최종 해결</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 면책사항 변경 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">면책사항의 변경</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              본 면책사항은 관련 법령의 변경, 서비스 정책의 변경, 기타 합리적인 사유로 
              변경될 수 있습니다. 변경되는 경우 웹사이트에 공지하며, 중요한 변경사항에 
              대해서는 이메일 등을 통해 개별 통지할 수 있습니다.
            </p>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">변경 공지 방법:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>웹사이트 공지사항 게시</li>
                <li>이메일을 통한 개별 통지 (중요 변경사항)</li>
                <li>팝업 또는 배너를 통한 안내</li>
                <li>최소 7일 전 사전 공지</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 연락처 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">문의사항</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              본 면책사항에 대한 질문이나 웹사이트 이용과 관련된 문의사항이 있으시면 
              언제든 연락주세요.
            </p>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">연락처 정보:</h3>
              <ul className="space-y-1">
                <li><strong>이메일:</strong> contact@goldenf.com</li>
                <li><strong>웹사이트:</strong> <a href="/contact" className="text-primary hover:underline">문의 페이지</a></li>
                <li><strong>응답시간:</strong> 평일 기준 24시간 이내</li>
              </ul>
            </div>
            
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="font-semibold text-foreground">
                본 면책사항은 2024년 1월 1일부터 시행됩니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}