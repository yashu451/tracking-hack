// src/screens/DriverProfile.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DriverProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>Driver Name</Text>

        <Text style={styles.label}>Bus Number:</Text>
        <Text style={styles.value}>KA-01 AB 1234</Text>

        <Text style={styles.label}>Assigned Route:</Text>
        <Text style={styles.value}>Route 201</Text>

        <Text style={styles.label}>Depot Contact:</Text>
        <Text style={styles.value}>080-22334455</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  label: { fontSize: 16, fontWeight: "700", marginTop: 10 },
  value: { fontSize: 16, color: "#555" },
  button: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#1E88E5",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
});