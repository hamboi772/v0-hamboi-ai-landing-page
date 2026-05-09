import { Heart, Award, Star, Users, Sparkles, Target, ArrowLeft, Linkedin, Twitter, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

const founder = {
  name: "Abiodun Abdulhameed Abolarinwa",
  role: "Founder, Hamboi Mindcare",
  image: "/images/founder-abdulhameed.webp",
  title: "Teen Mental Health Advocate & Youth Innovator",
  bio: "A passionate advocate for teen mental health who created Hamboi Mindcare from personal experience. As a member of Team Nigeria for the FIRST Global Challenge 2025, he contributed to the team's success and was honored with the prestigious Dr. Mae Jemison Award for International Unity.",
  achievements: [
    "Dr. Mae Jemison Award - Bronze Medal (FIRST Global 2025)",
    "Team Nigeria Member - FIRST Global Challenge 2025",
    "Founded Hamboi Mindcare for teen mental health",
    "Developed AI-powered mental health support system",
  ],
  quote: "I created Hamboi Mindcare because I wanted to build the friend I wished I had during my darkest moments.",
  gradient: "from-purple-500 to-blue-500",
}

const advisors = [
  {
    name: "Coming Soon",
    role: "Mental Health Advisor",
    initials: "MH",
    bio: "We're building our advisory board with mental health professionals who share our vision.",
    gradient: "from-green-500 to-teal-500",
  },
  {
    name: "Coming Soon",
    role: "Technology Advisor",
    initials: "TA",
    bio: "Looking for experienced tech leaders to help guide our platform development.",
    gradient: "from-orange-500 to-pink-500",
  },
]

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "Every feature we build starts with empathy for the teens we serve.",
    color: "text-pink-500",
    bg: "bg-pink-100",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by teens, for teens. We understand because we've been there.",
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    icon: Target,
    title: "Impact Focused",
    description: "Our success is measured by the lives we help improve.",
    color: "text-green-500",
    bg: "bg-green-100",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Using AI and technology to make mental health support accessible.",
    color: "text-purple-500",
    bg: "bg-purple-100",
  },
]

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-background to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Hamboi Mindcare</span>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-purple-200 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 text-purple-600 font-medium mb-4">
            <Award className="w-5 h-5" />
            Meet Our Founder
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            The Visionary Behind <span className="text-purple-600">Hamboi Mindcare</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A dedicated young innovator working to break the silence around teen mental health in Nigeria and beyond.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Founder</h2>
            <p className="text-gray-600">The visionary building Hamboi Mindcare</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Founder Header */}
              <div className={`bg-gradient-to-r ${founder.gradient} p-6 md:p-8 text-white`}>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white/30 shadow-lg">
                    <Image
                      src={founder.image || "/placeholder.svg"}
                      alt={founder.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1">{founder.name}</h3>
                    <p className="text-white/90 text-base font-medium">{founder.role}</p>
                    <p className="text-white/70 text-sm mt-1">{founder.title}</p>
                    <div className="flex gap-3 mt-4 justify-center">
                      <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Content */}
              <div className="p-6 md:p-8">
                <p className="text-gray-700 text-base leading-relaxed mb-6">{founder.bio}</p>

                {/* Quote */}
                <div className="bg-purple-50 rounded-xl p-4 mb-6 border-l-4 border-purple-500">
                  <p className="text-purple-900 font-medium italic text-sm">"{founder.quote}"</p>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {founder.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-600 text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Read Full Story Button */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link href="/about/article">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                      <Award className="w-4 h-4 mr-2" />
                      Read Full Story: "The Bronze Medal We Won from Our Bedrooms"
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advisory Board</h2>
            <p className="text-gray-600">Experts guiding our mission</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${advisor.gradient} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-2xl font-bold">{advisor.initials}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{advisor.name}</h3>
                      <p className="text-white/80">{advisor.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{advisor.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Interested in joining our advisory board?{" "}
              <a href="mailto:contact@hamboimindcare.site" className="text-purple-600 hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className={`w-14 h-14 ${value.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={`w-7 h-7 ${value.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate people to help us support teen mental health.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate">
              <Button className="bg-white text-purple-600 hover:bg-white/90">
                <Heart className="h-4 w-4 mr-2" />
                Support Us
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
