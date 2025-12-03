// src/screens/DriverTrip.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Vibration } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

/* small Haversine to compute km distance */
const haversineKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
};

export default function DriverTrip({ navigation }) {
  const [isOnTrip, setIsOnTrip] = useState(false);
  const watcherRef = useRef(null);
  const positionsRef = useRef([]);
  const [positions, setPositions] = useState([]);
  const [speed, setSpeed] = useState(0);
  const [stops, setStops] = useState([
    { id: "s1", name: "Stop A", lat: 12.9726, lng: 77.5951, reached: false },
    { id: "s2", name: "Stop B", lat: 12.9736, lng: 77.5960, reached: false },
    { id: "s3", name: "Stop C", lat: 12.9746, lng: 77.5970, reached: false },
  ]);

  const speedLimit = 50; // km/h
  const offRouteThreshold = 0.6; // km

  useEffect(() => {
    return () => {
      if (watcherRef.current) watcherRef.current.remove();
    };
  }, []);

  const startTrip = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return Alert.alert("Permission required", "Allow location");

    setIsOnTrip(true);
    positionsRef.current = [];
    setPositions([]);

    const sub = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 3000, distanceInterval: 5 },
      (loc) => {
        const c = loc.coords;
        const kmh = c.speed ? Math.round(c.speed * 3.6) : 0;
        setSpeed(kmh);
        positionsRef.current.push({ lat: c.latitude, lng: c.longitude, ts: Date.now(), speed: kmh });
        setPositions([...positionsRef.current]);

        // overspeed
        if (kmh > speedLimit) {
          Vibration.vibrate(300);
          Alert.alert("Overspeed", `Speed ${kmh} km/h > ${speedLimit}`);
        }

        // off-route check
        const next = stops.find(s => !s.reached);
        if (next) {
          const d = haversineKm(c.latitude, c.longitude, next.lat, next.lng);
          if (d > offRouteThreshold) {
            Alert.alert("Off-route", `~${d.toFixed(2)} km from next stop`);
          }
        }

        // (Optional) push coords to server here
      }
    );

    watcherRef.current = sub;
    Alert.alert("Trip started", "Location sharing started (demo)");
  };

  const endTrip = async () => {
    if (watcherRef.current) {
      watcherRef.current.remove();
      watcherRef.current = null;
    }
    setIsOnTrip(false);

    // save trip history
    const trip = {
      id: `trip_${Date.now()}`,
      startedAt: Date.now(),
      endedAt: Date.now(),
      positions: positionsRef.current,
      stops,
    };

    try {
      const raw = await AsyncStorage.getItem("trip_history");
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(trip);
      await AsyncStorage.setItem("trip_history", JSON.stringify(arr));
      Alert.alert("Trip saved", `Saved ${positionsRef.current.length} points`);
    } catch (e) {
      console.warn(e);
    }

    positionsRef.current = [];
    setPositions([]);
  };

  const markReached = (id) => {
    setStops(prev => prev.map(s => s.id === id ? { ...s, reached: true } : s));
    Alert.alert("Stop", "Marked reached");
  };

  const distanceToNext = () => {
    // use last position
    const last = positionsRef.current[positionsRef.current.length - 1];
    if (!last) return null;
    const next = stops.find(s => !s.reached);
    if (!next) return null;
    return haversineKm(last.lat, last.lng, next.lat, next.lng);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Dashboard</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}><Text style={styles.statLabel}>Speed</Text><Text style={styles.statValue}>{speed} km/h</Text></View>
        <View style={styles.statCard}><Text style={styles.statLabel}>Points</Text><Text style={styles.statValue}>{positions.length}</Text></View>
        <View style={styles.statCard}><Text style={styles.statLabel}>Next</Text><Text style={styles.statValue}>{distanceToNext() ? `${distanceToNext().toFixed(2)} km` : "—"}</Text></View>
      </View>

      <View style={styles.controls}>
        {!isOnTrip ? (
          <TouchableOpacity style={styles.startBtn} onPress={startTrip}><Text style={styles.startText}>Start Trip</Text></TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopBtn} onPress={endTrip}><Text style={styles.stopText}>End Trip</Text></TouchableOpacity>
        )}
      </View>

      <Text style={styles.section}>Stops</Text>
      <FlatList data={stops} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View style={[styles.stopRow, item.reached && { backgroundColor: "#e8f5e9" }]}>
          <View>
            <Text style={styles.stopName}>{item.name}</Text>
            <Text style={styles.stopCoords}>{item.lat.toFixed(4)}, {item.lng.toFixed(4)}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            {!item.reached ? (
              <TouchableOpacity style={styles.reachedBtn} onPress={() => markReached(item.id)}><Text style={{ color: "#fff" }}>Reached</Text></TouchableOpacity>
            ) : (
              <Text style={{ color: "#388e3c", fontWeight: "700" }}>Done</Text>
            )}
          </View>
        </View>
      )} />

      <Text style={styles.section}>Quick Actions</Text>
      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickBtn} onPress={() => Alert.alert("Breakdown", "Reported (demo)") }><Ionicons name="warning" size={18} /><Text>Breakdown</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => Alert.alert("SOS", "SOS sent to admin (demo)") }><Ionicons name="alert-circle" size={18} /><Text>SOS</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => Alert.alert("Share", "Sharing location (demo)") }><Ionicons name="share-social" size={18} /><Text>Share</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: { flex: 1, padding: 12 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  statCard: { flex: 1, backgroundColor: "#fff", padding: 10, borderRadius: 8, marginHorizontal: 4, alignItems: "center" },
  statLabel: { color: "#666" }, statValue: { fontSize: 16, fontWeight: "700", marginTop: 6 },
  controls: { alignItems: "center", marginBottom: 12 },
  startBtn: { backgroundColor: "#1E88E5", padding: 12, borderRadius: 10, width: "90%", alignItems: "center" },
  startText: { color: "#fff", fontWeight: "700" },
  stopBtn: { backgroundColor: "#FF3B30", padding: 12, borderRadius: 10, width: "90%", alignItems: "center" },
  stopText: { color: "#fff", fontWeight: "700" },
  section: { fontSize: 16, fontWeight: "700", marginTop: 8, marginBottom: 6 },
  stopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, backgroundColor: "#fff", borderRadius: 8, marginBottom: 8 },
  stopName: { fontWeight: "700" }, stopCoords: { color: "#666" },
  reachedBtn: { backgroundColor: "#1E88E5", padding: 8, borderRadius: 8 },
  quickRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 8 },
  quickBtn: { alignItems: "center", backgroundColor: "#f1f1f1", padding: 10, borderRadius: 8, width: "30%" },
};
