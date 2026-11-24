import { useMemo, useState } from "react";
import type { GalleryImage } from "@/types/catalog";
import { mediaUrl } from "@/utils/media";
import styles from "./ImageGallery.module.scss";

interface Props {
  images: GalleryImage[];
  alt: string;
}

export function ImageGallery({ images, alt }: Props) {
  const sorted = useMemo(
    () =>
      [...images].sort(
        (a, b) =>
          Number(b.is_main) - Number(a.is_main) ||
          a.sort_order - b.sort_order ||
          a.id - b.id,
      ),
    [images],
  );
  const [index, setIndex] = useState(0);

  if (sorted.length === 0) return <div className={styles.empty}>Rasm yo'q</div>;

  const current = sorted[Math.min(index, sorted.length - 1)];

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <img src={mediaUrl(current.url)} alt={alt} />
      </div>

      {sorted.length > 1 && (
        <div className={styles.thumbs}>
          {sorted.map((img, i) => (
            <button
              key={img.id}
              type="button"
              className={
                i === index ? `${styles.thumb} ${styles.active}` : styles.thumb
              }
              onClick={() => setIndex(i)}
            >
              <img src={mediaUrl(img.url)} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
