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
      "Hamboi can detect when you might be in crisis and will immediately provide resources including the 988 Suicide & Crisis Lifeline and Crisis Text Line. Your safety is our priority.",
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
    <section id="faq" className="py-20 lg:py-28 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-hamboi-text-muted">Got questions? We've got answers.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-hamboi-purple/40 rounded-2xl px-6 bg-hamboi-dark-card data-[state=open]:border-hamboi-purple/70 data-[state=open]:bg-[#1E1B2E] data-[state=open]:shadow-xl data-[state=open]:shadow-hamboi-purple/20 transition-all"
            >
              <AccordionTrigger className="text-left text-white font-bold hover:text-hamboi-green hover:no-underline py-5 text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-hamboi-text-muted pb-5 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
