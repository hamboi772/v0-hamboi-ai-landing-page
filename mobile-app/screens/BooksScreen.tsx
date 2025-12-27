"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function BooksScreen() {
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const books = [
    {
      id: "happiness-trap",
      title: "The Happiness Trap",
      author: "Russ Harris",
      description: "Learn ACT techniques to overcome common psychological traps",
    },
    {
      id: "feeling-good",
      title: "Feeling Good",
      author: "David Burns",
      description: "CBT handbook for depression and anxiety",
    },
    {
      id: "mindfulness-beginners",
      title: "Mindfulness for Beginners",
      author: "Jon Kabat-Zinn",
      description: "Introduction to mindfulness meditation",
    },
    {
      id: "anxiety-phobia",
      title: "Anxiety & Phobia Workbook",
      author: "Edmund J. Bourne",
      description: "Practical strategies for managing anxiety",
    },
    {
      id: "self-compassion",
      title: "Self-Compassion",
      author: "Kristin Neff",
      description: "Learn to treat yourself with kindness",
    },
    {
      id: "mental-health-nigeria",
      title: "Mental Health in Nigeria",
      author: "Dr. Adebayo Adeleke",
      description: "Understanding mental health in Nigerian context",
    },
    {
      id: "economic-stress",
      title: "Overcoming Economic Stress",
      author: "Chidinma Okafor",
      description: "Managing financial pressure and family expectations",
    },
  ]

  const openBook = (book: any) => {
    setSelectedBook(book)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Mental Health Books</Text>
        <Text style={styles.subtitle}>Read and learn at your own pace</Text>

        {books.map((book) => (
          <TouchableOpacity key={book.id} style={styles.bookCard} onPress={() => openBook(book)}>
            <View style={styles.bookIcon}>
              <Ionicons name="book" size={32} color="#8B5CF6" />
            </View>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>by {book.author}</Text>
              <Text style={styles.bookDescription}>{book.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={28} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedBook?.title}</Text>
            <View style={{ width: 28 }} />
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalText}>
              This book is available to read on the web version at hamboimindcare.site
            </Text>
            <Text style={styles.modalText}>
              Open the website in your mobile browser to read the full content with progress tracking.
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  scrollView: { flex: 1, padding: 16 },
  header: { fontSize: 28, fontWeight: "bold", color: "#111827", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#6B7280", marginBottom: 24 },
  bookCard: {
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
  bookIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  bookInfo: { flex: 1, marginLeft: 16 },
  bookTitle: { fontSize: 16, fontWeight: "600", color: "#111827", marginBottom: 4 },
  bookAuthor: { fontSize: 14, color: "#6B7280", marginBottom: 4 },
  bookDescription: { fontSize: 12, color: "#9CA3AF" },
  modalContainer: { flex: 1, backgroundColor: "#fff" },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },
  modalContent: { flex: 1, padding: 16 },
  modalText: { fontSize: 16, color: "#6B7280", marginBottom: 16, lineHeight: 24 },
})
