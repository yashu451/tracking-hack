// src/utils/busData.js

  // 👇 Add this under DUMMY_BUSES in src/utils/busData.js
export const DRIVER_TRIPS = [
  {
    id: "TRIP1",
    busId: "119",
    from: "Mysore Palace",
    to: "Chamundi Hill",
    startTime: "07:30 AM",
    endTime: "08:10 AM",
  },
  {
    id: "TRIP2",
    busId: "94A",
    from: "Suburban Bus Stand",
    to: "Kuvempunagar",
    startTime: "08:00 AM",
    endTime: "08:35 AM",
  },
  {
    id: "TRIP3",
    busId: "266",
    from: "KR Circle",
    to: "Vijayanagar",
    startTime: "09:00 AM",
    endTime: "09:25 AM",
  },
  {
    id: "TRIP4",
    busId: "401",
    from: "Infosys Campus",
    to: "Hebbal",
    startTime: "06:30 PM",
    endTime: "07:05 PM",
  },
  {
    id: "TRIP5",
    busId: "167B",
    from: "Mall of Mysore",
    to: "Bannimantap",
    startTime: "05:15 PM",
    endTime: "05:45 PM",
  },
];




  export function getNearbyStops(lat, lng) {
  return [
    { id: "ST01", name: "KR Circle Stop", lat: 12.3037, lng: 76.6520, distanceKm: 0.2 },
    { id: "ST02", name: "Suburban Bus Stand", lat: 12.2966, lng: 76.6551, distanceKm: 0.6 },
    { id: "ST03", name: "Mysore Palace Gate", lat: 12.3051, lng: 76.6567, distanceKm: 0.8 },
    { id: "ST04", name: "Mall of Mysore Stop", lat: 12.2979, lng: 76.6640, distanceKm: 1.1 },
  ];
}



export function estimateFare(distanceKm) {
  // simple fare rule for demo
  const base = 10;
  const perKm = 6;
  return base + Math.round(perKm * distanceKm);
}