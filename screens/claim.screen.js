import React,{ useState } from 'react';
import { StyleSheet, View} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {Icon, IconButton, ScrollView, Text, Image, Input, FormControl, WarningOutlineIcon, Button} from "native-base";
import { Entypo } from "@expo/vector-icons";
import flex from "native-base/src/components/primitives/Flex";
import TextHeader from "../components/TextHeader";
import * as ImagePicker from 'expo-image-picker';


export default function ClaimScreen() {

    const [estimateImg, setEstimateImg] = useState(null);
    const navigation = useNavigation();
    const claimId = '234234nwern3';
    const damageImageList = [
        'https://wallpaperaccess.com/full/317501.jpg',
        'https://wallpaperaccess.com/full/317501.jpg',
        'https://wallpaperaccess.com/full/317501.jpg',
        'https://wallpaperaccess.com/full/317501.jpg',
        'https://wallpaperaccess.com/full/317501.jpg'
    ];

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setEstimateImg(result.assets[0]);
            console.log(result.assets[0]);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <View style={styles.claimIdBar}>
                    <IconButton
                        icon={
                        <Icon as={Entypo} name="back" color={'white'}/>
                    }
                        borderRadius="full"
                        onPress={()=>navigation.navigate('Home')}
                    />
                    <Text style={styles.claimIdText} fontSize={'3xl'}>{`#${claimId}`}</Text>
                </View>
                <View style={styles.nameBar}>
                    <Text fontSize={'xl'} color={'#154897'}>Customer</Text>
                    <Text fontSize={'3xl'} color={'#154897'}>Kaveesh Charuka</Text>
                </View>
                <View style={styles.locationAndTimeView}>
                    <View style={styles.dataTimeView}>
                        <Image alt='date-time-image' source={require('../assets/date-time.png')} style={styles.dataTimeImage} />
                        <View style={{display: 'flex', alignSelf: 'center'}}>
                            <Text color='white'>2022/12/12</Text>
                            <Text color='white'>12.23AM</Text>
                        </View>
                    </View>
                    <View style={styles.dataTimeView}>
                        <Image alt='location-image' source={require('../assets/location.png')} style={styles.dataTimeImage} />
                        <View style={{display: 'flex', alignSelf: 'center'}}>
                            <Text color='white'>Dangedara</Text>
                            <Text color='white'>Galle</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView style={{margin: 0, padding: 0}}>
                <View style={{paddingHorizontal:30, paddingVertical: 10, marginBottom:40}}>
                    <Text style={{color:'#154897'}} fontSize={'3xl'}>VEHICLE/DAMAGE</Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}
                    >
                        <View>
                            <TextHeader text='VEHICLE MODEL'/>
                            <Text
                                fontSize='2xl'
                                color='#154897'
                                style={{marginTop: 5}}
                            >
                                Toyoto Vitz
                            </Text>
                        </View>
                        <View>
                            <TextHeader text='VEHICLE NUMBER'/>
                            <Text
                                fontSize='2xl'
                                color='#154897'
                                style={{marginTop: 5}}
                            >
                                CEB-1233
                            </Text>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <TextHeader text='NUMBER IMAGE'/>
                        <Image source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg"
                        }} alt="number-image" size="xl"  style={{marginTop: 15}} />
                    </View>
                    <View style={{marginTop: 10}}>
                        <TextHeader text='DAMAGE IMAGES'/>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection : 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-evenly'
                            }}
                        >
                            {damageImageList.map((image , key) => {
                                return <Image source={{
                                    uri: `${image}`
                                }} alt={`${key}-damage-image`} size="xl"  style={{marginTop: 15}} key={key} />
                            })}
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <TextHeader text='DESCRIPTION' />
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#3774ce',
                        paddingHorizontal:30,
                        paddingVertical: 10,
                        marginBottom:40
                }}
                >
                    <View>
                        <Text fontSize={'3xl'} color='white' >ESTIMATE NOW</Text>
                        <FormControl isInvalid={false} style={{marginTop: 10, marginBottom: 20}}>
                            <Input
                                placeholder="Final Estimated Value"
                                onChangeText={() => {
                                    console.log('hi')}}
                                borderColor={'white'}
                                bgColor={'white'}
                                size={'2xl'}
                                keyboardType={'numeric'}
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Invalid value
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <View style={{display:'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text fontSize={'2xl'} color='white' style={{display: 'flex', alignSelf: 'center'}}>Upload Receipt</Text>
                            <IconButton icon={<Icon as={Entypo} size={'6xl'} name="camera" color={'white'}/>} borderRadius="full" />
                            <IconButton icon={<Icon as={Entypo} size={'6xl'} name="upload" color={'white'}/>} borderRadius="full" onPress={pickImage}/>
                        </View>
                        {estimateImg && (
                            <View style={{marginTop: 10, display: 'flex', alignSelf: 'center'}}>
                                <Image source={{
                                    uri: `${estimateImg?.uri}`
                                }} alt="number-image" size="xl"  style={{marginTop: 15}} />
                            </View>
                        )}
                        <Button
                            style={{marginTop: 20, backgroundColor: '#3eb134'}}
                            onPress={()=>navigation.navigate('Home')}
                        >
                            <Text>CONFIRM ESTIMATION</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        height:'100%'
    },
    topContainer:{
        backgroundColor: '#154897',
        height:'35%',
        paddingVertical: 40,
        paddingHorizontal: 30,
    },
    claimIdBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%'
    },
    claimIdText: {
        display: 'flex',
        alignSelf: 'center',
        color: 'white'
    },
    nameBar: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 20,
        marginTop: 10
    },
    locationAndTimeView: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 30
    },
    dataTimeImage: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    dataTimeView: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center'
    }
});
