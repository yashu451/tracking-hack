// src/screens/PassengerSettings.js
import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

export default function PassengerSettings() {
  const [notif, setNotif] = React.useState(true);
  const [dark, setDark] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}><Text>Notifications</Text><Switch value={notif} onValueChange={setNotif} /></View>
      <View style={styles.row}><Text>Dark Mode</Text><Switch value={dark} onValueChange={setDark} /></View>
      <View style={styles.row}><Text>Language</Text><Text> English</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:22, fontWeight:"700", marginBottom:12 },
  row:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingVertical:12 }
});
