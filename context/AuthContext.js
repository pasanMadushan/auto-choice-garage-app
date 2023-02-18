import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState('');

    // pasan -  172.20.10.2
    // kaveesh - 10.10.6.199

    const login = async (username, password) => {
        setIsLoading(true);
        Axios.post('http://172.20.10.2:3000/api/auth/login',
            { userName:username, password:password }).
        then(async(response) => {
            if (response.data.data){
                setUserToken(response.data.data.jwt);
                await AsyncStorage.setItem('userToken', response.data.data.jwt);
            }     
        }).catch((err) => {
            console.log(err);
        })
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

    useEffect( () => {
        isLoggedIn();
        logout();
        // let userToken = AsyncStorage.getItem('userToken');
        // console.log(userToken);
        // console.log('fdfdf')
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}} >
            {children}
        </AuthContext.Provider>
    )
}