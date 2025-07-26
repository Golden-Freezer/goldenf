import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '골든에프 총무블로그의 개인정보 수집, 이용, 관리에 관한 정책입니다.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="개인정보처리방침"
      lastUpdated="2024년 1월 1일"
      description="골든에프 총무블로그는 이용자의 개인정보를 중요하게 생각하며, 관련 법령에 따라 개인정보를 보호하고 있습니다."
    >
      <div className="space-y-8">
        {/* 제1조 개인정보의 처리 목적 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제1조 (개인정보의 처리 목적)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              골든에프 총무블로그("회사" 또는 "서비스")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>웹사이트 회원가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지 목적</li>
              <li>재화 또는 서비스 제공: 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제·정산 목적</li>
              <li>고충처리: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적</li>
              <li>마케팅 및 광고에의 활용: 신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
            </ul>
          </div>
        </section>

        {/* 제2조 개인정보의 처리 및 보유 기간 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제2조 (개인정보의 처리 및 보유 기간)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">웹사이트 회원가입 및 관리</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>보유근거: 서비스 이용계약 또는 회원가입 등에 관한 기록</li>
                  <li>보유기간: 회원 탈퇴 시까지</li>
                  <li>예외사항: 관계법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료 시까지</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">재화 또는 서비스 제공</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>보유근거: 전자상거래 등에서의 소비자보호에 관한 법률</li>
                  <li>보유기간: 서비스 제공 완료 후 5년</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 제3조 개인정보의 제3자 제공 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제3조 (개인정보의 제3자 제공)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Google AdSense 및 분석 서비스</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>제공받는 자: Google LLC</li>
                <li>제공 목적: 맞춤형 광고 제공 및 웹사이트 분석</li>
                <li>제공 항목: 쿠키 정보, 접속 로그, 기기 정보</li>
                <li>보유 및 이용기간: Google의 개인정보처리방침에 따름</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 제4조 개인정보처리의 위탁 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제4조 (개인정보처리의 위탁)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-3 text-left font-semibold text-foreground">위탁받는 자</th>
                    <th className="border border-border p-3 text-left font-semibold text-foreground">위탁업무</th>
                    <th className="border border-border p-3 text-left font-semibold text-foreground">개인정보 보유기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3">Supabase Inc.</td>
                    <td className="border border-border p-3">데이터베이스 관리 및 백업</td>
                    <td className="border border-border p-3">위탁계약 종료시까지</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Cloudflare Inc.</td>
                    <td className="border border-border p-3">웹사이트 호스팅 및 CDN 서비스</td>
                    <td className="border border-border p-3">위탁계약 종료시까지</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 제5조 정보주체의 권리·의무 및 행사방법 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제5조 (정보주체의 권리·의무 및 행사방법)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>개인정보 처리현황 통지요구</li>
              <li>개인정보 열람요구</li>
              <li>개인정보 정정·삭제요구</li>
              <li>개인정보 처리정지요구</li>
            </ul>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">권리 행사 방법</p>
              <p>개인정보보호법 시행규칙 별지 제8호 서식에 따라 작성 후 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.</p>
            </div>
          </div>
        </section>

        {/* 제6조 처리하는 개인정보 항목 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제6조 (처리하는 개인정보 항목)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">필수항목</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>이메일주소, 비밀번호, 이름</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">자동 수집 항목</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량 이용기록</li>
                  <li>접속 로그, 방문 일시, 서비스 이용 기록, 접속 빈도</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 제7조 개인정보의 파기 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제7조 (개인정보의 파기)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">파기절차</h3>
                <p>회원님이 입력하신 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">파기방법</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>전자적 파일 형태: 기록을 재생할 수 없도록 로우레벨포맷(Low Level Format) 등의 방법을 이용하여 파기</li>
                  <li>종이 문서: 분쇄기로 분쇄하거나 소각하여 파기</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 제8조 개인정보의 안전성 확보조치 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제8조 (개인정보의 안전성 확보조치)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>정기적인 자체 감사 실시</li>
              <li>개인정보 취급 직원의 최소화 및 교육</li>
              <li>내부관리계획의 수립 및 시행</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보의 암호화</li>
              <li>접속기록의 보관 및 위변조 방지</li>
              <li>개인정보에 대한 접근 제한</li>
              <li>비인가자에 대한 출입 통제</li>
            </ul>
          </div>
        </section>

        {/* 제9조 쿠키 사용 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제9조 (쿠키의 사용)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">쿠키의 사용 목적</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>회원과 비회원의 접속 빈도나 방문 시간 등의 분석</li>
                  <li>이용자의 취향과 관심분야의 파악 및 자취 추적</li>
                  <li>각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">쿠키 설정 거부 방법</h3>
                <p>웹브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 제10조 개인정보 보호책임자 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제10조 (개인정보 보호책임자)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">개인정보보호책임자</h3>
              <ul className="space-y-1">
                <li>성명: 골든에프 관리자</li>
                <li>연락처: {SITE_CONFIG.author.email}</li>
                <li>※ 개인정보보호 담당부서로 연결됩니다.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 제11조 권익침해 구제방법 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제11조 (권익침해 구제방법)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>정보주체는 아래의 기관에 대해 개인정보 침해에 대한 신고나 상담을 하실 수 있습니다.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">개인정보보호위원회</h3>
                <ul className="space-y-1 text-sm">
                  <li>전화: (국번없이) 182</li>
                  <li>홈페이지: privacy.go.kr</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">개인정보 침해신고센터</h3>
                <ul className="space-y-1 text-sm">
                  <li>전화: (국번없이) 182</li>
                  <li>홈페이지: privacy.go.kr</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 제12조 개인정보 처리방침 변경 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제12조 (개인정보 처리방침 변경)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="font-semibold text-foreground">본 방침은 2024년 1월 1일부터 시행됩니다.</p>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}