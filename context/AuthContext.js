import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const setToken = () => {
        console.log('blabla here')
        axios.get(`http://localhost:3000/api/auth/login`).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const login = () => {
        setIsLoading(true);
        setUserToken('dsfsds');
        AsyncStorage.setItem('userToken', 'dsfsds');
        setIsLoading(false);
        setToken();
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
        // logout();
        // let userToken = AsyncStorage.getItem('userToken');
        // console.log(userToken);
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}} >
            {children}
        </AuthContext.Provider>
    )
}