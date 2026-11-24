import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { tokenStorage } from "@/utils/tokenStorage";
import type { Tokens, User } from "@/types/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() =>
    Boolean(tokenStorage.getAccess()),
  );

  // sahifa yangilanganda token bo'yicha foydalanuvchini tiklaydi
  useEffect(() => {
    if (!tokenStorage.getAccess()) return;
    let cancelled = false;

    authApi
      .me()
      .then((me) => {
        if (!cancelled) setUser(me);
      })
      .catch(() => tokenStorage.clear())
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // sessiya (refresh token) tugasa, axios klienti shu hodisani yuboradi
  useEffect(() => {
    const onExpired = () => {
      qc.removeQueries({ queryKey: ["favorites"] });
      setUser(null);
    };
    window.addEventListener("auth:expired", onExpired);
    return () => window.removeEventListener("auth:expired", onExpired);
  }, [qc]);

  const startSession = useCallback(async (tokens: Tokens) => {
    tokenStorage.set(tokens.access_token, tokens.refresh_token);
    qc.removeQueries({ queryKey: ["favorites"] }); // boshqa akkauntning sevimlilari qolmasin
    setUser(await authApi.me());
  }, [qc]);

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
    const refresh = tokenStorage.getRefresh();
    if (refresh) await authApi.logout(refresh).catch(() => undefined);
    tokenStorage.clear();
    qc.removeQueries({ queryKey: ["favorites"] });
    setUser(null);
  }, [qc]);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
