import type { Metadata } from "next";
import { CodePanel, IconDownload, IconOpen, PageTitle, SectionHead, Topbar, publicExists, readContent } from "@/components/detail-ui";

export const metadata: Metadata = {
  title: "HR 리스크 분석 및 퇴사 예측 대시보드",
  description: "HR 엑셀로 퇴사 위험을 학습·예측하고 직원 목록 중심 대시보드로 보여 주는 Claude 플러그인의 완성 대시보드, 구성 코드, 다운로드",
};

const ZIP = "/downloads/hr-attrition-plugin.zip";
const DASH = "/samples/hr-dashboard.html";

export default function HrPluginPage() {
  const hasDash = publicExists("samples/hr-dashboard.html");
  const files = [
    { file: ".claude-plugin/plugin.json", lang: "json" as const, src: readContent("hr/plugin.json"), note: "플러그인 매니페스트" },
    { file: "skill/predict_attrition/SKILL.md", lang: "markdown" as const, src: readContent("hr/predict_attrition.SKILL.md"), note: "예측 스킬" },
    { file: "skill/make_dashboard/SKILL.md", lang: "markdown" as const, src: readContent("hr/make_dashboard.SKILL.md"), note: "대시보드 스킬" },
    { file: "agents/hr-analyst.md", lang: "markdown" as const, src: readContent("hr/hr-analyst.md"), note: "분석 에이전트" },
    { file: "engine/hrattrition/labels.py", lang: "python" as const, src: readContent("hr/labels.py"), note: "사건 라벨 생성" },
    { file: "engine/hrattrition/training.py", lang: "python" as const, src: readContent("hr/training.excerpt.py"), note: "발췌 1~60행 · 시간 분할 학습·평가" },
  ];

  return (
    <>
      <Topbar kind="Plugin" />
      <main className="page">
        <PageTitle title="HR 리스크 분석 및 퇴사 예측 대시보드" sub="HR Attrition Plugin v0.5.0 · 스킬 2개 + 분석 에이전트 1개 + Python 엔진. HR 엑셀 한 파일로 퇴사 위험을 예측하고 직원 목록 중심 대시보드를 만듭니다." />

        <section className="section" id="dashboard">
          <SectionHead n="01" title="대시보드 완성 형태" meta="단일 HTML · 외부 CDN 없음" />
          <p className="lead">플러그인이 만들어 내는 대시보드 그대로입니다. 안에서 스크롤하면 직원 목록, 조직별 지표 히트맵, 위험 구간 분포, 근무·설문 추이, 확인 기록까지 전체가 보입니다. 데이터는 저장소에 동봉된 합성 샘플(fixture)로, 실제 직원 정보가 아닙니다.</p>
          <div className="embed dark">
            <div className="embed-bar">
              <span>samples/hr-dashboard.html · 합성 데모 데이터</span>
              {hasDash && <a href={DASH} target="_blank" rel="noopener"><IconOpen />새 탭에서 열기</a>}
            </div>
            {hasDash ? (
              <iframe src={DASH} title="HR 퇴사 위험 대시보드 (합성 데모)" loading="lazy" />
            ) : (
              <div className="placeholder">대시보드 HTML을 아직 생성하지 못했습니다. public/samples/hr-dashboard.html 에 넣으면 이 자리에 표시됩니다.</div>
            )}
          </div>
        </section>

        <section className="section" id="components">
          <SectionHead n="02" title="컴포넌트 · 코드" meta="매니페스트 · 스킬 2 · 에이전트 1 · 엔진 발췌" />
          <p className="lead">플러그인을 이루는 실제 파일입니다. 스킬 문서는 Claude에게 분기와 금지 규칙을 주고, 엔진은 사건 라벨 생성과 시간 분할 학습·평가를 맡습니다. 점수는 순위용이며 보정된 퇴사 확률이 아닙니다.</p>
          {files.map((f) => (
            <CodePanel key={f.file} file={f.file} lang={f.lang} source={f.src} note={f.note} />
          ))}
        </section>

        <section className="section" id="install">
          <SectionHead n="03" title="다운로드 · 설치 방법" />
          <div className="twin">
            <article className="panel">
              <h3>다운로드</h3>
              <p>플러그인 zip은 매니페스트·스킬 2개·에이전트·엔진을 담고 있습니다. claude.ai용 스킬 zip 두 개는 공용 엔진을 각각 동봉해 단독으로 동작합니다. 실제 HR 데이터는 들어 있지 않습니다.</p>
              <div className="actions">
                <a className="btn primary" href={ZIP} download><IconDownload />hr-attrition-plugin.zip<small>96 KB</small></a>
                <a className="btn" href="/downloads/predict_attrition.zip" download>predict_attrition.zip<small>88 KB</small></a>
                <a className="btn" href="/downloads/make_dashboard.zip" download>make_dashboard.zip<small>80 KB</small></a>
              </div>
            </article>
            <article className="panel">
              <h3>설치 방법</h3>
              <p><b>Claude Code</b> zip을 풀어 둔 뒤 마켓플레이스로 등록하고 설치합니다. 엔진은 Python 3.11 이상과 pandas · numpy · openpyxl · scipy · scikit-learn이 필요하며 폴더에서 <code>pip install -e .</code> 로 설치합니다.</p>
              <pre>{`/plugin marketplace add <풀어 둔 hr-attrition 폴더>
/plugin install hr-attrition@tpc-hr`}</pre>
              <p><b>Claude.ai</b> 설정 → 기능(Capabilities) → Skills에서 스킬 zip을 각각 업로드합니다.</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
