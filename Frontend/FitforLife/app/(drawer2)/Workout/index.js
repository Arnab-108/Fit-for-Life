import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
const workout = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
        // Fetch workout plans from API here using axios or fetch
        // Update the workoutPlans state with the fetched data
    }, []);

    const handleCreateWorkoutPlan = async() => {
        try {
            const storedUserId = await AsyncStorage.getItem('id');
            console.log(storedUserId, "id");
            
            obj={
                trainer_id:storedUserId,
                name,
                goal,
                duration,
                description
            }

            axios.post(`http://127.0.0.1:8000/api/create-workout-plan/`,obj)
              .then((res) => {
                console.log(res)
                alert("Workout Plan Created!")
              })
              .catch((err) => {
                console.log(err);
              });
      
          } catch (error) {
            console.error('Error creating the Plan:', error);
          }
    };
    return (
        <View>
            <Drawer.Screen
                options={{
                    title: "Workout Plan",
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#f0f0f0" },
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />
            <View style={styles.container}>
                <Text style={styles.header}>Create Workout Plans</Text>
                <Card style={styles.createCard}>
                    <Card.Content>
                        <TextInput
                            label="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            label="Goal"
                            value={goal}
                            onChangeText={setGoal}
                        />
                        <TextInput
                            label="Duration (week)"
                            value={duration}
                            onChangeText={setDuration}
                        />
                        <TextInput
                            label="Description"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4} // You can adjust this value based on your design
                            style={styles.textarea}
                        />
                        <Button style={{marginTop:20}} mode="contained" onPress={handleCreateWorkoutPlan}>
                            Create Workout Plan
                        </Button>
                    </Card.Content>
                </Card>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        marginBottom: 16,
    },
    planName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    createCard: {
        marginTop: 16,
    },
    textarea: {
        height: 100, // Adjust this value to control the height of the textarea
        textAlignVertical: 'top', // Start the text from the top of the input
    },
    header: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        textAlign:"center"
    },
});

export default workout 