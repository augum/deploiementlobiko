import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { GeoLocationField } from "@/components/common/GeoLocationField";
import { ImageUpload } from "@/components/common/ImageUpload";
import { banqueService } from "@/services/entities";
import { buildPhotoUrl } from "@/services/api";
import type { Banque } from "@/types/models";

export function BanqueDetail() {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);
  const [data, setData] = useState<Banque | null>(null);
  const [saving, setSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    banqueService.get(numId).then(setData).catch(() => setData(null));
  }, [numId]);

  const update = (patch: Partial<Banque>) =>
    setData((p) => (p ? { ...p, ...patch } : p));

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const updated = await banqueService.update(numId, data);
      setData(updated);
      toast.success("Banque mise à jour");
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
        title={data.nom || "Banque"}
        description="Détails et modification"
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/banques"><ArrowLeft className="h-4 w-4" /> Retour</Link>
            </Button>
            <Button onClick={save} disabled={saving}>
              <Save className="h-4 w-4" /> Enregistrer
            </Button>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Informations</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2"><Label>Nom</Label><Input value={data.nom} onChange={(e) => update({ nom: e.target.value })} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label>Adresse</Label><Input value={data.adresse || ""} onChange={(e) => update({ adresse: e.target.value })} /></div>
              <div className="space-y-1.5"><Label><Phone className="inline h-3 w-3" /> Téléphone</Label><Input value={data.tel || ""} onChange={(e) => update({ tel: e.target.value })} /></div>
              <div className="space-y-1.5"><Label><Mail className="inline h-3 w-3" /> Email</Label><Input type="email" value={data.mail || ""} onChange={(e) => update({ mail: e.target.value })} /></div>
            </div>
            <GeoLocationField
              latitude={data.latitude}
              longitude={data.longitude}
              localisation={data.localisation}
              onChange={(v) => update(v)}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Image</CardTitle></CardHeader>
          <CardContent>
            <ImageUpload
              photoUrl={`${buildPhotoUrl("banques", numId)}?k=${reloadKey}`}
              entityLabel="la banque"
              onUpload={async (file, onProgress) => {
                await banqueService.uploadPhoto(numId, file, onProgress);
                setReloadKey((k) => k + 1);
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
