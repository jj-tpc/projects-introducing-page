import Link from "next/link";
import styles from "./page.module.css";

const Arrow = () => (
  <svg
    className={styles.arrow}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const projects = [
  {
    href: "/news-reading-helper",
    icon: "📰",
    title: "Skills | 실시간 키워드 기반 경영진 보고서 작성",
    desc: "뉴스 기사 URL 하나로 1~2쪽 리서치 노트 PDF를 만드는 스킬",
    external: false,
  },
  {
    href: "https://dongguk.the-prompt.me/",
    icon: "🎓",
    title: "에이전트 | 동국대학교 학사 카탈로그 FAQ",
    desc: "학사 카탈로그를 근거로 답하는 대화형 FAQ 에이전트",
    external: true,
  },
  {
    href: "/hr-plugin",
    icon: "📊",
    title: "플러그인 | HR 리스크 분석 및 퇴사 예측 대시보드",
    desc: "HR 엑셀로 퇴사 위험을 예측하고 직원 목록 대시보드로 보여 주는 플러그인",
    external: false,
  },
];

export const metadata = { title: "AI 챌린저스 1기 예상 산출물" };

export default function ExamplesPage() {
  return (
    <div className={styles.wrap}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>AI 챌린저스 1기 예상 산출물</h1>
          <p className={styles.sub}>더 프롬프트 컴퍼니에서 실제 수행한 AI 산출물 예시입니다.</p>
        </header>

        <nav className={styles.nav} aria-label="프로젝트 링크">
          {projects.map((p) => {
            const body = (
              <>
                <span className={styles.icon} aria-hidden="true">{p.icon}</span>
                <span className={styles.text}>
                  <span className={styles.name}>{p.title}</span>
                  <span className={styles.desc}>{p.desc}</span>
                </span>
                <Arrow />
              </>
            );
            return p.external ? (
              <a key={p.href} className={styles.link} href={p.href} target="_blank" rel="noopener">
                {body}
              </a>
            ) : (
              <Link key={p.href} className={styles.link} href={p.href}>
                {body}
              </Link>
            );
          })}
        </nav>

        <footer className={styles.footer}>© 2026</footer>
      </main>
    </div>
  );
}
