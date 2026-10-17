import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authService, rolesOf, type AuthUser } from "./authService";

type Permission = "configuration" | "delete";

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  can: (p: Permission) => boolean;
  login: (login: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  expire: () => void;
}

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.me().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  const expire = useCallback(() => {
    setUser((u) => {
      if (u) sessionStorage.setItem("auth_expired", "1");
      return null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("auth:expired", expire);
    return () => window.removeEventListener("auth:expired", expire);
  }, [expire]);

  // Vérifie la session régulièrement et au retour sur l'onglet,
  // pour déconnecter même si l'utilisateur ne fait aucune action.
  useEffect(() => {
    if (!user) return;
    const check = () =>
      authService.me().catch((e) => {
        if (e?.response?.status === 401) expire();
      });
    const id = window.setInterval(check, 60_000);
    const onVisible = () => document.visibilityState === "visible" && check();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [user, expire]);

  const value = useMemo<AuthState>(() => {
    const isAdmin = rolesOf(user).includes("ADMIN");
    return {
      user,
      loading,
      isAdmin,
      // ADMIN : tout. USER : pas de configuration ni de suppression.
      can: () => isAdmin,
      login: async (l, p) => {
        const u = await authService.login(l, p);
        setUser(u);
        return u;
      },
      logout: async () => {
        try { await authService.logout(); } catch { /* session déjà fermée */ }
        setUser(null);
      },
      expire,
    };
  }, [user, loading, expire]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return c;
}
