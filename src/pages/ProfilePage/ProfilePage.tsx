import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { useAuth } from "@/features/auth/useAuth";
import { useFavorites } from "@/features/favorites/useFavorites";
import styles from "./ProfilePage.module.scss";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { ids } = useFavorites();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Profil</h1>

      <div className={styles.card}>
        <div className={styles.avatar}>
          {user?.full_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className={styles.name}>{user?.full_name}</div>
          <div className={styles.login}>@{user?.login}</div>
        </div>
      </div>

      <div className={styles.stats}>
        <Link to="/favorites" className={styles.stat}>
          <strong>{ids?.clothes_ids.length ?? 0}</strong>
          <span>Sevimli kiyimlar</span>
        </Link>
        <Link to="/favorites" className={styles.stat}>
          <strong>{ids?.pattern_ids.length ?? 0}</strong>
          <span>Sevimli patternlar</span>
        </Link>
      </div>

      <Button variant="secondary" onClick={logout}>
        Chiqish
      </Button>
    </div>
  );
}
