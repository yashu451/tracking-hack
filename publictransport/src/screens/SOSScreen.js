// src/screens/SOSScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Linking } from "react-native";

export default function SOSScreen() {
  const [msg, setMsg] = useState("I need help. My location: (demo)");
  const sendSOS = () => {
    // demo: open sms or dial; here we open sms with predefined body (Android intent may vary)
    const phone = "1234567890"; // driver / emergency
    const url = `sms:${phone}?body=${encodeURIComponent(msg)}`;
    Linking.openURL(url).catch(()=>Alert.alert("SOS", "Unable to open SMS"));
  };

  const callEmergency = () => Linking.openURL("tel:112");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS / Emergency</Text>
      <TextInput style={styles.input} value={msg} onChangeText={setMsg} multiline />
      <TouchableOpacity style={styles.button} onPress={sendSOS}><Text style={styles.btnText}>Send SOS Message</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.button,{backgroundColor:"#FF3B30"}]} onPress={callEmergency}><Text style={styles.btnText}>Call Emergency</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20},
  title:{fontSize:20,fontWeight:"700",marginBottom:12},
  input:{borderWidth:1,borderColor:"#ccc",borderRadius:8,padding:10,height:100,marginBottom:12},
  button:{backgroundColor:"#1E88E5",padding:12,borderRadius:8,alignItems:"center",marginBottom:8},
  btnText:{color:"#fff",fontWeight:"700"}
});
