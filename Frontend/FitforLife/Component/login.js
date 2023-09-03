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
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password,
      });

      alert('Login successful:', response.data);
      console.log(response.data.token)
      console.log(response)
      AsyncStorage.setItem("id", response.data.info.user_id)
      setEmail("")
      setPassword("")
      router.push(`(drawer)/Home`)
    } catch (error) {
      console.error('Signup error:', error);
    }
  };


  return (
    <View style={{ height: "100vh"}}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" }}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        {/* <Text style={styles.header}>Login</Text> */}
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
        <View>
          <Text style={{ marginTop: "2vh",color:"#ccc", textAlign: "center" }}>Don't yet have any Account? <TouchableOpacity

            onPress={() => router.push(`/Signup`)} ><Text style={{ color: "#a1e81c" }}>Signup</Text></TouchableOpacity></Text>
        </View>
        <View>
          <Text style={{ marginTop: "2vh",color:"#ccc", textAlign: "center" }}>Are you a trainer? <TouchableOpacity

            onPress={() => router.push(`/trainerlogin`)} ><Text style={{ color: "#a1e81c" }}>Trainer</Text></TouchableOpacity></Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:50
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 24,
    marginBottom: 50,
    fontWeight:"bold",
    color:"#b1bab9"
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    color:"white",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "transparent"
  },
});

export default Login;