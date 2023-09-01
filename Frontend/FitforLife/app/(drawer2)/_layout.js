import { Drawer } from 'expo-router/drawer';
import { Zocial } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Layout() {
    return (
        <Drawer
            screenOptions={{ headerShown: false,swipeEdgeWidth : 0,}}
        >
            <Drawer.Screen
                name="Trainer"
                options={{
                    drawerLabel: "Trainer",
                    title: "Profile",
                    drawerIcon: ({size , color}) => <Entypo name="home" size={size} color={color} />,
                    drawerStyle:{paddingTop:"5vh"}
                }}
            />
            <Drawer.Screen
                name="Workout"
                options={{
                    drawerLabel: "Workout Plan",
                    title: "Workput Plan",
                    drawerIcon: ({size , color}) => <Zocial name="plancast" size={size} color={color} />,
                    drawerStyle:{paddingTop:"5vh"}
                }}
            />
            <Drawer.Screen
                name="Myplans"
                options={{
                    drawerLabel: "My Plans",
                    title: "My Plans",
                    drawerIcon: ({size , color}) => <MaterialCommunityIcons name="star-shooting-outline" size={size} color={color} />,
                    drawerStyle:{paddingTop:"5vh"}
                }}
            />
            <Drawer.Screen
                name="nutrition"
                options={{
                    drawerLabel: "Nutrition",
                    title: "Nutrition",
                    drawerIcon: ({size , color}) => <Ionicons name="nutrition" size={size} color={color} />,
                    drawerStyle:{paddingTop:"5vh"}
                }}
            />
            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: "Settings",
                    title: "Settings",
                    drawerIcon: ({size , color}) => <MaterialIcons name="settings" size={size} color={color} />,
                    drawerStyle:{paddingTop:"5vh"}
                }}
            />
            
        </Drawer>

    )
}