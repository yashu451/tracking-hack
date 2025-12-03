// src/screens/DriverAuth.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DriverAuth({ navigation }) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const sendOtp = () => {
    if (!phone.trim()) return Alert.alert("Enter phone");
    // simulate OTP send
    setOtpSent(true);
    Alert.alert("OTP Sent", "Use 1234 for demo");
  };

  const verifyOtp = async () => {
    if (otp !== "1234") return Alert.alert("Invalid OTP", "Use 1234");
    // Save a simple driver profile (demo)
    const user = { role: "driver", name: "Driver Demo", phone, vehicle: "TN-01-AB-1234", license: "DL-123456" };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    navigation.replace("DriverHome");
  };

  const loginWithPassword = async () => {
    if (!phone || !password) return Alert.alert("Provide phone & password");
    // demo accept any password
    const user = { role: "driver", name: "Driver Demo", phone, vehicle: "TN-01-AB-1234", license: "DL-123456" };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    navigation.replace("DriverHome");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Login</Text>

      <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      {!otpSent ? (
        <TouchableOpacity style={styles.btn} onPress={sendOtp}><Text style={styles.btnText}>Send OTP</Text></TouchableOpacity>
      ) : (
        <>
          <TextInput placeholder="Enter OTP (1234)" style={styles.input} value={otp} onChangeText={setOtp} keyboardType="numeric" />
          <TouchableOpacity style={styles.btn} onPress={verifyOtp}><Text style={styles.btnText}>Verify OTP</Text></TouchableOpacity>
        </>
      )}

      <Text style={{ marginTop: 12, textAlign: "center" }}>OR</Text>

      <TextInput placeholder="Password login (demo)" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={loginWithPassword}><Text style={styles.btnText}>Login</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20,justifyContent:"center"},
  title:{fontSize:22,fontWeight:"700",marginBottom:16,textAlign:"center"},
  input:{borderWidth:1,borderColor:"#ddd",borderRadius:8,padding:10,marginBottom:10},
  btn:{backgroundColor:"#1E88E5",padding:12,borderRadius:8,alignItems:"center",marginTop:6},
  btnText:{color:"#fff",fontWeight:"700"}
});