// src/utils/busData.js
export const DUMMY_BUSES = [
  { id: "201", route: "M→ I", lat: 12.9727, lng: 77.5952, seatsAvailable: 35, etaMin: 6 },
  { id: "102", route: "U → D", lat: 12.9735, lng: 77.5961, seatsAvailable: 10, etaMin: 12 },
  { id: "55", route: "B → K", lat: 12.9708, lng: 77.5938, seatsAvailable: 20, etaMin: 3 },
  
  { id: "45A", route: "O → S", lat: 12.9712, lng: 77.5925, seatsAvailable: 15, etaMin: 8 },
  { id: "302", route: "U→ C", lat: 12.9699, lng: 77.5983, seatsAvailable: 50, etaMin: 18 },
  { id: "77B", route: "M → L", lat: 12.9751, lng: 77.5970, seatsAvailable: 12, etaMin: 4 },
  
  { id: "404", route: "R → N", lat: 12.9721, lng: 77.5901, seatsAvailable: 28, etaMin: 10 },
  { id: "23C", route: "U → P", lat: 12.9744, lng: 77.5994, seatsAvailable: 40, etaMin: 14 },
  { id: "508", route: "A→ R", lat: 12.9690, lng: 77.5945, seatsAvailable: 33, etaMin: 9 },
  { id: "99X", route: "R→ T", lat: 12.9730, lng: 77.5915, seatsAvailable: 22, etaMin: 7 }
];

export function getNearbyStops() {
  return [
    { id: "S1", name: "Stop A", lat: 12.9716, lng: 77.5946, distanceKm: 0.3 },
    { id: "S2", name: "Stop B", lat: 12.9735, lng: 77.5960, distanceKm: 0.6 },
    { id: "S3", name: "Stop C", lat: 12.9742, lng: 77.5929, distanceKm: 0.8 },
  ];
}


export function estimateFare(distanceKm) {
  // simple fare rule for demo
  const base = 10;
  const perKm = 6;
  return base + Math.round(perKm * distanceKm);
}
