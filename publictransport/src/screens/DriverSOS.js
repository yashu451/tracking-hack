// src/screens/DriverSOS.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DriverSOS({ navigation }) {
  const sendSOS = () => {
    Alert.alert("SOS Sent", "Emergency alert sent to admin.");
  };

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={80} color="red" style={{ textAlign: "center" }} />
      <Text style={styles.title}>Emergency SOS</Text>

      <TouchableOpacity style={styles.sosButton} onPress={sendSOS}>
        <Text style={styles.sosText}>SEND SOS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.callButton}
        onPress={() => Linking.openURL("tel:100")}
      >
        <Text style={styles.callText}>Call Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center", marginVertical: 20 },
  sosButton: {
    backgroundColor: "red",
    padding: 18,
    borderRadius: 15,
    marginVertical: 10,
  },
  sosText: { color: "#fff", textAlign: "center", fontSize: 20, fontWeight: "800" },
  callButton: {
    backgroundColor: "#1E88E5",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  callText: { color: "#fff", textAlign: "center", fontSize: 18 },
  back: { textAlign: "center", marginTop: 20, color: "#333" },
});