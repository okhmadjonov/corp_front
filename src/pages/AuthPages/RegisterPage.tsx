import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FullPageLoader } from "@/components/FullPageLoader/FullPageLoader";
import { useAuth } from "@/features/auth/useAuth";
import { getErrorMessage } from "@/utils/errors";
import styles from "./AuthPage.module.scss";

export default function RegisterPage() {
  const { user, loading, register } = useAuth();
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

  const [fullName, setFullName] = useState("");
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <FullPageLoader />;
  if (user) return <Navigate to={from} replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Parollar bir xil emas");
      return;
    }
    setSubmitting(true);
    try {
      await register(loginValue.trim(), password, fullName.trim());
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={onSubmit}>
        <h1 className={styles.title}>Ro'yxatdan o'tish</h1>

        <label className={styles.field}>
          <span>To'liq ismingiz</span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            minLength={2}
            maxLength={150}
            autoFocus
            required
          />
        </label>

        <label className={styles.field}>
          <span>Login</span>
          <input
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            minLength={3}
            maxLength={100}
            autoComplete="username"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Parol</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            maxLength={72}
            autoComplete="new-password"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Parolni takrorlang</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
        </button>

        <p className={styles.switch}>
          Akkauntingiz bormi? <Link to="/login">Kirish</Link>
        </p>
      </form>
    </div>
  );
}
