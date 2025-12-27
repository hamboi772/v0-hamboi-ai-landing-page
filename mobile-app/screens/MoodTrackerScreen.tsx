"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const API_URL = "https://hamboimindcare.site"

export default function MoodTrackerScreen() {
  const [moods, setMoods] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedMood, setSelectedMood] = useState("")

  const moodOptions = [
    { value: "great", label: "Great", icon: "happy", color: "#10B981" },
    { value: "good", label: "Good", icon: "happy-outline", color: "#3B82F6" },
    { value: "okay", label: "Okay", icon: "remove-circle-outline", color: "#F59E0B" },
    { value: "bad", label: "Bad", icon: "sad-outline", color: "#EF4444" },
    { value: "terrible", label: "Terrible", icon: "sad", color: "#DC2626" },
  ]

  useEffect(() => {
    fetchMoods()
  }, [])

  const fetchMoods = async () => {
    try {
      const response = await fetch(`${API_URL}/api/moods`)
      const data = await response.json()
      setMoods(data.moods || [])
    } catch (error) {
      console.error("Error fetching moods:", error)
    }
  }

  const saveMood = async (mood: string) => {
    setLoading(true)
    setSelectedMood(mood)
    try {
      const response = await fetch(`${API_URL}/api/moods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, notes: "" }),
      })
      if (response.ok) {
        await fetchMoods()
      }
    } catch (error) {
      console.error("Error saving mood:", error)
    }
    setLoading(false)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>How are you feeling today?</Text>

      <View style={styles.moodGrid}>
        {moodOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[styles.moodButton, { borderColor: option.color }]}
            onPress={() => saveMood(option.value)}
            disabled={loading}
          >
            <Ionicons name={option.icon as any} size={40} color={option.color} />
            <Text style={[styles.moodLabel, { color: option.color }]}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <ActivityIndicator size="large" color="#8B5CF6" style={styles.loader} />}

      <Text style={styles.historyHeader}>Recent Moods</Text>
      {moods.slice(0, 7).map((mood, index) => {
        const option = moodOptions.find((o) => o.value === mood.mood)
        return (
          <View key={index} style={styles.moodCard}>
            <Ionicons name={option?.icon as any} size={24} color={option?.color} />
            <Text style={styles.moodText}>{option?.label}</Text>
            <Text style={styles.moodDate}>{new Date(mood.created_at).toLocaleDateString()}</Text>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", color: "#111827", marginBottom: 24, textAlign: "center" },
  moodGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 32 },
  moodButton: {
    width: "30%",
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  moodLabel: { fontSize: 14, fontWeight: "600", marginTop: 8 },
  loader: { marginVertical: 20 },
  historyHeader: { fontSize: 20, fontWeight: "bold", color: "#111827", marginBottom: 16 },
  moodCard: {
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
  moodText: { flex: 1, fontSize: 16, fontWeight: "600", marginLeft: 12, color: "#111827" },
  moodDate: { fontSize: 14, color: "#6B7280" },
})
