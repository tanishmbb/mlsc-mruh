"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram, Youtube } from "lucide-react";

type TeamMemberType = {
  name: string;
  role: string;
  designation: string;
  msTitle: string;
  image: string;
  linkedin?: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

function TeamMember({ member }: { member: TeamMemberType }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/10 dark:bg-black/20 dark:hover:bg-black/30"
    >
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

        {/* LinkedIn overlay */}
        {member.linkedin && (
          <div className="absolute top-4 right-4 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-[#0A66C2] hover:text-white transition-colors border border-white/20 shadow-lg"
            >
              <Linkedin size={20} />
            </a>
          </div>
        )}
      </div>

      <div className="relative p-6 text-center">
        <div className="relative z-10 transform transition-transform duration-300">
          {/* Line 1 — Name */}
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
            {member.name}
          </h3>
          {/* Line 2 — Club Role */}
          <p className="text-sm font-semibold text-blue-400 mb-1 uppercase tracking-wider">
            {member.role}
          </p>
          {/* Line 3 — Department */}
          <p className="text-xs text-gray-300 font-medium mb-2">
            {member.designation}
          </p>
          {/* Line 4 — Microsoft Title */}
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 border border-blue-400/30 text-blue-300 tracking-wide">
            {member.msTitle}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── DATA ─────────────────── */

const coreTeam: TeamMemberType[] = [
  {
    name: "V. Sree Harshitha",
    role: "President",
    designation: "Student Leader",
    msTitle: "Associate Ambassador",
    image: "/images/harshitha.jpeg",
    linkedin: "https://www.linkedin.com/in/pebbeti-charitha-reddy-839257286",
  },
  {
    name: "P. Venkata Sesha Sai Jatin",
    role: "Vice President",
    designation: "Student Leader",
    msTitle: "Student Lead",
    image: "/images/jatin.jpeg",
    linkedin: "https://www.linkedin.com/in/sai-pranay-tadakamalla-7570bb1a6/",
  },
  {
    name: "M. Adieshwar Reddy",
    role: "General Secretary",
    designation: "Student Leader",
    msTitle: "Student Ambassador",
    image: "/images/Adhii.jpeg",
    linkedin: "https://www.linkedin.com/in/vishnu-vardhan-reddy-padala-a3a13330b",
  },
  {
    name: "P. Lakshmi Sai Meghana",
    role: "Secretary",
    designation: "Student Leader",
    msTitle: "Student Ambassador",
    image: "/images/Meghana_Markting_Lead.jpg",
    linkedin: "https://www.linkedin.com/in/adieshwar-reddy-mogili-3b4b11332",
  },
  {
    name: "M. Ganesh",
    role: "Treasurer",
    designation: "Student Leader",
    msTitle: "Student Lead",
    image: "/images/Ganesh_Event_Coord.jpg",
    linkedin: "https://www.linkedin.com/in/ganesh-mandugula-147207344",
  },
];

const departmentTeam: TeamMemberType[] = [
  {
    name: "Shlok",
    role: "Social Media & PR Lead",
    designation: "Creative Team",
    msTitle: "Student Leader",
    image: "/images/shlok.jpeg",
    linkedin: "https://www.linkedin.com/in/sree-harshitha-vakkantham-40931a310",
  },
  {
    name: "Tanish",
    role: "Deputy Technical Lead",
    designation: "Technical Team",
    msTitle: "Student Lead",
    image: "/images/tanish.jpg",
    linkedin: "https://www.linkedin.com/in/sree-harshitha-vakkantham-40931a310",
  },
  {
    name: "Divya Rana",
    role: "Data Operations Lead",
    designation: "Technical Team",
    msTitle: "Student Ambassador",
    image: "/images/Divya_Technical_Lead.jpg",
    linkedin: "https://www.linkedin.com/in/divya-rana-a4634833b",
  },
  {
    name: "V. Siri Chandana",
    role: "Community Engagement Lead",
    designation: "Community Team",
    msTitle: "Student Ambassador",
    image: "/images/SiriChandana_Community_Engagement.jpg",
    linkedin: "https://www.linkedin.com/in/siri-chandana-vemula",
  },
  {
    name: "Rajnikant Kumar",
    role: "Event Coordinator",
    designation: "Events Team",
    msTitle: "Student Lead",
    image: "/images/Rajnikant_Event_Coord.jpg",
    linkedin: "https://www.linkedin.com/in/rajnikant-kumar-27bb22354",
  },
  {
    name: "Sathwik",
    role: "Event Outreach Lead",
    designation: "Events Team",
    msTitle: "Student Ambassador",
    image: "/images/sathwik.jpg",
    linkedin: "",
  },
  {
    name: "Bharath",
    role: "Community Engagement",
    designation: "Community Team",
    msTitle: "Student Leader",
    image: "/images/Bharath_Community_Engagement.jpg",
    linkedin: "",
  },
  {
    name: "L. Likitha Sai",
    role: "Community Engagement",
    designation: "Community Team",
    msTitle: "Student Ambassador",
    image: "/images/LikhithaSai_Community_Engagement.jpg",
    linkedin: "",
  },
  {
    name: "Manasa",
    role: "Event Coordinator",
    designation: "Events Team",
    msTitle: "Student Ambassador",
    image: "/images/Manasa_Event_Coord.jpg",
    linkedin: "",
  },
  {
    name: "Sami",
    role: "Team Member",
    designation: "MLSC MRUH",
    msTitle: "Student Ambassador",
    image: "/placeholder-user.jpg",
    linkedin: "",
  },
  {
    name: "Pranathi",
    role: "Team Member",
    designation: "MLSC MRUH",
    msTitle: "Student Ambassador",
    image: "/placeholder-user.jpg",
    linkedin: "",
  },
  {
    name: "Rishikesh",
    role: "Team Member",
    designation: "MLSC MRUH",
    msTitle: "Student Ambassador",
    image: "/placeholder-user.jpg",
    linkedin: "",
  },
];

/* ─────────────────── PAGE ─────────────────── */

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-[100px]"
        />
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-semibold mb-6">
            Meet Our Squad
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            The Minds Behind <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
              MLSC MRUH
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A diverse group of passionate leaders, creators, and innovators
            working together to drive technological impact.
          </p>
        </motion.div>
      </section>

      {[
        {
          title: "Core Team",
          data: coreTeam,
          gradient: "from-blue-500/10 via-transparent to-transparent",
        },
        {
          title: "Department Team",
          data: departmentTeam,
          gradient: "from-violet-500/10 via-transparent to-transparent",
        },
      ].map((section) => (
        <section key={section.title} className="py-12 md:py-20 relative">
          <div
            className={`absolute inset-0 -z-10 bg-gradient-to-b ${section.gradient} opacity-50`}
          />
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="h-12 w-2 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {section.title}
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10"
            >
              {section.data.map((m) => (
                <TeamMember key={m.name} member={m} />
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* Join CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-violet-600/10" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">
              Join our Community
            </h2>
            <div className="flex justify-center gap-6">
              {[
                {
                  icon: Instagram,
                  color: "text-[#E1306C]",
                  border: "border-[#E1306C]/30",
                  hover: "hover:bg-[#E1306C]",
                  href: "https://www.instagram.com/mlsc_mruh",
                },
                {
                  icon: Linkedin,
                  color: "text-[#0A66C2]",
                  border: "border-[#0A66C2]/30",
                  hover: "hover:bg-[#0A66C2]",
                  href: "https://www.linkedin.com/company/mlsc-mru",
                },
                {
                  icon: Youtube,
                  color: "text-[#FF0000]",
                  border: "border-[#FF0000]/30",
                  hover: "hover:bg-[#FF0000]",
                  href: "https://www.youtube.com/@mlsc_mruh",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-16 w-16 flex items-center justify-center rounded-full border ${social.border} bg-card/50 backdrop-blur-md ${social.color} ${social.hover} hover:text-white transition-all duration-300 hover:scale-110 shadow-lg`}
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
