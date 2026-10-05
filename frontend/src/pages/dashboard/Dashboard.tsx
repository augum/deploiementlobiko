import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Stethoscope, Hospital, Droplets, Sparkles, ArrowRight, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/PageHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchMedecins,
  fetchHopitaux,
  fetchBanques,
  fetchSpecialites,
} from "@/store/slices";

const cards = [
  { title: "Médecins", icon: Stethoscope, to: "/medecins", key: "medecins" as const, tint: "from-sky-500/15 to-cyan-500/5" },
  { title: "Hôpitaux", icon: Hospital, to: "/hopitaux", key: "hopitaux" as const, tint: "from-emerald-500/15 to-teal-500/5" },
  { title: "Spécialités", icon: Sparkles, to: "/specialites", key: "specialites" as const, tint: "from-violet-500/15 to-fuchsia-500/5" },
  { title: "Banques de sang", icon: Droplets, to: "/banques", key: "banques" as const, tint: "from-rose-500/15 to-orange-500/5" },
];

export function Dashboard() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s);

  useEffect(() => {
    dispatch(fetchMedecins());
    dispatch(fetchHopitaux());
    dispatch(fetchBanques());
    dispatch(fetchSpecialites());
  }, [dispatch]);

  const counts = {
    medecins: state.medecins.items.length,
    hopitaux: state.hopitaux.items.length,
    specialites: state.specialites.items.length,
    banques: state.banques.items.length,
  };

  return (
    <div>
      <PageHeader title="Tableau de bord" description="Vue d'ensemble de votre réseau médical." />
      <div className="mb-6 rounded-2xl gradient-hero p-6 text-primary-foreground shadow-elegant">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold">Bienvenue sur MediCare</h2>
            <p className="mt-1 text-sm text-white/85 max-w-xl">
              Gérez vos médecins, hôpitaux, spécialités et banques de sang depuis une seule interface moderne.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.key} to={c.to}>
              <Card className={`overflow-hidden bg-gradient-to-br ${c.tint} border-border hover:shadow-elegant transition-shadow`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-primary" />
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-display font-bold">{counts[c.key]}</div>
                    <div className="text-sm text-muted-foreground">{c.title}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
