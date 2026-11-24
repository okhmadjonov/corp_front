import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { useAuth } from "@/features/auth/useAuth";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            CORP
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/clothes" className={linkClass}>
              Kiyimlar
            </NavLink>
            <NavLink to="/patterns" className={linkClass}>
              Patternlar
            </NavLink>
            {user && (
              <NavLink to="/favorites" className={linkClass}>
                Sevimlilar
              </NavLink>
            )}
          </nav>

          <div className={styles.actions}>
            {user ? (
              <>
                <Link to="/profile" className={styles.userName}>
                  {user.full_name}
                </Link>
                <Button size="sm" variant="secondary" onClick={logout}>
                  Chiqish
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.link}>
                  Kirish
                </Link>
                <Link to="/register" className={styles.cta}>
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Corp
      </footer>
    </div>
  );
}
