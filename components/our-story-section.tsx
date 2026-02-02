import { Award, Globe, Heart, Sparkles, Users } from "lucide-react"
import Image from "next/image"

export function OurStorySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-teal-50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-teal-600 font-medium mb-4">
              <Award className="w-5 h-5" />
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              The Bronze Medal We Won from Our Bedrooms
            </h2>
            <p className="text-muted-foreground text-lg">How a robotics award led to a mental health mission</p>
          </div>

          {/* Story Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Founder Image Section */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Founder Photo */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-white/30 shadow-xl">
                  <Image
                    src="/images/founder-story.webp"
                    alt="Abiodun Abdul Hameed - Founder of Hamboi Mindcare"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Abiodun Abdul Hameed</h3>
                  <p className="text-teal-100 text-lg">Founder & Creator, Age 15</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                      <Award className="w-4 h-4" />
                      2025 FIRST Global Bronze Medalist
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                      <Globe className="w-4 h-4" />
                      Team Nigeria
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm text-teal-100 uppercase tracking-wide mb-1">HAMBOI stands for:</p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      <strong>H</strong>ope <strong>A</strong>nd <strong>M</strong>ind <strong>B</strong>alance:{" "}
                      <strong>O</strong>utreach <strong>I</strong>nitiative
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground text-lg leading-relaxed mb-6">
                  In competitive robotics, 2025 was meant to be our year. As part of Team Nigeria, my teammates and I 
                  spent months coding, building, failing, fixing, and trying again. All that hard work paid off when 
                  we won the <strong>Dr. Mae Jemison Award for International Unity</strong> at the FIRST Global Challenge, 
                  earning a Bronze Medal and ranking among teams from around the world.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  On paper, it was a big win. But we weren{`'`}t there. While students from over 190 countries gathered 
                  in Panama City, my teammates and I were still at home in Nigeria. Not because our robot failed. Not 
                  because we weren{`'`}t good enough. But because of visa issues and financial challenges.
                </p>

                <div className="bg-teal-50 rounded-2xl p-6 my-8 border-l-4 border-teal-500">
                  <p className="text-teal-900 font-medium italic text-lg">
                    {'"'}We watched the opening ceremony on our phones. We were global medalists — watching from our bedrooms.{'"'}
                  </p>
                </div>

                <h4 className="text-xl font-bold text-foreground mt-8 mb-4">What It Felt Like to Be "Stuck"</h4>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Being a young Nigerian student comes with a lot of pressure. You{`'`}re expected to do well in school, 
                  build skills, dream big, and somehow not get tired. When something finally works out — and then gets 
                  taken away — it hurts more than people realize.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  That moment made me think deeply. If we — students who had just won an international award — felt 
                  frustrated and drained, what about other students who don{`'`}t get recognition at all? So many young 
                  people are stressed, overwhelmed, and silently struggling.
                </p>

                <h4 className="text-xl font-bold text-foreground mt-8 mb-4">How Hamboi MindCare Started</h4>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  That experience pushed me to act. I decided that if I couldn{`'`}t travel to Panama, I would still 
                  build something that matters. That{`'`}s how <strong>Hamboi MindCare</strong> was born.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  I used what I learned from robotics — problem-solving and logic — and applied it to mental health 
                  awareness. Hamboi MindCare is a student-led platform created to support young people through AI 
                  conversations, reflection tools, and shared experiences.
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 my-8">
                  <p className="text-gray-700 font-medium mb-3">It{`'`}s for:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      Students stressed about exams
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      Teens feeling overwhelmed or misunderstood
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      Young people who just need to know they{`'`}re not alone
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-4 text-sm italic">
                    It{`'`}s not therapy. It{`'`}s a safe starting place.
                  </p>
                </div>

                <h4 className="text-xl font-bold text-foreground mt-8 mb-4">What Unity Means to Me Now</h4>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our award was for International Unity. I{`'`}ve learned that unity isn{`'`}t about being in the same 
                  country. It{`'`}s about understanding each other{`'`}s struggles and choosing to support one another anyway.
                </p>

                <p className="text-foreground font-medium text-lg leading-relaxed">
                  We may have been grounded, but our ideas were not. With Hamboi MindCare, I want to help prove that 
                  you don{`'`}t need to leave your country to make an impact. Sometimes, change starts right where you 
                  are — at 15, with a laptop, a phone, and a strong reason to care.
                </p>
              </div>

              {/* Mission Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t">
                <div className="text-center">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-7 h-7 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">Bronze Medalist</h4>
                  <p className="text-muted-foreground text-sm">
                    2025 FIRST Global Challenge - Dr. Mae Jemison Award for International Unity
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-cyan-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">For Teens, By A Teen</h4>
                  <p className="text-muted-foreground text-sm">
                    Built by someone who truly understands what you{`'`}re going through
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">Making Impact</h4>
                  <p className="text-muted-foreground text-sm">
                    You don{`'`}t need to leave your country to change the world
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Join us in our mission to support teen mental health</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                Made with love in Nigeria
              </span>
              <span className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium">
                <Globe className="w-4 h-4" />
                For teens everywhere
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
