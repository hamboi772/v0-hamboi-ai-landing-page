import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native"

interface Resource {
  name: string
  phone: string
  hours: string
}

const resources: Resource[] = [
  {
    name: "Mental Health Foundation Nigeria",
    phone: "+234 814 777 0070",
    hours: "24/7",
  },
  {
    name: "Suicide Prevention Helpline",
    phone: "+234 806 210 6493",
    hours: "24/7",
  },
  {
    name: "She Writes Woman",
    phone: "+234 809 210 0009",
    hours: "Mon-Fri, 9am-5pm",
  },
  {
    name: "Mentally Aware Nigeria",
    phone: "+234 706 337 7777",
    hours: "24/7",
  },
]

export default function ResourcesScreen() {
  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mental Health Resources</Text>
        <Text style={styles.headerSubtitle}>Nigerian crisis hotlines and support services</Text>
      </View>

      {resources.map((resource, idx) => (
        <View key={idx} style={styles.resourceCard}>
          <Text style={styles.resourceName}>{resource.name}</Text>
          <Text style={styles.resourceHours}>{resource.hours}</Text>
          <TouchableOpacity style={styles.callButton} onPress={() => handleCall(resource.phone)}>
            <Text style={styles.callButtonText}>📞 Call {resource.phone}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>When to Call:</Text>
        <Text style={styles.infoText}>
          • Feeling suicidal or having thoughts of self-harm{"\n"}• Experiencing a mental health crisis{"\n"}• Need
          immediate emotional support{"\n"}• Concerned about someone else
        </Text>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          These resources provide professional mental health support. If you're in immediate danger, please call
          emergency services or go to the nearest hospital.
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
  header: {
    padding: 24,
    backgroundColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  resourceCard: {
    margin: 16,
    padding: 20,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  resourceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  resourceHours: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "600",
    marginBottom: 12,
  },
  callButton: {
    backgroundColor: "#8B5CF6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  callButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoBox: {
    margin: 16,
    padding: 16,
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#60A5FA",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#1F2937",
    lineHeight: 20,
  },
  disclaimer: {
    margin: 16,
    padding: 16,
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#92400E",
    textAlign: "center",
  },
})
