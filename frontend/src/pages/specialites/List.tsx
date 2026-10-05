import { useEffect, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchSpecialites, createSpecialite, updateSpecialite } from "@/store/slices";
import type { Specialite } from "@/types/models";

export function SpecialitesList() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.specialites);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Specialite | null>(null);
  const [nom, setNom] = useState("");

  useEffect(() => { dispatch(fetchSpecialites()); }, [dispatch]);

  const openNew = () => { setEditing(null); setNom(""); setOpen(true); };
  const openEdit = (s: Specialite) => { setEditing(s); setNom(s.nom); setOpen(true); };

  const save = async () => {
    if (!nom.trim()) return toast.error("Le nom est requis");
    try {
      if (editing?.id) {
        await dispatch(updateSpecialite({ id: editing.id, data: { id: editing.id, nom } })).unwrap();
        toast.success("Spécialité mise à jour");
      } else {
        await dispatch(createSpecialite({ nom })).unwrap();
        toast.success("Spécialité créée");
      }
      setOpen(false);
    } catch { /* handled */ }
  };

  return (
    <div>
      <PageHeader
        title="Spécialités"
        description="Gérez le référentiel des spécialités médicales."
        actions={<Button onClick={openNew}><Plus className="h-4 w-4" /> Nouvelle spécialité</Button>}
      />
      <DataTable
        data={items}
        loading={status === "loading"}
        searchKeys={["nom"]}
        columns={[
          { key: "id", header: "ID", accessor: (r) => r.id, className: "w-20" },
          { key: "nom", header: "Nom", accessor: (r) => <span className="font-medium">{r.nom}</span> },
        ]}
        rowActions={(row) => (
          <Button size="sm" variant="ghost" onClick={() => openEdit(row)}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Modifier la spécialité" : "Nouvelle spécialité"}</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Label>Nom</Label>
            <Input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex: Cardiologue" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={save}>{editing ? "Enregistrer" : "Créer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
