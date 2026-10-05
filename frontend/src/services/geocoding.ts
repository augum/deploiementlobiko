// Reverse geocoding via Nominatim (OpenStreetMap) — usage limits: 1 req/sec.
export interface ReverseGeoResult {
  commune: string;
  displayName: string;
  raw: any;
}

export async function reverseGeocode(
  lat: number,
  lon: number,
): Promise<ReverseGeoResult | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`;
    const res = await fetch(url, {
      headers: { "Accept-Language": "fr" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const a = data.address || {};
    const commune =
      a.suburb ||
      a.city_district ||
      a.town ||
      a.village ||
      a.municipality ||
      a.city ||
      a.county ||
      "";
    return { commune, displayName: data.display_name || "", raw: data };
  } catch {
    return null;
  }
}
