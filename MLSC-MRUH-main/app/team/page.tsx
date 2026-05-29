"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Linkedin, Instagram, Youtube } from "lucide-react"

type TeamMemberType = {
  name: string
  role: string
  designation: string
  image: string
  linkedin?: string
  priority?: number
}

function TeamMember({ member, index = 0 }: { member: TeamMemberType; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      className="bg-card rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition duration-300 group"
    >
      <div className="relative w-full h-72">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={`object-cover transition-transform duration-300 ${
            [
              "P. Vishnu Vardhan Reddy",
              "K. Gopi Chand",
              "P. Lakshmi Sai Meghana",
              "P. Venkata Sesha Sai Jatin"
            ].includes(member.name)
              ? "scale-95"
              : "scale-100"
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
        <p className="text-sm text-slate-600">{member.role}</p>
        <p className="text-xs text-slate-500">{member.designation}</p>
        {member.linkedin && (
          <div className="mt-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-700 transition"
            >
              <Linkedin size={22} />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const leadership: TeamMemberType[] = [
  { name: "Sri CH. Malla Reddy", role: "Chief Patron", designation: "Founder Chairman MRGI", image: "../images/Founder.jpeg" },
  { name: "Dr. V.S.K Reddy", role: "Patron", designation: "Vice Chancellor MRU", image: "../images/VC.jpeg" },
  { name: "Dr. G. Gita Jerith", role: "Convener", designation: "Dean AI&ML", image: "../images/Dean.avif" },
  { name: "Dr. Nagaraju", role: "Co-Convener", designation: "AI & ML HOD", image: "../images/HOD.avif" },
  { name: "Prof. Preethi C.M", role: "Co‑Convener", designation: "ASST PROF", image: "../images/Faculty.avif" }
]

const coreTeam: TeamMemberType[] = [
  { name: "P. Charitha Reddy", role: "President", designation: "Student Leader", image: "../images/Charitha_President.jpg", linkedin: "https://www.linkedin.com/in/pebbeti-charitha-reddy-839257286" },
  { name: "Sai Pranay Tadakamalla", role: "Vice President", designation: "Student Leader", image: "../images/SaiPranay_Vice_President.jpg", linkedin: "https://www.linkedin.com/in/sai-pranay-tadakamalla-7570bb1a6/" },
  { name: "P. Vishnu Vardhan Reddy", role: "General Secretary", designation: "Student Leader", image: "../images/Vishnu_General_Sec.jpg", linkedin: "https://www.linkedin.com/in/vishnu-vardhan-reddy-padala-a3a13330b" },
  { name: "M. Adieshwar Reddy", role: "Secretary", designation: "Student Leader", image: "../images/Adieshwar_Sec.jpg", linkedin: "https://www.linkedin.com/in/adieshwar-reddy-mogili-3b4b11332" },
  { name: "K. Gopi Chand", role: "Treasurer", designation: "Student Leader", image: "../images/Gopichand_Treasurer.jpg", linkedin: "https://www.linkedin.com/in/gopichand-chowdary-kollu" }
]

const departmentTeam: TeamMemberType[] = [
  { name: "V. Sree Harshitha", role: "Design & Content Lead", designation: "Creative Team", image: "../images/Harshitha_Design_and_Content_Lead.jpg", linkedin: "https://www.linkedin.com/in/sree-harshitha-vakkantham-40931a310" },
  { name: "P. Lakshmi Sai Meghana", role: "Marketing Lead", designation: "Marketing Team", image: "../images/Meghana_Markting_Lead.jpg", linkedin: "https://www.linkedin.com/in/meghana-pidaparthi" },
  { name: "P. Venkata Sesha Sai Jatin", role: "Technical Lead", designation: "Technical Team", image: "../images/SaiJatin_Technical_Lead.jpg", linkedin: "https://www.linkedin.com/in/saijatinpakki" },
  { name: "Divya Rana", role: "Technical Lead", designation: "Technical Team", image: "../images/Divya_Technical_Lead.jpg", linkedin: "https://www.linkedin.com/in/divya-rana-a4634833b" },
  { name: "K. Manasa", role: "Event Coordinator", designation: "Events Team", image: "../images/Manasa_Event_Coord.jpg", linkedin: "https://www.linkedin.com/in/manasa-koyyana-11b466368" },
  { name: "Rajnikant Kumar", role: "Event Coordinator", designation: "Events Team", image: "../images/Rajnikant_Event_Coord.jpg", linkedin: "https://www.linkedin.com/in/rajnikant-kumar-27bb22354" },
  { name: "M. Ganesh", role: "Event Coordinator", designation: "Events Team", image: "../images/Ganesh_Event_Coord.jpg", linkedin: "https://www.linkedin.com/in/ganesh-mandugula-147207344" },
  { name: "V. Siri Chandana", role: "Community Engagement", designation: "Community Team", image: "../images/SiriChandana_Community_Engagement.jpg", linkedin: "https://www.linkedin.com/in/siri-chandana-vemula" },
  { name: "J. Bharath Kumar", role: "Community Engagement", designation: "Community Team", image: "../images/Bharath_Community_Engagement.jpg", linkedin: "https://www.linkedin.com/in/japa-bharath-kumar-6b5225357" },
  { name: "P. Likhitha Sai", role: "Community Engagement", designation: "Community Team", image: "../images/LikhithaSai_Community_Engagement.jpg", linkedin: "https://www.linkedin.com/in/likhitha-pacha-a2a03033a" }
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/mlsc_mruh?igsh=YXVtMXNpanIwYmF1", icon: Instagram, color: "hover:text-pink-600" },
  { name: "LinkedIn", href: "https://linkedin.com/company/mlscmruh", icon: Linkedin, color: "hover:text-blue-700" },
  { name: "YouTube", href: "https://youtube.com/@mlscmruh", icon: Youtube, color: "hover:text-red-600" }
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-card">
      <Header />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-display">
              Meet Our <span className="text-blue-600">Team</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-body">
              The passionate individuals who make MLSC MRUH a thriving community of learners, innovators, and leaders.
            </p>
          </motion.div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display mb-4">Leadership Team</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-body">
                Our esteemed faculty and administrative leaders who guide and support our mission.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {leadership.map((member, index) => (
                <TeamMember key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display mb-4">Core Team</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-body">
                Our dedicated student leaders who drive initiatives and foster community engagement.
              </p>
            </motion.div>
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-sm">
                <TeamMember member={coreTeam[0]} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              {coreTeam.slice(1, 3).map((member, index) => (
                <TeamMember key={member.name} member={member} index={index} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {coreTeam.slice(3).map((member, index) => (
                <TeamMember key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display mb-4">Department Team</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-body">
                Specialized team members leading various departments and initiatives within MLSC.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {departmentTeam.map((member, index) => (
                <TeamMember key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-display">Connect With Our Community</h2>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto font-body">
              Follow us on social media to stay updated with the latest events, announcements, and community highlights.
            </p>
            <div className="flex justify-center space-x-8">
              {socialLinks.map(social => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-16 h-16 bg-card rounded-full shadow-lg flex items-center justify-center text-slate-600 ${social.color} transition-all duration-300 hover:shadow-xl border border-slate-200`}
                  >
                    <Icon size={28} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
