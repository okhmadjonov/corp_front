import type { FavoriteKind } from "@/api/favorites";
import { useFavorites } from "./useFavorites";
import styles from "./FavoriteButton.module.scss";

interface Props {
  kind: FavoriteKind;
  id: number;
}

export function FavoriteButton({ kind, id }: Props) {
  const { has, toggle } = useFavorites();
  const active = has(kind, id);

  return (
    <button
      type="button"
      className={active ? `${styles.btn} ${styles.active}` : styles.btn}
      aria-pressed={active}
      aria-label={
        active ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"
      }
      onClick={() => toggle(kind, id)}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M12 21s-7-4.35-9.5-8.5C.5 9 2.5 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 6 4 4 7.5C19 16.65 12 21 12 21z"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
