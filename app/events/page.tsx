"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  MapPin,
  X,
  Download,
  Users,
  Loader2,
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

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

type MembershipStatus = "approved" | "pending" | "rejected" | null

export default function EventsPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [rsvpLoading, setRsvpLoading] = useState(false)
  const [registered, setRegistered] = useState<string[]>([])
  const [membershipStatus, setMembershipStatus] =
    useState<MembershipStatus>(null)

  /* ───────── FETCH EVENTS ───────── */
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true })

      setEvents((data as Event[]) || [])
      setLoading(false)
    }

    fetchEvents()
  }, [])

  /* ───────── FETCH MEMBERSHIP STATUS ───────── */
  useEffect(() => {
    if (!user) {
      setMembershipStatus(null)
      return
    }

    supabase
      .from("membership_applications")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setMembershipStatus(data?.status ?? null)
      })
  }, [user])

  /* ───────── FETCH RSVPS ───────── */
  useEffect(() => {
    if (!user) {
      setRegistered([])
      return
    }

    supabase
      .from("event_rsvps")
      .select("event_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setRegistered(data?.map(r => r.event_id) || [])
      })
  }, [user])

  const isPastEvent = (date: string) =>
    new Date(date) < new Date()

  /* ───────── RSVP HANDLER (HARD BLOCK) ───────── */
  const handleRsvp = async (event: Event) => {
    if (!user) {
      router.push("/login")
      return
    }

    if (registered.includes(event.id)) return

    if (event.members_only && membershipStatus !== "approved") {
      toast({
        variant: "destructive",
        title: "Members Only Event",
        description:
          membershipStatus === null
            ? "You must apply for membership to RSVP."
            : membershipStatus === "pending"
            ? "Your membership is pending approval."
            : "Your membership was rejected.",
      })
      return
    }

    setRsvpLoading(true)

    const { error } = await supabase.from("event_rsvps").insert({
      event_id: event.id,
      user_id: user.id,
      email: user.email,
    })

    setRsvpLoading(false)

    if (error) {
      toast({
        variant: "destructive",
        title: "RSVP Failed",
        description: error.message,
      })
      return
    }

    setRegistered(prev => [...prev, event.id])

    toast({
      title: "RSVP Successful 🎉",
      description: "Check your dashboard for the QR code.",
    })
  }

  return (
    <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Club Events
        </h1>
        <p className="text-muted-foreground text-lg">
          Join us for workshops, talks, and fun gatherings!
        </p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-card border rounded-xl h-72 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map(event => {
            const past = isPastEvent(event.event_date)
            const isRegistered = registered.includes(event.id)
            const blocked =
              event.members_only && membershipStatus !== "approved"

            return (
              <motion.div
                key={event.id}
                whileHover={{ y: -6 }}
                className={`bg-card border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer ${
                  past ? "opacity-70" : ""
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative h-56 bg-muted">
                  {event.poster_url && (
                    <img
                      src={event.poster_url}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {event.members_only && (
                    <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <Users size={14} />
                      Members Only
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-muted-foreground flex gap-2">
                    <Calendar size={16} />
                    {new Date(event.event_date).toLocaleString()}
                  </p>

                  <Button
                    disabled={past || blocked}
                    variant={isRegistered ? "secondary" : "default"}
                    className="w-full"
                  >
                    {blocked
                      ? "Membership Required"
                      : isRegistered
                      ? "Registered ✓"
                      : past
                      ? "Event Ended"
                      : "View Details"}
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* ───────── MODAL ───────── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 space-y-6">
                <h2 className="text-3xl font-bold">
                  {selectedEvent.title}
                </h2>

                <p className="whitespace-pre-wrap text-muted-foreground">
                  {selectedEvent.description}
                </p>

                <Button
                  size="lg"
                  onClick={() => handleRsvp(selectedEvent)}
                  disabled={
                    rsvpLoading ||
                    registered.includes(selectedEvent.id) ||
                    isPastEvent(selectedEvent.event_date) ||
                    (selectedEvent.members_only &&
                      membershipStatus !== "approved")
                  }
                  className="w-full"
                >
                  {rsvpLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing…
                    </>
                  ) : "RSVP Now"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
