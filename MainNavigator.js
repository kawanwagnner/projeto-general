import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./src/Pages/Home";
import LoginScreen from "./src/Pages/Login";
import SignupScreen from "./src/Pages/SignUp";
import DetailsEventScreen from "./src/Pages/DetailsEvent";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: true, title: "Login" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ headerShown: true, title: "Sign Up" }}
        />
        <Stack.Screen
          name="DetailsEvent"
          component={DetailsEventScreen}
          options={{ headerShown: true, title: "Event Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
