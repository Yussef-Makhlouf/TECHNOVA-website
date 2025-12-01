import { Link } from "@/i18n/routing"
import { Linkedin, Twitter, Github, Mail, Instagram } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="relative bg-card border-t border-border mt-20 overflow-hidden">
      {/* Pattern Background with Gradient Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[.09] dark:opacity-[.09]"
          style={{
            backgroundImage: "url('/pattern/pattern2.png')",
            backgroundSize: "300px 300px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />
      </div>

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
              {t('description')}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.linkedin.com/company/110027749/admin/dashboard/"
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
                href="https://www.instagram.com/globaltechnova?igsh=MTYzd3FiOTFuaXFxcA=="
                className="w-9 h-9 rounded-lg bg-muted hover:bg-[#00D9FF]/20 flex items-center justify-center text-muted-foreground hover:text-[#00D9FF] transition-all duration-300"
              >
                <Instagram size={18} />
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
            <h3 className="font-heading text-foreground font-bold mb-4">{t('servicesTitle')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  {t('links.aiSolutions')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  {t('links.cloudInfrastructure')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  {t('links.cybersecurity')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  {t('links.digitalTransformation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-foreground font-bold mb-4">{t('companyTitle')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  {t('links.aboutUs')}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  {t('links.careers')}
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  {t('links.caseStudies')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#7B3FEF] group-hover:bg-[#00D9FF] transition-colors" />
                  {t('links.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-foreground font-bold mb-4">{t('contactTitle')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>{t('contactInfo.address1')}</li>
              {/* <li>{t('contactInfo.address2')}</li>
              <li>{t('contactInfo.address3')}</li> */}
              <li className="pt-2">
                <a
                  href="mailto:Info@globaltechnova.com"
                  className="hover:text-[#00D9FF] transition-colors inline-flex items-center gap-2"
                >
                  <Mail size={14} className="text-[#7B3FEF]" />
Info@globaltechnova.com
</a>
              </li>
              <li>
                <a href="tel:+971502717411" className="hover:text-[#00D9FF] transition-colors">
                  +971502717411
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="gradient-line w-32 mx-auto mb-6" />
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TECHNOVA. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
