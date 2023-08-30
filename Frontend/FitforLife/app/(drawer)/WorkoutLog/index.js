import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

const Activity = () => {

    const [name, setName] = useState('')
    const [duration, setDuration] = useState('')
    const [exercises, setExercises] = useState('')
    const [workout_plan, setWorkout] = useState('')
    const [date, setDate] = useState(new Date());
    const logOptions = ['Select Goal', 'Weight Loss', 'Muscle Gain', 'Cardio Fitness'];

    const handleCreateWorkoutLog = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('id');
            console.log(storedUserId, "id");

            obj = {
                user_id: storedUserId,
                duration,
                exercises,
                workout_plan,
                date,
            }

            axios.post(`http://127.0.0.1:8000/api/create_user_workout_log/`, obj)
                .then((res) => {
                    console.log(res)
                    alert("Workout Log Created!")
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.error('Error creating the Plan:', error);
        }
    };

    const handleValueChange = (index) => {
        const selectedGoal = logOptions[index];
        setWorkout(selectedGoal);
    };
    return (
        <View>
            <Drawer.Screen
                options={{
                    title: "Activity Logs",
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
                            label="Duration (minuites)"
                            value={duration}
                            onChangeText={setDuration}
                        />
                        <ModalDropdown
                            options={logOptions}
                            defaultValue="Select Workout"
                            onSelect={handleValueChange}
                            style={styles.dropdown}
                            textStyle={styles.dropdownText}
                            dropdownStyle={styles.dropdownStyle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Select Date (YYYY-MM-DD)"
                            value={date}
                            onChangeText={setDate}
                        />

                        <TextInput
                            label="Exercises"
                            value={exercises}
                            onChangeText={setExercises}
                            multiline
                            numberOfLines={4} // You can adjust this value based on your design
                            style={styles.textarea}
                        />
                        <Button style={{ marginTop: 20 }} mode="contained"
                            onPress={handleCreateWorkoutLog}
                        >
                            Create Workout Log
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
        height: 100,
        textAlignVertical: 'top',
    },
    header: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
    },
    dropdown: {
        width: 295,
        height: 55,
        backgroundColor: "#eadfed",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "gray"
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
    datePicker: {
        width: 200, // Adjust the width as needed
        alignSelf: 'center', // Center the date picker horizontally
        marginTop: 10,
        marginBottom: 20,
    },
});

export default Activity