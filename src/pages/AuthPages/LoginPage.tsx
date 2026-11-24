import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "@/features/auth/useAuth";
import { getErrorMessage } from "@/utils/errors";
import styles from "./AuthPage.module.scss";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLoc = (
    location.state as {
      from?: { pathname: string; search?: string; hash?: string };
    } | null
  )?.from;
  const from = fromLoc
    ? `${fromLoc.pathname}${fromLoc.search ?? ""}${fromLoc.hash ?? ""}`
    : "/";

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to={from} replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(loginValue.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) {
        setError("Login yoki parol noto'g'ri");
      } else {
        setError(getErrorMessage(err));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={onSubmit}>
        <h1 className={styles.title}>Kirish</h1>

        <label className={styles.field}>
          <span>Login</span>
          <input
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            autoComplete="username"
            autoFocus
            required
          />
        </label>

        <label className={styles.field}>
          <span>Parol</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting ? "Kirilmoqda..." : "Kirish"}
        </button>

        <p className={styles.switch}>
          Akkauntingiz yo'qmi? <Link to="/register">Ro'yxatdan o'tish</Link>
        </p>
      </form>
    </div>
  );
}
