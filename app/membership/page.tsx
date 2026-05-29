"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type Question = {
  id: string
  label: string
  type: "text" | "textarea" | "number"
  required: boolean
}

type Profile = {
  full_name: string
  roll_number: string
  year: string
  department: string
  phone: string
}

type Application = {
  id: string
  status: "pending" | "approved" | "rejected"
}

export default function MembershipPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(false)

  /* ───────── LOAD PROFILE, QUESTIONS, APPLICATION ───────── */
  useEffect(() => {
    if (!user) return

    const load = async () => {
      /* PROFILE */
      const { data: p } = await supabase
        .from("profiles")
        .select("full_name, roll_number, year, department, phone")
        .eq("user_id", user.id)
        .maybeSingle()

      setProfile(p ?? null)

      /* QUESTIONS */
      const { data: q } = await supabase
        .from("membership_questions")
        .select("id, label, type, required")
        .eq("active", true)
        .order("position")

      setQuestions(q || [])

      /* APPLICATION */
      const { data: app } = await supabase
        .from("membership_applications")
        .select("id, status")
        .eq("user_id", user.id)
        .maybeSingle()

      if (app) {
        setApplication(app)

        /* LOAD PREVIOUS ANSWERS */
        const { data: prev } = await supabase
          .from("membership_answers")
          .select("question_id, answer")
          .eq("application_id", app.id)

        const map: Record<string, string> = {}
        prev?.forEach(a => {
          map[a.question_id] = a.answer
        })

        setAnswers(map)
      }
    }

    load()
  }, [user])

  /* ───────── SUBMIT ───────── */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (!profile) {
      alert("Complete your profile before applying.")
      router.push("/complete-profile")
      return
    }

    if (application?.status === "approved") {
      alert("Your membership is already approved.")
      return
    }

    setLoading(true)

    let appId = application?.id

    /* ───── CREATE OR RESET APPLICATION ───── */
    if (!application) {
      /* FIRST TIME APPLY */
      const { data, error } = await supabase
        .from("membership_applications")
        .insert({
          user_id: user.id,
          email: user.email,
          full_name: profile.full_name,
          roll_number: profile.roll_number,
          year: profile.year,
          department: profile.department,
          phone: profile.phone,
          status: "pending",
        })
        .select("id")
        .single()

      if (error) {
        alert(error.message)
        setLoading(false)
        return
      }

      appId = data.id
    } else {
      /* REAPPLY → RESET STATUS */
      await supabase
        .from("membership_applications")
        .update({ status: "pending" })
        .eq("id", application.id)

      appId = application.id

      /* CLEAR OLD ANSWERS */
      await supabase
        .from("membership_answers")
        .delete()
        .eq("application_id", appId)
    }

    /* ───── INSERT ANSWERS ───── */
    const rows = questions.map(q => ({
      application_id: appId!,
      question_id: q.id,
      answer: answers[q.id] || "",
    }))

    const { error: ansError } = await supabase
      .from("membership_answers")
      .insert(rows)

    if (ansError) {
      alert(ansError.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-2xl font-bold mb-6">
        Membership Application
      </h1>

      {!profile && (
        <p className="mb-6 text-sm text-red-600">
          You must complete your profile before applying.
        </p>
      )}

      {application?.status === "approved" && (
        <p className="mb-6 text-sm text-green-600">
          Your membership is already approved.
        </p>
      )}

      <form onSubmit={submit} className="space-y-5">
        {questions.map(q => (
          <div key={q.id}>
            <label className="block font-medium mb-1">
              {q.label} {q.required && <span className="text-red-500">*</span>}
            </label>

            {q.type === "textarea" ? (
              <textarea
                required={q.required}
                value={answers[q.id] || ""}
                onChange={e =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            ) : (
              <input
                type={q.type}
                required={q.required}
                value={answers[q.id] || ""}
                onChange={e =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            )}
          </div>
        ))}

        <Button
          disabled={loading || application?.status === "approved"}
          className="w-full"
        >
          {loading ? "Submitting..." : application ? "Reapply" : "Submit Application"}
        </Button>
      </form>
    </div>
  )
}
