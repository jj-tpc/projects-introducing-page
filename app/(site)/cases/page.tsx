import styles from "../site.module.css";

export const metadata = { title: "컨설팅 수행사례" };

export default function CasesPage() {
  return (
    <main className={styles.placeholder}>
      <h1>컨설팅 수행사례</h1>
      <p>대기업 대상 컨설팅 수행사례를 소개하는 자리입니다.</p>
      <span className={styles.note}>사례 자료가 들어오면 이곳에 게시됩니다.</span>
    </main>
  );
}
