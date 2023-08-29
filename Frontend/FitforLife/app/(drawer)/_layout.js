import { Drawer } from 'expo-router/drawer';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export default function Layout() {
    return (
        <Drawer
            screenOptions={{ headerShown: false,swipeEdgeWidth : 0,}}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                    drawerIcon: ({size , color}) => <Entypo name="home" size={size} color={color} />,
                    drawerStyle:{paddingTop:"5vh"}
                }}
            />
            <Drawer.Screen
                name="Profile"
                options={{
                    drawerLabel: "Profile",
                    title: "Profile",
                    drawerIcon: ({size , color}) => <AntDesign name="profile" size={size} color={color} />,
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