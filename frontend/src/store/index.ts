import { configureStore } from "@reduxjs/toolkit";
import {
  specialiteReducer,
  hopitalReducer,
  banqueReducer,
  medecinReducer,
  medecinSpecialiteReducer,
  hopitalSpecialiteReducer,
} from "./slices";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    specialites: specialiteReducer,
    hopitaux: hopitalReducer,
    banques: banqueReducer,
    medecins: medecinReducer,
    medecinSpecialites: medecinSpecialiteReducer,
    hopitalSpecialites: hopitalSpecialiteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
