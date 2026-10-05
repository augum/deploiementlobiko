export interface Specialite {
  id?: number;
  nom: string;
}

export interface Hopital {
  id?: number;
  nom: string;
  longitude?: number;
  latitude?: number;
  adresse?: string;
  tel?: string;
  mail?: string;
  localisation?: string;
  description?: string;
}

export interface Banque {
  id?: number;
  nom: string;
  longitude?: number;
  latitude?: number;
  adresse?: string;
  tel?: string;
  mail?: string;
  localisation?: string;
}

export interface Medecin {
  id?: number;
  nom: string;
  prenom?: string;
  hopital?: string;
  photo?: string;
  cnom?: string;
  tel?: string;
  specialite?: string;
  description?: string;
  idSpecialite?: number;
}

export interface AssociationItem {
  id?: number;
  idMedecin?: number;
  idHopital?: number;
  idSpecialite?: number;
}

export interface HopitalSpecialite {
  id?: number;
  hopital: { id?: number; nom: string };
  specialisation: { id?: number; nom: string };
}

export interface MedecinSpecialite {
  id?: number;
  medecin: { id?: number; nom: string; prenom?: string };
  specialisation: { id?: number; nom: string };
}
