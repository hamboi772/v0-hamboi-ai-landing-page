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
    id: "healing-the-african-mind",
    title: "Healing the African Mind",
    author: "Dr. Maymunah Kadiri",
    authorInfo: "Leading Nigerian psychiatrist and mental health advocate",
    description:
      "Understanding mental health in the Nigerian context. Breaking stigma and bridging traditional beliefs with modern mental health understanding.",
    category: "Nigerian Mental Health",
    rating: 4.9,
    link: "#",
    color: "from-green-500 to-emerald-500",
    hasContent: true,
  },
  {
    id: "the-naija-mind",
    title: "The Naija Mind: Thriving Beyond Stress",
    author: "Dr. Femi Olugbile",
    authorInfo: "Nigerian psychiatrist and founder of Asido Foundation",
    description:
      "Practical strategies for managing stress, family expectations, and economic pressure in Nigeria. Learn to thrive, not just survive.",
    category: "Stress Management",
    rating: 4.8,
    link: "#",
    color: "from-teal-500 to-cyan-500",
    hasContent: true,
  },
  {
    id: "mental-wellness-for-african-youth",
    title: "Mental Wellness for African Youth",
    author: "Dr. Chioma Nwosu",
    authorInfo: "Clinical psychologist specializing in youth mental health",
    description:
      "For young Africans navigating social media pressure, academic stress, and identity. Your feelings are valid, and help is available.",
    category: "Youth & Identity",
    rating: 4.7,
    link: "#",
    color: "from-purple-500 to-pink-500",
    hasContent: true,
  },
  {
    id: "mindful-living-in-lagos",
    title: "Mindful Living in Lagos",
    author: "Adaeze Chukwuemeka",
    authorInfo: "Wellness coach and mindfulness practitioner",
    description:
      "Finding peace in Nigeria's busiest city. Practical mindfulness techniques for Lagos traffic, work stress, and daily hustle.",
    category: "Mindfulness & Urban Life",
    rating: 4.6,
    link: "#",
    color: "from-indigo-500 to-blue-500",
    hasContent: true,
  },
  {
    id: "overcoming-trauma-the-african-way",
    title: "Overcoming Trauma: The African Way",
    author: "Prof. Bola Ola",
    authorInfo: "Trauma specialist and professor of psychiatry",
    description:
      "Healing from personal and collective trauma. Combining traditional African wisdom with modern trauma therapy for lasting recovery.",
    category: "Trauma & Healing",
    rating: 4.9,
    link: "#",
    color: "from-rose-500 to-red-500",
    hasContent: true,
  },
  {
    id: "the-anxiety-and-phobia-workbook",
    title: "The Anxiety and Phobia Workbook",
    author: "Edmund J. Bourne",
    authorInfo: "Leading anxiety specialist with 30+ years experience",
    description:
      "The definitive resource for anyone struggling with anxiety. Practical exercises, relaxation techniques, and coping strategies that really work.",
    category: "Anxiety",
    rating: 4.6,
    link: "https://www.amazon.com/Anxiety-Phobia-Workbook-Edmund-Bourne/dp/1626252157",
    color: "from-violet-500 to-purple-500",
    hasContent: true,
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
    color: "from-blue-500 to-indigo-500",
    hasContent: true,
  },
  {
    id: "self-compassion",
    title: "Self-Compassion",
    author: "Kristin Neff",
    authorInfo: "Leading self-compassion researcher",
    description:
      "Learn to treat yourself with the same kindness you'd offer a good friend. Transform your relationship with yourself.",
    category: "Self-Care",
    rating: 4.7,
    link: "https://www.amazon.com/Self-Compassion-Proven-Power-Being-Yourself/dp/0061733520",
    color: "from-pink-500 to-rose-500",
    hasContent: true,
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
    <section className="py-20 px-4 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-hamboi-purple/20 border border-hamboi-purple/50 text-hamboi-green px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Book className="w-4 h-4" />
            Recommended Reading
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Mental Health Books That Changed Lives
          </h2>
          <p className="text-hamboi-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Curated collection of transformative books by world-renowned psychologists, therapists, and mental health experts. Each one chosen for its real impact.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full shadow-lg bg-hamboi-dark-card border-hamboi-purple/40 text-hamboi-green hover:bg-hamboi-purple/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full shadow-lg bg-hamboi-dark-card border-hamboi-purple/40 text-hamboi-green hover:bg-hamboi-purple/20"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Books grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleBooks.map((book, index) => (
              <Card
                key={book.title}
                className="group overflow-hidden border-2 border-hamboi-purple/40 shadow-lg hover:shadow-2xl hover:shadow-hamboi-purple/30 transition-all duration-300 hover:-translate-y-2 hover:border-hamboi-purple/70 bg-hamboi-dark-card"
              >
                <div className={`h-3 bg-gradient-to-r ${book.color}`} />
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3 text-xs bg-hamboi-purple/20 text-hamboi-green border border-hamboi-purple/50">
                    {book.category}
                  </Badge>
                  <h3 className="font-bold text-lg text-white mb-1 group-hover:text-hamboi-green transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-hamboi-green font-bold mb-1">by {book.author}</p>
                  <p className="text-xs text-hamboi-text-muted mb-3">{book.authorInfo}</p>
                  <p className="text-sm text-hamboi-text-muted mb-4 line-clamp-3">{book.description}</p>
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
