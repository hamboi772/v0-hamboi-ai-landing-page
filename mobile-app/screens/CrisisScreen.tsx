import { View, Text, StyleSheet, ScrollView } from "react-native"

export default function CrisisScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.urgentBanner}>
        <Text style={styles.urgentTitle}>Get help from someone nearby</Text>
        <Text style={styles.urgentText}>
          If you or someone else may be in immediate danger, go to a trusted adult or another person physically near you and contact local emergency services now. Do not wait for Hamboi to respond.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Right now</Text>
        <View style={styles.emergencyCard} accessibilityRole="alert">
          <Text style={styles.emergencyName}>Stay with a trusted person</Text>
          <Text style={styles.emergencyText}>
            Tell a parent or guardian, teacher, school counselor, doctor, or another trusted adult what is happening. Hamboi cannot call emergency services or reach someone for you.
          </Text>
        </View>
      </View>

      <View style={styles.copingSection}>
        <Text style={styles.sectionTitle}>While you get help</Text>
        <View style={styles.copingCard}>
          <Text style={styles.copingTitle}>Grounding technique</Text>
          <Text style={styles.copingText}>
            Name 5 things you can see{"\n"}Name 4 things you can touch{"\n"}Name 3 things you can hear{"\n"}Name 2 things you can smell{"\n"}Name 1 thing you can taste
          </Text>
        </View>

        <View style={styles.copingCard}>
          <Text style={styles.copingTitle}>Slow breathing</Text>
          <Text style={styles.copingText}>
            Breathe in gently, then breathe out a little more slowly. Stop if focusing on your breathing makes you feel worse.
          </Text>
        </View>
      </View>

      <View style={styles.reminderBox}>
        <Text style={styles.reminderText}>You deserve real support from someone who can be with you.</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  urgentBanner: { backgroundColor: "#DC2626", padding: 24, alignItems: "center" },
  urgentTitle: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 12, textAlign: "center" },
  urgentText: { fontSize: 16, color: "#fff", textAlign: "center", lineHeight: 24 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#1F2937", marginBottom: 16 },
  emergencyCard: { backgroundColor: "#DC2626", padding: 20, borderRadius: 12 },
  emergencyName: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  emergencyText: { fontSize: 16, color: "#fff", lineHeight: 24 },
  copingSection: { padding: 16, backgroundColor: "#F9FAFB" },
  copingCard: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: "#E5E7EB" },
  copingTitle: { fontSize: 16, fontWeight: "bold", color: "#1F2937", marginBottom: 8 },
  copingText: { fontSize: 14, color: "#4B5563", lineHeight: 22 },
  reminderBox: { margin: 16, padding: 20, backgroundColor: "#DBEAFE", borderRadius: 12 },
  reminderText: { fontSize: 16, color: "#1E40AF", textAlign: "center", fontWeight: "600" },
})
