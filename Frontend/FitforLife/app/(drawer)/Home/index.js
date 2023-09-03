import React from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import data from './data';
const Home = () => {
  const router = useRouter()
  const fitness = data
  console.log(fitness)
  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <Drawer.Screen
        options={{
          title: "FIT FOR LIFE",
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#cd853f" },
          headerTintColor: "#fff",
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250,
          }, // Transparent header
          headerLeft: () => <DrawerToggleButton tintColor='white' />,
        }}
      />

      <View style={{ backgroundColor: "#cd853f", padding: 10, height: 150, width: "100%" }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text style={{ textAlign: "center", fontWeight: "bold", color: "white", fontSize: "18" }}>0</Text>
            <Text style={{ color: "#d0d0d0", fontSize: 17, marginTop: 6 }}>WORKOUTS</Text>
          </View>
          <View>
            <Text style={{ textAlign: "center", fontWeight: "bold", color: "white", fontSize: "18" }}>0</Text>
            <Text style={{ color: "#d0d0d0", fontSize: 17, marginTop: 6 }}>CAL INTAKE</Text>
          </View>

          <View>
            <Text style={{ textAlign: "center", fontWeight: "bold", color: "white", fontSize: "18" }}>0</Text>
            <Text style={{ color: "#d0d0d0", fontSize: 17, marginTop: 6 }}>MINUITES</Text>
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image style={{ width: "90%", height: 120, marginTop: 20, borderRadius: 7 }} source={{ uri: "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1968&q=80" }} />
        </View>

        <View>
          {/* <ScrollView> */}
            {
              fitness.map((el)=>(
                <TouchableOpacity style={{alignItems:"center" , justifyContent:"center" , margin:15}} key={el.id} onPress={() => {
                  router.push({pathname:`fit-info/${el.id}`, params:{image:el.image}});
              }}>
                  <Image style={{width:"95%" , height:140 , borderRadius:7}} source={{uri:el.image}} />
                  <Text style={{position:"absolute" , color:"white" , fontSize:16 , fontWeight:"bold" , left:20 , top:20}}>{el.name}</Text>
                  <MaterialCommunityIcons style={{position:"absolute" , bottom:15 , left:20}} name="lightning-bolt" size={24} color="white" />
                </TouchableOpacity>
              ))
            }
          {/* </ScrollView> */}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'Black', // Text color
    marginBottom: 20,
  },

});

export default Home
