import type { Metadata } from "next";
import { CodePanel, IconDownload, IconOpen, PageTitle, SectionHead, Topbar, publicExists, readContent } from "@/components/detail-ui";

export const metadata: Metadata = {
  title: "실시간 키워드 기반 경영진 보고서 작성",
  description: "뉴스 기사 URL을 1~2쪽 경영진 보고서 PDF로 조판하는 Claude Skill(News Reading Helper)의 스킬 문서, 결과물 PDF, 다운로드",
};

const ZIP = "/downloads/news-reading-helper.zip";
const PDF = "/samples/news-report.pdf";

export default function NewsReadingHelperPage() {
  const skill = readContent("news-skill.md");
  const hasPdf = publicExists("samples/news-report.pdf");

  return (
    <>
      <Topbar kind="Skills" />
      <main className="page">
        <PageTitle title="실시간 키워드 기반 경영진 보고서 작성" sub="News Reading Helper · Claude Skill v1.0 · 뉴스 기사 URL 하나를 1~2쪽 경영진 보고서 PDF로 조판합니다." />

        <section className="section" id="skill">
          <SectionHead n="01" title="마크다운 · SKILL.md" meta="Claude가 읽는 스킬 문서 전문" />
          <p className="lead">스킬은 코드가 아니라 이 마크다운 문서 한 장과 동봉 폰트로 동작합니다. 수집·구조 설계·렌더링의 세 단계와 품질 기준이 모두 이 안에 있습니다.</p>
          <CodePanel file="news-reading-helper/SKILL.md" lang="markdown" source={skill} tall />
        </section>

        <section className="section" id="result">
          <SectionHead n="02" title="결과 적용물 · PDF" meta="A4 1~2쪽 경영진 보고서" />
          <p className="lead">이 스킬로 실제 기사를 처리해 만든 보고서입니다. 헤드라인, 요약, 핵심 사실, 배경, 주요 인물, 영향과 전망, 출처 순으로 한 장에 담깁니다.</p>
          <div className="embed">
            <div className="embed-bar">
              <span>samples/news-report.pdf</span>
              {hasPdf && <a href={PDF} target="_blank" rel="noopener"><IconOpen />새 탭에서 열기</a>}
            </div>
            {hasPdf ? (
              <object data={PDF} type="application/pdf" aria-label="결과 보고서 PDF">
                <div className="placeholder">브라우저에서 PDF를 표시할 수 없습니다. <a href={PDF}>PDF 내려받기</a></div>
              </object>
            ) : (
              <div className="placeholder">결과 PDF 파일을 아직 받지 못했습니다. public/samples/news-report.pdf 에 넣으면 이 자리에 표시됩니다.</div>
            )}
          </div>
        </section>

        <section className="section" id="install">
          <SectionHead n="03" title="다운로드 · 설치 방법" />
          <div className="twin">
            <article className="panel">
              <h3>다운로드</h3>
              <p>zip 안에는 SKILL.md와 OFL 라이선스 폰트 54종만 들어 있습니다. 실행 코드는 없고 PDF 렌더링은 Claude 실행 환경의 Playwright를 씁니다.</p>
              <div className="actions">
                <a className="btn primary" href={ZIP} download><IconDownload />news-reading-helper.zip<small>2.6 MB</small></a>
              </div>
            </article>
            <article className="panel">
              <h3>설치 방법</h3>
              <p><b>Claude.ai · 데스크톱 앱</b> 설정 → 기능(Capabilities) → Skills에서 zip을 그대로 업로드합니다. 압축을 풀지 않습니다.</p>
              <p><b>Claude Code</b> 압축을 풀어 스킬 폴더에 넣습니다.</p>
              <pre>{`~/.claude/skills/news-reading-helper/
├── SKILL.md
└── fonts/`}</pre>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
