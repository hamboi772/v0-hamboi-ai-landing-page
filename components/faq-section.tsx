import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is Hamboi Mindcare free?",
    answer:
      "Hamboi offers a free tier with essential features including unlimited conversations, mood tracking, and access to coping strategies. Premium features like advanced insights and priority support are available with a subscription.",
  },
  {
    question: "How does the AI work?",
    answer:
      "Hamboi uses advanced AI trained specifically for teen mental health support. It listens to what you share, provides empathetic responses, and offers evidence-based coping strategies. It learns your preferences over time to give more personalized support.",
  },
  {
    question: "Is it a replacement for therapy?",
    answer:
      "No, Hamboi is a support tool, not a replacement for professional therapy or medical advice. We encourage seeking help from licensed professionals for serious mental health concerns. Hamboi can complement therapy by providing 24/7 support between sessions.",
  },
  {
    question: "What if I'm in crisis?",
    answer:
      "Hamboi can detect when you might be in crisis and will immediately provide resources including the 988 Suicide & Crisis Lifeline, Crisis Text Line, and the Trevor Project (for LGBTQ+ youth). Your safety is our priority.",
  },
  {
    question: "How is my data protected?",
    answer:
      "All conversations are end-to-end encrypted. We're COPPA and GDPR compliant. Your data is never sold to third parties. You can delete all your data at any time. We conduct regular security audits to ensure your information stays safe.",
  },
  {
    question: "Can parents see my conversations?",
    answer:
      "Your conversations with Hamboi are private by default. Parents can access an optional dashboard that shows general usage patterns and mood trends, but they cannot read your actual conversations without your explicit permission.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-hamboi-dark">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-purple to-hamboi-blue">
              Questions
            </span>
          </h2>
          <p className="text-lg text-hamboi-dark/70">Got questions? We've got answers.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-hamboi-purple/10 rounded-xl px-6 data-[state=open]:border-hamboi-purple/30 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left text-hamboi-dark font-semibold hover:text-hamboi-purple hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-hamboi-dark/70 pb-5 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
