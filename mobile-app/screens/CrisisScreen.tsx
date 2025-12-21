import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native"

export default function CrisisScreen() {
  const emergencyNumbers = [
    { name: "Emergency Services", phone: "112" },
    { name: "Mental Health Foundation", phone: "+234 814 777 0070" },
    { name: "Suicide Prevention", phone: "+234 806 210 6493" },
  ]

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.urgentBanner}>
        <Text style={styles.urgentIcon}>🚨</Text>
        <Text style={styles.urgentTitle}>You Are Not Alone</Text>
        <Text style={styles.urgentText}>
          If you're in crisis, please reach out for help immediately. These services are here for you 24/7.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Immediate Help</Text>
        {emergencyNumbers.map((contact, idx) => (
          <TouchableOpacity key={idx} style={styles.emergencyButton} onPress={() => handleCall(contact.phone)}>
            <Text style={styles.emergencyName}>{contact.name}</Text>
            <Text style={styles.emergencyPhone}>📞 {contact.phone}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.copingSection}>
        <Text style={styles.sectionTitle}>While You Wait</Text>
        <View style={styles.copingCard}>
          <Text style={styles.copingTitle}>Grounding Technique (5-4-3-2-1)</Text>
          <Text style={styles.copingText}>
            • Name 5 things you can see{"\n"}• Name 4 things you can touch{"\n"}• Name 3 things you can hear{"\n"}• Name
            2 things you can smell{"\n"}• Name 1 thing you can taste
          </Text>
        </View>

        <View style={styles.copingCard}>
          <Text style={styles.copingTitle}>Breathing Exercise</Text>
          <Text style={styles.copingText}>
            Breathe in slowly for 4 counts{"\n"}
            Hold for 4 counts{"\n"}
            Breathe out slowly for 4 counts{"\n"}
            Repeat until you feel calmer
          </Text>
        </View>
      </View>

      <View style={styles.reminderBox}>
        <Text style={styles.reminderText}>
          This is temporary. You matter. Help is available. You will get through this.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  urgentBanner: {
    backgroundColor: "#DC2626",
    padding: 24,
    alignItems: "center",
  },
  urgentIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  urgentTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  urgentText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: "#DC2626",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  emergencyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  emergencyPhone: {
    fontSize: 16,
    color: "#fff",
  },
  copingSection: {
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  copingCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  copingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  copingText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  reminderBox: {
    margin: 16,
    padding: 20,
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#60A5FA",
  },
  reminderText: {
    fontSize: 16,
    color: "#1F2937",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "600",
  },
})
