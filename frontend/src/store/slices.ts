import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  specialiteService,
  hopitalService,
  banqueService,
  medecinService,
  medecinSpecialiteService,
  hopitalSpecialiteService,
} from "@/services/entities";
import type {
  Specialite,
  Hopital,
  Banque,
  Medecin,
  AssociationItem,
  HopitalSpecialite,
  MedecinSpecialite,
} from "@/types/models";

type Status = "idle" | "loading" | "succeeded" | "failed";
interface CrudState<T> {
  items: T[];
  status: Status;
  error?: string;
}

const initial = <T,>(): CrudState<T> => ({ items: [], status: "idle" });

// SPECIALITES
export const fetchSpecialites = createAsyncThunk("specialites/fetch", () =>
  specialiteService.list(),
);
export const createSpecialite = createAsyncThunk(
  "specialites/create",
  (data: Specialite) => specialiteService.create(data),
);
export const updateSpecialite = createAsyncThunk(
  "specialites/update",
  ({ id, data }: { id: number; data: Specialite }) =>
    specialiteService.update(id, data),
);

const specialiteSlice = createSlice({
  name: "specialites",
  initialState: initial<Specialite>(),
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSpecialites.pending, (s) => {
      s.status = "loading";
    });
    b.addCase(fetchSpecialites.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.items = a.payload;
    });
    b.addCase(fetchSpecialites.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message;
    });
    b.addCase(createSpecialite.fulfilled, (s, a) => {
      s.items.push(a.payload);
    });
    b.addCase(updateSpecialite.fulfilled, (s, a) => {
      const i = s.items.findIndex((x) => x.id === a.payload.id);
      if (i >= 0) s.items[i] = a.payload;
    });
  },
});

// HOPITAUX
export const fetchHopitaux = createAsyncThunk("hopitaux/fetch", () =>
  hopitalService.list(),
);
export const createHopital = createAsyncThunk(
  "hopitaux/create",
  (data: Hopital) => hopitalService.create(data),
);
export const updateHopital = createAsyncThunk(
  "hopitaux/update",
  ({ id, data }: { id: number; data: Hopital }) =>
    hopitalService.update(id, data),
);
const hopitalSlice = createSlice({
  name: "hopitaux",
  initialState: initial<Hopital>(),
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchHopitaux.pending, (s) => {
      s.status = "loading";
    });
    b.addCase(fetchHopitaux.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.items = a.payload;
    });
    b.addCase(fetchHopitaux.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message;
    });
    b.addCase(createHopital.fulfilled, (s, a) => {
      s.items.push(a.payload);
    });
    b.addCase(updateHopital.fulfilled, (s, a) => {
      const i = s.items.findIndex((x) => x.id === a.payload.id);
      if (i >= 0) s.items[i] = a.payload;
    });
  },
});

// BANQUES
export const fetchBanques = createAsyncThunk("banques/fetch", () =>
  banqueService.list(),
);
export const createBanque = createAsyncThunk(
  "banques/create",
  (data: Banque) => banqueService.create(data),
);
const banqueSlice = createSlice({
  name: "banques",
  initialState: initial<Banque>(),
  reducers: {
    replaceOne(s, a: PayloadAction<Banque>) {
      const i = s.items.findIndex((x) => x.id === a.payload.id);
      if (i >= 0) s.items[i] = a.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchBanques.pending, (s) => {
      s.status = "loading";
    });
    b.addCase(fetchBanques.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.items = a.payload;
    });
    b.addCase(fetchBanques.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message;
    });
    b.addCase(createBanque.fulfilled, (s, a) => {
      s.items.push(a.payload);
    });
  },
});

// MEDECINS
export const fetchMedecins = createAsyncThunk("medecins/fetch", () =>
  medecinService.list(),
);
export const createMedecin = createAsyncThunk(
  "medecins/create",
  (data: Medecin) => medecinService.create(data),
);
const medecinSlice = createSlice({
  name: "medecins",
  initialState: initial<Medecin>(),
  reducers: {
    replaceOne(s, a: PayloadAction<Medecin>) {
      const i = s.items.findIndex((x) => x.id === a.payload.id);
      if (i >= 0) s.items[i] = a.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchMedecins.pending, (s) => {
      s.status = "loading";
    });
    b.addCase(fetchMedecins.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.items = a.payload;
    });
    b.addCase(fetchMedecins.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message;
    });
    b.addCase(createMedecin.fulfilled, (s, a) => {
      s.items.push(a.payload);
    });
  },
});

// ASSOCIATIONS
export const fetchMedecinSpecialites = createAsyncThunk(
  "medecinSpecialites/fetch",
  () => medecinSpecialiteService.list(),
);
export const createMedecinSpecialite = createAsyncThunk(
  "medecinSpecialites/create",
  (data: AssociationItem) => medecinSpecialiteService.create(data),
);
const medecinSpecialiteSlice = createSlice({
  name: "medecinSpecialites",
  initialState: initial<MedecinSpecialite>(),
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMedecinSpecialites.pending, (s) => {
      s.status = "loading";
    });
    b.addCase(fetchMedecinSpecialites.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.items = a.payload;
    });
    b.addCase(fetchMedecinSpecialites.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message;
    });
    b.addCase(createMedecinSpecialite.fulfilled, (s, a) => {
      s.items.push(a.payload);
    });
  },
});

export const fetchHopitalSpecialites = createAsyncThunk(
  "hopitalSpecialites/fetch",
  () => hopitalSpecialiteService.list(),
);
export const createHopitalSpecialite = createAsyncThunk(
  "hopitalSpecialites/create",
  (data: AssociationItem) => hopitalSpecialiteService.create(data),
);
const hopitalSpecialiteSlice = createSlice({
  name: "hopitalSpecialites",
  initialState: initial<HopitalSpecialite>(),
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchHopitalSpecialites.pending, (s) => {
      s.status = "loading";
    });
    b.addCase(fetchHopitalSpecialites.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.items = a.payload;
    });
    b.addCase(fetchHopitalSpecialites.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message;
    });
    b.addCase(createHopitalSpecialite.fulfilled, (s, a) => {
      s.items.push(a.payload);
    });
  },
});

export const specialiteReducer = specialiteSlice.reducer;
export const hopitalReducer = hopitalSlice.reducer;
export const banqueReducer = banqueSlice.reducer;
export const medecinReducer = medecinSlice.reducer;
export const medecinSpecialiteReducer = medecinSpecialiteSlice.reducer;
export const hopitalSpecialiteReducer = hopitalSpecialiteSlice.reducer;
export const banqueActions = banqueSlice.actions;
export const medecinActions = medecinSlice.actions;
