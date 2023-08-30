import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Settings = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('id');
      router.push(`/Signup`)
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Drawer.Screen
        options={{
          title: "Settings",             
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f0f0f0" },
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logout</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness</Text>
          <Text style={styles.infoText}>
            Stay active and maintain a regular workout routine to improve your fitness and overall health.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition</Text>
          <Text style={styles.infoText}>
            Balanced nutrition is key to a healthy lifestyle. Consume a variety of nutrient-rich foods for optimal health.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Importance of Proper Diet</Text>
          <Text style={styles.infoText}>
            A proper diet provides your body with essential nutrients, fuels your activities, and supports your well-being.
          </Text>
        </View>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Importance of Daily Exercise</Text>
        <Text style={styles.infoText}>
          Regular exercise is vital for maintaining physical and mental well-being. It helps reduce stress,
          improve cardiovascular health, and enhance overall quality of life.
        </Text>
      </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
});
export default Settings