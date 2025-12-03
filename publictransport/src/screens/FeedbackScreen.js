// src/screens/FeedbackScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";

export default function FeedbackScreen() {
  const [msg, setMsg] = useState("");
  const submit = () => { if(!msg.trim()) return Alert.alert("Feedback","Write something"); Alert.alert("Thanks", "Feedback submitted"); setMsg(""); };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback / Report Issue</Text>
      <TextInput value={msg} onChangeText={setMsg} placeholder="Describe issue or feedback" style={styles.input} multiline />
      <TouchableOpacity style={styles.button} onPress={submit}><Text style={styles.btnText}>Submit</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{flex:1,padding:20},
  title:{fontSize:20,fontWeight:"700",marginBottom:12},
  input:{borderWidth:1,borderColor:"#ccc",borderRadius:8,padding:10,height:150,marginBottom:12},
  button:{backgroundColor:"#1E88E5",padding:12,borderRadius:8,alignItems:"center"},
  btnText:{color:"#fff",fontWeight:"700"}
});
