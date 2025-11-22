import Link from "next/link"
import { Linkedin, Twitter, Github, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-card border-t border-border mt-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#7B3FEF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 transition-transform hover:scale-110">
                <img
                  src="/logos/logo-12.svg"
                  alt="TECHNOVA Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading text-xl font-bold text-foreground tracking-wider">TECHNOVA</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Leading the future with innovative technology solutions and Neo-Futurist approach.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-[#00D9FF]/20 flex items-center justify-center text-muted-foreground hover:text-[#00D9FF] transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-[#00D9FF]/20 flex items-center justify-center text-muted-foreground hover:text-[#00D9FF] transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-[#00D9FF]/20 flex items-center justify-center text-muted-foreground hover:text-[#00D9FF] transition-all duration-300"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-[#00D9FF]/20 flex items-center justify-center text-muted-foreground hover:text-[#00D9FF] transition-all duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-foreground font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  Digital Transformation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-foreground font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-foreground font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>123 Tech Street</li>
              <li>Innovation District</li>
              <li>San Francisco, CA 94105</li>
              <li className="pt-2">
                <a
                  href="mailto:hello@technova.com"
                  className="hover:text-[#00D9FF] transition-colors inline-flex items-center gap-2"
                >
                  <Mail size={14} className="text-[#7B3FEF]" />
                  hello@technova.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-[#00D9FF] transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="gradient-line w-32 mx-auto mb-6" />
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TECHNOVA. All rights reserved. Built with passion for the future.
          </p>
        </div>
      </div>
    </footer>
  )
}
