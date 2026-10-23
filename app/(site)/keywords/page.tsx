import styles from "../site.module.css";

export const metadata = { title: "핵심 키워드" };

export default function KeywordsPage() {
  return (
    <main className={styles.placeholder}>
      <h1>핵심 키워드</h1>
      <p>카드뉴스 형식의 홍보물로 핵심 키워드를 소개하는 자리입니다.</p>
      <span className={styles.note}>카드뉴스 이미지가 들어오면 이곳에 게시됩니다.</span>
    </main>
  );
}
