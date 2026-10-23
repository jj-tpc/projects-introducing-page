import type { Metadata } from "next";
import Link from "next/link";
import PortalEffects from "@/components/PortalEffects";
import { IconBackLong, IconDownload, IconForward, Loader, SectionHead, SectionIndex, Topbar } from "@/components/portal-ui";

export const metadata: Metadata = {
  title: "HR Attrition Plugin",
  description: "HR 엑셀로 퇴사 위험을 학습·예측하고 직원 목록 중심 대시보드로 보여 주는 Claude 플러그인 소개와 다운로드",
};

const ZIP = "/downloads/hr-attrition-plugin.zip";

const dashboard = [
  ["직원 목록", "실제 값·단위·기간·비교 기준을 근거로 붙인 퇴사위험 순위표"],
  ["조직별 지표 히트맵", "지표별 전체 명부 백분위. 퇴사위험 기여도가 아님을 화면에 명시"],
  ["위험 구간 분포", "상위 K · 다음 K · 나머지 구간과 유지 우선순위의 교차표"],
  ["근무·설문 추이", "월별 연장근로 추이와 최근 설문 차트. 원본이 없으면 이유를 표시"],
  ["확인 기록", "담당자 · 확인 상태 · 다음 확인일 · 유지 우선순위. 회사별 브라우저 저장, JSON 내보내기·가져오기"],
  ["공유용 파일", "이름·사번을 가명으로 바꾼 별도 HTML"],
];

const principles = [
  ["R1", "점수는 순위용", "보정된 퇴사 확률이 아닙니다. 0.7을 “퇴사 확률 70%”라고 말하지 않습니다."],
  ["R2", "재학습 금지", "현재 파일의 라벨로 학습과 예측을 동시에 하지 않습니다. 예측 실패를 진단 성공으로 바꾸지 않습니다."],
  ["R3", "민감 속성 배제", "민감 속성·병가·설문 미응답은 개인 예측 입력으로 쓰지 않습니다."],
  ["R4", "유지 우선순위 분리", "유지 우선순위는 HR이 지정하는 업무 판단이며 퇴사위험 점수와 합치지 않습니다."],
  ["R5", "합성 데이터 구분", "동봉 샘플은 처리 경로 검증용입니다. 실제 회사 성능은 실제 과거 데이터로 검증해야 합니다."],
];

export default function HrPluginPage() {
  return (
    <>
      <PortalEffects ember={0.6} />
      <Topbar status={<>Plugin <b>· v0.5.0</b></>} />
      <SectionIndex items={[["intro", "01", "소개"], ["parts", "02", "구성"], ["flow", "03", "작동"], ["install", "04", "설치"]]} />

      <main className="page">
        <section className="hero" id="intro">
          <h1 className="display"><span>HR</span><span>Attrition</span><span>Plugin</span></h1>
          <p className="lede">HR 엑셀 파일로 퇴사 위험을 학습·예측하고, 직원 목록 중심의 HR 대시보드로 보여 주는 Claude 플러그인입니다. 스킬 두 개와 분석 에이전트 하나를 한 패키지에 담았습니다.</p>
          <div className="actions">
            <a className="btn primary" href={ZIP} download><span className="ko">플러그인 ZIP 다운로드</span><small>96 KB</small><IconDownload /></a>
            <a className="btn" href="#install"><span className="ko">설치 방법</span><IconForward /></a>
          </div>
          <Loader />
          <div className="env label">산출물 <b>결과 xlsx + 대시보드 HTML</b></div>
        </section>

        <section className="section" id="parts">
          <SectionHead en="Components" ko="구성 요소" meta="2 skills · 1 agent" />
          <div className="panels">
            <article className="panel"><span className="num label">S1</span><h3 className="code">/predict_attrition</h3><p>과거 스냅샷과 실제 퇴사 이력으로 후보 모델 5개를 비교하고 시간 순으로 평가한 뒤, 고정된 모델로 현재 재직자의 퇴사위험 순위를 만듭니다. 결과는 <code>퇴사위험_결과.xlsx</code>로 남습니다.</p></article>
            <article className="panel"><span className="num label">S2</span><h3 className="code">/make_dashboard</h3><p>결과 엑셀과 같은 기준일의 원본으로 직원 목록 중심 대시보드를 만듭니다. 외부 리소스가 없는 단일 HTML이며 아티팩트로 바로 봅니다.</p></article>
            <article className="panel"><span className="num label">A1</span><h3 className="code">hr-analyst</h3><p>고정 모델 평가와 결과물을 읽어 실제 값·범위·한계를 한국어로 설명하는 에이전트입니다. 숫자는 산출물에서만 읽고, 현재 입력으로 재학습하지 않습니다.</p></article>
          </div>

          <dl className="spec" style={{ marginTop: 14 }}>
            <div><dt className="label">종류</dt><dd>Plugin</dd></div>
            <div><dt className="label">버전</dt><dd>v0.5.0</dd></div>
            <div><dt className="label">입력</dt><dd>HR xlsx</dd></div>
            <div><dt className="label">엔진</dt><dd>Python 3.11+</dd></div>
            <div><dt className="label">저장소</dt><dd className="ko">비공개 저장소</dd></div>
          </dl>
        </section>

        <section className="section" id="flow">
          <SectionHead en="Workflow" ko="작동 순서" meta="train → run → dashboard" />
          <div className="panels">
            <article className="panel"><span className="num label">01</span><h3 className="ko">과거 학습·평가</h3><p>history.json 매니페스트와 과거 스냅샷으로 학습합니다. 기준선, 로지스틱 회귀, HistGradientBoosting 등 후보 5개를 검증 기간의 Precision@K로 비교하고, 선택한 모델을 미래 기간으로 다시 평가합니다. 평가 후 재학습하지 않습니다.</p></article>
            <article className="panel"><span className="num label">02</span><h3 className="ko">현재 재직자 예측</h3><p>고정 모델로 현재 파일의 점수를 계산합니다. 모델의 회사·퇴사 유형·기간이 질문과 맞는지 검사하고, 상위 K명·다음 K명·나머지로 구간을 나눕니다. 모델이 없으면 명시적으로 요청했을 때만 진단 모드로 실행합니다.</p></article>
            <article className="panel"><span className="num label">03</span><h3 className="ko">대시보드</h3><p>직원 목록을 먼저 보여 주고, 조직·검색·위험 구간·유지 우선순위·상태 필터를 모든 패널에 똑같이 적용합니다. 담당자·확인 상태·다음 확인일은 브라우저에 저장하고 JSON으로 내보내거나 가져옵니다.</p></article>
          </div>

          <SectionHead en="Dashboard" ko="대시보드 화면" meta="single html · no cdn" top />
          <ul className="list">
            {dashboard.map(([t, d], i) => (
              <li key={t}><span className="k">{String(i + 1).padStart(2, "0")}</span><span className="t">{t}</span><span className="d">{d}</span></li>
            ))}
          </ul>

          <SectionHead en="Principles" ko="지키는 원칙" meta="from the README" top />
          <ul className="list">
            {principles.map(([k, t, d]) => (
              <li key={k}><span className="k">{k}</span><span className="t">{t}</span><span className="d">{d}</span></li>
            ))}
          </ul>

          <SectionHead en="Triggers" ko="실행 문구" meta="attach an xlsx" top />
          <ul className="phrases">
            <li>퇴사 위험 분석해줘</li>
            <li>누가 그만둘 것 같은지 알려줘</li>
            <li>리텐션 리스크 뽑아줘</li>
            <li>이탈 가능성 예측해줘</li>
            <li>HR 현황 대시보드로 보여줘</li>
          </ul>
          <p className="fine">HR 엑셀을 첨부하며 말하면 예측 스킬이, 결과 엑셀이 있으면 대시보드 스킬이 실행됩니다.</p>
        </section>

        <section className="section" id="install">
          <SectionHead en="Install" ko="설치" meta="plugin or skills" />
          <div className="twin">
            <article className="panel">
              <h3>Claude Code · 플러그인</h3>
              <p>플러그인 ZIP을 풀어 둔 뒤 Claude Code에서 마켓플레이스로 등록하고 설치합니다.</p>
              <pre>{`/plugin marketplace add <풀어 둔 hr-attrition 폴더>
/plugin install hr-attrition@tpc-hr`}</pre>
              <p>엔진은 Python 3.11 이상과 pandas · numpy · openpyxl · scipy · scikit-learn이 필요합니다. 폴더에서 <code>pip install -e .</code> 로 설치합니다.</p>
            </article>
            <article className="panel">
              <h3>Claude.ai · 스킬 2개</h3>
              <p>claude.ai에서는 스킬 ZIP을 각각 업로드합니다. 설정 → 기능(Capabilities) → Skills. 두 ZIP 모두 공용 엔진을 동봉하고 있어 단독으로 동작합니다.</p>
              <div className="actions" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
                <a className="btn" href="/downloads/predict_attrition.zip" download>predict_attrition.zip<small>88 KB</small></a>
                <a className="btn" href="/downloads/make_dashboard.zip" download>make_dashboard.zip<small>80 KB</small></a>
              </div>
            </article>
          </div>
          <p className="fine">원본 저장소는 비공개입니다. 배포 ZIP에는 실제 HR 데이터가 들어 있지 않습니다.</p>
        </section>

        <section className="close">
          <h2 className="display">Know who to talk to first.</h2>
          <div className="actions">
            <a className="btn primary" href={ZIP} download><span className="ko">hr-attrition-plugin.zip</span><small>96 KB</small><IconDownload /></a>
            <Link className="btn" href="/examples"><span className="ko">산출물 예시로</span><IconBackLong /></Link>
          </div>
        </section>
      </main>
    </>
  );
}
