import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  Hospital,
  Droplets,
  Sparkles,
  Users,
  Link2,
  ShieldCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const parametrage = [
  { title: "Tableau de bord", url: "/", icon: LayoutDashboard },
  { title: "Médecins", url: "/medecins", icon: Stethoscope },
  { title: "Hôpitaux", url: "/hopitaux", icon: Hospital },
  { title: "Spécialités", url: "/specialites", icon: Sparkles },
  { title: "Banques de sang", url: "/banques", icon: Droplets },
];

const metier = [
  { title: "Médecin ↔ Spécialité", url: "/associations/medecin-specialite", icon: Users },
  { title: "Hôpital ↔ Spécialité", url: "/associations/hopital-specialite", icon: Link2 },
];

// Menu Configuration — ajouter ici les futurs modules de configuration
const configuration = [
  { title: "Gestion des rôles", url: "/configuration/roles", icon: ShieldCheck },
];

const groups = [
  { label: "Paramétrage", items: parametrage },
  { label: "Métier", items: metier },
  { label: "Configuration", items: configuration },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const isActive = (u: string) => (u === "/" ? pathname === "/" : pathname.startsWith(u));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <NavLink to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary text-primary-foreground shadow-elegant">
            <Hospital className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-display font-bold text-sm">MediCare</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Console admin
            </span>
          </div>
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
