import {useContext, useEffect, useState} from 'react';
import { StyleSheet, Image, View, Text} from 'react-native';
import { Box, FormControl, Input, WarningOutlineIcon, Button } from "native-base";
import { AuthContext } from "../context/AuthContext";
import { useToast } from 'native-base';

export default function SignInScreen() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUserName, setInvalidUserName] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const { login, successMessage } = useContext(AuthContext);
  const toast = useToast();
  const onSubmit = () => {
    if (username === '' && password === '') {
      setInvalidUserName(true);
      setInvalidPassword(true);
    }
    else if (username === '') {
      setInvalidPassword(false);
      setInvalidUserName(true);
    } else if (password === '') {
      setInvalidUserName(false);
      setInvalidPassword(true);
    } else {
      setInvalidUserName(false);
      setInvalidPassword(false);
      login(username, password);
    }
  }
  useEffect(() => {
    toast.show({
      description: `${successMessage}`
    })
  },[successMessage])

  return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Image source={require('../assets/logo-square.png')} style={styles.topImage} />
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.title}>GARAGE APPLICATION</Text>
          <Image source={require('../assets/garage-blue.png')} style={styles.middleImage} />

          <Box width='100%'>
            <FormControl isInvalid={invalidUserName}>
              {/*<FormControl.Label>Project Title</FormControl.Label>*/}
              <Input
                  placeholder="Username"
                  onChangeText={e => setUserName(e)}
                  borderColor={'#3774CE'}
                  size={'xl'}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Invalid Username
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={invalidPassword}>
              {/*<FormControl.Label>Project Title</FormControl.Label>*/}
              <Input
                  placeholder="password"
                  onChangeText={e => setPassword(e)}
                  type={'password'}
                  borderColor={'#3774CE'}
                  size={'xl'}
                  mt={4}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Invalid Password
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>

          <Button small primary mt={4} bgColor={'#3774CE'} onPress={()=>onSubmit()}>
            <Text style={styles.buttonText}>Login</Text>
          </Button>

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
    fontSize:25,
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
  buttonText:{
    color:'white',
    fontSize:'24'
  }
});
