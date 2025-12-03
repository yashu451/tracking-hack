// src/screens/PassengerProfile.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { getUser, saveUser, clearUser } from "../utils/storage";

export default function PassengerProfile({ navigation }) {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(()=>{ (async()=>{ const u = await getUser(); if(u){ setUser(u); setName(u.name||''); setPhone(u.phone||''); setEmail(u.email||''); } })(); }, []);

  const save = async () => {
    const newUser = { ...user, name, phone, email };
    await saveUser(newUser);
    setUser(newUser);
    setEditing(false);
    Alert.alert("Saved", "Profile updated");
  };

  const logout = async () => {
    await clearUser();
    navigation.replace("RoleSelect");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {editing ? (
        <>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" keyboardType="phone-pad" />
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
          <TouchableOpacity style={styles.button} onPress={save}><Text style={styles.btnText}>Save</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor:"#999" }]} onPress={()=>setEditing(false)}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.info}>Name: {user.name||"—"}</Text>
          <Text style={styles.info}>Phone: {user.phone||"—"}</Text>
          <Text style={styles.info}>Email: {user.email||"—"}</Text>
          <TouchableOpacity style={styles.button} onPress={()=>setEditing(true)}><Text style={styles.btnText}>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor:"#FF4444" }]} onPress={logout}><Text style={styles.btnText}>Logout</Text></TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:22, fontWeight:"700", marginBottom:12 },
  info:{ fontSize:16, marginBottom:8 },
  input:{ borderWidth:1, borderColor:"#ccc", borderRadius:8, padding:10, marginBottom:8 },
  button:{ backgroundColor:"#1E88E5", padding:12, borderRadius:8, alignItems:"center", marginTop:8 },
  btnText:{ color:"#fff", fontWeight:"700" }
});
