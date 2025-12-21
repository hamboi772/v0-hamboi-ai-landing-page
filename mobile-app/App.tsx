import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import HomeScreen from "./screens/HomeScreen"
import ChatScreen from "./screens/ChatScreen"
import ResourcesScreen from "./screens/ResourcesScreen"
import CrisisScreen from "./screens/CrisisScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#8B5CF6",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Hamboi Mindcare" }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Chat with Hamboi" }} />
        <Stack.Screen name="Resources" component={ResourcesScreen} options={{ title: "Mental Health Resources" }} />
        <Stack.Screen
          name="Crisis"
          component={CrisisScreen}
          options={{
            title: "Crisis Support",
            headerStyle: {
              backgroundColor: "#DC2626",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
