import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function TicketBooking({ navigation }) {
  const [ticket, setTicket] = useState(null);

  const buyTicket = () => {
    const t = {
      id: Math.random().toString(36).substring(2, 8),
      time: new Date().toLocaleTimeString(),
      from: "Stop A",
      to: "Stop B",
      fare: "₹20"
    };
    setTicket(t);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Ticket</Text>

      {!ticket ? (
        <TouchableOpacity style={styles.buyBtn} onPress={buyTicket}>
          <Text style={styles.btnText}>Buy Ticket</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.ticketBox}>
          <Text style={styles.label}>Bus Ticket</Text>
          <QRCode value="phonepe://pay" size={150} />


          <Text style={styles.detail}>From: {ticket.from}</Text>
          <Text style={styles.detail}>To: {ticket.to}</Text>
          <Text style={styles.detail}>Fare: {ticket.fare}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 40 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  buyBtn: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  ticketBox: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  detail: { marginTop: 6, fontSize: 14, fontWeight: "600" }
});
