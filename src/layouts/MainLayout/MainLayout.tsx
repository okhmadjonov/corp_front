import { useState, type FormEvent } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiHeart, FiSearch, FiUser } from "react-icons/fi";
import { Button } from "@/components/Button/Button";
import { useAuth } from "@/features/auth/useAuth";
import styles from "./MainLayout.module.scss";

function SearchForm({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = q.trim();
    navigate(value ? `/clothes?q=${encodeURIComponent(value)}` : "/clothes");
    onDone?.();
  };

  return (
    <form className={styles.search} role="search" onSubmit={submit}>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Qidirish…"
        aria-label="Kiyimlarni qidirish"
      />
      <button type="submit" aria-label="Qidirish">
        <FiSearch aria-hidden="true" />
      </button>
    </form>
  );
}

export default function MainLayout() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  // sessiya tekshirilayotganda "Kirish" tugmasi miltillamasin
  const authLinks = loading ? null : user ? (
    <>
      <Link to="/profile" className={styles.topLink} onClick={close}>
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
      <Link to="/login" className={styles.topLink} onClick={close}>
        Kirish
      </Link>
      <span className={styles.sep} aria-hidden="true">
        /
      </span>
      <Link to="/register" className={styles.topLink} onClick={close}>
        Ro'yxatdan o'tish
      </Link>
    </>
  );

  return (
    <div className={styles.shell}>
      {/* 1-qavat: ingichka yuqori panel (faqat desktop) */}
      <div className={styles.topbar}>
        <div className={styles.topInner}>
          <span className={styles.tagline}>
            Tayyor kiyimlar va tikish uchun andozalar
          </span>
          <div className={styles.topRight}>
            <SearchForm />
            <div className={styles.auth}>{authLinks}</div>
          </div>
        </div>
      </div>

      {/* 2-qavat: logo + menyu (sticky) */}
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} onClick={close}>
            CORP
          </Link>

          <div
            className={open ? `${styles.menu} ${styles.menuOpen}` : styles.menu}
          >
            <div className={styles.mobileOnly}>
              <SearchForm onDone={close} />
            </div>

            <nav className={styles.nav}>
              <NavLink to="/" end className={linkClass} onClick={close}>
                Bosh sahifa
              </NavLink>
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

            <div className={`${styles.actions} ${styles.mobileOnly}`}>
              {authLinks}
            </div>
          </div>

          <div className={styles.icons}>
            {user && (
              <Link
                to="/favorites"
                className={styles.iconBtn}
                aria-label="Sevimlilar"
                onClick={close}
              >
                <FiHeart aria-hidden="true" />
              </Link>
            )}
            <Link
              to={user ? "/profile" : "/login"}
              className={styles.iconBtn}
              aria-label={user ? "Profil" : "Kirish"}
              onClick={close}
            >
              <FiUser aria-hidden="true" />
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
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Link to="/" className={styles.logo}>
              CORP
            </Link>
            <p>
              Ayollar, erkaklar va bolalar uchun tayyor kiyimlar hamda ularni
              o'zingiz tikishingiz uchun andozalar.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>Katalog</h4>
            <Link to="/clothes">Kiyimlar</Link>
            <Link to="/patterns">Patternlar</Link>
            <Link to="/clothes?sort=popular">Ommabop</Link>
          </div>

          <div className={styles.footerCol}>
            <h4>Akkaunt</h4>
            {user ? (
              <>
                <Link to="/profile">Profil</Link>
                <Link to="/favorites">Sevimlilar</Link>
              </>
            ) : (
              <>
                <Link to="/login">Kirish</Link>
                <Link to="/register">Ro'yxatdan o'tish</Link>
              </>
            )}
          </div>
        </div>

        <div className={styles.copy}>
          © {new Date().getFullYear()} Corp. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
}
