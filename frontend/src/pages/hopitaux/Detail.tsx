import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { GeoLocationField } from "@/components/common/GeoLocationField";
import { ImageUpload } from "@/components/common/ImageUpload";
import { hopitalService } from "@/services/entities";
import { buildPhotoUrl } from "@/services/api";
import type { Hopital } from "@/types/models";

export function HopitalDetail() {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);
  const [data, setData] = useState<Hopital | null>(null);
  const [saving, setSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    hopitalService.get(numId).then(setData).catch(() => setData(null));
  }, [numId]);

  const update = (patch: Partial<Hopital>) =>
    setData((prev) => (prev ? { ...prev, ...patch } : prev));

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const updated = await hopitalService.update(numId, data);
      setData(updated);
      toast.success("Hôpital mis à jour");
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
        title={data.nom || "Hôpital"}
        description="Détails et modification"
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/hopitaux"><ArrowLeft className="h-4 w-4" /> Retour</Link>
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
              <div className="space-y-1.5 sm:col-span-2"><Label>Description</Label><Textarea rows={4} value={data.description || ""} onChange={(e) => update({ description: e.target.value })} /></div>
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
              photoUrl={`${buildPhotoUrl("hopitals", numId)}?k=${reloadKey}`}
              entityLabel="l'hôpital"
              onUpload={async (file, onProgress) => {
                await hopitalService.uploadPhoto(numId, file, onProgress);
                const fresh = await hopitalService.get(numId).catch(() => null);
                if (fresh) setData(fresh);
                setReloadKey((k) => k + 1);
              }}
            />
            <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
              L'image est envoyée à l'API après création de l'hôpital.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
