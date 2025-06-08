import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

// Import screens
import MapScreen from "./src/screens/MapScreen"
import NotificationsScreen from "./src/screens/NotificationsScreen"
import InstructionsScreen from "./src/screens/InstructionsScreen"
import SettingsScreen from "./src/screens/SettingsScreen"

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#F5F3E7" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "Mapa") {
              iconName = "map"
            } else if (route.name === "Notificaciones") {
              iconName = focused ? "notifications" : "notifications-outline"
            } else if (route.name === "Instrucciones") {
              iconName = focused ? "help-circle" : "help-circle-outline"
            } else if (route.name === "Ajustes") {
              iconName = focused ? "settings" : "settings-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: "#D2691E",
          tabBarInactiveTintColor: "#8B7355",
          tabBarStyle: {
            backgroundColor: "#F5F3E7",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 80,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="Notificaciones" component={NotificationsScreen} />
        <Tab.Screen name="Instrucciones" component={InstructionsScreen} />
        <Tab.Screen name="Ajustes" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}