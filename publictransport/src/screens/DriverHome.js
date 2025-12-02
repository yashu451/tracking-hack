// src/screens/DriverHomeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../utils/storage";

export default function DriverHomeScreen() {
  const [driver, setDriver] = useState({});
  const [status, setStatus] = useState("Available"); // Available / On Trip
  const [location, setLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [passengers, setPassengers] = useState([
    { id: "1", name: "Alice", pickup: "Stop A", drop: "Stop B" },
    { id: "2", name: "Bob", pickup: "Stop C", drop: "Stop D" },
    { id: "3", name: "Charlie", pickup: "Stop E", drop: "Stop F" },
  ]);

  useEffect(() => {
    const loadDriver = async () => {
      const user = await getUser();
      setDriver(user);
    };
    loadDriver();
  }, []);

  // Dummy function to simulate movement
  const simulateMovement = () => {
    setLocation(prev => ({
      ...prev,
      latitude: prev.latitude + 0.0005,
      longitude: prev.longitude + 0.0005,
    }));
  };

  const toggleTrip = () => {
    if (status === "Available") {
      setStatus("On Trip");
      Alert.alert("Trip Started", "You are now on a trip!");
    } else {
      setStatus("Available");
      Alert.alert("Trip Completed", "You have completed the trip!");
    }
  };

  const renderPassenger = ({ item }) => (
    <View style={styles.passengerCard}>
      <Text style={styles.passengerName}>{item.name}</Text>
      <Text style={styles.passengerText}>Pickup: {item.pickup}</Text>
      <Text style={styles.passengerText}>Drop: {item.drop}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Driver Info */}
      <View style={styles.profileCard}>
        <Ionicons name="person-circle-outline" size={60} color="#1E88E5" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>{driver.name || "Driver Name"}</Text>
          <Text style={styles.info}>Vehicle: {driver.vehicle || "ABC123"}</Text>
          <Text style={styles.info}>Status: {status}</Text>
        </View>
      </View>

      {/* Map */}
      <MapView style={styles.map} region={location}>
        <Marker coordinate={location} title="You" description="Current Location" />
      </MapView>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={toggleTrip}>
          <Text style={styles.buttonText}>{status === "Available" ? "Start Trip" : "Stop Trip"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={simulateMovement}>
          <Text style={styles.buttonText}>Simulate Move</Text>
        </TouchableOpacity>
      </View>

      {/* Passenger List */}
      <Text style={styles.sectionTitle}>Passengers</Text>
      <FlatList
        data={passengers}
        keyExtractor={(item) => item.id}
        renderItem={renderPassenger}
        style={styles.passengerList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileCard: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  name: { fontSize: 20, fontWeight: "700" },
  info: { fontSize: 14, color: "#555" },
  map: { flex: 1, margin: 10, borderRadius: 12 },
  buttonRow: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
  button: {
    padding: 12,
    backgroundColor: "#1E88E5",
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginLeft: 12, marginTop: 10 },
  passengerList: { marginHorizontal: 10, marginBottom: 10 },
  passengerCard: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginBottom: 8,
  },
  passengerName: { fontSize: 16, fontWeight: "700" },
  passengerText: { fontSize: 14, color: "#333" },
});
