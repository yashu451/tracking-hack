// src/screens/DriverRouteMap.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function DriverRouteMap({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assigned Route</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 12.9716,
          longitude: 77.5946,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 12.9716, longitude: 77.5946 }}
          title="Start point"
        />
        <Marker
          coordinate={{ latitude: 12.9816, longitude: 77.6046 }}
          pinColor="green"
          title="Next Stop"
        />
      </MapView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("DriverHome")}
      >
        <Text style={styles.btnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", margin: 12 },
  map: { flex: 1, margin: 10, borderRadius: 12 },
  backButton: {
    backgroundColor: "#1E88E5",
    padding: 14,
    margin: 10,
    borderRadius: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "700" },
});