import { useEffect, useRef, useState } from "react";
import { Upload, ImageIcon, X, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ImageUploadProps {
  /** URL where the photo would be fetched from, or null/undefined if unknown. */
  photoUrl?: string | null;
  onUpload: (file: File, onProgress: (p: number) => void) => Promise<void>;
  entityLabel?: string;
}

/**
 * Uploader d'image homogène pour Médecins / Hôpitaux / Banques.
 *
 * Comportement :
 *  - Au premier affichage, on tente de charger silencieusement `photoUrl`
 *    dans un `<img>` détaché. Si le chargement échoue (photo inexistante),
 *    aucun appel supplémentaire n'est fait et le sélecteur de fichier est
 *    proposé immédiatement.
 *  - Si le chargement réussit, la photo est affichée avec la possibilité
 *    de la remplacer.
 *  - Après un upload réussi, la photo affichée est rafraîchie automatiquement.
 */
export function ImageUpload({ photoUrl, onUpload, entityLabel = "l'entité" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [checking, setChecking] = useState<boolean>(Boolean(photoUrl));
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Silently probe the photo URL — no toast/error if absent.
  useEffect(() => {
    if (!photoUrl) {
      setPreview(null);
      setChecking(false);
      return;
    }
    let cancelled = false;
    setChecking(true);
    const img = new Image();
    img.onload = () => {
      if (!cancelled) {
        setPreview(photoUrl);
        setChecking(false);
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        setPreview(null);
        setChecking(false);
      }
    };
    img.src = photoUrl;
    return () => {
      cancelled = true;
    };
  }, [photoUrl]);

  const openPicker = () => inputRef.current?.click();

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);
    setProgress(0);
    try {
      await onUpload(file, setProgress);
      toast.success(`Image de ${entityLabel} enregistrée`);
    } catch (e: any) {
      toast.error(`Échec de l'envoi: ${e?.message || "erreur"}`);
      setPreview(null);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/30 aspect-video max-w-md">
        {checking ? (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : preview ? (
          <img src={preview} alt="Aperçu" className="h-full w-full object-cover" />
        ) : (
          <button
            type="button"
            onClick={openPicker}
            disabled={uploading}
            className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted/40 to-muted/10 text-muted-foreground transition-colors hover:text-primary"
          >
            <ImageIcon className="h-12 w-12 opacity-60" />
            <span className="text-sm font-medium">Aucune image</span>
            <span className="text-xs">Cliquez pour en ajouter une</span>
          </button>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </div>
      {uploading && (
        <div className="max-w-md">
          <Progress value={progress} />
          <p className="mt-1 text-xs text-muted-foreground">{progress}%</p>
        </div>
      )}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
        <Button type="button" variant="outline" onClick={openPicker} disabled={uploading || checking}>
          {preview ? (
            <>
              <RefreshCw className="h-4 w-4" /> Remplacer l'image
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" /> Ajouter une image
            </>
          )}
        </Button>
        {preview && !uploading && (
          <Button type="button" variant="ghost" onClick={() => setPreview(null)}>
            <X className="h-4 w-4" /> Retirer l'aperçu
          </Button>
        )}
      </div>
    </div>
  );
}
