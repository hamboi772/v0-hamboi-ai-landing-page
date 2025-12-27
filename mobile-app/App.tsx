import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import HomeScreen from "./screens/HomeScreen"
import ChatScreen from "./screens/ChatScreen"
import ResourcesScreen from "./screens/ResourcesScreen"
import CrisisScreen from "./screens/CrisisScreen"
import MoodTrackerScreen from "./screens/MoodTrackerScreen"
import JournalScreen from "./screens/JournalScreen"
import BooksScreen from "./screens/BooksScreen"
import ReferralScreen from "./screens/ReferralScreen"
import FeaturesScreen from "./screens/FeaturesScreen"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any
          if (route.name === "Home") iconName = focused ? "home" : "home-outline"
          else if (route.name === "Features") iconName = focused ? "apps" : "apps-outline"
          else if (route.name === "Books") iconName = focused ? "book" : "book-outline"
          else if (route.name === "Chat") iconName = focused ? "chatbubbles" : "chatbubbles-outline"
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#8B5CF6",
        tabBarInactiveTintColor: "gray",
        headerStyle: { backgroundColor: "#8B5CF6" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Hamboi Mindcare" }} />
      <Tab.Screen name="Features" component={FeaturesScreen} options={{ title: "My Features" }} />
      <Tab.Screen name="Books" component={BooksScreen} options={{ title: "Books" }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: "Chat AI" }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Resources" component={ResourcesScreen} options={{ title: "Resources" }} />
        <Stack.Screen
          name="Crisis"
          component={CrisisScreen}
          options={{ title: "Crisis Support", headerStyle: { backgroundColor: "#DC2626" }, headerTintColor: "#fff" }}
        />
        <Stack.Screen name="MoodTracker" component={MoodTrackerScreen} options={{ title: "Mood Tracker" }} />
        <Stack.Screen name="Journal" component={JournalScreen} options={{ title: "Journal" }} />
        <Stack.Screen name="Referral" component={ReferralScreen} options={{ title: "Refer & Earn" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
