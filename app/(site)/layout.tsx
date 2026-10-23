import SiteNav from "@/components/SiteNav";
import styles from "./site.module.css";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <SiteNav />
      {children}
    </div>
  );
}
