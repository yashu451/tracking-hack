import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function TrackBusScreen({ route }) {
  const { busId } = route.params;

  const [location, setLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLocation(prev => ({
        ...prev,
        latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          ...location,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={location} title={`Bus ${busId}`} />
      </MapView>
      <View style={styles.label}>
        <Text style={styles.text}>Tracking Bus {busId}...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#1E88E5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "center"
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  }
});
