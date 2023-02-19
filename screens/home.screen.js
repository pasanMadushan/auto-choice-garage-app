import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {Button} from "native-base";
import {request} from "../axios/Axios-utils";

export default function HomeScreen() {

    let garageName = 'AUTO MIRAJ ENTERPRISES'

    const navigation = useNavigation();

    const testingApi = () => {
        return request({url: '/auth/test', method: 'post'});
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <Image source={require('../assets/LOGO-WHITE-CROPPED.png')} style={styles.topImage} />
                <Text style={styles.garageName}>{garageName}</Text>
            </View>

            <View style={styles.middleContainer}>
    
                <TouchableOpacity onPress={()=>navigation.navigate('Scanner')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth:6, borderColor:'#3774CE', borderRadius:10,  }}>
                        <Text style={{ marginLeft: 10, fontSize: 40, color: '#154897' }}>
                            SCAN QR
                        </Text>
                        <Image
                            source={require('../assets/qr.png')}
                            style={{ width: 100, height: 100, margin:20 }}
                        />
                    </View>
                </TouchableOpacity>
                <Button title='Testing Api' onPress={() => testingApi()}>
                </Button>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        height:'100%'
    },
    topContainer:{
        backgroundColor: '#154897',
        height:'40%',
        padding:40
    },
    topImage:{
        height:60,
        width:75,
        alignSelf:'center',
        marginTop:'25%'
    },
    garageName:{
        padding:25,
        fontSize:28,
        textAlign:'center',
        color:'white'
    },
    middleContainer:{
        paddingVertical:20,
        paddingHorizontal:40,
        height:'60%'
    }
});
