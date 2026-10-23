import { publicExists } from "@/components/detail-ui";
import styles from "./site.module.css";

export const metadata = { title: "트레일러" };

const VIDEO = "intro/ai-challengers-1-trailer.mp4";

export default function TrailerPage() {
  if (!publicExists(VIDEO)) {
    return (
      <main className={styles.placeholder}>
        <h1>트레일러</h1>
        <p>트레일러 영상 파일을 아직 받지 못했습니다. public/{VIDEO} 에 넣으면 이 자리에 재생됩니다.</p>
      </main>
    );
  }
  return (
    <main className={styles.trailer}>
      <video className={styles.trailerVideo} src={`/${VIDEO}`} controls playsInline preload="metadata" aria-label="AI Challengers 1기 트레일러">
        브라우저가 동영상 재생을 지원하지 않습니다. <a href={`/${VIDEO}`}>영상 내려받기</a>
      </video>
      <p className={styles.trailerCaption}>AI Challengers 1기 트레일러 · 재생 버튼을 누르면 소리와 함께 재생됩니다.</p>
    </main>
  );
}
