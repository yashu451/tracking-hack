// src/screens/DriverHome.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const exitApp = () => BackHandler.exitApp();

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Driver Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate("DriverSettings")}>
          <Ionicons name="settings-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* DRIVER INFO CARD */}
      <View style={styles.infoCard}>
        <Ionicons name="bus-sharp" size={55} color="#0066CC" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>{driver.name || "Driver Name"}</Text>
          <Text style={styles.text}>Vehicle No: {driver.vehicle || "---"}</Text>
          <Text style={styles.text}>Vehicle Type: {driver.vehicleType || "BMTC Bus"}</Text>
          <Text style={styles.text}>Route: {driver.routeName || "Not Assigned"}</Text>
          <Text style={styles.text}>Departure: {driver.departureTime || "00:00"}</Text>
        </View>
      </View>

      {/* LIVE MAP */}
      <Text style={styles.sectionTitle}>Live Location</Text>
      <MapView style={styles.map} region={location}>
        <Marker coordinate={location} title="You are here" />
      </MapView>

      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickBtn}>
          <Ionicons name="construct-outline" size={22} color="#000" />
          <Text style={styles.btnText}>Breakdown</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickBtn}>
          <Ionicons name="alert-circle-outline" size={22} color="red" />
          <Text style={styles.btnText}>SOS Alert</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("DriverTripHistory")}
        >
          <Ionicons name="time-outline" size={22} color="#000" />
          <Text style={styles.btnText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* EXIT APP BUTTON */}
      <TouchableOpacity style={styles.exitBtn} onPress={exitApp}>
        <Ionicons name="exit-outline" size={22} color="#fff" />
        <Text style={styles.exitText}>Exit App</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#0066CC",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#E9F4FF",
    margin: 10,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  name: { fontWeight: "700", fontSize: 18, marginBottom: 6 },
  text: { fontSize: 14, color: "#444" },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginLeft: 10, marginTop: 12 },
  map: {
    height: 200,
    margin: 10,
    borderRadius: 12,
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  quickBtn: {
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    padding: 12,
    borderRadius: 10,
    width: "28%",
  },
  btnText: { fontSize: 12, marginTop: 6, fontWeight: "600" },
  exitBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    margin: 14,
    padding: 14,
    borderRadius: 10,
  },
  exitText: { color: "#fff", marginLeft: 8, fontSize: 15, fontWeight: "700" },
});
