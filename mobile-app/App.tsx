import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native"

export default function App() {
  const openWebsite = () => {
    Linking.openURL("https://hamboimindcare.site")
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Hamboi Mindcare</Text>
      <Text style={styles.subtitle}>Your Mental Wellness Companion</Text>

      <TouchableOpacity style={styles.button} onPress={openWebsite}>
        <Text style={styles.buttonText}>Open Hamboi Mindcare</Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        Access all features including mood tracking, journaling, mental health resources, and AI chat support.
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
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8B5CF6",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 20,
  },
})
