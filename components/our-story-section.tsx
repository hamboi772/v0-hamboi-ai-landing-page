import { Heart, Sparkles, Users } from "lucide-react"

export function OurStorySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-purple-600 font-medium mb-4">
              <Heart className="w-5 h-5" />
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Built From Personal Experience
            </h2>
            <p className="text-muted-foreground text-lg">The story behind Hamboi Mindcare</p>
          </div>

          {/* Story Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Founder Image Section */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar Placeholder */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border-4 border-white/30">
                  <span className="text-5xl md:text-6xl font-bold">AH</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Abiodun Abdul Hameed</h3>
                  <p className="text-purple-100 text-lg">Founder & Creator of Hamboi Mindcare</p>
                  <p className="text-purple-200 mt-1">Young Nigerian Entrepreneur</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm text-purple-100 uppercase tracking-wide mb-1">HAMBOI stands for:</p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      <strong>H</strong>ealth <strong>A</strong>dvancement for <strong>M</strong>ental{" "}
                      <strong>B</strong>alance and <strong>O</strong>ptimistic <strong>I</strong>ntervention
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground text-lg leading-relaxed mb-6">
                  {'"'}My name is Abiodun Abdul Hameed, and I{`'`}m a teenager from Nigeria. Hamboi Mindcare wasn{`'`}t
                  born in a boardroom or a tech lab — it was born from the pain my family and I have experienced
                  firsthand.
                  {'"'}
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Growing up, I watched my mum and my brother struggle with mental health challenges. I saw how mental
                  abuse affected them — the sleepless nights, the silent tears, the feeling of being alone even in a
                  room full of people. And I felt it too.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  In Nigeria, and in many parts of the world, mental health isn{`'`}t something people talk about
                  openly. There{`'`}s stigma. There{`'`}s shame. There{`'`}s silence. And for teenagers like me, there
                  {`'`}s often nowhere to turn when the weight of the world feels too heavy.
                </p>

                <div className="bg-purple-50 rounded-2xl p-6 my-8 border-l-4 border-purple-500">
                  <p className="text-purple-900 font-medium italic text-lg">
                    {'"'}I created Hamboi Mindcare because I wanted to build the friend I wished I had during my darkest
                    moments — someone who would listen without judgment, who would be there at 3 AM, and who would
                    remind me that my feelings are valid.{'"'}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  My mum inspired me to be strong. My brother showed me that asking for help isn{`'`}t weakness — it
                  {`'`}s courage. Together, they pushed me to turn our pain into purpose.
                </p>

                <p className="text-foreground font-medium text-lg leading-relaxed">
                  Hamboi Mindcare is my way of saying to every teenager out there: {'"'}You{`'`}re not alone. Your
                  mental health matters. And there{`'`}s always someone — or something — ready to listen.{'"'}
                </p>
              </div>

              {/* Mission Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t">
                <div className="text-center">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-7 h-7 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">Our Mission</h4>
                  <p className="text-muted-foreground text-sm">
                    Reduce mental health stigma and provide support to every teen who needs it
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">For Teens, By A Teen</h4>
                  <p className="text-muted-foreground text-sm">
                    Built by someone who truly understands what you{`'`}re going through
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-green-600" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">Making A Difference</h4>
                  <p className="text-muted-foreground text-sm">
                    Every conversation with Hamboi is a step toward breaking the silence
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Join us in our mission to support teen mental health</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                Made with love in Nigeria
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                For teens everywhere
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
