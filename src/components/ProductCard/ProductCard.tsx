import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SmartImage } from "@/components/SmartImage/SmartImage";
import { mediaUrl } from "@/utils/media";
import styles from "./ProductCard.module.scss";

interface Props {
  to: string;
  image?: string | null;
  title: string;
  brand?: string | null;
  meta?: string;
  price?: string;
  action?: ReactNode;
}

export function ProductCard({
  to,
  image,
  title,
  brand,
  meta,
  price,
  action,
}: Props) {
  return (
    <div className={styles.card}>
      <Link to={to} className={styles.link}>
        <SmartImage src={image ? mediaUrl(image) : null} alt={title} />
        <div className={styles.body}>
          {brand && <span className={styles.brand}>{brand}</span>}
          <h3 className={styles.title}>{title}</h3>
          {meta && <span className={styles.meta}>{meta}</span>}
          {price && <span className={styles.price}>{price}</span>}
        </div>
      </Link>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
