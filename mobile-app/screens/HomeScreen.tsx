import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      {/* Crisis Banner */}
      <TouchableOpacity style={styles.crisisBanner} onPress={() => navigation.navigate("Crisis")}>
        <Text style={styles.crisisText}>🚨 In Crisis? Tap for Immediate Help</Text>
      </TouchableOpacity>

      {/* Hero Section */}
      <LinearGradient colors={["#8B5CF6", "#60A5FA"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.badge}>Your feelings are valid</Text>
          <Text style={styles.heroTitle}>
            Your Mental Health{"\n"}
            <Text style={styles.heroAccent}>Matters</Text>
          </Text>
          <View style={styles.acronymBox}>
            <Text style={styles.acronymLabel}>HAMBOI</Text>
            <Text style={styles.acronymText}>Hope And Mind Balance: Ongoing Improvement</Text>
          </View>
          <Text style={styles.heroDescription}>
            Talk to Hamboi Mindcare anytime you need support. You're not alone.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Chat")}>
            <Text style={styles.primaryButtonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How Hamboi Helps You</Text>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>💬</Text>
          <Text style={styles.featureTitle}>24/7 AI Support</Text>
          <Text style={styles.featureDescription}>
            Chat anytime about your feelings, stress, anxiety, or just need someone to listen
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🔒</Text>
          <Text style={styles.featureTitle}>100% Private</Text>
          <Text style={styles.featureDescription}>Your conversations are completely confidential and secure</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🇳🇬</Text>
          <Text style={styles.featureTitle}>Nigerian Resources</Text>
          <Text style={styles.featureDescription}>Access local crisis hotlines and mental health support services</Text>
        </View>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Resources")}>
          <Text style={styles.secondaryButtonText}>View Resources</Text>
        </TouchableOpacity>
      </View>

      {/* Donation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support Hamboi Mindcare</Text>
        <View style={styles.donationCard}>
          <Text style={styles.donationText}>Help us keep mental health support free for all Nigerian teens</Text>
          <View style={styles.bankDetails}>
            <Text style={styles.bankLabel}>OPay Bank Transfer:</Text>
            <Text style={styles.bankInfo}>Sekinat Arinola Abiodun</Text>
            <Text style={styles.bankInfo}>8169533452</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Hamboi Mindcare - Here for you 24/7</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  crisisBanner: {
    backgroundColor: "#DC2626",
    padding: 16,
    alignItems: "center",
  },
  crisisText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  hero: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },
  heroContent: {
    alignItems: "center",
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  heroAccent: {
    color: "#FDE68A",
  },
  acronymBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
  },
  acronymLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8B5CF6",
    marginBottom: 4,
  },
  acronymText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "600",
  },
  heroDescription: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: "#8B5CF6",
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  secondaryButton: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  donationCard: {
    backgroundColor: "#DBEAFE",
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#60A5FA",
  },
  donationText: {
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  bankDetails: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  bankLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 8,
  },
  bankInfo: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "bold",
    marginBottom: 4,
  },
  footer: {
    padding: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
})
