"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/(site)/site.module.css";

export const MENU = [
  { href: "/", label: "소개" },
  { href: "/keywords", label: "핵심 키워드" },
  { href: "/examples", label: "산출물 예시" },
] as const;

export default function SiteNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <nav className={styles.nav} aria-label="주 메뉴">
      <Link className={styles.brand} href="/">The Prompt Company</Link>
      <ul className={styles.menu}>
        {MENU.map((m) => (
          <li key={m.href}>
            <Link href={m.href} aria-current={isActive(m.href) ? "page" : undefined}>{m.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
