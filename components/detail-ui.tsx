import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { highlightJson, highlightMarkdown, highlightPython } from "@/lib/highlight";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const IconBack = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M15 5l-7 7 7 7" /></svg>
);
export const IconDownload = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M12 4v12M7 11l5 5 5-5M5 20h14" /></svg>
);
export const IconOpen = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M14 4h6v6M20 4l-9 9M18 13v6H5V6h6" /></svg>
);

export function Topbar({ kind }: { kind: string }) {
  return (
    <div className="topbar">
      <Link className="label" href="/examples"><IconBack />산출물 예시</Link>
      <span className="label">{kind}</span>
    </div>
  );
}

export function PageTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <header className="head">
      <h1>{title}</h1>
      <p className="sub">{sub}</p>
    </header>
  );
}

export function SectionHead({ n, title, meta }: { n: string; title: string; meta?: string }) {
  return (
    <div className="section-head">
      <h2><span className="n">{n}</span>{title}</h2>
      {meta && <span className="label">{meta}</span>}
    </div>
  );
}

export function readContent(rel: string): string {
  return fs.readFileSync(path.join(process.cwd(), "content", rel), "utf8").replace(/\r\n/g, "\n");
}

export function publicExists(rel: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", rel));
}

type Lang = "markdown" | "python" | "json";

export function CodePanel({ file, lang, source, note, tall }: { file: string; lang: Lang; source: string; note?: string; tall?: boolean }) {
  const body = lang === "python" ? highlightPython(source) : lang === "json" ? highlightJson(source) : highlightMarkdown(source);
  const lines = source.split("\n").length;
  return (
    <figure className={tall ? "code tall" : "code"}>
      <figcaption>
        <span className="dot" aria-hidden="true" />
        <span className="file">{file}</span>
        <span className="meta">{lang} · {lines} lines{note ? ` · ${note}` : ""}</span>
      </figcaption>
      <pre><code>{body}</code></pre>
    </figure>
  );
}
