// src/screens/DriverTrip.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Vibration, Linking } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
};

export default function DriverTrip({ navigation }) {
  const [isOnTrip, setIsOnTrip] = useState(false);
  const [location, setLocation] = useState(null);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [tripPositions, setTripPositions] = useState([]);

  const [routeStops, setRouteStops] = useState([
    { id: "s1", name: "Stop A", lat: 12.9726, lng: 77.5951, reached: false },
    { id: "s2", name: "Stop B", lat: 12.9736, lng: 77.5960, reached: false },
    { id: "s3", name: "Stop C", lat: 12.9746, lng: 77.5970, reached: false },
  ]);

  const speedLimit = 50;
  const offRouteThresholdKm = 0.6;

  const posRef = useRef([]);
  const watcherRef = useRef(null);

  useEffect(() => {
    return () => stopTrip();
  }, []);

  const startTrip = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted")
      return Alert.alert("Permission Required", "Location permission is needed");

    setIsOnTrip(true);
    posRef.current = [];
    setTripPositions([]);

    const watcher = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 5, timeInterval: 3000 },
      (loc) => {
        const { coords } = loc;

        setLocation(coords);
        const kmh = coords.speed ? Math.round(coords.speed * 3.6) : 0;
        setSpeedKmh(kmh);

        posRef.current.push({ lat: coords.latitude, lng: coords.longitude, ts: Date.now() });
        setTripPositions([...posRef.current]);

        if (kmh > speedLimit) {
          Vibration.vibrate(300);
          Alert.alert("Overspeeding!", `Speed ${kmh} km/h > ${speedLimit} km/h`);
        }

        const next = routeStops.find(s => !s.reached);
        if (next) {
          const dist = Haversine(coords.latitude, coords.longitude, next.lat, next.lng);
          if (dist > offRouteThresholdKm) {
            Alert.alert("Off Route!", `You are ${dist.toFixed(2)} km away from route`);
          }
        }
      }
    );

    watcherRef.current = watcher;
    Alert.alert("Trip Started", "Tracking your location...");
  };

  const stopTrip = async () => {
    if (watcherRef.current) watcherRef.current.remove();
    watcherRef.current = null;
    setIsOnTrip(false);

    const trip = {
      id: `trip_${Date.now()}`,
      startedAt: Date.now(),
      endedAt: Date.now(),
      positions: posRef.current,
      stops: routeStops,
    };

    const stored = await AsyncStorage.getItem("trip_history");
    const arr = stored ? JSON.parse(stored) : [];
    arr.unshift(trip);
    await AsyncStorage.setItem("trip_history", JSON.stringify(arr));

    Alert.alert("Trip Ended", "Trip Saved Successfully!");
    posRef.current = [];
    setTripPositions([]);
  };

  const markReached = (stopId) => {
    setRouteStops(prev =>
      prev.map(s => (s.id === stopId ? { ...s, reached: true } : s))
    );
    Alert.alert("Stop Updated", "Marked as reached!");
  };

  const distanceToNextStop = () => {
    if (!location) return null;
    const next = routeStops.find(s => !s.reached);
    if (!next) return null;
    return Haversine(location.latitude, location.longitude, next.lat, next.lng);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Trip</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Speed</Text>
          <Text style={styles.statValue}>{speedKmh} km/h</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Points</Text>
          <Text style={styles.statValue}>{tripPositions.length}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Next Stop</Text>
          <Text style={styles.statValue}>
            {distanceToNextStop() ? `${distanceToNextStop().toFixed(2)} km` : "—"}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        {!isOnTrip ? (
          <TouchableOpacity style={styles.startBtn} onPress={startTrip}>
            <Text style={styles.startText}>Start Trip</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopBtn} onPress={stopTrip}>
            <Text style={styles.stopText}>End Trip</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.section}>Route Stops</Text>

      <FlatList
        data={routeStops}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.stopRow, item.reached && { backgroundColor: "#e8f5e9" }]}>
            <View>
              <Text style={styles.stopName}>{item.name}</Text>
              <Text style={styles.stopCoords}>
                {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
              </Text>
            </View>

            {!item.reached ? (
              <TouchableOpacity style={styles.reachedBtn} onPress={() => markReached(item.id)}>
                <Text style={{ color: "#fff" }}>Reached</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: "#388e3c", fontWeight: "bold" }}>Done</Text>
            )}
          </View>
        )}
      />

      <Text style={styles.section}>Quick Actions</Text>
      <View style={styles.quickRow}>
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => Linking.openURL("tel:1234567890")}
        >
          <Ionicons name="call" size={18} />
          <Text>Call Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => Alert.alert("Reported", "Breakdown sent!")}
        >
          <Ionicons name="warning" size={18} />
          <Text>Breakdown</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("SOSScreen")}
        >
          <Ionicons name="alert-circle" size={18} />
          <Text>SOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles remain unchanged...
const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 12 },
  statCard: { flex: 1, backgroundColor: "#fff", padding: 10, borderRadius: 8, marginHorizontal: 4, alignItems: "center" },
  statLabel: { color: "#666" },
  statValue: { fontSize: 16, fontWeight: "bold" },
  controls: { alignItems: "center", marginVertical: 12 },
  startBtn: { backgroundColor: "#1E88E5", padding: 12, borderRadius: 10, width: "90%", alignItems: "center" },
  stopBtn: { backgroundColor: "#FF3B30", padding: 12, borderRadius: 10, width: "90%", alignItems: "center" },
  startText: { color: "#fff", fontWeight: "bold" },
  stopText: { color: "#fff", fontWeight: "bold" },
  section: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  stopRow: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 8 },
  stopName: { fontWeight: "bold" },
  stopCoords: { color: "#666" },
  reachedBtn: { backgroundColor: "#1E88E5", padding: 8, borderRadius: 8 },
  quickRow: { flexDirection: "row", justifyContent: "space-around" },
  quickBtn: { alignItems: "center", backgroundColor: "#eee", padding: 10, borderRadius: 8, width: "30%" },
});
