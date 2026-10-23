import IntroDeck from "@/components/IntroDeck";
import { publicExists } from "@/components/detail-ui";
import styles from "./site.module.css";

export const metadata = { title: "소개" };

const DECK = "intro/ai-challengers-1.html";

export default function LandingPage() {
  if (!publicExists(DECK)) {
    return (
      <main className={styles.placeholder}>
        <h1>소개</h1>
        <p>소개 슬라이드 파일을 아직 받지 못했습니다. public/{DECK} 에 넣으면 이 자리에 표시됩니다.</p>
      </main>
    );
  }
  return <IntroDeck src={`/${DECK}`} title="AI Challengers 1기 프로그램 소개" />;
}
