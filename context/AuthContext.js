import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const login = () => {
        setIsLoading(true);
        AsyncStorage.setItem('userToken', 'dsfsds');
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem('userToken');
        setUserToken(null);
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        } catch (err) {
            console.log(`is logged in error ${err}`)
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);
    console.log('here', userToken)
    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}} >
            {children}
        </AuthContext.Provider>
    )
}