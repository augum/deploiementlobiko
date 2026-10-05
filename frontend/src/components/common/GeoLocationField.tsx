import { MapPin, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGeolocation } from "@/hooks/useGeolocation";

interface GeoLocationFieldProps {
  latitude?: number;
  longitude?: number;
  localisation?: string;
  onChange: (v: { latitude?: number; longitude?: number; localisation?: string }) => void;
}

export function GeoLocationField({
  latitude,
  longitude,
  localisation,
  onChange,
}: GeoLocationFieldProps) {
  const geo = useGeolocation(true);

  useEffect(() => {
    if (geo.status === "granted" && geo.latitude != null && geo.longitude != null) {
      // only auto-fill if empty
      onChange({
        latitude: latitude ?? geo.latitude,
        longitude: longitude ?? geo.longitude,
        localisation: localisation || geo.commune || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.status, geo.latitude, geo.longitude, geo.commune]);

  return (
    <div className="rounded-lg border bg-muted/20 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="h-4 w-4 text-primary" />
          Géolocalisation
        </div>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={geo.request}
          disabled={geo.status === "requesting"}
        >
          {geo.status === "requesting" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Actualiser
        </Button>
      </div>
      {geo.status === "denied" && (
        <div className="flex items-start gap-2 rounded-md bg-warning/10 p-2 text-xs text-warning-foreground">
          <AlertCircle className="h-4 w-4 mt-0.5 text-warning" />
          <span>
            Autorisation refusée. Saisissez la commune manuellement.
          </span>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Latitude</Label>
          <Input
            type="number"
            step="any"
            value={latitude ?? ""}
            onChange={(e) =>
              onChange({
                latitude: e.target.value ? Number(e.target.value) : undefined,
                longitude,
                localisation,
              })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Longitude</Label>
          <Input
            type="number"
            step="any"
            value={longitude ?? ""}
            onChange={(e) =>
              onChange({
                latitude,
                longitude: e.target.value ? Number(e.target.value) : undefined,
                localisation,
              })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Commune / Localisation</Label>
          <Input
            value={localisation ?? ""}
            onChange={(e) =>
              onChange({ latitude, longitude, localisation: e.target.value })
            }
            placeholder="Ex: Limete"
          />
        </div>
      </div>
    </div>
  );
}
