import { Drawer } from 'expo-router/drawer';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Layout() {
    return (
        <Drawer
            screenOptions={{ headerShown: false, swipeEdgeWidth: 0, }}
        >
            {/* <Drawer.Screen
                name="Home"
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                    drawerIcon: ({ size, color }) => <Entypo name="home" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
                }}
            /> */}
            <Drawer.Screen
                name="Profile"
                options={{
                    drawerLabel: "Profile",
                    title: "Profile",
                    drawerIcon: ({ size, color }) => <AntDesign name="profile" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
                }}
            />
            <Drawer.Screen
                name="Goals"
                options={{
                    drawerLabel: "Goals",
                    title: "Goals",
                    drawerIcon: ({ size, color }) => <Ionicons name="fitness" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
                }}
            />
            <Drawer.Screen
                name="dietlog"
                options={{
                    drawerLabel: "Daily Diet",
                    title: "Daily Diet",
                    headerStyle: { backgroundColor: "transparent" },
                    drawerIcon: ({ size, color }) => <MaterialCommunityIcons name="food-variant" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
                }}
            />
            <Drawer.Screen
                name="ActivityLog"
                options={{
                    drawerLabel: "Daily Activity",
                    title: "Daily Activity",
                    drawerIcon: ({ size, color }) => <Feather name="activity" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
                }}
            />
            <Drawer.Screen
                name="nutritionplan"
                options={{
                    drawerLabel: "Diet Plans",
                    title: "Diet Plans",
                    drawerIcon: ({ size, color }) => <MaterialIcons name="food-bank" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
                }}
            />

            <Drawer.Screen
                name="workoutplan"
                options={{
                    drawerLabel: "Workout Plans",
                    title: "Workout Plans",
                    drawerIcon: ({ size, color }) => <MaterialIcons name="sports-handball" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
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