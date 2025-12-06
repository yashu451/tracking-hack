// src/screens/TicketBooking.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in KM
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
};

export default function TicketBooking() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ticket, setTicket] = useState(null);

  const generateFareAndTicket = () => {
    if (!from || !to) return alert("Please enter both stops");

    // Dummy coordinates for stops
    const stops = {
      A: { lat: 12.3000, lng: 76.6500 },
      B: { lat: 12.3100, lng: 76.6600 },
      C: { lat: 12.3200, lng: 76.6700 },
      D: { lat: 12.3300, lng: 76.6800 },
    };

    if (!stops[from] || !stops[to]) {
      return alert("Invalid stop! Use A, B, C, or D");
    }

    const dist = haversineDistance(
      stops[from].lat,
      stops[from].lng,
      stops[to].lat,
      stops[to].lng
    );

    // Fare formula: Minimum ₹10 + ₹5 per KM
    const fare = Math.max(10, Math.round(dist * 5 + 10));

    const t = {
      id: "T" + Math.floor(Math.random() * 9999),
      from,
      to,
      distance: dist,
      fare,
      time: Date.now(),
    };

    setTicket(t);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Ticket 🎫</Text>

      <TextInput
        placeholder="From (A/B/C/D)"
        style={styles.input}
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        placeholder="To (A/B/C/D)"
        style={styles.input}
        value={to}
        onChangeText={setTo}
      />

      <TouchableOpacity style={styles.button} onPress={generateFareAndTicket}>
        <Text style={styles.btnText}>Generate Ticket</Text>
      </TouchableOpacity>

      {ticket && (
        <View style={styles.ticketBox}>
          <Text style={styles.ticketText}>From: {ticket.from}</Text>
          <Text style={styles.ticketText}>To: {ticket.to}</Text>
          <Text style={styles.ticketText}>Distance: {ticket.distance} km</Text>
          <Text style={styles.ticketText}>Fare: ₹{ticket.fare}</Text>

          <QRCode
            value={`TICKET|${ticket.id}|${ticket.from}|${ticket.to}|${ticket.fare}|${ticket.time}`}
            size={180}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 23, fontWeight: "700", marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: "#aaa", borderRadius: 8,
    paddingHorizontal: 12, marginBottom: 10, height: 45
  },
  button: {
    backgroundColor: "#1E88E5", padding: 12,
    borderRadius: 8, alignItems: "center", marginBottom: 15
  },
  btnText: { color: "#fff", fontWeight: "700" },
  ticketBox: { backgroundColor: "#eee", padding: 15, borderRadius: 12, alignItems: "center" },
  ticketText: { fontSize: 15, marginVertical: 3, fontWeight: "600" }
});
