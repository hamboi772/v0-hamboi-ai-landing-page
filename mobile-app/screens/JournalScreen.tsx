"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const API_URL = "https://hamboimindcare.site"

export default function JournalScreen() {
  const [entries, setEntries] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch(`${API_URL}/api/journal`)
      const data = await response.json()
      setEntries(data.entries || [])
    } catch (error) {
      console.error("Error fetching journal:", error)
    }
  }

  const saveEntry = async () => {
    if (!title || !content) return
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/journal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })
      if (response.ok) {
        setTitle("")
        setContent("")
        await fetchEntries()
      }
    } catch (error) {
      console.error("Error saving entry:", error)
    }
    setLoading(false)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mental Health Journal</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.titleInput} placeholder="Entry Title" value={title} onChangeText={setTitle} />
        <TextInput
          style={styles.contentInput}
          placeholder="How are you feeling? What's on your mind?"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={6}
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveEntry} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Save Entry</Text>}
        </TouchableOpacity>
      </View>

      <Text style={styles.entriesHeader}>Your Entries</Text>
      {entries.map((entry, index) => (
        <View key={index} style={styles.entryCard}>
          <View style={styles.entryHeader}>
            <Ionicons name="journal" size={20} color="#8B5CF6" />
            <Text style={styles.entryTitle}>{entry.title}</Text>
          </View>
          <Text style={styles.entryContent}>{entry.content}</Text>
          <Text style={styles.entryDate}>{new Date(entry.created_at).toLocaleDateString()}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", color: "#111827", marginBottom: 24 },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleInput: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  contentInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: "top",
  },
  saveButton: { backgroundColor: "#8B5CF6", borderRadius: 8, padding: 16, alignItems: "center" },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  entriesHeader: { fontSize: 20, fontWeight: "bold", color: "#111827", marginBottom: 16 },
  entryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  entryTitle: { fontSize: 18, fontWeight: "600", color: "#111827", marginLeft: 8 },
  entryContent: { fontSize: 14, color: "#6B7280", marginBottom: 8, lineHeight: 20 },
  entryDate: { fontSize: 12, color: "#9CA3AF" },
})
