"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

type Question = {
  id: string
  label: string
  type: string
  required: boolean
  active: boolean
}

export default function AdminMembershipQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [label, setLabel] = useState("")
  const [type, setType] = useState("text")
  const [required, setRequired] = useState(false)

  const load = async () => {
    const { data } = await supabase
      .from("membership_questions")
      .select("*")
      .order("position")
    setQuestions(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const addQuestion = async () => {
    await supabase.from("membership_questions").insert({
      label,
      type,
      required,
    })
    setLabel("")
    setRequired(false)
    load()
  }

  const toggle = async (id: string, key: "active" | "required", value: boolean) => {
    await supabase.from("membership_questions").update({ [key]: value }).eq("id", id)
    load()
  }

  const remove = async (id: string) => {
    await supabase.from("membership_questions").delete().eq("id", id)
    load()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-2xl font-bold">Membership Questions</h1>

      <div className="border rounded-xl p-4 space-y-3">
        <input
          placeholder="Question text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="text">Short Text</option>
          <option value="textarea">Long Text</option>
          <option value="number">Number</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          Required
        </label>

        <Button onClick={addQuestion}>Add Question</Button>
      </div>

      <div className="space-y-3">
        {questions.map(q => (
          <div key={q.id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{q.label}</p>
              <p className="text-xs text-muted-foreground">{q.type}</p>
            </div>

            <div className="flex gap-3">
              <Button size="sm" variant="outline"
                onClick={() => toggle(q.id, "required", !q.required)}>
                {q.required ? "Required" : "Optional"}
              </Button>

              <Button size="sm" variant="outline"
                onClick={() => toggle(q.id, "active", !q.active)}>
                {q.active ? "Active" : "Hidden"}
              </Button>

              <Button size="sm" variant="destructive"
                onClick={() => remove(q.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
