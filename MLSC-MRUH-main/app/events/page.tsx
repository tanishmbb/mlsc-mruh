"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import EventCard from "@/components/events/event-card"
import EventModal from "@/components/events/event-modal"

const events = [
  {
    id: 1,
    title: "Mastering Git and GitHub",
    date: "2025-05-11",
    time: "11:00 AM - 3:00 PM",
    location: "Microsoft Meet",
    poster: "/images/event1/Img1.jpg",
    description:
      "Deep dive into version control using Git and GitHub. Understand branching, pull requests, collaboration workflows, and advanced commands with hands-on practice.",
    highlights: [
      "Git fundamentals and advanced features",
      "Interactive hands-on sessions",
      "GitHub collaboration best practices",
      "Project-based learning",
    ],
    gallery: [
      "/images/event1/Img1.jpg",
      "/images/event1/Img2.jpg",
      "/images/event1/Img3.jpg",
      "/images/event1/Img4.jpg",
      "/images/event1/Img5.jpg",
    ],
  },
  {
    id: 2,
    title: "Her Hustle Hour",
    date: "2025-05-21",
    time: "2:00 PM - 5:00 PM",
    location: "Microsoft Meet",
    poster: "/images/event2/Img1.jpg",
    description:
      "An inspiring event celebrating women in technology. Engage in talks, workshops, and panel discussions focused on empowerment, innovation, and leadership.",
    highlights: [
      "Talks by women tech leaders",
      "Interactive panels and workshops",
      "Career growth strategies",
      "Networking with professionals",
    ],
    gallery: [
      "/images/event2/Img1.jpg",
      "/images/event2/Img2.jpg",
      "/images/event2/Img3.jpg",
      "/images/event2/Img4.jpg",
      "/images/event2/Img5.jpg",
    ],
  }, {
    id: 3,
    title: "Microsoft Learn Student Club Inaugration",
    date: "2025-08-1",
    time: "1:30 PM - 3:30 PM",
    location: "Auditorium, Ground Floor, SOE-II, MRUH",
    poster: "/images/event3/Img2.jpeg",
    description:
      "The inaugral ceremony of Microsoft Learn Student Club at Malla Reddy University. Join us for an exciting event filled with inspiring talks, interactive workshops, and networking opportunities with industry professionals.",
    highlights: [
      "Inaugration of MLSC at MRUH",
      "Talks by chief guests",
      "Microsoft Learn Student Club motto, plan of action",
      "Launch of Official Website and Social Media Handles of MLSC MRUH",
    "Different Microsoft technologies, opportunities and benefits of being a member of MLSC MRUH",
    ],
    gallery: [
      "/images/event3/Img1.jpg",
      "/images/event3/Img2.jpeg",
      "/images/event3/Img3.jpeg",
      "/images/event3/Img4.jpeg",
      "/images/event3/Img5.jpeg",

    ],
  },
   {
    id: 4,
    title: "GIT, GitHub & VS Code Fundamentals",
    date: "2025-08-21",
    time: "8:00 PM - 9:00 PM",
    location: "Microsoft Meet",
    poster: "/images/event4/Img2.jpg",
    description:
      "Deep dive into version control using Git and GitHub. Understand branching, pull requests, collaboration workflows, and advanced commands with hands-on practice.",
    highlights: [
      "Git fundamentals and advanced features",
      "Interactive hands-on sessions",
      "GitHub collaboration best practices",
      "MLSA opportunities and benefits",
    ],
    gallery: [
      "/images/event4/Img1.jpg",
      "/images/event4/Img2.jpg",
      "/images/event4/Img3.jpg",

    ],
  },
  {
    id: 5,
    title: "Productivity with Microsoft 365 & Copilot",
    date: "2025-08-26",
    time: "8:00 PM - 9:00 PM",
    location: "Microsoft Meet",
    poster: "/images/event5/Img2.jpg",
    description: 
  "Master Git and GitHub with an immersive hands-on session covering branching, pull requests, collaboration workflows, and advanced version control techniques.",
highlights: [
  "Git fundamentals and advanced features",
  "Interactive hands-on sessions",
  "GitHub collaboration best practices",
  "Real-world workflows and pull request mastery",
  "MLSA opportunities and benefits",
],
    gallery: [
      "/images/event5/Img1.jpg",
      "/images/event5/Img2.jpg",
      "/images/event5/Img3.jpg",
      "/images/event5/Img4.jpg",
      "/images/event5/Img5.jpg",
      "/images/event5/Img6.jpg",

    ],
  },
  
  {
    id: 6,
    title: "Launch of AIGNITE - Month of AI",
    date: "2025-09-01",
    time: "1:30 PM - 3:30 PM",
    location: "Auditorium, Ground Floor, SOE-II, MRUH",
    poster: "/images/event6/Img1.jpg",
   description: 
  "Kickstart AIGNITE – a month-long celebration of AI with workshops, talks, and hands-on sessions designed to explore the latest trends, tools, and innovations in artificial intelligence.",
highlights: [
  "Official launch of AIGNITE – Month of AI",
  "Workshops on AI tools and frameworks",
  "Expert talks and knowledge sharing",
  "Interactive hands-on learning",
  "Networking and MLSA opportunities",
],
    gallery: [
      "/images/event6/Img1.jpg",
      "/images/event6/Img2.jpg",
      "/images/event6/Img3.jpg",
      "/images/event6/Img4.jpg",

    ],
  },{
    id: 7,
    title: "AIGNITE - Intro to ML, DL, RL Concepts and Careers",
    date: "2025-09-03",
    time: "7:30 PM - 8:30 PM",
    location: "Microsoft Meet",
    poster: "/images/event7/Img1.jpg",
  description: 
  "Dive into the fundamentals of Machine Learning, Deep Learning, and Reinforcement Learning while exploring diverse career paths and opportunities in the field of AI.",
highlights: [
  "Introduction to ML, DL, and RL concepts",
  "Beginner-friendly explanations",
  "Real-world applications of AI",
  "Guidance on AI career opportunities",
  "Mathematical foundations of AI, and programming languages used in AI",
],
    gallery: [
      "/images/event7/Img1.jpg",
      "/images/event7/Img2.jpg",
      "/images/event7/Img3.jpg",
      "/images/event7/Img4.jpg",
      "/images/event7/Img5.jpg",
      "/images/event7/Img6.jpg",
      "/images/event7/Img7.jpg",
      "/images/event7/Img8.jpg",

    ],
  },
]

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)

  return (
    <div className="min-h-screen bg-card">
      <Header />

      <main className="pt-16">
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Our <span className="text-green-600">Events</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our exciting lineup of workshops, hackathons, and tech talks designed to enhance your skills
                and expand your network.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} onClick={() => setSelectedEvent(event)} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  )
}
