"use client";

import { useMemo, useState } from "react";
import { highlightJson, highlightMarkdown, highlightPython } from "@/lib/highlight";

export type FinderFile = { path: string; lang: "markdown" | "python" | "json" | "toml"; content: string; note?: string };

type Node = { name: string; path: string; kind: "dir" | "file"; children?: Node[]; file?: FinderFile };

function buildTree(files: FinderFile[]): Node[] {
  const root: Node[] = [];
  for (const f of files) {
    const parts = f.path.split("/");
    let level = root;
    let acc = "";
    parts.forEach((part, i) => {
      acc = acc ? `${acc}/${part}` : part;
      const last = i === parts.length - 1;
      let node = level.find((n) => n.name === part && n.kind === (last ? "file" : "dir"));
      if (!node) {
        node = last ? { name: part, path: acc, kind: "file", file: f } : { name: part, path: acc, kind: "dir", children: [] };
        level.push(node);
      }
      if (!last) level = node.children!;
    });
  }
  const sort = (nodes: Node[]) => {
    nodes.sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === "dir" ? -1 : 1));
    nodes.forEach((n) => n.children && sort(n.children));
  };
  sort(root);
  return root;
}

const KIND: Record<string, string> = { md: "Markdown 문서", py: "Python 소스", json: "JSON", toml: "TOML 설정" };

function ext(name: string) { return name.split(".").pop() || ""; }

function FileIcon({ name, open }: { name: string; open?: boolean }) {
  const e = ext(name);
  if (e === "py") return <span className="fi fi-py">PY</span>;
  if (e === "json" || e === "toml") return <span className="fi fi-cfg">{"{}"}</span>;
  if (e === "md") return <span className="fi fi-md">MD</span>;
  return <span className="fi">{open ? "▾" : "▸"}</span>;
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg className="fo" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d={open ? "M3 7h7l2 2h9v10H3z M3 11h18" : "M3 7h7l2 2h9v10H3z"} />
    </svg>
  );
}

export default function FileFinder({ files, root = "hr-attrition", initial }: { files: FinderFile[]; root?: string; initial?: string }) {
  const tree = useMemo(() => buildTree(files), [files]);
  const first = initial ?? files[0]?.path;
  const [selected, setSelected] = useState<string>(first);
  const [open, setOpen] = useState<Set<string>>(() => {
    const s = new Set<string>();
    first?.split("/").slice(0, -1).reduce((acc, p) => { const n = acc ? `${acc}/${p}` : p; s.add(n); return n; }, "");
    return s;
  });
  const current = files.find((f) => f.path === selected);

  const toggle = (p: string) => setOpen((prev) => { const n = new Set(prev); n.has(p) ? n.delete(p) : n.add(p); return n; });

  const renderNodes = (nodes: Node[], depth: number) =>
    nodes.map((n) =>
      n.kind === "dir" ? (
        <li key={n.path}>
          <button type="button" className="row dir" style={{ paddingLeft: 12 + depth * 14 }} onClick={() => toggle(n.path)} aria-expanded={open.has(n.path)}>
            <span className="chev">{open.has(n.path) ? "▾" : "▸"}</span>
            <FolderIcon open={open.has(n.path)} />
            <span className="nm">{n.name}</span>
          </button>
          {open.has(n.path) && <ul>{renderNodes(n.children!, depth + 1)}</ul>}
        </li>
      ) : (
        <li key={n.path}>
          <button type="button" className={selected === n.path ? "row file on" : "row file"} style={{ paddingLeft: 30 + depth * 14 }} onClick={() => setSelected(n.path)} aria-current={selected === n.path ? "true" : undefined}>
            <FileIcon name={n.name} />
            <span className="nm">{n.name}</span>
          </button>
        </li>
      ),
    );

  const body = current
    ? current.lang === "python" || current.lang === "toml" ? highlightPython(current.content) : current.lang === "json" ? highlightJson(current.content) : highlightMarkdown(current.content)
    : null;
  const lines = current ? current.content.split("\n").length : 0;
  const crumbs = current ? [root, ...current.path.split("/")] : [root];

  return (
    <div className="finder" role="region" aria-label="플러그인 파일 탐색기">
      <div className="finder-title">
        <span className="lights" aria-hidden="true"><i /><i /><i /></span>
        <span className="ttl">{root}</span>
        <span className="cnt">{files.length} files</span>
      </div>
      <div className="finder-crumbs" aria-label="경로">
        {crumbs.map((c, i) => (
          <span key={i} className="crumb">{i > 0 && <span className="sep">›</span>}{c}</span>
        ))}
      </div>
      <div className="finder-body">
        <nav className="finder-side" aria-label="파일 목록">
          <ul>{renderNodes(tree, 0)}</ul>
        </nav>
        <div className="finder-main">
          {current && (
            <>
              <div className="finder-meta">
                <FileIcon name={current.path} />
                <span className="nm">{current.path.split("/").pop()}</span>
                <span className="kind">{KIND[ext(current.path)] ?? current.lang} · {lines} lines{current.note ? ` · ${current.note}` : ""}</span>
              </div>
              <pre className="finder-code"><code>{body}</code></pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
