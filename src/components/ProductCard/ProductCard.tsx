import { Link } from "react-router-dom";
import { mediaUrl } from "@/utils/media";
import styles from "./ProductCard.module.scss";

interface Props {
  to: string;
  image?: string | null;
  title: string;
  brand?: string | null;
  meta?: string;
  price: string;
}

export function ProductCard({ to, image, title, brand, meta, price }: Props) {
  const src = mediaUrl(image);

  return (
    <Link to={to} className={styles.card}>
      <div className={styles.imageWrap}>
        {src ? (
          <img src={src} alt={title} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>Rasm yo'q</div>
        )}
      </div>
      <div className={styles.info}>
        {brand && <div className={styles.brand}>{brand}</div>}
        <div className={styles.title}>{title}</div>
        {meta && <div className={styles.meta}>{meta}</div>}
        <div className={styles.price}>{price}</div>
      </div>
    </Link>
  );
}
