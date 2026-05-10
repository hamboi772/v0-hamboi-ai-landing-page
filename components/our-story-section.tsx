
import { Award, Globe, Heart, Sparkles, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function OurStorySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-hamboi-green font-bold mb-6">
              <Award className="w-5 h-5" />
              Our Story
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 text-balance leading-tight">
              Built From Real Experiences
            </h2>
            <p className="text-hamboi-text-muted text-lg">The story behind Hamboi MindCare</p>
          </div>

          {/* Story Card */}
          <div className="bg-hamboi-dark-card border-2 border-hamboi-purple/40 rounded-3xl shadow-xl shadow-hamboi-purple/20 overflow-hidden">
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
                <p className="text-white text-lg leading-relaxed mb-6 font-medium">
                  {'"'}My name is Abiodun Abdul Hameed. I{`'`}m a 15-year-old student from Nigeria, and Hamboi MindCare
                  didn{`'`}t start in a boardroom or a tech lab. It started from real experiences — things my family
                  and I went through, and feelings I didn{`'`}t always know how to talk about.{'"'}
                </p>

                <p className="text-hamboi-text-muted leading-relaxed mb-6">
                  Growing up, I saw how mental health struggles can quietly affect families and young people. I also
                  felt the pressure that many teenagers feel — school stress, expectations, and moments where it feels
                  like you have to be strong all the time.
                </p>

                <p className="text-hamboi-text-muted leading-relaxed mb-6">
                  In Nigeria and many parts of the world, mental health is not something teenagers talk about openly.
                  There is often silence, misunderstanding, or fear of being judged. Sometimes, you just need a safe
                  place to breathe and feel understood.
                </p>

                <div className="bg-teal-50 rounded-2xl p-6 my-8 border-l-4 border-teal-500">
                  <p className="text-teal-900 font-medium italic text-lg">
                    {'"'}I created Hamboi MindCare because I wanted to build the friend I wished I had during hard
                    moments — something that could listen, share helpful ideas, and remind young people that their
                    feelings matter.{'"'}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Hamboi MindCare is my way of telling other teenagers: you are not alone. It{`'`}s a student-led
                  space for learning, sharing, and supporting one another through articles, reflections, and conversations.
                </p>

                <p className="text-foreground font-medium text-lg leading-relaxed">
                  You don{`'`}t have to have everything figured out. Sometimes, just knowing someone understands is
                  enough to take the next step.
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

              {/* Certificate of Recognition */}
              <div className="mt-8 pt-8 border-t">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">Certificate of Recognition</p>
                <img
                  src="https://i.ibb.co/FqD3XWRv/fgc-certificate.jpg"
                  alt="FIRST Global Certificate of Recognition - Abdul Hameed Abiodun"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Join us in our mission to support teen mental health</p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                Made with love in Nigeria
              </span>
              <span className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium">
                <Globe className="w-4 h-4" />
                For teens everywhere
              </span>
            </div>
            <Link href="/about/article">
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:opacity-90">
                <Award className="w-4 h-4 mr-2" />
                Read Full Story: "The Bronze Medal We Won from Our Bedrooms"
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
