import React ,{ useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Platform, StyleSheet, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import  AsyncStorage from '@react-native-community/async-storage';
import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }){
    const [user, setUser] = useState('');  
    
    useEffect(() => {
      AsyncStorage.getItem('user').then(user => {
        if(user) {
          navigation.navigate('Main', { user})
        }
      })
    }, []);

    async function handleLogin(){

     const response = await api.post('/devs', { username: user });
     const { _id } = response.data;   

     //console.log(_id);

     await AsyncStorage.setItem('user', _id);
     navigation.navigate('Main', {user:  _id});
   }
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}>
      <Image source={logo}
      behavior="padding"
      enabled={ Platform.OS === 'ios'}
      />

      <TextInput 
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
    
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
         <Text style={styles.buttonText}>Entrar</Text>
       </TouchableOpacity>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,

  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#df4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

});