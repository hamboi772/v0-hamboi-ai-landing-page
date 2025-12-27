import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function FeaturesScreen({ navigation }: any) {
  const features = [
    { id: "mood", title: "Mood Tracker", icon: "happy-outline", color: "#10B981", screen: "MoodTracker" },
    { id: "journal", title: "Mental Health Journal", icon: "journal-outline", color: "#3B82F6", screen: "Journal" },
    { id: "referral", title: "Refer & Earn", icon: "gift-outline", color: "#F59E0B", screen: "Referral" },
  ]

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Features</Text>
      <Text style={styles.subtitle}>Track your mental wellness journey</Text>

      {features.map((feature) => (
        <TouchableOpacity key={feature.id} style={styles.card} onPress={() => navigation.navigate(feature.screen)}>
          <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
            <Ionicons name={feature.icon as any} size={32} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{feature.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  header: { fontSize: 28, fontWeight: "bold", color: "#111827", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#6B7280", marginBottom: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: { width: 56, height: 56, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  textContainer: { flex: 1, marginLeft: 16 },
  title: { fontSize: 18, fontWeight: "600", color: "#111827" },
})
