"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/(site)/site.module.css";

const NAV_KEYS = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

export default function IntroDeck({ src, title }: { src: string; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 슬라이드 문서가 window keydown 으로 좌우키를 처리하므로,
    // 포커스가 바깥 페이지에 있을 때 눌린 키를 iframe 문서로 넘겨준다.
    const forward = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!NAV_KEYS.has(e.key)) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const win = frame.current?.contentWindow;
      if (!win) return;
      e.preventDefault();
      win.dispatchEvent(new KeyboardEvent("keydown", { key: e.key, code: e.code, shiftKey: e.shiftKey, bubbles: true, cancelable: true }));
    };
    window.addEventListener("keydown", forward);
    return () => window.removeEventListener("keydown", forward);
  }, []);

  return (
    <main className={styles.deck}>
      <iframe
        ref={frame}
        className={styles.deckFrame}
        src={src}
        title={title}
        onLoad={() => frame.current?.focus()}
      />
      <p className={styles.deckHint}>
        <kbd>←</kbd> <kbd>→</kbd> 방향키로 페이지를 넘깁니다. 터치 화면은 좌우로 밀면 됩니다. <kbd>F</kbd> 전체 화면.
      </p>
    </main>
  );
}
