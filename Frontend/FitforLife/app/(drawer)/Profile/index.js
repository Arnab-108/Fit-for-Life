import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const Profile = () => {
  const [data, setData] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [editedProfileImage, setEditedProfileImage] = useState('')
  const router = useRouter()
  
  
  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('id');
      console.log(storedUserId, "id");

      axios.get(`http://127.0.0.1:8000/api/user/${storedUserId}/`)
        .then((res) => {
          console.log(res.data, "res data"); // Log the received data
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };


  // const handleEditProfile = () => {
  //   setEditModalVisible(true);
  //   setEditedUsername(data.username);
  //   setEditedGender(data.gender);
  //   setEditedAge(data.age.toString());
  //   setEditedLocation(data.location);
  // };

  const handleSaveChanges = () => {
    const editedData = {
      username: editedUsername,
      gender: editedGender,
      age: parseInt(editedAge),
      location: editedLocation,
      profile_image: editedProfileImage, // Include the profile image URL
    };
  
    const userId = data.user_id;
    axios.patch(`http://127.0.0.1:8000/api/user/${userId}/`, editedData)
      .then((res) => {
        // setData(res.data);
        console.log('Profile updated:', res);
        fetchUserId()
        setEditModalVisible(false);
        alert("Data Saved!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(editedProfileImage,"profile Image")
  console.log(data, "data"); // Log the current state of data
  return (
    <View>
      <Drawer.Screen
        options={{
          title: "Profile",             // <== NEW EDIT HERE
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f0f0f0" },
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {data && data.profile_image && (
            <Avatar.Image
              source={{ uri: data.profile_image }} // Use actual image URL
              size={100}
            />
          )}
          {data && data.username && (
            <Title style={styles.username}>{data.username}</Title>
          )}
        </View>
        <Card style={styles.card}>
          <Card.Content>
            {/* Use data properties conditionally */}
            {data && data.gender && (
              <Paragraph style={styles.info}><Text style={styles.gender}>Gender:</Text> {data.gender}</Paragraph>
            )}
            {data && data.age && (
              <Paragraph style={styles.info}><Text style={styles.gender}>Age:</Text> {data.age}</Paragraph>
            )}
            {data && data.location && (
              <Paragraph style={styles.info}> <Text style={styles.gender}>Location:</Text> {data.location}</Paragraph>
            )}
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" style={styles.editButton} onPress={() => setEditModalVisible(true)}>Edit Profile</Button>
          </Card.Actions>
        </Card>
      </View>

      <Modal
        animationType="slide"
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>Edit Profile</Text>
          <TextInput
            label="Username"
            value={editedUsername}
            onChangeText={setEditedUsername}
          />
          <TextInput
            label="Gender"
            value={editedGender}
            onChangeText={setEditedGender}
          />
          <TextInput
            label="Age"
            value={editedAge}
            onChangeText={setEditedAge}
          />
          <TextInput
            label="Location"
            value={editedLocation}
            onChangeText={setEditedLocation}
          />
          <TextInput
            label="Profile Image URL"
            value={editedProfileImage}
            onChangeText={setEditedProfileImage}
          />
          <Button onPress={handleSaveChanges}>Save Changes</Button>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: "7vh"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  gender: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: "2vw"
  },
  card: {
    width: '90vw',
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: "40vh"
  },
  info: {
    marginBottom: 10,
    marginLeft: "4vw"
  },
  editButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderColor: '#3498db',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: "6vh"
  },
});
export default Profile