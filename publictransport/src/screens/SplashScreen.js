// src/screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen({ navigation }) {
  const scaleAnim = new Animated.Value(0.5);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Zoom + Fade animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();

    const t = setTimeout(() => navigation.replace("RoleSelect"), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient colors={["#0D47A1", "#1976D2"]} style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ scale: scaleAnim }], opacity: fadeAnim },
        ]}
      >
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>S</Text>
        </View>
        <Text style={styles.appName}>Sanchari</Text>
        <Text style={styles.tagline}>Track Smart • Travel Smarter</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: "#FFFFFF22",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  logoText: {
    fontSize: 60,
    color: "#fff",
    fontWeight: "900",
  },
  appName: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "800",
    marginTop: 12,
  },
  tagline: {
    fontSize: 14,
    color: "#E3F2FD",
    marginTop: 5,
    letterSpacing: 1,
  },
});
