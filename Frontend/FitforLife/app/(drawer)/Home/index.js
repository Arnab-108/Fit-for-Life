import React from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
const Home = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={{ uri:"https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZpdG5lc3MlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"  }}
        style={styles.backgroundImage}
      />

      <Drawer.Screen
        options={{
          title: "",
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          drawerStyle:{
            backgroundColor:"#fff",
            width:250,
            paddingBottom:"10vh"
          }, // Transparent header
          headerLeft: () => <DrawerToggleButton />,
        }}
      />

      <View style={styles.contentContainer}>
        {/* App Logo */}
        {/* <Image
          source={{uri:"https://thefitness-shop.com.au/wp-content/uploads/2020/10/The-Fitness-Shop-Brands3-150x150.jpg"}} // Replace with your app logo
          style={styles.logo}
        /> */}

        {/* Welcome Message */}
        <Text style={styles.welcomeText}>
          Working on the home screen
        </Text>

        {/* Call to Action */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => {
            router.push("/Profile")
          }}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // opacity: 0.5, // Adjust opacity for the desired effect
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Text color
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#007bff', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home
