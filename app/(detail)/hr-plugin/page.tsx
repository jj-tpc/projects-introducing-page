import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import FileFinder, { type FinderFile } from "@/components/FileFinder";
import { IconDownload, IconOpen, PageTitle, SectionHead, Topbar, publicExists } from "@/components/detail-ui";

export const metadata: Metadata = {
  title: "HR 리스크 분석 및 퇴사 예측 대시보드",
  description: "HR 엑셀로 퇴사 위험을 학습·예측하고 직원 목록 중심 대시보드로 보여 주는 Claude 플러그인의 완성 대시보드, 파일 탐색기, 다운로드",
};

const ZIP = "/downloads/hr-attrition-plugin.zip";
const DASH = "/samples/hr-dashboard.html";

const NOTES: Record<string, string> = {
  "skill/predict_attrition/SKILL.md": "예측 스킬 프롬프트",
  "skill/make_dashboard/SKILL.md": "대시보드 스킬 프롬프트",
  "agents/hr-analyst.md": "분석 에이전트 프롬프트",
  ".claude-plugin/plugin.json": "플러그인 매니페스트",
  "engine/hrattrition/training.py": "발췌 1~60행",
};

function loadFiles(): FinderFile[] {
  const base = path.join(process.cwd(), "content", "hr");
  const out: FinderFile[] = [];
  const walk = (dir: string) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) { walk(full); continue; }
      const rel = path.relative(base, full).split(path.sep).join("/");
      const e = ent.name.split(".").pop();
      const lang = e === "py" ? "python" : e === "json" ? "json" : e === "toml" ? "toml" : "markdown";
      out.push({ path: rel, lang, content: fs.readFileSync(full, "utf8").replace(/\r\n/g, "\n"), note: NOTES[rel] });
    }
  };
  walk(base);
  return out;
}

export default function HrPluginPage() {
  const hasDash = publicExists("samples/hr-dashboard.html");
  const files = loadFiles();

  return (
    <>
      <Topbar kind="Plugin" />
      <main className="page">
          <PageTitle title="HR 리스크 분석 및 퇴사 예측 대시보드" sub="HR Attrition Plugin v0.5.0 · 스킬 2개 + 분석 에이전트 1개 + Python 엔진. HR 엑셀 한 파일로 퇴사 위험을 예측하고 직원 목록 중심 대시보드를 만듭니다." />

          <section className="section" id="dashboard">
            <SectionHead n="01" title="대시보드 완성 형태" meta="단일 HTML" />
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

          <section className="section" id="files">
            <SectionHead n="02" title="플러그인 파일 · 프롬프트" meta="파일을 고르면 내용이 보입니다" />
            <p className="lead">플러그인을 이루는 실제 파일 17개입니다. 스킬 문서는 Claude에게 분기와 금지 규칙을 주는 프롬프트이고, 엔진은 사건 라벨 생성과 시간 분할 학습·평가를 맡습니다.</p>
            <FileFinder files={files} root="hr-attrition" initial="skill/predict_attrition/SKILL.md" />
          </section>

          <section className="section" id="install">
            <SectionHead n="03" title="다운로드 · 설치 방법" />
            <article className="panel">
              <h3>다운로드</h3>
              <p>플러그인 zip은 매니페스트·스킬 2개·에이전트·엔진을 담고 있습니다. claude.ai용 스킬 zip 두 개는 공용 엔진을 각각 동봉해 단독으로 동작합니다. 실제 HR 데이터는 들어 있지 않습니다.</p>
              <div className="actions">
                <a className="btn primary" href={ZIP} download><IconDownload />hr-attrition-plugin.zip<small>96 KB</small></a>
                <a className="btn" href="/downloads/predict_attrition.zip" download>predict_attrition.zip<small>88 KB</small></a>
                <a className="btn" href="/downloads/make_dashboard.zip" download>make_dashboard.zip<small>80 KB</small></a>
              </div>
            </article>
            <article className="panel" style={{ marginTop: 16 }}>
              <h3>설치 방법</h3>
              <p><b>Claude Code</b> zip을 풀어 둔 뒤 마켓플레이스로 등록하고 설치합니다. 엔진은 Python 3.11 이상과 pandas · numpy · openpyxl · scipy · scikit-learn이 필요하며 폴더에서 <code>pip install -e .</code> 로 설치합니다.</p>
              <pre>{`/plugin marketplace add <풀어 둔 hr-attrition 폴더>
/plugin install hr-attrition@tpc-hr`}</pre>
              <p><b>Claude.ai</b> 설정 → 기능(Capabilities) → Skills에서 스킬 zip을 각각 업로드합니다.</p>
            </article>
          </section>
      </main>
    </>
  );
}
