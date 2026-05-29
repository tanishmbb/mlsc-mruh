"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

type Setting = {
  key: string
  value: boolean
}

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from("system_settings")
      .select("*")
      .then(({ data }) => {
        setSettings(data || [])
        setLoading(false)
      })
  }, [])

  const toggle = async (key: string, value: boolean) => {
    await supabase
      .from("system_settings")
      .update({ value: !value })
      .eq("key", key)

    setSettings((prev) =>
      prev.map((s) =>
        s.key === key ? { ...s, value: !value } : s
      )
    )
  }

  if (loading) return <p className="p-10">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-2xl font-bold">System Settings</h1>

      {settings.map((s) => (
        <div
          key={s.key}
          className="flex justify-between items-center border rounded-lg p-4"
        >
          <span className="font-medium">{s.key}</span>
          <Button
            variant={s.value ? "default" : "outline"}
            onClick={() => toggle(s.key, s.value)}
          >
            {s.value ? "Enabled" : "Disabled"}
          </Button>
        </div>
      ))}
    </div>
  )
}
