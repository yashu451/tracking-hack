import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");

  const login = async (role) => {
    if (!name.trim()) return alert("Enter your name!");
    const user = { name, role };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    navigation.replace(role === "driver" ? "DriverHome" : "PassengerHome");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Public Transport App</Text>
      <TextInput style={styles.input} placeholder="Enter Name" value={name} onChangeText={setName} />
      <TouchableOpacity style={styles.btn} onPress={() => login("passenger")}>
        <Text style={styles.btnText}>Continue as Passenger</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { backgroundColor: "#ff3b30" }]} onPress={() => login("driver")}>
        <Text style={styles.btnText}>Continue as Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RoleSelect")}>
        <Text style={styles.link}>Select Role First</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 26, textAlign: "center", fontWeight: "700", color: "#007AFF", marginBottom: 20 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 10 },
  btn: { backgroundColor: "#007AFF", padding: 14, borderRadius: 8, marginVertical: 8 },
  btnText: { color: "#fff", fontSize: 16, textAlign: "center" },
  link: { color: "#007AFF", textAlign: "center", marginTop: 10 }
});
