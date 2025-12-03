// src/screens/RoutePlanner.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { estimateFare } from "../utils/busData";

export default function RoutePlanner({ navigation }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distanceKm, setDistanceKm] = useState("2.5");

  const handlePlan = () => {
    if (!from || !to) return Alert.alert("Error", "Enter from and to");
    const fare = estimateFare(Number(distanceKm));
    navigation.navigate("PassengerHome");
    Alert.alert("Route Planned", `From: ${from}\nTo: ${to}\nEstimated fare: ₹${fare}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan Journey</Text>
      <TextInput placeholder="From" value={from} onChangeText={setFrom} style={styles.input} />
      <TextInput placeholder="To" value={to} onChangeText={setTo} style={styles.input} />
      <TextInput placeholder="Distance (km) (demo)" value={distanceKm} onChangeText={setDistanceKm} style={styles.input} keyboardType="numeric" />
      <TouchableOpacity style={styles.button} onPress={handlePlan}><Text style={styles.btnText}>Plan & Estimate Fare</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:"center" },
  title:{ fontSize:22, fontWeight:"700", marginBottom:12 },
  input:{ borderWidth:1, borderColor:"#ccc", borderRadius:8, padding:10, marginBottom:10 },
  button:{ backgroundColor:"#1E88E5", padding:12, borderRadius:8, alignItems:"center" },
  btnText:{ color:"#fff", fontWeight:"700" },
});
