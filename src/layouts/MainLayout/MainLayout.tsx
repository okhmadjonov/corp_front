import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { useAuth } from "@/features/auth/useAuth";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} onClick={close}>
            CORP
          </Link>

          <button
            type="button"
            className={styles.burger}
            aria-label="Menyu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              {open ? (
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          <div
            className={open ? `${styles.menu} ${styles.menuOpen}` : styles.menu}
          >
            <nav className={styles.nav}>
              <NavLink to="/clothes" className={linkClass} onClick={close}>
                Kiyimlar
              </NavLink>
              <NavLink to="/patterns" className={linkClass} onClick={close}>
                Patternlar
              </NavLink>
              {user && (
                <NavLink to="/favorites" className={linkClass} onClick={close}>
                  Sevimlilar
                </NavLink>
              )}
            </nav>

            <div className={styles.actions}>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className={styles.userName}
                    onClick={close}
                  >
                    {user.full_name}
                  </Link>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      close();
                      logout();
                    }}
                  >
                    Chiqish
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className={styles.link} onClick={close}>
                    Kirish
                  </Link>
                  <Link to="/register" className={styles.cta} onClick={close}>
                    Ro'yxatdan o'tish
                  </Link>
                </>
              )}
            </div>
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
