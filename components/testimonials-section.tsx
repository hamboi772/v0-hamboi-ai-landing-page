import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote: "Hamboi helped me realize I'm not alone. When I'm feeling anxious at 2am, it's there to help me calm down.",
    author: "Alex, 16",
    role: "Student",
    rating: 5,
  },
  {
    quote:
      "As a parent, knowing my daughter has a safe outlet for her feelings gives me peace of mind. She's more open with us now too.",
    author: "Maria T.",
    role: "Parent",
    rating: 5,
  },
  {
    quote: "I was skeptical about talking to an AI, but Hamboi actually gets me. The coping strategies really work.",
    author: "Jordan, 17",
    role: "High School Junior",
    rating: 5,
  },
  {
    quote:
      "It's like having a supportive friend in my pocket. No judgment, just understanding. This app is changing lives.",
    author: "Sam, 15",
    role: "Student",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-hamboi-light to-hamboi-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-hamboi-dark">
            Real Stories from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-purple to-hamboi-blue">
              Real Teens
            </span>
          </h2>
          <p className="text-lg text-hamboi-dark/70 max-w-2xl mx-auto">
            See how Hamboi is helping young people feel heard and supported.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-hamboi-purple/10 hover:border-hamboi-purple/30 hover:shadow-lg transition-all"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-hamboi-purple/20" />
                  <p className="text-hamboi-dark/80 leading-relaxed pl-6">{testimonial.quote}</p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-hamboi-purple to-hamboi-blue flex items-center justify-center text-white font-semibold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-hamboi-dark">{testimonial.author}</p>
                    <p className="text-sm text-hamboi-dark/60">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
