// src/screens/DriverHome.js
import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Vibration } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*
 - Shows driver profile summary, depot/admin contact
 - Shows pending ride requests (from AsyncStorage "ride_requests")
 - Accept/Reject requests which move accepted to "accepted_rides"
 - Start/Stop Trip quick nav to DriverTrip (detailed trip dashboard)
 - Quick actions: SOS, Call Admin, Report Breakdown
*/

export default function DriverHome({ navigation }) {
  const [driver, setDriver] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [location, setLocation] = useState({ latitude: 12.9716, longitude: 77.5946, latitudeDelta: 0.01, longitudeDelta: 0.01 });

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("user");
      if (raw) setDriver(JSON.parse(raw));
      await loadRequests();
      await loadAccepted();
    })();
  }, []);

  const loadRequests = async () => {
    const raw = await AsyncStorage.getItem("ride_requests");
    setPendingRequests(raw ? JSON.parse(raw) : []);
  };

  const loadAccepted = async () => {
    const raw = await AsyncStorage.getItem("accepted_rides");
    setAccepted(raw ? JSON.parse(raw) : []);
  };

  const saveAccepted = async (arr) => {
    await AsyncStorage.setItem("accepted_rides", JSON.stringify(arr));
    setAccepted(arr);
  };

  const removePending = async (id) => {
    const raw = await AsyncStorage.getItem("ride_requests");
    const arr = raw ? JSON.parse(raw) : [];
    const updated = arr.filter(r => r.id !== id);
    await AsyncStorage.setItem("ride_requests", JSON.stringify(updated));
    setPendingRequests(updated);
  };

  const acceptRequest = async (req) => {
    const newAccepted = [req, ...accepted];
    await saveAccepted(newAccepted);
    await removePending(req.id);
    Vibration.vibrate(200);
    Alert.alert("Accepted", `Accepted request from ${req.id || req.name || "passenger"}`);
  };

  const rejectRequest = async (req) => {
    await removePending(req.id);
    Alert.alert("Rejected", `Rejected request from ${req.id || req.name || "passenger"}`);
  };

  const startTrip = () => navigation.navigate("DriverTrip");
  const openProfile = () => navigation.navigate("DriverProfile");

  const reportBreakdown = () => Alert.alert("Breakdown", "Reported breakdown to admin (demo)");
  const callAdmin = () => {
    const phone = driver.adminPhone || driver.depotContact || "112";
    // use Linking in UI; here demo alert
    Alert.alert("Call Admin", `Call ${phone}`);
  };
  const sendSOS = () => Alert.alert("SOS", "SOS sent to depot/admin (demo)");

  const renderPending = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.reqTitle}>{item.pickup} → {item.drop}</Text>
        <Text style={styles.reqSub}>Passengers: {item.passengers || 1}</Text>
        <Text style={styles.reqSub}>Time: {item.time ? new Date(item.time).toLocaleString() : "-"}</Text>
      </View>
      <View style={{ justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.acceptBtn} onPress={() => acceptRequest(item)}><Text style={styles.acceptText}>Accept</Text></TouchableOpacity>
        <TouchableOpacity style={styles.rejectBtn} onPress={() => rejectRequest(item)}><Text style={styles.rejectText}>Reject</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openProfile}><Ionicons name="person-circle-outline" size={34} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Home</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={sendSOS} style={{ marginRight: 12 }}><Ionicons name="alert-circle" size={26} color="#fff" /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("DriverSettings")}><Ionicons name="settings-outline" size={26} color="#fff" /></TouchableOpacity>
        </View>
      </View>

      {/* profile card */}
      <View style={styles.profileCard}>
        <Ionicons name="bus" size={52} color="#1976D2" />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.name}>{driver.name || "Driver Name"}</Text>
          <Text style={styles.info}>{driver.vehicle || "Vehicle: —"} • {driver.routeAssigned || driver.routeAssigned}</Text>
          <Text style={styles.info}>Depot: {driver.depotContact || "—"}</Text>
        </View>
        <TouchableOpacity style={styles.startBtn} onPress={startTrip}><Text style={styles.startBtnText}>Start Trip</Text></TouchableOpacity>
      </View>

      {/* map - small preview */}
      <MapView style={styles.map} region={location}>
        <Marker coordinate={location} title="You" />
      </MapView>

      {/* pending requests */}
      <Text style={styles.sectionTitle}>Pending Requests</Text>
      <FlatList
        data={pendingRequests}
        keyExtractor={(i) => i.id}
        renderItem={renderPending}
        ListEmptyComponent={<Text style={{ padding: 12, color: "#666" }}>No pending requests</Text>}
        style={styles.list}
      />

      {/* accepted */}
      <Text style={styles.sectionTitle}>Accepted Rides</Text>
      <FlatList
        data={accepted}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.acceptedCard}>
            <Text style={styles.reqTitle}>{item.pickup} → {item.drop}</Text>
            <Text style={styles.reqSub}>Time: {item.time ? new Date(item.time).toLocaleString() : "-"}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ padding: 12, color: "#666" }}>No accepted rides</Text>}
        style={styles.list}
      />

      {/* quick actions */}
      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickBtn} onPress={callAdmin}><Ionicons name="call" size={18} /><Text>Call Admin</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={reportBreakdown}><Ionicons name="warning" size={18} /><Text>Breakdown</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate("DriverTripHistory")}><Ionicons name="time-outline" size={18} /><Text>History</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, backgroundColor: "#1E88E5" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  profileCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", margin: 10, padding: 12, borderRadius: 12, elevation: 2 },
  name: { fontSize: 18, fontWeight: "700" },
  info: { color: "#555" },
  startBtn: { backgroundColor: "#FF7043", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  startBtnText: { color: "#fff", fontWeight: "700" },
  map: { height: 140, marginHorizontal: 10, borderRadius: 12, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginLeft: 12, marginTop: 10 },
  list: { maxHeight: 150, marginHorizontal: 10 },
  requestCard: { flexDirection: "row", backgroundColor: "#fff", padding: 10, marginTop: 8, borderRadius: 10, elevation: 1 },
  reqTitle: { fontWeight: "700" },
  reqSub: { color: "#444", marginTop: 4 },
  acceptBtn: { backgroundColor: "#34C759", padding: 8, borderRadius: 8, marginBottom: 6 },
  acceptText: { color: "#fff", fontWeight: "700" },
  rejectBtn: { backgroundColor: "#FF3B30", padding: 8, borderRadius: 8 },
  rejectText: { color: "#fff", fontWeight: "700" },
  acceptedCard: { backgroundColor: "#f7f7f7", padding: 10, marginTop: 8, borderRadius: 8 },
  quickRow: { flexDirection: "row", justifyContent: "space-around", padding: 12, backgroundColor: "#fff", marginTop: 8 },
  quickBtn: { alignItems: "center", width: "30%", padding: 8, borderRadius: 8, backgroundColor: "#f1f1f1" },
});
