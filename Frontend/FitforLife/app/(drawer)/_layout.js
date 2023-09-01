import { Drawer } from 'expo-router/drawer';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function Layout() {
    return (
        <Drawer
            screenOptions={{ headerShown: false, swipeEdgeWidth: 0, }}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                    drawerIcon: ({ size, color }) => <Entypo name="home" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
                }}
            />
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
                name="workoutplan"
                options={{
                    drawerLabel: "Plans",
                    title: "Plans",
                    drawerIcon: ({ size, color }) => <MaterialIcons name="group-work" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
                }}
            />
            {/* <Drawer.Screen
                name="WorkoutLog"
                options={{
                    drawerLabel: "Insert Logs",
                    title: "Insert Logs",
                    drawerIcon: ({ size, color }) => <MaterialIcons name="insert-comment" size={size} color={color} />,
                    drawerStyle: { paddingTop: "10vh" }
                }}
            /> */}
            <Drawer.Screen
                name="ActivityLog"
                options={{
                    drawerLabel: "Activity Log",
                    title: "Activity Log",
                    drawerIcon: ({ size, color }) => <FontAwesome5 name="microblog" size={size} color={color} />,
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