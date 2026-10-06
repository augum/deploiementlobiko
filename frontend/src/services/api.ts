import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "https://api2.bdomkikwit.tech";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error: AxiosError<any>) => {
    const msg =
      (error.response?.data as any)?.message || error.message || "Erreur réseau";
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
