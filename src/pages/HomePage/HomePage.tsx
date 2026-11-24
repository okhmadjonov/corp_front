import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Nimani qidiryapsiz?</h1>
      <p className={styles.subtitle}>
        Tayyor kiyimlar yoki o'zingiz tikish uchun andozalar (patternlar)
      </p>

      <div className={styles.choices}>
        <Link to="/clothes" className={`${styles.choice} ${styles.dark}`}>
          <span className={styles.choiceTitle}>Kiyimlar</span>
          <span className={styles.choiceText}>
            Ayollar, erkaklar va bolalar uchun tayyor kiyimlar
          </span>
          <span className={styles.arrow}>Ko'rish →</span>
        </Link>

        <Link to="/patterns" className={`${styles.choice} ${styles.light}`}>
          <span className={styles.choiceTitle}>Patternlar</span>
          <span className={styles.choiceText}>
            Kiyim tikish uchun andozalar va chizmalar
          </span>
          <span className={styles.arrow}>Ko'rish →</span>
        </Link>
      </div>
    </div>
  );
}
