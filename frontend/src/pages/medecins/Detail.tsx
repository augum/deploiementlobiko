import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { ImageUpload } from "@/components/common/ImageUpload";
import { medecinService } from "@/services/entities";
import { buildPhotoUrl } from "@/services/api";
import type { Medecin } from "@/types/models";

export function MedecinDetail() {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);
  const [data, setData] = useState<Medecin | null>(null);
  const [saving, setSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    medecinService.get(numId).then((r) => setData(r || null)).catch(() => setData(null));
  }, [numId]);

  const update = (patch: Partial<Medecin>) =>
    setData((p) => (p ? { ...p, ...patch } : p));

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const updated = await medecinService.update(numId, data);
      setData(updated);
      toast.success("Médecin mis à jour");
    } finally {
      setSaving(false);
    }
  };

  if (!data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`${data.prenom || ""} ${data.nom}`.trim()}
        description={data.specialite ? `Spécialité — ${data.specialite}` : "Fiche médecin"}
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/medecins"><ArrowLeft className="h-4 w-4" /> Retour</Link>
            </Button>
            <Button onClick={save} disabled={saving}>
              <Save className="h-4 w-4" /> Enregistrer
            </Button>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Photo</CardTitle></CardHeader>
          <CardContent>
            <ImageUpload
              photoUrl={`${buildPhotoUrl("medecins", numId)}?k=${reloadKey}`}
              entityLabel="du médecin"
              onUpload={async (file, onProgress) => {
                await medecinService.uploadPhoto(numId, file, onProgress);
                setReloadKey((k) => k + 1);
              }}
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Informations</CardTitle>
            {data.cnom && <Badge variant="secondary">CNOM: {data.cnom}</Badge>}
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Nom</Label><Input value={data.nom} onChange={(e) => update({ nom: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Prénom</Label><Input value={data.prenom || ""} onChange={(e) => update({ prenom: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Téléphone</Label><Input value={data.tel || ""} onChange={(e) => update({ tel: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Hôpital</Label><Input value={data.hopital || ""} onChange={(e) => update({ hopital: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Spécialité</Label><Input value={data.specialite || ""} onChange={(e) => update({ specialite: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>CNOM</Label><Input value={data.cnom || ""} onChange={(e) => update({ cnom: e.target.value })} /></div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Description</Label>
                <Textarea rows={4} value={data.description || ""} onChange={(e) => update({ description: e.target.value })} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
