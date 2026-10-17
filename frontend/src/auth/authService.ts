import { api } from "@/services/api";
import type { Utilisateur } from "@/app/configuration/services/utilisateurService";

// Connexion gérée entièrement côté interface :
// on récupère tous les utilisateurs (GET /api/utilisateurs) puis on vérifie
// que le couple login / mot de passe saisi correspond à un utilisateur.
// La session est conservée dans sessionStorage (onglet courant uniquement).
export interface AuthUser {
  id: number;
  login: string;
  nom?: string;
  prenom?: string;
  role?: { id?: number; libelle?: string } | null;
  roles?: { id?: number; libelle?: string }[];
}

const SESSION_KEY = "medicare_auth_user";
const opts = { skipErrorToast: true } as any;

function toAuthUser(u: Utilisateur): AuthUser {
  return { id: u.id!, login: u.login, nom: u.nom, prenom: u.prenom, role: u.role ?? null };
}

// Erreur avec statut 401 simulé : la page de connexion affiche
// « Login ou mot de passe incorrect ».
function invalidCredentials(): never {
  throw { response: { status: 401, data: null }, isAxiosError: true };
}

export const authService = {
  login: async (login: string, password: string): Promise<AuthUser> => {
    const users = await api.get<Utilisateur[]>("/api/utilisateurs", opts).then((r) => r.data);
    const match = (users ?? []).find(
      (u) => u.login?.trim().toLowerCase() === login.toLowerCase() && u.password === password
    );
    if (!match) invalidCredentials();
    const authUser = toAuthUser(match);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    return authUser;
  },
  me: (): Promise<AuthUser> => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return Promise.reject({ response: { status: 401 } });
    try {
      return Promise.resolve(JSON.parse(raw) as AuthUser);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
      return Promise.reject({ response: { status: 401 } });
    }
  },
  logout: (): Promise<void> => {
    sessionStorage.removeItem(SESSION_KEY);
    return Promise.resolve();
  },
};

export function rolesOf(u: AuthUser | null): string[] {
  if (!u) return [];
  const list = [u.role, ...(u.roles ?? [])]
    .map((r) => r?.libelle?.toUpperCase().replace(/^ROLE_/, ""))
    .filter(Boolean) as string[];
  return Array.from(new Set(list));
}
