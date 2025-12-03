// src/screens/NearByStops.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getNearbyStops } from "../utils/busData";

export default function NearByStops() {
  const stops = getNearbyStops();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Stops</Text>
      <FlatList data={stops} keyExtractor={s=>s.id} renderItem={({item})=>(
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.coords}>{item.lat.toFixed(4)}, {item.lng.toFixed(4)}</Text>
        </View>
      )} />
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
