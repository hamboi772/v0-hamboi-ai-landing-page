"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ChevronLeft, ChevronRight, Home, BookmarkCheck, Loader2 } from "lucide-react"
import { bookContents } from "@/lib/book-content"

export default function BookReaderPage() {
  const params = useParams()
  const router = useRouter()
  const bookId = params.bookId as string

  const [currentChapter, setCurrentChapter] = useState(1)
  const [userId, setUserId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const book = bookContents[bookId]

  useEffect(() => {
    // Get or create user ID
    let storedUserId = localStorage.getItem("userId")
    if (!storedUserId) {
      storedUserId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`
      localStorage.setItem("userId", storedUserId)
    }
    setUserId(storedUserId)

    // Load reading progress
    loadProgress(storedUserId)
  }, [bookId])

  const loadProgress = async (uid: string) => {
    try {
      const response = await fetch(`/api/reading-progress?userId=${uid}&bookId=${bookId}`)
      const data = await response.json()

      if (data.progress) {
        setCurrentChapter(data.progress.current_chapter || 1)
      }
    } catch (error) {
      console.error("[v0] Error loading progress:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveProgress = async (chapter: number) => {
    if (!userId) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/reading-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          bookId,
          currentChapter: chapter,
          lastPosition: 0,
          completed: chapter === book.chapters.length,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save progress")
      }

      console.log("[v0] Progress saved successfully")
    } catch (error) {
      console.error("[v0] Error saving progress:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const goToChapter = (chapterNumber: number) => {
    if (chapterNumber < 1 || chapterNumber > book.chapters.length) return
    setCurrentChapter(chapterNumber)
    saveProgress(chapterNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  const currentChapterData = book.chapters.find((ch) => ch.number === currentChapter)
  const progress = (currentChapter / book.chapters.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-50/30">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center gap-2">
              {isSaving && <Loader2 className="w-4 h-4 animate-spin text-purple-600" />}
              <BookmarkCheck className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-muted-foreground">Progress saved</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-purple-600 mt-1" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{book.title}</h1>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>
                Chapter {currentChapter} of {book.chapters.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardContent className="p-8">
            <Badge className="mb-4">Chapter {currentChapterData?.number}</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-6">{currentChapterData?.title}</h2>

            <div className="prose prose-lg max-w-none">
              {currentChapterData?.content.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" disabled={currentChapter === 1} onClick={() => goToChapter(currentChapter - 1)}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous Chapter
          </Button>

          <div className="text-sm text-muted-foreground">
            {currentChapter} / {book.chapters.length}
          </div>

          <Button
            variant="default"
            disabled={currentChapter === book.chapters.length}
            onClick={() => goToChapter(currentChapter + 1)}
          >
            Next Chapter
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Chapter List */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">All Chapters</h3>
            <div className="space-y-2">
              {book.chapters.map((chapter) => (
                <button
                  key={chapter.number}
                  onClick={() => goToChapter(chapter.number)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    chapter.number === currentChapter ? "bg-purple-100 text-purple-700 font-medium" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {chapter.number}. {chapter.title}
                    </span>
                    {chapter.number < currentChapter && <BookmarkCheck className="w-4 h-4 text-green-600" />}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
