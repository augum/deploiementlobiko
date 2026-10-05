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
  fetchHopitalSpecialites,
  createHopitalSpecialite,
  fetchHopitaux,
  fetchSpecialites,
} from "@/store/slices";

export function HopitalSpecialiteList() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.hopitalSpecialites);
  const hopitaux = useAppSelector((s) => s.hopitaux.items);
  const specialites = useAppSelector((s) => s.specialites.items);

  const [open, setOpen] = useState(false);
  const [idHopital, setIdHopital] = useState<string>("");
  const [idSpecialite, setIdSpecialite] = useState<string>("");

  useEffect(() => {
    dispatch(fetchHopitalSpecialites());
    dispatch(fetchHopitaux());
    dispatch(fetchSpecialites());
  }, [dispatch]);

  const save = async () => {
    if (!idHopital || !idSpecialite) return toast.error("Sélectionnez hôpital et spécialité");
    try {
      await dispatch(createHopitalSpecialite({
        idHopital: Number(idHopital),
        idMedecin: Number(idHopital),
        idSpecialite: Number(idSpecialite),
      } as any)).unwrap();
      toast.success("Association créée");
      setOpen(false);
      setIdHopital("");
      setIdSpecialite("");
    } catch { /* handled */ }
  };

  return (
    <div>
      <PageHeader
        title="Hôpital ↔ Spécialité"
        description="Associez les spécialités disponibles dans chaque hôpital."
        actions={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Nouvelle association</Button>}
      />
      <DataTable
        data={items}
        loading={status === "loading"}
        columns={[
          { key: "hopital", header: "Hôpital", accessor: (r: any) => r.hopital?.nom ?? "—" },
          { key: "specialite", header: "Spécialité", accessor: (r: any) => r.specialisation?.nom ?? "—" },
        ]}
        searchAccessors={[(r: any) => r.hopital?.nom, (r: any) => r.specialisation?.nom]}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nouvelle association</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Hôpital</Label>
              <Select value={idHopital} onValueChange={setIdHopital}>
                <SelectTrigger><SelectValue placeholder="Sélectionner un hôpital" /></SelectTrigger>
                <SelectContent>
                  {hopitaux.map((h) => (<SelectItem key={h.id} value={String(h.id)}>{h.nom}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Spécialité</Label>
              <Select value={idSpecialite} onValueChange={setIdSpecialite}>
                <SelectTrigger><SelectValue placeholder="Sélectionner une spécialité" /></SelectTrigger>
                <SelectContent>
                  {specialites.map((s) => (<SelectItem key={s.id} value={String(s.id)}>{s.nom}</SelectItem>))}
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
