import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Button, TextInput } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';


const Goal = () => {

    const [goals, setGoals] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [goal_type, setGoaltype] = useState('')
    const [timeline, setTimeline] = useState('')
    const [target, setTraget] = useState('')
    const goalOptions = ['Select Goal', 'Weight Loss', 'Muscle Gain', 'Cardio Fitness', 'Endurence'];

    useEffect(() => {
        getdata()
    }, []);

    const getdata = async () => {
        try {
            const storedId = await AsyncStorage.getItem('id')
            axios.get(`http://127.0.0.1:8000/api/user/${storedId}/goals/`)
                .then((res) => {
                    console.log(res.data)
                    setGoals(res.data)
                }).catch((err) => {
                    alert("Something went wrong!", err)
                })
        } catch (error) {
            console.error("Something went wrong!", error)
        }
    }

    const handleCreategoal = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('id');
            console.log(storedUserId, "id");

            obj = {
                user_id: storedUserId,
                goal_type,
                timeline,
                target
            }

            axios.post(`http://127.0.0.1:8000/api/create_goal/`, obj)
                .then((res) => {
                    console.log(res)
                    getdata()
                    setEditModalVisible(false)
                    alert("Your new goal created!")
                })
                .catch((err) => {
                    console.log(err);
                });

        } catch (error) {
            console.error('Error creating a Goal:', error);
        }
    };

    const handleValueChange = (index) => {
        const selectedGoal = goalOptions[index];
        setGoaltype(selectedGoal);
    };
    return (
        <View style={styles.container}>
            <Drawer.Screen
                options={{
                    title: "Goals",             // <== NEW EDIT HERE
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#f0f0f0" },
                    headerLeft: () => <DrawerToggleButton />,
                    headerRight: () => <TouchableOpacity style={{marginRight:"5vw"}} onPress={() => setEditModalVisible(true)}><Text><MaterialIcons name="fitness-center" size={24} color="black" /></Text></TouchableOpacity>
                }}
            />
            <View style={styles.container}>
                <FlatList
                    data={goals}
                    keyExtractor={(item, index) => item.user_id}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.header}>
                                    <Avatar.Text size={40} label={item.user_name.charAt(0)} />
                                    <Text style={styles.userName}>{item.user_name}</Text>
                                </View>
                                <Text style={styles.plan}>{item.goal_type}</Text>
                                <Text style={styles.duration}>{item.timeline} months</Text>
                                <Text style={styles.exercises}>{item.target}</Text>
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>

            <Modal
                animationType="slide"
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add Goals</Text>
                    <TextInput
                        placeholder="Target"
                        style={styles.input}
                        value={target}
                        onChangeText={setTraget}
                    />
                    <TextInput
                        placeholder="Timeline (months)"
                        style={styles.input}
                        value={timeline}
                        onChangeText={setTimeline}
                    />
                    <ModalDropdown
                        options={goalOptions}
                        defaultValue="Select Goal"
                        onSelect={handleValueChange}
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        dropdownStyle={styles.dropdownStyle}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.saveButton, styles.saveButtonPrimary]}
                            onPress={handleCreategoal}
                        >
                            <Text style={[styles.saveButtonText, styles.saveButtonTextPrimary]}>Save Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.saveButton, styles.saveButtonSecondary]}
                            onPress={() => setEditModalVisible(false)}
                        >
                            <Text style={[styles.saveButtonText, styles.saveButtonTextSecondary]}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
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
        gap:20
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
export default Goal