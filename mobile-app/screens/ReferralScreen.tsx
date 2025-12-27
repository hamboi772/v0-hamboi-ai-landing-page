"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Clipboard } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const API_URL = "https://hamboimindcare.site"

export default function ReferralScreen() {
  const [referralCode, setReferralCode] = useState("")
  const [stats, setStats] = useState({ count: 0, conversions: 0 })

  useEffect(() => {
    generateReferralCode()
    fetchStats()
  }, [])

  const generateReferralCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setReferralCode(code)
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/referrals`)
      const data = await response.json()
      setStats({ count: data.referrals?.length || 0, conversions: 0 })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const shareReferral = async () => {
    try {
      await Share.share({
        message: `Join Hamboi Mindcare for mental health support! Use my code: ${referralCode}\n\nVisit: https://hamboimindcare.site`,
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const copyCode = () => {
    Clipboard.setString(referralCode)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Refer & Earn</Text>
      <Text style={styles.subtitle}>Share mental health support with friends</Text>

      <View style={styles.codeCard}>
        <Text style={styles.codeLabel}>Your Referral Code</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.code}>{referralCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyCode}>
            <Ionicons name="copy-outline" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={shareReferral}>
        <Ionicons name="share-social" size={20} color="#fff" />
        <Text style={styles.shareButtonText}>Share with Friends</Text>
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="people" size={32} color="#10B981" />
          <Text style={styles.statValue}>{stats.count}</Text>
          <Text style={styles.statLabel}>Total Referrals</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={32} color="#3B82F6" />
          <Text style={styles.statValue}>{stats.conversions}</Text>
          <Text style={styles.statLabel}>Conversions</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  header: { fontSize: 28, fontWeight: "bold", color: "#111827", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#6B7280", marginBottom: 24 },
  codeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  codeLabel: { fontSize: 14, color: "#6B7280", marginBottom: 8 },
  codeContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  code: { fontSize: 32, fontWeight: "bold", color: "#8B5CF6", letterSpacing: 2 },
  copyButton: { padding: 8 },
  shareButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  shareButtonText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },
  statsContainer: { flexDirection: "row", justifyContent: "space-between" },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: { fontSize: 32, fontWeight: "bold", color: "#111827", marginTop: 8 },
  statLabel: { fontSize: 14, color: "#6B7280", marginTop: 4, textAlign: "center" },
})
