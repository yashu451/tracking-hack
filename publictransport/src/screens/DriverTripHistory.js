// src/screens/DriverTripHistory.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DriverTripHistory() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("trip_history");
      setTrips(raw ? JSON.parse(raw) : []);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip History</Text>
      <FlatList data={trips} keyExtractor={i => i.id} renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.route}>{new Date(item.startedAt).toLocaleString()}</Text>
          <Text>{item.positions?.length || 0} GPS points</Text>
          <TouchableOpacity style={styles.btn} onPress={() => alert("Open details (demo)")}>
            <Text style={{ color:"#fff" }}>View</Text>
          </TouchableOpacity>
        </View>
      )} ListEmptyComponent={<Text style={{color:"#666"}}>No trips recorded</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  title:{fontSize:20,fontWeight:"700",marginBottom:12},
  card:{backgroundColor:"#fff",padding:12,borderRadius:8,marginBottom:8},
  route:{fontWeight:"700"},
  btn:{backgroundColor:"#1E88E5",padding:8,borderRadius:8,alignItems:"center",marginTop:8,width:100}
});