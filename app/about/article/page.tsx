import { Heart, Award, ArrowLeft, Calendar, Clock, Globe, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArticleShareButton } from "@/components/article-share-button"

export const metadata = {
  title: "The Bronze Medal We Won from Our Bedrooms | Hamboi Mindcare",
  description: "How winning a global robotics award from home led to creating Hamboi MindCare - a mental health platform for Nigerian teens.",
}

function ShareSection() {
  return <ArticleShareButton articleUrl="/about/article" />
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-background to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Hamboi Mindcare</span>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-teal-200 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Article Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="flex justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                Founder's Story
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                <Globe className="w-4 h-4" />
                FIRST Global 2025
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight text-balance">
              The Bronze Medal We Won from Our Bedrooms
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-200">
                <Image
                  src="/images/founder-story.webp"
                  alt="Abiodun Abdul Hameed"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Abiodun Abdul Hameed</p>
                <p className="text-sm text-gray-500">Age 15 | Founder, Hamboi MindCare</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                January 2025
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                5 min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                  In competitive robotics, 2025 was meant to be our year.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  As part of Team Nigeria, my teammates and I spent months coding, building, failing, fixing, and trying 
                  again. All that hard work paid off when we won the <strong>Dr. Mae Jemison Award for International Unity</strong> at 
                  the FIRST Global Challenge, earning a Bronze Medal and ranking among teams from around the world.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  On paper, it was a big win.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  <strong>But we weren't there.</strong>
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  While students from over 190 countries gathered in Panama City, my teammates and I were still at home 
                  in Nigeria. Not because our robot failed. Not because we weren't good enough. But because of visa 
                  issues and financial challenges.
                </p>

                {/* Highlight Quote */}
                <div className="bg-teal-50 rounded-2xl p-6 my-10 border-l-4 border-teal-500">
                  <p className="text-teal-900 font-medium italic text-xl leading-relaxed">
                    "We watched the opening ceremony on our phones. We were global medalists — watching from our bedrooms."
                  </p>
                </div>

                {/* Section: What It Felt Like */}
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                  What It Felt Like to Be "Stuck"
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Being a young Nigerian student comes with a lot of pressure.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  You're expected to do well in school, build skills, dream big, and somehow not get tired. When 
                  something finally works out — and then gets taken away — it hurts more than people realize.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  That moment made me think deeply.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  If we — students who had just won an international award — felt frustrated and drained, what about 
                  other students who don't get recognition at all?
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  So many young people are stressed, overwhelmed, and silently struggling, especially students preparing 
                  for exams or trying to build something meaningful with very little support.
                </p>

                {/* Section: How Hamboi Started */}
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                  How Hamboi MindCare Started
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  That experience pushed me to act.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  I decided that if I couldn't travel to Panama, I would still build something that matters.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  <strong>That's how Hamboi MindCare was born.</strong>
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  I used what I learned from robotics — problem-solving and logic — and applied it to mental health 
                  awareness. Hamboi MindCare is a student-led platform created to support young people through articles, 
                  reflection tools, and shared experiences.
                </p>

                {/* List Box */}
                <div className="bg-gray-50 rounded-2xl p-6 my-8">
                  <p className="text-gray-800 font-semibold mb-4">It's for:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-600">Students stressed about exams</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-600">Teens feeling overwhelmed or misunderstood</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-600">Young people who just need to know they're not alone</span>
                    </li>
                  </ul>
                  <p className="text-gray-500 mt-4 text-sm italic">
                    It's not therapy. It's a safe starting place.
                  </p>
                </div>

                {/* Section: What Unity Means */}
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                  What Unity Means to Me Now
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Our award was for International Unity.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  I've learned that unity isn't about being in the same country. It's about understanding each other's 
                  struggles and choosing to support one another anyway.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  We may have been grounded, but our ideas were not.
                </p>

                <p className="text-gray-800 leading-relaxed mb-6 font-medium text-lg">
                  With Hamboi MindCare, I want to help prove that you don't need to leave your country to make an impact. 
                  Sometimes, change starts right where you are — at 15, with a laptop, a phone, and a strong reason to care.
                </p>
              </div>

              {/* Author Box */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-200 flex-shrink-0">
                    <Image
                      src="/images/founder-story.webp"
                      alt="Abiodun Abdul Hameed"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Abiodun Abdul Hameed</p>
                    <p className="text-gray-600 text-sm mt-1">
                      A 15-year-old Nigerian student, robotics innovator, and 2025 FIRST Global Challenge Bronze Medalist. 
                      After facing travel challenges with his team, he founded Hamboi MindCare, a youth-led platform 
                      focused on mental health awareness and student-written content.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        <Award className="w-3 h-3" />
                        Bronze Medalist
                      </span>
                      <span className="inline-flex items-center gap-1 bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        <Globe className="w-3 h-3" />
                        Team Nigeria
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="text-gray-600 text-sm">Found this inspiring? Share it with others.</p>
                  <ShareSection />
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-8 md:p-12 text-white text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Hamboi MindCare is here for you. Chat with our AI companion, track your mood, or explore helpful resources.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/">
                  <Button className="bg-white text-teal-600 hover:bg-white/90">
                    <Heart className="h-4 w-4 mr-2" />
                    Try Hamboi Now
                  </Button>
                </Link>
                <Link href="/about/founders">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                    Meet the Founder
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Hamboi Mindcare. Built with <Heart className="h-4 w-4 inline text-red-400" />{" "}
            for teens everywhere.
          </p>
        </div>
      </footer>
    </div>
  )
}
