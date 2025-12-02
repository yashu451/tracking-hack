// src/screens/AuthScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import { saveUser } from "../utils/storage";
import { Ionicons } from "@expo/vector-icons";

export default function AuthScreen({ route, navigation }) {
  const [role, setRole] = useState(route?.params?.role || "passenger");
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [vehicle, setVehicle] = useState("");

  const handleLogin = async () => {
    if (!name || !password) return Alert.alert("Error", "Enter name and password");
    // dummy login
    await saveUser({ role, name, password });
    navigation.replace(role === "driver" ? "DriverHome" : "PassengerHome");
  };

  const handleSignup = async () => {
    if (!name || !email || !phone || !password) return Alert.alert("Error", "Please fill all fields");
    if (role === "driver" && !vehicle) return Alert.alert("Error", "Please enter vehicle number");

    // Save all details locally
    await saveUser({ role, name, email, phone, password, vehicle });
    Alert.alert("Success", "Account created successfully!");
    navigation.replace(role === "driver" ? "DriverHome" : "PassengerHome");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isSignup ? "Create Account" : `Login as ${role}`}</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      </View>

      {isSignup && (
        <>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#666" style={styles.icon} />
            <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
          </View>

          {role === "driver" && (
            <View style={styles.inputContainer}>
              <Ionicons name="car-outline" size={20} color="#666" style={styles.icon} />
              <TextInput placeholder="Vehicle Number" value={vehicle} onChangeText={setVehicle} style={styles.input} />
            </View>
          )}
        </>
      )}

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      </View>

      <CustomButton
        title={isSignup ? "Sign Up" : "Login"}
        onPress={isSignup ? handleSignup : handleLogin}
        style={{ backgroundColor: "#1E88E5", marginTop: 20 }}
      />

      <TouchableOpacity onPress={() => setIsSignup(!isSignup)} style={{ marginTop: 15 }}>
        <Text style={{ textAlign: "center", color: "#1E88E5" }}>
          {isSignup ? "Already have an account? Login" : "Create a new account"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginBottom: 12, paddingHorizontal: 10 },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 45 },
});
