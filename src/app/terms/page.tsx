import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: '이용약관',
  description: '골든에프 총무블로그 서비스 이용에 관한 약관입니다.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="이용약관"
      lastUpdated="2024년 1월 1일"
      description="골든에프 총무블로그 서비스를 이용하시는 모든 회원님께 적용되는 이용약관입니다."
    >
      <div className="space-y-8">
        {/* 제1조 목적 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제1조 (목적)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              이 약관은 골든에프(이하 "회사")가 운영하는 총무블로그 웹사이트(이하 "서비스")에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
            <p>
              PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.
            </p>
          </div>
        </section>

        {/* 제2조 정의 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제2조 (정의)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
            <dl className="space-y-3">
              <div>
                <dt className="font-semibold text-foreground">1. "웹사이트"</dt>
                <dd className="ml-4">회사가 재화 또는 용역(이하 "재화 등")을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">2. "이용자"</dt>
                <dd className="ml-4">"웹사이트"에 접속하여 이 약관에 따라 "웹사이트"가 제공하는 서비스를 받는 회원 및 비회원</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">3. "회원"</dt>
                <dd className="ml-4">"웹사이트"에 회원등록을 한 자로서, 계속적으로 "웹사이트"가 제공하는 서비스를 이용할 수 있는 자</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">4. "비회원"</dt>
                <dd className="ml-4">회원에 가입하지 않고 "웹사이트"가 제공하는 서비스를 이용하는 자</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 제3조 약관 등의 명시와 설명 및 개정 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제3조 (약관 등의 명시와 설명 및 개정)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① "회사"는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호·모사전송번호·전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보보호책임자등을 이용자가 쉽게 알 수 있도록 웹사이트의 초기 서비스화면(전면)에 게시합니다.
            </p>
            <p>
              ② "회사"는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
            </p>
            <p>
              ③ "회사"가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 웹사이트의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
            </p>
          </div>
        </section>

        {/* 제4조 서비스의 제공 및 변경 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제4조 (서비스의 제공 및 변경)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>① "회사"는 다음과 같은 업무를 수행합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>총무 업무 관련 정보 및 콘텐츠 제공</li>
              <li>블로그 서비스 및 커뮤니티 운영</li>
              <li>파일 다운로드 서비스 제공</li>
              <li>기타 "회사"가 정하는 업무</li>
            </ul>
            <p>
              ② "회사"는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
            </p>
          </div>
        </section>

        {/* 제5조 서비스의 중단 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제5조 (서비스의 중단)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① "회사"는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
            </p>
            <p>
              ② "회사"는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, "회사"가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
            </p>
          </div>
        </section>

        {/* 제6조 회원가입 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제6조 (회원가입)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① 이용자는 "회사"가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
            </p>
            <p>
              ② "회사"는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실 후 3년이 경과한 자로서 "회사"의 회원재가입 승낙을 얻은 경우에는 예외로 함</li>
              <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
              <li>기타 회원으로 등록하는 것이 "회사"의 기술상 현저히 지장이 있다고 판단되는 경우</li>
            </ul>
          </div>
        </section>

        {/* 제7조 회원 탈퇴 및 자격 상실 등 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제7조 (회원 탈퇴 및 자격 상실 등)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① 회원은 "회사"에 언제든지 탈퇴를 요청할 수 있으며 "회사"는 즉시 회원탈퇴를 처리합니다.
            </p>
            <p>
              ② 회원이 다음 각 호의 사유에 해당하는 경우, "회사"는 회원자격을 제한 및 정지시킬 수 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>가입 신청 시에 허위 내용을 등록한 경우</li>
              <li>다른 사람의 "웹사이트" 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
              <li>"웹사이트"를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
            </ul>
          </div>
        </section>

        {/* 제8조 회원에 대한 통지 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제8조 (회원에 대한 통지)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① "회사"가 회원에 대한 통지를 하는 경우, 회원이 "회사"와 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다.
            </p>
            <p>
              ② "회사"는 불특정다수 회원에 대한 통지의 경우 1주일이상 "웹사이트" 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다.
            </p>
          </div>
        </section>

        {/* 제9조 개인정보보호 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제9조 (개인정보보호)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① "회사"는 이용자의 개인정보 수집시 서비스제공에 필요한 범위에서 최소한의 개인정보를 수집합니다.
            </p>
            <p>
              ② "회사"는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.
            </p>
            <p>
              ③ "회사"는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.
            </p>
            <p>
              ④ "회사"는 수집된 개인정보를 목적외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.
            </p>
          </div>
        </section>

        {/* 제10조 "회사"의 의무 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제10조 ("회사"의 의무)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① "회사"는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화·용역을 제공하는데 최선을 다하여야 합니다.
            </p>
            <p>
              ② "회사"는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.
            </p>
            <p>
              ③ "회사"는 상품이나 용역에 대하여 「표시·광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시·광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.
            </p>
          </div>
        </section>

        {/* 제11조 회원의 ID 및 비밀번호에 대한 의무 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제11조 (회원의 ID 및 비밀번호에 대한 의무)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① 제17조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.
            </p>
            <p>
              ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
            </p>
            <p>
              ③ 회원이 자신의 ID 및 비밀번호를 도용당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 "회사"에 통보하고 "회사"의 안내가 있는 경우에는 그에 따라야 합니다.
            </p>
          </div>
        </section>

        {/* 제12조 이용자의 의무 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제12조 (이용자의 의무)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>신청 또는 변경시 허위 내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>"회사"에 게시된 정보의 변경</li>
              <li>"회사"가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
              <li>"회사" 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>"회사" 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 "웹사이트"에 공개 또는 게시하는 행위</li>
            </ul>
          </div>
        </section>

        {/* 제13조 저작권의 귀속 및 이용제한 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제13조 (저작권의 귀속 및 이용제한)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① "회사"가 작성한 저작물에 대한 저작권 기타 지적재산권은 "회사"에 귀속합니다.
            </p>
            <p>
              ② 이용자는 "웹사이트"를 이용함으로써 얻은 정보 중 "회사"에게 지적재산권이 귀속된 정보를 "회사"의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
            </p>
            <p>
              ③ "회사"는 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.
            </p>
          </div>
        </section>

        {/* 제14조 분쟁해결 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제14조 (분쟁해결)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① "회사"는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.
            </p>
            <p>
              ② "회사"는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.
            </p>
            <p>
              ③ "회사"와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.
            </p>
          </div>
        </section>

        {/* 제15조 재판권 및 준거법 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">제15조 (재판권 및 준거법)</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              ① "회사"와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.
            </p>
            <p>
              ② "회사"와 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.
            </p>
          </div>
        </section>

        {/* 부칙 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">부칙</h2>
          <div className="space-y-4 text-muted-foreground">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">시행일</p>
              <p>이 약관은 2024년 1월 1일부터 시행합니다.</p>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}