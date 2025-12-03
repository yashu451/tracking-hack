import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function TrackDriverLocation() {
  const [passengerLoc, setPassengerLoc] = useState(null);
  const [driverLoc, setDriverLoc] = useState({
    latitude: 12.9716,
    longitude: 77.5946
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location not allowed");
        return;
      }

      let pos = await Location.getCurrentPositionAsync({});
      setPassengerLoc({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    })();
  }, []);

  // simulate driver movement
  useEffect(() => {
    const t = setInterval(() => {
      setDriverLoc(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.0003,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.0003
      }));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  if (!passengerLoc) return null;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...passengerLoc,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* Passenger (Blue Marker) */}
      <Marker coordinate={passengerLoc} pinColor="blue" title="You" />

      {/* Driver (Red Marker) */}
      <Marker coordinate={driverLoc} pinColor="red" title="Driver" />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 }
});
