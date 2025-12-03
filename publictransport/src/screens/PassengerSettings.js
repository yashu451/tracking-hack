import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PassengerSettings({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.item, { backgroundColor: "#FF3B30" }]}
        onPress={() => navigation.replace("Auth")}
      >
        <Text style={[styles.itemText, { color: "#fff" }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 3,
  },
  title: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700" },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 10,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  itemText: { fontSize: 16, fontWeight: "600" },
});
