import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Role } from "../services/roleService";
import type { Utilisateur, UtilisateurPayload } from "../services/utilisateurService";

interface Props {
  open: boolean;
  utilisateur: Utilisateur | null;
  roles: Role[];
  rolesLoading?: boolean;
  rolesError?: boolean;
  saving: boolean;
  onClose: () => void;
  onSubmit: (data: UtilisateurPayload) => void;
}

const empty = { nom: "", postnom: "", prenom: "", login: "", password: "", id_role: "" };

export function UtilisateurForm({ open, utilisateur, roles, rolesLoading = false, rolesError = false, saving, onClose, onSubmit }: Props) {
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isEdit = !!utilisateur?.id;

  useEffect(() => {
    if (open) {
      const rid = utilisateur?.id_role ?? utilisateur?.role?.id;
      setF({
        nom: utilisateur?.nom ?? "",
        postnom: utilisateur?.postnom ?? "",
        prenom: utilisateur?.prenom ?? "",
        login: utilisateur?.login ?? "",
        password: "",
        id_role: rid != null ? String(rid) : "",
      });
      setErrors({});
    }
  }, [open, utilisateur]);

  const set = (k: keyof typeof empty, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!f.nom.trim()) err.nom = "Le nom est obligatoire.";
    if (!f.login.trim()) err.login = "Le login est obligatoire.";
    if (!isEdit && !f.password) err.password = "Le mot de passe est obligatoire.";
    if (!f.id_role) err.id_role = "Le rôle est obligatoire.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const payload: UtilisateurPayload = {
      ...(isEdit ? { id: utilisateur!.id } : {}),
      nom: f.nom.trim(),
      postnom: f.postnom.trim(),
      prenom: f.prenom.trim(),
      login: f.login.trim(),
      id_role: Number(f.id_role),
    };
    if (f.password) payload.password = f.password;
    else if (isEdit && utilisateur?.password) payload.password = utilisateur.password;
    onSubmit(payload);
  };

  const field = (k: keyof typeof empty, label: string, type = "text") => (
    <div className="space-y-1.5">
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} type={type} value={f[k]} onChange={(e) => set(k, e.target.value)} />
      {errors[k] && <p className="text-sm text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !saving && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <form onSubmit={submit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Modifier l'utilisateur" : "Nouvel utilisateur"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            {field("nom", "Nom *")}
            {field("postnom", "Postnom")}
            {field("prenom", "Prénom")}
            {field("login", "Login *")}
            {field("password", isEdit ? "Mot de passe (laisser vide pour conserver)" : "Mot de passe *", "password")}
            <div className="space-y-1.5">
              <Label htmlFor="id_role">Sélectionner un rôle *</Label>
              <Select
                value={f.id_role}
                onValueChange={(v) => set("id_role", v)}
                disabled={rolesLoading || rolesError}
              >
                <SelectTrigger id="id_role">
                  <SelectValue placeholder={rolesLoading ? "Chargement des rôles…" : "Choisir un rôle"} />
                </SelectTrigger>
                <SelectContent>
                  {roles.filter((r) => r.id != null).map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>{r.libelle}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {rolesLoading && (
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Chargement des rôles…
                </p>
              )}
              {rolesError && !rolesLoading && (
                <p className="text-sm text-destructive">
                  Les rôles n'ont pas pu être chargés. Fermez puis rouvrez la fenêtre pour réessayer.
                </p>
              )}
              {errors.id_role && <p className="text-sm text-destructive">{errors.id_role}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>Annuler</Button>
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
