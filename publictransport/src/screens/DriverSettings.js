// src/screens/DriverSettings.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DriverSettings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Settings</Text>

      <TouchableOpacity style={styles.row}>
        <Ionicons name="language-outline" size={24} />
        <Text style={styles.text}>Change Language</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row}>
        <Ionicons name="color-palette-outline" size={24} />
        <Text style={styles.text}>Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row}>
        <Ionicons name="lock-closed-outline" size={24} />
        <Text style={styles.text}>Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.row, { marginTop: 20 }]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-circle" size={26} color="red" />
        <Text style={[styles.text, { color: "red" }]}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  text: { marginLeft: 12, fontSize: 16 },
});