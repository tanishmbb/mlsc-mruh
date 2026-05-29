"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Mail, Phone } from "lucide-react"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Our Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/mlsc_mruh?igsh=YXVtMXNpanIwYmF1", icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/mlsc-mru", icon: Linkedin },
  { name: "YouTube", href: "https://www.youtube.com/@mlsc_mruh", icon: Youtube },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Image
              src="/images/mlsc-logo.jpg"
              alt="MLSC MRUH"
              width={150}
              height={100}
              className="mb-4 bg-card p-2 rounded"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              Microsoft Learn Student Chapter at Malla Reddy University - Empowering students through technology,
              innovation, and community building.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">Malla Reddy University, Hyderabad</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-green-400" />
                <span className="text-gray-300 text-sm">mlsc.mruh@outlook.com</span>
              </div>
            </div>
          </div>

          {/* Social Media and Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>

            {/* Embedded Map */}
            <div className="w-full h-32 bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5234567890123!2d78.4567890123456!3d17.5234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMalla%20Reddy%20University!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Microsoft Learn Student Chapter - MRUH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
