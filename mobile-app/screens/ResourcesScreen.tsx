import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native"

const officialResourceUrl = "https://mentallyaware.org"

export default function ResourcesScreen() {
  const openOfficialResource = () => {
    void Linking.openURL(officialResourceUrl).catch(() => undefined)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mental Health Resources</Text>
        <Text style={styles.headerSubtitle}>Check official sources for current support options and contact details.</Text>
      </View>

      <View style={styles.resourceCard}>
        <Text style={styles.resourceName}>Mentally Aware Nigeria Initiative (MANI)</Text>
        <Text style={styles.resourceDescription}>
          Visit MANI&apos;s official website for its current support options. Availability and response times may vary.
        </Text>
        <TouchableOpacity
          style={styles.callButton}
          onPress={openOfficialResource}
          accessibilityRole="link"
          accessibilityLabel="Open the official Mentally Aware Nigeria Initiative website"
        >
          <Text style={styles.callButtonText}>Visit official website</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>If there is immediate danger</Text>
        <Text style={styles.infoText}>
          Go to a trusted adult or another person physically near you and contact local emergency services now. Hamboi cannot contact them for you.
        </Text>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          Hamboi is not a crisis or emergency service. Check any organization&apos;s official channels for current contact details before relying on them.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 24, backgroundColor: "#F3F4F6" },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1F2937", marginBottom: 8 },
  headerSubtitle: { fontSize: 14, color: "#6B7280", lineHeight: 20 },
  resourceCard: { margin: 16, padding: 20, backgroundColor: "#F9FAFB", borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB" },
  resourceName: { fontSize: 18, fontWeight: "bold", color: "#1F2937", marginBottom: 8 },
  resourceDescription: { fontSize: 14, color: "#4B5563", lineHeight: 20, marginBottom: 14 },
  callButton: { backgroundColor: "#8B5CF6", padding: 14, borderRadius: 8, alignItems: "center" },
  callButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  infoBox: { margin: 16, padding: 16, backgroundColor: "#DBEAFE", borderRadius: 12, borderWidth: 1, borderColor: "#60A5FA" },
  infoTitle: { fontSize: 16, fontWeight: "bold", color: "#1F2937", marginBottom: 8 },
  infoText: { fontSize: 14, color: "#1F2937", lineHeight: 20 },
  disclaimer: { margin: 16, padding: 16, backgroundColor: "#FEF3C7", borderRadius: 12 },
  disclaimerText: { fontSize: 12, color: "#92400E", textAlign: "center", lineHeight: 18 },
})
