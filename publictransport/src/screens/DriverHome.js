// src/screens/DriverHome.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
// ⬇️ Add this here
import { DRIVER_TRIPS, getNearbyStops } from "../utils/driverData";



export default function DriverHome({ navigation, route }) {
  const driverName = route?.params?.driverName || "Driver";
  const vehicleNo = route?.params?.vehicleNo || "—";
  const vehicleType = route?.params?.vehicleType || "City Bus";
  const routeName = route?.params?.routeName || "Not Assigned";

  const [region, setRegion] = useState({
    latitude: 12.3055,
    longitude: 76.6395,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [tripActive, setTripActive] = useState(false);

  useEffect(() => {
    let sub;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setRegion((prev) => ({
        ...prev,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      }));

      sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 20,
        },
        (loc) => {
          setRegion((prev) => ({
            ...prev,
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          }));
        }
      );
    })();

    return () => {
      if (sub) sub.remove();
    };
  }, []);

  const handleStartOrEndTrip = () => {
    if (!tripActive) {
      setTripActive(true);
      navigation.navigate("DriverTrip", {
        routeName,
        vehicleNo,
      });
    } else {
      setTripActive(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Driver Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate("DriverSettings")}>
          <Ionicons name="settings" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Driver info card */}
      <View style={styles.card}>
        <Ionicons name="bus" size={46} color="#1976D2" style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.driverName}>{driverName}</Text>
          <Text style={styles.line}>Vehicle No: {vehicleNo}</Text>
          <Text style={styles.line}>Vehicle Type: {vehicleType}</Text>
          <Text style={styles.line}>Route: {routeName}</Text>
        </View>
        <View
          style={[
            styles.statusPill,
            { backgroundColor: tripActive ? "#4CAF50" : "#B0BEC5" },
          ]}
        >
          <Ionicons
            name={tripActive ? "radio-button-on" : "radio-button-off"}
            size={14}
            color="#fff"
          />
          <Text style={styles.statusText}>{tripActive ? "On Trip" : "Idle"}</Text>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Marker coordinate={region} title="Bus Location" description="You are here" />
        </MapView>
      </View>

      {/* Start / End Trip button */}
      <TouchableOpacity
        style={[
          styles.startBtn,
          { backgroundColor: tripActive ? "#E53935" : "#2E7D32" },
        ]}
        onPress={handleStartOrEndTrip}
      >
        <Text style={styles.startText}>
          {tripActive ? "End Trip" : "Start Trip"}
        </Text>
      </TouchableOpacity>

      {/* Quick actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("DriverSOS")}
        >
          <Ionicons name="alert-circle" size={24} color="#C62828" />
          <Text style={styles.actionText}>SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("BreakdownReport")}
        >
          <Ionicons name="construct" size={24} color="#FB8C00" />
          <Text style={styles.actionText}>Breakdown</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("DriverTripHistory")}
        >
          <Ionicons name="time" size={24} color="#1565C0" />
          <Text style={styles.actionText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E3F2FD" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#1976D2",
  },
  topTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  card: {
    margin: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  driverName: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  line: { fontSize: 13, color: "#455A64" },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  statusText: { color: "#fff", fontSize: 11, fontWeight: "600" },

  mapWrapper: {
    marginHorizontal: 12,
    borderRadius: 14,
    overflow: "hidden",
    height: 220,
    backgroundColor: "#000",
  },
  map: { flex: 1 },

  startBtn: {
    marginHorizontal: 12,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  startText: { color: "#fff", fontSize: 18, fontWeight: "700" },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 18,
  },
  actionCard: {
    width: "28%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 2,
  },
  actionText: { marginTop: 4, fontSize: 13, fontWeight: "600" },
});