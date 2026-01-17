import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native"

export default function App() {
  const openWebsite = () => {
    Linking.openURL("https://hamboimindcare.site")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hamboi MindCare</Text>
      <Text style={styles.subtitle}>Your Mental Wellness Companion</Text>
      <TouchableOpacity style={styles.button} onPress={openWebsite}>
        <Text style={styles.buttonText}>Open App</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7C3AED",
  },
})
