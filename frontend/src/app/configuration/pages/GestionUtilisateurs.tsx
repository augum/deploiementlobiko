import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { UtilisateurForm } from "../components/UtilisateurForm";
import { roleService, type Role } from "../services/roleService";
import { utilisateurService, type Utilisateur, type UtilisateurPayload } from "../services/utilisateurService";

export function GestionUtilisateurs() {
  const [items, setItems] = useState<Utilisateur[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Utilisateur | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await utilisateurService.list());
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    setRolesLoading(true);
    setRolesError(false);
    roleService
      .list()
      .then(setRoles)
      .catch(() => {
        setRoles([]);
        setRolesError(true);
      })
      .finally(() => setRolesLoading(false));
  }, [load]);

  const roleLabel = (u: Utilisateur) =>
    u.role?.libelle ?? roles.find((r) => r.id === u.id_role)?.libelle ?? "Aucun rôle";

  const handleSubmit = async (data: UtilisateurPayload) => {
    setSaving(true);
    try {
      if (data.id) {
        await utilisateurService.update(data.id, data);
        toast.success("Utilisateur modifié avec succès");
      } else {
        await utilisateurService.create(data);
        toast.success("Utilisateur créé avec succès");
      }
      setOpen(false);
      await load();
    } catch {
      /* message affiché par le client API */
    } finally {
      setSaving(false);
    }
  };

  const columns: Column<Utilisateur>[] = [
    { key: "nom", header: "Nom", accessor: (u) => <span className="font-medium">{u.nom}</span>, sortValue: (u) => u.nom ?? "" },
    { key: "postnom", header: "Postnom", accessor: (u) => u.postnom || "—", sortValue: (u) => u.postnom ?? "" },
    { key: "prenom", header: "Prénom", accessor: (u) => u.prenom || "—", sortValue: (u) => u.prenom ?? "" },
    { key: "login", header: "Login", accessor: (u) => u.login, sortValue: (u) => u.login ?? "" },
    { key: "role", header: "Rôle", accessor: (u) => roleLabel(u), sortValue: (u) => roleLabel(u) },
  ];

  return (
    <div>
      <PageHeader
        title="Utilisateurs"
        description="Consultez, créez et modifiez les utilisateurs de l'application."
        actions={
          <Button onClick={() => { setEditing(null); setOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Nouvel utilisateur
          </Button>
        }
      />
      <div className="overflow-x-auto">
        <DataTable
          data={items}
          columns={columns}
          loading={loading}
          searchAccessors={[(u) => u.nom, (u) => u.prenom, (u) => u.postnom, (u) => u.login, (u) => roleLabel(u)]}
          emptyMessage="Aucun utilisateur"
          rowActions={(u) => (
            <Button size="sm" variant="outline" onClick={() => { setEditing(u); setOpen(true); }}>
              <Pencil className="mr-1 h-3.5 w-3.5" /> Modifier
            </Button>
          )}
        />
      </div>
      <UtilisateurForm
        open={open}
        utilisateur={editing}
        roles={roles}
        rolesLoading={rolesLoading}
        rolesError={rolesError}
        saving={saving}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
