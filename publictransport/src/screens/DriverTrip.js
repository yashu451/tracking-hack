// src/screens/DriverTrip.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

// 🚌 Stops on this trip – with place names
const INITIAL_STOPS = [
  {
    id: "1",
    name: "KR Circle Stop",
    place: "Near Mysore Palace",
    lat: 12.3037,
    lng: 76.6520,
    reached: false,
  },
  {
    id: "2",
    name: "Suburban Bus Stand",
    place: "Suburban Bus Stand, Mysore",
    lat: 12.2966,
    lng: 76.6551,
    reached: false,
  },
  {
    id: "3",
    name: "Mall of Mysore Stop",
    place: "Chamundi Hill Road",
    lat: 12.2979,
    lng: 76.6640,
    reached: false,
  },
];

export default function DriverTrip({ navigation, route }) {
  // if route name is not passed, show a nice default
  const [stops, setStops] = useState(INITIAL_STOPS);
  const routeName =
  route?.params?.routeName || "Mysore City Service";

  const [speed, setSpeed] = useState(0);
  const [points, setPoints] = useState(0);
  const [tripStarted, setTripStarted] = useState(false);

  const nextStop = stops.find((s) => !s.reached);

  // 📡 Watch speed using GPS
  useEffect(() => {
    let sub;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, distanceInterval: 10 },
        (loc) => {
          const s = loc.coords.speed || 0; // m/s
          setSpeed(Math.max(0, Math.round(s * 3.6))); // to km/h
        }
      );
    })();

    return () => {
      if (sub) sub.remove();
    };
  }, []);

  const handleStartTrip = () => {
    setTripStarted(true);
  };

  const markStopReached = (id) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, reached: true } : s))
    );
    setPoints((p) => p + 5);
  };

  // 🚏 How each stop row looks
  const renderStop = ({ item }) => (
    <View style={styles.stopRow}>
      <View>
        <Text style={styles.stopName}>{item.name}</Text>
        {/* show place (not coordinates) */}
        <Text style={styles.stopCoords}>{item.place}</Text>
      </View>
      <TouchableOpacity
        disabled={item.reached || !tripStarted}
        style={[
          styles.reachedBtn,
          item.reached && { backgroundColor: "#9E9E9E" },
          !item.reached && !tripStarted && { backgroundColor: "#B0BEC5" },
        ]}
        onPress={() => markStopReached(item.id)}
      >
        <Text style={styles.reachedText}>
          {item.reached ? "Done" : "Reached"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Trip Dashboard</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Speed</Text>
          <Text style={styles.statValue}>{speed} km/h</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Points</Text>
          <Text style={styles.statValue}>{points}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Next</Text>
          <Text style={styles.statValue}>{nextStop ? nextStop.name : "-"}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Route</Text>
          <Text style={[styles.statValue, { fontSize: 11 }]}>
            {routeName}
          </Text>
        </View>
      </View>

      {/* Start trip */}
      <TouchableOpacity
        style={[
          styles.startBtn,
          tripStarted && { backgroundColor: "#9E9E9E" },
        ]}
        onPress={handleStartTrip}
        disabled={tripStarted}
      >
        <Text style={styles.startLabel}>
          {tripStarted ? "Trip In Progress" : "Start Trip"}
        </Text>
      </TouchableOpacity>

      {/* Stops list */}
      <Text style={styles.sectionTitle}>Stops</Text>
      <FlatList
        data={stops}
        keyExtractor={(i) => i.id.toString()}
        renderItem={renderStop}
        contentContainerStyle={{ paddingBottom: 8 }}
      />

      {/* Quick actions */}
      <View style={styles.quickRow}>
        {/* Breakdown */}
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("BreakdownReport")}
        >
          <Ionicons name="warning-outline" size={22} color="#C62828" />
          <Text style={styles.quickText}>Breakdown</Text>
        </TouchableOpacity>

        {/* SOS */}
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("DriverSOS")}
        >
          <Ionicons name="alert-circle-outline" size={22} color="#D84315" />
          <Text style={styles.quickText}>SOS</Text>
        </TouchableOpacity>

        {/* History */}
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("DriverTripHistory")}
        >
          <Ionicons name="time-outline" size={22} color="#1565C0" />
          <Text style={styles.quickText}>History</Text>
        </TouchableOpacity>

        {/* Navigation to Next Stop */}
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() =>
            nextStop &&
            navigation.navigate("DriverRouteMap", { nextStop: nextStop })
          }
        >
          <Ionicons name="navigate-outline" size={22} color="#2E7D32" />
          <Text style={styles.quickText}>Next Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  topTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginTop: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    elevation: 1,
  },
  statLabel: { fontSize: 11, color: "#757575" },
  statValue: { fontSize: 15, fontWeight: "700", marginTop: 2 },

  startBtn: {
    marginHorizontal: 12,
    marginTop: 10,
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  startLabel: { color: "#fff", fontSize: 16, fontWeight: "600" },

  sectionTitle: {
    marginTop: 14,
    marginHorizontal: 12,
    fontWeight: "700",
    fontSize: 15,
  },

  stopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    elevation: 1,
  },
  stopName: { fontSize: 14, fontWeight: "600" },
  stopCoords: { fontSize: 11, color: "#757575", marginTop: 2 },

  reachedBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#1E88E5",
  },
  reachedText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    marginTop: 8,
  },
  quickBtn: { alignItems: "center", gap: 4 },
  quickText: { fontSize: 12, fontWeight: "600" },
});