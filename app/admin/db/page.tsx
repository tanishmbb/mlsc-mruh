"use client"

import Link from "next/link"
import { Database, Users, ClipboardList, Calendar, Settings, ShieldAlert } from "lucide-react"

export default function AdminDBHome() {
  const items = [
    {
      title: "User Profiles",
      desc: "View and manage user profiles",
      href: "/admin/db/profiles",
      icon: Users,
    },
    {
      title: "Membership Applications",
      desc: "Approve, reject, reset applications",
      href: "/admin/db/memberships",
      icon: ClipboardList,
    },
    {
      title: "Membership Questions",
      desc: "Create, reorder, and modify questions",
      href: "/admin/db/questions",
      icon: Database,
    },
    {
      title: "Events",
      desc: "Create, edit, and delete events",
      href: "/admin/db/events",
      icon: Calendar,
    },
    {
      title: "RSVPs & Attendance",
      desc: "View RSVPs and attendance records",
      href: "/admin/db/rsvps",
      icon: ShieldAlert,
    },
    {
      title: "System Settings",
      desc: "Global feature toggles & maintenance",
      href: "/admin/db/system",
      icon: Settings,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
      <h1 className="text-3xl font-bold">Database Manager</h1>

      <p className="text-muted-foreground max-w-3xl">
        This panel provides controlled access to all system data.
        Changes here directly affect production data.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((i) => (
          <Link
            key={i.title}
            href={i.href}
            className="group border rounded-xl p-6 bg-card hover:shadow-lg transition"
          >
            <i.icon className="w-8 h-8 mb-4 text-primary" />
            <h2 className="font-semibold text-lg">{i.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {i.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
