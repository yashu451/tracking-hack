// src/components/MapViewUniversal.js
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Platform, View, Text } from "react-native";

export default function MapViewUniversal({ coordinate }) {
  const coord = coordinate || { latitude: 12.9716, longitude: 77.5946 };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={Platform.OS === "android" ? "google" : null}
        initialRegion={{
          latitude: coord.latitude,
          longitude: coord.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={coord}  />
        
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});
