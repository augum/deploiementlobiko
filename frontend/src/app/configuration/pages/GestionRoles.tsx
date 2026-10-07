import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { RoleForm } from "../components/RoleForm";
import { roleService, type Role } from "../services/roleService";

export function GestionRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Role | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRoles(await roleService.list());
    } catch {
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (data: Role) => {
    setSaving(true);
    try {
      if (data.id) {
        await roleService.update(data.id, data);
        toast.success("Rôle modifié avec succès");
      } else {
        await roleService.create(data);
        toast.success("Rôle créé avec succès");
      }
      setOpen(false);
      await load();
    } catch {
      /* message d'erreur affiché par le client API */
    } finally {
      setSaving(false);
    }
  };

  const columns: Column<Role>[] = [
    { key: "id", header: "ID", accessor: (r) => r.id, sortValue: (r) => r.id ?? 0, className: "w-24" },
    { key: "libelle", header: "Libellé", accessor: (r) => <span className="font-medium">{r.libelle}</span>, sortValue: (r) => r.libelle ?? "" },
  ];

  return (
    <div>
      <PageHeader
        title="Gestion des rôles"
        description="Créez et modifiez les rôles de l'application."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Nouveau rôle
          </Button>
        }
      />
      <DataTable
        data={roles}
        columns={columns}
        loading={loading}
        searchAccessors={[(r) => r.libelle, (r) => r.id]}
        emptyMessage="Aucun rôle"
        rowActions={(r) => (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditing(r);
              setOpen(true);
            }}
          >
            <Pencil className="mr-1 h-3.5 w-3.5" /> Modifier
          </Button>
        )}
      />
      <RoleForm
        open={open}
        role={editing}
        saving={saving}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
