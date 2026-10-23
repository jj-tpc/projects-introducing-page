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
    title: "뉴스 보고서 PDF 생성 Skill",
    desc: "뉴스 기사 URL 하나로 1~2쪽 리서치 노트 PDF를 만드는 스킬",
    external: false,
  },
  {
    href: "https://dongguk.the-prompt.me/",
    icon: "🎓",
    title: "동국대 챗봇 에이전트",
    desc: "동국대학교 정보를 안내하는 대화형 에이전트 페이지",
    external: true,
  },
  {
    href: "/hr-plugin",
    icon: "📊",
    title: "HR 리스크 분석 및 예측 대시보드 플러그인",
    desc: "HR 엑셀로 퇴사 위험을 예측하고 대시보드로 보여 주는 플러그인",
    external: false,
  },
];

export const metadata = { title: "산출물 예시" };

export default function ExamplesPage() {
  return (
    <div className={styles.wrap}>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.avatar} aria-hidden="true">🚀</div>
          <h1 className={styles.title}>산출물 예시</h1>
          <p className={styles.sub}>직접 만든 Claude 스킬·에이전트·플러그인을 바로 열어 보거나 내려받을 수 있습니다.</p>
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
