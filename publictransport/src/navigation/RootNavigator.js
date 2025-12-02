// src/navigation/RootNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import RoleSelectScreen from "../screens/RoleSelectScreen";
import AuthScreen from "../screens/AuthScreen";
import DriverHome from "../screens/DriverHome";
import PassengerHome from "../screens/PassengerHome";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="DriverHome" component={DriverHome} />
        <Stack.Screen name="PassengerHome" component={PassengerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
