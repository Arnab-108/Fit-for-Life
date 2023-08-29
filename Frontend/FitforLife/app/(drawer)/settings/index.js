import React from 'react'
import { Text, StyleSheet, View } from "react-native";;
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from 'expo-router/drawer';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Drawer.Screen
        options={{
          title: "Settings",             // <== NEW EDIT HERE
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f0f0f0" },
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Text style={{ fontSize: 24 }}> 
        Settings
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Settings