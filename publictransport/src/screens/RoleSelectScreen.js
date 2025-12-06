import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { saveUser } from "../utils/storage";


export default function RoleSelectScreen({ navigation }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleProceed = async () => {
    if (!selectedRole) {
      Alert.alert("Select Role", "Please choose Driver or Passenger first!");
      return;
    }
    await saveUser({ role: selectedRole }); // save temporarily
    navigation.replace("Auth", { role: selectedRole });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am a</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.card,
            selectedRole === "passenger" && { borderWidth: 3, borderColor: "#1E88E5" }
          ]}
          onPress={() => setSelectedRole("passenger")}
        >
          <Ionicons name="person-outline" size={48} color="#1E88E5" />
          <Text style={styles.cardText}>Passenger</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            selectedRole === "driver" && { borderWidth: 3, borderColor: "#FFB300" }
          ]}
          onPress={() => setSelectedRole("driver")}
        >
          <Ionicons name="bus-outline" size={48} color="#FFB300" />
          <Text style={styles.cardText}>Driver</Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        title="Proceed"
        onPress={handleProceed}
        style={{ backgroundColor: "#1E88E5", marginTop: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  card: {
    width: 140,
    height: 140,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    elevation: 3
  },
  cardText: { marginTop: 10, fontSize: 16, fontWeight: "600" },
});
