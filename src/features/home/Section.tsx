import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import styles from "./Section.module.scss";

interface Props {
  title: string;
  moreTo?: string;
  moreLabel?: string;
  children: ReactNode;
}

/** Bosh sahifa bo'limi: markazlashgan sarlavha + "Hammasi" havolasi */
export function Section({ title, moreTo, moreLabel = "Hammasi", children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        {moreTo && (
          <Link to={moreTo} className={styles.more}>
            {moreLabel} <FiArrowRight aria-hidden="true" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
