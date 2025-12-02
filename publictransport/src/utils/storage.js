// src/utils/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (user) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const getUser = async () => {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export const clearUser = async () => {
  await AsyncStorage.removeItem("user");
};

export const saveDriverLocation = async (coords) => {
  await AsyncStorage.setItem("driver-location", JSON.stringify(coords));
};

export const getDriverLocation = async () => {
  const raw = await AsyncStorage.getItem("driver-location");
  return raw ? JSON.parse(raw) : null;
};
