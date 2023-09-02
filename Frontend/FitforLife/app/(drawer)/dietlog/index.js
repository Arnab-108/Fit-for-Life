import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, Image } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
const Log = () => {
    const [workoutLogs, setWorkoutLogs] = useState([]);
    const [calories, setCalories] = useState('')
    const [meals, setMeals] = useState('')
    const [nutrition_plan, setNutrition] = useState('')
    const [date, setDate] = useState(new Date());
    const [editModalVisible, setEditModalVisible] = useState(false);
    const logOptions = ['Select Goal', 'Weight Loss', 'Muscle Gain', 'Cardio Fitness'];

    useEffect(() => {
        getdata()
    }, []);

    const getdata = async () => {
        try {
            const storedId = await AsyncStorage.getItem('id')
            axios.get(`http://127.0.0.1:8000/api/user/${storedId}/nutrition-logs/`)
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
                calories,
                meals,
                nutrition_plan,
                date,
            }

            axios.post(`http://127.0.0.1:8000/api/create_user_nutrition_log/`, obj)
                .then((res) => {
                    console.log(res)
                    getdata()
                    setCalories("")
                    setDate("")
                    setMeals("")
                    setNutrition("")
                    setEditModalVisible(false)
                    alert("Nutrition Log Created!")
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
        setNutrition(selectedGoal);
    };
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" }}
                style={styles.backgroundImage}
            />
            <Drawer.Screen
                options={{
                    title: "Diet Log",             // <== NEW EDIT HERE
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#ffff" },
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
                                <Text style={styles.plan}>{item.nutrition_plan}</Text>
                                <Text style={styles.duration}>{item.calories} cal</Text>
                                <Text style={styles.exercises}>{item.meals}</Text>
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
                        source={{ uri: "https://images.unsplash.com/photo-1567769541495-338ee7203e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" }}
                        style={styles.backgroundImage}
                    />
                    <View style={styles.container}>
                        {/* <Text style={styles.head}>Enter your logs</Text> */}
                        <Card style={styles.createCard}>
                            <Card.Content>
                                <TextInput
                                    placeholder="Calories"
                                    style={styles.input}
                                    value={calories}
                                    onChangeText={setCalories}
                                />
                                <ModalDropdown
                                    options={logOptions}
                                    defaultValue="Select Plan"
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
                                    placeholder="Meals"
                                    value={meals}
                                    onChangeText={setMeals}
                                    multiline
                                    numberOfLines={4} // You can adjust this value based on your design
                                    style={styles.textArea}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 20,
        paddingBottom:20,
        borderRadius: 12, 
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    createCard:{
        backgroundColor:"transparent",
        // position:"relative",
        // top:"12vh"
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        // marginTop:40,
        marginBottom: 20, // Increased margin bottom for better spacing
        paddingHorizontal: 10,
        backgroundColor: "white"
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
        backgroundColor:"white",
    },
    dropdown: {
        width: "100%",
        height: 40,
        backgroundColor: "#f0f0f0",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        // marginTop:40,
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