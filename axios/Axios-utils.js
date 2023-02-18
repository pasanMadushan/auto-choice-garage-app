import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = axios.create({ baseURL: 'http://10.10.6.199:3000/api' });

export const request = async ({...options}) => {
    client.defaults.headers.common.Authorization = await AsyncStorage.getItem('userToken');
    const onSuccess = (response) => response;
    const onError = (error) => {
        return error;
    }
    return client(options).then(onSuccess).catch(onError);
}