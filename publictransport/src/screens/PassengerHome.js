// src/screens/PassengerHome.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Modal, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../utils/storage";

export default function PassengerHome() {
  const [passenger, setPassenger] = useState({});
  const [bookedRides, setBookedRides] = useState([]);
  const [driverLocation, setDriverLocation] = useState({
    latitude: 12.9722,
    longitude: 77.5950,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [driverStatus, setDriverStatus] = useState("Available");

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [pickupInput, setPickupInput] = useState("");
  const [dropInput, setDropInput] = useState("");
  const [passengerCount, setPassengerCount] = useState("1");

  useEffect(() => {
    const loadPassenger = async () => {
      const user = await getUser();
      setPassenger(user);
    };
    loadPassenger();
  }, []);

  // Dummy driver movement simulation
  const simulateDriverMove = () => {
    setDriverLocation(prev => ({
      ...prev,
      latitude: prev.latitude + 0.0005,
      longitude: prev.longitude + 0.0005,
    }));
  };

  // Open modal for ride booking
  const openBooking = () => setModalVisible(true);

  // Confirm booking from modal
  const confirmBooking = () => {
    if (!pickupInput || !dropInput) {
      Alert.alert("Error", "Please enter pickup and drop locations");
      return;
    }
    const newRide = {
      id: Date.now().toString(),
      pickup: pickupInput,
      drop: dropInput,
      passengers: passengerCount,
      driverStatus,
    };
    setBookedRides([newRide, ...bookedRides]);
    setModalVisible(false);
    Alert.alert("Ride Booked!", `Pickup: ${pickupInput}, Drop: ${dropInput}`);
    setPickupInput("");
    setDropInput("");
    setPassengerCount("1");
  };

  const renderRide = ({ item }) => (
    <View style={styles.rideCard}>
      <Text style={styles.rideText}>Pickup: {item.pickup}</Text>
      <Text style={styles.rideText}>Drop: {item.drop}</Text>
      <Text style={styles.rideText}>Passengers: {item.passengers}</Text>
      <Text style={styles.rideText}>Driver Status: {item.driverStatus}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileLeft}>
          <Ionicons name="person-circle-outline" size={70} color="#1E88E5" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{passenger.name || "Passenger Name"}</Text>
            <Text style={styles.info}>{passenger.phone || "1234567890"}</Text>
            <Text style={styles.info}>{passenger.email || "email@example.com"}</Text>
          </View>
        </View>
        <View style={styles.profileRight}>
          <TouchableOpacity style={styles.profileButton} onPress={() => Alert.alert("Edit Profile")}>
            <Ionicons name="create-outline" size={22} color="#fff" />
            <Text style={styles.buttonTextSmall}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.profileButton, { backgroundColor: "#FFB300" }]} onPress={() => Alert.alert("Profile Settings")}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
            <Text style={styles.buttonTextSmall}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map */}
      <MapView style={styles.map} region={driverLocation}>
        <Marker coordinate={driverLocation} title="Driver" description="Driver Location" pinColor="red" />
        <Marker coordinate={{ latitude: 12.9716, longitude: 77.5946 }} title="Pickup" pinColor="green" />
        <Marker coordinate={{ latitude: 12.9735, longitude: 77.5960 }} title="Drop" pinColor="blue" />
      </MapView>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={openBooking}>
          <Text style={styles.buttonText}>Book Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={simulateDriverMove}>
          <Text style={styles.buttonText}>Simulate Driver Move</Text>
        </TouchableOpacity>
      </View>

      {/* Booked Rides */}
      <Text style={styles.sectionTitle}>Your Rides</Text>
      <FlatList
        data={bookedRides}
        keyExtractor={item => item.id}
        renderItem={renderRide}
        style={styles.rideList}
      />

      {/* Booking Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>Enter Ride Details</Text>
            <TextInput
              placeholder="Pickup Location"
              value={pickupInput}
              onChangeText={setPickupInput}
              style={styles.input}
            />
            <TextInput
              placeholder="Drop Location"
              value={dropInput}
              onChangeText={setDropInput}
              style={styles.input}
            />
            <TextInput
              placeholder="Number of Passengers"
              value={passengerCount}
              onChangeText={setPassengerCount}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
              <TouchableOpacity style={styles.button} onPress={confirmBooking}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#999" }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileRight: {
    justifyContent: "space-between",
    height: 70,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E88E5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
  },
  buttonTextSmall: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 14,
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
  rideList: { marginHorizontal: 10, marginBottom: 10 },
  rideCard: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginBottom: 8,
  },
  rideText: { fontSize: 14, color: "#333" },
  modalContainer: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", margin: 20, borderRadius: 12, padding: 20 },
  input: { borderWsidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
});
