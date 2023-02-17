import { useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, Button, SafeAreaView} from 'react-native';

export default function SignInScreen() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/logo-square.png')} style={styles.topImage} />
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.title}>GARAGE APPLICATION</Text>
        <Image source={require('../assets/garage-blue.png')} style={styles.middleImage} />
        
        <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={newText => setText(newText)}
            defaultValue={username}
        />
        
        <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={newText => setText(newText)}
            defaultValue={password}
        />

        <Button
            onPress={()=>alert("")}
            title="Login"
            color="#3774CE"
        
            style={styles.button}
        />

      </View>
      <View style={styles.bottomContainer}>
        
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
    paddingTop:'10%',
    display:'flex',
    justifyContent:'space-around'
  },
  topImage:{
    height:120,
    width:120,
    alignSelf:'center'
  },
  middleContainer:{
    paddingVertical:20,
    paddingHorizontal:50,
    height:'60%',
    paddingTop:'20%'
  },
  title:{
    fontSize:20,
    textAlign:'center',
    color:'#154897'
  },
  middleImage:{
    height:70,
    width:70,
    alignSelf:'center',
    marginTop:20,
    marginBottom:40
  },
  bottomContainer:{
    height:'10%',
    backgroundColor:'#154897'
  },
  textInput:{
    height: 40,
    borderWidth:1,
    borderColor:"#3774CE",
    borderRadius:10,
    margin:10,
    padding:5
  },
  button:{
    
  }
});
