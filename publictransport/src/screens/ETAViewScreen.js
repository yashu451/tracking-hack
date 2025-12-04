import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ETAViewScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ETA Reminder</Text>

      <Text style={styles.text}>
        You will be notified when the bus is near your stop 🚍🔔
      </Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#444",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  }
});
