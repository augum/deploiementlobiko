import { api } from "@/services/api";

// Conforme à documentation4.json : schéma "utilisateur"
// Requête : { id, nom, postnom, prenom, login, password, id_role }
// Réponse : peut contenir un objet "role" { id, libelle }
export interface Utilisateur {
  id?: number;
  nom: string;
  postnom?: string;
  prenom?: string;
  login: string;
  password?: string;
  id_role?: number;
  role?: { id?: number; libelle?: string } | null;
}

export type UtilisateurPayload = Omit<Utilisateur, "role">;

export const utilisateurService = {
  list: () => api.get<Utilisateur[]>("/api/utilisateurs").then((r) => r.data),
  get: (id: number) => api.get<Utilisateur>(`/api/utilisateurs/${id}`).then((r) => r.data),
  create: (data: UtilisateurPayload) =>
    api.post<Utilisateur>("/api/utilisateurs", data).then((r) => r.data),
  update: (id: number, data: UtilisateurPayload) =>
    api.put<Utilisateur>(`/api/utilisateurs/${id}`, data).then((r) => r.data),
};
