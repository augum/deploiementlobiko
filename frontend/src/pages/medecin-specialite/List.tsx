import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchMedecinSpecialites,
  createMedecinSpecialite,
  fetchMedecins,
  fetchSpecialites,
} from "@/store/slices";

export function MedecinSpecialiteList() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.medecinSpecialites);
  const medecins = useAppSelector((s) => s.medecins.items);
  const specialites = useAppSelector((s) => s.specialites.items);

  const [open, setOpen] = useState(false);
  const [idMedecin, setIdMedecin] = useState<string>("");
  const [idSpecialite, setIdSpecialite] = useState<string>("");

  useEffect(() => {
    dispatch(fetchMedecinSpecialites());
    dispatch(fetchMedecins());
    dispatch(fetchSpecialites());
  }, [dispatch]);

  const save = async () => {
    if (!idMedecin || !idSpecialite) return toast.error("Sélectionnez médecin et spécialité");
    try {
      await dispatch(createMedecinSpecialite({
        idMedecin: Number(idMedecin),
        idSpecialite: Number(idSpecialite),
      })).unwrap();
      toast.success("Association créée");
      setOpen(false);
      setIdMedecin("");
      setIdSpecialite("");
    } catch { /* handled */ }
  };

  return (
    <div>
      <PageHeader
        title="Médecin ↔ Spécialité"
        description="Associez plusieurs spécialités à un médecin."
        actions={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Nouvelle association</Button>}
      />
      <DataTable
        data={items}
        loading={status === "loading"}
        columns={[
          { key: "nom", header: "Nom", accessor: (r: any) => r.medecin?.nom ?? "—" },
          { key: "prenom", header: "Prénom", accessor: (r: any) => r.medecin?.prenom ?? "—" },
          { key: "specialite", header: "Spécialité", accessor: (r: any) => r.specialisation?.nom ?? "—" },
        ]}
        searchAccessors={[(r: any) => r.medecin?.nom, (r: any) => r.specialisation?.nom]}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nouvelle association</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Médecin</Label>
              <Select value={idMedecin} onValueChange={setIdMedecin}>
                <SelectTrigger><SelectValue placeholder="Sélectionner un médecin" /></SelectTrigger>
                <SelectContent>
                  {medecins.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>{m.prenom} {m.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Spécialité</Label>
              <Select value={idSpecialite} onValueChange={setIdSpecialite}>
                <SelectTrigger><SelectValue placeholder="Sélectionner une spécialité" /></SelectTrigger>
                <SelectContent>
                  {specialites.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>{s.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={save}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
