"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import Constants from "expo-constants"

interface Message {
  user: string
  ai: string
  timestamp: Date
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const scrollViewRef = useRef<ScrollView>(null)

  const apiUrl = Constants.expoConfig?.extra?.apiUrl

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  const sendMessage = async () => {
    const userMessage = inputText.trim()
    if (!userMessage || isLoading) return

    setInputText("")
    setError("")
    setIsLoading(true)

    const timestamp = new Date()
    const tempMessage: Message = { user: userMessage, ai: "", timestamp }
    setMessages((prev) => [...prev, tempMessage])

    try {
      const response = await fetch(`${apiUrl}/api/voice-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      if (data.error) {
        setError(
          data.error === "quota-exceeded"
            ? "Message limit reached. Please try again later."
            : "Something went wrong. Please try again.",
        )
        setIsLoading(false)
        return
      }

      if (data.response) {
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            ...tempMessage,
            ai: data.response,
          }
          return updated
        })
      }
    } catch (err) {
      setError("Connection error. Please check your internet and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyTitle}>Start a conversation</Text>
            <Text style={styles.emptyText}>Share what's on your mind. I'm here to listen and support you.</Text>
          </View>
        )}

        {messages.map((msg, idx) => (
          <View key={idx}>
            {/* User message */}
            <View style={styles.userMessageContainer}>
              <View style={styles.userMessage}>
                <Text style={styles.userMessageText}>{msg.user}</Text>
              </View>
            </View>

            {/* AI response */}
            {msg.ai && (
              <View style={styles.aiMessageContainer}>
                <View style={styles.aiMessage}>
                  <Text style={styles.aiLabel}>Hamboi</Text>
                  <Text style={styles.aiMessageText}>{msg.ai}</Text>
                </View>
              </View>
            )}

            {idx === messages.length - 1 && isLoading && !msg.ai && (
              <View style={styles.aiMessageContainer}>
                <View style={styles.aiMessage}>
                  <ActivityIndicator color="#8B5CF6" />
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.warningBanner}>
        <Text style={styles.warningText}>
          AI-generated responses. Not a substitute for professional care. Crisis? Call a helpline.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#9CA3AF"
          multiline
          maxLength={500}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  userMessageContainer: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  userMessage: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderTopRightRadius: 4,
    maxWidth: "80%",
  },
  userMessageText: {
    color: "#fff",
    fontSize: 14,
  },
  aiMessageContainer: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  aiMessage: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    maxWidth: "80%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  aiLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8B5CF6",
    marginBottom: 4,
  },
  aiMessageText: {
    color: "#1F2937",
    fontSize: 14,
  },
  errorBanner: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#FCA5A5",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    textAlign: "center",
  },
  warningBanner: {
    backgroundColor: "#FEF3C7",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#FDE68A",
  },
  warningText: {
    color: "#92400E",
    fontSize: 11,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 14,
    color: "#1F2937",
  },
  sendButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
})
