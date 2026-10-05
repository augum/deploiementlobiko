import { useCallback, useEffect, useState } from "react";
import { reverseGeocode } from "@/services/geocoding";

export interface GeoState {
  latitude?: number;
  longitude?: number;
  commune?: string;
  status: "idle" | "requesting" | "granted" | "denied" | "error";
  error?: string;
}

export function useGeolocation(autoRequest = true) {
  const [state, setState] = useState<GeoState>({ status: "idle" });

  const request = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setState({ status: "error", error: "Géolocalisation non disponible" });
      return;
    }
    setState({ status: "requesting" });
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const geo = await reverseGeocode(latitude, longitude);
        setState({
          latitude,
          longitude,
          commune: geo?.commune,
          status: "granted",
        });
      },
      (err) => {
        setState({ status: "denied", error: err.message });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    if (autoRequest) request();
  }, [autoRequest, request]);

  return { ...state, request, setState };
}
