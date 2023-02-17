import React from "react";
import { NavigationContainer } from "@react-navigation/native";
 import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./context/AuthContext";
import { AppStack } from "./screens/AppStack";

function App(){

    return (
        <NativeBaseProvider>
            <AuthProvider>
                <AppStack />
            </AuthProvider>
        </NativeBaseProvider>
    )
}

export default () => {
    return (
        <NavigationContainer>
            <App/>
        </NavigationContainer>
    );
}

