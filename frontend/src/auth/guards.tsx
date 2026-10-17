import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";

export function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Vérification de la session…
      </div>
    );
  if (!user) return <Navigate to="/connexion" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

export function RequireAdmin() {
  const { isAdmin } = useAuth();
  if (!isAdmin)
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-20 text-center">
        <ShieldAlert className="h-10 w-10 text-destructive" />
        <h1 className="text-xl font-bold">Accès non autorisé</h1>
        <p className="text-muted-foreground">Cette page est réservée aux administrateurs.</p>
        <Button asChild><Link to="/">Retour au tableau de bord</Link></Button>
      </div>
    );
  return <Outlet />;
}
