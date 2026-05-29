"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as XLSX from "xlsx"
import Link from "next/link"
import { Loader2, Search } from "lucide-react"

// Types
type Application = {
  id: string
  full_name: string
  email: string
  roll_number: string
  department: string
  year: string
  phone: string
  status: "pending" | "approved" | "rejected"
  created_at: string
  answers: {
    question_id: string
    answer: string | null
    question: {
      id: string
      label: string
      required: boolean
    }
  }[]
}

type Event = {
  id: string
  title: string
  description: string
  event_date: string
  venue: string
  poster_url: string
  members_only: boolean
  resource_url: string
}

type RSVP = {
  id: string
  email: string
  full_name: string
  roll_number: string
  year: string
  department: string
  phone: string
  attended: boolean
  created_at: string
}

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [applications, setApplications] = useState<Application[]>([])
  const [selected, setSelected] = useState<Application | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [checkingAdmin, setCheckingAdmin] = useState(true)
  const [showEventForm, setShowEventForm] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loadingRsvps, setLoadingRsvps] = useState(false)

  /* ───────── FETCH FUNCTIONS ───────── */
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: false })
    if (!error && data) setEvents(data as Event[])
  }

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("membership_applications")
      .select(`
        id,
        full_name,
        email,
        roll_number,
        department,
        year,
        phone,
        status,
        created_at,
        answers:membership_answers (
          question_id,
          answer,
          question:membership_questions (
            id,
            label,
            required
          )
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching applications:", error)
      return
    }

    const transformed: Application[] = (data || []).map((app: any) => ({
      id: app.id,
      full_name: app.full_name,
      email: app.email,
      roll_number: app.roll_number,
      department: app.department,
      year: app.year,
      phone: app.phone,
      status: app.status,
      created_at: app.created_at,
      answers: (app.answers || []).map((a: any) => ({
        question_id: a.question_id,
        answer: a.answer,
        question: {
          id: a.question.id,
          label: a.question.label,
          required: a.question.required,
        },
      })),
    }))

    setApplications(transformed)
  }

  const fetchRsvps = async (eventId: string) => {
    setLoadingRsvps(true)
    setRsvps([])

    const { data, error } = await supabase
      .from("event_rsvps")
      .select(`
        id,
        email,
        attended,
        created_at,
        profiles (
          full_name,
          roll_number,
          year,
          department,
          phone
        )
      `)
      .eq("event_id", eventId)
      .order("created_at", { ascending: true })

    if (!error && data) {
      const formatted = data.map((r: any) => ({
        id: r.id,
        email: r.email,
        attended: r.attended,
        created_at: r.created_at,
        full_name: r.profiles?.full_name ?? "",
        roll_number: r.profiles?.roll_number ?? "",
        year: r.profiles?.year ?? "",
        department: r.profiles?.department ?? "",
        phone: r.profiles?.phone ?? "",
      }))
      setRsvps(formatted)
    }

    setLoadingRsvps(false)
  }

  /* ───────── ADMIN CHECK ───────── */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }
    if (!user) return

    const checkAdmin = async () => {
      const { data } = await supabase
        .from("admins")
        .select("email")
        .eq("email", user.email)
        .maybeSingle()
      if (!data) router.push("/dashboard")
      else setCheckingAdmin(false)
    }
    checkAdmin()
  }, [user, loading, router])

  useEffect(() => {
    if (!checkingAdmin) {
      fetchApplications()
      fetchEvents()
    }
  }, [checkingAdmin])

  /* ───────── SEARCH & FILTER ───────── */
  const filteredAndSearchedApplications = useMemo(() => {
    let result = applications

    if (filter !== "all") {
      result = result.filter((a) => a.status === filter)
    }

    if (searchQuery.trim() === "") return result

    const query = searchQuery.toLowerCase()
    return result.filter(
      (app) =>
        app.full_name.toLowerCase().includes(query) ||
        app.email.toLowerCase().includes(query) ||
        app.roll_number.toLowerCase().includes(query)
    )
  }, [applications, filter, searchQuery])

  /* ───────── EXPORT APPROVED MEMBERS ───────── */
  const exportApproved = useMemo(
    () => () => {
      const approved = applications.filter((a) => a.status === "approved")
      const data = approved.map((a) => ({
        "Full Name": a.full_name,
        "Email Address": a.email,
        "Roll Number": a.roll_number,
        Department: a.department,
        Year: a.year,
        Phone: a.phone,
        "Date Submitted": new Date(a.created_at).toLocaleDateString(),
      }))
      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Approved Members")
      XLSX.writeFile(wb, "approved_members.xlsx")
    },
    [applications]
  )

  /* ───────── STATUS & REVOKE HANDLERS ───────── */
  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setIsUpdatingStatus(id)
    const { error } = await supabase
      .from("membership_applications")
      .update({ status })
      .eq("id", id)
    if (!error) {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      )
      if (selected?.id === id) setSelected((prev) => (prev ? { ...prev, status } : null))
    } else {
      alert("Failed to update status")
    }
    setIsUpdatingStatus(null)
  }

  const revokeMembership = async (id: string) => {
    if (!confirm("Revoke this membership?")) return
    const { error } = await supabase
      .from("membership_applications")
      .update({ status: "rejected" })
      .eq("id", id)
    if (!error) {
      fetchApplications()
      setSelected(null)
    }
  }

  const revokeRSVP = async (rsvpId: string) => {
    if (!confirm("Remove this RSVP?")) return
    const { error } = await supabase.from("event_rsvps").delete().eq("id", rsvpId)
    if (!error && selectedEventId) fetchRsvps(selectedEventId)
  }

  /* ───────── EVENT EXPORTS ───────── */
  const exportAttendedExcel = async () => {
    if (!selectedEventId) return
    const { data, error } = await supabase
      .from("event_rsvps")
      .select("full_name, email, roll_number, year, department, phone, checked_in_at")
      .eq("event_id", selectedEventId)
      .eq("attended", true)
      .order("checked_in_at", { ascending: true })

    if (error || !data || data.length === 0) {
      alert("No attendance data available")
      return
    }

    const formatted = data.map((r: any, i: number) => ({
      "S.No": i + 1,
      "Full Name": r.full_name,
      Email: r.email,
      "Roll Number": r.roll_number,
      Year: r.year,
      Department: r.department,
      Phone: r.phone,
      "Checked In At": r.checked_in_at ? new Date(r.checked_in_at).toLocaleString() : "",
    }))

    const ws = XLSX.utils.json_to_sheet(formatted)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Attended Students")
    XLSX.writeFile(wb, `event_${selectedEventId}_attendance.xlsx`)
  }

  const exportRsvps = () => {
    if (rsvps.length === 0) return
    const csv = [
      ["Name", "Email", "Roll", "Year", "Department", "Phone", "Registered At", "Attended"],
      ...rsvps.map((r) => [
        r.full_name,
        r.email,
        r.roll_number,
        r.year,
        r.department,
        r.phone,
        new Date(r.created_at).toLocaleString(),
        r.attended ? "Yes" : "No",
      ]),
    ]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "event_rsvps.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  /* ───────── EVENT FORM HANDLERS ───────── */
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

    const { error } = editingEvent
      ? await supabase.from("events").update(payload).eq("id", editingEvent.id)
      : await supabase.from("events").insert({ ...payload, created_by: user?.email })

    if (!error) {
      setEditingEvent(null)
      setShowEventForm(false)
      fetchEvents()
    } else {
      alert("Save failed")
    }
  }

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event permanently?")) return
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (!error) {
      if (selectedEventId === id) {
        setSelectedEventId(null)
        setRsvps([])
      }
      fetchEvents()
    }
  }

  const getStatusStyle = (status: Application["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30"
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30"
    }
  }

  const handleToggleEventForm = () => {
    if (showEventForm) setEditingEvent(null)
    setShowEventForm(!showEventForm)
  }

  const handleClearSelectedEvent = () => {
    setSelectedEventId(null)
    setRsvps([])
  }

  if (loading || checkingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading admin panel...</p>
      </div>
    )
  }

return (
  <div className="min-h-screen bg-background text-foreground">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header + Global Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-3">
          <Button onClick={exportApproved}>
            Download Approved Members (Excel)
          </Button>

          <Button variant="secondary" onClick={handleToggleEventForm}>
            {showEventForm ? "Close Form" : "Manage Events"}
          </Button>

          <Link href="/admin/membership-questions">
            <Button variant="outline">
              Manage Membership Questions
            </Button>
          </Link>

          <Link href="/admin/db">
            <Button variant="destructive">
              Database Manager
            </Button>
          </Link>

          <Link
            href="/admin/scan"
            className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition inline-flex items-center justify-center"
          >
            Open QR Scanner
          </Link>
        </div>
      </div>

        {/* Event Form */}
        {showEventForm && (
          <div className="bg-card border rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {editingEvent ? `Edit Event: ${editingEvent.title}` : "Create New Event"}
            </h2>
            <form onSubmit={submitEvent} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <input
                  name="title"
                  defaultValue={editingEvent?.title ?? ""}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date & Time *</label>
                <input
                  type="datetime-local"
                  name="event_date"
                  defaultValue={
                    editingEvent?.event_date
                      ? new Date(editingEvent.event_date).toISOString().slice(0, 16)
                      : ""
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Venue</label>
                <input
                  name="venue"
                  defaultValue={editingEvent?.venue ?? ""}
                  className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Poster URL</label>
                <input
                  name="poster_url"
                  defaultValue={editingEvent?.poster_url ?? ""}
                  className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Resource/Download URL</label>
                <input
                  name="resource_url"
                  defaultValue={editingEvent?.resource_url ?? ""}
                  placeholder="e.g., Google Drive link"
                  className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-sm font-medium">
                  <input
                    type="checkbox"
                    name="members_only"
                    defaultChecked={editingEvent?.members_only ?? false}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  Members only
                </label>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingEvent?.description ?? ""}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 md:col-span-2">
                <Button type="submit" className="px-6">
                  {editingEvent ? "Save Changes" : "Create Event"}
                </Button>
                {editingEvent && (
                  <Button type="button" variant="outline" onClick={() => setEditingEvent(null)}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Events Grid */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Events (Click card to view RSVPs)</h2>
          {events.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">No events yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => {
                    setSelectedEventId(event.id)
                    fetchRsvps(event.id)
                  }}
                  className={`rounded-xl overflow-hidden border bg-card cursor-pointer transition-all ${
                    selectedEventId === event.id
                      ? "ring-4 ring-blue-500 shadow-xl"
                      : "hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {event.poster_url ? (
                      <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No poster
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      📅 {new Date(event.event_date).toLocaleDateString()} ·{" "}
                      {new Date(event.event_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className="text-sm text-muted-foreground">📍 {event.venue || "Not specified"}</p>
                    <div className="flex justify-between pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingEvent(event)
                          setShowEventForm(true)
                        }}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteEvent(event.id)
                        }}
                        className="text-red-600 hover:underline text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RSVP Section */}
        {selectedEventId && (
          <section className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-semibold">
                Event RSVPs ({rsvps.length})
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={exportAttendedExcel}
                  disabled={rsvps.filter((r) => r.attended).length === 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Download Attended (Excel)
                </Button>
                <Button onClick={exportRsvps} disabled={rsvps.length === 0} variant="secondary">
                  Export CSV
                </Button>
                <Button variant="outline" onClick={handleClearSelectedEvent}>
                  Close
                </Button>
              </div>
            </div>

            {loadingRsvps ? (
              <p className="text-center py-8">Loading...</p>
            ) : rsvps.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No RSVPs yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Roll</th>
                      <th className="px-4 py-3 text-left">Year/Dept</th>
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-center">Attendance</th>
                      <th className="px-4 py-3 text-left">Registered</th>
                      <th className="px-4 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {rsvps.map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3">{rsvp.full_name}</td>
                        <td className="px-4 py-3">{rsvp.email}</td>
                        <td className="px-4 py-3">{rsvp.roll_number}</td>
                        <td className="px-4 py-3">
                          {rsvp.year} / {rsvp.department}
                        </td>
                        <td className="px-4 py-3">{rsvp.phone}</td>
                        <td className="px-4 py-3 text-center">
                          {rsvp.attended ? (
                            <span className="text-green-600 font-semibold">Attended</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {new Date(rsvp.created_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => revokeRSVP(rsvp.id)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

  {/* Membership Applications */}
<section className="space-y-6">
  <h2 className="text-2xl font-semibold">Membership Applications</h2>

  {/* Filters + Search */}
  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
    <div className="flex flex-wrap gap-3">
      {(["all", "pending", "approved", "rejected"] as const).map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            filter === f
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}{" "}
          ({applications.filter((a) => f === "all" || a.status === f).length})
        </button>
      ))}
    </div>

    <div className="relative w-full sm:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search by name, email, or roll number..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  </div>

  {/* Main Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[70vh]">

    {/* LEFT LIST */}
    <div className="lg:col-span-1 bg-card border rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto divide-y">
        {filteredAndSearchedApplications.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">
            {searchQuery
              ? "No matching applications found."
              : `No ${filter} applications.`}
          </p>
        ) : (
          filteredAndSearchedApplications.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelected(app)}
              className={`p-5 cursor-pointer transition ${
                selected?.id === app.id
                  ? "bg-primary/10 border-l-4 border-primary"
                  : "hover:bg-muted/50"
              }`}
            >
              <p className="font-semibold">{app.full_name}</p>
              <p className="text-sm text-muted-foreground">
                {app.roll_number} • {app.department} • {app.year}
              </p>
              <span
                className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                  app.status
                )}`}
              >
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>

    {/* RIGHT DETAILS */}
    <div className="lg:col-span-2 bg-card border rounded-xl shadow-sm flex flex-col overflow-hidden">
      {!selected ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Select an application to view details
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="p-6 border-b">
            <h3 className="text-2xl font-bold">{selected.full_name}</h3>
            <span
              className={`mt-3 inline-block px-4 py-1.5 text-sm font-semibold rounded-full ${getStatusStyle(
                selected.status
              )}`}
            >
              {selected.status.charAt(0).toUpperCase() +
                selected.status.slice(1)}
            </span>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><strong>Email:</strong> {selected.email}</div>
              <div><strong>Roll:</strong> {selected.roll_number}</div>
              <div><strong>Department:</strong> {selected.department}</div>
              <div><strong>Year:</strong> {selected.year}</div>
              <div><strong>Phone:</strong> {selected.phone}</div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Application Responses</h4>

              {(!selected.answers || selected.answers.length === 0) && (
                <p className="text-muted-foreground text-sm">
                  No answers submitted.
                </p>
              )}

              {selected.answers?.map((a) => (
                <div key={a.question_id} className="border rounded-lg p-4">
                  <p className="text-sm font-semibold">
                    {a.question.label}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm">
                    {a.answer || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t flex gap-4">
            {selected.status === "pending" && (
              <>
                <Button
                  onClick={() => updateStatus(selected.id, "approved")}
                  disabled={isUpdatingStatus === selected.id}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isUpdatingStatus === selected.id
                    ? "Approving..."
                    : "Approve"}
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => updateStatus(selected.id, "rejected")}
                  disabled={isUpdatingStatus === selected.id}
                >
                  {isUpdatingStatus === selected.id
                    ? "Rejecting..."
                    : "Reject"}
                </Button>
              </>
            )}

            {selected.status === "approved" && (
              <Button
                variant="destructive"
                onClick={() => revokeMembership(selected.id)}
              >
                Revoke Membership
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  </div>
</section>
    </div>
  </div>
)
}
