import Link from "next/link";
import styles from "./site.module.css";

export default function LandingPage() {
  return (
    <main className={styles.placeholder}>
      <h1>소개</h1>
      <p>상세페이지(랜딩 페이지) 소개가 들어갈 자리입니다. 핵심 키워드, 산출물 예시, 컨설팅 수행사례로 이어지는 홈페이지의 첫 화면입니다.</p>
      <span className={styles.note}>랜딩 페이지 내용은 아직 준비 중입니다.</span>
      <div>
        <Link className={styles.cta} href="/examples">산출물 예시 보기 →</Link>
      </div>
    </main>
  );
}
