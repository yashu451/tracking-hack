// src/components/MapViewUniversal.js
import React, { useEffect, useRef } from "react";
import { Platform, View, Text, StyleSheet } from "react-native";

export default function MapViewUniversal({ coordinate }) {
  // Default coordinate
  const coord = coordinate || { latitude: 12.9716, longitude: 77.5946 };

  if (Platform.OS === "web") {
    // Load leaflet CSS and components only on web
    // (require used so native bundlers don't import these)
    try {
      require("leaflet/dist/leaflet.css");
    } catch (e) {}
    const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
    const L = require("leaflet");

    // Fix default marker icon path issue in react-leaflet on webpack
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <MapContainer center={[coord.latitude, coord.longitude]} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coord.latitude, coord.longitude]}>
            <Popup>Driver</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }

  // Native (Android/iOS)
  const Maps = require("react-native-maps");
  const MapView = Maps.default;
  const Marker = Maps.Marker;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: coord.latitude,
        longitude: coord.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={{ latitude: coord.latitude, longitude: coord.longitude }} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
