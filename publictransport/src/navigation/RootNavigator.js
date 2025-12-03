// src/navigation/RootNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import RoleSelectScreen from "../screens/RoleSelectScreen";
import AuthScreen from "../screens/AuthScreen";
import DriverHome from "../screens/DriverHome";
import PassengerHome from "../screens/PassengerHome";

import PassengerProfile from "../screens/PassengerProfile";
import PassengerSettings from "../screens/PassengerSettings";
import RoutePlanner from "../screens/RoutePlanner";
import NearByStops from "../screens/NearByStops";
import BusDetails from "../screens/BusDetails";
import TripHistory from "../screens/TripHistory";
import SOSScreen from "../screens/SOSScreen";
import FeedbackScreen from "../screens/FeedbackScreen";

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

        {/* Passenger feature screens */}
        <Stack.Screen name="PassengerProfile" component={PassengerProfile} />
        <Stack.Screen name="PassengerSettings" component={PassengerSettings} />
        <Stack.Screen name="RoutePlanner" component={RoutePlanner} />
        <Stack.Screen name="NearByStops" component={NearByStops} />
        <Stack.Screen name="BusDetails" component={BusDetails} />
        <Stack.Screen name="TripHistory" component={TripHistory} />
        <Stack.Screen name="SOSScreen" component={SOSScreen} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
