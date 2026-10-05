import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { GeoLocationField } from "@/components/common/GeoLocationField";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchHopitaux, createHopital } from "@/store/slices";
import type { Hopital } from "@/types/models";

const empty: Hopital = { nom: "" };

export function HopitauxList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, status } = useAppSelector((s) => s.hopitaux);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Hopital>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => { dispatch(fetchHopitaux()); }, [dispatch]);

  const save = async () => {
    if (!form.nom.trim()) return toast.error("Le nom est requis");
    setSaving(true);
    try {
      const created = await dispatch(createHopital(form)).unwrap();
      toast.success("Hôpital créé — vous pouvez maintenant ajouter une image.");
      setOpen(false);
      setForm(empty);
      if (created.id != null) navigate(`/hopitaux/${created.id}`);
    } catch {
      /* handled */
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Hôpitaux"
        description="Liste des hôpitaux enregistrés."
        actions={
          <Button onClick={() => { setForm(empty); setOpen(true); }}>
            <Plus className="h-4 w-4" /> Nouvel hôpital
          </Button>
        }
      />
      <DataTable
        data={items}
        loading={status === "loading"}
        searchKeys={["nom", "adresse", "localisation", "tel", "mail"]}
        columns={[
          { key: "nom", header: "Nom", accessor: (r) => <span className="font-medium">{r.nom}</span> },
          { key: "adresse", header: "Adresse", accessor: (r) => r.adresse || "—" },
          {
            key: "localisation",
            header: "Commune",
            accessor: (r) => r.localisation ? (
              <span className="inline-flex items-center gap-1 text-sm"><MapPin className="h-3 w-3 text-primary" />{r.localisation}</span>
            ) : "—",
          },
          { key: "tel", header: "Téléphone", accessor: (r) => r.tel || "—" },
          { key: "mail", header: "Email", accessor: (r) => r.mail || "—" },
        ]}
        rowActions={(row) => (
          <Button asChild size="sm" variant="ghost">
            <Link to={`/hopitaux/${row.id}`}><Eye className="h-4 w-4" /></Link>
          </Button>
        )}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Nouvel hôpital</DialogTitle></DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2"><Label>Nom *</Label><Input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Adresse</Label><Input value={form.adresse || ""} onChange={(e) => setForm({ ...form, adresse: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Téléphone</Label><Input value={form.tel || ""} onChange={(e) => setForm({ ...form, tel: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={form.mail || ""} onChange={(e) => setForm({ ...form, mail: e.target.value })} /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Description</Label><Textarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="sm:col-span-2">
              <GeoLocationField
                latitude={form.latitude}
                longitude={form.longitude}
                localisation={form.localisation}
                onChange={(v) => setForm({ ...form, ...v })}
              />
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
