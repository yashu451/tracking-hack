// src/screens/NearByStops.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getNearbyStops } from "../utils/busData";

// 📌 Re-add this utility function here
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

export default function NearByStops({ route }) {
  const { userLocation } = route.params; // 👈 receive location
  const stops = getNearbyStops();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Stops</Text>

      <FlatList
        data={stops}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.coords}>
              Distance: {getDistance(
                userLocation.latitude,
                userLocation.longitude,
                item.lat,
                item.lng
              )} KM
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16 },
  title:{ fontSize:20, fontWeight:"700", marginBottom:12 },
  row:{ padding:12, backgroundColor:"#fff", marginBottom:8, borderRadius:8 },
  name:{ fontWeight:"700" },
  coords:{ color:"#666", marginTop:4 }
});
