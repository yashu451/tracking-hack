// src/screens/BreakdownReport.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function BreakdownReport() {
  const [msg, setMsg] = useState("");

  const submitReport = () => {
    if (!msg.trim()) return Alert.alert("Enter issue details");
    Alert.alert("Reported", "Admin has been notified!");
    setMsg("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breakdown Report</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe issue..."
        multiline
        value={msg}
        onChangeText={setMsg}
      />

      <TouchableOpacity style={styles.btn} onPress={submitReport}>
        <Text style={styles.btnText}>Send Report</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    height: 140,
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
  },
  btn: {
    backgroundColor: "#1E88E5",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 18, textAlign: "center" },
});
