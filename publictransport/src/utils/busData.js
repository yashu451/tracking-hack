// src/utils/busData.js
export const DUMMY_BUSES = [
  { id: "201", route: "A → B", lat: 12.9727, lng: 77.5952, seatsAvailable: 35, etaMin: 6 },
  { id: "102", route: "C → D", lat: 12.9735, lng: 77.5961, seatsAvailable: 10, etaMin: 12 },
  { id: "55", route: "E → F", lat: 12.9708, lng: 77.5938, seatsAvailable: 20, etaMin: 3 },
];

export function getNearbyStops() {
  return [
    { id: "S1", name: "Stop A", lat: 12.9716, lng: 77.5946 },
    { id: "S2", name: "Stop B", lat: 12.9735, lng: 77.5960 },
    { id: "S3", name: "Stop C", lat: 12.9742, lng: 77.5929 },
  ];
}

export function estimateFare(distanceKm) {
  // simple fare rule for demo
  const base = 10;
  const perKm = 6;
  return base + Math.round(perKm * distanceKm);
}
