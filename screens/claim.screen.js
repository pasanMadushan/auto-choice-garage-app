import React,{ useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function ClaimScreen() {

    const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        
      </View>

      <View style={styles.middleContainer}>
    
       
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
    height:'30%',
    padding:40
  }
});
