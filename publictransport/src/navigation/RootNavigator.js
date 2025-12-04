// src/navigation/RootNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Auth & Common
import SplashScreen from "../screens/SplashScreen";
import RoleSelectScreen from "../screens/RoleSelectScreen";
import AuthScreen from "../screens/AuthScreen";

// Passenger
import PassengerHome from "../screens/PassengerHome";
import PassengerProfile from "../screens/PassengerProfile";
import PassengerSettings from "../screens/PassengerSettings";
import RoutePlanner from "../screens/RoutePlanner";
import NearByStops from "../screens/NearByStops";
import BusDetails from "../screens/BusDetails";
import TripHistory from "../screens/TripHistory";
import SOSScreen from "../screens/SOSScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import TrackDriverLocation from "../screens/TrackDriverLocation";
import TrackBusScreen from "../screens/TrackBusScreen";
import ETAViewScreen from "../screens/ETAViewScreen";


// Driver Screens
import DriverHome from "../screens/DriverHome";
import DriverProfile from "../screens/DriverProfile";
import DriverTrip from "../screens/DriverTrip";
import DriverTripHistory from "../screens/DriverTripHistory";
import DriverRouteMap from "../screens/DriverRouteMap";
import BreakdownReport from "../screens/BreakdownReport";
import DriverSOS from "../screens/DriverSOS";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        
        {/* Common */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />

        {/* Passenger */}
        <Stack.Screen name="PassengerHome" component={PassengerHome} />
        <Stack.Screen name="PassengerProfile" component={PassengerProfile} />
        <Stack.Screen name="PassengerSettings" component={PassengerSettings} />
        <Stack.Screen name="RoutePlanner" component={RoutePlanner} />
        <Stack.Screen name="NearByStops" component={NearByStops} />
        <Stack.Screen name="BusDetails" component={BusDetails} />
        <Stack.Screen name="TripHistory" component={TripHistory} />
        <Stack.Screen name="SOSScreen" component={SOSScreen} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        
<Stack.Screen name="TrackDriverLocation" component={TrackDriverLocation} />

<Stack.Screen name="TrackBus" component={TrackBusScreen} />

<Stack.Screen name="ETAViewScreen" component={ETAViewScreen} />
        {/* Driver */}
        <Stack.Screen name="DriverHome" component={DriverHome} />
        <Stack.Screen name="DriverProfile" component={DriverProfile} />
        <Stack.Screen name="DriverTrip" component={DriverTrip} />
        <Stack.Screen name="DriverTripHistory" component={DriverTripHistory} />
        <Stack.Screen name="DriverRouteMap" component={DriverRouteMap} />
        <Stack.Screen name="BreakdownReport" component={BreakdownReport} />
        <Stack.Screen name="DriverSOS" component={DriverSOS} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
