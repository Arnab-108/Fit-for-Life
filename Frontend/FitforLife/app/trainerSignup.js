import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView , Picker, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router'
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [contact_number, setContact] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const router = useRouter()
  const genderOptions = ['Select Gender', 'Male', 'Female', 'Others'];
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signuptrainer/', {
        email,
        password,
        name,
        contact_number,
        age,
        gender,
      });

      alert('Signup success:', response.data);
      setEmail("")
      setPassword("")
      setAge("")
      setName("")
      setContact("")
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
        source={{ uri: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" }}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Trainer Signup</Text>
        <TextInput
          placeholder="Trainer Name"
          onChangeText={text => setName(text)}
          value={name}
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
          placeholder="Contact Number"
          onChangeText={text => setContact(text)}
          value={contact_number}
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
            
            onPress={() => router.push(`/trainerlogin`)}><Text style={{ color: "#fac105" }}>Login</Text></TouchableOpacity></Text>
        </View>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    marginTop:25,
    fontSize: 24,
    marginBottom: 20,
    fontWeight:"bold",
    color:"#f5870a"
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    color:"#f5870a",
    borderColor:"#dbbf07",
    marginBottom: 20,
  },
  dropdown: {
    width: 290,
    borderWidth: 1,
    borderColor: '#e6cb1e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom:20,
  },
  dropdownText: {
    fontSize: 16,
    color:"#f5870a"
  },
  dropdownStyle: {
    width: 290,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Signup;
