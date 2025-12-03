// src/screens/TripHistory.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const DUMMY_TRIPS = [
  { id:"t1", route:"Stop A → Stop B", date:"2025-11-25", fare: 25 },
  { id:"t2", route:"Stop C → Stop D", date:"2025-11-26", fare: 18 },
];

export default function TripHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip History</Text>
      <FlatList data={DUMMY_TRIPS} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.card}><Text style={styles.route}>{item.route}</Text><Text>{item.date} • ₹{item.fare}</Text></View>
      )} />
    </View>
  );
}
const styles = StyleSheet.create({ container:{flex:1,padding:16}, title:{fontSize:20,fontWeight:"700",marginBottom:8}, card:{padding:12,background:"#fff",borderRadius:8,marginBottom:8} , route:{fontWeight:"700"} });
