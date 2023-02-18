import React, {useContext} from "react";
import SignInScreen from "./sign-in.screen";
import HomeScreen from "./home.screen";
import ScannerScreen from "./scanner.screen";
import ClaimScreen from "./claim.screen";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const AppStack = () => {

    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{flex:1, justifyContent: 'space-around', flexDirection: 'row', padding:10}}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <>
            {userToken === null ?
                (
                    <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false}} >
                        <Stack.Screen name="SignIn" component={SignInScreen}/>
                    </Stack.Navigator>
                ) :
                (
                    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}} >
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="Scanner" component={ScannerScreen} />
                        <Stack.Screen name="Claim" component={ClaimScreen}/>
                    </Stack.Navigator>
                )}
        </>
    )
}