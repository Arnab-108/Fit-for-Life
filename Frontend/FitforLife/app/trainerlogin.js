import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
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
    <SafeAreaView>
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
        <Text style={{ marginTop: "2vh", textAlign: "center" }}>Wanna be a Trainer? <TouchableOpacity
          
          onPress={() => router.push(`/trainerSignup`)} ><Text style={{ color: "blue" }}>Signup</Text></TouchableOpacity></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop:20,
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});

export default Login;