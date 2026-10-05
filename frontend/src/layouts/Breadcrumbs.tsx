import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

const labels: Record<string, string> = {
  medecins: "Médecins",
  hopitaux: "Hôpitaux",
  specialites: "Spécialités",
  banques: "Banques de sang",
  associations: "Associations",
  "medecin-specialite": "Médecin ↔ Spécialité",
  "hopital-specialite": "Hôpital ↔ Spécialité",
  nouveau: "Nouveau",
};

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  let acc = "";
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      <Link to="/" className="flex items-center gap-1 hover:text-foreground">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {parts.map((p, i) => {
        acc += "/" + p;
        const label = labels[p] || decodeURIComponent(p);
        const last = i === parts.length - 1;
        return (
          <Fragment key={acc}>
            <ChevronRight className="h-3.5 w-3.5" />
            {last ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link to={acc} className="hover:text-foreground">
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
