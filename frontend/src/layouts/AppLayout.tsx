import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Breadcrumbs } from "./Breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthContext";
import { rolesOf } from "@/auth/authService";

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = async () => {
    await logout();
    navigate("/connexion", { replace: true });
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <Breadcrumbs />
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right leading-tight sm:block">
              <div className="text-sm font-medium">{user?.login}</div>
              <div className="text-xs text-muted-foreground">{rolesOf(user).join(", ") || "Aucun rôle"}</div>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
