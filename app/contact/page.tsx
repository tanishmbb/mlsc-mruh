"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  MapPin,
  Mail,
  Phone,
  User,
  Instagram,
  Linkedin,
  Youtube,
  UserPlus,
  Clock,
  Navigation,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const leadershipContacts = [
  {
    role: "President",
    name: "V. Sree Harshitha",
    email: "Sreeharshitha.Vakkantham@studentambassadors.com",
    phone: "+91 93464 20853",
    linkedin: "https://www.linkedin.com/in/pebbeti-charitha-reddy-839257286",
    accent: "border-blue-500",
  },
  {
    role: "Vice President",
    name: "P. Venkata Sesha Sai Jatin",
    email: "pranaytadakamalla@outlook.com",
    phone: "+91 824 763 1882",
    linkedin: "https://www.linkedin.com/in/sai-pranay-tadakamalla-7570bb1a6/",
    accent: "border-purple-500",
  },
  {
    role: "General Secretary",
    name: "M. Adieshwar Reddy",
    email: "vishnuvardhanreddypadala@gmail.com",
    phone: "+91 90141 19133",
    linkedin: "https://www.linkedin.com/in/vishnu-vardhan-reddy-padala-a3a13330b",
    accent: "border-green-500",
  },
]

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/mlsc_mruh",
    icon: Instagram,
    accent: "hover:bg-pink-600",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/mlsc-mru",
    icon: Linkedin,
    accent: "hover:bg-blue-600",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@mlsc_mruh",
    icon: Youtube,
    accent: "hover:bg-red-600",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-16">
        {/* HERO */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Join Our <span className="text-primary">Community</span>
            </motion.h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Questions about MLSC MRUH? Join our WhatsApp groups to connect with the team.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full px-10 py-6 text-lg bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open("https://chat.whatsapp.com/IEaAWX8Y5Ge3NhueX8RSdv?s=sh&p=a&ilr=1", "_blank")}
              >
                <UserPlus className="mr-2" />
                Join 2nd Year Group
              </Button>
              <Button
                size="lg"
                className="rounded-full px-10 py-6 text-lg bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open("https://chat.whatsapp.com/C3g13qIIIbv60E96U9Lzci?s=sh&p=a&ilr=1", "_blank")}
              >
                <UserPlus className="mr-2" />
                Join 3rd Year Group
              </Button>
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Leadership Contacts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipContacts.map((c, i) => (
                <motion.div
                  key={c.role}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`bg-card border ${c.accent} rounded-2xl p-6 shadow-md hover:shadow-xl transition`}
                >
                  <h3 className="font-semibold text-lg">{c.role}</h3>
                  <p className="text-primary font-medium mb-4">{c.name}</p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Mail size={14} />
                      <a href={`mailto:${c.email}`} className="hover:underline">
                        {c.email}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} />
                      <a href={`tel:${c.phone}`} className="hover:underline">
                        {c.phone}
                      </a>
                    </p>
                  </div>

                  <a
                    href={c.linkedin}
                    target="_blank"
                    className="inline-flex mt-4 items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Linkedin size={16} />
                    LinkedIn Profile
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* INFO */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: MapPin,
                  title: "Our Location",
                  desc: "Malla Reddy University, Hyderabad, Telangana",
                },
                {
                  icon: Clock,
                  title: "Campus Hours",
                  desc: "Mon–Fri: 9 AM – 6 PM • Sat: 9 AM – 2 PM",
                },
                {
                  icon: Navigation,
                  title: "Getting Here",
                  desc: "Metro & bus accessible, parking available",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm text-center flex flex-col items-center"
                >
                  <item.icon className="text-primary mb-3 w-8 h-8" />
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIALS */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Connect With Us</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  whileHover={{ scale: 1.08 }}
                  className={`bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4 shadow-md transition ${s.accent}`}
                >
                  <s.icon className="w-10 h-10 text-primary" />
                  <span className="font-semibold">{s.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
