import styles from "./ProductGridSkeleton.module.scss";

interface Props {
  className?: string;
  count?: number;
}

export function ProductGridSkeleton({ className, count = 8 }: Props) {
  return (
    <div className={className} aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={`${styles.block} ${styles.image}`} />
          <div className={`${styles.block} ${styles.line}`} />
          <div className={`${styles.block} ${styles.line} ${styles.short}`} />
        </div>
      ))}
    </div>
  );
}
