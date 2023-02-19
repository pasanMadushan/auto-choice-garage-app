import React, {useEffect, useState} from 'react';
import { StyleSheet, View} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {Icon, IconButton, ScrollView, Text, Image, Input, FormControl, WarningOutlineIcon, Button} from "native-base";
import { Entypo } from "@expo/vector-icons";
import flex from "native-base/src/components/primitives/Flex";
import TextHeader from "../components/TextHeader";
import * as ImagePicker from 'expo-image-picker';
import { request } from "../axios/Axios-utils";


export default function ClaimScreen({route}) {

    const [estimateImg, setEstimateImg] = useState(null);
    const [claimId, setClaimId] = useState(route.params.claimId);
    const [claimData, setClaimData] = useState(null);
    const [estimatedValue, setEstimatedValue] = useState('');
    const navigation = useNavigation();
    const damageImageList = [
        'https://wallpaperaccess.com/full/317501.jpg',
        'https://wallpaperaccess.com/full/317501.jpg',
        'https://wallpaperaccess.com/full/317501.jpg',
        'https://wallpaperaccess.com/full/317501.jpg',
        'https://wallpaperaccess.com/full/317501.jpg'
    ];

    const getClaimDetails = async () => {
        return await request({url: '/customer/get-claim-details', method: 'post', data: {claimId}});
    }

    const updateClaimEstimation = async () => {
        return await request({url: '/garage/update-claim-estimation', method: 'post', data: {claimId}});
    }

    useEffect(() => {
        getClaimDetails().then((response) => {
            setClaimData(response.data.data[0]);
        })
    }, [claimId]);
    console.log(claimData);
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

    const onConfirmEstimation = () => {
        if (estimatedValue !== '') {
            getClaimDetails()
        }
    }

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
                    <Text style={styles.claimIdText} fontSize={'3xl'} numberOfLines={1}>{`#${claimId}`}</Text>
                </View>
                <View style={styles.nameBar}>
                    <Text fontSize={'xl'} color={'#154897'}>Customer</Text>
                    <Text fontSize={'3xl'} color={'#154897'}>{claimData?.first_name + ' ' + claimData?.last_name}</Text>
                </View>
                <View style={styles.locationAndTimeView}>
                    <View style={styles.dataTimeView}>
                        <Image alt='date-time-image' source={require('../assets/date-time.png')} style={styles.dataTimeImage} />
                        <View style={{display: 'flex', alignSelf: 'center'}}>
                            <Text color='white'>{claimData?.datetime.split(' ')[0]}</Text>
                            <Text color='white'>{claimData?.datetime.split(' ')[1]}</Text>
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
                                {claimData?.model}
                            </Text>
                        </View>
                        <View>
                            <TextHeader text='VEHICLE NUMBER'/>
                            <Text
                                fontSize='2xl'
                                color='#154897'
                                style={{marginTop: 5}}
                            >
                                {claimData?.number}
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
                            {claimData?.description}
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
                        <FormControl isInvalid={estimatedValue === null} style={{marginTop: 10, marginBottom: 20}}>
                            <Input
                                placeholder="Final Estimated Value"
                                onChangeText={(e) => {
                                    setEstimatedValue(e)}}
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
        color: 'white',
        width: 250,
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
