"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function EditProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<any>(null)

  useEffect(() => {
    if (!user) return

    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setForm(data))
  }, [user])

  if (!form) {
    return <p className="pt-24 px-6">Loading profile...</p>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const fd = new FormData(e.currentTarget)

    await supabase
      .from("profiles")
      .update({
        full_name: fd.get("full_name"),
        roll_number: fd.get("roll_number"),
        year: fd.get("year"),
        department: fd.get("department"),
        phone: fd.get("phone"),
      })
      .eq("user_id", user!.id)

    router.push("/dashboard")
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-24">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="full_name" defaultValue={form.full_name} className="w-full border p-2 rounded" />
        <input name="roll_number" defaultValue={form.roll_number} className="w-full border p-2 rounded" />
        <input name="year" defaultValue={form.year} className="w-full border p-2 rounded" />
        <input name="department" defaultValue={form.department} className="w-full border p-2 rounded" />
        <input name="phone" defaultValue={form.phone} className="w-full border p-2 rounded" />

        <Button disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
}
