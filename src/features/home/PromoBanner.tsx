import { Link } from "react-router-dom";
import { kidsImages, menImages, pick, womenImages } from "./images";
import styles from "./PromoBanner.module.scss";

/** Keng e'lon banneri: chapda matn, o'ngda 3 ta rasm kollaji */
export function PromoBanner() {
  const collage = [
    pick(womenImages, 2),
    pick(menImages, 2),
    pick(kidsImages, 5),
  ].filter((src): src is string => Boolean(src));

  return (
    <section className={styles.banner}>
      <div className={styles.text}>
        <span className={styles.eyebrow}>Yangi mavsum</span>
        <h2 className={styles.title}>Kuz — qish kolleksiyasi</h2>
        <p className={styles.desc}>
          Issiq kurtkalar, ko'ylaklar va ularni o'zingiz tikishingiz uchun
          andozalar — hammasi bir joyda.
        </p>
        <div className={styles.buttons}>
          <Link to="/clothes" className={styles.primary}>
            Kiyimlarni ko'rish
          </Link>
          <Link to="/patterns" className={styles.secondary}>
            Andozalar
          </Link>
        </div>
      </div>

      <div className={styles.collage} aria-hidden="true">
        {collage.map((src, i) => (
          <span key={i} className={styles.frame}>
            <img src={src} alt="" loading="lazy" className={styles.img} />
          </span>
        ))}
      </div>
    </section>
  );
}
