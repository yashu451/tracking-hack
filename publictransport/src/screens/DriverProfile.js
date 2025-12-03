// src/screens/DriverProfile.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DriverProfile({ navigation }) {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [depotContact, setDepotContact] = useState("");

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        setUser(u);
        setName(u.name || "");
        setVehicle(u.vehicle || "");
        setDepotContact(u.depotContact || u.adminPhone || "");
      }
    })();
  }, []);

  const save = async () => {
    const updated = { ...user, name, vehicle, depotContact };
    await AsyncStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
    Alert.alert("Saved", "Profile updated");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("RoleSelect");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Profile</Text>
      {editing ? (
        <>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.input} value={vehicle} onChangeText={setVehicle} placeholder="Vehicle" />
          <TextInput style={styles.input} value={depotContact} onChangeText={setDepotContact} placeholder="Depot contact" />
          <TouchableOpacity style={styles.btn} onPress={save}><Text style={styles.btnText}>Save</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: "#999" }]} onPress={() => setEditing(false)}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.info}>Name: {user.name || "-"}</Text>
          <Text style={styles.info}>Vehicle: {user.vehicle || "-"}</Text>
          <Text style={styles.info}>Depot: {user.depotContact || user.adminPhone || "-"}</Text>
          <TouchableOpacity style={styles.btn} onPress={() => setEditing(true)}><Text style={styles.btnText}>Edit</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: "#FF4444" }]} onPress={logout}><Text style={styles.btnText}>Logout</Text></TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20},
  title:{fontSize:20,fontWeight:"700",marginBottom:12},
  input:{borderWidth:1,borderColor:"#ccc",borderRadius:8,padding:10,marginBottom:8},
  btn:{backgroundColor:"#1E88E5",padding:12,borderRadius:8,alignItems:"center",marginTop:8},
  btnText:{color:"#fff",fontWeight:"700"},
  info:{fontSize:16,marginBottom:8}
});
