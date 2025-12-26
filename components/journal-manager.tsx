"use client"

import { useEffect, useState } from "react"
import { BookOpen, Plus, Pencil, Trash2, Save, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mood_tag: "",
  })

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

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch(`/api/journal?user_id=${userId}`)
      const data = await response.json()
      if (data.success) {
        setEntries(data.entries)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch journal entries:", error)
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content are required")
      return
    }

    console.log("[v0] Starting journal save, user_id:", userId, "editing:", !!editingEntry)

    setLoading(true)
    try {
      const url = editingEntry ? `/api/journal/${editingEntry.id}` : "/api/journal"
      const method = editingEntry ? "PUT" : "POST"

      console.log("[v0] Journal API call:", method, url)

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          ...formData,
        }),
      })

      console.log("[v0] Journal API response status:", response.status)
      const data = await response.json()
      console.log("[v0] Journal API response data:", data)

      if (data.success) {
        toast.success(editingEntry ? "Entry updated" : "Entry created")
        setFormData({ title: "", content: "", mood_tag: "" })
        setIsCreating(false)
        setEditingEntry(null)
        fetchEntries()
      } else {
        console.error("[v0] Journal save failed:", data.error)
        toast.error(data.error || "Failed to save entry")
      }
    } catch (error) {
      console.error("[v0] Save journal error:", error)
      toast.error("Failed to save entry. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteEntry) return

    try {
      const response = await fetch(`/api/journal/${deleteEntry}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Entry deleted")
        setDeleteEntry(null)
        fetchEntries()
      } else {
        toast.error("Failed to delete entry")
      }
    } catch (error) {
      console.error("[v0] Delete journal error:", error)
      toast.error("Failed to delete entry")
    }
  }

  const startEdit = (entry: JournalEntry) => {
    setEditingEntry(entry)
    setFormData({
      title: entry.title,
      content: entry.content,
      mood_tag: entry.mood_tag || "",
    })
    setIsCreating(true)
  }

  const cancelEdit = () => {
    setIsCreating(false)
    setEditingEntry(null)
    setFormData({ title: "", content: "", mood_tag: "" })
  }

  return (
    <div className="space-y-6">
      {/* Create/Edit Form */}
      {isCreating ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingEntry ? "Edit Entry" : "New Journal Entry"}</CardTitle>
            <CardDescription>Express your thoughts and feelings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Give your entry a title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your thoughts</label>
              <Textarea
                placeholder="Write what's on your mind..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="resize-none min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mood tag (optional)</label>
              <Input
                placeholder="e.g., Happy, Anxious, Grateful..."
                value={formData.mood_tag}
                onChange={(e) => setFormData({ ...formData, mood_tag: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={loading} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : editingEntry ? "Update" : "Save Entry"}
              </Button>
              <Button onClick={cancelEdit} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsCreating(true)} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          New Journal Entry
        </Button>
      )}

      {/* Journal Entries List */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No entries yet</h3>
              <p className="text-sm text-muted-foreground">Start journaling to track your thoughts and feelings</p>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{entry.title}</CardTitle>
                    <CardDescription>
                      {new Date(entry.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {entry.mood_tag && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-hamboi-purple/10 text-hamboi-purple">
                          {entry.mood_tag}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => startEdit(entry)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setDeleteEntry(entry.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{entry.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteEntry} onOpenChange={() => setDeleteEntry(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete journal entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your journal entry will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
