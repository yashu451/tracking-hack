import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ETAReminderScreen() {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [countdown, setCountdown] = useState(null);

  // Timer logic
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      Alert.alert("Reminder", "Bus has arrived!");
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const onTimeSelect = (event, date) => {
    setShowPicker(false);
    if (!date) return;

    setSelectedTime(date);
    const now = new Date();
    const diff = Math.floor((date - now) / 1000); // seconds

    if (diff <= 0) {
      Alert.alert("Invalid Time", "Select a future time!");
      return;
    }
    setCountdown(diff);
  };

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}m : ${s}s`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ETA Reminder</Text>

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.btn}
      >
        <Text style={styles.btnText}>
          {selectedTime ? "Change Time" : "Set Reminder Time"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          onChange={onTimeSelect}
        />
      )}

      {countdown !== null && (
        <Text style={styles.countdown}>
          Bus coming in: {formatTime(countdown)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 25, fontWeight: "bold", marginBottom: 20 },
  btn: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  countdown: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
  },
});
