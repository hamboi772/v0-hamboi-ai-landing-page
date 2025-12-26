"use client"

import { useState } from "react"
import { Book, ExternalLink, Star, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const books = [
  {
    id: "the-happiness-trap",
    title: "The Happiness Trap",
    author: "Russ Harris",
    authorInfo: "Renowned psychotherapist and ACT trainer",
    description:
      "Stop struggling and start living. Learn how to handle painful thoughts and feelings effectively using Acceptance and Commitment Therapy.",
    category: "Anxiety & Stress",
    rating: 4.8,
    link: "https://www.amazon.com/Happiness-Trap-Struggling-Start-Living/dp/1590305841",
    color: "from-blue-500 to-cyan-500",
    hasContent: true, // Added flag to indicate books with reading content
  },
  {
    id: "feeling-good",
    title: "Feeling Good: The New Mood Therapy",
    author: "David D. Burns",
    authorInfo: "Stanford psychiatrist and CBT pioneer",
    description:
      "The clinically proven drug-free treatment for depression. Over 5 million copies sold, this book teaches you how to defeat sadness and develop a positive outlook.",
    category: "Depression",
    rating: 4.7,
    link: "https://www.amazon.com/Feeling-Good-New-Mood-Therapy/dp/0380810336",
    color: "from-amber-500 to-orange-500",
    hasContent: true, // Added flag to indicate books with reading content
  },
  {
    id: "the-anxiety-phobia-workbook",
    title: "The Anxiety and Phobia Workbook",
    author: "Edmund J. Bourne",
    authorInfo: "Leading anxiety specialist with 30+ years experience",
    description:
      "The definitive resource for anyone struggling with anxiety. Practical exercises, relaxation techniques, and coping strategies that really work.",
    category: "Anxiety",
    rating: 4.6,
    link: "https://www.amazon.com/Anxiety-Phobia-Workbook-Edmund-Bourne/dp/1626252157",
    color: "from-purple-500 to-pink-500",
    hasContent: false,
  },
  {
    id: "maybe-you-should-talk-to-someone",
    title: "Maybe You Should Talk to Someone",
    author: "Lori Gottlieb",
    authorInfo: "Psychotherapist and New York Times bestselling author",
    description:
      "A hilarious, thought-provoking, and surprising journey through therapy - both as a patient and a therapist. Shows how we all have room to grow.",
    category: "Self-Discovery",
    rating: 4.9,
    link: "https://www.amazon.com/Maybe-You-Should-Talk-Someone/dp/1328662055",
    color: "from-emerald-500 to-teal-500",
    hasContent: false,
  },
  {
    id: "the-body-keeps-the-score",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    authorInfo: "World-renowned trauma expert and psychiatrist",
    description:
      "Groundbreaking research on how trauma reshapes the body and brain, and offers new paths to recovery and healing.",
    category: "Trauma & Healing",
    rating: 4.8,
    link: "https://www.amazon.com/Body-Keeps-Score-Healing-Trauma/dp/0143127748",
    color: "from-rose-500 to-red-500",
    hasContent: false,
  },
  {
    id: "mindfulness-for-beginners",
    title: "Mindfulness for Beginners",
    author: "Jon Kabat-Zinn",
    authorInfo: "Creator of Mindfulness-Based Stress Reduction",
    description:
      "Reclaim the present moment and your life. Simple practices to help you reduce stress and cultivate peace in your daily life.",
    category: "Mindfulness",
    rating: 4.5,
    link: "https://www.amazon.com/Mindfulness-Beginners-Reclaiming-Present-Moment/dp/1622036670",
    color: "from-indigo-500 to-violet-500",
    hasContent: false,
  },
]

export function BooksSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const booksPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + booksPerPage >= books.length ? 0 : prev + booksPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - booksPerPage < 0 ? Math.max(0, books.length - booksPerPage) : prev - booksPerPage,
    )
  }

  const visibleBooks = books.slice(currentIndex, currentIndex + booksPerPage)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-purple-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Book className="w-4 h-4" />
            Recommended Reading
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mental Health Books That Changed Lives
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Curated collection of transformative books by world-renowned psychologists, therapists, and mental health
            experts. Each one chosen for its real impact.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full shadow-lg bg-background hover:bg-purple-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full shadow-lg bg-background hover:bg-purple-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Books grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleBooks.map((book, index) => (
              <Card
                key={book.title}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-3 bg-gradient-to-r ${book.color}`} />
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {book.category}
                  </Badge>
                  <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-purple-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-purple-600 font-medium mb-1">by {book.author}</p>
                  <p className="text-xs text-muted-foreground mb-3">{book.authorInfo}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{book.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{book.rating}</span>
                    </div>
                    {/* Conditional button - Read Now for books with content, Learn More for external links */}
                    {book.hasContent ? (
                      <Link href={`/read/${book.id}`}>
                        <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700">
                          <BookOpen className="w-3 h-3 mr-1" />
                          Read Now
                        </Button>
                      </Link>
                    ) : (
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Learn More
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile navigation */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button variant="outline" size="sm" onClick={prevSlide}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * booksPerPage)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / booksPerPage) === i
                  ? "bg-purple-600 w-6"
                  : "bg-purple-200 hover:bg-purple-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
