// src/screens/DriverHome.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function DriverHome({ navigation }) {
  const [driver, setDriver] = useState({});
  const [location, setLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("user");
      if (raw) setDriver(JSON.parse(raw));
    })();
  }, []);

  const logout = () => {
  navigation.replace("RoleSelect"); // go back to role select
};


  const startTrip = () => navigation.navigate("DriverTrip");

  const exitApp = () => {
    BackHandler.exitApp();
  };

  const sendSOS = () => Alert.alert("SOS Sent", "Emergency alert sent to control room");
  const reportBreakdown = () => Alert.alert("Breakdown", "Breakdown report sent to depot");
  const callAdmin = () => Alert.alert("Admin Contact", driver.adminPhone || "No admin contact available");

  return (
    <View style={styles.container}>

      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={exitApp}>
          <Ionicons name="arrow-back-circle-outline" size={34} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Driver Dashboard</Text>

        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Driver Info */}
      <View style={styles.driverCard}>
        <Ionicons name="bus-outline" size={60} color="#0066CC" />
        <View style={styles.infoColumn}>
          <Text style={styles.driverName}>{driver.name || "Driver Name"}</Text>
          <Text style={styles.detail}>Vehicle No: {driver.vehicle || "—"}</Text>
          <Text style={styles.detail}>Vehicle Type: {driver.vehicleType || "City Bus"}</Text>
          <Text style={styles.detail}>Route: {driver.routeName || "Not Assigned"}</Text>
          <Text style={styles.detail}>Departure: {driver.departureTime || "—"}</Text>
        </View>
      </View>

      {/* Map Live Location */}
      <MapView style={styles.map} region={location}>
        <Marker coordinate={location} title="Your Bus" />
      </MapView>

      {/* Start Trip Button */}
      <TouchableOpacity style={styles.startTripBtn} onPress={startTrip}>
        <Text style={styles.startText}>Start Trip</Text>
      </TouchableOpacity>

      {/* Quick Action Row */}
      <View style={styles.quickActionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={sendSOS}>
          <Ionicons name="alert-circle-outline" size={28} color="#C62828" />
          <Text style={styles.actionText}>SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={reportBreakdown}>
          <Ionicons name="construct-outline" size={28} color="#F57C00" />
          <Text style={styles.actionText}>Breakdown</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("DriverTripHistory")}
        >
          <Ionicons name="time-outline" size={28} color="#0066CC" />
          <Text style={styles.actionText}>History</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F9FF" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#0066CC",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  driverCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    alignItems: "center",
  },

  infoColumn: { marginLeft: 14 },

  driverName: { fontSize: 20, fontWeight: "800" },

  detail: { fontSize: 14, marginTop: 3, color: "#444" },

  map: {
    height: 220,
    marginHorizontal: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  startTripBtn: {
    backgroundColor: "#008C3A",
    margin: 12,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  startText: { color: "white", fontWeight: "800", fontSize: 16 },

  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 18,
  },

  actionBtn: {
    alignItems: "center",
    width: "28%",
    padding: 12,
    backgroundColor: "#E8F3FF",
    borderRadius: 12,
  },

  actionText: { marginTop: 6, fontWeight: "600", color: "#333" },
});