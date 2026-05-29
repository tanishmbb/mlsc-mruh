"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock } from "lucide-react"

type Event = {
  id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  poster_url?: string
  members_only?: boolean
}

const EVENTS: Event[] = [
  {
    id: "event-10",
    title: "How Enterprises Use AI Foundries: Scaling Copilot-Enabled Development Across Teams",
    description: "Learn how enterprises are leveraging AI foundries and Copilot to scale their development.",
    date: "2026-03-28",
    time: "11:30 AM - 3:30 PM",
    venue: "Microsoft Office, Hyderabad",
    poster_url: "/images/event10poster.jpeg",
  },
  {
    id: "event-9",
    title: "Git and github version for modern developers",
    description: "A comprehensive guide to Git and GitHub for modern developers.",
    date: "2026-05-28",
    time: "11:30 AM - 1:30 PM",
    venue: "Microsoft teams",
    poster_url: "/images/event9poster.jpeg",
  },
  {
    id: "event-8",
    title: "Mastering Git & GitHub",
    description: "A comprehensive hands-on workshop on Git and GitHub.",
    date: "2026-03-25",
    time: "TBD",
    venue: "TBD",
    poster_url: "/images/event8poster.jpeg",
  },
  {
    id: "event-7",
    title: "AIGNITE - Intro to ML, DL, RL Concepts and Careers",
    description: "Dive into the fundamentals of Machine Learning, Deep Learning, and Reinforcement Learning.",
    date: "2025-09-07",
    time: "TBD",
    venue: "TBD",
    poster_url: "/images/event7/Img1.jpg",
  },
  {
    id: "event-6",
    title: "Launch of AIGNITE - Month of AI",
    description: "Kickoff event for AIGNITE, a month-long AI celebration.",
    date: "2025-09-01",
    time: "TBD",
    venue: "TBD",
    poster_url: "/images/event6/Img1.jpg",
  },
  {
    id: "event-5",
    title: "Productivity with Microsoft 365 & Copilot",
    description: "Learn to maximize productivity using Microsoft 365 and Copilot.",
    date: "2025-08-26",
    time: "TBD",
    venue: "TBD",
    poster_url: "/images/event5/Img1.jpg",
  },
  {
    id: "event-4",
    title: "GIT, GitHub & VS Code Fundamentals",
    description: "Deep dive into version control using Git and GitHub alongside VS Code.",
    date: "2025-08-21",
    time: "TBD",
    venue: "TBD",
    poster_url: "/images/event4/Img1.jpg",
  },
  {
    id: "event-3",
    title: "Microsoft Learn Student Club Inaugration",
    description: "Inauguration of MLSC at Malla Reddy University.",
    date: "2025-08-01",
    time: "TBD",
    venue: "MRUH",
    poster_url: "/images/event3/Img1.jpg",
  },
  {
    id: "event-2",
    title: "Her Hustle Hour",
    description: "Celebrating women in technology with talks and workshops.",
    date: "2025-05-21",
    time: "TBD",
    venue: "TBD",
    poster_url: "/images/event2/Img1.jpg",
  },
  {
    id: "event-1",
    title: "Mastering Git and GitHub",
    description: "Hands-on version control workshop at Microsoft Meet.",
    date: "2025-05-11",
    time: "TBD",
    venue: "Microsoft Meet",
    poster_url: "/images/event1/Img1.jpg",
  },
  {
    id: "upcoming-1",
    title: "Data analysis and excel pivot table",
    description: "Learn the fundamentals of data analysis and master Excel pivot tables.",
    date: "2026-05-29",
    time: "5:00 PM - 6:00 PM",
    venue: "TBD",
  },
  {
    id: "upcoming-2",
    title: "Power BI for Beginners",
    description: "A beginner's guide to Power BI.",
    date: "2026-06-01",
    time: "5:00 PM - 6:00 PM",
    venue: "TBD",
  }
]

export default function EventsPage() {
  const now = new Date()
  const upcoming = EVENTS.filter(e => new Date(e.date).getTime() + 86400000 >= now.getTime())
  const past = EVENTS.filter(e => new Date(e.date).getTime() + 86400000 < now.getTime())

  return (
    <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Club Events</h1>
        <p className="text-muted-foreground text-lg">
          Join us for workshops, talks, and fun gatherings!
        </p>
      </div>

      {EVENTS.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-32 gap-6 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Calendar className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">No events yet</h2>
          <p className="text-muted-foreground max-w-md">
            Stay tuned! We&apos;re planning exciting workshops, talks, and
            community events. Check back soon.
          </p>
        </motion.div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-8 text-center md:text-left">Upcoming Events</h2>
              
              {/* Timeline Layout for Upcoming Events */}
              <div className="relative border-l border-primary/30 ml-4 md:ml-6 space-y-12">
                {upcoming.map((event, i) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-8 md:pl-12"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                    
                    <div className="bg-card border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                      <div className="flex flex-col md:flex-row gap-6">
                        {event.poster_url && (
                          <div className="w-full md:w-48 h-48 md:h-auto rounded-xl overflow-hidden shrink-0 bg-muted">
                            <img
                              src={event.poster_url}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="text-2xl font-bold text-primary">{event.title}</h3>
                            {event.members_only && (
                              <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full whitespace-nowrap">
                                Members Only
                              </span>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm font-medium">
                            <div className="flex items-center gap-2 text-foreground/80 bg-secondary/30 px-3 py-1.5 rounded-lg">
                              <Calendar className="w-4 h-4 text-primary" />
                              {new Date(event.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </div>
                            
                            {event.time && (
                              <div className="flex items-center gap-2 text-foreground/80 bg-secondary/30 px-3 py-1.5 rounded-lg">
                                <Clock className="w-4 h-4 text-primary" />
                                {event.time}
                              </div>
                            )}
                            
                            {event.venue && (
                              <div className="flex items-center gap-2 text-foreground/80 bg-secondary/30 px-3 py-1.5 rounded-lg">
                                <MapPin className="w-4 h-4 text-primary" />
                                {event.venue}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-70">
                {past.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} past />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

function EventCard({
  event,
  index,
  past = false,
}: {
  event: Event
  index: number
  past?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="bg-card border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
    >
      <div className="relative h-48 bg-muted">
        {event.poster_url && (
          <img
            src={event.poster_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
        {event.members_only && (
          <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
            Members Only
          </span>
        )}
        {past && (
          <span className="absolute top-3 left-3 bg-muted-foreground/80 text-white text-xs px-3 py-1 rounded-full">
            Past Event
          </span>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-bold line-clamp-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Calendar size={14} />
            {new Date(event.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          {event.time && (
            <p className="flex items-center gap-2">
              <Clock size={14} />
              {event.time}
            </p>
          )}
          {event.venue && (
            <p className="flex items-center gap-2">
              <MapPin size={14} />
              {event.venue}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
