import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, Picker, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Stack, useRouter } from 'expo-router'
import axios from 'axios';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const [location, setLocation] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const genderOptions = ['Select Gender', 'Male', 'Female', 'Others'];
  const router = useRouter()
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        email,
        password,
        username,
        location,
        age,
        gender,
      });

      alert('Signup successfull!');
      setEmail("")
      setPassword("")
      setAge("")
      setUsername("")
      setLocation("")
      setGender("")
    } catch (error) {
      console.error('Signup error:', error);
    }
  };
  const handleValueChange = (index) => {
    const selectedGender = genderOptions[index];
    setGender(selectedGender);
  };
  return (
    <SafeAreaView style={{height:"100vh"}}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGZpdG5lc3MlMjBzaWdudXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" }}
        style={styles.backgroundImage}
      />
      {/* <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerTitle: "Signup",
        }}
      /> */}
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
        <ModalDropdown
          options={genderOptions}
          defaultValue="Select Gender"
          onSelect={handleValueChange}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownStyle}
        />

        <Button title="Signup" onPress={handleSignup} />

        <View>
          <Text style={{ marginTop: "2vh",color:"#ccc" }}>Already have an Account? <TouchableOpacity

            onPress={() => router.push(`/`)} ><Text style={{ color: "#fa0255" }}>Login</Text></TouchableOpacity></Text>
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color:"#ccc"
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor:"#ccc",
    color:"white",
    marginBottom: 20,
  },
  dropdown: {
    width: 290,
    borderWidth: 1,
    borderColor: '#ccc',
    color:"white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom:"4vh",
  },
  dropdownText: {
    fontSize: 16,
    color:"white"
  },
  dropdownStyle: {
    width: 290,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Signup;
