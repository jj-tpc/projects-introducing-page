import type { ReactNode } from "react";

/** Minimal server-side tokenizers for the showcase code panels. Output is plain spans with class names. */

const PY_KEYWORDS = new Set([
  "def", "class", "import", "from", "return", "if", "elif", "else", "for", "while", "in", "not", "and", "or",
  "None", "True", "False", "raise", "try", "except", "finally", "with", "as", "lambda", "yield", "pass", "break", "continue", "is", "assert", "del", "global", "nonlocal",
]);

const PY_TOKEN = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|#[^\n]*|@\w+|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b)/g;

export function highlightPython(src: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of src.matchAll(PY_TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(src.slice(last, i));
    const tok = m[0];
    let cls = "";
    if (tok.startsWith("#")) cls = "tk-c";
    else if (tok.startsWith('"') || tok.startsWith("'")) cls = "tk-s";
    else if (tok.startsWith("@")) cls = "tk-d";
    else if (/^\d/.test(tok)) cls = "tk-n";
    else if (PY_KEYWORDS.has(tok)) cls = "tk-k";
    out.push(cls ? <span key={key++} className={cls}>{tok}</span> : tok);
    last = i + tok.length;
  }
  if (last < src.length) out.push(src.slice(last));
  return out;
}

export function highlightMarkdown(src: string): ReactNode[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const out: ReactNode[] = [];
  let inFence = false;
  let inFront = false;
  lines.forEach((line, i) => {
    let node: ReactNode = line;
    if (i === 0 && line.trim() === "---") { inFront = true; node = <span className="tk-c">{line}</span>; }
    else if (inFront) { node = <span className="tk-m">{line}</span>; if (line.trim() === "---") inFront = false; }
    else if (line.startsWith("```")) { inFence = !inFence; node = <span className="tk-f">{line}</span>; }
    else if (inFence) node = <span className="tk-s">{line}</span>;
    else if (/^#{1,6}\s/.test(line)) node = <span className="tk-h">{line}</span>;
    else if (/^\s*[-*]\s/.test(line)) { const m = line.match(/^(\s*[-*]\s)(.*)$/)!; node = <><span className="tk-k">{m[1]}</span>{inlineMd(m[2])}</>; }
    else if (/^\s*\d+\.\s/.test(line)) { const m = line.match(/^(\s*\d+\.\s)(.*)$/)!; node = <><span className="tk-n">{m[1]}</span>{inlineMd(m[2])}</>; }
    else if (line.startsWith("|")) node = <span className="tk-t">{line}</span>;
    else node = inlineMd(line);
    out.push(<span key={i} className="ln">{node}{"\n"}</span>);
  });
  return out;
}

function inlineMd(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    p.startsWith("**") ? <span key={i} className="tk-b">{p}</span> : p.startsWith("`") ? <span key={i} className="tk-s">{p}</span> : p,
  );
}

export function highlightJson(src: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0, key = 0;
  for (const m of src.matchAll(/("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null|\d+(?:\.\d+)?)\b/g)) {
    const i = m.index ?? 0;
    if (i > last) out.push(src.slice(last, i));
    if (m[1]) out.push(<span key={key++} className={m[2] ? "tk-h" : "tk-s"}>{m[1]}</span>, m[2] ?? "");
    else out.push(<span key={key++} className="tk-n">{m[0]}</span>);
    last = i + m[0].length;
  }
  if (last < src.length) out.push(src.slice(last));
  return out;
}
