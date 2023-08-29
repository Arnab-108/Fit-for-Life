import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView , Picker } from 'react-native';
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
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#f0f0f0" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
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
          <Text style={{ marginTop: "2vh" }}>Already have an Account? <TouchableOpacity
            
            onPress={() => router.push(`/trainerlogin`)}><Text style={{ color: "blue" }}>Login</Text></TouchableOpacity></Text>
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
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  dropdown: {
    width: 290,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom:20,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownStyle: {
    width: 290,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Signup;
