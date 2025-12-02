// src/screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("RoleSelect"), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient colors={["#1E88E5", "#42A5F5"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>PT</Text>
        <Text style={styles.title}>Public Transport</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: { alignItems: "center" },
  logo: { fontSize: 64, color: "#fff", fontWeight: "800" },
  title: { color: "#fff", marginTop: 8, fontSize: 18, fontWeight: "600" },
});
