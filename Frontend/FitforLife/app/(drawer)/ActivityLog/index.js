import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, ImageBackground, Image } from 'react-native';
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
            <Image
                source={{ uri: "https://images.unsplash.com/photo-1620239158894-d86d21fb657e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZpdG5lc3MlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" }}
                style={styles.backgroundImage}
            />
            <Drawer.Screen
                options={{
                    title: "Activity Log",             // <== NEW EDIT HERE
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle:{
                        backgroundColor:"#f4511e"
                    },
                    headerTintColor:"#fff",
                    headerTitleStyle:{
                        fontWeight:"bold"
                    },
                    drawerActiveTintColor:"blue",
                    drawerLabelStyle:{
                        color:"#111"
                    },
                    headerLeft: () => <DrawerToggleButton tintColor='white' />,
                    headerRight: () => <TouchableOpacity style={{ marginRight: "5vw" }} onPress={() => setEditModalVisible(true)}><Text><Ionicons name="fitness" size={24} color="white" /></Text></TouchableOpacity>
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
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" }}
                        style={styles.backgroundImage}
                    />
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
        // backgroundColor: 'transparent',
        // height: "70vh",
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    card: {
        marginBottom: 16,
        elevation: 4,
        borderRadius: 12,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    head: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 40,
        textAlign: "center",
        color:"transparent"
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
        borderRadius: 12, // Rounded corners for modals
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    createCard:{
        backgroundColor:"transparent"
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        backgroundColor:"white",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20, // Increased margin bottom for better spacing
        paddingHorizontal: 10,
    },
    textArea: {
        width: "100%",
        height: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20, // Increased margin bottom for better spacing
        paddingHorizontal: 10,
        paddingVertical: 10, // Added padding for text area
    },
    dropdown: {
        width: "100%",
        height: 40,
        backgroundColor: "#f0f0f0",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20, // Increased margin bottom for better spacing
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    dropdownText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    saveButton: {
        flex: 1, // Make buttons equal width and fill the container
        height: 50, // Increased button height
        borderRadius: 25, // Round button corners
        paddingHorizontal: 20, // Increased padding for button text
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonPrimary: {
        backgroundColor: "#007bff",
    },
    saveButtonSecondary: {
        backgroundColor: "#ccc",
        marginLeft: 16, // Added margin between buttons
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Log