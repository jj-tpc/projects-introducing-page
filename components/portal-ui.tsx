import Link from "next/link";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const IconBack = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M15 5l-7 7 7 7" /></svg>
);
export const IconForward = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconBackLong = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const IconDownload = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M12 4v12M7 11l5 5 5-5M5 20h14" /></svg>
);

export function Topbar({ status }: { status: React.ReactNode }) {
  return (
    <div className="topbar">
      <Link className="label" href="/"><IconBack />프로젝트 소개</Link>
      <span className="label">{status}</span>
    </div>
  );
}

export function SectionIndex({ items }: { items: Array<[string, string, string]> }) {
  return (
    <>
      <ul className="index" data-index aria-label="페이지 색인">
        {items.map(([id, n, t], i) => (
          <li key={id}>
            <a href={`#${id}`} className={i === 0 ? "on" : undefined}>
              <span className="n">{n}</span>
              <span className="t">{t}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="scrollrail" aria-hidden="true">
        <span className="label">Scroll</span>
        <span className="bar" />
      </div>
    </>
  );
}

export function SectionHead({ en, ko, meta, top }: { en: string; ko: string; meta: string; top?: boolean }) {
  return (
    <div className="section-head" style={top ? { marginTop: 56 } : undefined}>
      <h2>
        {en}
        <span className="ko">{ko}</span>
      </h2>
      <span className="label">{meta}</span>
    </div>
  );
}

export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <span className="label">Loader</span>
      <div className="num">
        <span data-loader>00</span>
        <small>%</small>
      </div>
    </div>
  );
}
