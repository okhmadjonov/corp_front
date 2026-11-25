import { TbCreditCard, TbRuler2, TbScissors } from "react-icons/tb";
import styles from "./InfoTiles.module.scss";

const ITEMS = [
  {
    icon: TbRuler2,
    title: "O'lchamni qanday tanlash",
    text: "Ko'krak, bel va son aylanasini o'lchang — jadvaldan eng yaqin o'lchamni tanlang.",
  },
  {
    icon: TbCreditCard,
    title: "Qanday to'lash mumkin",
    text: "To'lov usullari va to'lovdan keyin andoza faylini qanday olishingiz haqida.",
  },
  {
    icon: TbScissors,
    title: "Andoza bilan ishlash",
    text: "PDF faylni A4 da chop eting, varaqlarni belgilar bo'yicha yopishtiring va qirqing.",
  },
];

export function InfoTiles() {
  return (
    <div className={styles.grid}>
      {ITEMS.map(({ icon: Icon, title, text }) => (
        <article key={title} className={styles.tile}>
          <Icon className={styles.icon} aria-hidden="true" />
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>{text}</p>
        </article>
      ))}
    </div>
  );
}
