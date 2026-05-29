"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function CompleteProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    const form = new FormData(e.currentTarget)

    const { error } = await supabase.from("profiles").insert({
      user_id: user.id,
      email: user.email,
      full_name: form.get("full_name"),
      roll_number: form.get("roll_number"),
      year: form.get("year"),
      department: form.get("department"),
      phone: form.get("phone"),
    })

    if (error) {
      alert(error.message)
      setSaving(false)
      return
    }

    // ✅ HARD EXIT FROM LOOP
    router.replace("/dashboard")
  }

  if (loading || !user) return null

  return (
    <div className="max-w-xl mx-auto px-6 py-24">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="full_name" required placeholder="Full Name" className="w-full border p-2 rounded" />
        <input name="roll_number" required placeholder="Roll Number" className="w-full border p-2 rounded" />
        <input name="year" required placeholder="Year" className="w-full border p-2 rounded" />
        <input name="department" required placeholder="Department" className="w-full border p-2 rounded" />
        <input name="phone" required placeholder="Phone Number" className="w-full border p-2 rounded" />

        <Button disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </div>
  )
}
