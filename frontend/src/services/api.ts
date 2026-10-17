import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "https://api2.bdomkikwit.tech";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});


api.interceptors.response.use(
  (r) => r,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    if ((error.config as any)?.skipErrorToast) return Promise.reject(error);
    if (status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth:expired"));
      return Promise.reject(error);
    }
    const friendly: Record<number, string> = {
      400: "Données invalides. Vérifiez les champs saisis.",
      401: "Authentification requise. Veuillez vous reconnecter.",
      403: "Vous n'avez pas les droits pour cette action.",
      404: "Ressource introuvable.",
      409: "Conflit : cet élément existe déjà.",
      500: "Erreur interne du serveur. Réessayez plus tard.",
    };
    const msg = !error.response
      ? "Impossible de joindre le serveur (erreur réseau)."
      : (status && friendly[status]) ||
        (error.response?.data as any)?.message ||
        "Une erreur est survenue.";
    if (typeof window !== "undefined") {
      toast.error(msg);
    }
    return Promise.reject(error);
  },
);

/**
 * URL de récupération de la photo pour une entité donnée, telle que définie
 * dans documentation.json.
 */
export const buildPhotoUrl = (
  entity: "medecins" | "hopitals" | "banques",
  id: number | string,
) => {
  if (entity === "medecins") return `${API_BASE_URL}/api/medecinsphoto/${id}`;
  if (entity === "hopitals") return `${API_BASE_URL}/api/hopitalsphoto/${id}`;
  return `${API_BASE_URL}/api/banquesphoto/${id}`;
};
