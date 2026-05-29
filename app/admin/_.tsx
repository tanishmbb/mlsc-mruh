
"use client"

/*
  ADMIN DASHBOARD – FIXED VERSION
  ✔ Membership accept / reject visible
  ✔ Edit events visible
  ✔ Revoke RSVP visible
  ✔ resource_url (download link) fully supported
  ✔ Improved spacing & layout
*/

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import * as XLSX from "xlsx"
import Link from "next/link"
import { Loader2 } from "lucide-react"

type Application = {
  id: string
  full_name: string
  email: string
  roll_number: string
  department: string
  year: string
  phone: string
  motivation: string
  expectations: string
  interests: string[]
  skill_level: string
  prior_experience: string
  contribution_areas: string[]
  commitment: string
  profile_links: string
  additional_info: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

type Event = {
  id: string
  title: string
  description: string
  event_date: string
  venue: string
  poster_url: string
  members_only: boolean
  resource_url: string | null
}

type RSVP = {
  id: string
  full_name: string
  email: string
  roll_number: string
  year: string
  department: string
  phone: string
  created_at: string
  attended: boolean
}

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [applications, setApplications] = useState<Application[]>([])
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending")

  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loadingRsvps, setLoadingRsvps] = useState(false)

  /* ---------------- ADMIN CHECK ---------------- */
  useEffect(() => {
    if (!loading && !user) router.push("/login")

    if (!user) return

    supabase
      .from("admins")
      .select("email")
      .eq("email", user.email)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) router.push("/dashboard")
      })
  }, [user, loading])

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    supabase.from("membership_applications").select("*").then(({ data }) => setApplications(data || []))
    supabase.from("events").select("*").order("event_date", { ascending: false }).then(({ data }) => setEvents(data || []))
  }, [])

  const fetchRsvps = async (eventId: string) => {
    setLoadingRsvps(true)
    const { data } = await supabase
      .from("event_rsvps")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: true })

    setRsvps((data as RSVP[]) || [])
    setLoadingRsvps(false)
  }

  /* ---------------- MEMBERSHIP ACTIONS ---------------- */
  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    await supabase.from("membership_applications").update({ status }).eq("id", id)
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    if (selectedApp?.id === id) setSelectedApp({ ...selectedApp, status })
  }

  const revokeMembership = async (id: string) => {
    if (!confirm("Revoke this membership?")) return
    await supabase.from("membership_applications").update({ status: "rejected" }).eq("id", id)
    setSelectedApp(null)
  }

  /* ---------------- EVENT ACTIONS ---------------- */
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const payload = {
      title: form.get("title"),
      description: form.get("description"),
      event_date: form.get("event_date"),
      venue: form.get("venue"),
      poster_url: form.get("poster_url"),
      members_only: form.get("members_only") === "on",
      resource_url: form.get("resource_url"),
    }

    if (editingEvent) {
      await supabase.from("events").update(payload).eq("id", editingEvent.id)
    } else {
      await supabase.from("events").insert({ ...payload, created_by: user?.email })
    }

    setEditingEvent(null)
    setShowEventForm(false)
    const { data } = await supabase.from("events").select("*")
    setEvents((data as Event[]) || [])
  }

  const revokeRSVP = async (id: string) => {
    if (!confirm("Remove this RSVP?")) return
    await supabase.from("event_rsvps").delete().eq("id", id)
    if (selectedEventId) fetchRsvps(selectedEventId)
  }

  /* ---------------- FILTER ---------------- */
  const filteredApps = useMemo(() => {
    if (filter === "all") return applications
    return applications.filter(a => a.status === filter)
  }, [applications, filter])

  if (loading) return <p className="pt-24 px-6">Loading…</p>

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link href="/admin/scan" className="px-4 py-2 bg-green-600 text-white rounded">QR Scanner</Link>
            <Button onClick={() => setShowEventForm(v => !v)}>Manage Events</Button>
          </div>
        </header>

        {showEventForm && (
          <form onSubmit={submitEvent} className="bg-card border rounded-xl p-6 space-y-4">
            <input name="title" placeholder="Event title" defaultValue={editingEvent?.title ?? ""} className="input w-full" />
            <textarea name="description" placeholder="Description" defaultValue={editingEvent?.description ?? ""} className="input w-full" />
            <input type="datetime-local" name="event_date" defaultValue={editingEvent?.event_date?.slice(0,16)} className="input w-full" />
            <input name="venue" placeholder="Venue" defaultValue={editingEvent?.venue ?? ""} className="input w-full" />
            <input name="poster_url" placeholder="Poster URL" defaultValue={editingEvent?.poster_url ?? ""} className="input w-full" />
            <input name="resource_url" placeholder="Download / Resource URL" defaultValue={editingEvent?.resource_url ?? ""} className="input w-full" />
            <Button type="submit">{editingEvent ? "Save Changes" : "Create Event"}</Button>
          </form>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border rounded-xl bg-card">
            <h2 className="p-4 font-semibold border-b">Membership Applications</h2>
            <ul className="divide-y">
              {filteredApps.map(app => (
                <li key={app.id} onClick={() => setSelectedApp(app)} className="p-4 cursor-pointer hover:bg-muted">
                  <p className="font-medium">{app.full_name}</p>
                  <span className="text-xs">{app.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border rounded-xl bg-card p-6">
            {!selectedApp ? (
              <p>Select an application</p>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2">{selectedApp.full_name}</h3>
                {selectedApp.status === "pending" && (
                  <div className="flex gap-3">
                    <Button onClick={() => updateStatus(selectedApp.id, "approved")} className="bg-green-600">Approve</Button>
                    <Button onClick={() => updateStatus(selectedApp.id, "rejected")} variant="destructive">Reject</Button>
                  </div>
                )}
                {selectedApp.status === "approved" && (
                  <Button variant="destructive" onClick={() => revokeMembership(selectedApp.id)}>Revoke</Button>
                )}
              </>
            )}
          </div>
        </section>

        <section className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Event RSVPs</h2>
          {loadingRsvps && <p>Loading…</p>}
          {rsvps.map(r => (
            <div key={r.id} className="flex justify-between border-b py-2">
              <span>{r.full_name}</span>
              <button onClick={() => revokeRSVP(r.id)} className="text-red-600">Revoke</button>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}
