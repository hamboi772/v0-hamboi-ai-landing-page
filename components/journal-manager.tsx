"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

const PROMPTS = [
  "What's one small thing that went okay today?",
  "What are you carrying right now that you wish you could put down?",
  "Who made you feel seen recently?",
  "What would you tell a friend going through what you're going through?",
  "What does a good day look like for you?",
  "What's something you're proud of that nobody noticed?",
  "What feeling have you been avoiding lately?",
  "What do you need more of right now?",
]

const MOOD_TAGS = [
  { emoji: "🤩", label: "Amazing" },
  { emoji: "😊", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
  { emoji: "😭", label: "Awful" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "😌", label: "Calm" },
  { emoji: "🙏", label: "Grateful" },
]

interface JournalEntry {
  id: string
  title: string
  content: string
  mood_tag: string | null
  created_at: string
  updated_at: string
}

export function JournalManager() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [deleteEntry, setDeleteEntry] = useState<string | null>(null)
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [promptIdx, setPromptIdx] = useState(0)
  const [formData, setFormData] = useState({ title: "", content: "", mood_tag: "" })

  const [userId] = useState(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("hamboi_user_id")
      if (!id) {
        id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem("hamboi_user_id", id)
      }
      return id
    }
    return ""
  })

  useEffect(() => { fetchEntries() }, [])

  const fetchEntries = async () => {
    try {
      const res = await fetch(`/api/journal?user_id=${userId}`)
      const data = await res.json()
      if (data.success) setEntries(data.entries)
    } catch (err) {
      console.error("[v0] Failed to fetch journal entries:", err)
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Add a title and some thoughts first 😊")
      return
    }
    setLoading(true)
    try {
      const url = editingEntry ? `/api/journal/${editingEntry.id}` : "/api/journal"
      const method = editingEntry ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, ...formData }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(editingEntry ? "Entry updated 💜" : "Entry saved! +15 XP 💜")
        setFormData({ title: "", content: "", mood_tag: "" })
        setIsCreating(false)
        setEditingEntry(null)
        setPromptIdx((p) => (p + 1) % PROMPTS.length)
        fetchEntries()
      } else {
        toast.error(data.error || "Couldn't save entry")
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteEntry) return
    try {
      const res = await fetch(`/api/journal/${deleteEntry}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        toast.success("Entry deleted")
        setDeleteEntry(null)
        fetchEntries()
      } else {
        toast.error("Couldn't delete entry")
      }
    } catch (err) {
      toast.error("Something went wrong.")
    }
  }

  const startEdit = (entry: JournalEntry) => {
    setEditingEntry(entry)
    setFormData({ title: entry.title, content: entry.content, mood_tag: entry.mood_tag || "" })
    setIsCreating(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const cancelEdit = () => {
    setIsCreating(false)
    setEditingEntry(null)
    setFormData({ title: "", content: "", mood_tag: "" })
  }

  const getMoodEmoji = (tag: string) => {
    const found = MOOD_TAGS.find((m) => m.label.toLowerCase() === tag.toLowerCase())
    return found ? found.emoji : "💜"
  }

  return (
    <div style={{ fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif", color: "#f0e8ff" }}>

      {/* New Entry / Edit Form */}
      {isCreating ? (
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>{editingEntry ? "Edit entry" : "New journal entry"}</div>
            <div style={styles.cardSub}>{editingEntry ? "Change what you wrote" : "This is just for you. No one else sees this."}</div>
          </div>

          {/* Prompt */}
          {!editingEntry && (
            <div style={styles.prompt}>
              💭 <em>"{PROMPTS[promptIdx]}"</em>
              <button
                onClick={() => setPromptIdx((p) => (p + 1) % PROMPTS.length)}
                style={styles.promptBtn}
              >
                different prompt →
              </button>
            </div>
          )}

          {/* Title */}
          <div style={{ marginBottom: 12 }}>
            <label style={styles.label}>Give it a title</label>
            <input
              placeholder="What's this entry about?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={styles.input}
            />
          </div>

          {/* Content */}
          <div style={{ marginBottom: 12 }}>
            <label style={styles.label}>Your thoughts</label>
            <textarea
              placeholder="Write freely. No wrong answers here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              style={styles.textarea}
            />
          </div>

          {/* Mood tag */}
          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>How are you feeling while writing this?</label>
            <div style={styles.moodTagGrid}>
              {MOOD_TAGS.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setFormData({ ...formData, mood_tag: formData.mood_tag === m.label ? "" : m.label })}
                  style={{
                    ...styles.moodTagBtn,
                    borderColor: formData.mood_tag === m.label ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.06)",
                    background: formData.mood_tag === m.label ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                  }}
                >
                  <span style={{ fontSize: 18 }}>{m.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: formData.mood_tag === m.label ? "#c084fc" : "#7c6fa0" }}>
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleSave} disabled={loading} style={{ ...styles.saveBtn, flex: 1 }}>
              {loading ? "Saving..." : editingEntry ? "Update entry" : "Save entry → +15 XP"}
            </button>
            <button onClick={cancelEdit} style={styles.cancelBtn}>Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsCreating(true)} style={styles.newEntryBtn}>
          + New journal entry
        </button>
      )}

      {/* Entries list */}
      {entries.length === 0 && !isCreating ? (
        <div style={{ ...styles.card, textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f0e8ff", marginBottom: 6 }}>No entries yet</div>
          <div style={{ fontSize: 13, color: "#7c6fa0", lineHeight: 1.6 }}>
            Your journal is a safe space. Write anything — no one else can see it.
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {entries.map((entry) => {
            const isExpanded = expandedEntry === entry.id
            const moodEmoji = entry.mood_tag ? getMoodEmoji(entry.mood_tag) : null
            return (
              <div
                key={entry.id}
                style={{
                  ...styles.entryCard,
                  borderColor: isExpanded ? "rgba(124,58,237,0.3)" : "#251a45",
                }}
              >
                {/* Entry header */}
                <div
                  style={styles.entryHeader}
                  onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      {moodEmoji && <span style={{ fontSize: 16 }}>{moodEmoji}</span>}
                      <div style={styles.entryTitle}>{entry.title}</div>
                    </div>
                    <div style={styles.entryDate}>
                      {new Date(entry.created_at).toLocaleDateString("en-US", {
                        weekday: "short", month: "long", day: "numeric"
                      })}
                      {entry.mood_tag && (
                        <span style={styles.moodTagPill}>{entry.mood_tag}</span>
                      )}
                    </div>
                  </div>
                  <span style={{ color: "#7c6fa0", fontSize: 18, marginLeft: 8 }}>
                    {isExpanded ? "↑" : "↓"}
                  </span>
                </div>

                {/* Preview or full content */}
                {!isExpanded ? (
                  <div style={styles.entryPreview}>
                    {entry.content.slice(0, 100)}{entry.content.length > 100 ? "..." : ""}
                  </div>
                ) : (
                  <div style={styles.entryFull}>
                    {entry.content}
                    <div style={styles.entryActions}>
                      <button onClick={() => startEdit(entry)} style={styles.editBtn}>✏️ Edit</button>
                      <button onClick={() => setDeleteEntry(entry.id)} style={styles.deleteBtn}>🗑️ Delete</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteEntry && (
        <div style={styles.overlay} onClick={() => setDeleteEntry(null)}>
          <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🗑️</div>
            <div style={styles.dialogTitle}>Delete this entry?</div>
            <div style={styles.dialogSub}>This can't be undone. Your words will be gone.</div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setDeleteEntry(null)} style={styles.cancelBtn}>Keep it</button>
              <button onClick={handleDelete} style={{ ...styles.saveBtn, flex: 1, background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: { background: "#150e2b", border: "1px solid #251a45", borderRadius: 20, padding: 20, marginBottom: 14 },
  cardHeader: { marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: 800, color: "#f0e8ff", marginBottom: 4 },
  cardSub: { fontSize: 12, color: "#7c6fa0" },
  prompt: {
    background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: 12, padding: "12px 14px", fontSize: 13, color: "#c084fc",
    lineHeight: 1.6, marginBottom: 16, fontStyle: "italic",
    display: "flex", flexDirection: "column" as const, gap: 6,
  },
  promptBtn: {
    background: "none", border: "none", color: "#7c6fa0", fontSize: 11,
    fontWeight: 700, cursor: "pointer", padding: 0, textAlign: "left" as const,
  },
  label: { fontSize: 12, fontWeight: 700, color: "#7c6fa0", display: "block", marginBottom: 8 },
  input: {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid #251a45",
    borderRadius: 12, padding: "12px 14px", color: "#f0e8ff",
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif", fontSize: 14,
    outline: "none", boxSizing: "border-box" as const,
  },
  textarea: {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid #251a45",
    borderRadius: 12, padding: "12px 14px", color: "#f0e8ff",
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif", fontSize: 14,
    lineHeight: 1.7, resize: "none" as const, outline: "none", boxSizing: "border-box" as const,
  },
  moodTagGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 },
  moodTagBtn: {
    background: "rgba(255,255,255,0.03)", border: "2px solid rgba(255,255,255,0.06)",
    borderRadius: 12, padding: "10px 6px", cursor: "pointer",
    display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4,
    transition: "all 0.2s",
  },
  saveBtn: {
    background: "linear-gradient(135deg, #7C3AED, #9333ea)", color: "white",
    border: "none", borderRadius: 14, padding: "14px 20px",
    fontSize: 14, fontWeight: 800, cursor: "pointer",
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif",
    boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
  },
  cancelBtn: {
    background: "rgba(255,255,255,0.05)", border: "1px solid #251a45",
    borderRadius: 14, padding: "14px 20px", color: "#7c6fa0",
    fontSize: 14, fontWeight: 700, cursor: "pointer",
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif",
  },
  newEntryBtn: {
    width: "100%", background: "linear-gradient(135deg, #7C3AED, #9333ea)",
    color: "white", border: "none", borderRadius: 16, padding: 18,
    fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 14,
    fontFamily: "'Cabinet Grotesk', 'Nunito', sans-serif",
    boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
  },
  entryCard: {
    background: "#150e2b", border: "1px solid #251a45",
    borderRadius: 18, overflow: "hidden", transition: "border-color 0.2s",
  },
  entryHeader: {
    display: "flex", alignItems: "flex-start", gap: 12,
    padding: "16px 16px 12px", cursor: "pointer",
  },
  entryTitle: { fontSize: 15, fontWeight: 800, color: "#f0e8ff" },
  entryDate: { fontSize: 11, color: "#7c6fa0", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const },
  moodTagPill: {
    background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: 99, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#c084fc",
  },
  entryPreview: { fontSize: 13, color: "#7c6fa0", lineHeight: 1.6, padding: "0 16px 16px" },
  entryFull: {
    fontSize: 14, color: "#c4b5fd", lineHeight: 1.8,
    padding: "0 16px 16px", whiteSpace: "pre-wrap" as const,
  },
  entryActions: { display: "flex", gap: 10, marginTop: 16, paddingTop: 14, borderTop: "1px solid #251a45" },
  editBtn: {
    background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: 10, padding: "8px 14px", color: "#c084fc",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
  },
  deleteBtn: {
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: 10, padding: "8px 14px", color: "#f87171",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
  },
  overlay: {
    position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(8px)", zIndex: 200,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  },
  dialog: {
    background: "#1a1235", border: "1px solid #251a45", borderRadius: 24,
    padding: "28px 24px", width: "100%", maxWidth: 360, textAlign: "center" as const,
  },
  dialogTitle: { fontSize: 18, fontWeight: 800, color: "#f0e8ff", marginBottom: 8 },
  dialogSub: { fontSize: 13, color: "#7c6fa0", lineHeight: 1.5 },
}
