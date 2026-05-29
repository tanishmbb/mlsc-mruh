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

// Static events — update this list to add/edit events
const EVENTS: Event[] = []

export default function EventsPage() {
  const now = new Date()
  const upcoming = EVENTS.filter(e => new Date(e.date) >= now)
  const past = EVENTS.filter(e => new Date(e.date) < now)

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
              <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {upcoming.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
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
