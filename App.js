import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

// Import screens
import HomeScreen from "./src/screens/HomeScreen"
import ProjectsScreen from "./src/screens/ProjectsScreen"
import DatabaseScreen from "./src/screens/DatabaseScreen"
import AuthScreen from "./src/screens/AuthScreen"
import StorageScreen from "./src/screens/StorageScreen"
import SettingsScreen from "./src/screens/SettingsScreen"
import ProjectDetailScreen from "./src/screens/ProjectDetailScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function ProjectStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProjectsList" component={ProjectsScreen} options={{ title: "Projects" }} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: "Project Details" }} />
    </Stack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Projects") {
            iconName = focused ? "folder" : "folder-outline"
          } else if (route.name === "Database") {
            iconName = focused ? "server" : "server-outline"
          } else if (route.name === "Auth") {
            iconName = focused ? "person" : "person-outline"
          } else if (route.name === "Storage") {
            iconName = focused ? "cloud" : "cloud-outline"
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#FF6B35",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "#FF6B35",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Projects" component={ProjectStack} options={{ headerShown: false }} />
      <Tab.Screen name="Database" component={DatabaseScreen} />
      <Tab.Screen name="Auth" component={AuthScreen} />
      <Tab.Screen name="Storage" component={StorageScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <MainTabs />
    </NavigationContainer>
  )
}
