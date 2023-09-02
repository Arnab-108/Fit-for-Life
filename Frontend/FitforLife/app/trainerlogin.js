import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState(false)
  const router = useRouter()
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/logintrainer/', {
        email,
        password,
      });

      alert('Login successful:', response.data);
      console.log(response.data.token)
      console.log(response)
      AsyncStorage.setItem("id", response.data.info.user_id)
      setEmail("")
      setPassword("")
      router.push(`/(drawer2)/Trainer`)
    } catch (error) {
      console.error('Signup error:', error);
    }
  };


  return (
    <SafeAreaView style={{height:"100vh"}}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhaW5lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" }}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Trainer Login</Text>
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>

      <View>
        <Text style={{ marginTop: "2vh", textAlign: "center",color:"#ccc" }}>Wanna be a Trainer? <TouchableOpacity
          
          onPress={() => router.push(`/trainerSignup`)} ><Text style={{ color: "#a1e81c" }}>Signup</Text></TouchableOpacity></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop:"15vh"
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop:20,
    paddingBottom:20,
    fontSize: 24,
    marginBottom: 20,
    color:"white"
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderColor:"#ccc",
    color:"white"
  },
});

export default Login;