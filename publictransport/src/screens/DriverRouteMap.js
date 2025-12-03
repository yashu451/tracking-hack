// src/screens/DriverRouteMap.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function DriverRouteMap() {
  const [tracking, setTracking] = useState(false);

  const handleStart = () => {
    setTracking(true);
    Alert.alert("Trip Started", "GPS tracking enabled!");
  };

  const handleEnd = () => {
    setTracking(false);
    Alert.alert("Trip Ended", "Trip saved to history!");
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 12.9716,
          longitude: 77.5946,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{ latitude: 12.9716, longitude: 77.5946 }}
          title="Bus Location"
        />
      </MapView>

      <View style={styles.buttons}>
        {!tracking ? (
          <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
            <Text style={styles.txt}>Start Trip</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.endBtn} onPress={handleEnd}>
            <Text style={styles.txt}>End Trip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttons: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  startBtn: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 10,
  },
  endBtn: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 10,
  },
  txt: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
