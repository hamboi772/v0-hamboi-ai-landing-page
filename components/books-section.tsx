"use client"

import { useState } from "react"
import { Book, Star, ChevronLeft, ChevronRight, BookOpen, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const books = [
  {
    id: "the-happiness-trap",
    title: "The Happiness Trap",
    author: "Russ Harris",
    description: "Stop struggling and start living. Learn how to handle painful thoughts effectively.",
    category: "Anxiety",
    rating: 4.8,
    color: "from-blue-500 to-cyan-500",
    hasContent: true,
  },
  {
    id: "feeling-good",
    title: "Feeling Good",
    author: "David D. Burns",
    description: "The clinically proven drug-free treatment for depression and self-esteem.",
    category: "Depression",
    rating: 4.7,
    color: "from-amber-500 to-orange-500",
    hasContent: true,
  },
  {
    id: "healing-the-african-mind",
    title: "Healing the African Mind",
    author: "Dr. Maymunah Kadiri",
    description: "Understanding mental health in the Nigerian context. Breaking cultural stigma.",
    category: "Nigeria",
    rating: 4.9,
    color: "from-green-500 to-emerald-500",
    hasContent: true,
  },
  {
    id: "the-naija-mind",
    title: "The Naija Mind",
    author: "Dr. Femi Olugbile",
    description: "Practical strategies for managing stress and economic pressure in Nigeria.",
    category: "Stress",
    rating: 4.8,
    color: "from-teal-500 to-cyan-500",
    hasContent: true,
  },
  {
    id: "mental-wellness-for-african-youth",
    title: "Wellness for Youth",
    author: "Dr. Chioma Nwosu",
    description: "For young Africans navigating social media, academic stress, and identity.",
    category: "Youth",
    rating: 4.7,
    color: "from-purple-500 to-pink-500",
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
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-hamboi-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-hamboi-purple/10 border border-hamboi-purple/20 text-hamboi-purple px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Book className="w-3.5 h-3.5" />
            Library
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Read your way to <span className="text-hamboi-purple">peace.</span>
          </h2>
          <p className="text-hamboi-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Curated by experts, chosen for you. Transformative insights from world-renowned psychologists and therapists.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 hidden lg:block">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full shadow-xl glass-morphism border-white/10 text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 hidden lg:block">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full shadow-xl glass-morphism border-white/10 text-white hover:bg-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Books grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {visibleBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-full overflow-hidden glass-morphism border-white/10 rounded-[2.5rem] p-1 relative flex flex-col group">
                    <div className={`h-2 w-full rounded-t-[2.5rem] bg-gradient-to-r ${book.color} opacity-40`} />
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-6">
                        <span className="bg-hamboi-purple/10 text-hamboi-purple border border-hamboi-purple/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {book.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-hamboi-green text-hamboi-green" />
                          <span className="text-xs font-black text-white">{book.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-black text-2xl text-white mb-2 leading-tight uppercase tracking-tight">
                        {book.title}
                      </h3>
                      <p className="text-[10px] text-hamboi-green font-black mb-6 uppercase tracking-[0.2em]">by {book.author}</p>
                      <p className="text-sm text-hamboi-text-muted mb-10 line-clamp-3 leading-relaxed font-medium">{book.description}</p>

                      <div className="mt-auto pt-6 border-t border-white/5">
                        <Link href={`/read/${book.id}`}>
                          <Button className="w-full bg-white text-background hover:bg-hamboi-purple hover:text-white transition-all font-black rounded-xl h-12 uppercase tracking-widest text-xs">
                             Read Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile navigation */}
          <div className="flex justify-center gap-4 mt-10 lg:hidden">
            <Button variant="outline" size="lg" onClick={prevSlide} className="rounded-2xl border-white/10 text-white">
              <ChevronLeft className="w-5 h-5 mr-1" />
            </Button>
            <Button variant="outline" size="lg" onClick={nextSlide} className="rounded-2xl border-white/10 text-white">
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * booksPerPage)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                Math.floor(currentIndex / booksPerPage) === i
                  ? "bg-hamboi-purple w-12"
                  : "bg-white/10 hover:bg-white/20 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
