import { useState } from "react";
import { Link } from "react-router-dom";
import { kidsImages, menImages, womenImages } from "./images";
import { type GenderKey, useGenderLink } from "./useGenderLink";
import styles from "./Lookbook.module.scss";

const TABS: { key: GenderKey; label: string; images: string[] }[] = [
  { key: "women", label: "Ayollar", images: womenImages },
  { key: "men", label: "Erkaklar", images: menImages },
  { key: "kids", label: "Bolalar", images: kidsImages },
];

/** Jins bo'yicha tablar va gorizontal aylantiriladigan rasm lentasi */
export function Lookbook() {
  const [active, setActive] = useState<GenderKey>("women");
  const genderLink = useGenderLink();
  const tab = TABS.find((t) => t.key === active)!;

  return (
    <div>
      <div className={styles.tabs} role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={t.key === active}
            className={t.key === active ? `${styles.tab} ${styles.on}` : styles.tab}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.strip} role="tabpanel">
        {tab.images.map((src, i) => (
          <Link
            key={src}
            to={genderLink(tab.key)}
            className={styles.item}
            aria-label={`${tab.label} kiyimlari, ${i + 1}-rasm`}
          >
            <img src={src} alt="" loading="lazy" className={styles.img} />
          </Link>
        ))}
      </div>
    </div>
  );
}
