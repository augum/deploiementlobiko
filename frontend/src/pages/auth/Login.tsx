import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { AlertCircle, Eye, EyeOff, Hospital, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/auth/AuthContext";
import hero from "@/assets/login-hero.jpg";

export function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";
  const [l, setL] = useState("");
  const [p, setP] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("auth_expired")) {
      sessionStorage.removeItem("auth_expired");
      setError("Votre session a expiré. Veuillez vous reconnecter.");
    }
  }, []);

  if (user) return <Navigate to={from} replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!l.trim() || !p) {
      setError("Veuillez saisir votre login et votre mot de passe.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(l.trim(), p);
      navigate(from, { replace: true });
    } catch (err) {
      const ax = err as AxiosError<any>;
      const s = ax.response?.status;
      if (!ax.response) setError("Impossible de joindre le serveur. Vérifiez votre connexion.");
      else if (s === 401 || s === 400) setError("Login ou mot de passe incorrect. Veuillez vérifier vos identifiants.");
      else if (s === 403) setError(ax.response.data?.message || "Votre compte est désactivé ou bloqué.");
      else if (s === 404) setError("La connexion n'est pas encore disponible sur le serveur.");
      else setError("Une erreur inattendue est survenue. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <aside className="relative hidden overflow-hidden md:block">
        <img src={hero} alt="Couloir d'hôpital" width={1024} height={1536} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-foreground/60 to-foreground/90" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/15 backdrop-blur-sm ring-1 ring-primary-foreground/30">
              <Hospital className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight">MediCare</span>
              <p className="text-xs text-primary-foreground/70">Console de gestion du réseau de santé</p>
            </div>
          </div>
          <div className="max-w-md space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/70">Bienvenue</p>
            <h2 className="font-display text-4xl font-extrabold leading-tight">Le réseau de santé, en un seul endroit.</h2>
            <p className="text-primary-foreground/85">
              Gérez médecins, hôpitaux, spécialités et banques de sang depuis une console unique et fiable.
            </p>
            <div className="h-1 w-16 rounded-full gradient-primary" />
          </div>
        </div>
      </aside>

      <main className="flex flex-col bg-gradient-to-b from-accent/40 to-background md:items-center md:justify-center md:p-12">
        <div className="relative overflow-hidden md:hidden">
          <img src={hero} alt="Couloir d'hôpital" width={1024} height={1536} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-foreground/60 to-foreground/85" />
          <div className="relative flex items-center gap-3 p-5 text-primary-foreground">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15 backdrop-blur-sm ring-1 ring-primary-foreground/30">
              <Hospital className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-bold tracking-tight">MediCare</span>
              <p className="text-xs text-primary-foreground/75">Le réseau de santé, en un seul endroit.</p>
            </div>
          </div>
        </div>
        <form onSubmit={submit} className="mx-auto w-full max-w-sm flex-1 content-center space-y-6 p-6" noValidate>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Bienvenue</h1>
            <p className="text-muted-foreground">Connectez-vous à votre compte.</p>
          </div>

          {error && (
            <div role="alert" className="flex gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="login">Login</Label>
            <Input id="login" autoComplete="username" autoFocus value={l} onChange={(e) => setL(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input id="password" type={show ? "text" : "password"} autoComplete="current-password" value={p} onChange={(e) => setP(e.target.value)} className="pr-10" />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"} className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>
        </form>
      </main>
    </div>
  );
}
