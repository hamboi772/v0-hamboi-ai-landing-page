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
    { name: "Volunteer", href: "/careers" },
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
      <div className="bg-gradient-to-r from-hamboi-purple/20 via-hamboi-pink/10 to-hamboi-purple/20 border-y border-hamboi-purple/30 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3 bg-hamboi-purple/20 px-6 py-3 rounded-2xl border border-hamboi-purple/40">
              <Phone className="h-6 w-6 text-hamboi-green animate-pulse" />
              <span className="font-black text-xl tracking-tight">In crisis? We're here 🆘</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 w-full lg:w-auto">
              {crisisResources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.href}
                  className="flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all border border-white/10 group"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-white group-hover:text-hamboi-green transition-colors">{resource.name}</span>
                    <span className="text-white/50 text-xs">{resource.description}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-white" />
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
