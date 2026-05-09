import { Heart, Phone, MessageSquare, ExternalLink } from "lucide-react"
import Link from "next/link"

const crisisResources = [
  { name: "MANI Nigeria (24/7)", description: "Call 0809 111 6264", href: "tel:08091116264" },
  { name: "988 Suicide & Crisis Lifeline", description: "Call or text 988 (International)", href: "tel:988" },
  { name: "Crisis Text Line", description: "Text HOME to 741741", href: "sms:741741" },
  { name: "Trevor Project (LGBTQ+)", description: "1-866-488-7386", href: "tel:1-866-488-7386" },
]

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Resources Hub", href: "/resources" },
    { name: "Download", href: "#download" },
    { name: "Our Story", href: "#our-story" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Founders", href: "/about/founders" },
    { name: "Founder's Story", href: "/about/article" },
    { name: "volunteer", href: "/careers" },
    { name: "Student Articles", href: "/articles" },
    { name: "Contact", href: "/contact" },
    { name: "Donate", href: "/donate" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "COPPA Compliance", href: "/coppa" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-hamboi-dark-bg to-[#0a0a15] text-white">
      {/* Crisis Resources Banner */}
      <div className="bg-gradient-to-r from-hamboi-purple/20 to-hamboi-pink/20 border-y border-hamboi-purple/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-hamboi-green font-bold" />
              <span className="font-bold text-lg">In crisis? We're here 🆘</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {crisisResources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.href}
                  className="flex items-center gap-2 hover:text-hamboi-calm transition-colors"
                >
                  <span className="font-semibold">{resource.name}</span>
                  <span className="text-white/60">- {resource.description}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hamboi-purple to-hamboi-blue flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Hamboi Mindcare</span>
            </Link>
            <p className="text-hamboi-text-muted max-w-sm leading-relaxed">
              Real support for real teens 💚 Always here when you need to talk. No judgment, just vibes and solid advice.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Hamboi Mindcare. All rights reserved. Built with{" "}
            <Heart className="h-4 w-4 inline text-red-400" /> for teens everywhere.
          </p>
          <p className="text-white/40 text-xs">
            Hamboi Mindcare is a support tool, not a replacement for professional mental health care.
          </p>
        </div>
      </div>
    </footer>
  )
}
