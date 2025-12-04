// src/screens/DriverRouteMap.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

// Same places you used in DriverTrip / busData
const DRIVER_STOPS = [
  {
    id: "1",
    name: "KR Circle Stop",
    place: "Near Mysore Palace",
    lat: 12.3037,
    lng: 76.6520,
  },
  {
    id: "2",
    name: "Suburban Bus Stand",
    place: "Suburban Bus Stand, Mysore",
    lat: 12.2966,
    lng: 76.6551,
  },
  {
    id: "3",
    name: "Mall of Mysore Stop",
    place: "Chamundi Hill Road",
    lat: 12.2979,
    lng: 76.6640,
  },
];

export default function DriverRouteMap({ route }) {
  const nextStop = route?.params?.nextStop || DRIVER_STOPS[0];

  const region = {
    latitude: nextStop.lat,
    longitude: nextStop.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="navigate-outline" size={22} color="#1565C0" />
        <Text style={styles.title}>Next Stop Map</Text>
      </View>

      <Text style={styles.subtitle}>
        Navigating to:{" "}
        <Text style={{ fontWeight: "700" }}>{nextStop.name}</Text>
      </Text>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
      >
        {/* All stops */}
        {DRIVER_STOPS.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{ latitude: stop.lat, longitude: stop.lng }}
            title={stop.name}
            description={stop.place}
            pinColor={stop.id === nextStop.id ? "green" : "red"}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginHorizontal: 12,
    marginBottom: 6,
  },
  map: {
    flex: 1,
    margin: 10,
    borderRadius: 14,
    overflow: "hidden",
  },
});