import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import axios from 'axios';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Log = () => {
    const [workoutLogs, setWorkoutLogs] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
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

    return (
        <View style={styles.container}>
            <Drawer.Screen
                options={{
                    title: "Activity Log",             // <== NEW EDIT HERE
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#f0f0f0" },
                    headerLeft: () => <DrawerToggleButton />,
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
});
export default Log