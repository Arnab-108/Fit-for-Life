import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router'
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const [location, setLocation] = useState('')
  const [age, setAge] = useState('')
  const router = useRouter()
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        email,
        password,
        username,
        location,
        age,
      });

      alert('Signup success:', response.data);
      setEmail("")
      setPassword("")
      setAge("")
      setUsername("")
      setLocation("")
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#f0f0f0" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Signup</Text>
        <TextInput
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
          style={styles.input}
        />
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
        <TextInput
          placeholder="Location"
          onChangeText={text => setLocation(text)}
          value={location}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          onChangeText={text => setAge(text)}
          value={age}
          style={styles.input}
        />

        <Button title="Signup" onPress={handleSignup} />

        <View>
          <Text style={{ marginTop: "2vh" }}>Already have an Account? <TouchableOpacity
            style={{ color: "blue" }}
            onPress={() => router.push(`/`)} >Login</TouchableOpacity></Text>
        </View>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
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

export default Signup;
