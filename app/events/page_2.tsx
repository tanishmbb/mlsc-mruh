"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, X, Download } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

type Event = {
  id: string
  title: string
  description: string
  event_date: string
  venue: string
  poster_url: string | null
  members_only: boolean
  resource_url: string | null
}

export default function EventsPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(false)
  const [rsvpedEventIds, setRsvpedEventIds] = useState<string[]>([])

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true })
      .then(({ data }) => setEvents((data as Event[]) || []))
  }, [])

  useEffect(() => {
    if (!user) return
    supabase
      .from("event_rsvps")
      .select("event_id")
      .eq("user_id", user.id)
      .then(({ data }) =>
        setRsvpedEventIds(data?.map((r) => r.event_id) || [])
      )
  }, [user])

  const handleRsvp = async (event: Event) => {
    if (!user) {
      router.push("/login")
      return
    }

    setLoading(true)

    if (event.members_only) {
      const { data } = await supabase
        .from("membership_applications")
        .select("status")
        .eq("user_id", user.id)
        .maybeSingle()

      if (!data || data.status !== "approved") {
        toast({
          variant: "destructive",
          title: "Members only",
          description: "This event is restricted to approved members.",
        })
        setLoading(false)
        return
      }
    }

    const { data: profile } = await supabase
      .from("membership_applications")
      .select("full_name, roll_number, year, department, phone")
      .eq("user_id", user.id)
      .single()

    if (!profile) {
      toast({
        variant: "destructive",
        title: "Profile incomplete",
        description: "Complete your membership profile first.",
      })
      router.push("/membership")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("event_rsvps").insert({
      event_id: event.id,
      user_id: user.id,
      email: user.email,
      ...profile,
    })

    if (error) {
      toast({
        variant: "destructive",
        title: "RSVP failed",
        description:
          error.code === "23505"
            ? "You already registered for this event."
            : error.message,
      })
      setLoading(false)
      return
    }

    setRsvpedEventIds((prev) => [...prev, event.id])
    setLoading(false)
    setSelectedEvent(null)

    toast({
      title: "RSVP Successful 🎉",
      description:
        "You are officially registered. You can find your RSVP details in the Dashboard.",
    })
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-2">
            View details and RSVP for upcoming events
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedEvent(event)}
              className="cursor-pointer bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition"
            >
              <div className="h-48 bg-muted">
                {event.poster_url && (
                  <img
                    src={event.poster_url}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold">{event.title}</h3>

                <div className="text-sm text-muted-foreground flex gap-2">
                  <Calendar size={16} />
                  {new Date(event.event_date).toLocaleString()}
                </div>

                <div className="text-sm text-muted-foreground flex gap-2">
                  <MapPin size={16} />
                  {event.venue}
                </div>

                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border max-w-xl w-full overflow-hidden"
            >
              <div className="relative h-56 bg-muted">
                {selectedEvent.poster_url && (
                  <img
                    src={selectedEvent.poster_url}
                    alt={selectedEvent.title}
                    className="h-full w-full object-cover"
                  />
                )}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">
                  {selectedEvent.title}
                </h2>

                <p className="text-muted-foreground">
                  {selectedEvent.description}
                </p>

                {selectedEvent.resource_url && (
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() =>
                      window.open(selectedEvent.resource_url!, "_blank")
                    }
                  >
                    <Download size={16} />
                    Download Related Files
                  </Button>
                )}

                <Button
                  disabled={
                    loading ||
                    rsvpedEventIds.includes(selectedEvent.id)
                  }
                  onClick={() => handleRsvp(selectedEvent)}
                >
                  {rsvpedEventIds.includes(selectedEvent.id)
                    ? "Already Registered"
                    : loading
                    ? "Registering..."
                    : "RSVP Now"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
