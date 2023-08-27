import React from 'react'
import {Text , SafeAreaView, ScrollView, View} from "react-native"
import { Stack , useRouter } from 'expo-router'
import Login from '../Component/login'


const App = () => {
  return (
    <SafeAreaView>
        <Stack.Screen 
            options={{
                headerStyle: { backgroundColor: "#f0f0f0" },
                headerShadowVisible: false,
                headerTitle: "",
            }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <Login />
            </View>
        </ScrollView>
    </SafeAreaView>

  )
}

export default App