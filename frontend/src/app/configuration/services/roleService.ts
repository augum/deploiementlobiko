import { api } from "@/services/api";

// Conforme à documentation3.json : schémas "role" et "RoleRequestDto" = { id, libelle }
export interface Role {
  id?: number;
  libelle: string;
}

export const roleService = {
  list: () => api.get<Role[]>("/api/roles").then((r) => r.data),
  create: (data: Role) => api.post<Role>("/api/roles", data).then((r) => r.data),
  update: (id: number, data: Role) =>
    api.put<Role>(`/api/roles/${id}`, data).then((r) => r.data),
};
