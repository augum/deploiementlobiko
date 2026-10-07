import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { MedecinsList } from "@/pages/medecins/List";
import { MedecinDetail } from "@/pages/medecins/Detail";
import { HopitauxList } from "@/pages/hopitaux/List";
import { HopitalDetail } from "@/pages/hopitaux/Detail";
import { BanquesList } from "@/pages/banques-sang/List";
import { BanqueDetail } from "@/pages/banques-sang/Detail";
import { SpecialitesList } from "@/pages/specialites/List";
import { MedecinSpecialiteList } from "@/pages/medecin-specialite/List";
import { HopitalSpecialiteList } from "@/pages/hopital-specialite/List";
import { NotFound } from "@/pages/NotFound";
import { GestionRoles } from "@/app/configuration/pages/GestionRoles";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/medecins" element={<MedecinsList />} />
        <Route path="/medecins/:id" element={<MedecinDetail />} />
        <Route path="/hopitaux" element={<HopitauxList />} />
        <Route path="/hopitaux/:id" element={<HopitalDetail />} />
        <Route path="/banques" element={<BanquesList />} />
        <Route path="/banques/:id" element={<BanqueDetail />} />
        <Route path="/specialites" element={<SpecialitesList />} />
        <Route
          path="/associations/medecin-specialite"
          element={<MedecinSpecialiteList />}
        />
        <Route
          path="/associations/hopital-specialite"
          element={<HopitalSpecialiteList />}
        />
        <Route path="/associations" element={<Navigate to="/associations/medecin-specialite" replace />} />
        <Route path="/configuration/roles" element={<GestionRoles />} />
        <Route path="/configuration" element={<Navigate to="/configuration/roles" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
