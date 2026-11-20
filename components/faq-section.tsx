import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is Hamboi Mindcare free?",
    answer:
      "Some Hamboi features are available at no cost. Check the feature or payment screen for current availability and any charges before using a paid feature.",
  },
  {
    question: "How does the AI work?",
    answer:
      "When you send a message, it is sent to an AI provider to generate a response. Hamboi does not learn your preferences over time, and replies can be mistaken or incomplete.",
  },
  {
    question: "Is it a replacement for therapy?",
    answer:
      "No. Hamboi shares general mental-health information and support, but it is not a therapist, doctor, or emergency service. A trusted adult or qualified professional can help with ongoing or serious concerns.",
  },
  {
    question: "What if I'm in crisis?",
    answer:
      "Hamboi cannot contact anyone for you or guarantee crisis resources. If you or someone else may be in immediate danger, get a trusted adult or another person nearby and contact local emergency services now.",
  },
  {
    question: "How is my data used?",
    answer:
      "Guest chats are kept in the current browser session; signed-in chats are saved to your account. Messages are processed by an AI provider. Hamboi is not end-to-end encrypted, so avoid sharing details you would not want processed or stored.",
  },
  {
    question: "Can parents see my conversations?",
    answer:
      "Hamboi does not currently have a parent dashboard. Signed-in chats are saved to the account, so only share information you are comfortable storing with the service.",
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
