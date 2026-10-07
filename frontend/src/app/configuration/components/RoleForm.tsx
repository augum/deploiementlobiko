import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Role } from "../services/roleService";

interface Props {
  open: boolean;
  role: Role | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (data: Role) => void;
}

export function RoleForm({ open, role, saving, onClose, onSubmit }: Props) {
  const [libelle, setLibelle] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setLibelle(role?.libelle ?? "");
      setError(null);
    }
  }, [open, role]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = libelle.trim();
    if (!v) return setError("Le libellé est obligatoire.");
    if (v.length > 100) return setError("Le libellé ne doit pas dépasser 100 caractères.");
    onSubmit(role?.id ? { id: role.id, libelle: v } : { libelle: v });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !saving && onClose()}>
      <DialogContent>
        <form onSubmit={submit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{role?.id ? "Modifier le rôle" : "Nouveau rôle"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="libelle">Libellé *</Label>
            <Input
              id="libelle"
              value={libelle}
              autoFocus
              onChange={(e) => {
                setLibelle(e.target.value);
                setError(null);
              }}
              placeholder="Ex : Administrateur"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Annuler
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
