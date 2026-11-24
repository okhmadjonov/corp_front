import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { refreshAccessToken } from "@/api/client";
import { session } from "@/api/session";
import type { Tokens, User } from "@/types/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  // cookie bor-yo'qligini JS bilmaydi, shuning uchun har ochilishda tekshiramiz
  const [loading, setLoading] = useState(true);

  const endSession = useCallback(() => {
    session.set(null);
    qc.removeQueries({ queryKey: ["favorites"] }); // katalog keshi umumiy, qoladi
    setUser(null);
  }, [qc]);

  // sahifa ochilganda: httpOnly cookie orqali access token olib, foydalanuvchini tiklaydi
  useEffect(() => {
    let cancelled = false;

    refreshAccessToken()
      .then(() => authApi.me())
      .then((me) => {
        if (!cancelled) setUser(me);
      })
      .catch(() => session.set(null)) // cookie yo'q — mehmon sifatida davom etadi
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // sessiya (refresh cookie) tugasa, axios klienti shu hodisani yuboradi
  useEffect(() => {
    window.addEventListener("auth:expired", endSession);
    return () => window.removeEventListener("auth:expired", endSession);
  }, [endSession]);

  const startSession = useCallback(
    async (tokens: Tokens) => {
      session.set(tokens.access_token);
      qc.removeQueries({ queryKey: ["favorites"] }); // boshqa akkauntning sevimlilari qolmasin
      setUser(await authApi.me());
    },
    [qc],
  );

  const login = useCallback(
    async (loginName: string, password: string) =>
      startSession(await authApi.login(loginName, password)),
    [startSession],
  );

  const register = useCallback(
    async (loginName: string, password: string, fullName: string) =>
      startSession(await authApi.register(loginName, password, fullName)),
    [startSession],
  );

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => undefined);
    endSession();
  }, [endSession]);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
