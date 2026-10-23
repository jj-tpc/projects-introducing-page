import type { Metadata } from "next";
import Link from "next/link";
import PortalEffects from "@/components/PortalEffects";
import { IconBackLong, IconDownload, IconForward, Loader, SectionHead, SectionIndex, Topbar } from "@/components/portal-ui";

export const metadata: Metadata = {
  title: "News Reading Helper",
  description: "뉴스 기사 URL을 1~2쪽 매거진 품질 PDF 리서치 노트로 바꿔 주는 Claude Skill 소개와 다운로드",
};

const ZIP = "/downloads/news-reading-helper.zip";

const sections: Array<[string, string]> = [
  ["헤더", "한 문장 헤드라인, 출처, 발행일, 카테고리 태그"],
  ["Executive summary", "3~5문장. 이 부분만 읽어도 상황을 알 수 있어야 합니다."],
  ["Key facts", "숫자·이름·날짜 중심의 하드 팩트. 숫자는 굵게."],
  ["Context", "왜 중요한지, 그 전에 무슨 일이 있었는지"],
  ["Key players", "이름 · 역할 · 관련성 표"],
  ["Impact & outlook", "단기·장기 영향, 전문가 시각, 주시할 지표"],
  ["Sources", "원문 URL과 보충 출처. 타임라인·핵심 수치·인용 박스는 기사가 뒷받침할 때만 추가."],
];

const presets = [
  ["BIZ", "#B04A2F", "경제 · 시장 · 실적", "깔끔하고 데이터 중심. IBM Plex Serif + Work Sans + Geist Mono, 러스트 또는 네이비 포인트."],
  ["POL", "#7A1F1F", "정치 · 사회 · 정책", "진지한 에디토리얼 톤. Crimson Pro + Lora + IBM Plex Mono, 웜 오프화이트에 버건디 포인트."],
  ["TEC", "#0E7C7B", "기술 · 과학 · AI", "모던하고 구조적. Outfit / Bricolage Grotesque + Instrument Sans + JetBrains Mono, 틸 또는 블루 포인트."],
];

export default function NewsReadingHelperPage() {
  return (
    <>
      <PortalEffects ember={1} />
      <Topbar status={<>Skill <b>· v1.0</b></>} />
      <SectionIndex items={[["intro", "01", "소개"], ["flow", "02", "작동"], ["parts", "03", "구성"], ["install", "04", "설치"]]} />

      <main className="page">
        <section className="hero" id="intro">
          <h1 className="display"><span>News</span><span>Reading</span><span>Helper</span></h1>
          <p className="lede">뉴스 기사 URL 하나를 넣으면 사실·맥락·인물·영향을 추려 1~2쪽 매거진 품질의 PDF 리서치 노트로 조판해 주는 Claude 스킬입니다.</p>
          <div className="actions">
            <a className="btn primary" href={ZIP} download><span className="ko">ZIP 다운로드</span><small>2.6 MB</small><IconDownload /></a>
            <a className="btn" href="#install"><span className="ko">설치 방법</span><IconForward /></a>
          </div>
          <Loader />
          <div className="env label">산출물 <b>PDF + MD · A4 1~2쪽</b></div>
        </section>

        <section className="section" id="flow">
          <SectionHead en="Workflow" ko="작동 순서" meta="3 phases" />
          <div className="panels">
            <article className="panel"><span className="num label">01</span><h3 className="ko">수집·리서치</h3><p>기사를 가져와 사실·맥락·인물·연표·영향·불확실성으로 나눕니다. 기사만으로 부족한 배경은 최대 1~3회 검색으로 보충하고 출처를 남깁니다. 가져오기에 실패하면 지어내지 않고 본문을 요청합니다.</p></article>
            <article className="panel"><span className="num label">02</span><h3 className="ko">정보 구조 설계</h3><p>렌더링 전에 <code>report-outline.md</code>를 먼저 씁니다. 사실·이름·숫자를 담지 않은 문장은 모두 쳐내는 밀도 규율을 적용합니다.</p></article>
            <article className="panel"><span className="num label">03</span><h3 className="ko">PDF 렌더링</h3><p>HTML + CSS를 Playwright로 PDF화합니다. 2단 조판, 12~18mm 여백, 9~11pt 본문, 색 세 가지 제한, 섹션이 쪽을 넘지 않도록 하는 규칙을 따릅니다.</p></article>
          </div>
        </section>

        <section className="section" id="parts">
          <SectionHead en="Report" ko="보고서 구성" meta="7 sections" />
          <ul className="list">
            {sections.map(([t, d], i) => (
              <li key={t}>
                <span className="k">{String(i + 1).padStart(2, "0")}</span>
                <span className={i === 0 ? "t" : "t en"}>{t}</span>
                <span className="d">{d}</span>
              </li>
            ))}
          </ul>

          <SectionHead en="Presets" ko="스타일 프리셋" meta="by domain" top />
          <ul className="list">
            {presets.map(([k, color, t, d]) => (
              <li key={k}>
                <span className="k">{k}</span>
                <span className="t"><span className="swatch" style={{ background: color }} aria-hidden="true" />{t}</span>
                <span className="d">{d}</span>
              </li>
            ))}
          </ul>

          <SectionHead en="Triggers" ko="실행 문구" meta="say it with a URL" top />
          <ul className="phrases">
            <li>이 기사 PDF로 요약해줘</li>
            <li>이 뉴스로 원페이저 만들어줘</li>
            <li>리서치 노트로 정리해줘</li>
            <li>이 기사 executive brief 뽑아줘</li>
            <li>summarize this article as a PDF</li>
          </ul>
          <p className="fine">산출물 본문은 영어로 작성됩니다. 월스트리트 리서치 노트나 Economist 브리핑에 가까운 문체입니다. OFL 라이선스 폰트 54종이 동봉되어 별도 설치 없이 조판됩니다.</p>
        </section>

        <section className="section" id="install">
          <SectionHead en="Install" ko="설치" meta="zip only · no code" />
          <div className="twin">
            <article className="panel"><h3>Claude.ai · 데스크톱 앱</h3><p>설정 → 기능(Capabilities) → Skills에서 내려받은 <code>news-reading-helper.zip</code>을 그대로 업로드합니다. 압축을 풀지 않습니다.</p></article>
            <article className="panel"><h3>Claude Code</h3><p>압축을 풀어 스킬 폴더에 넣습니다.</p><pre>{`~/.claude/skills/news-reading-helper/
├── SKILL.md
└── fonts/`}</pre></article>
          </div>
          <p className="fine">zip 안에는 <code>SKILL.md</code>와 <code>fonts/</code>만 들어 있습니다. 실행 코드는 없고, PDF 렌더링은 Claude 실행 환경의 Playwright를 씁니다.</p>
        </section>

        <section className="close">
          <h2 className="display">Read the news, keep the note.</h2>
          <div className="actions">
            <a className="btn primary" href={ZIP} download><span className="ko">news-reading-helper.zip</span><small>2.6 MB</small><IconDownload /></a>
            <Link className="btn" href="/examples"><span className="ko">산출물 예시로</span><IconBackLong /></Link>
          </div>
        </section>
      </main>
    </>
  );
}
