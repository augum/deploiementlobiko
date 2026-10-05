import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchMedecins, createMedecin, fetchSpecialites, fetchHopitaux } from "@/store/slices";
import type { Medecin } from "@/types/models";

const empty: Medecin = { nom: "" };

export function MedecinsList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, status } = useAppSelector((s) => s.medecins);
  const specialites = useAppSelector((s) => s.specialites.items);
  const hopitaux = useAppSelector((s) => s.hopitaux.items);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Medecin>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchMedecins());
    dispatch(fetchSpecialites());
    dispatch(fetchHopitaux());
  }, [dispatch]);

  const save = async () => {
    if (!form.nom.trim()) return toast.error("Le nom est requis");
    setSaving(true);
    try {
      const created = await dispatch(createMedecin(form)).unwrap();
      toast.success("Médecin créé");
      setOpen(false);
      setForm(empty);
      if (created.id != null) navigate(`/medecins/${created.id}`);
    } catch {
      /* toast handled */
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Médecins"
        description="Annuaire des médecins."
        actions={
          <Button onClick={() => { setForm(empty); setOpen(true); }}>
            <Plus className="h-4 w-4" /> Nouveau médecin
          </Button>
        }
      />
      <DataTable
        data={items}
        loading={status === "loading"}
        searchKeys={["nom", "prenom", "specialite", "hopital", "cnom", "tel"]}
        columns={[
          { key: "nom", header: "Nom", accessor: (r) => <span className="font-medium">{r.prenom} {r.nom}</span> },
          { key: "specialite", header: "Spécialité", accessor: (r) => r.specialite || "—" },
          { key: "hopital", header: "Hôpital", accessor: (r) => r.hopital || "—" },
          { key: "tel", header: "Téléphone", accessor: (r) => r.tel || "—" },
          { key: "cnom", header: "CNOM", accessor: (r) => r.cnom || "—" },
        ]}
        rowActions={(row) => (
          <Button asChild size="sm" variant="ghost">
            <Link to={`/medecins/${row.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        )}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Nouveau médecin</DialogTitle></DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5"><Label>Nom *</Label><Input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Prénom</Label><Input value={form.prenom || ""} onChange={(e) => setForm({ ...form, prenom: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Téléphone</Label><Input value={form.tel || ""} onChange={(e) => setForm({ ...form, tel: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>CNOM</Label><Input value={form.cnom || ""} onChange={(e) => setForm({ ...form, cnom: e.target.value })} /></div>
            <div className="space-y-1.5">
              <Label>Hôpital</Label>
              <Select value={form.hopital || ""} onValueChange={(v) => setForm({ ...form, hopital: v })}>
                <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                <SelectContent>
                  {hopitaux.map((h) => (<SelectItem key={h.id} value={h.nom}>{h.nom}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Spécialité</Label>
              <Select
                value={form.idSpecialite ? String(form.idSpecialite) : ""}
                onValueChange={(v) => {
                  const sp = specialites.find((s) => s.id === Number(v));
                  setForm({ ...form, idSpecialite: Number(v), specialite: sp?.nom });
                }}
              >
                <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                <SelectContent>
                  {specialites.map((s) => (<SelectItem key={s.id} value={String(s.id)}>{s.nom}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Description</Label>
              <Textarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>Annuler</Button>
            <Button onClick={save} disabled={saving}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
