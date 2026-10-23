import type { Metadata } from "next";
import { Archivo, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "프로젝트 소개", template: "%s · 프로젝트 소개" },
  description: "Claude 기반 프로젝트 세 가지: 뉴스 보고서 PDF 생성 스킬, 동국대 챗봇 에이전트, HR 리스크 분석 대시보드 플러그인",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${noto.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
