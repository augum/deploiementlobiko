import { api } from "./api";
import type {
  Specialite,
  Hopital,
  Banque,
  Medecin,
  AssociationItem,
  HopitalSpecialite,
} from "@/types/models";

// SPECIALITES
export const specialiteService = {
  list: () => api.get<Specialite[]>("/api/specialites").then((r) => r.data),
  get: (id: number) =>
    api.get<Specialite>(`/api/specialites/${id}`).then((r) => r.data),
  create: (data: Specialite) =>
    api.post<Specialite>("/api/specialites", data).then((r) => r.data),
  update: (id: number, data: Specialite) =>
    api.put<Specialite>(`/api/specialites/${id}`, data).then((r) => r.data),
};

// Helper: multipart upload conforming to swagger (field name = "file")
const uploadPhoto = (path: string) =>
  (id: number, file: File, onProgress?: (p: number) => void) => {
    const form = new FormData();
    form.append("file", file);
    return api.post(`${path}/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress && e.total)
          onProgress(Math.round((e.loaded * 100) / e.total));
      },
    });
  };

// HOPITAUX
export const hopitalService = {
  list: () => api.get<Hopital[]>("/api/hopitals").then((r) => r.data),
  get: (id: number) =>
    api.get<Hopital>(`/api/hopitals/${id}`).then((r) => r.data),
  create: (data: Hopital) =>
    api.post<Hopital>("/api/hopitals", data).then((r) => r.data),
  update: (id: number, data: Hopital) =>
    api.put<Hopital>(`/api/hopitals/${id}`, data).then((r) => r.data),
  uploadPhoto: uploadPhoto("/api/hopitals"),
};

// BANQUES
export const banqueService = {
  list: () => api.get<Banque[]>("/api/banques").then((r) => r.data),
  // Swagger n'expose PAS de GET /api/banques/{id} : on récupère via la liste.
  get: async (id: number) => {
    const all = await api.get<Banque[]>("/api/banques").then((r) => r.data);
    const found = all.find((b) => Number(b.id) === Number(id));
    if (!found) throw new Error("Banque introuvable");
    return found;
  },
  create: (data: Banque) =>
    api.post<Banque>("/api/banques", data).then((r) => r.data),
  update: (id: number, data: Banque) =>
    api.put<Banque>(`/api/banques/${id}`, data).then((r) => r.data),
  uploadPhoto: uploadPhoto("/api/banques"),
};

// MEDECINS
export const medecinService = {
  list: () => api.get<Medecin[]>("/api/medecins").then((r) => r.data),
  get: async (id: number) => {
    try {
      const r = await api.get<Medecin | Medecin[]>(`/api/medecins/${id}`);
      const d = r.data;
      const found = Array.isArray(d) ? d[0] : d;
      if (found && (found as any).nom !== undefined) return found as Medecin;
    } catch {
      /* fallback via list */
    }
    const all = await api.get<Medecin[]>("/api/medecins").then((r) => r.data);
    const found = all.find((m) => Number(m.id) === Number(id));
    if (!found) throw new Error("Médecin introuvable");
    return found;
  },
  create: (data: Medecin) =>
    api.post<Medecin>("/api/medecins", data).then((r) => r.data),
  update: (id: number, data: Medecin) =>
    api.put<Medecin>(`/api/medecins/${id}`, data).then((r) => r.data),
  uploadPhoto: uploadPhoto("/api/medecins"),
};

// ASSOCIATIONS
import type { MedecinSpecialite } from "@/types/models";

export const medecinSpecialiteService = {
  list: () =>
    api.get<MedecinSpecialite[]>("/api/medecinspecialites").then((r) => r.data),
  getByMedecin: (id: number) =>
    api
      .get<MedecinSpecialite[]>(`/api/medecinspecialites/${id}`)
      .then((r) => r.data),
  create: (data: AssociationItem) =>
    api
      .post<MedecinSpecialite>("/api/medecinspecialites", data)
      .then((r) => r.data),
};

export const hopitalSpecialiteService = {
  list: () =>
    api.get<HopitalSpecialite[]>("/api/hopitalspecialites").then((r) => r.data),
  getByHopital: (id: number) =>
    api
      .get<HopitalSpecialite[]>(`/api/hopitalspecialites/${id}`)
      .then((r) => r.data),
  create: (data: AssociationItem) =>
    api
      .post<HopitalSpecialite>("/api/hopitalspecialites", data)
      .then((r) => r.data),
};
