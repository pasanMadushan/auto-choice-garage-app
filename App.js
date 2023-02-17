import React from "react";
import HomeScreen from "./screens/home.screen";
import ScannerScreen from "./screens/scanner.screen";
import ClaimScreen from "./screens/claim.screen";
import SignInScreen from "./screens/sign-in.screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App(){
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false}} >
      <Stack.Screen name="SignIn" component={SignInScreen}/>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="Claim" component={ClaimScreen}/>
    </Stack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  );
}

