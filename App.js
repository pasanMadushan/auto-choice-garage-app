import React from "react";

import HomeScreen from "./screens/home.screen";
import ScannerScreen from "./screens/scanner.screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App(){
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Scanner" component={ScannerScreen} />
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

