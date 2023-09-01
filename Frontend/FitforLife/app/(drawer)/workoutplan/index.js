import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
// import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wrokout = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);

    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        try {
            axios.get(`http://127.0.0.1:8000/api/all-workout-plans/`).then((res) => {
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
                    title: "",
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#f0f0f0" },
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />

            <View style={styles.container}>
                <Text style={styles.head}>Workout Plans</Text>
                <FlatList
                    data={workoutPlans}
                    keyExtractor={(item, index) => item.user_id}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.header}>
                                    <Avatar.Text size={40} label={item.trainer_name.charAt(0)} />
                                    <Text style={styles.userName}>{item.trainer_name}</Text>
                                </View>
                                <Text style={styles.plan}>{item.name}</Text>
                                <Text style={styles.duration}>{item.goal}</Text>
                                <Text style={styles.duration}>{item.duration} week</Text>
                                <Text style={styles.exercises}>{item.description}</Text>
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
    head: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
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

export default Wrokout