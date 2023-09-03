import { Drawer } from 'expo-router/drawer';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerItemList } from '@react-navigation/drawer';
import { View, SafeAreaView, Image } from 'react-native';

export default function Layout() {
    return (
        <Drawer
            drawerContent={
                (props) => {
                    return (
                        <SafeAreaView>
                            <View style={{
                                height: 120,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomColor: '#f4f4f4',
                                borderBottomWidth: 1,
                                // backgroundColor: 'blue',
                                // position: "relative",
                                // bottom: "10vh"
                            }}>
                                <Image
                                    source={{ uri: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" }}
                                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                />
                            </View>
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    )
                }
            }
            screenOptions={{
                headerShown: false, swipeEdgeWidth: 0,
                drawerStyle: {
                    backgroundColor: "#fff",
                    width: 270,
                },
                headerStyle: {
                    backgroundColor: "#f4511e"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                },
                drawerActiveTintColor: "blue",
                drawerLabelStyle: {
                    color: "#111"
                }
            }}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                    drawerIcon: ({ size, color }) => <Entypo name="home" size={size} color={color} />,
                    // drawerStyle: { paddingTop: "10vh" }
                }}
            />
            <Drawer.Screen
                name="Profile"
                options={{
                    drawerLabel: "Profile",
                    title: "Profile",
                    drawerIcon: ({ size, color }) => <AntDesign name="profile" size={size} color={color} />,
                    // drawerStyle: { paddingTop: "10vh" }
                }}
            />
            <Drawer.Screen
                name="Goals"
                options={{
                    drawerLabel: "Goals",
                    title: "Goals",
                    drawerIcon: ({ size, color }) => <Ionicons name="fitness" size={size} color={color} />,
                    // drawerStyle: { paddingTop: "10vh" }
                }}
            />
            <Drawer.Screen
                name="dietlog"
                options={{
                    drawerLabel: "Daily Diet",
                    title: "Daily Diet",
                    headerStyle: { backgroundColor: "transparent" },
                    drawerIcon: ({ size, color }) => <MaterialCommunityIcons name="food-variant" size={size} color={color} />,
                    // drawerStyle: { paddingTop: "10vh" }
                }}
            />
            <Drawer.Screen
                name="ActivityLog"
                options={{
                    drawerLabel: "Daily Activity",
                    title: "Daily Activity",
                    drawerIcon: ({ size, color }) => <Feather name="activity" size={size} color={color} />,
                    // drawerStyle: { paddingTop: "10vh" }
                }}
            />
            <Drawer.Screen
                name="nutritionplan"
                options={{
                    drawerLabel: "Diet Plans",
                    title: "Diet Plans",
                    drawerIcon: ({ size, color }) => <MaterialIcons name="food-bank" size={size} color={color} />,
                    // drawerStyle: { paddingTop: "10vh" }
                }}
            />

            <Drawer.Screen
                name="workoutplan"
                options={{
                    drawerLabel: "Workout Plans",
                    title: "Workout Plans",
                    drawerIcon: ({ size, color }) => <MaterialIcons name="sports-handball" size={size} color={color} />,
                    // drawerStyle: { paddingTop: "10vh" }
                }}
            />

            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: "Settings",
                    title: "Settings",
                    drawerIcon: ({ size, color }) => <MaterialIcons name="settings" size={size} color={color} />,
                    drawerStyle: { paddingTop: "5vh" }
                }}
            />


        </Drawer>

    )
}