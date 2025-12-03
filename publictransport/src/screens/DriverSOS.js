// src/screens/DriverSOS.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";

export default function DriverSOS() {
  const sendSOS = () => {
    Alert.alert("SOS Sent!", "Emergency alert has been sent to admin!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>

      <TouchableOpacity style={styles.sosBtn} onPress={sendSOS}>
        <Text style={styles.sosText}>SEND SOS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.callBtn}
        onPress={() => Linking.openURL("tel:112")}
      >
        <Text style={styles.callText}>Call Emergency</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 40 },
  sosBtn: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 12,
    width: "70%",
    marginBottom: 20,
  },
  sosText: { color: "#fff", fontWeight: "700", textAlign: "center", fontSize: 18 },
  callBtn: {
    backgroundColor: "#1E88E5",
    padding: 16,
    borderRadius: 10,
    width: "60%",
  },
  callText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
