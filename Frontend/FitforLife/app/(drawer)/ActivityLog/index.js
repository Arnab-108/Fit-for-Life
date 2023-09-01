import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
const Log = () => {
    const [workoutLogs, setWorkoutLogs] = useState([]);
    const [duration, setDuration] = useState('')
    const [exercises, setExercises] = useState('')
    const [workout_plan, setWorkout] = useState('')
    const [date, setDate] = useState(new Date());
    const [editModalVisible, setEditModalVisible] = useState(false);
    const logOptions = ['Select Goal', 'Weight Loss', 'Muscle Gain', 'Cardio Fitness'];
    
    useEffect(() => {
        getdata()
    }, []);

    const getdata = async () => {
        try {
            const storedId = await AsyncStorage.getItem('id')
            axios.get(`http://127.0.0.1:8000/api/user/${storedId}/workout-logs/`)
                .then((res) => {
                    console.log(res.data)
                    setWorkoutLogs(res.data)
                }).catch((err) => {
                    alert("Something went wrong!", err)
                })
        } catch (error) {
            console.error("Something went wrong!", error)
        }
    }


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
                    getdata()
                    setDuration("")
                    setDate("")
                    setExercises("")
                    setWorkout("")
                    setEditModalVisible(false)
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
        <View style={styles.container}>
            <Drawer.Screen
                options={{
                    title: "Activity Log",             // <== NEW EDIT HERE
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#f0f0f0" },
                    headerLeft: () => <DrawerToggleButton />,
                    headerRight: () => <TouchableOpacity style={{ marginRight: "5vw" }} onPress={() => setEditModalVisible(true)}><Text><Ionicons name="fitness" size={24} color="red" /></Text></TouchableOpacity>
                }}
            />
            <View style={styles.container}>
                <FlatList
                    data={workoutLogs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.header}>
                                    <Avatar.Text size={40} label={item.user_name.charAt(0)} />
                                    <Text style={styles.userName}>{item.user_name}</Text>
                                </View>
                                <Text style={styles.date}>{item.date}</Text>
                                <Text style={styles.plan}>{item.workout_plan}</Text>
                                <Text style={styles.duration}>{item.duration} minutes</Text>
                                <Text style={styles.exercises}>{item.exercises}</Text>
                            </Card.Content>
                        </Card>
                    )}
                />

                <Modal
                    animationType="slide"
                    visible={editModalVisible}
                    onRequestClose={() => setEditModalVisible(false)}
                >
                    <View style={styles.container}>
                        <Text style={styles.head}>Enter your logs</Text>
                        <Card style={styles.createCard}>
                            <Card.Content>
                                <TextInput
                                    placeholder="Duration (minuites)"
                                    style={styles.input}
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
                                    placeholder="Exercises"
                                    value={exercises}
                                    onChangeText={setExercises}
                                    multiline
                                    numberOfLines={4} // You can adjust this value based on your design
                                    style={styles.input}
                                />
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.saveButton, styles.saveButtonPrimary]}
                                        onPress={handleCreateWorkoutLog}
                                    >
                                        <Text style={[styles.saveButtonText, styles.saveButtonTextPrimary]}>Create Logs</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.saveButton, styles.saveButtonSecondary]}
                                        onPress={() => setEditModalVisible(false)}
                                    >
                                        <Text style={[styles.saveButtonText, styles.saveButtonTextSecondary]}>Back</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        height: "70vh"
    },
    card: {
        marginBottom: 16,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    head:{
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 40,
        textAlign: "center"
    },
    userName: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 4,
    },
    plan: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    duration: {
        fontSize: 14,
        color: '#009688',
        marginBottom: 4,
    },
    exercises: {
        fontSize: 14,
        lineHeight: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    dropdown: {
        width: "100%",
        height: 40,
        backgroundColor: "#f0f0f0",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    dropdownText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        gap: 20
    },
    saveButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 140,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    saveButtonPrimary: {
        backgroundColor: "#007bff",
    },
    saveButtonSecondary: {
        backgroundColor: "#ccc",
    },
    saveButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
export default Log