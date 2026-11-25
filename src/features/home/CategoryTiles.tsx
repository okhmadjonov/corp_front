import { Link } from "react-router-dom";
import { kidsImages, menImages, pick, womenImages } from "./images";
import { useGenderLink } from "./useGenderLink";
import styles from "./CategoryTiles.module.scss";

export function CategoryTiles() {
  const genderLink = useGenderLink();

  const tiles = [
    { title: "Ayollar uchun", to: genderLink("women"), image: pick(womenImages, 1) },
    { title: "Erkaklar uchun", to: genderLink("men"), image: pick(menImages, 3) },
    { title: "Bolalar uchun", to: genderLink("kids"), image: pick(kidsImages, 3) },
    { title: "Andozalar", to: "/patterns", image: pick(womenImages, 0) },
  ];

  return (
    <section className={styles.grid} aria-label="Kategoriyalar">
      {tiles.map((t, i) => (
        <Link key={t.title} to={t.to} className={styles.tile}>
          {t.image && (
            <img
              src={t.image}
              alt=""
              className={styles.img}
              loading={i < 2 ? "eager" : "lazy"}
            />
          )}
          <span className={styles.label}>{t.title}</span>
        </Link>
      ))}
    </section>
  );
}
