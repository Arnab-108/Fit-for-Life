import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPlans = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);

    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        try {
            const storedId = await AsyncStorage.getItem('id')
            axios.get(`http://127.0.0.1:8000/api/trainers/${storedId}/workout-plans/`).then((res) => {
                console.log(res.data)
                setWorkoutPlans(res.data)
            }).catch((err) => {
                alert("Something went wrong!", err)
            })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <View>
            <Drawer.Screen
                options={{
                    title: "My Plans",
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#f0f0f0" },
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />
            <View style={styles.container}>
                <Text style={styles.header}>My Workout Plans</Text>
                <FlatList
                    data={workoutPlans}
                    keyExtractor={(item) => item.user_id}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text style={styles.planName}>{item.name}</Text>
                                <Text style={styles.infoText}>Goal: {item.goal}</Text>
                                <Text style={styles.infoText}>Duration: {item.duration} week</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5', // Light gray background
    },
    header: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 40,
        textAlign: 'center',
        color: '#FF5722', // Orange text color
    },
    card: {
        marginBottom: 16,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#FFF', // White card background
        borderColor: '#FFC107', // Yellow border color
        borderWidth: 2,
    },
    planName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2196F3', // Blue text color
    },
    infoText: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333', // Dark gray text color
    },
    description: {
        fontSize: 14,
        marginTop: 8,
        color: '#666', // Gray text color
    },
});

export default MyPlans