// src/screens/PassengerHome.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../utils/storage";
import { DUMMY_BUSES, getNearbyStops } from "../utils/busData";
import * as Location from "expo-location";


export default function PassengerHome({ navigation }) {
  const [passenger, setPassenger] = useState({});
  const [query, setQuery] = useState("");
  const [buses, setBuses] = useState(DUMMY_BUSES);
  const [nearStops, setNearStops] = useState([]);
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      const u = await getUser();
      if (u) setPassenger(u);
      
    })();
  }, []);
  // REQUEST LOCATION PERMISSION + LIVE USER LOCATION
useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission required!");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    updateLocation(loc.coords.latitude, loc.coords.longitude);

    // 🔄 Live location watch
    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 20 },
      (loc) => {
        updateLocation(loc.coords.latitude, loc.coords.longitude);
      }
    );
  })();
}, []);

const updateLocation = (lat, lng) => {
  setRegion({
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Move buses around user based on live location
  const updatedBuses = DUMMY_BUSES.map(b => ({
    ...b,
    lat: lat + (Math.random() - 0.5) * 0.003, 
    lng: lng + (Math.random() - 0.5) * 0.003,
    etaMin: Math.max(1, b.etaMin - 1)
  }));
  setBuses(updatedBuses);

  // Automatically generate nearby stops based on user location
  

  // 🔍 NEW → Generate real nearby stops based on live location
  const autoStops = [
    { id: "ST01", name: "Stop A", lat: lat + 0.0009, lng: lng + 0.001 },
    { id: "ST02", name: "Stop B", lat: lat - 0.001, lng: lng + 0.0008 },
    { id: "ST03", name: "Stop C", lat: lat + 0.0011, lng: lng - 0.0007 },
  ];
  setNearStops(autoStops);
};


  // simulate live updates (buses moving slightly)
  useEffect(() => {
    const t = setInterval(() => {
      setBuses(prev => prev.map(b => ({ ...b, lat: b.lat + (Math.random() - 0.5) * 0.0004, lng: b.lng + (Math.random() - 0.5) * 0.0004, etaMin: Math.max(1, b.etaMin - 1) })));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const openRoutePlanner = () => navigation.navigate("RoutePlanner");
  const openNearby = () => navigation.navigate("NearByStops");
  const openTripHistory = () => navigation.navigate("TripHistory");
  const openSOS = () => navigation.navigate("SOSScreen");

  const handleSearch = () => {
  if (!query.trim())
    return Alert.alert("Search", "Enter bus, route or stop");

  const q = query.toLowerCase();

  // Filter matching buses
  const filteredBuses = buses.filter(
    (b) =>
      b.id.toLowerCase().includes(q) ||
      b.route.toLowerCase().includes(q)
  );

  if (filteredBuses.length > 0) {
    const firstBus = filteredBuses[0];

    // Focus map on first result
    setRegion({
      latitude: firstBus.lat,
      longitude: firstBus.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    setBuses(filteredBuses); // 👈 show only searched bus in list
    return;
  }

  // Filter nearby stops
  const filteredStops = nearStops.filter((s) =>
    s.name.toLowerCase().includes(q)
  );

  if (filteredStops.length > 0) {
    const stop = filteredStops[0];

    setRegion({
      latitude: stop.lat,
      longitude: stop.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    setNearStops(filteredStops); // 👈 show only matching stop
    return;
  }

  Alert.alert("No Results", "Try different bus / route / stop name");
};


  const renderBus = ({ item }) => (
    <TouchableOpacity style={styles.busCard} onPress={() => navigation.navigate("BusDetails", { bus: item })}>
      <Text style={styles.busTitle}>Bus {item.id} • {item.route}</Text>
      <Text style={styles.busSubtitle}>ETA: {item.etaMin} min • Seats: {item.seatsAvailable}</Text>
    </TouchableOpacity>
  );
  const showLiveLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Enable location services");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  
  setRegion({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  Alert.alert("Live Location Updated!");
};


  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("PassengerProfile")}>
          <Ionicons name="person-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Find Transport</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={openSOS} style={styles.iconBtn}><Ionicons name="alert-circle" size={26} color="#fff" /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("PassengerSettings")} style={styles.iconBtn}><Ionicons name="settings" size={26} color="#fff" /></TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput placeholder="Search bus / route / stop" value={query} onChangeText={(text) => {
  setQuery(text);
  if (text.length === 0) {
    setBuses(DUMMY_BUSES);  // reset list
    setNearStops(getNearbyStops());
  }
}}
 style={styles.searchInput} />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}><Ionicons name="search" size={20} color="#fff" /></TouchableOpacity>
      </View>

      {/* Shortcuts */}
      <View style={styles.shortcutRow}>
        <TouchableOpacity style={styles.shortcut} onPress={openNearby}><Ionicons name="location-outline" size={22} /><Text>Nearby Stops</Text></TouchableOpacity>
       <TouchableOpacity style={styles.shortcut} onPress={() => navigation.navigate("TrackDriverLocation") }>
  <Ionicons name="navigate-outline" size={22} />
  <Text>Live Location</Text>
</TouchableOpacity>


        <TouchableOpacity style={styles.shortcut} onPress={openRoutePlanner}><Ionicons name="calendar-outline" size={22} /><Text>Plan Route</Text></TouchableOpacity>
        <TouchableOpacity style={styles.shortcut} 
  onPress={() => navigation.navigate("ETAViewScreen")}>
  <Ionicons name="alarm-outline" size={22} />
  <Text>ETA Reminder</Text>
</TouchableOpacity>

      </View>

      {/* Map */}
      <MapView
  style={styles.map}
  region={region}
  showsUserLocation={true}
  followsUserLocation={true}
>
  {/* Bus Markers */}
  {buses.map((b) => (
    <Marker
      key={b.id}
      coordinate={{ latitude: b.lat, longitude: b.lng }}
      title={`Bus ${b.id}`}
      description={`${b.route} • ETA ${b.etaMin} min`}
    />
  ))}

  {/* Dynamic Nearby Stops */}
  {nearStops.map((stop) => (
    <Marker
      key={stop.id}
      coordinate={{ latitude: stop.lat, longitude: stop.lng }}
      title={stop.name}
      pinColor="green"
    />
  ))}
</MapView>


      {/* Live buses list */}
      <View style={styles.livePanel}>
        <Text style={styles.liveTitle}>Buses Near You</Text>
        <FlatList horizontal data={buses} renderItem={renderBus} keyExtractor={i=>i.id} showsHorizontalScrollIndicator={false} />
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBtn} onPress={openTripHistory}><Ionicons name="time-outline" size={20} /><Text>Trips</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={() => navigation.navigate("FeedbackScreen")}><Ionicons name="chatbubble-ellipses" size={20} /><Text>Feedback</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn} onPress={() => Linking.openURL("tel:112")}><Ionicons name="call" size={20} /><Text>Helpline</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, backgroundColor: "#1E88E5" },
  topTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  iconBtn: { marginLeft: 12 },
  searchRow: { flexDirection: "row", padding: 10, alignItems: "center" },
  searchInput: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, paddingHorizontal: 10, height: 42 },
  searchBtn: { marginLeft: 8, backgroundColor: "#1E88E5", padding: 10, borderRadius: 8 },
  shortcutRow: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 8 },
  shortcut: { alignItems: "center", width: "23%", backgroundColor: "#f7f7f7", padding: 8, borderRadius: 8 },
  map: { flex: 1, marginHorizontal: 10, borderRadius: 12, marginBottom: 6 },
  livePanel: { paddingVertical: 8 },
  liveTitle: { fontWeight: "700", marginLeft: 12, marginBottom: 6 },
  busCard: { backgroundColor: "#fff", padding: 10, marginHorizontal: 8, borderRadius: 10, elevation: 2, minWidth: 180 },
  busTitle: { fontWeight: "700" },
  busSubtitle: { color: "#555", marginTop: 6 },
  bottomBar: { flexDirection: "row", justifyContent: "space-around", padding: 10, backgroundColor: "#fff" },
  bottomBtn: { alignItems: "center" },
});
