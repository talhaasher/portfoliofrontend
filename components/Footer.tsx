import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { personalInfo, socialLinks, footerLinks, services } from "@/data/data"

export default function Footer() {
  return (
    <>
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{personalInfo.name}</h3>
            <p className="text-gray-300 mb-4 max-w-md">{personalInfo.description}</p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-300 hover:text-white transition-colors">
                  {link.icon === "Github" ? (
                    <Github className="w-6 h-6" />
                  ) : link.icon === "Linkedin" ? (
                    <Linkedin className="w-6 h-6" />
                  ) : (
                    <Mail className="w-6 h-6" />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> by {personalInfo.name} © 2025
          </p>
        </div>
      </div>
    </footer>
    </>
    
  )
}
