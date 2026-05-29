"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react"

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: Facebook,
    color: "hover:bg-blue-600",
    description: "Follow us for updates and community posts",
  },
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
    color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
    description: "Check out our event photos and stories",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
    color: "hover:bg-blue-700",
    description: "Connect with us professionally",
  },
  {
    name: "YouTube",
    href: "#",
    icon: Youtube,
    color: "hover:bg-red-600",
    description: "Watch our workshops and event recordings",
  },
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
    color: "hover:bg-blue-400",
    description: "Get real-time updates and announcements",
  },
]

export default function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Connect With Us</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon

          return (
            <motion.a
              key={social.name}
              href={social.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-4 p-4 bg-card rounded-xl shadow-md border border-border200 hover:shadow-lg transition-all duration-300 group ${social.color}`}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-card transition-colors duration-300">
                <Icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">
                  {social.name}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-100 transition-colors duration-300">
                  {social.description}
                </p>
              </div>
            </motion.a>
          )
        })}
      </div>
    </motion.div>
  )
}
