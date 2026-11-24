import { useMemo, useState } from "react";
import { SmartImage } from "@/components/SmartImage/SmartImage";
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

  if (sorted.length === 0) {
    return (
      <div className={styles.gallery}>
        <SmartImage src={null} alt={alt} ratio="3 / 4" />
      </div>
    );
  }

  const safeIndex = Math.min(index, sorted.length - 1);
  const current = sorted[safeIndex];
  const many = sorted.length > 1;

  const prev = () => setIndex((safeIndex - 1 + sorted.length) % sorted.length);
  const next = () => setIndex((safeIndex + 1) % sorted.length);

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <SmartImage
          src={mediaUrl(current.url)}
          alt={alt}
          ratio="3 / 4"
          priority
        />

        {many && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.left}`}
              onClick={prev}
              aria-label="Oldingi rasm"
            >
              ‹
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.right}`}
              onClick={next}
              aria-label="Keyingi rasm"
            >
              ›
            </button>
            <span className={styles.counter}>
              {safeIndex + 1} / {sorted.length}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className={styles.thumbs}>
          {sorted.map((img, i) => (
            <button
              key={img.id}
              type="button"
              className={
                i === safeIndex
                  ? `${styles.thumb} ${styles.active}`
                  : styles.thumb
              }
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}-rasm`}
            >
              <SmartImage
                src={mediaUrl(img.thumb_url ?? img.url)}
                alt=""
                ratio="1 / 1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
