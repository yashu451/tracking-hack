// src/screens/BusDetails.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BusDetails({ route, navigation }) {

  const bus = route.params?.bus || {};
  const handleTrack = () => {
  navigation.navigate("TrackBus", { busId: bus.id });
};


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="bus-outline" size={70} color="#1E88E5" style={{ alignSelf: "center" }} />

        <Text style={styles.title}>Bus {bus.id}</Text>

        <View style={styles.row}>
          <Ionicons name="map-outline" size={20} color="#333" />
          <Text style={styles.info}>Route: {bus.route}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="time-outline" size={20} color="#333" />
          <Text style={styles.info}>ETA: {bus.etaMin} mins</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="people-outline" size={20} color="#333" />
          <Text style={styles.info}>Seats Available: {bus.seatsAvailable}</Text>
        </View>

        {/* Track Button */}
        <TouchableOpacity style={styles.trackButton} onPress={handleTrack}>
          <Ionicons name="locate-outline" size={22} color="#fff" />
          <Text style={styles.trackBtnText}>Track Bus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E9F3FF", justifyContent: "center", padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E88E5",
    textAlign: "center",
    marginBottom: 15
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  info: {
    fontSize: 16,
    marginLeft: 10,
    color: "#444",
    fontWeight: "600"
  },
  trackButton: {
    marginTop: 22,
    backgroundColor: "#1E88E5",
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  trackBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8
  }
});
